// Logica pura del tool /labs/wcag: matematica del contrasto, soglie ufficiali
// e analisi statica di stack/font-display. Nessun accesso al DOM qui — le
// misure di layout (overflow, reflow, zoom 200%, text-spacing) vivono nel
// client, che è l'unico posto dove si può misurare davvero il rendering.
//
// Riferimenti: WCAG 2.2 — 1.4.3, 1.4.4, 1.4.5, 1.4.6, 1.4.8, 1.4.10, 1.4.12.

export type Verdict = "pass" | "fail" | "warn" | "info";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB | null {
  const value = hex.trim().replace(/^#/, "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

// Luminanza relativa secondo la formula normativa WCAG (sRGB linearizzato).
export function relativeLuminance({ r, g, b }: RGB): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground: string, background: string): number {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return 1;
  const lighter = Math.max(relativeLuminance(fg), relativeLuminance(bg));
  const darker = Math.min(relativeLuminance(fg), relativeLuminance(bg));
  return (lighter + 0.05) / (darker + 0.05);
}

// "Large text" WCAG: 18pt (24px), oppure 14pt (18.66px) se bold (>= 700).
export const LARGE_TEXT_PX = 24;
export const LARGE_TEXT_BOLD_PX = 18.66;

export function isLargeText(fontSizePx: number, fontWeight: number): boolean {
  if (fontSizePx >= LARGE_TEXT_PX) return true;
  return fontWeight >= 700 && fontSizePx >= LARGE_TEXT_BOLD_PX;
}

export const CONTRAST_THRESHOLDS = {
  AA: { normal: 4.5, large: 3 },
  AAA: { normal: 7, large: 4.5 },
} as const;

export interface ContrastEvaluation {
  ratio: number;
  large: boolean;
  requiredAA: number;
  requiredAAA: number;
  passesAA: boolean;
  passesAAA: boolean;
}

export function evaluateContrast(
  foreground: string,
  background: string,
  fontSizePx: number,
  fontWeight: number
): ContrastEvaluation {
  const ratio = contrastRatio(foreground, background);
  const large = isLargeText(fontSizePx, fontWeight);
  const requiredAA = large ? CONTRAST_THRESHOLDS.AA.large : CONTRAST_THRESHOLDS.AA.normal;
  const requiredAAA = large ? CONTRAST_THRESHOLDS.AAA.large : CONTRAST_THRESHOLDS.AAA.normal;
  return {
    ratio,
    large,
    requiredAA,
    requiredAAA,
    // Arrotondamento a 2 decimali prima del confronto: 4.4999 non è 4.5, ma i
    // tool di riferimento (e i report) lavorano sul valore mostrato.
    passesAA: Number(ratio.toFixed(2)) >= requiredAA,
    passesAAA: Number(ratio.toFixed(2)) >= requiredAAA,
  };
}

export const formatRatio = (ratio: number): string => `${ratio.toFixed(2)}:1`;

// Metriche imposte dal criterio 1.4.12 Text Spacing: la pagina deve reggerle
// senza perdita di contenuto o funzionalità.
export const TEXT_SPACING_OVERRIDES = {
  lineHeight: 1.5,
  letterSpacingEm: 0.12,
  wordSpacingEm: 0.16,
  paragraphSpacingEm: 2,
} as const;

// 1.4.10 Reflow: contenuto utilizzabile a 320 CSS px di larghezza senza
// scroll orizzontale.
export const REFLOW_WIDTH_PX = 320;

// 1.4.4 Resize Text: fino al 200% senza perdita di contenuto o funzionalità.
export const RESIZE_FACTOR = 2;

// 1.4.8 Visual Presentation (AAA): righe non più lunghe di 80 caratteri.
export const MAX_LINE_CHARS_AAA = 80;

export const GENERIC_FAMILIES = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong",
];

export interface FontStackAnalysis {
  families: string[];
  fallbackCount: number;
  endsWithGeneric: boolean;
  verdict: Verdict;
  message: string;
}

