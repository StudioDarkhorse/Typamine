import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Prisma } from "../../prisma/generated-client";
import { Ingredient, FontVariant, Tag } from "@/types";
import { CACHE_TAGS } from "@/lib/cacheTags";

type IngredientRecord = Prisma.IngredientGetPayload<{ include: { variants: true; tags: true; author: true } }>;

// Righe create prima dell'introduzione della colonna `createdAt` possono avere
// un NULL letterale nonostante lo schema la dichiari NOT NULL (il DEFAULT a
// livello SQL non è stato applicato retroattivamente su ogni binding — D1
// locale, D1 remoto, sqlite locale — quando la colonna è stata aggiunta).
// Se una query fallisce per questo, la ripariamo una volta sola sulla stessa
// connessione realmente in uso e ritentiamo, invece di dover indovinare quale
// database fisico il processo in esecuzione sta usando.
import { withSafeDbQuery } from "./dbMigration";

export async function withCreatedAtBackfill<T>(run: () => Promise<T>): Promise<T> {
  return withSafeDbQuery(run);
}

// Normalizza il record Prisma (campi nullable, style non tipizzato) nella shape
// pubblica `Ingredient` usata dai componenti — i servizi pubblici non devono
// esporre direttamente le convenzioni del DB (null vs undefined, string vs union).
function toIngredient(record: IngredientRecord): Ingredient {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    category: record.category,
    creator: record.creator ?? undefined,
    rating: record.rating,
    symbol: record.symbol ?? undefined,
    formula: record.formula ?? undefined,
    importedFrom: record.importedFrom ?? undefined,
    licenseType: record.licenseType ?? undefined,
    isVariable: record.isVariable,
    userRating: record.userRating ?? 0,
    userRatingsCount: record.userRatingsCount ?? 0,
    authorId: record.authorId ?? undefined,
    author: record.author
      ? { id: record.author.id, name: record.author.name, slug: record.author.slug, avatarUrl: record.author.avatarUrl ?? undefined, isVerified: record.author.isVerified }
      : undefined,
    tags: (record.tags || []).map((t): Tag => ({
      id: t.id,
      name: t.name,
      description: t.description ?? undefined,
    })),
    variants: record.variants.map((v): FontVariant => ({
      id: v.id,
      fontFamilyName: v.fontFamilyName,
      weight: v.weight,
      style: v.style as FontVariant["style"],
      woff2Url: v.woff2Url,
      label: v.label,
    })),
  };
}

export const getRecentIngredients = unstable_cache(
  async (limit = 4): Promise<Ingredient[]> => {
    const records = await withCreatedAtBackfill(() =>
      prisma.ingredient.findMany({
        include: { variants: true, tags: true, author: true },
        orderBy: { createdAt: "desc" },
        take: limit,
      })
    );
    return records.map(toIngredient);
  },
  ["ingredients-recent"],
  { revalidate: 300, tags: [CACHE_TAGS.ingredients] }
);

export interface IngredientsPageResult {
  items: Ingredient[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export type IngredientSort = "recent" | "name_asc" | "name_desc" | "rating_desc";

export interface GetIngredientsPageOptions {
  page?: number;
  perPage?: number;
  category?: string;
  /** Soglia minima (es. "8.0") — confronto lessicografico su stringhe "X.Y", coerente con i dati esistenti. */
  rating?: string;
  licenseType?: string;
  /** Font che hanno ALMENO UNO di questi tag (unione, non intersezione). */
  tagIds?: string[];
  search?: string;
  sort?: IngredientSort;
}

export const getIngredientsCount = unstable_cache(
  async (
    category?: string,
    rating?: string,
    licenseType?: string,
    tagIdsSerialized?: string,
    search?: string
  ): Promise<number> => {
    const where: Prisma.IngredientWhereInput = {};
    if (category && category !== "ALL") where.category = category;
    if (rating && rating !== "ALL") where.rating = { gte: rating };
    if (licenseType && licenseType !== "ALL") {
      const licenses = licenseType.split(",").filter(Boolean);
      if (licenses.length > 0) {
        where.licenseType = { in: licenses };
      }
    }
    const tagIds = tagIdsSerialized ? tagIdsSerialized.split(",").filter(Boolean) : [];
    if (tagIds.length > 0) where.tags = { some: { id: { in: tagIds } } };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { formula: { contains: search } },
        { creator: { contains: search } },
      ];
    }
    return withCreatedAtBackfill(() => prisma.ingredient.count({ where }));
  },
  ["ingredients-count"],
  { revalidate: 60, tags: [CACHE_TAGS.ingredients] }
);

