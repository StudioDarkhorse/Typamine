import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { FontAuthor } from "@/types";
import { withSafeDbQuery } from "./dbMigration";
import { CACHE_TAGS } from "@/lib/cacheTags";
import {
  PLACEHOLDER_FONT_AUTHORS,
  PlaceholderFontAuthorKey,
  UNKNOWN_AFTER_AI_CHECK_FONT_AUTHOR,
} from "@/lib/constants/placeholderFontAuthors";
import crypto from "crypto";

function safeParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const DEFAULT_METRICS = {
  totalFontsCount: 0,
  totalDownloads: 0,
  followersCount: 0,
  usersRating: { average: 0, totalReviews: 0 },
};

// totalFontsCount e usersRating non sono presi dal JSON `metrics` salvato: si
// ricalcolano al volo dai font collegati (Ingredient.userRating/userRatingsCount),
// così restano sempre corretti senza bisogno di un job che li aggiorni.
// totalDownloads/followersCount restano dal JSON — nessuna feature li traccia ancora.
function computeLiveAuthorStats(fonts: { userRating: number | null; userRatingsCount: number | null }[]) {
  let totalReviews = 0;
  let weightedSum = 0;
  for (const f of fonts) {
    const count = f.userRatingsCount ?? 0;
    totalReviews += count;
    weightedSum += (f.userRating ?? 0) * count;
  }
  return {
    totalFontsCount: fonts.length,
    usersRating: {
      average: totalReviews > 0 ? weightedSum / totalReviews : 0,
      totalReviews,
    },
  };
}

export function mapFontAuthor(rec: any): FontAuthor {
  const storedMetrics = safeParse(rec.metrics, DEFAULT_METRICS);
  const liveStats = Array.isArray(rec.fonts) ? computeLiveAuthorStats(rec.fonts) : null;

  return {
    id: rec.id,
    slug: rec.slug,
    name: rec.name,
    type: rec.type ?? "UNKNOWN",
    email: rec.email,
    supportEmail: rec.supportEmail ?? undefined,
    avatarUrl: rec.avatarUrl ?? undefined,
    bannerUrl: rec.bannerUrl ?? undefined,
    bio: rec.bio ?? undefined,
    website: rec.website ?? undefined,
    donation: safeParse(rec.donation, {}),
    nationality: rec.nationality ?? undefined,
    languagesSpoken: safeParse(rec.languagesSpoken, undefined),
    isVerified: Boolean(rec.isVerified),
    socialLinks: safeParse(rec.socialLinks, undefined),
    metrics: liveStats ? { ...storedMetrics, ...liveStats } : storedMetrics,
    businessInfo: safeParse(rec.businessInfo, undefined),
    specialties: safeParse(rec.specialties, undefined),
    status: rec.status ?? "ACTIVE",
    createdAt: rec.createdAt?.toISOString?.() ?? rec.createdAt,
    updatedAt: rec.updatedAt?.toISOString?.() ?? rec.updatedAt,
  };
}

const FONTS_RATING_SELECT = { fonts: { select: { userRating: true, userRatingsCount: true } } };

export const getFontAuthors = unstable_cache(
  async (): Promise<FontAuthor[]> => {
    const records = await withSafeDbQuery(() =>
      prisma.fontAuthor.findMany({ orderBy: { name: "asc" }, include: FONTS_RATING_SELECT })
    );
    return records.map(mapFontAuthor);
  },
  ["font-authors-all"],
  { revalidate: 600, tags: [CACHE_TAGS.fontAuthors, CACHE_TAGS.ingredients] }
);

export async function getFontAuthorBySlug(slug: string): Promise<FontAuthor | null> {
  const record = await withSafeDbQuery(() =>
    prisma.fontAuthor.findUnique({ where: { slug }, include: FONTS_RATING_SELECT })
  );
  return record ? mapFontAuthor(record) : null;
}

export async function getFontAuthorById(id: string): Promise<FontAuthor | null> {
  const record = await withSafeDbQuery(() =>
    prisma.fontAuthor.findUnique({ where: { id }, include: FONTS_RATING_SELECT })
  );
  return record ? mapFontAuthor(record) : null;
}

interface FontAuthorPlaceholderDef {
  slug: string;
  name: string;
  email: string;
}

