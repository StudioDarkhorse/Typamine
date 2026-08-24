"use client";

import React, { useState, useId } from "react";
import { Type, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";
import HexColorPickerPopover from "@/components/common/HexColorPickerPopover";
import BaseModal from "@/components/common/BaseModal";

/**
 * Iniettore di font sicuro: usa i children per evitare XSS.
 * React esegue automaticamente l'escaping dei contenuti inseriti tra i tag <style>.
 */
export const FontFaceInjector = React.memo(({ fontFamily, url }: { fontFamily: string; url: string }) => {
  if (!url) return null;
  // Aggiungiamo un ID al tag style basato sull'URL per evitare duplicazioni
  const styleId = `font-${btoa(url).slice(0, 16)}`;

  return (
    <style id={styleId}>
      {`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${url}') format('woff2');
          font-display: swap;
        }
      `}
    </style>
  );
});
FontFaceInjector.displayName = "FontFaceInjector";

export interface LivePreviewProps {
  fontName?: string;
  /**
   * Raw CSS `font-family` value to actually render with, when it differs from the
   * display name in `fontName` (e.g. a `var(--font-x)` reference, or a family name
   * that needs its own quoting). Falls back to `fontName` when omitted.
   */
  fontFamilyCss?: string;
  fontUrl?: string;
  isVariable?: boolean;
  initialText?: string;
  initialSize?: number;
  initialWeight?: number;
  showToolbar?: boolean;
  showControls?: boolean;
  showBackgroundGlow?: boolean;
  editable?: boolean;
  minSize?: number;
  maxSize?: number;
  className?: string;
  /** Reduces chrome (rounding, shadow, padding, height) for tight layouts like grid cards. */
  compact?: boolean;
  /** Opt-in extra controls, off by default so existing usages render unchanged. */
  showTextColorControl?: boolean;
  showBgColorControl?: boolean;
  showLineHeightControl?: boolean;
  showLetterSpacingControl?: boolean;
  initialTextColor?: string;
  initialBgColor?: string;
  initialLineHeight?: number;
  initialLetterSpacing?: number;
  /** Su mobile mostra un pulsante "Customize" che apre i controlli in una modale, invece del toolbar inline. Su desktop il comportamento resta invariato. */
  mobileControlsInModal?: boolean;
  rounded?: boolean;
}

export default function LivePreview({
  fontName = "Live Preview",
  fontFamilyCss,
  fontUrl,
  isVariable = false,
  initialText = "AaBbCcDdEeFf 123",
  initialSize = 48,
  initialWeight = 400,
  showToolbar = true,
  showControls = true,
  showBackgroundGlow = true,
  editable = true,
  minSize = 12,
  maxSize = 140,
  className,
  compact = false,
  showTextColorControl = false,
  showBgColorControl = false,
  showLineHeightControl = false,
  showLetterSpacingControl = false,
  initialTextColor,
  initialBgColor,
  initialLineHeight = 1.2,
  initialLetterSpacing = 0,
  mobileControlsInModal = false,
  rounded = true,
}: LivePreviewProps) {
  const { theme } = useThemeStore();
  const defaultTextColor = theme === "dark" ? "#F5F6F9" : "#0C0B0A";
  const defaultBgColor = theme === "dark" ? "#0C0B0A" : "#F5F6F9";

  const [text, setText] = useState(initialText);
  const [prevInitialText, setPrevInitialText] = useState(initialText);
  const [size, setSize] = useState(initialSize);
  const [weight, setWeight] = useState(initialWeight);
  const [textColor, setTextColor] = useState(initialTextColor ?? defaultTextColor);
  const [bgColor, setBgColor] = useState(initialBgColor ?? defaultBgColor);

  React.useEffect(() => {
    if (initialTextColor === undefined) {
      setTextColor(theme === "dark" ? "#F5F6F9" : "#0C0B0A");
    }
    if (initialBgColor === undefined) {
      setBgColor(theme === "dark" ? "#0C0B0A" : "#F5F6F9");
    }
  }, [theme, initialTextColor, initialBgColor]);
  const [lineHeight, setLineHeight] = useState(initialLineHeight);
  const [letterSpacing, setLetterSpacing] = useState(initialLetterSpacing);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);

  // Ordine fisso dei gruppi di controlli, per decidere quale mostra il divisore a destra
  const hasWeightGroup = isVariable;
  const hasTrackingGroup = showLetterSpacingControl;
  const hasLeadingGroup = showLineHeightControl;
  const hasTextColorGroup = showTextColorControl;
  const hasBgColorGroup = showBgColorControl;

  // Tiene il testo allineato se il chiamante aggiorna initialText dopo il primo render
  // (es. più card montate che condividono lo stesso testo di anteprima da un filtro esterno).
  // Aggiornamento durante il render (pattern React consigliato) invece che in un effect,
  // per evitare un render "a cascata" in più.
  if (initialText !== prevInitialText) {
    setPrevInitialText(initialText);
    setText(initialText);
  }

  // Genera un ID univoco per questo componente (fondamentale per evitare conflitti CSS)
  const uniqueId = useId().replace(/:/g, "");
  const dynamicFontFamily = `Preview_${uniqueId}`;



  return (
    <div
      className={cn(
        "relative lg:mx-1 overflow-hidden border border-zinc-200 dark:border-zinc-900 transition-all duration-700 group",
        !hasBgColorGroup && "bg-white dark:bg-black",
        compact ? "shadow-sm" : "shadow-2xl",
        rounded ? "rounded-md" : "",
        className
      )}
      style={hasBgColorGroup ? { backgroundColor: bgColor } : undefined}
    >


      {/* Iniezione locale: attiva solo se abbiamo un URL */}
      {fontUrl && <FontFaceInjector fontFamily={dynamicFontFamily} url={fontUrl} />}

      {showBackgroundGlow && (
        <div className="absolute -inset-32 bg-gradient-to-tr from-blue/10 via-transparent to-blue/5 dark:from-red/10 dark:to-red/5 blur-3xl opacity-50 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
      )}

      {showToolbar && (
        <div className={cn(
          "relative z-10 p-5 border-b border-zinc-200 dark:border-zinc-900 flex flex-wrap items-center justify-center gap-4 bg-zinc-50/80 dark:bg-zinc-950/50 backdrop-blur-md",
          rounded ? " rounded-t-md" : ""
        )}>
          {showControls && (() => {
            // Layout a griglia allineata (colonne uguali, come una tabella)
            // dentro un unico pannello condiviso — nessun bordo/sfondo per
            // singolo controllo (quello sì tolto), nessun numero di valore
            // accanto alla label, label più piccola.
            const rangeClassName =
              "w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue dark:accent-red touch-pan-x";
            const controlLabelClassName =
              "text-[9px] mb-2 text-ocragray-800 dark:text-zinc-200 uppercase tracking-widest font-black";
            const controlWrapClassName = "flex flex-col gap-1.5";

            // Due righe separate come prima (range da un lato, colori
            // dall'altro) invece di un unico wrap misto — solo senza bordi
            // e senza i numeri di valore accanto a ciascuna label.
            const rangeCards: React.ReactNode[] = [
              <div key="size" className={controlWrapClassName}>
                <span className={controlLabelClassName}>Size</span>
                <input
                  type="range"
                  min={minSize}
                  max={maxSize}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className={rangeClassName}
                />
              </div>,
            ];
            const colorCards: React.ReactNode[] = [];

            if (hasWeightGroup) {
              rangeCards.push(
                <div key="weight" className={controlWrapClassName}>
                  <span className={controlLabelClassName}>Weight</span>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className={rangeClassName}
                  />
                </div>
              );
            }

            if (hasTrackingGroup) {
              rangeCards.push(
                <div key="tracking" className={controlWrapClassName}>
                  <span className={controlLabelClassName}>Tracking</span>
                  <input
                    type="range"
                    min={-4}
                    max={12}
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className={rangeClassName}
                  />
                </div>
              );
            }

            if (hasLeadingGroup) {
              rangeCards.push(
                <div key="leading" className={controlWrapClassName}>
                  <span className={controlLabelClassName}>Leading</span>
                  <input
                    type="range"
                    min={0.8}
                    max={2.2}
                    step={0.05}
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className={rangeClassName}
                  />
                </div>
              );
            }

            if (hasTextColorGroup) {
              colorCards.push(
                <div key="text-color" className="flex items-center justify-between gap-2">
                  <span className={controlLabelClassName}>Text</span>
                  <HexColorPickerPopover color={textColor} onChange={setTextColor} title="Text color">
                    <span
                      className="h-5 w-5 block rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-xs"
                      style={{ backgroundColor: textColor }}
                    />
                  </HexColorPickerPopover>
                </div>
              );
            }

            if (hasBgColorGroup) {
              colorCards.push(
                <div key="bg-color" className="flex items-center justify-between gap-2">
                  <span className={controlLabelClassName}>BG</span>
                  <HexColorPickerPopover color={bgColor} onChange={setBgColor} title="Background color">
                    <span
                      className="h-5 w-5 block rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer shadow-xs"
                      style={{ backgroundColor: bgColor }}
                    />
                  </HexColorPickerPopover>
                </div>
              );
            }

            // Grid a colonne allineate (non flex-wrap): stessa larghezza per
            // ogni controllo della riga, come una tabella — Size/Weight/
            // Tracking/Leading sulla prima riga, Text/BG sulla seconda,
            // dentro un unico pannello condiviso (bordo/sfondo qui, non sui
            // singoli controlli).
            const groups = (
              <div className="flex flex-col gap-4 w-full p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">{rangeCards}</div>
                {colorCards.length > 0 && <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-8">{colorCards}</div>}
              </div>
            );

            if (!mobileControlsInModal) {
              return (
                <div className="w-full">
                  <div className="block md:hidden">{groups}</div>
                  <div className="hidden md:block">{groups}</div>
                </div>
              );
            }

            return (
              <>
                <button
                  type="button"
                  onClick={() => setIsControlsModalOpen(true)}
                  className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200 shadow-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4 text-blue dark:text-red" />
                  Tweak
                </button>
                <div className="hidden md:block w-full">{groups}</div>
                <BaseModal isOpen={isControlsModalOpen} onClose={() => setIsControlsModalOpen(false)} size="md">
                  <BaseModal.Header onClose={() => setIsControlsModalOpen(false)}>
                    <h2 className="text-lg text-black dark:text-white">Customize Preview</h2>
                  </BaseModal.Header>
                  <BaseModal.Body className="!p-4 !sm:p-6">
                    {groups}
                  </BaseModal.Body>
                </BaseModal>
              </>
            );
          })()}
        </div>
      )}

      <div
        className={cn(
          "relative z-10 flex items-center justify-center overflow-hidden",
          !hasBgColorGroup && "bg-white dark:bg-black",
          compact ? "p-3 h-[110px]" : "p-8 h-[260px]"
        )}
        style={hasBgColorGroup ? { backgroundColor: bgColor } : undefined}
      >
        {/* Effetto Scanlines (Vecchie righette televisore) */}
        {!compact && (
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 6px, currentColor 6px, currentColor 7px)',
              backgroundAttachment: 'fixed'
            }}
          />
        )}

        {(() => {
          const previewStyle: React.CSSProperties = {
            fontFamily: fontUrl
              ? `'${dynamicFontFamily}', sans-serif`
              : fontFamilyCss
                ? `${fontFamilyCss}, sans-serif`
                : `'${fontName}', sans-serif`,
            fontSize: `${size}px`,
            fontWeight: isVariable ? weight : initialWeight || 400,
            fontVariationSettings: isVariable ? `'wght' ${weight}` : 'normal',
            lineHeight: hasLeadingGroup ? lineHeight : compact ? 1.35 : undefined,
            letterSpacing: hasTrackingGroup ? `${letterSpacing}px` : undefined,
            color: hasTextColorGroup ? textColor : undefined,
          };
          const previewClassName = cn(
            "relative z-10 w-full bg-transparent border-none text-center overflow-visible",
            !hasLeadingGroup && (compact ? "leading-normal" : "leading-tight"),
            !hasTextColorGroup && "text-black dark:text-white"
          );

          // Non-editable previews render as plain static text rather than a form
          // control, since LivePreview can end up nested inside a <Link> (e.g. card
          // grids) where an interactive <textarea> would be invalid HTML nesting.
          return editable ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={cn(previewClassName, "h-full resize-none focus:outline-none focus:ring-0 overflow-auto")}
              style={previewStyle}
              spellCheck="false"
            />
          ) : (
            <p className={cn(previewClassName, "h-full flex items-center justify-center cursor-default whitespace-pre-wrap")} style={previewStyle}>
              {text}
            </p>
          );
        })()}
      </div>
    </div>
  );
}