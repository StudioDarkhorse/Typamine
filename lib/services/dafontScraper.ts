// "Force Dafont Scraping" (dashboard, Key Tasks) — recupera autore + licenza
// di un font provando a leggere la sua pagina dafont.com via il servizio di
// scraping interno, per i font su cui sia l'assegnazione manuale che l'AI
// identity lookup non hanno (ancora) trovato nulla. La chiamata HTTP allo
// scraper e il parsing del markdown vivono in lib/scraper.ts (condivisi con
// "Scrape From Dafont", che scansiona pagine categoria invece di pagine
// singolo-font) — qui solo la logica specifica alla PDP di un font.
import { callDafontScraperApi, parseDafontPDPMarkdown } from "@/lib/scraper";

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
