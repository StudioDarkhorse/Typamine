// Risolve le stringhe "text-X/NN dark:text-Y/NN" (o le equivalenti "bg-*",
// anche a gradiente) prodotte dai color picker granulari admin
// (GranularColorPickerButton / GranularBGColorPickerButton) in valori CSS
// reali (rgba/gradient) per light e dark mode.
//
// Perché serve: quelle stringhe sono composte a runtime a partire da dati
// nel DB (colore + opacità scelti in admin), quindi non esistono mai come
// testo letterale nei file sorgente. Tailwind genera CSS solo per le classi
// che riesce a "vedere" scansionando i file in `content`: una combinazione
// dinamica come "text-blue-500/60" non verrà mai generata, e la classe
// applicata al DOM resta senza stile corrispondente. Qui bypassiamo del
// tutto Tailwind per questi valori, calcolando noi il CSS e applicandolo
// via variabili custom + le classi statiche .dyn-text/.dyn-bg (vedi
// app/globals.css), che invece Tailwind non deve generare perché sono CSS
// scritto a mano.

const HEX_MAP: Record<string, string> = {
  black: "#0C0B0A",
  white: "#F5F6F9",
  zinc: "#71717a",
  blue: "#00cece",
  red: "#ff3131",
  green: "#00d27a",
  stone: "#ada799",
  bluegray: "#383a43",
  ocra: "#D5943A",
};

// Inverso di colorMap in components/admin/common/content-modules/shared.tsx:
// dal suffisso Tailwind realmente scritto nella classe all'id colore logico.
const REVERSE_COLOR_MAP: Record<string, string> = {
  black: "black",
  white: "white",
  "zinc-500": "zinc",
  "blue-500": "blue",
  "red-500": "red",
  green: "green",
  "stone-500": "stone",
  "bluegray-500": "bluegray",
  "ocra-500": "ocra",
};

