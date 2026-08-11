"use client";

import React from "react";
import Link from "next/link";
import GlyphTypeface from "@/components/layout/GlyphTypeface";
import { ResolvedBrandFont } from "@/types";

interface FooterProps {
  /** Brand identity overrides (see /admin/settings, tab General). Omit any of these to keep the corresponding default. */
  letterTFont?: ResolvedBrandFont;
  /** "T" font-size as a % of the rest of the wordmark's size — 100 = same size, 200 = double. */
  letterTFontSizePercent?: number;
  /** Color of the small rotating square indicator (not the letters) in light/dark mode — defaults to the brand cyan/red. */
  logoLightModeColor?: string;
  logoDarkModeColor?: string;
}

const DEFAULT_SQUARE_LIGHT_COLOR = "#4FE8E8";
const DEFAULT_SQUARE_DARK_COLOR = "#FF3132";

export const Footer: React.FC<FooterProps> = ({
  letterTFont,
  letterTFontSizePercent = 100,
  logoLightModeColor,
  logoDarkModeColor,
}) => {
  const hasCustomTFont = !!letterTFont?.woff2Url;
  const tFontFamily = hasCustomTFont ? `BrandLetterT_${letterTFont!.id}` : undefined;
  const hasCustomTSize = letterTFontSizePercent !== 100;

  const squareDynStyle = {
    "--dyn-bg-light": logoLightModeColor || DEFAULT_SQUARE_LIGHT_COLOR,
    "--dyn-bg-dark": logoDarkModeColor || DEFAULT_SQUARE_DARK_COLOR,
    "--dyn-text-light": logoLightModeColor || DEFAULT_SQUARE_LIGHT_COLOR,
    "--dyn-text-dark": logoDarkModeColor || DEFAULT_SQUARE_DARK_COLOR,
  } as React.CSSProperties;

  return (
    <footer className="relative min-h-[100dvh] w-full flex flex-col border-t border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-[#09090b]/40 font-haas text-[10px] text-ocragray-800 dark:text-zinc-200 transition-colors duration-300">
      <div className="relative flex-1 flex items-center justify-center px-4 overflow-hidden">
        <div className="relative inline-block text-[clamp(3rem,14vw,14rem)] text-blue dark:text-red">
          {hasCustomTFont && (
            <style>{`@font-face { font-family: '${tFontFamily}'; src: url('${letterTFont!.woff2Url}') format('woff2'); font-display: swap; }`}</style>
          )}
          <GlyphTypeface
            text="TYPAMINE"
            className="font-rezland text-black dark:text-white"
            firstLetterClassName="font-rezland text-black dark:text-white"
            firstLetterFontFamilyCss={hasCustomTFont ? `'${tFontFamily}'` : undefined}
            firstLetterStyle={{
              fontFamily: hasCustomTFont ? `'${tFontFamily}', 'Star Avenue', sans-serif` : undefined,
              fontSize: hasCustomTSize ? `${letterTFontSizePercent}%` : undefined,
            }}
          />

          {/* Quadrato "chimico" caratteristico del logo (vedi DynamicLogo,
              dove sta un po' più in basso rispetto al testo — pb maggiore
              qui riproduce lo stesso distacco). Rotazione sempre "attaccata"
              ma in prima persona (animation-play-state): all'hover riparte da dove
              si era fermata invece di scattare da 0deg, e quando il mouse
              esce si blocca ferma nella posizione corrente invece di
              resettarsi — play-state pausa/riprende, niente JS. Colore da
              /admin/settings (default ciano/rosso di brand), stesso
              trattamento del quadrato in DynamicLogo. */}
          <div
            className="absolute bottom-[0.15em] right-[-0.72em] w-[0.57em] h-[0.57em] dyn-bg dyn-text shadow-[0_0_15px_currentColor] blur-[1px] brightness-110 rounded-xs [animation:spin_4s_linear_infinite] [animation-play-state:paused] hover:[animation-play-state:running]"
            style={squareDynStyle}
          />

          {/* Credito del font della "T" del mese, appena sotto la scritta
              TYPAMINE — right-0 allinea al bordo destro del testo (dove
              finisce la "E"), non al quadratino chimico che sporge oltre
              (right:-0.72em). Link solo se la pagina esiste davvero (font
              sempre, autore solo se non è un placeholder d'import/AI, vedi
              resolveLetterTFont in lib/services/adminSettings.ts). */}
          {letterTFont && (
            <div className="absolute flex gap-x-1 items-baseline top-full right-0 mt-2 sm:mt-3 text-blue-600 dark:text-red text-right text-[10px] sm:text-sm leading-relaxed whitespace-nowrap">
              <p>
                This month&apos;s font:{" "}
                <Link
                  href={`/ingredients/${letterTFont.slug}`}
                  className="font-bold uppercase text-md text-black dark:text-white hover:text-blue dark:hover:text-red transition-colors"
                >
                  {letterTFont.name.replace('_', " ")}
                </Link>
              </p>
              {letterTFont.author && (
                <p>
                  by{" "}
                  <Link
                    href={`/author/${letterTFont.author.slug}`}
                    className="font-bold uppercase text-md text-black dark:text-white hover:text-blue dark:hover:text-red transition-colors"
                  >
                    {letterTFont.author.name}
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} TYPAMINE STUDIO - ALL RIGHTS RESERVED.</span>
          <span className="text-ocragray-800 dark:text-zinc-200">|</span>
          <span className="hover:text-blue transition-colors cursor-pointer">TERMS_OF_SERVICE</span>
          <span className="text-ocragray-800 dark:text-zinc-200">|</span>
          <span className="hover:text-blue transition-colors cursor-pointer">PRIVACY_POLICY</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
