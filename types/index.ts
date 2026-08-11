// Dove viene mostrata la homepage marquee: "every_page" e "homepage_top"
// sono la stessa striscia sottile sopra l'header (su ogni pagina o solo in
// home), "homepage_banner" è un banner più largo sotto l'hero, solo in home.
export type MarqueeType = "every_page" | "homepage_top" | "homepage_banner";

// Frequenza di visualizzazione della homepage popup, applicata client-side
// via cookie (vedi components/layout/PopupModal.tsx):
// - first_visit: mostrata una sola volta per browser, mai più.
// - every_visit: nessun cookie di soppressione, mostrata ad ogni caricamento della home.
// - periodic: mostrata di nuovo quando sono passati popupFrequencyDays dall'ultima volta.
export type PopupFrequency = "first_visit" | "every_visit" | "periodic";

export type NotificationChannel = "off" | "email" | "slack" | "both";

// Metodo di autenticazione SMTP (vedi AdminSettings.smtpAuthType):
// "password" = app password / auth base, "oauth2" = XOAUTH2 con refresh token.
export type SmtpAuthType = "password" | "oauth2";

// Vedi AdminSettings.notificationChannels (JSON) — le chiavi corrispondono
// agli eventi mostrati nel tab Notifications.
export interface NotificationChannels {
  font_submission?: NotificationChannel;
  user_registration?: NotificationChannel;
  contact_message?: NotificationChannel;
  weekly_digest?: NotificationChannel;
  [key: string]: NotificationChannel | undefined;
}

export interface CredentialEntry {
  id: string;
  label: string;
  value: string;
}

export interface IntegrationConfig {
  active: boolean;
  [key: string]: string | boolean;
}

// Vedi AdminSettings.integrationsConfig (JSON) — un blob unico invece di una
// colonna per provider/campo, così un nuovo provider non richiede migration.
export interface IntegrationsConfig {
  analytics?: IntegrationConfig & { measurementId?: string };
  tagManager?: IntegrationConfig & { containerId?: string };
  pixel?: IntegrationConfig & { pixelId?: string };
  recaptcha?: IntegrationConfig & { siteKey?: string; secretKey?: string };
  maps?: IntegrationConfig & { apiKey?: string };
}

// Font reale risolto a partire da AdminSettings.letterTFontFamily (un
// Ingredient.id) — solo lib/services/adminSettings.ts lo popola (join live
// sull'Ingredient), mai scritto/letto direttamente dal DB come denormalizzato,
// così un font rinominato o cancellato non lascia mai un riferimento sporco.
export interface ResolvedBrandFont {
  id: string;
  name: string;
  slug: string;
  woff2Url: string;
  // Presente solo quando l'autore del font è reale (non un placeholder
  // d'import/AI "unknown", vedi NON_REAL_FONT_AUTHOR_SLUGS) — usato dal
  // footer per il credito "by {author}" sotto "This month's font".
  author?: { name: string; slug: string };
}

// Vedi AdminSettings.heroWordmarkFonts (JSON) — un frame della sequenza che
// la "T" del componente HeroWordmark attraversa in loop (vedi
// components/layout/HeroWordmark.tsx). fontId è un Ingredient.id (stessa
// convenzione di letterTFontFamily), risolto live in
// lib/services/adminSettings.ts, mai denormalizzato.
export interface HeroWordmarkFontConfig {
  fontId: string;
  fontSizePercent: number;
}

// Versione risolta (nome + woff2Url reali) usata dal rendering pubblico —
// stessa relazione che ResolvedBrandFont ha con letterTFontFamily.
export interface ResolvedHeroWordmarkFontFrame {
  font: ResolvedBrandFont;
  fontSizePercent: number;
}

// Riga singleton di configurazione globale — vedi AdminSettings in schema.prisma.
// I campi JSON (credentialsVault, integrationsConfig, notificationChannels)
// arrivano già parsati dal service/action layer, mai come stringa grezza qui.
export interface AdminSettings {
  id: string;

  // General — Site Identity
  siteLanguage: string;
  siteTimezone: string;
  maintenanceActive: boolean;
  maintenanceMessage?: string;

