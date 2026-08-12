"use server";

import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import { withSafeDbQuery, withD1Retry } from "@/lib/services/dbMigration";
import { CACHE_TAGS } from "@/lib/cacheTags";
import { FREE_LICENSE_TYPES } from "@/lib/constants/fontLicenseTypes";
import { sendTemplateMail, sendResendTemplateMail } from "@/lib/services/email";
import { listLocalTemplates } from "@/lib/services/emailTemplates";
import { getAllNonRealFontAuthorIds } from "@/lib/services/fontAuthor";
import {
  scrapeDafontAuthorProfileFromFont,
  scrapeDafontProfileInfoUrl,
  scrapeDafontProfileEmail,
  buildDafontUrl,
} from "@/lib/services/dafontScraper";
import { isSameDafontAuthorName } from "@/lib/scraper";
import crypto from "crypto";

async function checkPermission(permission: string) {
  const session = await getServerAuthSession();
  const permissions = session?.user?.permissions || [];
  const roles = session?.user?.roles || [];
  const isSuperAdmin = roles.includes("SUPERADMIN") || roles.includes("ADMIN");

  if (!isSuperAdmin && !permissions.includes(permission)) {
    throw new Error("Unauthorized");
  }
  return session;
}

const DEFAULT_METRICS = JSON.stringify({
  totalFontsCount: 0,
  totalDownloads: 0,
  followersCount: 0,
  usersRating: { average: 0, totalReviews: 0 },
});

export async function getAdminFontAuthors() {
  await checkPermission("fontAuthor:read");
  return withSafeDbQuery(() =>
    prisma.fontAuthor.findMany({ orderBy: { name: "asc" } })
  );
}

// Creazione rapida usata dal popup "+ New Author" in FontForm — solo i campi
// minimi indispensabili (nome, email, tipo), slug auto-generato con
// dedup incrementale. Ritorna {id, name} così il chiamante può selezionare
// subito il nuovo autore senza un refetch dell'intera lista.
export async function quickCreateFontAuthor(
  formData: FormData
): Promise<{ id: string; name: string } | { error: string }> {
  const session = await getServerAuthSession();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    await checkPermission("fontAuthor:create");

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const type = (formData.get("type") as string) || "INDIVIDUAL";

    if (!name || !email) {
      return { error: "Name and email are required." };
    }

    const baseSlug = name
      .toLowerCase()
      .trim()
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
        name,
        type,
        email,
        donation: "{}",
        metrics: DEFAULT_METRICS,
        status: "ACTIVE",
        isVerified: false,
        createdAt: new Date(),
      },
    });

    revalidatePath("/admin/font-authors");
    revalidateTag(CACHE_TAGS.fontAuthors, "max");

    return { id: author.id, name: author.name };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[FontAuthor Action] Error quick-creating font author:", error);
    return { error: errorMessage || "Failed to create font author." };
  }
}

export async function getAdminFontAuthorById(id: string) {
  await checkPermission("fontAuthor:read");
  return withSafeDbQuery(() =>
    prisma.fontAuthor.findUnique({
      where: { id },
      include: { fonts: { select: { userRating: true, userRatingsCount: true } } },
    })
  );
}

export async function deleteFontAuthor(id: string) {
  await checkPermission("fontAuthor:delete");

  const author = await prisma.fontAuthor.findUnique({
    where: { id },
    select: { avatarUrl: true, bannerUrl: true },
  });

  if (author?.avatarUrl) {
    try {
      await deleteFromR2(author.avatarUrl);
    } catch (err) {
      console.warn("Failed to delete author avatar from R2:", err);
    }
  }
  if (author?.bannerUrl) {
    try {
      await deleteFromR2(author.bannerUrl);
    } catch (err) {
      console.warn("Failed to delete author banner from R2:", err);
    }
  }

  await prisma.fontAuthor.delete({ where: { id } });
  revalidatePath("/admin/font-authors");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");
}

// Parse helpers: ogni campo "composto" arriva dal form come JSON serializzato
// da un hidden input (stesso pattern di `insight` in lib/actions/pairing.ts),
// tranne le liste semplici (lingue/specialties) che arrivano come stringa
// comma-separated da uno <Input> testuale.
function parseCsvList(raw: string | null): string[] | undefined {
  const trimmed = (raw || "").trim();
  if (!trimmed) return undefined;
  const list = trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  return list.length > 0 ? list : undefined;
}