// Get-or-create generico per un FontAuthor sintetico (placeholder d'import o
// il terminale "unknown after AI check"). Lazy invece che seedati a boot:
// questo progetto non ha un entrypoint di avvio affidabile per un seed
// proattivo (D1/edge), quindi ogni chiamante che ne ha bisogno lo crea al
// primo utilizzo.
async function getOrCreateFontAuthorFromDef(def: FontAuthorPlaceholderDef): Promise<string> {
  const existing = await prisma.fontAuthor.findUnique({ where: { slug: def.slug }, select: { id: true } });
  if (existing) return existing.id;

  try {
    const created = await prisma.fontAuthor.create({
      data: {
        id: crypto.randomUUID(),
        slug: def.slug,
        name: def.name,
        type: "UNKNOWN",
        email: def.email,
        donation: "{}",
        metrics: JSON.stringify(DEFAULT_METRICS),
        status: "ACTIVE",
        isVerified: false,
        createdAt: new Date(),
      },
    });
    return created.id;
  } catch {
    // Race: un'altra richiesta l'ha creato tra il findUnique e la create qui sopra.
    const retry = await prisma.fontAuthor.findUnique({ where: { slug: def.slug }, select: { id: true } });
    if (retry) return retry.id;
    throw new Error(`Failed to get or create font author "${def.slug}".`);
  }
}

export async function getOrCreatePlaceholderFontAuthorId(key: PlaceholderFontAuthorKey): Promise<string> {
  return getOrCreateFontAuthorFromDef(PLACEHOLDER_FONT_AUTHORS[key]);
}

export async function getAllPlaceholderFontAuthorIds(): Promise<string[]> {
  const keys = Object.keys(PLACEHOLDER_FONT_AUTHORS) as PlaceholderFontAuthorKey[];
  return Promise.all(keys.map((key) => getOrCreatePlaceholderFontAuthorId(key)));
}

// Placeholder TERMINALE: assegnato quando l'AI e' stata interrogata su un
// font e ha risposto "Unknown" — a differenza dei placeholder d'import sopra
// (che significano "da controllare"), questo significa "gia' controllato,
// resta ignoto" e va escluso dai futuri candidati AI (vedi
// lib/constants/placeholderFontAuthors.ts).
export async function getOrCreateUnknownAfterAiCheckAuthorId(): Promise<string> {
  return getOrCreateFontAuthorFromDef(UNKNOWN_AFTER_AI_CHECK_FONT_AUTHOR);
}

export async function getAllNonRealFontAuthorIds(): Promise<string[]> {
  const [placeholderIds, unknownAfterAiCheckId] = await Promise.all([
    getAllPlaceholderFontAuthorIds(),
    getOrCreateUnknownAfterAiCheckAuthorId(),
  ]);
  return [...placeholderIds, unknownAfterAiCheckId];
}

const DEFAULT_FONT_AUTHOR_METRICS_JSON = JSON.stringify(DEFAULT_METRICS);

