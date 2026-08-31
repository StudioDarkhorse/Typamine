import React from "react";
import { MediaBackground, LoopSettings } from "./MediaBackground";

export type { LoopSettings };

interface DoubleHeroRootProps {
  bgImage?: string;
  bgOpacity?: number;
  bgObjectFit?: "cover" | "contain";
  bgObjectPosition?: "top" | "center" | "bottom";
  loopSettings?: LoopSettings;
  /** Niente bordo/radius, angoli vivi full-bleed (default true). */
  fullWidth?: boolean;
  /** Nessuna wash/gradient/aura sopra il media: lo sfondo si vede pulito. */
  clearView?: boolean;
  /** Wash sopra/sotto il media per leggibilita' testo. Default: bg-white/70 dark:bg-black/70. */
  overlayClassName?: string;
  /** Layer gradiente opzionale (es. fade verso il contenuto sotto). Nessun default: solo se passato. */
  gradientClassName?: string;
  /** Bagliore decorativo (radial gradient). Default: blob rosso in alto a destra. */
  auraClassName?: string;
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_AURA = "right-0 top-0 w-96 h-96 bg-radial from-[#ff3131]/10 to-transparent";

// Wrapper: nessuna altezza indovinata (niente piu' h-[400dvh]/h-[300dvh] a
// caso per breakpoint). L'altezza totale e' quella REALE del flusso dei due
// viewport figli (FirstViewport 100dvh + SecondViewport auto o min-height):
// il background, absolute inset-0 su QUESTO wrapper, la eredita per intero.
// Zero rischio di sfondo tagliato o che eccede, qualunque sia l'altezza del
// contenuto del secondo viewport.
function DoubleHeroRoot({
  bgImage,
  bgOpacity = 0.8,
  bgObjectFit = "cover",
  bgObjectPosition = "top",
  loopSettings,
  fullWidth = true,
  clearView = false,
  overlayClassName,
  gradientClassName,
  auraClassName,
  className = "",
  children,
}: DoubleHeroRootProps) {
  const objectFitClass = bgObjectFit === "contain" ? "object-contain" : "object-cover";
  const objectPosClass =
    bgObjectPosition === "top" ? "object-top" : bgObjectPosition === "bottom" ? "object-bottom" : "object-center";

  const shellBorderStyles = fullWidth
    ? "border-0 rounded-none"
    : "border border-zinc-300 dark:border-zinc-800 rounded-lg";

  // Stessa wash del vecchio componente: applicata come background-color del
  // wrapper stesso (non un layer separato), cosi' il media semi-trasparente
  // sopra lascia trasparire il wash sottostante invece di coprirlo.
  const washClassName = clearView ? "bg-transparent" : (overlayClassName ?? "bg-white/70 dark:bg-black/70");

  return (
    <div
      className={`relative w-full ${shellBorderStyles} ${washClassName} overflow-hidden transition-colors duration-300 ${className}`}
    >
      {bgImage && (
        <MediaBackground
          src={bgImage}
          alt="Hero Background"
          opacity={clearView ? 1 : bgOpacity}
          loopSettings={loopSettings}
          className={`absolute inset-0 ${objectFitClass} ${objectPosClass} w-full h-full -z-20 pointer-events-none select-none`}
        />
      )}

      {!clearView && gradientClassName && (
        <div className={`absolute inset-0 -z-10 pointer-events-none ${gradientClassName}`} />
      )}

      {!clearView && (
        <div className={`absolute -z-10 pointer-events-none ${auraClassName ?? DEFAULT_AURA}`} />
      )}

      <div className="relative z-10 flex flex-col w-full">{children}</div>
    </div>
  );
}

interface DoubleHeroFirstViewportProps {
  className?: string;
  children: React.ReactNode;
}

// Sempre a schermo intero: e' il "titolo + tutto quello che serve" sopra la
// piega. Nessuna prop di altezza: il punto di questo viewport e' proprio
// occupare l'intero schermo, non e' negoziabile per design.
function DoubleHeroFirstViewport({ className = "", children }: DoubleHeroFirstViewportProps) {
  return <div className={`w-full min-h-[100dvh] shrink-0 relative ${className}`}>{children}</div>;
}

interface DoubleHeroSecondViewportProps {
  className?: string;
  /**
   * Altezza MINIMA in dvh (es. 140 -> min-height: 140dvh): riserva spazio
   * quando il contenuto e' corto, ma non lo comprime mai. Se il contenuto e'
   * piu' alto, il viewport cresce e scrolla la pagina.
   */
  minHeight?: number;
  /** Default true: altezza intrinseca, cresce/si adatta al contenuto (children). */
  grow?: boolean;
  children?: React.ReactNode;
}

// Nessuna altezza fissa + overflow interno: quello creava una scrollbar dentro
// la scrollbar della pagina (UX rotta su mobile, dove il contenuto sfora
// sempre). Qui l'altezza dichiarata e' solo un min-height: il contenuto che
// eccede allunga il documento e scrolla con il comportamento nativo del
// browser, senza nested scrolling.
function DoubleHeroSecondViewport({ className = "", minHeight, grow = true, children }: DoubleHeroSecondViewportProps) {
  const hasMinHeight = typeof minHeight === "number";
  const style = hasMinHeight ? { minHeight: `${minHeight}dvh` } : undefined;

  return (
    <div
      className={`relative w-full ${!hasMinHeight && !grow ? "h-auto" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export const DoubleHero = Object.assign(DoubleHeroRoot, {
  FirstViewport: DoubleHeroFirstViewport,
  SecondViewport: DoubleHeroSecondViewport,
});