// Un font custom senza stack di fallback è un single point of failure: se il
// file non arriva (rete, CSP, blocco CDN) il testo cade su un default
// imprevedibile o resta invisibile più a lungo del dovuto.
export function analyzeFontStack(stack: string): FontStackAnalysis {
  const families = stack
    .split(",")
    .map((f) => f.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);

  const last = families[families.length - 1]?.toLowerCase() ?? "";
  const endsWithGeneric = GENERIC_FAMILIES.includes(last);
  const fallbackCount = Math.max(0, families.length - 1);

  if (families.length <= 1) {
    return {
      families,
      fallbackCount,
      endsWithGeneric,
      verdict: "fail",
      message:
        "No fallback: if the custom font fails to load, the browser picks an arbitrary default and the layout metrics break.",
    };
  }

  if (!endsWithGeneric) {
    return {
      families,
      fallbackCount,
      endsWithGeneric,
      verdict: "warn",
      message:
        "The stack does not end with a generic family (sans-serif, serif, monospace...): on systems without the listed fonts the fallback is not guaranteed.",
    };
  }

  return {
    families,
    fallbackCount,
    endsWithGeneric,
    verdict: "pass",
    message: `${families.length}-level stack ending in a generic family (${last}): text stays readable even without the custom font.`,
  };
}

export interface FontDisplayAnalysis {
  value: string;
  verdict: Verdict;
  message: string;
}

// FOIT (Flash Of Invisible Text): con `block` (o `auto`, che nella maggior
// parte dei browser si comporta come block) il testo resta invisibile fino a
// 3 secondi mentre il font scarica.
export function analyzeFontDisplay(value: string): FontDisplayAnalysis {
  const normalized = value.trim().toLowerCase();
  if (normalized === "swap" || normalized === "optional") {
    return {
      value: normalized,
      verdict: "pass",
      message:
        normalized === "swap"
          ? "font-display: swap — text is visible immediately in the fallback, then swapped. No FOIT."
          : "font-display: optional — near-zero block period, the font is used only if already available.",
    };
  }
  if (normalized === "fallback") {
    return {
      value: normalized,
      verdict: "warn",
      message: "font-display: fallback — short (~100ms) block before falling back. Acceptable, swap is safer.",
    };
  }
  return {
    value: normalized || "auto",
    verdict: "fail",
    message:
      "font-display: block/auto — text can stay invisible for up to 3 seconds (FOIT) while the font downloads.",
  };
}

// Pesi molto sottili riducono la visibilità percepita anche quando il rapporto
// di contrasto è matematicamente conforme (nota all'1.4.3 sul "thin stroke").
export function analyzeFontWeight(weight: number): { verdict: Verdict; message: string } {
  if (weight <= 200) {
    return {
      verdict: "fail",
      message: `Weight ${weight}: ultra-thin strokes — legibility suffers at body-text sizes even when the contrast ratio conforms.`,
    };
  }
  if (weight <= 300) {
    return {
      verdict: "warn",
      message: `Weight ${weight}: light — acceptable for large text only, avoid it below 18px.`,
    };
  }
  return {
    verdict: "pass",
    message: `Weight ${weight}: stroke density adequate for body text.`,
  };
}

// Non è un criterio WCAG (non esiste una dimensione minima normativa), ma
// sotto i 12px la leggibilità crolla per la maggior parte degli utenti.
export function analyzeFontSize(sizePx: number): { verdict: Verdict; message: string } {
  if (sizePx < 12) {
    return {
      verdict: "warn",
      message: `${sizePx}px: below the practical legibility floor (12px). WCAG sets no minimum, but 16px is the body-text standard.`,
    };
  }
  if (sizePx < 16) {
    return {
      verdict: "info",
      message: `${sizePx}px: below the recommended 16px for body text, but above the critical threshold.`,
    };
  }
  return { verdict: "pass", message: `${sizePx}px: adequate size for body text.` };
}

export const VERDICT_ORDER: Record<Verdict, number> = { fail: 0, warn: 1, info: 2, pass: 3 };

export function worstVerdict(verdicts: Verdict[]): Verdict {
  return verdicts.reduce<Verdict>(
    (worst, current) => (VERDICT_ORDER[current] < VERDICT_ORDER[worst] ? current : worst),
    "pass"
  );
}
