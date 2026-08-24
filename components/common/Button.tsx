import React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline"
  | "ghost"
  | "glass"
  | "metallic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  shadowed?: boolean;
  fullWidth?: boolean;
  roundness?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  /**
   * Solo per variant="metallic": colore del bordo in hover (e del focus ring),
   * espresso con le utility `ring-*` di Tailwind. Accetta più classi e i
   * variant, es. `"ring-blue-300 dark:ring-red-100"`.
   * Default se omessa: il rosso del brand.
   */
  ringColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  shadowed = false,
  fullWidth = false,
  roundness = "md",
  isLoading = false,
  ringColor,
  disabled,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-haas font-semibold uppercase tracking-wide text-black/80" +
    "border transition-all duration-200 outline-none select-none " +
    // focus-visible invece di focus: il ring appare solo da tastiera, non ad ogni click del mouse
    "focus-visible:ring-2 focus-visible:ring-offset-2 " +
    // micro-feedback tattile alla pressione
    "active:scale-[0.98] " +
    // stato disabled esplicito: prima non esisteva alcuna classe dedicata
    "disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 disabled:shadow-none";

  // Scala taglie coerente: prima "lg" (text-sm) era più piccola di quanto suggerisse il nome,
  // e "md" non aveva una text-size esplicita. Aggiunta anche min-h per il target touch (>=36px).
  const sizes = {
    sm: "px-3 py-1.5 text-xs min-h-[36px]",
    md: "px-4 py-2.5 text-sm min-h-[42px]",
    lg: "px-6 py-3 text-base min-h-[48px]",
  };

  const variants: Record<ButtonVariant, string> = {
    // PRIMARY — Chemical Red (brand). Testo nero: su red-500 dà ~5.7:1 di contrasto
    // contro il ~3.7:1 del bianco (che fallisce l'AA 4.5:1 per testo normale).
    // Stesso hue in light e dark mode (prima "primary" era blu in light e rosso in dark:
    // stesso ruolo, colore diverso = incoerenza). Hover più chiaro + glow richiamano
    // l'estetica "hazard" già presente nel tema (vedi utility glow-red in globals.css).
    primary:
      "bg-red-500 text-black border-redgray-800 hover:bg-red-400 hover:glow-red " +
      "dark:border-redgray-400 dark:hover:bg-red-400" +
      "focus-visible:ring-red-500 ring-offset-white dark:ring-offset-black",

    // SECONDARY — Chemical Cyan. Anche qui testo nero: sul cyan-500 il bianco crolla
    // a ~2:1 di contrasto (fallisce clamorosamente), il nero sale a ~10.7:1.
    // Stesso trattamento "hazard" del primary, in tonalità cyan, per restare coerente
    // ma visivamente distinto.
    secondary:
      "bg-blue-500 text-black border-bluegray-800 hover:bg-blue-300 hover:glow-cyan " +
      "dark:border-bluegray-200 dark:hover:bg-blue-400 " +
      "focus-visible:ring-blue-600 ring-offset-white dark:ring-offset-black",

    // DANGER — la palette non offre un rosso "diverso" dal brand: è lo stesso #ff3131.
    // Per non far coincidere un'azione distruttiva con l'azione primaria del brand,
    // uso una shade più cupa (red-700/600) senza glow: testo bianco a ~6.6:1 (light)
    // / ~4.9:1 (dark), entrambi AA. Il risultato è deliberatamente più "serio",
    // opposto all'energia del primary.
    danger:
      "bg-red-700 text-white border-red-800 hover:bg-red-800 " +
      "dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-900 " +
      "focus-visible:ring-red-600 ring-offset-white dark:ring-offset-black",

    // SUCCESS — il verde del tema non era ancora usato in nessuna variante.
    success:
      "bg-green text-black border-black hover:brightness-110 " +
      "dark:border-white " +
      "focus-visible:ring-green ring-offset-white dark:ring-offset-black",

    // OUTLINE — scala neutra "stone" del tema (prima usava "zinc", assente dalla palette).
    outline:
      "bg-transparent border-black backdrop-blur-md dark:border-red-200 dark:hover:border-red-400  " +
      "text-black dark:text-red-200 dark:hover:text-red-400 hover:bg-ocragray-200 dark:hover:bg-ocragray-800 " +
      "focus-visible:ring-stone-500 ring-offset-white dark:ring-offset-black",

    // GHOST — stessa scala neutra, ancora più leggero.
    ghost:
      "bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900 " +
      "dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white " +
      "focus-visible:ring-stone-400 ring-offset-white dark:ring-offset-black",

    // GLASS — per overlay su immagini/gradienti.
    glass:
      "bg-white/10 backdrop-blur-md backdrop-saturate-150 border-white/20 text-white hover:bg-white/20 " +
      "dark:bg-black/20 dark:border-white/10 dark:hover:bg-black/30 " +
      "focus-visible:ring-white/60 ring-offset-transparent",

    // METALLIC — ghiera + piastra in metallo "spun". A differenza delle altre
    // varianti non è un fondo piatto: il gradiente conico e le ombre stanno in
    // globals.css (.metallic-bezel / .metallic-plate) perché servono più layer
    // di background di quanti ne esprima comodamente una utility Tailwind.
    // Qui il <button> è solo la ghiera: padding, testo e min-height vivono
    // sulla piastra interna, e il bordo da 2px sta fra le due (border-0 toglie
    // quello perimetrale che arriva da `base`).
    // Nessun ring-color fisso qui: --metallic-ring legge --tw-ring-color, così
    // le `ring-*` passate via `ringColor` colorano bordo in hover e focus ring
    // insieme. Senza, resta il default rosso brand definito in .metallic-bezel.
    metallic: "metallic-bezel border-0 ring-offset-white dark:ring-offset-black duration-700",
  };

  const roundnessStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const shadowClass = shadowed ? "shadow-md hover:shadow-lg" : "";

  // Il metallico è sempre a pillola: ghiera e piastra devono restare
  // concentriche, e con raggi squadrati lo stacco fra le due si legge male.
  // Per questo `roundness` non si applica a questa variante.
  const isMetallic = variant === "metallic";

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
      {children}
    </>
  );

  return (
    <button
      className={`${base} ${isMetallic ? "" : sizes[size]} ${variants[variant]} ${
        isMetallic ? "rounded-full" : roundnessStyles[roundness]
      } ${isMetallic && ringColor ? ringColor : ""} ${shadowClass} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isMetallic ? (
        <span
          className={`metallic-plate inline-flex w-full items-center justify-center gap-2 rounded-full ${sizes[size]}`}
        >
          {content}
        </span>
      ) : (
        content
      )}
    </button>
  );
};
