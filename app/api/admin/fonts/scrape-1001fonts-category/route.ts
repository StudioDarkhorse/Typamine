import { NextRequest, NextResponse } from "next/server";
import { unzipSync } from "fflate";
// @ts-expect-error fontverter has no official types
import fontverter from "fontverter";
import prisma from "@/lib/prisma";
import { uploadToR2 } from "@/lib/r2";
import { isVariableFont, getFontWeightAndStyle, getVariantLabel } from "@/lib/fontMeta";
import { getOrCreatePlaceholderFontAuthorId, findOrCreateFontAuthorFromFonts1001 } from "@/lib/services/fontAuthor";
import { matchFonts1001LicenseType } from "@/lib/constants/fontLicenseTypes";
import {
  scrapeFonts1001CategoryPage,
  scrapeFonts1001FontPage,
  fonts1001NameFromUrl,
  fetchZipFile,
  FONTS1001_ZIP_HEADERS,
} from "@/lib/scraper";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cacheTags";
import crypto from "crypto";

const FONT_EXTENSIONS = new Set(["ttf", "otf", "woff", "woff2"]);

// Pausa fra una PDP e la successiva: qui le richieste allo scraper sono due
// per font (categoria + dettaglio), meglio non martellare.
const PDP_STAGGER_MS = 300;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extOf(path: string): string {
  return path.split(".").pop()?.toLowerCase() || "";
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Come per lo zip dafont: il nome famiglia è già noto (dalla PDP), quindi ogni
// file font dentro lo zip, a qualunque profondità, è una variante di QUELLA
// famiglia.
function collectFontFilesFlat(entries: Record<string, Uint8Array>): Array<{ path: string; data: Uint8Array }> {
  const files: Array<{ path: string; data: Uint8Array }> = [];
  for (const [rawPath, data] of Object.entries(entries)) {
    if (data.length === 0) continue; // directory entry
    const path = rawPath.replace(/\\/g, "/");
    if (path.includes("__MACOSX/") || path.split("/").pop()?.startsWith(".")) continue;
    if (!FONT_EXTENSIONS.has(extOf(path))) continue;
    files.push({ path, data });
  }
  return files;
}

async function checkPermission(permission: string) {
  const session = await getServerAuthSession();
  const permissions = session?.user?.permissions || [];
  const roles = session?.user?.roles || [];
  const isSuperAdmin = roles.includes("SUPERADMIN") || roles.includes("ADMIN");
  if (!isSuperAdmin && !permissions.includes(permission)) {
    throw new Error("Unauthorized");
  }
}

// "Import Fonts from 1001Fonts" (dashboard, Key Tasks) — gemella di
// scrape-dafont-category, con un passaggio in più: la pagina categoria di
// 1001fonts elenca SOLO i link alle pagine dei singoli font, quindi per ognuno
// serve un secondo scrape (la PDP) da cui arrivano nome, autore + link al suo
// profilo, licenza e link allo zip. Da lì in poi la pipeline è identica:
// download zip → estrazione → conversione WOFF2 → upload R2 → record DB.
export async function POST(request: NextRequest) {
  try {
    await checkPermission("font:create");

    const body = await request.json();
    const categoryUrl = body?.url as string | undefined;
    if (!categoryUrl || typeof categoryUrl !== "string") {
      return NextResponse.json({ error: "Missing category URL." }, { status: 400 });
    }

    const encoder = new TextEncoder();
    const fallbackAuthorId = await getOrCreatePlaceholderFontAuthorId("fonts1001");

    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        };

        const imported: string[] = [];
        const skipped: Array<{ family: string; reason: string }> = [];
        const failed: Array<{ family: string; error: string }> = [];

        let pdpUrls: string[];
        try {
          send({ type: "log", message: `Scraping category page ${categoryUrl}...` });
          pdpUrls = await scrapeFonts1001CategoryPage(categoryUrl);
        } catch (err: any) {
          send({ type: "log", message: `✗ Failed to scrape category page: ${err.message}` });
          send({ type: "done", imported: [], skipped: [], failed: [{ family: categoryUrl, error: err.message }] });
          controller.close();
          return;
        }

        if (pdpUrls.length === 0) {
          send({ type: "log", message: "No font pages found on this category page." });
          send({ type: "done", imported: [], skipped: [], failed: [] });
          controller.close();
          return;
        }

        const total = pdpUrls.length;
        send({ type: "total", total });
        send({ type: "log", message: `Found ${total} font page(s) on this page.` });

        let index = 0;
        for (const pdpUrl of pdpUrls) {
          index += 1;
          let familyName = fonts1001NameFromUrl(pdpUrl);
          send({ type: "log", message: `[${index}/${total}] ${pdpUrl}` });

          try {
            send({ type: "log", message: `  Reading font page...` });
            const details = await scrapeFonts1001FontPage(pdpUrl);

            if (details.notFound) {
              throw new Error("Font page not found on 1001fonts.com (404).");
            }

            familyName = (details.name || familyName).trim();
            send({
              type: "log",
              message: `  "${familyName}" — author: ${details.author ?? "unknown"}${details.licenseLabel ? `, license: ${details.licenseLabel}` : ""}`,
            });

            if (!details.downloadLink) {
              throw new Error("No download link found on the font page.");
            }

            const slug = slugify(familyName);
            const existing = await prisma.ingredient.findUnique({ where: { slug } });
            if (existing) {
              skipped.push({ family: familyName, reason: "Already in database." });
              send({ type: "log", message: `  ⚠ Skipped — already in database.` });
              send({ type: "progress", current: index, total });
              if (index < total) await sleep(PDP_STAGGER_MS);
              continue;
            }

            send({ type: "log", message: `  Downloading zip from ${details.downloadLink}...` });
            const zipBuffer = await fetchZipFile(details.downloadLink, {
              ...FONTS1001_ZIP_HEADERS,
              referer: pdpUrl,
            });

            send({ type: "log", message: `  Extracting zip...` });
            let entries: Record<string, Uint8Array>;
            try {
              entries = unzipSync(new Uint8Array(zipBuffer));
            } catch (zipErr: any) {
              throw new Error(`Invalid or corrupted zip file: ${zipErr.message}`);
            }

            const files = collectFontFilesFlat(entries);
            if (files.length === 0) {
              throw new Error("No font files (.ttf/.otf/.woff/.woff2) found in the zip.");
            }

            send({ type: "log", message: `  Converting ${files.length} font file(s) to WOFF2...` });

            const ingredientId = crypto.randomUUID();
            const fontFamilyName = `Typamine_${familyName.replace(/\s+/g, "")}`;
            const createdVariants: Array<{
              id: string;
              fontFamilyName: string;
              weight: number;
              style: string;
              woff2Url: string;
              label: string;
            }> = [];
            const seenVariants = new Set<string>();
            let isVariable = false;

            for (const { path, data } of files) {
              try {
                const fileBuffer: Buffer = Buffer.from(data);
                const format = fontverter.detectFormat(fileBuffer);

                const sfntBuffer: Buffer =
                  format === "sfnt" ? fileBuffer : Buffer.from(await fontverter.convert(fileBuffer, "sfnt"));

                const { isVar } = isVariableFont(sfntBuffer);
                const { weight, style } = getFontWeightAndStyle(sfntBuffer);

                const variantKey = isVar ? "variable" : `${weight}-${style}`;
                if (seenVariants.has(variantKey)) {
                  send({ type: "log", message: `  Skipping duplicate ${variantKey} variant: ${path}` });
                  continue;
                }
                seenVariants.add(variantKey);
                if (isVar) isVariable = true;

                const woff2Buffer: Buffer =
                  format === "woff2" ? fileBuffer : Buffer.from(await fontverter.convert(fileBuffer, "woff2"));
                const label = isVar ? "Variable" : getVariantLabel(weight, style);

                const variantId = crypto.randomUUID();
                send({ type: "log", message: `  Uploading ${label} to R2...` });
                const uploadRes = await uploadToR2(woff2Buffer, "fonts/files", `${variantId}.woff2`, "font/woff2");

                createdVariants.push({ id: variantId, fontFamilyName, weight, style, woff2Url: uploadRes.url, label });
                if (isVar) break;
              } catch (fileErr: any) {
                console.error(`[Scrape 1001Fonts Category] Failed to process ${path} for "${familyName}":`, fileErr);
              }

              // Stesso respiro per l'event loop della route dafont: le
              // conversioni fontverter sono CPU-bound e in serie possono far
              // scadere la sessione D1 locale.
              await new Promise((r) => setImmediate(r));
            }

            if (createdVariants.length === 0) {
              throw new Error("No valid font file could be converted for this family.");
            }

            send({ type: "log", message: `  Resolving author...` });
            const resolvedAuthorId = details.author
              ? await findOrCreateFontAuthorFromFonts1001(details.author, details.authorUrl)
              : null;
            const authorId = resolvedAuthorId ?? fallbackAuthorId;
            const creator = details.author || "1001Fonts";

            const licenseType = matchFonts1001LicenseType(details.licenseLabel, details.licenseUrl);

            send({ type: "log", message: `  Creating font record...` });
            await prisma.ingredient.create({
              data: {
                id: ingredientId,
                name: familyName,
                slug,
                category: "Decorative",
                creator,
                rating: "9.0",
                importedFrom: "1001Fonts",
                licenseType,
                authorId,
                isVariable,
                createdAt: new Date(),
                variants: { create: createdVariants },
              },
            });

            imported.push(familyName);
            send({
              type: "log",
              message: `  ✓ Imported "${familyName}" — ${createdVariants.length} variant${createdVariants.length === 1 ? "" : "s"}, author: ${creator}${details.authorUrl ? ` (${details.authorUrl})` : ""}${licenseType ? `, license: ${licenseType}` : ""}.`,
            });
          } catch (fontErr: any) {
            console.error(`[Scrape 1001Fonts Category] Error importing "${familyName}":`, fontErr);
            failed.push({ family: familyName, error: fontErr.message || "Unknown error" });
            send({ type: "log", message: `  ✗ Failed: ${fontErr.message || "Unknown error"}` });
          }

          send({ type: "progress", current: index, total });
          if (index < total) await sleep(PDP_STAGGER_MS);
        }

        if (imported.length > 0) {
          revalidatePath("/admin/fonts");
          revalidatePath("/admin");
          revalidateTag(CACHE_TAGS.ingredients, "max");
        }

        send({ type: "done", imported, skipped, failed });
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("[Scrape 1001Fonts Category Route] Global Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process 1001fonts category scrape." }, { status: 500 });
  }
}
