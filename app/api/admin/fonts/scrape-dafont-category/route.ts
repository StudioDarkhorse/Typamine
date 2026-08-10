import { NextRequest, NextResponse } from "next/server";
import { unzipSync } from "fflate";
// @ts-expect-error fontverter has no official types
import fontverter from "fontverter";
import prisma from "@/lib/prisma";
import { uploadToR2 } from "@/lib/r2";
import { isVariableFont, getFontWeightAndStyle, getVariantLabel } from "@/lib/fontMeta";
import { getOrCreatePlaceholderFontAuthorId, findOrCreateFontAuthorByName } from "@/lib/services/fontAuthor";
import { matchKnownLicenseType } from "@/lib/constants/fontLicenseTypes";
import { scrapeDafontCategoryPage, fetchZipFile } from "@/lib/scraper";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cacheTags";
import crypto from "crypto";

const FONT_EXTENSIONS = new Set(["ttf", "otf", "woff", "woff2"]);

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

// Zip di scaricato singolo font da dafont — a differenza del bulk-import-zip
// (dove ogni cartella di primo livello e' una famiglia diversa), qui il nome
// famiglia e' gia' noto (viene dalla PLP) e OGNI file font nello zip, a
// qualunque profondita', e' una variante di QUELLA stessa famiglia.
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

// "Scrape From Dafont" (dashboard, Key Tasks) — l'admin sceglie una
// macro/sotto-categoria da lib/data/dafontUrls.json e (opzionalmente) una
// pagina; questa route scansiona quella pagina categoria (PLP) su dafont.com,
// e per ogni font elencato scarica lo zip, lo estrae, converte i file font in
// WOFF2 e li carica su R2 — stessa pipeline di /api/admin/fonts/bulk-import-zip,
// ma la sorgente e' un download remoto invece di un upload locale, e
// autore/licenza arrivano gia' scrapeati dalla PLP invece che da un placeholder.
export async function POST(request: NextRequest) {
  try {
    await checkPermission("font:create");

    const body = await request.json();
    const categoryUrl = body?.url as string | undefined;
    if (!categoryUrl || typeof categoryUrl !== "string") {
      return NextResponse.json({ error: "Missing category URL." }, { status: 400 });
    }

    const encoder = new TextEncoder();
    const dafontAuthorId = await getOrCreatePlaceholderFontAuthorId("dafont");

    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        };

        const imported: string[] = [];
        const skipped: Array<{ family: string; reason: string }> = [];
        const failed: Array<{ family: string; error: string }> = [];

        let fonts;
        try {
          send({ type: "log", message: `Scraping category page ${categoryUrl}...` });
          fonts = await scrapeDafontCategoryPage(categoryUrl);
        } catch (err: any) {
          send({ type: "log", message: `✗ Failed to scrape category page: ${err.message}` });
          send({ type: "done", imported: [], skipped: [], failed: [{ family: categoryUrl, error: err.message }] });
          controller.close();
          return;
        }

        if (fonts.length === 0) {
          send({ type: "log", message: "No fonts found on this page." });
          send({ type: "done", imported: [], skipped: [], failed: [] });
          controller.close();
          return;
        }

        const total = fonts.length;
        send({ type: "total", total });
        send({ type: "log", message: `Found ${total} font(s) on this page.` });

        let index = 0;
        for (const font of fonts) {
          index += 1;
          const familyName = font.name.trim();
          send({ type: "log", message: `[${index}/${total}] "${familyName}"` });

          try {
            if (!font.downloadLink) {
              throw new Error("No download link found for this font on the category page.");
            }

            const slug = slugify(familyName);
            const existing = await prisma.ingredient.findUnique({ where: { slug } });
            if (existing) {
              skipped.push({ family: familyName, reason: "Already in database." });
              send({ type: "log", message: `  ⚠ Skipped — already in database.` });
              send({ type: "progress", current: index, total });
              continue;
            }

            send({ type: "log", message: `  Downloading zip from ${font.downloadLink}...` });
            const zipBuffer = await fetchZipFile(font.downloadLink);

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

                const sfntBuffer: Buffer = format === "sfnt" ? fileBuffer : Buffer.from(await fontverter.convert(fileBuffer, "sfnt"));

                const { isVar } = isVariableFont(sfntBuffer);
                const { weight, style } = getFontWeightAndStyle(sfntBuffer);

                const variantKey = isVar ? "variable" : `${weight}-${style}`;
                if (seenVariants.has(variantKey)) {
                  send({ type: "log", message: `  Skipping duplicate ${variantKey} variant: ${path}` });
                  continue;
                }
                seenVariants.add(variantKey);
                if (isVar) isVariable = true;

                const woff2Buffer: Buffer = format === "woff2" ? fileBuffer : Buffer.from(await fontverter.convert(fileBuffer, "woff2"));
                const label = isVar ? "Variable" : getVariantLabel(weight, style);

                const variantId = crypto.randomUUID();
                send({ type: "log", message: `  Uploading ${label} to R2...` });
                const uploadRes = await uploadToR2(woff2Buffer, "fonts/files", `${variantId}.woff2`, "font/woff2");

                createdVariants.push({ id: variantId, fontFamilyName, weight, style, woff2Url: uploadRes.url, label });
                if (isVar) break;
              } catch (fileErr: any) {
                console.error(`[Scrape Dafont Category] Failed to process ${path} for "${familyName}":`, fileErr);
              }

              // Respiro per l'event loop: fontverter.convert/detectFormat sono
              // CPU-bound e sincroni al netto dell'await — in un batch lungo,
              // stringhe di conversioni una dopo l'altra senza mai cedere il
              // controllo possono far scadere la sessione D1 locale (Miniflare),
              // vedi withD1Retry in lib/services/dbMigration.ts per il sintomo.
              await new Promise((r) => setImmediate(r));
            }

            if (createdVariants.length === 0) {
              throw new Error("No valid font file could be converted for this family.");
            }

            send({ type: "log", message: `  Resolving author...` });
            const resolvedAuthorId = font.author ? await findOrCreateFontAuthorByName(font.author) : null;
            const authorId = resolvedAuthorId ?? dafontAuthorId;
            const creator = font.author || "Dafont";

            const licenseType = font.licenseType ? matchKnownLicenseType(font.licenseType) : null;

            send({ type: "log", message: `  Creating font record...` });
            await prisma.ingredient.create({
              data: {
                id: ingredientId,
                name: familyName,
                slug,
                category: "Decorative",
                creator,
                rating: "9.0",
                importedFrom: "Dafont",
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
              message: `  ✓ Imported "${familyName}" — ${createdVariants.length} variant${createdVariants.length === 1 ? "" : "s"}, author: ${creator}${licenseType ? `, license: ${licenseType}` : ""}.`,
            });
          } catch (fontErr: any) {
            console.error(`[Scrape Dafont Category] Error importing "${familyName}":`, fontErr);
            failed.push({ family: familyName, error: fontErr.message || "Unknown error" });
            send({ type: "log", message: `  ✗ Failed: ${fontErr.message || "Unknown error"}` });
          }

          send({ type: "progress", current: index, total });
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
    console.error("[Scrape Dafont Category Route] Global Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process dafont category scrape." }, { status: 500 });
  }
}
