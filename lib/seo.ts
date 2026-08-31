import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Identita' del sito e default condivisi da tutti i metadati.
// Un solo posto per dominio, nome, separatore e OG image: le pagine passano
// solo cio' che le distingue (title, description, keywords, path).
// ---------------------------------------------------------------------------

export const SITE_URL = "https://typamine.com";
export const SITE_NAME = "Typamine";

/** Separatore fra titolo di pagina e nome del sito. */
export const TITLE_SEPARATOR = "|";

/** Titolo della home: e' anche il `default` del template, quindi non ha suffisso. */
export const SITE_TITLE = `Typamine ${TITLE_SEPARATOR} Free Fonts, Font Pairings & Typography Tools`;

export const SITE_DESCRIPTION =
  "Browse and download free fonts, discover expert font pairings, and use free web typography tools: font converter, @font-face generator, Tailwind config and WCAG checker.";

/**
 * Un'unica OG image per tutto il sito (public/logo.png, 1000x500). Il path e'
 * relativo: `metadataBase` nel layout lo risolve in assoluto, che e' quello
 * che i crawler social pretendono.
 */
export const OG_IMAGE = {
  url: "/logo.png",
  width: 1000,
  height: 500,
  alt: "Typamine — free fonts, font pairings and typography tools",
};

/**
 * Keyword di base ereditate da ogni pagina. Restano generiche sul dominio
 * (font/tipografia); quelle specifiche le aggiunge la singola pagina.
 */
export const BASE_KEYWORDS = [
  "fonts",
  "free fonts",
  "typography",
  "typefaces",
  "font pairings",
  "web fonts",
  "font download",
  "type design",
];

interface BuildMetadataInput {
  /** Path assoluto dalla root, con lo slash iniziale (es. "/ingredients"). */
  path: string;
  /** Titolo SENZA il suffisso del sito: lo aggiunge questa funzione. */
  title: string;
  description: string;
  keywords?: string[];
  /** URL immagine specifica (es. la cover di un post). Default: il logo. */
  image?: { url: string; alt?: string; width?: number; height?: number };
  /** true su pagine che non devono finire in SERP (area riservata, ecc.). */
  noIndex?: boolean;
  /** "article" per i contenuti editoriali, "website" per gli indici. */
  ogType?: "website" | "article";
  /** Solo per ogType "article": date ISO e autore. */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/** "Nome pagina" -> "Nome pagina | Typamine" (la home resta senza suffisso). */
export function withSiteName(title: string): string {
  return title === SITE_TITLE ? title : `${title} ${TITLE_SEPARATOR} ${SITE_NAME}`;
}

export function buildMetadata({
  path,
  title,
  description,
  keywords = [],
  image,
  noIndex = false,
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataInput): Metadata {
  const fullTitle = withSiteName(title);
  const ogImage = image
    ? { url: image.url, alt: image.alt ?? OG_IMAGE.alt, width: image.width, height: image.height }
    : OG_IMAGE;

  return {
    title,
    description,
    // Set: le keyword di pagina vengono prima, i duplicati cadono.
    keywords: Array.from(new Set([...keywords, ...BASE_KEYWORDS])),
    alternates: { canonical: path },
    openGraph: {
      // openGraph.title non eredita il template del `title`, quindi qui va il
      // titolo completo di suffisso o le condivisioni perdono il brand.
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: ogType,
      locale: "en_US",
      images: [ogImage],
      ...(ogType === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/**
 * Testo libero (descrizioni admin, caption, markdown dei post) -> stringa
 * piatta adatta a una meta description: niente tag, niente sintassi markdown,
 * niente a capo, e taglio all'ultima parola intera entro `max`.
 */
export function toMetaDescription(input: string | undefined | null, max = 158): string {
  if (!input) return "";
  const flat = input
    .replace(/<[^>]*>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

/** Unisce pezzi di frase saltando i vuoti, cosi' i campi opzionali non lasciano doppi spazi. */
export function joinSentences(...parts: Array<string | undefined | null>): string {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

// ---------------------------------------------------------------------------
// Post editoriali (/pills e /archive): stessa entita' Post, stessa logica.
// I campi del SeoModule collegato, quando compilati in admin, vincono sempre
// sui valori derivati dal contenuto — e' il senso di averli.
// ---------------------------------------------------------------------------

import type { Post } from "@/types";

interface PostMetadataInput {
  post: Post;
  /** Base della route pubblica, senza slash finale (es. "/pills"). */
  basePath: string;
  /** Suffisso del titolo derivato, usato solo se il SEO module non impone il suo. */
  titleSuffix: string;
  /** Keyword di sezione, unite a quelle del SEO module e ai tag del post. */
  keywords?: string[];
}

export function buildPostMetadata({ post, basePath, titleSuffix, keywords = [] }: PostMetadataInput): Metadata {
  const seo = post.seo;
  const path = `${basePath}/${post.slug}`;

  // Il suffisso di sezione si aggiunge solo se il titolo resta leggibile in
  // SERP: con " | Typamine" gia' in coda, oltre i ~60 caratteri Google taglia,
  // e la parte tagliata sarebbe proprio il titolo del post.
  const withSuffix = `${post.title}${titleSuffix}`;
  const title = seo?.metaTitle || (withSuffix.length <= 60 ? withSuffix : post.title);
  const description = toMetaDescription(
    seo?.metaDescription || joinSentences(post.caption, post.description) || post.title,
  );

  const seoKeywords = (seo?.keywords || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const imageUrl = seo?.ogImageUrl || post.imageUrl || post.thumbnailUrl;

  const metadata = buildMetadata({
    path,
    title,
    description,
    keywords: [...seoKeywords, ...keywords, ...(post.tags ?? []).map((tag) => tag.name)],
    image: imageUrl ? { url: imageUrl, alt: seo?.ogImageAlt || post.imageAlt || post.title } : undefined,
    noIndex: seo?.noIndex === true,
    ogType: "article",
    publishedTime: post.createdAt,
    modifiedTime: post.updatedAt,
    authors: post.author?.name ? [joinSentences(post.author.name, post.author.surname)] : undefined,
  });

  // Override espliciti del SEO module che non passano da buildMetadata: og/twitter
  // possono avere testi propri, diversi dal title/description della SERP.
  if (seo?.canonicalUrl) metadata.alternates = { canonical: seo.canonicalUrl };
  if (metadata.openGraph && (seo?.ogTitle || seo?.ogDescription)) {
    if (seo.ogTitle) metadata.openGraph.title = seo.ogTitle;
    if (seo.ogDescription) metadata.openGraph.description = seo.ogDescription;
  }
  // `Twitter` e' una union discriminata su `card`: si riscrive intero, non si
  // muta campo per campo (il tipo del ramo dipende dalla card scelta).
  if (seo?.twitterCard || seo?.twitterTitle || seo?.twitterDescription || seo?.twitterImageUrl) {
    metadata.twitter = {
      card: seo.twitterCard ?? "summary_large_image",
      title: seo.twitterTitle || withSiteName(title),
      description: seo.twitterDescription || description,
      images: [seo.twitterImageUrl || imageUrl || OG_IMAGE.url],
    };
  }

  return metadata;
}