export const getIngredientsPage = unstable_cache(
  async ({
    page = 1,
    perPage = 12,
    category,
    rating,
    licenseType,
    tagIds,
    search,
    sort = "recent",
  }: GetIngredientsPageOptions = {}): Promise<IngredientsPageResult> => {
    const where: Prisma.IngredientWhereInput = {};
    if (category && category !== "ALL") where.category = category;
    if (rating && rating !== "ALL") where.rating = { gte: rating };
    if (licenseType && licenseType !== "ALL") {
      const licenses = licenseType.split(",").filter(Boolean);
      if (licenses.length > 0) {
        where.licenseType = { in: licenses };
      }
    }
    if (tagIds && tagIds.length > 0) where.tags = { some: { id: { in: tagIds } } };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { formula: { contains: search } },
        { creator: { contains: search } },
      ];
    }

    const orderBy: Prisma.IngredientOrderByWithRelationInput =
      sort === "name_asc" ? { name: "asc" }
      : sort === "name_desc" ? { name: "desc" }
      : sort === "rating_desc" ? { rating: "desc" }
      : { createdAt: "desc" };

    const total = await getIngredientsCount(
      category,
      rating,
      licenseType,
      tagIds?.join(","),
      search
    );

    const records = await withCreatedAtBackfill(() =>
      prisma.ingredient.findMany({
        where,
        include: { variants: true, tags: true, author: true },
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
      })
    );

    return {
      items: records.map(toIngredient),
      total,
      page,
      perPage,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    };
  },
  ["ingredients-page"],
  { revalidate: 60, tags: [CACHE_TAGS.ingredients] }
);

// Catalogo completo per i tool /labs (select "carica dal catalogo").
// Non si può chiedere in un colpo solo: con `include` di variants/tags/author
// Prisma emette una query per relazione con un `IN (...)` che contiene un
// binding per ogni id — su D1 il limite è 100 variabili per query, quindi una
// pagina da 200 font fa fallire tutto con
// "D1_ERROR: too many SQL variables". Impaginiamo a blocchi da 50 e
// concateniamo: 4 query invece di una che non parte.
const LABS_CATALOG_CHUNK = 50;

export const getLabsFontCatalog = unstable_cache(
  async (limit = 200): Promise<Ingredient[]> => {
    const items: Ingredient[] = [];
    for (let page = 1; items.length < limit; page++) {
      const chunk = await getIngredientsPage({
        page,
        perPage: Math.min(LABS_CATALOG_CHUNK, limit - items.length),
        sort: "name_asc",
      });
      items.push(...chunk.items);
      if (page >= chunk.totalPages || chunk.items.length === 0) break;
    }
    return items;
  },
  ["labs-font-catalog"],
  { revalidate: 300, tags: [CACHE_TAGS.ingredients] }
);

export const getIngredientsByAuthorId = unstable_cache(
  async (authorId: string): Promise<Ingredient[]> => {
    const records = await withCreatedAtBackfill(() =>
      prisma.ingredient.findMany({
        where: { authorId },
        include: { variants: true, tags: true, author: true },
        orderBy: { name: "asc" },
      })
    );
    return records.map(toIngredient);
  },
  ["ingredients-by-author"],
  { revalidate: 300, tags: [CACHE_TAGS.ingredients] }
);

export const getIngredientBySlug = unstable_cache(
  async (slug: string): Promise<Ingredient | null> => {
    const record = await withCreatedAtBackfill(() =>
      prisma.ingredient.findUnique({
        where: { slug },
        include: { variants: true, tags: true, author: true },
      })
    );
    return record ? toIngredient(record) : null;
  },
  ["ingredient-by-slug"],
  { revalidate: 300, tags: [CACHE_TAGS.ingredients] }
);