function hexToRgba(hex: string, opacityPct: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) || 0;
  const g = parseInt(clean.slice(2, 4), 16) || 0;
  const b = parseInt(clean.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${Math.min(Math.max(opacityPct, 0), 100) / 100})`;
}

function colorTokenToRgba(rawToken: string, opacityPct: number): string {
  // Colore custom scelto via react-colorful, scritto come valore Tailwind
  // arbitrario ("text-[#ff3131]" / "bg-[#ff3131]") invece di un id della
  // palette — l'hex è già letterale, nessun lookup nelle mappe sopra.
  if (rawToken.startsWith("#")) {
    return hexToRgba(rawToken, opacityPct);
  }
  const colorId = REVERSE_COLOR_MAP[rawToken] || rawToken;
  const hex = HEX_MAP[colorId] || "#000000";
  return hexToRgba(hex, opacityPct);
}

/** Estrae "colore" (id palette o hex letterale tra [ ]) e opacità da un token tipo "text-blue-500/60" o "text-[#ff3131]/60". */
export function extractColorToken(token: string, prefix: string): { raw: string; opacity: number } | null {
  const hexMatch = token.match(new RegExp(`^${prefix}\\[(#[0-9a-fA-F]{3,8})\\](?:/(\\d+))?$`));
  if (hexMatch) {
    return { raw: hexMatch[1], opacity: hexMatch[2] ? parseInt(hexMatch[2], 10) : 100 };
  }
  const namedMatch = token.match(new RegExp(`^${prefix}([a-zA-Z0-9-]+)(?:/(\\d+))?$`));
  if (namedMatch) {
    return { raw: namedMatch[1], opacity: namedMatch[2] ? parseInt(namedMatch[2], 10) : 100 };
  }
  return null;
}

function splitLightDark(value: string): { lightTokens: string[]; darkTokens: string[] } {
  const tokens = value.split(/\s+/).filter(Boolean);
  return {
    lightTokens: tokens.filter((t) => !t.startsWith("dark:")),
    darkTokens: tokens.filter((t) => t.startsWith("dark:")).map((t) => t.replace("dark:", "")),
  };
}

export interface DynamicColorPair {
  light?: string;
  dark?: string;
}

/** Risolve una colorClassName di solo testo ("text-X/NN dark:text-Y/NN") in rgba per light/dark. */
export function resolveDynamicTextColor(value: string | undefined): DynamicColorPair {
  if (!value) return {};

  const parseSide = (tokens: string[]): string | undefined => {
    const token = tokens.find((t) => t.startsWith("text-"));
    if (!token) return undefined;
    const extracted = extractColorToken(token, "text-");
    if (!extracted) return undefined;
    return colorTokenToRgba(extracted.raw, extracted.opacity);
  };

  const { lightTokens, darkTokens } = splitLightDark(value);
  return { light: parseSide(lightTokens), dark: parseSide(darkTokens) };
}

/** Risolve una bgColorClassName (solida o a gradiente) in un valore CSS `background` per light/dark. */
export function resolveDynamicBgColor(value: string | undefined): DynamicColorPair {
  if (!value) return {};

  const parseSide = (tokens: string[]): string | undefined => {
    const isGradient = tokens.some((t) => t.startsWith("bg-linear-to-") || t.startsWith("bg-gradient-to-"));

    if (isGradient) {
      const dirToken = tokens.find((t) => t.startsWith("bg-linear-to-") || t.startsWith("bg-gradient-to-"));
      const fromToken = tokens.find((t) => t.startsWith("from-"));
      // La posizione percentuale del via ("via-[30%]") e il suo colore
      // ("via-blue-500/80" oppure, per un colore custom, "via-[#ff3131]/80")
      // condividono lo stesso prefisso — distinguiamo per contenuto: solo un
      // numero seguito da "%" è una posizione, tutto il resto è un colore.
      const viaPosToken = tokens.find((t) => t.startsWith("via-") && /^via-\[?\d+%\]?$/.test(t));
      const viaToken = tokens.find((t) => t.startsWith("via-") && t !== viaPosToken);
      const toToken = tokens.find((t) => t.startsWith("to-"));

      const angleMap: Record<string, string> = {
        t: "0deg", b: "180deg", l: "270deg", r: "90deg",
        tr: "45deg", tl: "315deg", br: "135deg", bl: "225deg",
      };
      const dirMatch = dirToken?.match(/to-([a-z]+)$/);
      const angle = (dirMatch && angleMap[dirMatch[1]]) || "180deg";

      const extract = (token: string | undefined, type: "from" | "via" | "to"): string | undefined => {
        if (!token) return undefined;
        const extracted = extractColorToken(token, `${type}-`);
        if (!extracted) return undefined;
        return colorTokenToRgba(extracted.raw, extracted.opacity);
      };

      const from = extract(fromToken, "from") || "transparent";
      const to = extract(toToken, "to") || "transparent";
      const via = extract(viaToken, "via");
      const viaPosMatch = viaPosToken?.match(/via-\[?(\d+)%\]?/);
      const viaPos = viaPosMatch ? parseInt(viaPosMatch[1], 10) : 50;

      return via
        ? `linear-gradient(${angle}, ${from} 0%, ${via} ${viaPos}%, ${to} 100%)`
        : `linear-gradient(${angle}, ${from} 0%, ${to} 100%)`;
    }

    const token = tokens.find((t) => t.startsWith("bg-") && !t.includes("linear-to") && !t.includes("gradient-to"));
    if (!token) return undefined;
    const extracted = extractColorToken(token, "bg-");
    if (!extracted) return undefined;
    return colorTokenToRgba(extracted.raw, extracted.opacity);
  };

  const { lightTokens, darkTokens } = splitLightDark(value);
  return { light: parseSide(lightTokens), dark: parseSide(darkTokens) };
}

/** Costruisce le CSS custom property da passare a style per .dyn-text (vedi globals.css). */
export function dynamicTextStyle(value: string | undefined): React.CSSProperties {
  const { light, dark } = resolveDynamicTextColor(value);
  if (!light && !dark) return {};
  return {
    "--dyn-text-light": light,
    "--dyn-text-dark": dark ?? light,
  } as React.CSSProperties;
}

/** Costruisce le CSS custom property da passare a style per .dyn-bg (vedi globals.css). */
export function dynamicBgStyle(value: string | undefined): React.CSSProperties {
  const { light, dark } = resolveDynamicBgColor(value);
  if (!light && !dark) return {};
  return {
    "--dyn-bg-light": light,
    "--dyn-bg-dark": dark ?? light,
  } as React.CSSProperties;
}
