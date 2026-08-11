import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import {
  AdminSettings,
  CredentialEntry,
  HeroWordmarkFontConfig,
  IntegrationsConfig,
  MarqueeType,
  NotificationChannels,
  PopupFrequency,
  ResolvedHeroWordmarkFontFrame,
  SmtpAuthType,
} from "@/types";
import { withSafeDbQuery } from "./dbMigration";
import { CACHE_TAGS } from "@/lib/cacheTags";
import { NON_REAL_FONT_AUTHOR_SLUGS } from "@/lib/constants/placeholderFontAuthors";

export const ADMIN_SETTINGS_ID = "singleton";

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  id: ADMIN_SETTINGS_ID,
  siteLanguage: "en",
  siteTimezone: "UTC",
  maintenanceActive: false,
  letterTFontSizePercent: 100,
  heroWordmarkFonts: [],
  heroWordmarkLoop: true,
  heroWordmarkLoopSpeed: 0,
  marqueeActive: false,
  marqueeType: "every_page",
  popupActive: false,
  popupFrequency: "first_visit",
  popupFrequencyDays: 7,
  emailProvider: "gmail_oauth2",
  gmailConnected: false,
  smtpPort: 587,
  smtpSecure: false,
  smtpAuthType: "password",
  credentialsVault: [],
  integrationsConfig: {},
  notificationChannels: {
    font_submission: "email",
    user_registration: "email",
    contact_message: "email",
    weekly_digest: "off",
  },
  require2fa: false,
  sessionTimeoutMinutes: 60,
  auditRetentionDays: 90,
  cookieBannerActive: true,
};

// Le colonne JSON (credentialsVault, integrationsConfig, notificationChannels)
// possono essere NULL (riga mai salvata da quel tab) o, in teoria, testo
// corrotto — mai lasciarle rompere l'intera pagina impostazioni o il sito
// pubblico per un parse fallito.
function safeJsonParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function mapAdminSettings(record: any): AdminSettings {
  return {
    id: record.id,

    siteLanguage: record.siteLanguage ?? DEFAULT_ADMIN_SETTINGS.siteLanguage,
    siteTimezone: record.siteTimezone ?? DEFAULT_ADMIN_SETTINGS.siteTimezone,
    maintenanceActive: !!record.maintenanceActive,
    maintenanceMessage: record.maintenanceMessage ?? undefined,

    letterTFontFamily: record.letterTFontFamily ?? undefined,
    letterTFontSizePercent: record.letterTFontSizePercent ?? 100,
    logoLightModeColor: record.logoLightModeColor ?? undefined,
    logoDarkModeColor: record.logoDarkModeColor ?? undefined,
    heroWordmarkFonts: safeJsonParse<HeroWordmarkFontConfig[]>(record.heroWordmarkFonts, []),
    heroWordmarkLoop: record.heroWordmarkLoop == null ? true : !!record.heroWordmarkLoop,
    heroWordmarkLoopSpeed: record.heroWordmarkLoopSpeed ?? 0,

    marqueeActive: !!record.marqueeActive,
    marqueeText: record.marqueeText ?? undefined,
    marqueeType: (record.marqueeType as MarqueeType) ?? "every_page",
    marqueeTextColor: record.marqueeTextColor ?? undefined,
    marqueeBgColor: record.marqueeBgColor ?? undefined,

    popupActive: !!record.popupActive,
    popupImageUrl: record.popupImageUrl ?? undefined,
    popupHeadline: record.popupHeadline ?? undefined,
    popupMessage: record.popupMessage ?? undefined,
    popupCtaLabel: record.popupCtaLabel ?? undefined,
    popupCtaLink: record.popupCtaLink ?? undefined,
    popupFrequency: (record.popupFrequency as PopupFrequency) ?? "first_visit",
    popupFrequencyDays: record.popupFrequencyDays ?? 7,

    emailProvider: record.emailProvider ?? "gmail_oauth2",
    gmailClientId: record.gmailClientId ?? undefined,
    gmailClientSecret: record.gmailClientSecret ?? undefined,
    gmailSenderName: record.gmailSenderName ?? undefined,
    gmailConnected: !!record.gmailConnected,
    gmailConnectedEmail: record.gmailConnectedEmail ?? undefined,
    smtpHost: record.smtpHost ?? undefined,
    smtpPort: record.smtpPort ?? 587,
    smtpUser: record.smtpUser ?? undefined,
    smtpPassword: record.smtpPassword ?? undefined,
    smtpSecure: !!record.smtpSecure,
    smtpFromEmail: record.smtpFromEmail ?? undefined,
    smtpFromName: record.smtpFromName ?? undefined,
    smtpAuthType: (record.smtpAuthType as SmtpAuthType) ?? "password",
    smtpOauthClientId: record.smtpOauthClientId ?? undefined,
    smtpOauthClientSecret: record.smtpOauthClientSecret ?? undefined,
    smtpOauthRefreshToken: record.smtpOauthRefreshToken ?? undefined,
    smtpOauthAccessUrl: record.smtpOauthAccessUrl ?? undefined,
    resendApiKey: record.resendApiKey ?? undefined,
    resendFromEmail: record.resendFromEmail ?? undefined,
    resendFromName: record.resendFromName ?? undefined,
    credentialsVault: safeJsonParse<CredentialEntry[]>(record.credentialsVault, []),

    integrationsConfig: safeJsonParse<IntegrationsConfig>(record.integrationsConfig, {}),

    notificationChannels: safeJsonParse<NotificationChannels>(
      record.notificationChannels,
      DEFAULT_ADMIN_SETTINGS.notificationChannels
    ),
    slackWebhookUrl: record.slackWebhookUrl ?? undefined,

    require2fa: !!record.require2fa,
    sessionTimeoutMinutes: record.sessionTimeoutMinutes ?? 60,
    ipAllowlist: record.ipAllowlist ?? undefined,
    auditRetentionDays: record.auditRetentionDays ?? 90,

    cookieBannerActive: record.cookieBannerActive == null ? true : !!record.cookieBannerActive,
    cookieBannerText: record.cookieBannerText ?? undefined,
    privacyPolicyUrl: record.privacyPolicyUrl ?? undefined,
    termsOfServiceUrl: record.termsOfServiceUrl ?? undefined,
    gdprRequestEmail: record.gdprRequestEmail ?? undefined,

    createdAt: record.createdAt?.toISOString?.(),
    updatedAt: record.updatedAt?.toISOString?.(),
  };
}

