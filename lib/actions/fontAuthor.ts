"use server";

import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import { withSafeDbQuery } from "@/lib/services/dbMigration";
import { CACHE_TAGS } from "@/lib/cacheTags";
import { FREE_LICENSE_TYPES } from "@/lib/constants/fontLicenseTypes";
import { sendTemplateMail, sendResendTemplateMail } from "@/lib/services/email";
import { listLocalTemplates } from "@/lib/services/emailTemplates";
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