// Crea (o riusa se il nome esiste gia') un FontAuthor sintetico per un nome
// reale scoperto fuori dal form completo — solo il nome e' noto, tutto il
// resto (email, slug) e' generato seguendo la stessa naming convention degli
// altri placeholder (`{slug}@{tag}.typamine.internal`), cosi' e' sempre
// chiaro DA DOVE viene il dato guardando l'email. `emailDomainTag` distingue
// il processo che ha popolato il nome (es. "ai-discovered" vs "manually-filled").
async function findOrCreateSyntheticFontAuthorByName(name: string, emailDomainTag: string): Promise<string> {
  const trimmed = name.trim();

  const existing = await prisma.fontAuthor.findFirst({ where: { name: trimmed } });
  if (existing) return existing.id;

  const baseSlug = trimmed
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  let slug = baseSlug || crypto.randomUUID().slice(0, 8);
  let i = 2;
  while (await prisma.fontAuthor.findFirst({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  const author = await prisma.fontAuthor.create({
    data: {
      id: crypto.randomUUID(),
      slug,
      name: trimmed,
      type: "UNKNOWN",
      email: `${slug}@${emailDomainTag}.typamine.internal`,
      donation: "{}",
      metrics: DEFAULT_FONT_AUTHOR_METRICS_JSON,
      status: "ACTIVE",
      isVerified: false,
      createdAt: new Date(),
    },
  });

  revalidatePath("/admin/font-authors");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");

  return author.id;
}

// Trova un FontAuthor reale gia' esistente per nome, o lo crea al volo.
// Condiviso tra lib/actions/font.ts (quando Gemini identifica l'autore reale
// dietro un font ancora sul placeholder d'import) e le route di bulk import
// da provider (quando il designer e' gia' noto dal payload — es. Fontshare
// lo fornisce sempre — cosi' il font non finisce con un authorId nullo
// nonostante il nome reale sia gia' disponibile).
export async function findOrCreateFontAuthorByName(name: string): Promise<string | null> {
  const trimmed = name.trim();
  if (!trimmed || trimmed.toLowerCase() === "unknown") return null;
  return findOrCreateSyntheticFontAuthorByName(trimmed, "ai-discovered");
}

// Import da 1001fonts: oltre al nome arriva anche il link al profilo autore
// sul sito, che a differenza di dafont è già la "profile info page" (la pagina
// con i contatti) — nessun passaggio intermedio da fare dopo. Finisce quindi
// nella stessa colonna generica `profileInfoUrl` che la catena dafont riempie
// al secondo salto. Salvato alla creazione e, sugli autori già esistenti,
// riempito se ancora mancante — mai sovrascritto.
export async function findOrCreateFontAuthorFromFonts1001(
  name: string,
  profileUrl: string | null
): Promise<string | null> {
  const trimmed = name.trim();
  if (!trimmed || trimmed.toLowerCase() === "unknown") return null;

  const authorId = await findOrCreateSyntheticFontAuthorByName(trimmed, "1001fonts-import");

  if (profileUrl) {
    const existing = await withSafeDbQuery(() =>
      prisma.fontAuthor.findUnique({
        where: { id: authorId },
        select: { profileInfoUrl: true },
      })
    );
    if (!existing?.profileInfoUrl) {
      await withSafeDbQuery(() =>
        prisma.fontAuthor.update({ where: { id: authorId }, data: { profileInfoUrl: profileUrl } })
      );
      revalidatePath("/admin/font-authors");
      revalidateTag(CACHE_TAGS.fontAuthors, "max");
    }
  }

  return authorId;
}

// Stesso meccanismo ma per il flow "Fill Missing Authors" in dashboard:
// l'admin digita solo il nome, un font alla volta — nessun bypass "unknown"
// qui, il nome e' sempre garantito non vuoto dal chiamante.
export async function findOrCreateManuallyFilledFontAuthorByName(name: string): Promise<string> {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Author name is required.");
  return findOrCreateSyntheticFontAuthorByName(trimmed, "manually-filled");
}

async function readFontAuthorMetrics(authorId: string): Promise<Record<string, any> | null> {
  const author = await prisma.fontAuthor.findUnique({ where: { id: authorId }, select: { metrics: true } });
  if (!author) return null;
  return safeParse(author.metrics, { ...DEFAULT_METRICS });
}

// Un font ancora agganciato a un placeholder d'import, o al terminale
// "unknown after AI check", non ha un autore reale: aggregare voti/download
// sotto quell'id mischierebbe font scorrelati (tutti i font "Google Fonts"
// non ancora risolti, o tutti quelli che l'AI non e' riuscita a identificare,
// condividono lo stesso id sintetico).
async function isPlaceholderAuthorId(authorId: string): Promise<boolean> {
  const nonRealIds = await getAllNonRealFontAuthorIds();
  return nonRealIds.includes(authorId);
}

// Richiamato dopo ogni voto pubblico su un font (vedi
// app/api/ingredients/[slug]/rate/route.ts): ricalcola FontAuthor.userRating
// come MEDIA SEMPLICE degli userRating dei suoi font (ognuno gia' una media
// dei voti ricevuti) — non pesata per numero di voti, e basta un solo voto
// per far entrare un font nel calcolo (nessuna soglia minima).
export async function recomputeFontAuthorUserRating(authorId: string): Promise<void> {
  if (await isPlaceholderAuthorId(authorId)) return;

  const fonts = await prisma.ingredient.findMany({
    where: { authorId, userRatingsCount: { gt: 0 } },
    select: { userRating: true, userRatingsCount: true },
  });

  if (fonts.length === 0) return;

  const average = fonts.reduce((sum, f) => sum + (f.userRating ?? 0), 0) / fonts.length;
  const totalReviews = fonts.reduce((sum, f) => sum + (f.userRatingsCount ?? 0), 0);

  const metrics = await readFontAuthorMetrics(authorId);
  if (!metrics) return;

  metrics.usersRating = { average, totalReviews };

  await prisma.fontAuthor.update({ where: { id: authorId }, data: { metrics: JSON.stringify(metrics) } });

  revalidatePath("/admin/font-authors");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");
}

// Richiamato dopo ogni download pubblico riuscito di un font (vedi
// app/api/ingredients/[slug]/download/route.ts). Nessuna fonte "live" da cui
// ricalcolarlo (a differenza del rating): e' un contatore cumulativo puro,
// va incrementato qui.
export async function incrementFontAuthorDownloads(authorId: string): Promise<void> {
  if (await isPlaceholderAuthorId(authorId)) return;

  const metrics = await readFontAuthorMetrics(authorId);
  if (!metrics) return;

  metrics.totalDownloads = (metrics.totalDownloads ?? 0) + 1;

  await prisma.fontAuthor.update({ where: { id: authorId }, data: { metrics: JSON.stringify(metrics) } });

  revalidatePath("/admin/font-authors");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");
}
