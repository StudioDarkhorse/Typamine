import prisma from "@/lib/prisma";
import { Prisma } from "../../prisma/generated-client";
import crypto from "crypto";

let isMigrated = false;

async function addCol(table: string, col: string, type: string) {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE ${table} ADD COLUMN ${col} ${type}`);
  } catch (err) {
    // Ignora errore di colonna già esistente
  }
}

// Stessi due indici che Prisma genera automaticamente per ogni join table
// implicita many-to-many quando la tabella nasce da `prisma db push`/migrate
// (unique su A,B + indice su B) — necessari a mano qui perché queste 4 join
// table (_IngredientTags, _FormulaTags, _PostTags, _PostFonts) sono create
// via CREATE TABLE raw sopra, non da Prisma stesso.
async function addJoinTableIndexes(table: string) {
  try {
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "${table}_AB_unique" ON "${table}"("A","B")`);
  } catch {}
  try {
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "${table}_B_index" ON "${table}"("B")`);
  } catch {}
}

// Colonne FK/filtro su tabelle create a mano (mai passate da `prisma
// db push`, quindi mai indicizzate automaticamente da Prisma) ma filtrate
// spesso: FontVariant.ingredientId ad ogni caricamento di un font con le sue
// varianti, Ingredient.authorId/licenseType in tutte le query "candidati"
// (Fill Missing Authors/Licenses, AI Identity, Dafont scrape).
async function addIndex(table: string, column: string) {
  try {
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "${table}_${column}_idx" ON "${table}"("${column}")`);
  } catch {}
}

export async function ensureD1SchemaUpdated(force = false) {
  if (isMigrated && !force) return;

  try {
    // 1. Create Tables if missing
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS Tag (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL UNIQUE,
          description TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch {}

    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS Prescription (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          description TEXT,
          imageUrl TEXT,
          published BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          primaryFontId TEXT NOT NULL,
          secondaryFontId TEXT NOT NULL
        )
      `);
    } catch {}

    // 2. Add columns safely to Tag
    await addCol("Tag", "description", "TEXT");
    await addCol("Tag", "createdAt", "DATETIME");
    await addCol("Tag", "updatedAt", "DATETIME");

    // 3. Add columns safely to Ingredient
    await addCol("Ingredient", "updatedAt", "DATETIME");
    await addCol("Ingredient", "importedFrom", "TEXT");
    await addCol("Ingredient", "licenseType", "TEXT");
    await addCol("Ingredient", "authorId", "TEXT");
    await addCol("Ingredient", "userRating", "REAL DEFAULT 0");
    await addCol("Ingredient", "userRatingsCount", "INTEGER DEFAULT 0");
    try {
      await prisma.$executeRawUnsafe(`UPDATE Ingredient SET userRating = 0 WHERE userRating IS NULL`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`UPDATE Ingredient SET userRatingsCount = 0 WHERE userRatingsCount IS NULL`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`UPDATE Ingredient SET createdAt = CURRENT_TIMESTAMP WHERE createdAt IS NULL`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`UPDATE Ingredient SET updatedAt = CURRENT_TIMESTAMP WHERE updatedAt IS NULL`);
    } catch {}

    // 4. Add columns safely to Prescription
    await addCol("Prescription", "slug", "TEXT");
    await addCol("Prescription", "published", "BOOLEAN DEFAULT 0");
    await addCol("Prescription", "imageUrl", "TEXT");
    await addCol("Prescription", "primaryFontId", "TEXT");
    await addCol("Prescription", "secondaryFontId", "TEXT");
    await addCol("Prescription", "createdAt", "DATETIME");
    await addCol("Prescription", "updatedAt", "DATETIME");
    await addCol("Prescription", "insight", "TEXT");

    // 5. Join table for the Ingredient <-> Tag many-to-many relation
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS _IngredientTags (
          A TEXT NOT NULL,
          B TEXT NOT NULL
        )
      `);
    } catch {}
    // A differenza delle join table create da un vero `prisma db push`
    // (_UserRoles, _FormulaIngredients, ecc — con indici auto-generati da
    // Prisma), questa e' CREATE TABLE a mano: senza questi due indici ogni
    // query `{ tags: { none: {} } }` (es. hasFontsNeedingQualityReview) fa
    // uno scan completo di _IngredientTags per ogni Ingredient — misurato
    // 88% del runtime di quella query prima di questa fix.
    await addJoinTableIndexes("_IngredientTags");

    // 6. Add columns safely to Formula (rinominato da href/code a slug/fontCategory/updatedAt)
    await addCol("Formula", "slug", "TEXT");
    await addCol("Formula", "fontCategory", "TEXT");
    await addCol("Formula", "updatedAt", "DATETIME");
    try {
      // Nessuna logica di slugify disponibile in SQL puro: usiamo l'id come
      // fallback univoco per le righe legacy, modificabile poi dall'admin.
      await prisma.$executeRawUnsafe(`UPDATE Formula SET slug = id WHERE slug IS NULL`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`UPDATE Formula SET fontCategory = 'Uncategorized' WHERE fontCategory IS NULL`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`UPDATE Formula SET createdAt = CURRENT_TIMESTAMP WHERE createdAt IS NULL`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`UPDATE Formula SET updatedAt = CURRENT_TIMESTAMP WHERE updatedAt IS NULL`);
    } catch {}
    // Le colonne legacy href/code erano NOT NULL: su ambienti (D1) dove la
    // tabella esisteva da prima del rename, sono ancora lì e bloccano ogni
    // create() che non le popola più. Le rimuoviamo (no-op se già assenti,
    // es. su dev.db locale ricreato da `prisma db push`). href aveva anche un
    // indice UNIQUE residuo (Formula_href_key) che fa fallire silenziosamente
    // la DROP COLUMN se non viene tolto per primo.
    try {
      await prisma.$executeRawUnsafe(`DROP INDEX IF EXISTS Formula_href_key`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE Formula DROP COLUMN href`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`DROP INDEX IF EXISTS Formula_code_key`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE Formula DROP COLUMN code`);
    } catch {}

    // 7. Join table for the Formula <-> Tag many-to-many relation
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS _FormulaTags (
          A TEXT NOT NULL,
          B TEXT NOT NULL
        )
      `);
    } catch {}
    await addJoinTableIndexes("_FormulaTags");

    // 8. Post table (generalizzato da ArchivePost, serve sia /archive che
    // /blog via la colonna postType) + le sue join table many-to-many.
    // Su ambienti dove la tabella esisteva ancora col vecchio nome, la
    // rinominiamo sul posto (rename atomico, nessuna copia/perdita dati) —
    // no-op silenzioso se ArchivePost non esiste più (già migrato) o non è
    // mai esistita (D1 nuovo, coperto dalla CREATE TABLE IF NOT EXISTS sotto).
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE ArchivePost RENAME TO Post`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE _ArchivePostTags RENAME TO _PostTags`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE _ArchivePostFonts RENAME TO _PostFonts`);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS Post (
          id TEXT PRIMARY KEY NOT NULL,
          postType TEXT DEFAULT 'ARCHIVE',
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          caption TEXT,
          description TEXT,
          thumbnailUrl TEXT,
          imageUrl TEXT,
          imageAlt TEXT,
          insight TEXT,
          published BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          authorId TEXT NOT NULL
        )
      `);
    } catch {}
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS _PostTags (
          A TEXT NOT NULL,
          B TEXT NOT NULL
        )
      `);
    } catch {}
    await addJoinTableIndexes("_PostTags");
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS _PostFonts (
          A TEXT NOT NULL,
          B TEXT NOT NULL
        )
      `);
    } catch {}
    await addJoinTableIndexes("_PostFonts");
    await addCol("Post", "postType", "TEXT");
    try {
      await prisma.$executeRawUnsafe(`UPDATE Post SET postType = 'ARCHIVE' WHERE postType IS NULL`);
    } catch {}

    // 9. SeoModule — entità condivisa (archive/blog/prescription), relazione
    // 1-a-1 opzionale via colonna seoId sul contenuto.
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS SeoModule (
          id TEXT PRIMARY KEY NOT NULL,
          metaTitle TEXT,
          metaDescription TEXT,
          keywords TEXT,
          ogTitle TEXT,
          ogDescription TEXT,
          ogImageUrl TEXT,
          ogImageAlt TEXT,
          twitterCard TEXT DEFAULT 'summary_large_image',
          twitterTitle TEXT,
          twitterDescription TEXT,
          twitterImageUrl TEXT,
          twitterImageAlt TEXT,
          canonicalUrl TEXT,
          noIndex BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch {}
    await addCol("Post", "seoId", "TEXT");
    await addCol("Prescription", "seoId", "TEXT");

    // 10. FontAuthor — entità standalone per autori/fonderie di font.
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS FontAuthor (
          id TEXT PRIMARY KEY NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          type TEXT DEFAULT 'INDIVIDUAL',
          email TEXT NOT NULL,
          supportEmail TEXT,
          avatarUrl TEXT,
          bannerUrl TEXT,
          bio TEXT,
          website TEXT,
          dafontProfileUrl TEXT,
          profileInfoUrl TEXT,
          donation TEXT,
          nationality TEXT,
          languagesSpoken TEXT,
          isVerified BOOLEAN DEFAULT 0,
          socialLinks TEXT,
          metrics TEXT,
          businessInfo TEXT,
          specialties TEXT,
          status TEXT DEFAULT 'ACTIVE',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch {}
    // DB già esistenti da prima delle key task "Scrape Author Dafont Profiles"
    // e "Scrape Author Profile Info".
    await addCol("FontAuthor", "dafontProfileUrl", "TEXT");
    // Le due vecchie colonne (dafontProfileInfoUrl / fonts1001ProfileUrl)
    // descrivevano la stessa cosa — la pagina da cui si legge l'email —
    // distinguendosi solo per la sorgente d'import. Restano aggiunte qui per i
    // DB che ancora non le hanno (l'ALTER è idempotente) solo il tempo di
    // travasarle: l'applicazione ormai legge e scrive `profileInfoUrl`.
    await addCol("FontAuthor", "dafontProfileInfoUrl", "TEXT");
    await addCol("FontAuthor", "fonts1001ProfileUrl", "TEXT");
    await addCol("FontAuthor", "profileInfoUrl", "TEXT");
    try {
      await prisma.$executeRawUnsafe(
        `UPDATE FontAuthor SET profileInfoUrl = COALESCE(NULLIF(dafontProfileInfoUrl, ''), NULLIF(fonts1001ProfileUrl, '')) WHERE profileInfoUrl IS NULL OR profileInfoUrl = ''`
      );
    } catch {}

    // Righe di permesso fontAuthor:* — nessun seed script le crea (i permessi
    // in questo progetto vengono inseriti out-of-band), quindi le registriamo
    // qui in modo idempotente (name è UNIQUE). SUPERADMIN/ADMIN bypassano
    // comunque il check via ruolo, quindi funzionano da subito anche prima
    // che qualcuno le assegni a un ruolo custom da /admin/roles.
    for (const action of ["read", "create", "update", "delete"]) {
      try {
        await prisma.$executeRawUnsafe(
          `INSERT OR IGNORE INTO Permission (id, name, createdAt, updatedAt) VALUES ('${crypto.randomUUID()}', 'fontAuthor:${action}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        );
      } catch {}
    }

    // 11. AdminSettings — riga singleton di configurazione globale, un campo
    // per ogni sezione di /admin/settings (vedi schema.prisma per i commenti
    // su ciascun gruppo). CREATE TABLE copre l'installazione da zero, gli
    // addCol successivi coprono i DB già esistenti da prima di ogni singolo
    // campo aggiunto in questa sezione.
    try {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS AdminSettings (
          id TEXT PRIMARY KEY NOT NULL DEFAULT 'singleton',
          marqueeActive BOOLEAN DEFAULT 0,
          marqueeText TEXT,
          marqueeType TEXT DEFAULT 'every_page',
          marqueeTextColor TEXT,
          marqueeBgColor TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch {}
    await addCol("AdminSettings", "marqueeType", "TEXT DEFAULT 'every_page'");

    // General — Site Identity
    await addCol("AdminSettings", "siteLanguage", "TEXT DEFAULT 'en'");
    await addCol("AdminSettings", "siteTimezone", "TEXT DEFAULT 'UTC'");
    await addCol("AdminSettings", "maintenanceActive", "BOOLEAN DEFAULT 0");
    await addCol("AdminSettings", "maintenanceMessage", "TEXT");

    // General — Brand Identity
    await addCol("AdminSettings", "letterTFontFamily", "TEXT");
    await addCol("AdminSettings", "letterTFontSizePercent", "INTEGER DEFAULT 100");
    await addCol("AdminSettings", "logoLightModeColor", "TEXT");
    await addCol("AdminSettings", "logoDarkModeColor", "TEXT");
    await addCol("AdminSettings", "heroWordmarkFonts", "TEXT");
    await addCol("AdminSettings", "heroWordmarkLoop", "BOOLEAN DEFAULT 1");
    await addCol("AdminSettings", "heroWordmarkLoopSpeed", "REAL DEFAULT 0");

    // Homepage Popup
    await addCol("AdminSettings", "popupActive", "BOOLEAN DEFAULT 0");
    await addCol("AdminSettings", "popupImageUrl", "TEXT");
    await addCol("AdminSettings", "popupHeadline", "TEXT");
    await addCol("AdminSettings", "popupMessage", "TEXT");
    await addCol("AdminSettings", "popupCtaLabel", "TEXT");
    await addCol("AdminSettings", "popupCtaLink", "TEXT");
    await addCol("AdminSettings", "popupFrequency", "TEXT DEFAULT 'first_visit'");
    await addCol("AdminSettings", "popupFrequencyDays", "INTEGER DEFAULT 7");

    // Admin Communication
    await addCol("AdminSettings", "emailProvider", "TEXT DEFAULT 'gmail_oauth2'");
    await addCol("AdminSettings", "gmailClientId", "TEXT");
    await addCol("AdminSettings", "gmailClientSecret", "TEXT");
    await addCol("AdminSettings", "gmailSenderName", "TEXT");
    await addCol("AdminSettings", "gmailConnected", "BOOLEAN DEFAULT 0");
    await addCol("AdminSettings", "gmailConnectedEmail", "TEXT");
    await addCol("AdminSettings", "gmailRefreshToken", "TEXT");
    await addCol("AdminSettings", "smtpHost", "TEXT");
    await addCol("AdminSettings", "smtpPort", "INTEGER DEFAULT 587");
    await addCol("AdminSettings", "smtpUser", "TEXT");
    await addCol("AdminSettings", "smtpPassword", "TEXT");
    await addCol("AdminSettings", "smtpSecure", "BOOLEAN DEFAULT 0");
    await addCol("AdminSettings", "smtpFromEmail", "TEXT");
    await addCol("AdminSettings", "smtpFromName", "TEXT");
    await addCol("AdminSettings", "smtpAuthType", "TEXT DEFAULT 'password'");
    await addCol("AdminSettings", "smtpOauthClientId", "TEXT");
    await addCol("AdminSettings", "smtpOauthClientSecret", "TEXT");
    await addCol("AdminSettings", "smtpOauthRefreshToken", "TEXT");
    await addCol("AdminSettings", "smtpOauthAccessUrl", "TEXT");
    await addCol("AdminSettings", "resendApiKey", "TEXT");
    await addCol("AdminSettings", "resendFromEmail", "TEXT");
    await addCol("AdminSettings", "resendFromName", "TEXT");
    await addCol("AdminSettings", "credentialsVault", "TEXT");

    // Integrations
    await addCol("AdminSettings", "integrationsConfig", "TEXT");

    // Notifications
    await addCol("AdminSettings", "notificationChannels", "TEXT");
    await addCol("AdminSettings", "slackWebhookUrl", "TEXT");

    // Security & Access
    await addCol("AdminSettings", "require2fa", "BOOLEAN DEFAULT 0");
    await addCol("AdminSettings", "sessionTimeoutMinutes", "INTEGER DEFAULT 60");
    await addCol("AdminSettings", "ipAllowlist", "TEXT");
    await addCol("AdminSettings", "auditRetentionDays", "INTEGER DEFAULT 90");

    // Legal & Compliance
    await addCol("AdminSettings", "cookieBannerActive", "BOOLEAN DEFAULT 1");
    await addCol("AdminSettings", "cookieBannerText", "TEXT");
    await addCol("AdminSettings", "privacyPolicyUrl", "TEXT");
    await addCol("AdminSettings", "termsOfServiceUrl", "TEXT");
    await addCol("AdminSettings", "gdprRequestEmail", "TEXT");

    // Stesso schema di bootstrap idempotente del blocco fontAuthor sopra —
    // resource 'setting' già dichiarata in lib/rbac.ts ma finora inutilizzata.
    for (const action of ["read", "update"]) {
      try {
        await prisma.$executeRawUnsafe(
          `INSERT OR IGNORE INTO Permission (id, name, createdAt, updatedAt) VALUES ('${crypto.randomUUID()}', 'setting:${action}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        );
      } catch {}
    }

    // Indici su colonne FK/filtro di tabelle create a mano sopra — mai
    // aggiunti automaticamente da Prisma (a differenza delle tabelle nate da
    // un vero `prisma db push`), ma filtrate spesso: vedi commento su addIndex.
    await addIndex("FontVariant", "ingredientId");
    await addIndex("Ingredient", "authorId");
    await addIndex("Ingredient", "licenseType");
    await addIndex("Prescription", "primaryFontId");
    await addIndex("Prescription", "secondaryFontId");
    await addIndex("Post", "authorId");

    isMigrated = true;
  } catch (err) {
    console.error("[DbMigration] Error migrating D1 schema:", err);
  }
}

export async function withSafeDbQuery<T>(run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (err) {
    const isSchemaError =
      err instanceof Prisma.PrismaClientKnownRequestError &&
      (err.code === "P2021" || err.code === "P2022" || err.code === "P2032" || err.code === "P2011");

    if (!isSchemaError) throw err;

    await ensureD1SchemaUpdated(true);
    return await run();
  }
}

// Errore transitorio del D1 locale (Miniflare/workerd) sotto carico — non un
// errore di schema (withSafeDbQuery sopra non lo intercetta: non è un
// PrismaClientKnownRequestError con un P-code, è un PrismaClientUnknownRequestError
// generico). Tipicamente compare durante lavoro CPU-bound prolungato (conversione
// font, unzip) che blocca l'event loop abbastanza a lungo da far scadere la
// sessione D1 sottostante. Qui solo un retry con backoff breve — non risolve
// la causa (limite dell'emulatore D1 in dev, non applicativo) ma evita che un
// singolo blip transitorio faccia crashare un'intera pagina server component
// (es. i conteggi delle card "Key Tasks" in /admin, tutte awaited senza try/catch).
function isTransientD1Error(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /Failed to parse body as JSON|D1_ERROR.*internal error/i.test(msg);
}

export async function withD1Retry<T>(run: () => Promise<T>, retries = 2, delayMs = 300): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await run();
    } catch (err) {
      lastErr = err;
      if (attempt === retries || !isTransientD1Error(err)) throw err;
      console.warn(
        `[D1 Retry] Transient D1 error, retrying (${attempt + 1}/${retries})...`,
        err instanceof Error ? err.message : err
      );
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
    }
  }
  throw lastErr;
}
