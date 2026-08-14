import { Buffer } from 'node:buffer';

// Tutte le funzioni che parlano con dafont.com (via il nostro scraper interno
// scraper.typamine.com) o che leggono direttamente da dafont.com vivono qui —
// un solo file, invece di sparse tra lib/services/dafontScraper.ts e le card
// admin che le usano. PDP = Product Detail Page (pagina di un singolo font,
// es. dafont.com/matcha-mint.font), PLP = Product Listing Page (pagina
// categoria/tema con piu' font, es. dafont.com/theme.php?cat=301).

const DEFAULT_SCRAPER_URL = "https://scraper.typamine.com/v1/scrape";

export interface ScraperApiResult {
  markdown: string | null;
  statusCode: number | null;
  notFound: boolean;
}

// Chiamata HTTP condivisa verso il nostro scraper interno — usata sia dal
// lookup di un singolo font (PDP, vedi lib/services/dafontScraper.ts) sia
// dalla scansione di una pagina categoria (PLP, vedi scrapeDafontCategoryPage
// qui sotto). Nessun retry (stesso pattern "log ed errore" di lib/fontshare.ts):
// se lo scraper e' giu' o rate-limitato, il chiamante decide se riprovare.
export async function callDafontScraperApi(targetUrl: string): Promise<ScraperApiResult> {
  const baseUrl = process.env.SCRAPER_BASE_URL || DEFAULT_SCRAPER_URL;

  console.log(`[DafontScraper] POST ${baseUrl} { url: "${targetUrl}" }`);

  let res: Response;
  try {
    res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: targetUrl, formats: ["markdown"], onlyMainContent: true }),
    });
  } catch (err) {
    console.error(`[DafontScraper] fetch failed for ${targetUrl}:`, err);
    throw new Error(`Scraper request failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!res.ok) {
    console.error(`[DafontScraper] HTTP ${res.status} from scraper for ${targetUrl}`);
    throw new Error(`Scraper responded with HTTP ${res.status}`);
  }

  let payload: any;
  try {
    payload = await res.json();
  } catch {
    console.error(`[DafontScraper] non-JSON response for ${targetUrl}`);
    throw new Error("Scraper returned a non-JSON response.");
  }

  if (!payload?.success) {
    console.error(`[DafontScraper] success:false for ${targetUrl}, error="${payload?.error}"`);
    throw new Error(payload?.error || "Scraper reported failure.");
  }

  const statusCode = payload.data?.metadata?.statusCode ?? null;
  const markdown = payload.data?.markdown ?? null;
  console.log(`[DafontScraper] ${targetUrl} → statusCode=${statusCode}, markdown length=${markdown?.length ?? 0}`);

  // success:true dallo scraper puo' comunque coprire una pagina dafont 404 —
  // "non trovato" pulito, non un errore.
  const notFound = typeof statusCode === "number" && statusCode >= 400;
  return { markdown: notFound ? null : markdown, statusCode, notFound };
}

/**
 * Scarica un file zip da un URL gestendo gli header anti-bot base.
 *
 * Gli header di default sono quelli che servono a dafont (User-Agent di
 * browser + Referer del sito). NON valgono ovunque: 1001fonts chiude la
 * connessione se vede uno User-Agent di browser su /download/*.zip, mentre
 * risponde 200 con un UA qualsiasi altro — vedi FONTS1001_ZIP_HEADERS.
 *
 * @param url L'URL della rotta da scaricare.
 * @param options Header alternativi (User-Agent/Referer) per altre sorgenti.
 * @returns Promessa che risolve nel Buffer del file ZIP.
 */
export async function fetchZipFile(
  url: string,
  options?: { userAgent?: string; referer?: string }
): Promise<Buffer> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent':
        options?.userAgent ??
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': options?.referer ?? 'https://www.dafont.com/'
    }
  });

  if (!response.ok) {
    throw new Error(`Errore durante il download: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}


export interface FontItem {
  name: string;
  author: string | null;
  licenseType: string | null;
  downloadLink: string | null;
}

export function parseDafontPLPMarkdown(data: { data?: { markdown?: string } }): FontItem[] {
  const markdown = data?.data?.markdown;
  if (!markdown) return [];

  // Regex globale per trovare tutte le card di font
  const fontCardRegex = /\[\*\*([^*]+)\*\*\]\((https:\/\/www\.dafont\.com\/[^\)]+)\)([\s\S]*?)\[Download\]\((https:\/\/dl\.dafont\.com\/dl\/\?[^\s"\)]+)/gi;

  const fonts: FontItem[] = [];
  let match;

  while ((match = fontCardRegex.exec(markdown)) !== null) {
    const name = match[1].trim();
    const bodyContent = match[3];
    const downloadLink = match[4].trim();

    // Estrai autore dal corpo della card
    const authorMatch = bodyContent.match(/by\s+\[([^\]]+)\]/i);
    const author = authorMatch ? authorMatch[1].trim() : null;

    // Estrai licenza dal corpo della card
    const licenseMatch = bodyContent.match(/\[(Free for personal use|100% Free|Donationware|Demo|Shareware|Public domain[^\]]*)\]/i);
    const licenseType = licenseMatch ? licenseMatch[1].trim() : null;

    fonts.push({
      name,
      author,
      licenseType,
      downloadLink
    });
  }

  return fonts;
}


// Autore: prima occorrenza di "by [Nome](...)" nel markdown della PDP.
// Licenza: testo del link che punta a faq.php#copyright (dafont mette sempre
// lì il tipo di licenza specifico del font, es. "Free for personal use").
// Usata da lib/services/dafontScraper.ts (card "Force Dafont Scraping").
export function parseDafontPDPMarkdown(markdownText: string | null | undefined): { author: string | null; license: string | null } {
  if (!markdownText) return { author: null, license: null };

  const authorMatch = markdownText.match(/\bby\s+\[([^\]]+)\]\(/i);
  const author = authorMatch ? authorMatch[1].trim() : null;

  const licenseMatch = markdownText.match(/\[([^\]]+)\]\([^)]*faq\.php#copyright[^)]*\)/i);
  const license = licenseMatch ? licenseMatch[1].trim() : null;

  return { author, license };
}

// Link alla pagina profilo dell'autore su dafont, estratto dalla PDP di un
// suo font: dafont scrive sempre `by [Nome](https://www.dafont.com/<slug>.dNNNN)`
// sotto il nome del font. L'id numerico non è derivabile dal nome dell'autore,
// quindi passare da un suo font è l'unico modo per ottenerlo — vedi la key
// task "Scrape Author Dafont Profiles" (lib/actions/fontAuthor.ts).
export function parseDafontAuthorProfileUrl(markdownText: string | null | undefined): string | null {
  if (!markdownText) return null;

  const match = markdownText.match(/\bby\s+\[[^\]]+\]\((https?:\/\/(?:www\.)?dafont\.com\/[^\s")]+)\)/i);
  return match ? match[1].trim() : null;
}

// Link alla pagina profilo UTENTE (dafont.com/profile.php?user=NNNN), presente
// sulla pagina autore accanto all'avatar ("[View profile](...)"). È la pagina
// che può contenere l'email di contatto — vedi parseDafontProfileEmail.
export function parseDafontProfileInfoUrl(markdownText: string | null | undefined): string | null {
  if (!markdownText) return null;

  const match = markdownText.match(/https?:\/\/(?:www\.)?dafont\.com\/profile\.php\?user=\d+/i);
  return match ? match[0] : null;
}

// Nome con cui dafont firma i font di una pagina autore: la card di ogni font
// riporta "by [Nome](url-della-pagina-autore)". Si prende l'occorrenza il cui
// link punta alla pagina che stiamo leggendo (le card linkano anche altri
// autori nelle sezioni laterali), con fallback sulla prima.
export function parseDafontAuthorDisplayName(
  markdownText: string | null | undefined,
  authorPageUrl: string
): string | null {
  if (!markdownText) return null;

  const target = normalizeDafontUrl(authorPageUrl);
  const byRegex = /\bby\s+\[([^\]]+)\]\((https?:\/\/(?:www\.)?dafont\.com\/[^\s")]+)\)/gi;

  let fallback: string | null = null;
  let match: RegExpExecArray | null;
  while ((match = byRegex.exec(markdownText)) !== null) {
    const name = match[1].trim();
    if (!fallback) fallback = name;
    if (normalizeDafontUrl(match[2]) === target) return name;
  }
  return fallback;
}

// Confronto fra url dafont equivalenti: protocollo/www/slash finale irrilevanti,
// e la paginazione (?page=2) punta comunque alla stessa pagina autore.
function normalizeDafontUrl(url: string): string {
  return url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[?&]page=\d+/g, "")
    .replace(/\/+$/, "");
}

// Nomi presenti sulla pagina profilo utente: lo username (riga subito prima di
// "[Send a private message]") e il nome pubblico fra parentesi quadre escapate
// ("\[MJType\]"). Servono, insieme al nome sulla pagina autore, a verificare
// che il profilo appartenga davvero al nostro FontAuthor prima di prendergli
// l'email.
export function parseDafontProfileNames(markdownText: string | null | undefined): string[] {
  if (!markdownText) return [];

  const names: string[] = [];

  const usernameMatch = markdownText.match(/(^|\n)\s*([^\n[\]()!*_#>|]{2,60}?)\s*\n+\s*\[Send a private message\]/i);
  if (usernameMatch) names.push(usernameMatch[2].trim());

  const bracketedMatch = markdownText.match(/\\\[([^\\\]]{2,60})\\\]/);
  if (bracketedMatch) names.push(bracketedMatch[1].trim());

  return names.filter(Boolean);
}

// Due nomi indicano la stessa persona/fonderia: confronto su lettere e cifre
// soltanto, così "MJ Type", "MJType" e "mjtype" coincidono, mentre nomi
// diversi restano diversi (nessun match parziale: meglio saltare un'email
// buona che salvarne una di un altro autore).
export function isSameDafontAuthorName(a: string | null | undefined, b: string | null | undefined): boolean {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!a || !b) return false;
  const left = normalize(a);
  const right = normalize(b);
  return left.length > 0 && left === right;
}

// Email di contatto sulla pagina profilo utente: dafont la pubblica come link
// mailto ("[contact@imagex-fonts.com](mailto:contact@imagex-fonts.com)") solo
// se l'autore ha scelto di renderla visibile, quindi spesso non c'è. Il
// fallback su testo semplice scarta gli indirizzi @dafont.com (mai un contatto
// dell'autore) per non salvare una mail del sito al posto della sua.
export function parseDafontProfileEmail(markdownText: string | null | undefined): string | null {
  if (!markdownText) return null;

  const mailto = markdownText.match(/mailto:([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/i);
  const plain = markdownText.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);

  const email = (mailto?.[1] ?? plain?.[0] ?? "").trim().toLowerCase();
  if (!email || email.endsWith("dafont.com")) return null;
  return email;
}

// Scrape di una pagina categoria/tema dafont (theme.php?cat=NNN[&page=N]) —
// usata da "Scrape From Dafont" (browse per macro/sotto-categoria, vedi
// components/admin/ScrapeFromDafontCard.tsx e lib/data/dafontUrls.json).
export async function scrapeDafontCategoryPage(categoryUrl: string): Promise<FontItem[]> {
  const result = await callDafontScraperApi(categoryUrl);
  if (result.notFound || !result.markdown) return [];
  return parseDafontPLPMarkdown({ data: { markdown: result.markdown } });
}

// ---------------------------------------------------------------------------
// 1001fonts.com — "Import Fonts from 1001Fonts" (dashboard)
//
// Struttura diversa da dafont: la pagina categoria (PLP, es. serif-fonts.html)
// elenca solo i link alle pagine dei singoli font, senza autore/licenza/zip.
// Quelli stanno tutti sulla PDP (es. transcity-font.html), che quindi va
// letta font per font — un giro di scraper in più rispetto a dafont, ma in
// cambio niente pagina intermedia dell'autore: la PDP linka già il suo
// profilo. Lo scraper HTTP condiviso è lo stesso (callDafontScraperApi).
// ---------------------------------------------------------------------------

// 1001fonts chiude la connessione se il download zip arriva con uno
// User-Agent di browser; con un UA qualunque altro risponde 200. Referer
// impostato sul sito per coerenza con la navigazione normale.
export const FONTS1001_ZIP_HEADERS = {
  userAgent: "Typamine/1.0 (+https://typamine.com)",
  referer: "https://www.1001fonts.com/",
};

export interface Fonts1001Item {
  /** Nome famiglia, senza i suffissi "Font"/"Font Family" del titolo pagina. */
  name: string | null;
  author: string | null;
  /** Profilo autore su 1001fonts (es. https://www.1001fonts.com/users/rhesma/). */
  authorUrl: string | null;
  downloadLink: string | null;
  /** Etichetta del badge licenza, es. "Free for commercial use". */
  licenseLabel: string | null;
  /** Url della licenza vera e propria (OFL, Creative Commons, FFP, ...). */
  licenseUrl: string | null;
}

// Link alle PDP presenti su una pagina categoria: tutti gli url della forma
// /<slug>-font.html, deduplicati mantenendo l'ordine della pagina.
export function parseFonts1001PLPMarkdown(markdownText: string | null | undefined): string[] {
  if (!markdownText) return [];

  const linkRegex = /https?:\/\/(?:www\.)?1001fonts\.com\/[a-z0-9][a-z0-9._-]*-font\.html/gi;
  const seen = new Set<string>();
  const urls: string[] = [];

  for (const match of markdownText.matchAll(linkRegex)) {
    const url = match[0].replace(/^http:/i, "https:");
    if (seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }

  return urls;
}

// Tutti i dati di un font dalla sua PDP: titolo H1 ("Transcity Font" /
// "Cinzel Font Family"), "By [Autore](profilo)", "[Download](....zip)" e la
// licenza (badge "#license" + link "is licensed under the [...](url)").
export function parseFonts1001PDPMarkdown(markdownText: string | null | undefined): Fonts1001Item {
  const empty: Fonts1001Item = {
    name: null,
    author: null,
    authorUrl: null,
    downloadLink: null,
    licenseLabel: null,
    licenseUrl: null,
  };
  if (!markdownText) return empty;

  const headingMatch = markdownText.match(/(?:^|\n)([^\n]{1,120}?)\n={3,}(?:\n|$)/);
  const rawName = headingMatch ? headingMatch[1].trim() : null;
  const name = rawName ? rawName.replace(/\s+Font(\s+Family)?$/i, "").trim() || rawName : null;

  const downloadMatch = markdownText.match(
    /\[Download\]\((https?:\/\/(?:www\.)?1001fonts\.com\/download\/[^)\s]+\.zip)\)/i
  );
  const authorMatch = markdownText.match(
    /\bBy\s+\[([^\]]+)\]\((https?:\/\/(?:www\.)?1001fonts\.com\/users\/[^)\s]+)\)/i
  );
  const badgeMatch = markdownText.match(/\[([^\]]{2,60})\]\([^)\s]*#license\)/i);
  const licensedUnderMatch = markdownText.match(/licensed under the \[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/i);

  return {
    name,
    author: authorMatch ? authorMatch[1].trim() : null,
    authorUrl: authorMatch ? authorMatch[2].trim() : null,
    downloadLink: downloadMatch ? downloadMatch[1].trim() : null,
    licenseLabel: (badgeMatch?.[1] ?? licensedUnderMatch?.[1] ?? "").trim() || null,
    licenseUrl: licensedUnderMatch ? licensedUnderMatch[2].trim() : null,
  };
}

// Nome di ripiego quando la PDP non ha un H1 leggibile: dallo slug dell'url
// ("orange-avenue-demo-font.html" → "Orange Avenue Demo").
export function fonts1001NameFromUrl(pdpUrl: string): string {
  const slug = pdpUrl.split("/").pop()?.replace(/-font\.html$/i, "") ?? "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function scrapeFonts1001CategoryPage(categoryUrl: string): Promise<string[]> {
  const result = await callDafontScraperApi(categoryUrl);
  if (result.notFound || !result.markdown) return [];
  return parseFonts1001PLPMarkdown(result.markdown);
}

export interface Fonts1001PageScrapeResult extends Fonts1001Item {
  notFound: boolean;
}

export async function scrapeFonts1001FontPage(pdpUrl: string): Promise<Fonts1001PageScrapeResult> {
  const result = await callDafontScraperApi(pdpUrl);

  if (result.notFound || !result.markdown) {
    return {
      name: null,
      author: null,
      authorUrl: null,
      downloadLink: null,
      licenseLabel: null,
      licenseUrl: null,
      notFound: true,
    };
  }

  const item = parseFonts1001PDPMarkdown(result.markdown);
  return { ...item, name: item.name ?? fonts1001NameFromUrl(pdpUrl), notFound: false };
}
