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
 * @param url L'URL della rotta da scaricare.
 * @returns Promessa che risolve nel Buffer del file ZIP.
 */
export async function fetchZipFile(url: string): Promise<Buffer> {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.dafont.com/'
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

// Scrape di una pagina categoria/tema dafont (theme.php?cat=NNN[&page=N]) —
// usata da "Scrape From Dafont" (browse per macro/sotto-categoria, vedi
// components/admin/ScrapeFromDafontCard.tsx e lib/data/dafontUrls.json).
export async function scrapeDafontCategoryPage(categoryUrl: string): Promise<FontItem[]> {
  const result = await callDafontScraperApi(categoryUrl);
  if (result.notFound || !result.markdown) return [];
  return parseDafontPLPMarkdown({ data: { markdown: result.markdown } });
}