// Risolve AdminSettings.letterTFontFamily (un Ingredient.id) nel nome e
// woff2Url reali da usare per il rendering pubblico — join live invece che
// denormalizzato, così un font rinominato/cancellato dopo la scelta in admin
// non lascia mai un riferimento sporco (torna semplicemente undefined e i
// consumer ricadono sul font-rezland di default).
async function resolveLetterTFont(fontId: string | undefined): Promise<AdminSettings["letterTFont"]> {
  if (!fontId) return undefined;

  const font = await withSafeDbQuery(() =>
    prisma.ingredient.findUnique({
      where: { id: fontId },
      select: {
        id: true,
        name: true,
        slug: true,
        variants: { take: 1, select: { woff2Url: true } },
        author: { select: { name: true, slug: true } },
      },
    })
  );

  const woff2Url = font?.variants?.[0]?.woff2Url;
  if (!font || !woff2Url) return undefined;

  // Mai un credito "by {placeholder}" in footer — stesso filtro pubblico
  // usato da IngredientCard (NON_REAL_FONT_AUTHOR_SLUGS) per non mostrare mai
  // un autore sintetico d'import o il terminale "unknown after AI check".
  const hasRealAuthor = font.author && !NON_REAL_FONT_AUTHOR_SLUGS.includes(font.author.slug);

  return {
    id: font.id,
    name: font.name,
    slug: font.slug,
    woff2Url,
    author: hasRealAuthor ? { name: font.author!.name, slug: font.author!.slug } : undefined,
  };
}

// Stesso principio di resolveLetterTFont ma per l'intera sequenza
// dell'animazione hero: un solo findMany batch (mai N+1) per risolvere tutti
// i fontId in un colpo, poi rimappato nell'ordine di ciclo originale
// scartando in silenzio i frame il cui font è stato rinominato/cancellato
// dopo la scelta in admin (mai un font mancante che rompe l'intera sequenza).
async function resolveHeroWordmarkFonts(
  configs: HeroWordmarkFontConfig[]
): Promise<ResolvedHeroWordmarkFontFrame[]> {
  if (configs.length === 0) return [];

  const fonts = await withSafeDbQuery(() =>
    prisma.ingredient.findMany({
      where: { id: { in: configs.map((c) => c.fontId) } },
      select: { id: true, name: true, slug: true, variants: { take: 1, select: { woff2Url: true } } },
    })
  );
  const byId = new Map(fonts.map((f) => [f.id, f]));

  const resolved: ResolvedHeroWordmarkFontFrame[] = [];
  for (const config of configs) {
    const font = byId.get(config.fontId);
    const woff2Url = font?.variants?.[0]?.woff2Url;
    if (!font || !woff2Url) continue;
    resolved.push({
      font: { id: font.id, name: font.name, slug: font.slug, woff2Url },
      fontSizePercent: config.fontSizePercent,
    });
  }
  return resolved;
}

// Lettura pubblica cacheata — usata dai componenti lato sito (marquee, popup,
// header/footer per la brand identity, ecc). Nessuna riga finché nessuno ha
// ancora salvato niente dall'admin: in quel caso torniamo i default (tutto
// disattivato) invece di null, così i consumer non devono gestire un caso
// "settings assenti" a parte.
export const getAdminSettings = unstable_cache(
  async (): Promise<AdminSettings> => {
    const record = await withSafeDbQuery(() =>
      prisma.adminSettings.findUnique({ where: { id: ADMIN_SETTINGS_ID } })
    );

    if (!record) return DEFAULT_ADMIN_SETTINGS;

    const settings = mapAdminSettings(record);
    settings.letterTFont = await resolveLetterTFont(settings.letterTFontFamily);
    settings.heroWordmarkFontsResolved = await resolveHeroWordmarkFonts(settings.heroWordmarkFonts);
    return settings;
  },
  ["admin-settings-singleton"],
  { revalidate: 300, tags: [CACHE_TAGS.adminSettings] }
);