function parseJsonField<T>(raw: string | null): T | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return undefined;
  }
}

export async function saveFontAuthor(prevState: any, formData: FormData, id?: string) {
  const session = await getServerAuthSession();
  if (!session?.user) return "Unauthorized";

  try {
    if (id) {
      await checkPermission("fontAuthor:update");
    } else {
      await checkPermission("fontAuthor:create");
    }

    const name = (formData.get("name") as string)?.trim();
    const slug = (formData.get("slug") as string)?.trim();
    const type = (formData.get("type") as string) || "INDIVIDUAL";
    const email = (formData.get("email") as string)?.trim();
    const supportEmail = (formData.get("supportEmail") as string)?.trim() || null;
    const bio = (formData.get("bio") as string)?.trim() || null;
    const website = (formData.get("website") as string)?.trim() || null;
    const dafontProfileUrl = (formData.get("dafontProfileUrl") as string)?.trim() || null;
    const dafontProfileInfoUrl = (formData.get("dafontProfileInfoUrl") as string)?.trim() || null;
    const nationality = (formData.get("nationality") as string)?.trim() || null;
    const status = (formData.get("status") as string) || "ACTIVE";
    const isVerified = formData.get("isVerified") === "true";

    if (!name || !slug || !email) {
      return "Name, Slug, and Email are required.";
    }

    // Unique slug check
    const existingSlug = await prisma.fontAuthor.findFirst({
      where: { slug, NOT: id ? { id } : undefined },
    });
    if (existingSlug) {
      return "A font author with this slug already exists.";
    }

    const languagesSpoken = parseCsvList(formData.get("languagesSpoken") as string | null);
    const specialties = parseCsvList(formData.get("specialties") as string | null);

    const socialLinks = parseJsonField<unknown[]>(formData.get("socialLinks") as string | null);
    const donation = parseJsonField<Record<string, unknown>>(formData.get("donation") as string | null) || {};
    const businessInfo = parseJsonField<Record<string, unknown>>(formData.get("businessInfo") as string | null);

    let existingAuthor: { avatarUrl: string | null; bannerUrl: string | null; metrics: string | null } | null = null;
    if (id) {
      existingAuthor = await prisma.fontAuthor.findUnique({
        where: { id },
        select: { avatarUrl: true, bannerUrl: true, metrics: true },
      });
    }

    const authorId = id || crypto.randomUUID();
    const removeAvatar = formData.get("removeAvatar") === "true";
    const removeBanner = formData.get("removeBanner") === "true";
    const avatarFile = formData.get("avatar") as File | null;
    const bannerFile = formData.get("banner") as File | null;

    const baseData = {
      name,
      slug,
      type,
      email,
      supportEmail,
      bio,
      website,
      dafontProfileUrl,
      dafontProfileInfoUrl,
      nationality,
      status,
      isVerified,
      languagesSpoken: languagesSpoken ? JSON.stringify(languagesSpoken) : null,
      specialties: specialties ? JSON.stringify(specialties) : null,
      socialLinks: socialLinks ? JSON.stringify(socialLinks) : null,
      donation: JSON.stringify(donation),
      businessInfo: businessInfo ? JSON.stringify(businessInfo) : null,
      // Le metriche sono calcolate dal sistema, non editabili da form: in
      // creazione partono a zero, in modifica restano quelle già presenti.
      metrics: id ? existingAuthor?.metrics ?? DEFAULT_METRICS : DEFAULT_METRICS,
    };

    let author;
    if (id) {
      author = await prisma.fontAuthor.update({ where: { id }, data: baseData });
    } else {
      author = await prisma.fontAuthor.create({
        data: { id: authorId, ...baseData, createdAt: new Date() },
      });
    }

    // R2 avatar/banner processing — dopo la scrittura DB base, stesso schema
    // rollback-safe di lib/actions/font.ts (elimina i file appena caricati se
    // qualcosa fallisce dopo).
    const uploadedKeys: string[] = [];
    try {
      if (removeAvatar) {
        await prisma.fontAuthor.update({ where: { id: author.id }, data: { avatarUrl: null } });
        if (existingAuthor?.avatarUrl) {
          try {
            await deleteFromR2(existingAuthor.avatarUrl);
          } catch (cleanError) {
            console.warn("Failed to delete previous avatar from R2:", cleanError);
          }
        }
      } else if (avatarFile && avatarFile.size > 0) {
        const buffer = Buffer.from(await avatarFile.arrayBuffer());
        const ext = avatarFile.name.split(".").pop() || "png";
        const fileName = `${author.id}-avatar-${Date.now()}.${ext}`;
        const { url, key } = await uploadToR2(buffer, "font-authors/avatars", fileName, avatarFile.type || "image/png");
        uploadedKeys.push(key);
        await prisma.fontAuthor.update({ where: { id: author.id }, data: { avatarUrl: url } });
        if (existingAuthor?.avatarUrl) {
          try {
            await deleteFromR2(existingAuthor.avatarUrl);
          } catch (cleanError) {
            console.warn("Failed to delete previous avatar from R2:", cleanError);
          }
        }
      }

      if (removeBanner) {
        await prisma.fontAuthor.update({ where: { id: author.id }, data: { bannerUrl: null } });
        if (existingAuthor?.bannerUrl) {
          try {
            await deleteFromR2(existingAuthor.bannerUrl);
          } catch (cleanError) {
            console.warn("Failed to delete previous banner from R2:", cleanError);
          }
        }
      } else if (bannerFile && bannerFile.size > 0) {
        const buffer = Buffer.from(await bannerFile.arrayBuffer());
        const ext = bannerFile.name.split(".").pop() || "png";
        const fileName = `${author.id}-banner-${Date.now()}.${ext}`;
        const { url, key } = await uploadToR2(buffer, "font-authors/banners", fileName, bannerFile.type || "image/png");
        uploadedKeys.push(key);
        await prisma.fontAuthor.update({ where: { id: author.id }, data: { bannerUrl: url } });
        if (existingAuthor?.bannerUrl) {
          try {
            await deleteFromR2(existingAuthor.bannerUrl);
          } catch (cleanError) {
            console.warn("Failed to delete previous banner from R2:", cleanError);
          }
        }
      }
    } catch (r2Error) {
      for (const key of uploadedKeys) {
        try {
          await deleteFromR2(key);
        } catch (cleanupError) {
          console.error("Critical: failed to rollback uploaded key from R2:", cleanupError);
        }
      }
      if (!id) {
        try {
          await prisma.fontAuthor.delete({ where: { id: author.id } });
        } catch (dbDeleteError) {
          console.error("Critical: failed to roll back font author creation after R2 error:", dbDeleteError);
        }
      }
      throw r2Error;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[FontAuthor Action] Error saving font author:", error);
    return errorMessage || "Failed to save font author.";
  }

  revalidatePath("/admin/font-authors");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");
}

// ---------------------------------------------------------------------------
// Key task "Scrape Author Dafont Profiles" (dashboard)
//
// La pagina profilo di un autore su dafont ha un id numerico
// (dafont.com/mjtype.d10200) che NON è derivabile dal suo nome: l'unico modo
// per ottenerla è leggerla dalla PDP di un suo font, dove dafont scrive
// "by [Nome](url-profilo)". Quindi per ogni autore si prende il suo primo
// font, si costruisce l'url dafont dal nome (stesso slug di "Force Dafont
// Scraping": underscore e spazi → trattini) e si estrae il link dal markdown.
// ---------------------------------------------------------------------------

export interface DafontProfileCandidateAuthor {
  id: string;
  name: string;
  firstFontId: string;
  firstFontName: string;
  /** Url della PDP che verrà interrogata — mostrato nel log della modale. */
  dafontFontUrl: string;
}

// Candidati: autori REALI (i placeholder d'import e "unknown after AI check"
// non hanno una pagina dafont) senza profilo già salvato. Il filtro "ha almeno
// un font" NON sta qui: un filtro di relazione (`fonts: { some: {} }`) o un
// select annidato con orderBy/take mandano il query engine in panic
// ("no entry found for key") sull'adapter D1. I font si leggono con una query
// flat separata e si raggruppano in JS — vedi getFirstFontByAuthorId.
async function getDafontProfileCandidateWhere() {
  const nonRealAuthorIds = await getAllNonRealFontAuthorIds();
  return {
    id: { notIn: nonRealAuthorIds },
    OR: [{ dafontProfileUrl: null }, { dafontProfileUrl: "" }],
  };
}

// Primo font (per data di creazione) di ciascuno degli autori passati.
// Nessun `authorId: { in: [...] }`: i candidati sono centinaia e D1 ha un tetto
// basso di bound parameter per query. Si leggono tutte le righe con le sole 3
// colonne che servono (catalogo nell'ordine delle centinaia di font) e si
// filtra/raggruppa in JS.
async function getFirstFontByAuthorId(authorIds: string[]): Promise<Map<string, { id: string; name: string }>> {
  const firstByAuthor = new Map<string, { id: string; name: string }>();
  if (authorIds.length === 0) return firstByAuthor;

  const wanted = new Set(authorIds);
  const fonts = await withSafeDbQuery(() =>
    prisma.ingredient.findMany({
      select: { id: true, name: true, authorId: true },
      orderBy: { createdAt: "asc" },
    })
  );

  for (const font of fonts) {
    if (!font.authorId || !wanted.has(font.authorId) || firstByAuthor.has(font.authorId)) continue;
    firstByAuthor.set(font.authorId, { id: font.id, name: font.name });
  }
  return firstByAuthor;
}

async function collectDafontProfileCandidates(): Promise<DafontProfileCandidateAuthor[]> {
  const where = await getDafontProfileCandidateWhere();

  const authors = await withSafeDbQuery(() =>
    prisma.fontAuthor.findMany({
      where,
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    })
  );

  const firstByAuthor = await getFirstFontByAuthorId(authors.map((author) => author.id));

  return authors.flatMap((author) => {
    const font = firstByAuthor.get(author.id);
    if (!font) return [];
    return [{
      id: author.id,
      name: author.name,
      firstFontId: font.id,
      firstFontName: font.name,
      dafontFontUrl: buildDafontUrl(font.name),
    }];
  });
}

export async function getAuthorsNeedingDafontProfile(): Promise<DafontProfileCandidateAuthor[]> {
  await checkPermission("fontAuthor:read");
  return collectDafontProfileCandidates();
}

// Stessa lista dei candidati, contata: il numero mostrato sulla card deve
// coincidere con quello che la modale poi processa (autori senza profilo E con
// almeno un font), quindi niente count() separato su un where diverso.
export async function getAuthorsNeedingDafontProfileCount(): Promise<number> {
  await checkPermission("fontAuthor:read");
  const candidates = await withD1Retry(() => collectDafontProfileCandidates());
  return candidates.length;
}

export interface ScrapeAuthorDafontProfileResult {
  id: string;
  name: string;
  /** Url della PDP interrogata. */
  fontUrl: string;
  /** true se la pagina del font non esiste su dafont (404). */
  notFound: boolean;
  /** Profilo trovato e salvato, null se la pagina non lo conteneva. */
  profileUrl: string | null;
}

/**
 * Trova e salva il link al profilo dafont di un singolo autore, partendo dal
 * suo primo font. Salvataggio immediato (una write per autore) così una
 * cancellazione a metà lascia comunque tutto quello già trovato.
 */
export async function scrapeAuthorDafontProfile(authorId: string): Promise<ScrapeAuthorDafontProfileResult> {
  await checkPermission("fontAuthor:update");

  const author = await withSafeDbQuery(() =>
    prisma.fontAuthor.findUnique({
      where: { id: authorId },
      select: { id: true, name: true, dafontProfileUrl: true },
    })
  );
  if (!author) throw new Error("Font author not found");

  // findFirst flat invece di un select annidato con orderBy/take (che fa
  // panicare il query engine su D1 — vedi getFirstFontByAuthorId).
  const firstFont = await withSafeDbQuery(() =>
    prisma.ingredient.findFirst({
      where: { authorId: author.id },
      select: { id: true, name: true },
      orderBy: { createdAt: "asc" },
    })
  );
  if (!firstFont) throw new Error(`${author.name} has no fonts to look up.`);

  const fontUrl = buildDafontUrl(firstFont.name);
  console.log(`[DafontAuthorProfile] "${author.name}" → via font "${firstFont.name}" (${fontUrl})`);

  const result = await scrapeDafontAuthorProfileFromFont(firstFont.name);

  if (result.notFound) {
    return { id: author.id, name: author.name, fontUrl, notFound: true, profileUrl: null };
  }

  if (!result.profileUrl) {
    console.log(`[DafontAuthorProfile] "${author.name}" → no author link on the page, nothing to save`);
    return { id: author.id, name: author.name, fontUrl, notFound: false, profileUrl: null };
  }

  await withSafeDbQuery(() =>
    prisma.fontAuthor.update({ where: { id: author.id }, data: { dafontProfileUrl: result.profileUrl } })
  );

  revalidatePath("/admin/font-authors");
  revalidatePath("/admin");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");

  return { id: author.id, name: author.name, fontUrl, notFound: false, profileUrl: result.profileUrl };
}

// ---------------------------------------------------------------------------
// Key task "Scrape Author Profile Info" (dashboard)
//
// Secondo salto della catena dafont, dopo "Scrape Author Dafont Profiles":
//   pagina autore (dafontProfileUrl, es. /mjtype.d10200)
//     → pagina profilo utente (dafontProfileInfoUrl, es. /profile.php?user=1490629)
//       → email di contatto, se l'autore l'ha resa pubblica
// Ogni passo scrive subito su DB: l'url del profilo utente viene salvato anche
// quando la mail poi non c'è (così un secondo giro non rifà il primo scrape).
// ---------------------------------------------------------------------------

export interface DafontProfileInfoCandidateAuthor {
  id: string;
  name: string;
  /** Pagina autore da cui parte il lookup. */
  dafontProfileUrl: string;
  /** Email attuale — mostrata per capire quale verrà rimpiazzata. */
  email: string;
}

// Candidati: autori con la pagina autore dafont già nota e senza url del
// profilo utente. Solo filtri scalari, nessuna relazione (vedi il commento su
// getDafontProfileCandidateWhere: le relazioni fanno panicare il query engine
// sull'adapter D1).
const DAFONT_PROFILE_INFO_CANDIDATE_WHERE = {
  AND: [
    { NOT: { dafontProfileUrl: null } },
    { NOT: { dafontProfileUrl: "" } },
    { OR: [{ dafontProfileInfoUrl: null }, { dafontProfileInfoUrl: "" }] },
  ],
};

export async function getAuthorsNeedingDafontProfileInfo(): Promise<DafontProfileInfoCandidateAuthor[]> {
  await checkPermission("fontAuthor:read");

  const authors = await withSafeDbQuery(() =>
    prisma.fontAuthor.findMany({
      where: DAFONT_PROFILE_INFO_CANDIDATE_WHERE,
      select: { id: true, name: true, email: true, dafontProfileUrl: true },
      orderBy: { name: "asc" },
    })
  );

  return authors.map((author) => ({
    id: author.id,
    name: author.name,
    email: author.email,
    dafontProfileUrl: author.dafontProfileUrl ?? "",
  }));
}

export async function getAuthorsNeedingDafontProfileInfoCount(): Promise<number> {
  await checkPermission("fontAuthor:read");
  return withD1Retry(() =>
    withSafeDbQuery(() => prisma.fontAuthor.count({ where: DAFONT_PROFILE_INFO_CANDIDATE_WHERE }))
  );
}

export interface ScrapeAuthorDafontProfileInfoResult {
  id: string;
  name: string;
  /** Pagina autore interrogata. */
  profileUrl: string;
  /** true se la pagina autore non esiste più su dafont (404). */
  notFound: boolean;
  /** Url del profilo utente trovato e salvato, null se non c'era. */
  profileInfoUrl: string | null;
  /** true se il profilo utente esiste come link ma la sua pagina dà 404. */
  profileInfoNotFound: boolean;
  /** Email trovata sul profilo utente e salvata sull'autore, null se assente. */
  email: string | null;
  /** Email precedente, per il log (l'autore ne ha sempre una, spesso sintetica). */
  previousEmail: string | null;
  /**
   * Email trovata ma NON salvata perché il profilo dafont risulta di un altro
   * autore (vedi il controllo sul nome sotto): l'url viene comunque salvato,
   * la correzione dell'email è manuale.
   */
  skippedEmail: string | null;
  /** Nome con cui dafont firma quella pagina, quando diverso dal nostro. */
  dafontName: string | null;
}

/**
 * Esegue la catena completa per un singolo autore: pagina autore → profilo
 * utente → email. Ritorna il punto esatto in cui si è fermata, così la modale
 * può distinguere "profilo non linkato", "profilo 404" e "profilo senza email".
 */
export async function scrapeAuthorDafontProfileInfo(authorId: string): Promise<ScrapeAuthorDafontProfileInfoResult> {
  await checkPermission("fontAuthor:update");

  const author = await withSafeDbQuery(() =>
    prisma.fontAuthor.findUnique({
      where: { id: authorId },
      select: { id: true, name: true, email: true, dafontProfileUrl: true, dafontProfileInfoUrl: true },
    })
  );
  if (!author) throw new Error("Font author not found");
  if (!author.dafontProfileUrl) throw new Error(`${author.name} has no dafont profile page to read.`);

  const base = {
    id: author.id,
    name: author.name,
    profileUrl: author.dafontProfileUrl,
    previousEmail: author.email,
    skippedEmail: null as string | null,
    dafontName: null as string | null,
  };

  const profileResult = await scrapeDafontProfileInfoUrl(author.dafontProfileUrl);

  if (profileResult.notFound) {
    return { ...base, notFound: true, profileInfoUrl: null, profileInfoNotFound: false, email: null };
  }
  if (!profileResult.profileInfoUrl) {
    console.log(`[DafontProfileInfo] "${author.name}" → no profile.php link on the author page`);
    return { ...base, notFound: false, profileInfoUrl: null, profileInfoNotFound: false, email: null };
  }

  const profileInfoUrl = profileResult.profileInfoUrl;
  await withSafeDbQuery(() =>
    prisma.fontAuthor.update({ where: { id: author.id }, data: { dafontProfileInfoUrl: profileInfoUrl } })
  );

  const emailResult = await scrapeDafontProfileEmail(profileInfoUrl);

  if (emailResult.notFound) {
    revalidateAuthorViews();
    return { ...base, notFound: false, profileInfoUrl, profileInfoNotFound: true, email: null };
  }

  if (!emailResult.email) {
    console.log(`[DafontProfileInfo] "${author.name}" → profile has no public email, kept ${author.email}`);
    revalidateAuthorViews();
    return { ...base, notFound: false, profileInfoUrl, profileInfoNotFound: false, email: null };
  }

  // Controllo identità: la pagina autore da cui siamo partiti è quella del
  // PRIMO font del nostro autore, che su dafont può essere firmato da qualcun
  // altro — in quel caso l'email del profilo NON è la sua e salvarla sarebbe
  // peggio che lasciare il placeholder (le mail agli autori partono da lì).
  // L'url resta salvato comunque, la correzione è manuale.
  const dafontNames = [profileResult.dafontAuthorName, ...emailResult.profileNames].filter(
    (value): value is string => Boolean(value)
  );
  const isSameAuthor = dafontNames.some((dafontName) => isSameDafontAuthorName(dafontName, author.name));

  if (!isSameAuthor) {
    const shownName = profileResult.dafontAuthorName ?? emailResult.profileNames[0] ?? null;
    console.log(
      `[DafontProfileInfo] "${author.name}" → profile belongs to ${JSON.stringify(dafontNames)}, email ${emailResult.email} NOT saved`
    );
    revalidateAuthorViews();
    return {
      ...base,
      notFound: false,
      profileInfoUrl,
      profileInfoNotFound: false,
      email: null,
      skippedEmail: emailResult.email,
      dafontName: shownName,
    };
  }

  await withSafeDbQuery(() =>
    prisma.fontAuthor.update({ where: { id: author.id }, data: { email: emailResult.email as string } })
  );
  console.log(`[DafontProfileInfo] "${author.name}" → email ${author.email} → ${emailResult.email}`);

  revalidateAuthorViews();
  return { ...base, notFound: false, profileInfoUrl, profileInfoNotFound: false, email: emailResult.email };
}

function revalidateAuthorViews() {
  revalidatePath("/admin/font-authors");
  revalidatePath("/admin");
  revalidateTag(CACHE_TAGS.fontAuthors, "max");
}

// ---------------------------------------------------------------------------
// Invio email a un font author (azione "Send Email" in /admin/font-authors)
// ---------------------------------------------------------------------------

/**
 * Binding risolti per i template: mostrati in anteprima prima dell'invio.
 * Index signature esplicita perché questo oggetto viene passato dove ci si
 * aspetta una mappa generica di variabili (Record<string,string> per Resend,
 * EmailTemplateArgs per i template locali).
 */
export interface AuthorEmailBindings extends Record<string, string> {
  author_name: string;
  font_count: string;
  author_auth_link: string;
  website_url: string;
}

// Link di verifica/consenso. Placeholder concordato finché non esiste il vero
// flusso di claim del profilo: quando ci sarà, va generato qui per-autore
// (token firmato), non nel template.
const AUTHOR_AUTH_LINK = "https://typamine.com/test";
const WEBSITE_URL = "https://typamine.com";

/**
 * Calcola i valori delle variabili per un autore.
 *
 * font_count = i suoi font la cui licenza NON è libera (tutto ciò che non è
 * Free / Open Source (SIL OFL) / Public Domain, licenza mancante inclusa):
 * sono esattamente quelli per cui serve l'autorizzazione, ed è il numero
 * citato nel corpo della mail.
 */
/** Template locali disponibili (file in /email-templates). */
export async function getLocalEmailTemplates(): Promise<string[]> {
  await checkPermission("font:read");
  return listLocalTemplates();
}

export async function getAuthorEmailBindings(authorId: string): Promise<AuthorEmailBindings> {
  await checkPermission("font:read");

  const author = await withSafeDbQuery(() =>
    prisma.fontAuthor.findUnique({ where: { id: authorId }, select: { name: true } })
  );
  if (!author) throw new Error("Font author not found");

  const nonFreeCount = await withSafeDbQuery(() =>
    prisma.ingredient.count({
      where: {
        authorId,
        OR: [{ licenseType: null }, { licenseType: { notIn: FREE_LICENSE_TYPES } }],
      },
    })
  );

  return {
    author_name: author.name,
    font_count: String(nonFreeCount),
    author_auth_link: AUTHOR_AUTH_LINK,
    website_url: WEBSITE_URL,
  };
}

/**
 * Invia una mail a un font author.
 *
 * `source` distingue i due sistemi di template ora presenti:
 *  - "local"  -> file HTML in /email-templates, renderizzati da noi e spediti
 *                col provider configurato in Admin Communication;
 *  - "resend" -> template creato nella dashboard Resend, renderizzato da loro.
 * I binding sono gli stessi in entrambi i casi.
 */
export async function sendFontAuthorEmail({
  authorId,
  templateId,
  source,
}: {
  authorId: string;
  templateId: string;
  source: "local" | "resend";
}): Promise<{ ok: boolean; message: string }> {
  try {
    await checkPermission("font:update");

    const author = await withSafeDbQuery(() =>
      prisma.fontAuthor.findUnique({ where: { id: authorId }, select: { name: true, email: true } })
    );
    if (!author) return { ok: false, message: "Font author not found." };
    if (!author.email) return { ok: false, message: `${author.name} has no email address on file.` };

    // Gli autori sintetici (placeholder d'import, "unknown after AI check",
    // creati da AI/manuale) hanno indirizzi @*.typamine.internal, che non
    // esistono: scrivergli genererebbe solo bounce.
    if (author.email.endsWith(".typamine.internal")) {
      return {
        ok: false,
        message: `${author.name} is a placeholder author with a synthetic address (${author.email}) — nothing to send to.`,
      };
    }

    const bindings = await getAuthorEmailBindings(authorId);

    if (source === "resend") {
      await sendResendTemplateMail({ to: author.email, templateId, variables: bindings });
    } else {
      await sendTemplateMail({ to: author.email, template: templateId, args: bindings });
    }

    return { ok: true, message: `Email sent to ${author.name} <${author.email}>.` };
  } catch (error) {
    console.error("[FontAuthor Action] Error sending author email:", error);
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, message: message || "Failed to send email." };
  }
}
