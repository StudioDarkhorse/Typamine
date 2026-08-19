import React from "react";
import { ResolvedBrandFont } from "@/types";

interface DynamicLogoProps {
  height?: number;
  width?: number;
  className?: string;
  squareColorClasses?: string;
  squareGlow?: boolean;
  squareIsButton?: boolean;
  squareButtonAction?: () => void;
  collapsed?: boolean;
  /** Mostra solo la 'T' e il quadrato chimico sia su mobile che su desktop. */
  iconOnly?: boolean;
  /** Nasconde le lettere 'ypamine' nei dispositivi mobile (schermi < 640px) lasciando solo 'T' + quadrato. Predefinito: true. */
  hideWordmarkMobile?: boolean;
  /** Brand identity overrides (see /admin/settings, tab General). Omit any of these to keep the corresponding default. */
  letterTFont?: ResolvedBrandFont;
  /** "T" font-size as a % of the rest of the wordmark's size — 100 = same size, 200 = double. */
  letterTFontSizePercent?: number;
  /** Color of the small square indicator (not the letters) in light/dark mode — defaults to the brand cyan/red. */
  logoLightModeColor?: string;
  logoDarkModeColor?: string;
}

const DEFAULT_SQUARE_LIGHT_COLOR = "#4FE8E8";
const DEFAULT_SQUARE_DARK_COLOR = "#FF3132";

