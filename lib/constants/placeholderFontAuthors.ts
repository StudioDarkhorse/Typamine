// Placeholder FontAuthor: assegnati automaticamente ai font all'import (single
// upload locale, bulk upload locale, provider Google Fonts/Fontshare) quando
// non c'e' un autore reale noto. La loro presenza su un font.authorId e' uno
// dei due segnali che triggerano il pulsante "Resolve Font Identity with AI"
// in dashboard (vedi lib/actions/font.ts - hasFontsNeedingIdentityDetection).
export type PlaceholderFontAuthorKey =
  | "localSingleImport"
  | "localBulkImport"
  | "googleFonts"
  | "fontshare"
  | "dafont";

interface PlaceholderFontAuthorDef {
  slug: string;
  name: string;
  email: string;
}

export const PLACEHOLDER_FONT_AUTHORS: Record<PlaceholderFontAuthorKey, PlaceholderFontAuthorDef> = {
  localSingleImport: {
    slug: "local-single-import-placeholder-author",
    name: "Local Single Import Placeholder Author",
    email: "local-single-import@placeholder.typamine.internal",
  },
  localBulkImport: {
    slug: "local-bulk-import-placeholder-author",
    name: "Local Bulk Import Placeholder Author",
    email: "local-bulk-import@placeholder.typamine.internal",
  },
  googleFonts: {
    slug: "google-fonts-placeholder-author",
    name: "Google Fonts Placeholder Author",
    email: "google-fonts@placeholder.typamine.internal",
  },
  fontshare: {
    slug: "fontshare-placeholder-author",
    name: "Fontshare Placeholder Author",
    email: "fontshare@placeholder.typamine.internal",
  },
  dafont: {
    slug: "dafont-placeholder-author",
    name: "Dafont Placeholder Author",
    email: "dafont@placeholder.typamine.internal",
  },
};

export const PLACEHOLDER_FONT_AUTHOR_SLUGS: string[] = Object.values(PLACEHOLDER_FONT_AUTHORS).map((a) => a.slug);

// Stato TERMINALE, diverso dai placeholder d'import sopra: assegnato quando
// l'AI (detectFontIdentityWithAI) e' stata interrogata su un font e ha
// risposto "Unknown" — a differenza dei placeholder d'import (che segnalano
// "non ancora controllato, l'AI deve ancora guardarlo"), questo segnala "gia'
// controllato, l'AI non lo sa" e va escluso dai candidati futuri: altrimenti
// il font ririchiederebbe una chiamata Gemini identica a ogni giro, sempre
// con la stessa risposta.
export const UNKNOWN_AFTER_AI_CHECK_FONT_AUTHOR = {
  slug: "unknown-after-ai-check-author",
  name: "Unknown Author (AI Checked)",
  email: "unknown-after-ai-check@placeholder.typamine.internal",
};

// Usato lato pubblico (IngredientCard) per non mostrare mai un nome
// sintetico: sia i placeholder d'import "in attesa" sia il placeholder
// terminale "controllato ma ignoto" diventano "UNKNOWN" in UI.
export const NON_REAL_FONT_AUTHOR_SLUGS: string[] = [
  ...PLACEHOLDER_FONT_AUTHOR_SLUGS,
  UNKNOWN_AFTER_AI_CHECK_FONT_AUTHOR.slug,
];
