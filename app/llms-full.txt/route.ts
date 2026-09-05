import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withSafeDbQuery } from "@/lib/services/dbMigration";
import { getVirtualFormulas } from "@/lib/services/virtualFormula";
import { getAllNonRealFontAuthorIds } from "@/lib/services/fontAuthor";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600; // Cache per 1 ora

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/+$/, "");

  let ingredients: Array<{ name: string; slug: string; category: string; licenseType: string | null; creator: string | null; rating: string }> = [];
  let authors: Array<{ name: string; slug: string; type: string | null }> = [];
  let prescriptions: Array<{ name: string; slug: string; primaryFont: { name: string } | null; secondaryFont: { name: string } | null }> = [];
  let realFormulas: Array<{ name: string; slug: string; description: string | null }> = [];
  let virtualFormulas: Array<{ name: string; slug: string; description?: string | null }> = [];
  let pillPosts: Array<{ title: string; slug: string; caption: string | null }> = [];
  let archivePosts: Array<{ title: string; slug: string; caption: string | null }> = [];

  try {
    const nonRealAuthorIds = await getAllNonRealFontAuthorIds().catch(() => []);

    const [
      ingredientsRes,
      authorsRes,
      prescriptionsRes,
      realFormulasRes,
      virtualFormulasRes,
      pillsRes,
      archiveRes,
    ] = await withSafeDbQuery(() =>
      Promise.all([
        prisma.ingredient.findMany({
          select: { name: true, slug: true, category: true, licenseType: true, creator: true, rating: true },
          orderBy: { name: "asc" },
        }),
        prisma.fontAuthor.findMany({
          where: {
            status: "ACTIVE",
            ...(nonRealAuthorIds.length > 0 ? { id: { notIn: nonRealAuthorIds } } : {}),
          },
          select: { name: true, slug: true, type: true },
          orderBy: { name: "asc" },
        }),
        prisma.prescription.findMany({
          where: { published: true },
          select: {
            name: true,
            slug: true,
            primaryFont: { select: { name: true } },
            secondaryFont: { select: { name: true } },
          },
          orderBy: { name: "asc" },
        }),
        prisma.formula.findMany({
          select: { name: true, slug: true, description: true },
          orderBy: { name: "asc" },
        }),
        getVirtualFormulas().catch(() => []),
        prisma.post.findMany({
          where: { published: true, postType: "BLOG" },
          select: { title: true, slug: true, caption: true },
          orderBy: { createdAt: "desc" },
        }),
        prisma.post.findMany({
          where: { published: true, postType: "ARCHIVE" },
          select: { title: true, slug: true, caption: true },
          orderBy: { createdAt: "desc" },
        }),
      ])
    );

    ingredients = ingredientsRes;
    authors = authorsRes;
    prescriptions = prescriptionsRes;
    realFormulas = realFormulasRes;
    virtualFormulas = virtualFormulasRes;
    pillPosts = pillsRes;
    archivePosts = archiveRes;
  } catch (error) {
    console.error("[llms-full.txt Error]:", error);
  }

  // Deduplicazione formule
  const realFormulaSlugs = new Set(realFormulas.map((f) => f.slug));
  const allFormulas = [
    ...realFormulas.map((f) => ({ name: f.name, slug: f.slug, description: f.description || "" })),
    ...virtualFormulas
      .filter((vf) => !realFormulaSlugs.has(vf.slug))
      .map((vf) => ({ name: vf.name, slug: vf.slug, description: vf.description || "" })),
  ];

  const markdown = [
    `# Typamine — Full Content Index & Catalog`,
    ``,
    `> The ultimate typographic web application. A modern, high-performance platform to discover, test, convert, discover, and download fonts, font pairings, and web typography tools.`,
    ``,
    `Website Base URL: ${baseUrl}`,
    `Generated at: ${new Date().toISOString()}`,
    ``,
    `---`,
    ``,
    `## Web Typography Tools (/labs)`,
    ``,
    `- [Font Converter](${baseUrl}/labs/font-converter): Client-side WebAssembly font format converter (WOFF2, TTF, OTF, WOFF).`,
    `- [@font-face Generator](${baseUrl}/labs/font-face-generator): Generates cross-browser CSS @font-face rules and snippet downloads.`,
    `- [Tailwind Config Generator](${baseUrl}/labs/tailwind-generator): Generates custom tailwind.config.js font-family and typography theme extensions.`,
    `- [WCAG Contrast Checker](${baseUrl}/labs/wcag): Real-time web accessibility color contrast analyzer meeting WCAG 2.1 AA/AAA compliance.`,
    ``,
    `---`,
    ``,
    `## Font Pairings (${prescriptions.length} items)`,
    ``,
    prescriptions.length > 0
      ? prescriptions
          .map((p) => {
            const fonts = [p.primaryFont?.name, p.secondaryFont?.name].filter(Boolean).join(" + ");
            return `- [${p.name}](${baseUrl}/prescriptions/${p.slug})${fonts ? ` (${fonts})` : ""}`;
          })
          .join("\n")
      : "_No published prescriptions available._",
    ``,
    `---`,
    ``,
    `## Font Collections & Formulas (${allFormulas.length} items)`,
    ``,
    allFormulas.length > 0
      ? allFormulas
          .map((f) => `- [${f.name}](${baseUrl}/formulas/${f.slug})${f.description ? `: ${f.description}` : ""}`)
          .join("\n")
      : "_No formulas available._",
    ``,
    `---`,
    ``,
    `## Typography Pills / Blog Articles (${pillPosts.length} items)`,
    ``,
    pillPosts.length > 0
      ? pillPosts
          .map((p) => `- [${p.title}](${baseUrl}/pills/${p.slug})${p.caption ? `: ${p.caption}` : ""}`)
          .join("\n")
      : "_No blog posts available._",
    ``,
    `---`,
    ``,
    `## Vintage Archive Posts (${archivePosts.length} items)`,
    ``,
    archivePosts.length > 0
      ? archivePosts
          .map((a) => `- [${a.title}](${baseUrl}/archive/${a.slug})${a.caption ? `: ${a.caption}` : ""}`)
          .join("\n")
      : "_No archive posts available._",
    ``,
    `---`,
    ``,
    `## Font Designers & Foundries (${authors.length} items)`,
    ``,
    authors.length > 0
      ? authors
          .map((a) => `- [${a.name}](${baseUrl}/author/${a.slug})${a.type ? ` (${a.type})` : ""}`)
          .join("\n")
      : "_No authors available._",
    ``,
    `---`,
    ``,
    `## Complete Font Catalog (${ingredients.length} items)`,
    ``,
    ingredients.length > 0
      ? ingredients
          .map((i) => {
            const meta = [i.category, i.licenseType, i.creator ? `by ${i.creator}` : null].filter(Boolean).join(" | ");
            return `- [${i.name}](${baseUrl}/ingredients/${i.slug})${meta ? ` (${meta})` : ""}`;
          })
          .join("\n")
      : "_No ingredients available._",
  ].join("\n");

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