  // General — Brand Identity. letterTFontFamily è l'Ingredient.id scelto in
  // admin; letterTFont è la risoluzione live (nome + woff2Url) usata per il
  // rendering pubblico — presente solo quando letterTFontFamily punta a un
  // font che esiste ancora. letterTFontSizePercent scala la "T" rispetto al
  // font-size del resto della wordmark (100 = stessa dimensione, 200 =
  // doppia) — applicato come `font-size` in `%`, coerente sia nell'header
  // (DynamicLogo) che nel footer (GlyphTypeface) nonostante le dimensioni
  // base diverse. I due colori sono hex grezzi ("#ff3131") per il quadratino
  // "chimico" accanto alla wordmark, non per la lettera stessa.
  letterTFontFamily?: string;
  letterTFont?: ResolvedBrandFont;
  letterTFontSizePercent: number;
  logoLightModeColor?: string;
  logoDarkModeColor?: string;

  // General — Brand Identity — Hero Wordmark Animation. heroWordmarkFonts è
  // la config grezza scelta in admin (max 12 frame, in ordine di ciclo);
  // heroWordmarkFontsResolved è la risoluzione live (nome + woff2Url), solo
  // presente quando popolata da getAdminSettings (mai da
  // getAdminSettingsForAdmin, che serve solo a ripopolare il form).
  heroWordmarkFonts: HeroWordmarkFontConfig[];
  heroWordmarkFontsResolved?: ResolvedHeroWordmarkFontFrame[];
  // true (default) = cicla i font all'infinito; false = un solo giro
  // completo attraverso tutti i font, poi ferma l'animazione sull'ultimo.
  heroWordmarkLoop: boolean;
  // Velocità dell'animazione su scala -5 (più lenta) a 5 (più veloce), step
  // 0.1, 0 = velocità normale (default). Convertito in un moltiplicatore
  // dell'intervalMs/flipDurationMs in HeroWordmark (vedi heroWordmarkLoopSpeedToMultiplier).
  heroWordmarkLoopSpeed: number;

  // Promo Website Communication — Homepage Marquee
  marqueeActive: boolean;
  marqueeText?: string;
  marqueeType: MarqueeType;
  marqueeTextColor?: string;
  marqueeBgColor?: string;

  // Promo Website Communication — Homepage Popup
  popupActive: boolean;
  popupImageUrl?: string;
  popupHeadline?: string;
  popupMessage?: string;
  popupCtaLabel?: string;
  popupCtaLink?: string;
  popupFrequency: PopupFrequency;
  popupFrequencyDays: number;

  // Admin Communication
  emailProvider: string;
  gmailClientId?: string;
  gmailClientSecret?: string;
  gmailSenderName?: string;
  gmailConnected: boolean;
  gmailConnectedEmail?: string;
  // Admin Communication — SMTP (nodemailer), alternativa a Gmail OAuth2:
  // attiva quando emailProvider === "smtp". Il refresh token Gmail NON è qui
  // di proposito (resta solo server-side, vedi schema.prisma); la password
  // SMTP invece serve nel form admin per poterla rileggere/modificare.
  smtpHost?: string;
  smtpPort: number;
  smtpUser?: string;
  smtpPassword?: string;
  smtpSecure: boolean;
  smtpFromEmail?: string;
  smtpFromName?: string;
  // "password" = app password (auth base, come nell'esempio Outlook/Gmail),
  // "oauth2" = XOAUTH2: nodemailer ricava l'access token dal refresh token
  // e smtpPassword viene ignorato.
  smtpAuthType: SmtpAuthType;
  smtpOauthClientId?: string;
  smtpOauthClientSecret?: string;
  smtpOauthRefreshToken?: string;
  /** Endpoint token del provider. Vuoto = Google (default di nodemailer). */
  smtpOauthAccessUrl?: string;
  // Admin Communication — Resend (emailProvider = "resend"): API HTTP, unico
  // provider oltre a Gmail che funziona anche su Cloudflare Workers.
  resendApiKey?: string;
  resendFromEmail?: string;
  resendFromName?: string;
  credentialsVault: CredentialEntry[];

  // Integrations
  integrationsConfig: IntegrationsConfig;

  // Notifications
  notificationChannels: NotificationChannels;
  slackWebhookUrl?: string;

  // Security & Access
  require2fa: boolean;
  sessionTimeoutMinutes: number;
  ipAllowlist?: string;
  auditRetentionDays: number;

