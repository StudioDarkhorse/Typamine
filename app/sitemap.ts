import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { withSafeDbQuery } from "@/lib/services/dbMigration";
import { getAllNonRealFontAuthorIds } from "@/lib/services/fontAuthor";
import { getVirtualFormulas } from "@/lib/services/virtualFormula";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600; // Cache la sitemap per 1 ora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL).replace(/\/+$/, "");

  // 1. Rotte statiche pubbliche principali e di servizio
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ingredients`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formulas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prescriptions`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pills`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/labs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/labs/font-converter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/labs/font-face-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/labs/tailwind-generator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/labs/wcag`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Fetch di tutte le entità dinamiche con slug
  let ingredients: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];
  let authors: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];
  let archivePosts: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];
  let pillPosts: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];
  let prescriptions: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];
  let realFormulas: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];
  let virtualFormulas: Array<{ slug: string; updatedAt?: Date | string | null; createdAt?: Date | string | null }> = [];

  try {
    const nonRealAuthorIds = await getAllNonRealFontAuthorIds().catch(() => []);

    const [
      ingredientsRes,
      authorsRes,
      archiveRes,
      pillsRes,
      prescriptionsRes,
      formulasRes,
      virtualFormulasRes,
    ] = await withSafeDbQuery(() =>
      Promise.all([
        prisma.ingredient.findMany({
          select: { slug: true, updatedAt: true, createdAt: true },
        }),
        prisma.fontAuthor.findMany({
          where: {
            status: "ACTIVE",
            ...(nonRealAuthorIds.length > 0 ? { id: { notIn: nonRealAuthorIds } } : {}),
          },
          select: { slug: true, updatedAt: true, createdAt: true },
        }),
        prisma.post.findMany({
          where: { published: true, postType: "ARCHIVE" },
          select: { slug: true, updatedAt: true, createdAt: true },
        }),
        prisma.post.findMany({
          where: { published: true, postType: "BLOG" },
          select: { slug: true, updatedAt: true, createdAt: true },
        }),
        prisma.prescription.findMany({
          where: { published: true },
          select: { slug: true, updatedAt: true, createdAt: true },
        }),
        prisma.formula.findMany({
          select: { slug: true, updatedAt: true, createdAt: true },
        }),
        getVirtualFormulas().catch(() => []),
      ])
    );

    ingredients = ingredientsRes;
    authors = authorsRes;
    archivePosts = archiveRes;
    pillPosts = pillsRes;
    prescriptions = prescriptionsRes;
    realFormulas = formulasRes;
    virtualFormulas = virtualFormulasRes;
  } catch (error) {
    console.error("[Sitemap Error] Error fetching dynamic sitemap entries:", error);
  }

  const parseDate = (d?: Date | string | null): Date => {
    if (!d) return new Date();
    const parsed = typeof d === "string" ? new Date(d) : d;
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  // Generazione rotte dinamiche per ogni sezione
  const ingredientRoutes: MetadataRoute.Sitemap = ingredients.map((item) => ({
    url: `${baseUrl}/ingredients/${item.slug}`,
    lastModified: parseDate(item.updatedAt ?? item.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((item) => ({
    url: `${baseUrl}/author/${item.slug}`,
    lastModified: parseDate(item.updatedAt ?? item.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const archiveRoutes: MetadataRoute.Sitemap = archivePosts.map((item) => ({
    url: `${baseUrl}/archive/${item.slug}`,
    lastModified: parseDate(item.updatedAt ?? item.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pillRoutes: MetadataRoute.Sitemap = pillPosts.map((item) => ({
    url: `${baseUrl}/pills/${item.slug}`,
    lastModified: parseDate(item.updatedAt ?? item.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const prescriptionRoutes: MetadataRoute.Sitemap = prescriptions.map((item) => ({
    url: `${baseUrl}/prescriptions/${item.slug}`,
    lastModified: parseDate(item.updatedAt ?? item.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Formule reali + formule virtuali (deduplicate per slug)
  const realFormulaSlugs = new Set(realFormulas.map((f) => f.slug));
  const formulaRoutes: MetadataRoute.Sitemap = [
    ...realFormulas.map((item) => ({
      url: `${baseUrl}/formulas/${item.slug}`,
      lastModified: parseDate(item.updatedAt ?? item.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...virtualFormulas
      .filter((vf) => !realFormulaSlugs.has(vf.slug))
      .map((item) => ({
        url: `${baseUrl}/formulas/${item.slug}`,
        lastModified: parseDate(item.updatedAt ?? item.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];

  return [
    ...staticRoutes,
    ...ingredientRoutes,
    ...authorRoutes,
    ...prescriptionRoutes,
    ...formulaRoutes,
    ...pillRoutes,
    ...archiveRoutes,
  ];
}
