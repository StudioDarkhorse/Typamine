// Misure reali di rendering per il tool WCAG: tutto quello che non si può
// dedurre dai numeri (lib/wcag.ts) ma solo mandando il testo in pagina e
// leggendo il layout risultante — overflow, reflow, crescita in altezza,
// distinguibilità dei glifi, densità del tratto.
//
// Ogni misura crea un nodo fuori schermo, legge, e lo rimuove: nessun residuo
// nel DOM e nessuna interferenza con l'anteprima visibile.

export interface MeasureOptions {
  text: string;
  fontFamily: string;
  fontSizePx: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacingEm: number;
  wordSpacingEm: number;
  widthPx: number;
}

export interface MeasureResult {
  /** Altezza occupata dal testo con questa combinazione di metriche. */
  height: number;
  /** Larghezza del contenuto: se supera widthPx c'è overflow orizzontale. */
  scrollWidth: number;
  overflowsX: boolean;
  lineCount: number;
  charsPerLine: number;
}

export function measureText(options: MeasureOptions): MeasureResult {
  const {
    text,
    fontFamily,
    fontSizePx,
    fontWeight,
    lineHeight,
    letterSpacingEm,
    wordSpacingEm,
    widthPx,
  } = options;

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = [
    "position:absolute",
    "left:-99999px",
    "top:0",
    "visibility:hidden",
    "pointer-events:none",
    "contain:layout style",
    `width:${widthPx}px`,
  ].join(";");

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  paragraph.style.cssText = [
    "margin:0",
    "padding:0",
    `font-family:${fontFamily}`,
    `font-size:${fontSizePx}px`,
    `font-weight:${fontWeight}`,
    `line-height:${lineHeight}`,
    `letter-spacing:${letterSpacingEm}em`,
    `word-spacing:${wordSpacingEm}em`,
    "white-space:normal",
    "overflow-wrap:normal",
    "word-break:normal",
  ].join(";");

  host.appendChild(paragraph);
  document.body.appendChild(host);

  const height = paragraph.getBoundingClientRect().height;
  const scrollWidth = paragraph.scrollWidth;
  const lineBox = fontSizePx * lineHeight;
  const lineCount = Math.max(1, Math.round(height / lineBox));

  document.body.removeChild(host);

  return {
    height,
    scrollWidth,
    // Tolleranza di 1px: gli arrotondamenti sub-pixel del layout non sono
    // overflow reale.
    overflowsX: scrollWidth - widthPx > 1,
    lineCount,
    charsPerLine: Math.round(text.length / lineCount),
  };
}

// Carica un file font e lo registra con un nome di famiglia dedicato al tool,
// così le misure non dipendono da cosa il sito ha già caricato altrove.
export async function loadFontFace(family: string, url: string): Promise<boolean> {
  if (typeof window === "undefined" || !("FontFace" in window)) return false;
  try {
    const face = new FontFace(family, `url(${JSON.stringify(url)})`, { display: "swap" });
    await face.load();
    (document.fonts as FontFaceSet).add(face);
    return true;
  } catch {
    return false;
  }
}

const GLYPH_CANVAS_SIZE = 220;

function renderGlyphAlpha(
  text: string,
  fontFamily: string,
  fontWeight: number
): Uint8ClampedArray | null {
  const canvas = document.createElement("canvas");
  canvas.width = GLYPH_CANVAS_SIZE;
  canvas.height = GLYPH_CANVAS_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.clearRect(0, 0, GLYPH_CANVAS_SIZE, GLYPH_CANVAS_SIZE);
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${fontWeight} 140px ${fontFamily}`;
  ctx.fillText(text, GLYPH_CANVAS_SIZE / 2, GLYPH_CANVAS_SIZE / 2);

  const { data } = ctx.getImageData(0, 0, GLYPH_CANVAS_SIZE, GLYPH_CANVAS_SIZE);
  const alpha = new Uint8ClampedArray(GLYPH_CANVAS_SIZE * GLYPH_CANVAS_SIZE);
  for (let i = 0; i < alpha.length; i++) alpha[i] = data[i * 4 + 3];
  return alpha;
}

/**
 * Differenza normalizzata (0 = glifi identici, 1 = nessuna sovrapposizione)
 * tra due stringhe renderizzate nello stesso font e nella stessa cella.
 * Serve per i test manuali di distinguibilità (Il1, O0, rn/m): non è un
 * criterio WCAG automatizzabile, ma è la stessa verifica che si fa a occhio
 * in sede di audit — qui misurata sui pixel invece che a intuito.
 */
export function glyphDifference(a: string, b: string, fontFamily: string, fontWeight: number): number | null {
  const alphaA = renderGlyphAlpha(a, fontFamily, fontWeight);
  const alphaB = renderGlyphAlpha(b, fontFamily, fontWeight);
  if (!alphaA || !alphaB) return null;

  let diff = 0;
  let union = 0;
  for (let i = 0; i < alphaA.length; i++) {
    diff += Math.abs(alphaA[i] - alphaB[i]);
    union += Math.max(alphaA[i], alphaB[i]);
  }
  if (union === 0) return null;
  return diff / union;
}

/**
 * Densità di inchiostro del font rispetto a una referenza (Arial) alla stessa
 * dimensione e peso: < 1 significa tratti più sottili della referenza. Proxy
 * misurabile per la nota WCAG sui "thin strokes" del criterio 1.4.3.
 */
export function inkRatioVsReference(
  sample: string,
  fontFamily: string,
  fontWeight: number
): number | null {
  const custom = renderGlyphAlpha(sample, fontFamily, fontWeight);
  const reference = renderGlyphAlpha(sample, "Arial, sans-serif", fontWeight);
  if (!custom || !reference) return null;

  let customInk = 0;
  let referenceInk = 0;
  for (let i = 0; i < custom.length; i++) {
    customInk += custom[i];
    referenceInk += reference[i];
  }
  if (referenceInk === 0) return null;
  return customInk / referenceInk;
}
