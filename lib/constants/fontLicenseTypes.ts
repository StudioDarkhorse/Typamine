// Valori ammessi per Ingredient.licenseType. Condivisi tra il form admin
// (select manuale) e l'AI (Gemini vincolato a scegliere solo tra questi via
// responseSchema enum, stesso pattern di lib/ai/fontRating.ts per i tag).
export const FONT_LICENSE_TYPES = [
  "Free",
  "Free for Personal Use",
  "Demo",
  "Donationware",
  "Public Domain",
  "Open Source (SIL OFL)",
  "Commercial",
] as const;

export type FontLicenseType = (typeof FONT_LICENSE_TYPES)[number];

// Stato TERMINALE per Ingredient.licenseType, parallelo a
// UNKNOWN_AFTER_AI_CHECK_FONT_AUTHOR: l'AI (detectFontIdentityWithAI) puo'
// rispondere "Unknown" invece di forzare una licenza indovinata — quando lo
// fa, salviamo questo valore invece di lasciare licenseType null/vuoto,
// cosi' il font non viene ririchiesto a ogni giro (non e' uno dei
// FONT_LICENSE_TYPES "reali": non compare nel select del form admin).
export const UNKNOWN_AFTER_AI_CHECK_LICENSE = "Unknown (AI Checked)";

// Etichette osservate sui badge licenza di dafont.com (link vicino al numero
// download, es. "[100% Free](.../faq.php#copyright)" — vedi lib/services/dafontScraper.ts)
// mappate ai FONT_LICENSE_TYPES canonici. Tassonomia diversa dalla nostra
// (dafont usa "100% Free", noi "Free"; dafont separa GPL/OFL/Public domain,
// noi no), quindi il match esatto case-insensitive da solo non basta.
// Chiavi già in minuscolo — confrontate trim+lower da matchKnownLicenseType
// in lib/actions/font.ts. Se dafont usa un'etichetta non presente qui, il
// testo grezzo viene comunque salvato (il campo DB non è un enum) ma viene
// loggato come "UNMAPPED" — aggiungere la entry qui quando succede.
export const DAFONT_LICENSE_LABEL_MAP: Record<string, FontLicenseType> = {
  "100% free": "Free",
  "free for personal use": "Free for Personal Use",
  "donationware": "Donationware",
  "demo": "Demo",
  "public domain": "Public Domain",
  "ofl": "Open Source (SIL OFL)",
  "sil ofl": "Open Source (SIL OFL)",
  "gpl": "Open Source (SIL OFL)",
};

// Applica DAFONT_LICENSE_LABEL_MAP, poi un match esatto case-insensitive col
// nostro enum, poi tiene comunque il testo grezzo (il campo DB è String
// libera, non un enum) — condivisa da lib/actions/font.ts (scrape PDP,
// "Force Dafont Scraping") e app/api/admin/fonts/scrape-dafont-category/route.ts
// (scrape PLP, "Scrape From Dafont"), stessa tassonomia dafont in entrambi i casi.
export function matchKnownLicenseType(raw: string): string {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();

  const mapped = DAFONT_LICENSE_LABEL_MAP[lower];
  if (mapped) {
    console.log(`[DafontLicenseWatch] "${trimmed}" → mapped to canonical "${mapped}" via DAFONT_LICENSE_LABEL_MAP`);
    return mapped;
  }

  const exact = (FONT_LICENSE_TYPES as readonly string[]).find((t) => t.toLowerCase() === lower);
  if (exact) {
    console.log(`[DafontLicenseWatch] "${trimmed}" → exact match with FONT_LICENSE_TYPES ("${exact}")`);
    return exact;
  }

  console.warn(
    `[DafontLicenseWatch] UNMAPPED license label from dafont: "${trimmed}" — not in FONT_LICENSE_TYPES or DAFONT_LICENSE_LABEL_MAP. Saving raw text as-is; add a mapping in lib/constants/fontLicenseTypes.ts if this keeps showing up.`
  );
  return trimmed;
}
