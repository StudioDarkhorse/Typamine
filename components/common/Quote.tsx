"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Paragraph from "@/components/common/Paragraph";
import { cn } from "@/lib/utils";
import { dynamicTextStyle, dynamicBgStyle } from "@/lib/dynamicStyle";

interface QuoteProps {
  children: ReactNode;
  author?: string;
  authorDates?: string;
  authorInfo?: string;
  className?: string;
  colorClassName?: string;
  bgColorClassName?: string;
}

export default function Quote({
  children,
  author,
  authorDates,
  authorInfo,
  className,
  colorClassName = "",
  bgColorClassName = "",
}: QuoteProps) {
  // colorClassName/bgColorClassName arrivano dal color picker granulare admin
  // come stringhe Tailwind dinamiche composte da dati nel DB (testo e sfondo,
  // sfondo anche a gradiente) — Tailwind non le genera mai in build. Le
  // risolviamo noi in CSS reale via .dyn-text/.dyn-bg (vedi globals.css).
  const hasDynamicText = Boolean(colorClassName);
  const hasDynamicBg = Boolean(bgColorClassName);

  return (
    <div
      className={cn(
        // Niente padding verticale qui: la spaziatura va gestita a livello
        // superiore (wrapper del renderer), uguale per tutti i moduli — non
        // dentro il singolo componente, altrimenti Quote (prima py-24) apre/chiude
        // il blocco insight con un padding diverso dagli altri moduli a seconda
        // di quale capiti per primo/ultimo.
        "flex flex-col items-center gap-0 max-w-full mx-auto relative group transition-colors duration-500",
        className,
        hasDynamicText && "dyn-text",
        hasDynamicBg && "dyn-bg"
      )}
      style={{
        ...dynamicTextStyle(colorClassName),
        ...dynamicBgStyle(bgColorClassName),
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center w-full">
        <Image
          src="/images/icons/quotation-open.png"
          alt="Quotation open"
          width={80}
          height={80}
          className="w-24 h-24 dark:invert object-contain opacity-40 dark:invert self-start transition-transform duration-700 group-hover:translate-x-4"
        />

        <Paragraph
          as="p"
          size="3xl"
          weight="bold"
          align="center"
          className="text-current/90 leading-relaxed italic py-8 px-8"
        >
          {children}
        </Paragraph>

        <Image
          src="/images/icons/quotation-closed.png"
          alt="Quotation closed"
          width={80}
          height={80}
          className="w-24 h-24 dark:invert object-contain opacity-40 dark:invert self-end transition-transform duration-700 group-hover:-translate-x-4"
        />

        {(author || authorDates || authorInfo) && (
          <div className="mt-16 lg:mt-8 pb-8 flex flex-col items-center text-center">
            {author && (
              <p className="text-xl font-crenzo text-current">
                {author}
              </p>
            )}
            {(authorDates || authorInfo) && (
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-current/40 mt-1">
                {authorDates && <span>{authorDates}</span>}
                {authorDates && authorInfo && <span className="mx-2">&bull;</span>}
                {authorInfo && <span>{authorInfo}</span>}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
