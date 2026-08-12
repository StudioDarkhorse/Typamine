// "Force Dafont Scraping" (dashboard, Key Tasks) — recupera autore + licenza
// di un font provando a leggere la sua pagina dafont.com via il servizio di
// scraping interno, per i font su cui sia l'assegnazione manuale che l'AI
// identity lookup non hanno (ancora) trovato nulla. La chiamata HTTP allo
// scraper e il parsing del markdown vivono in lib/scraper.ts (condivisi con
// "Scrape From Dafont", che scansiona pagine categoria invece di pagine
// singolo-font) — qui solo la logica specifica alla PDP di un font.
import {
  callDafontScraperApi,
  parseDafontPDPMarkdown,
  parseDafontAuthorProfileUrl,
  parseDafontProfileInfoUrl,
  parseDafontProfileEmail,
  parseDafontAuthorDisplayName,
  parseDafontProfileNames,
} from "@/lib/scraper";

export interface DafontScrapeResult {
  author: string | null;
  license: string | null;
  // true quando la pagina dafont per questo font non esiste (404) — un "non
  // trovato" pulito, da distinguere da un vero errore di rete/scraper.
  notFound: boolean;
}

// Converte il nome del font nello slug atteso da dafont.com — minuscolo,
// spazi E underscore diventano trattini (i font importati con nomi tipo
// "Matcha_Mint" vanno normalizzati esattamente come quelli con spazi, es.
// "Matcha Mint"), qualunque altro carattere non [a-z0-9-] viene scartato.
export function slugifyForDafont(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildDafontUrl(fontName: string): string {
  return `https://www.dafont.com/${slugifyForDafont(fontName)}.font`;
}

export async function scrapeDafontFontPage(fontName: string): Promise<DafontScrapeResult> {
  const targetUrl = buildDafontUrl(fontName);
  const result = await callDafontScraperApi(targetUrl);

  if (result.notFound) {
    console.log(`[DafontScraper] "${fontName}" → treated as not found (statusCode ${result.statusCode})`);
    return { author: null, license: null, notFound: true };
  }

  const { author, license } = parseDafontPDPMarkdown(result.markdown);
  console.log(`[DafontScraper] "${fontName}" → extracted author=${JSON.stringify(author)}, license=${JSON.stringify(license)}`);
  return { author, license, notFound: false };
}

export interface DafontAuthorProfileScrapeResult {
  profileUrl: string | null;
  authorName: string | null;
  notFound: boolean;
}

// Key task "Scrape Author Dafont Profiles": la pagina profilo di un autore
// dafont ha un id numerico non derivabile dal nome, ma ogni PDP di un suo font
// linka il profilo ("by [Nome](https://www.dafont.com/mjtype.d10200)") — quindi
// si passa dal primo font dell'autore, con lo stesso slug name→url usato da
// buildDafontUrl (underscore e spazi diventano trattini).
export async function scrapeDafontAuthorProfileFromFont(fontName: string): Promise<DafontAuthorProfileScrapeResult> {
  const targetUrl = buildDafontUrl(fontName);
  const result = await callDafontScraperApi(targetUrl);

  if (result.notFound) {
    console.log(`[DafontScraper] author profile via "${fontName}" → font page not found (statusCode ${result.statusCode})`);
    return { profileUrl: null, authorName: null, notFound: true };
  }

  const profileUrl = parseDafontAuthorProfileUrl(result.markdown);
  const { author } = parseDafontPDPMarkdown(result.markdown);
  console.log(`[DafontScraper] author profile via "${fontName}" → ${JSON.stringify(profileUrl)} (name=${JSON.stringify(author)})`);
  return { profileUrl, authorName: author, notFound: false };
}

export interface DafontProfileInfoScrapeResult {
  profileInfoUrl: string | null;
  /** Nome con cui dafont firma i font di quella pagina autore. */
  dafontAuthorName: string | null;
  notFound: boolean;
}

// Passo 1 della key task "Scrape Author Profile Info": dalla pagina autore
// (dafontProfileUrl) al link della pagina profilo utente con i contatti.
export async function scrapeDafontProfileInfoUrl(authorProfileUrl: string): Promise<DafontProfileInfoScrapeResult> {
  const result = await callDafontScraperApi(authorProfileUrl);

  if (result.notFound) {
    console.log(`[DafontScraper] profile info via ${authorProfileUrl} → page not found (statusCode ${result.statusCode})`);
    return { profileInfoUrl: null, dafontAuthorName: null, notFound: true };
  }

  const profileInfoUrl = parseDafontProfileInfoUrl(result.markdown);
  const dafontAuthorName = parseDafontAuthorDisplayName(result.markdown, authorProfileUrl);
  console.log(
    `[DafontScraper] profile info via ${authorProfileUrl} → ${JSON.stringify(profileInfoUrl)} (dafont name=${JSON.stringify(dafontAuthorName)})`
  );
  return { profileInfoUrl, dafontAuthorName, notFound: false };
}

export interface DafontProfileEmailScrapeResult {
  email: string | null;
  /** Username e nome pubblico letti sul profilo, per il controllo identità. */
  profileNames: string[];
  notFound: boolean;
}

// Passo 2: dalla pagina profilo utente all'email di contatto, presente solo se
// l'autore l'ha resa pubblica.
export async function scrapeDafontProfileEmail(profileInfoUrl: string): Promise<DafontProfileEmailScrapeResult> {
  const result = await callDafontScraperApi(profileInfoUrl);

  if (result.notFound) {
    console.log(`[DafontScraper] email via ${profileInfoUrl} → page not found (statusCode ${result.statusCode})`);
    return { email: null, profileNames: [], notFound: true };
  }

  const email = parseDafontProfileEmail(result.markdown);
  const profileNames = parseDafontProfileNames(result.markdown);
  console.log(
    `[DafontScraper] email via ${profileInfoUrl} → ${JSON.stringify(email)} (profile names=${JSON.stringify(profileNames)})`
  );
  return { email, profileNames, notFound: false };
}