export const DynamicLogo: React.FC<DynamicLogoProps> = ({
  height: propHeight,
  width: propWidth,
  className = "",
  squareColorClasses = "",
  squareGlow = false,
  squareIsButton = false,
  squareButtonAction,
  collapsed = false,
  iconOnly = false,
  hideWordmarkMobile = true,
  letterTFont,
  letterTFontSizePercent = 100,
  logoLightModeColor,
  logoDarkModeColor,
}) => {
  const hasCustomTSize = letterTFontSizePercent !== 100;

  // Il quadratino "chimico" prende sempre background+colore (per il glow
  // currentColor) da qui: valore custom se impostato in admin, altrimenti il
  // ciano/rosso di brand.
  const squareDynStyle = {
    "--dyn-bg-light": logoLightModeColor || DEFAULT_SQUARE_LIGHT_COLOR,
    "--dyn-bg-dark": logoDarkModeColor || DEFAULT_SQUARE_DARK_COLOR,
    "--dyn-text-light": logoLightModeColor || DEFAULT_SQUARE_LIGHT_COLOR,
    "--dyn-text-dark": logoDarkModeColor || DEFAULT_SQUARE_DARK_COLOR,
  } as React.CSSProperties;

  // Logica di calcolo proporzionale
  const normalHeight = propHeight !== undefined ? propHeight : 90;
  const desktopWidth = propWidth !== undefined ? propWidth : (propHeight !== undefined ? propHeight * 2 : 180);
  const mobileWidth = propHeight !== undefined ? Math.round(propHeight * 0.8) : 72;

  const collapsedHeight = 56;
  const collapsedWidth = 56;

  // Il box quadrato assunto per il centraggio del quadratino da collassato
  // (sotto) e' collapsedWidth/collapsedHeight — la larghezza reale del
  // container deve combaciare, altrimenti il quadratino si centra su una
  // misura diversa da quella del box che lo contiene davvero.
  const effectiveMobileWidth = collapsed ? collapsedWidth : (iconOnly ? mobileWidth : (hideWordmarkMobile ? mobileWidth : desktopWidth));
  const effectiveDesktopWidth = collapsed ? collapsedWidth : (iconOnly ? mobileWidth : desktopWidth);

  const currentHeight = collapsed ? collapsedHeight : normalHeight;

  // Valori in scala basati sull'altezza
  const normalFontSize = normalHeight * 0.35;
  const normalSquareSize = normalHeight * 0.2;
  const collapsedSquareSize = 28;
  const currentSquareSize = collapsed ? collapsedSquareSize : normalSquareSize;

  const mobileSquareLeft = collapsed ? (collapsedWidth - collapsedSquareSize) / 2 : (effectiveMobileWidth - normalSquareSize);
  const desktopSquareLeft = collapsed ? (collapsedWidth - collapsedSquareSize) / 2 : (effectiveDesktopWidth - normalSquareSize);
  const squareTop = collapsed ? (collapsedHeight - collapsedSquareSize) / 2 : (normalHeight - normalSquareSize);

  // Aura Neon dinamica basata su currentColor
  const glowClasses = squareGlow
    ? "shadow-[0_0_15px_currentColor] blur-[1px] brightness-110"
    : "";

  return (
    <div
      className={`dyn-logo-container relative flex items-center justify-start sm:justify-center bg-transparent select-none transition-all duration-500 ease-in-out ${className}`}
      style={{
        height: `${currentHeight}px`,
      }}
    >
      <style>{`
        .dyn-logo-container {
          width: ${effectiveMobileWidth}px;
        }
        .dyn-logo-square {
          left: ${mobileSquareLeft}px;
          top: ${squareTop}px;
          width: ${currentSquareSize}px;
          height: ${currentSquareSize}px;
        }
        .dyn-logo-letter-t {
          font-size: ${hasCustomTSize ? `${letterTFontSizePercent * 1.5}%` : "150%"};
        }
        @media (min-width: 640px) {
          .dyn-logo-container {
            width: ${effectiveDesktopWidth}px;
          }
          .dyn-logo-square {
            left: ${desktopSquareLeft}px;
          }
          .dyn-logo-letter-t {
            font-size: ${hasCustomTSize ? `${letterTFontSizePercent}%` : "inherit"};
          }
        }
      `}</style>

      <span
        className="font-rezland text-black dark:text-white tracking-wide leading-none relative inline-block"
        style={{
          fontSize: `${normalFontSize}px`,
        }}
      >
        <span
          className="inline-block transition-all duration-500 ease-in-out"
          style={{
            opacity: collapsed ? 0 : 1,
            transform: collapsed ? "scale(0.8) translateX(-15px)" : "scale(1) translateX(0)",
            pointerEvents: collapsed ? "none" : "auto",
            maxWidth: collapsed ? "0px" : "300px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "bottom",
          }}
        >
          <span className="dyn-logo-letter-t inline-block">
            T
          </span>
          {!iconOnly && (
            <span className={hideWordmarkMobile ? "hidden sm:inline" : ""}>
              ypamine
            </span>
          )}
        </span>

        {/* Quadratino "chimico" proporzionale con aura neon (unito alla parola o collassato al centro) */}
        {squareIsButton ? (
          <button
            type="button"
            onClick={squareButtonAction}
            className={`absolute transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 active:scale-95 dyn-bg dyn-text ${squareColorClasses} ${glowClasses}`}
            style={{
              ...squareDynStyle,
              left: "100%",
              bottom: collapsed ? "50%" : "0.15em",
              width: collapsed ? "28px" : "0.4em",
              height: collapsed ? "28px" : "0.4em",
              transform: collapsed
                ? "translate(-50%, 50%) rotate(360deg)"
                : "translate(0.1em, 0) rotate(0deg)",
              borderRadius: collapsed ? "6px" : "2px",
            }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        ) : (
          <div
            className={`absolute transition-all duration-500 ease-in-out dyn-bg dyn-text ${squareColorClasses} ${glowClasses}`}
            style={{
              ...squareDynStyle,
              left: "100%",
              bottom: collapsed ? "50%" : "0.15em",
              width: collapsed ? "28px" : "0.4em",
              height: collapsed ? "28px" : "0.4em",
              transform: collapsed
                ? "translate(-50%, 50%) rotate(360deg)"
                : "translate(0.1em, 0) rotate(0deg)",
              borderRadius: collapsed ? "6px" : "2px",
            }}
          />
        )}
      </span>
    </div>
  );
};

export default DynamicLogo;