  // Legal & Compliance
  cookieBannerActive: boolean;
  cookieBannerText?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  gdprRequestEmail?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface FontVariant {
  id: string;             // UUID della variante
  fontFamilyName: string; // es: "Typamine_Inter" (Usa lo STESSO nome per tutte le varianti di Inter)
  weight: number;         // es: 400, 700 (Meglio numero che stringa per logiche UI)
  style: 'normal' | 'italic' | 'oblique'; // es: "normal"
  woff2Url: string;       // es: "https://cdn.typamine.com/fonts/inter/inter-regular.woff2"
  label: string;          // es: "Regular" o "Bold" (Utile per la UI)
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Stringhe libere a livello DB/tipo (stessa convenzione di `category`) — le
// opzioni ammesse in UI sono vincolate dalla select in FontForm, non da un
// enum Prisma.
export type ImportedFrom = 'Google Fonts' | 'Fontshare' | 'Local Single Upload' | 'Local Bulk Upload' | 'Dafont';
export type LicenseType =
  | 'Free'
  | 'Free for Personal Use'
  | 'Demo'
  | 'Donationware'
  | 'Public Domain'
  | 'Open Source (SIL OFL)'
  | 'Commercial';

export interface IngredientAuthorSummary {
  id: string;
  name: string;
  slug: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;           // "Inter"
  slug: string;           // "inter"
  category: string;
  creator?: string;
  rating: string;
  symbol?: string;
  formula?: string;
  importedFrom?: ImportedFrom | string;
  licenseType?: LicenseType | string;
  isVariable?: boolean;
  /** Media dei voti utente 1-5 (non l'editoriale `rating` sopra) */
  userRating?: number;
  userRatingsCount?: number;
  authorId?: string;
  /** Riassunto leggero del FontAuthor collegato (non l'intera entità) — usare `font.author?.name` per mostrare l'autore in UI, con fallback a `font.creator` se non è collegato nessun FontAuthor. */
  author?: IngredientAuthorSummary;
  createdAt?: string;
  updatedAt?: string;
  tags?: Tag[];

  // Sostituiamo i vecchi campi singoli con un array
  variants: FontVariant[];
}

export interface ProviderFontItem {
  family: string;
  category: string;
  files: Record<string, string>;
  axes?: Array<{ tag: string; start: number; end: number }>;
  provider: 'google' | 'fontshare';
  designer?: string;
}
export interface PlaygroundFont {
  name: string;
  fontFamily: string;
  /** Real font file URL — when set, LivePreview injects an actual @font-face instead of relying on `fontFamily` already being loaded. */
  fontUrl?: string;
}

export interface Formula {
  id: string;
  name: string;
  description?: string;
  slug: string;
  fonts: Ingredient[];
  tags: Tag[];
  fontCategory: string;
  createdAt: string;
  updatedAt: string;
}

// Entità SEO condivisa — un unico set di meta-tag riusabile da qualunque
// contenuto pubblico (archive, blog article, prescription, ...) invece di
// duplicare gli stessi campi su ogni modello/form.
export interface SeoModule {
  id: string;
  metaTitle?: string;
  metaDescription?: string;
  /** Stringa singola comma-separated, stesso formato storico del meta tag "keywords". */
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImageUrl?: string;
  twitterImageAlt?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface Prescription {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  insight?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  primaryFontId?: string;
  primaryFont?: Ingredient;
  secondaryFontId?: string;
  secondaryFont?: Ingredient;
  tags?: (Tag | string)[];
  seoId?: string;
  seo?: SeoModule;

  // Backward compatibility fields for legacy UI components
  href?: string;
  fonts?: Ingredient[];
  imgUrl?: string;
}

export interface PostAuthor {
  id: string;
  name?: string;
  surname?: string;
  imageUrl?: string;
}

export type PostType = "ARCHIVE" | "BLOG";

// Entità generica di contenuto editoriale: serve sia /archive (postType
// "ARCHIVE") che /blog (postType "BLOG") — stessi campi, stesso editor di
// content-module, l'unica differenza è la varietà di moduli offerta in admin.
export interface Post {
  id: string;
  postType: PostType;
  title: string;
  slug: string;
  caption?: string;
  description?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  insight?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorId?: string;
  author?: PostAuthor;
  tags?: Tag[];
  fonts?: Ingredient[];
  seoId?: string;
  seo?: SeoModule;

  // Backward compatibility per componenti card generici (stesso pattern di Prescription.href/imgUrl)
  href?: string;
  imgUrl?: string;
}

// ==========================================
// FONT AUTHOR
// ==========================================
// Nota: createdAt/updatedAt tipizzati come `string` (ISO), non `Date | string`
// — stessa convenzione post-serializzazione usata da tutte le altre entità
// in questo file (Tag, Ingredient, Prescription, Post...).

export type AuthorType = 'INDIVIDUAL' | 'FOUNDRY' | 'COLLECTIVE' | 'UNKNOWN';

export type SocialPlatform =
  | 'github'
  | 'twitter'
  | 'instagram'
  | 'behance'
  | 'dribbble'
  | 'linkedin'
  | 'youtube';

export interface SocialLinks {
  platform: SocialPlatform;
  url: string;
  handle?: string;
}

export interface DonationDetails {
  /** URL per donazioni dirette (Patreon, Ko-fi, BuyMeACoffee, PayPal, ecc.) */
  donationWebsite?: string;
  /** Indirizzi wallet per criptovalute */
  cryptoWallets?: {
    bitcoin?: string;
    ethereum?: string;
    solana?: string;
  };
  preferredMethod?: 'kofi' | 'patreon' | 'paypal' | 'crypto' | 'custom';
}

export interface AuthorRating {
  /** Punteggio medio (es. 4.8) */
  average: number;
  /** Numero totale di recensioni/voti ricevuti */
  totalReviews: number;
  /** Distribuzione opzionale dei voti da 1 a 5 stelle */
  distribution?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface AuthorMetrics {
  /** Numero totale di font pubblicati nel sistema */
  totalFontsCount: number;
  /** Download complessivi di tutti i suoi font */
  totalDownloads: number;
  /** Numero di follower sulla piattaforma Tyamine */
  followersCount: number;
  /** Rating aggregato */
  usersRating: AuthorRating;
}

export interface BusinessInfo {
  /** Nome dell'azienda o studio legale (se diverso da name) */
  companyName?: string;
  /** Numero di Partita IVA / Tax ID */
  vatId?: string;
  /** Indirizzo fisico/legale */
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country: string; // Codice ISO-2 (es. 'IT', 'US', 'DE')
  };
}

export interface FontAuthor {
  /** Identifier unico (UUID) */
  id: string;

  /** Slug unico per URL puliti (es. /authors/roberto-barbagallo) */
  slug: string;

  /** Nome visibile dell'autore o della fonderia (es. "Dalton Maag" o "John Doe") */
  name: string;

  /** Tipologia di autore: singolo designer, fonderia o collettivo */
  type: AuthorType;

  /** Email principale di contatto */
  email: string;

  /** Email dedicata al supporto per problemi sulle licenze/font (opzionale) */
  supportEmail?: string;

  /** Avatar / Foto profilo */
  avatarUrl?: string;

  /** Immagine di copertina per la pagina profilo */
  bannerUrl?: string;

  /** Bio o descrizione dell'autore (supporta Markdown) */
  bio?: string;

  /** Sito web ufficiale dell'autore o della fonderia */
  website?: string;

  /** Dettagli per le donazioni / il supporto finanziario */
  donation: DonationDetails;

  /** Nazionalità dell'autore o sede legale (codice ISO 3166-1 alpha-2, es. "IT", "FI", "SE") */
  nationality?: string;

  /** Lingue parlate / gestite per il supporto */
  languagesSpoken?: string[];

  /** Profilo verificato su Tyamine (spunta blu) */
  isVerified: boolean;

  /** Link ai profili social dell'autore */
  socialLinks?: SocialLinks[];

  /** Metriche di utilizzo, download e votazioni degli utenti */
  metrics: AuthorMetrics;

  /** Informazioni aziendali/fiscali (utili se vende font commerciali) */
  businessInfo?: BusinessInfo;

  /** Tag/specializzazioni principali (es. ["Serif", "Pixel Art", "Calligraphy"]) */
  specialties?: string[];

  /** Stato dell'account dell'autore sulla piattaforma */
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

  /** Timestamps per tracciamento database */
  createdAt?: string;
  updatedAt?: string;
}
