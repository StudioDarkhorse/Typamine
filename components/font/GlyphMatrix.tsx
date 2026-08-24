"use client";

import { useEffect, useMemo, useState } from "react";
import { Columns2, Type } from "lucide-react";
import { FontFaceInjector } from "@/components/common/LivePreview";
import { cn } from "@/lib/utils";

// Set di glifi mostrati nella matrice. Coprono quello che ci si aspetta da un
// font testuale completo: chi ne ha meno (tipico dei display/decorativi) lo
// rende evidente proprio grazie alle celle marcate come mancanti.
const GLYPH_GROUPS: Array<{ label: string; glyphs: string[] }> = [
  { label: "Uppercase", glyphs: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") },
  { label: "Lowercase", glyphs: "abcdefghijklmnopqrstuvwxyz".split("") },
  { label: "Numerals", glyphs: "0123456789".split("") },
  {
    label: "Punctuation & Symbols",
    glyphs: ".,:;!?'\"·()[]{}/\\|@#$%^&*-_=+<>~`€£¥¢©®™§¶†‡•…–—«»‹›".split(""),
  },
  {
    label: "Accented & Extended",
    glyphs: "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿŁłŠšŽžŒœ".split(""),
  },
];

const ALL_GLYPHS = GLYPH_GROUPS.flatMap((group) => group.glyphs);

type Mode = "split" | "solo";

const MODES: Array<{ value: Mode; label: string; icon: typeof Columns2 }> = [
  { value: "split", label: "Side by side", icon: Columns2 },
  { value: "solo", label: "This font only", icon: Type },
];

interface GlyphMatrixProps {
  fontName: string;
  /** Nome famiglia CSS della variante (es. "Typamine_Baksoap"). */
  fontFamily: string;
  fontUrl?: string;
}

/**
 * Rileva i glifi che il font NON contiene.
 *
 * Nessuna API del browser risponde davvero alla domanda: `document.fonts.check`
 * dice solo se una face con quel nome è caricata (in Chrome torna true anche
 * per un ideogramma su un font solo-latino), quindi si misura.
 *
 * Il glifo viene disegnato con `"Famiglia", fallback` e poi col solo
 * `fallback`: se le due larghezze coincidono l'ha disegnato il fallback, cioè
 * il font non ha quel carattere. Il controllo gira su DUE fallback con
 * metriche diverse (monospace e serif) e serve che entrambi coincidano, così
 * una larghezza uguale per caso non basta a marcare un glifo come mancante.
 */
function useMissingGlyphs(fontFamily: string, fontUrl?: string): Set<string> {
  const [missing, setMissing] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!fontFamily || fontFamily === "sans-serif") return;

    let cancelled = false;

    const detect = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // Nessun Font Loading API utilizzabile: si misura comunque, al peggio
        // il font non è ancora pronto e la matrice resta senza marcature.
      }

      const context = document.createElement("canvas").getContext("2d");
      if (!context) return;

      const widthOf = (font: string, glyph: string) => {
        context.font = font;
        return context.measureText(glyph).width;
      };

      const notInFont = new Set<string>();
      for (const glyph of ALL_GLYPHS) {
        const drawnByMonoFallback = widthOf(`64px "${fontFamily}", monospace`, glyph) === widthOf("64px monospace", glyph);
        if (!drawnByMonoFallback) continue;

        const drawnBySerifFallback = widthOf(`64px "${fontFamily}", serif`, glyph) === widthOf("64px serif", glyph);
        if (drawnBySerifFallback) notInFont.add(glyph);
      }

      if (!cancelled) setMissing(notInFont);
    };

    detect();
    return () => {
      cancelled = true;
    };
  }, [fontFamily, fontUrl]);

  return missing;
}

// Confronto glifo per glifo fra il font della pagina e Alte Haas Grotesk (il
// font di sistema di Typamine), usato come metro neutro: ogni cella è divisa
// a metà, così differenze di larghezza, altezza-x e proporzioni si leggono a
// colpo d'occhio.
export default function GlyphMatrix({ fontName, fontFamily, fontUrl }: GlyphMatrixProps) {
  const [mode, setMode] = useState<Mode>("split");
  const missing = useMissingGlyphs(fontFamily, fontUrl);

  const availableCount = useMemo(() => ALL_GLYPHS.length - missing.size, [missing]);
  const fontStack = `"${fontFamily}", sans-serif`;

  return (
    <section className="border border-zinc-200 dark:border-zinc-800 bg-ocragray-100 dark:bg-ocragray-900 rounded-lg overflow-hidden transition-colors duration-300">
      {fontUrl && <FontFaceInjector fontFamily={fontFamily} url={fontUrl} />}

      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-4 py-3 md:px-8 md:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-haas text-md font-bold tracking-widest text-blue uppercase">Glyph Matrix</h2>
          <p className="text-sm font-haas text-ocragray-800 dark:text-zinc-400 mt-0.5">
            {fontName} {mode === "split" ? "vs Alte Haas Grotesk " : ""}&middot;{" "}
            <span className="tabular-nums">
              {missing.size > 0 ? `${availableCount} of ${ALL_GLYPHS.length}` : ALL_GLYPHS.length}
            </span>{" "}
            glyphs available
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {MODES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              title={label}
              aria-pressed={mode === value}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded font-x-typewriter font-bold text-sm uppercase tracking-widest transition-colors",
                mode === value
                  ? "bg-red text-black"
                  : "text-ocragray-800 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {mode !== "solo" && (
        <div className="px-4 md:px-8 py-2 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-4 text-[10px] font-haas uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-black dark:text-white">
            <span className="h-2 w-2 rounded-full bg-red" />
            {fontName}
          </span>
          <span className="flex items-center gap-1.5 text-ocragray-800 dark:text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            Alte Haas Grotesk
          </span>
          {missing.size > 0 && (
            <span className="flex items-center gap-1.5 text-ocragray-800 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full border border-dashed border-zinc-400 dark:border-zinc-600" />
              Not in this font
            </span>
          )}
        </div>
      )}

      <div className="p-4 md:p-8 space-y-8">
        {GLYPH_GROUPS.map((group) => (
          <div key={group.label} className="space-y-3">
            <span className="text-[10px] font-haas font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-400">
              {group.label}
            </span>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-1.5">
              {group.glyphs.map((glyph, index) => {
                const isMissing = missing.has(glyph);

                return (
                  <div
                    key={`${group.label}-${index}`}
                    title={`${glyph}  U+${glyph.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}${isMissing ? " — not in this font" : ""}`}
                    className={cn(
                      "relative aspect-square rounded border bg-white dark:bg-black overflow-hidden select-none",
                      isMissing
                        ? "border-dashed border-zinc-300 dark:border-zinc-700 opacity-40"
                        : "border-zinc-200 dark:border-zinc-800"
                    )}
                  >
                    {mode === "split" ? (
                      <div className="absolute inset-0 flex">
                        <span
                          aria-hidden
                          className="flex-1 flex items-center justify-center text-xl md:text-2xl font-haas text-ocragray-800 dark:text-zinc-500 leading-none"
                        >
                          {glyph}
                        </span>
                        <span className="w-px bg-zinc-200 dark:bg-zinc-800" />
                        <span
                          className="flex-1 flex items-center justify-center text-xl md:text-2xl text-black dark:text-white leading-none"
                          style={{ fontFamily: fontStack }}
                        >
                          {glyph}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl text-black dark:text-white leading-none"
                        style={{ fontFamily: fontStack }}
                      >
                        {glyph}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
