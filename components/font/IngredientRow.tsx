"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Ingredient } from "@/types";
import { FontFaceInjector } from "@/components/common/LivePreview";
import { getPublicCreatorLabel } from "@/components/font/IngredientCard";

import { NON_REAL_FONT_AUTHOR_SLUGS } from "@/lib/constants/placeholderFontAuthors";

interface FontRowProps {
  font: Ingredient;
  idx: number;
  linklabel?: string;
  fontSize?: number;
  className?: string;
}

const MIN_SIZE = 24;
const MAX_SIZE = 140;

// Vista "riga" alternativa a IngredientCard — stesso pattern del list view di
// Fontshare (nome + meta in alto, preview grande sull'intera larghezza,
// autore + CTA in basso) invece della card a griglia con lo "chemical
// element" box. Sempre a larghezza piena (vedi IngredientsResults: usa
// `grid-cols-1` invece della griglia multi-colonna quando questa vista è attiva).
//
// In hover mostra un range per ingrandire/rimpicciolire la preview al volo.
// Il testo è renderizzato qui direttamente (niente <LivePreview>, che tiene
// il proprio size in uno state interno separato) — passare la dimensione come
// prop e farla risincronizzare nel figlio ad ogni tick di drag introduceva un
// giro in più che rendeva il trascinamento a scatti. Un solo state, un solo
// componente che lo legge: stesso meccanismo (fluido) dello slider interno di
// LivePreview per sé stesso.
//
// Lo slider vive FUORI dal <Link> (sibling assoluto sopra, non figlio) invece
// che dentro: qualunque cosa annidata in un <a> finisce per contare come click
// sulla card prima o poi (drag-release, bubbling, o comportamento del router
// di questo fork Next.js) — tenerlo strutturalmente fuori dall'anchor è l'unica
// garanzia solida, indipendente da come Link intercetta i click internamente.
export const IngredientRow: React.FC<FontRowProps> = ({ font, idx, linklabel = "Test Now", fontSize, className = "" }) => {
  const [size, setSize] = useState(fontSize || 64);
  const variantsCount = font.variants?.length || 0;

  const fontUrl = font.variants?.[0]?.woff2Url;
  const fontFamilyName = font.variants?.[0]?.fontFamilyName || font.name;
  // Family name stabile per riga (basata sull'id, non sulla size) — l'iniezione
  // del @font-face non deve mai ripetersi mentre trascini lo slider.
  const dynamicFamily = `Row_${font.id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const isRealAuthor = font.author && !NON_REAL_FONT_AUTHOR_SLUGS.includes(font.author.slug);

  return (
    <div className={"group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 group-hover:border-zinc-400 dark:group-hover:border-zinc-700 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900/40 transition-all p-4 sm:p-6 block " + className}>
      {/* Invisible link covering the entire row container */}
      <Link
        href={"/ingredients/" + font.slug}
        className="absolute inset-0 z-10"
      />

      {/* Header: nome + meta (varianti, licenza) */}
      <div className="flex items-center justify-between gap-4 font-haas relative z-20 pointer-events-none">
        <h3 className="font-bold text-sm text-foreground truncate">{font.name.replaceAll("_", " ")}</h3>
        <div className="flex items-center gap-4 shrink-0 text-xs font-x-typewriter font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
          <span>
            {variantsCount} style{variantsCount === 1 ? "" : "s"}
          </span>
          <span>&bull;</span>
          <span className="hidden sm:inline text-ocra-600 dark:text-ocra-300">{font.licenseType || "UNKNOWN"}</span>
        </div>
      </div>

      {/* Preview grande, sempre a larghezza piena della riga — stesso chrome
          (bordo, shadow-2xl, scanlines, altezza fissa) del box non-compact
          di LivePreview, replicato qui invece di usare il componente per
          tenere il font-size a singolo hop (vedi commento sopra). */}
      <div className="relative my-4 rounded-md border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black shadow-2xl overflow-hidden flex items-center justify-center p-8 h-[260px] z-20 pointer-events-none">
        {fontUrl && <FontFaceInjector fontFamily={dynamicFamily} url={fontUrl} />}

        {/* Scanlines, stesso effetto di LivePreview in modalità non-compact */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 6px, currentColor 6px, currentColor 7px)",
            backgroundAttachment: "fixed",
          }}
        />

        <p
          className="relative z-10 text-center text-black dark:text-white whitespace-pre-wrap leading-tight"
          style={{
            fontFamily: fontUrl ? `'${dynamicFamily}', sans-serif` : `'${fontFamilyName}', sans-serif`,
            fontSize: `${size}px`,
          }}
        >
          {font.name.replaceAll("_", " ")}
        </p>
      </div>

      {/* Footer: autore + CTA */}
      <div className="pt-3 flex justify-between items-end border-t border-zinc-400/50 font-haas relative z-20 pointer-events-none">
        <span className="text-xs text-ocragray-800 dark:text-zinc-200 mb-1">
          <span className="hidden md:inline">DESIGNED </span>BY{" "}
          {isRealAuthor ? (
            <Link
              href={"/author/" + font.author!.slug}
              className="text-foreground font-bold underline relative z-30 pointer-events-auto"
            >
              {getPublicCreatorLabel(font)}
            </Link>
          ) : (
            <span className="text-foreground font-bold">{getPublicCreatorLabel(font)}</span>
          )}
        </span>
        <span className="flex flex-row items-center gap-2 text-md font-x-typewriter text-red hover:underline transition-colors pointer-events-none">
          {linklabel}
          <MoveRight size={12} className="icon-altalenante" />
        </span>
      </div>


      {/* Range dimensione — sibling assoluto sopra il Link, non un suo
          discendente: nascosto finché non passi sopra la riga, e mai
          interpretabile como un click sulla card qualunque cosa tu ci faccia. */}
      {/* Range dimensione — visibile SOLO su desktop con supporto hover reale */}
      <div className="hidden [@media(hover:hover)]:flex absolute left-1/2 -translate-x-1/2 bottom-3 justify-center opacity-0 translate-y-1 pointer-events-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:pointer-events-auto transition-all duration-200 z-30">
        <div className="flex items-center gap-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-full px-3.5 py-1.5 shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">Size</span>
          <input
            type="range"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-32 sm:w-44 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue dark:accent-red"
          />
          <span className="text-[10px] font-bold text-black dark:text-white w-8 text-right tabular-nums">{size}px</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientRow;
