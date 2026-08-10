"use client"

import React from "react";
import { DoubleHero } from "@/components/common/DoubleHero";
import { SearchSortFilter } from "@/components/common/SearchSortFilter";
import { useThemeStore } from "@/store/themeStore";
import { useListScrollRestoration } from "@/lib/hooks/useListScrollRestoration";

const SORT_OPTIONS = [
  { label: "NEWEST FIRST", value: "recent" },
  { label: "TITLE (A-Z)", value: "name_asc" },
  { label: "TITLE (Z-A)", value: "name_desc" },
];

interface ArchiveClientProps {
  tags: { id: string; name: string }[];
  children: React.ReactNode;
}

// Shell statico: hero e barra di ricerca/filtri vivono qui e non dipendono
// dal fetch, quindi non smontano/rimontano mai (niente "flash") quando cambi
// pagina — solo `children` (i risultati) è dentro un Suspense boundary,
// stesso pattern di PrescriptionsClient.
export default function ArchiveClient({ tags, children }: ArchiveClientProps) {
  const { theme } = useThemeStore();
  useListScrollRestoration();
  const dynamicArchiveBgImageUrl = theme === "dark" ? "/images/archive/double-hero/hero-bg-dark.png" : "/images/archive/double-hero/hero-bg-light.png";

  return (
    <DoubleHero bgImage={dynamicArchiveBgImageUrl} fullWidth>
      <DoubleHero.FirstViewport className="pt-24 pb-12 px-6 md:px-12 flex flex-col justify-end">
        <div className="max-w-3xl flex flex-col space-y-4 text-center items-center mx-auto">
          <h1 className="font-haas text-2xl md:text-5xl font-bold tracking-tight text-foreground text-glow-blue dark:text-glow-red">
            <span className="text-blue-800 dark:text-red-400 font-rollover">The Typography&apos;s Wayback Machine</span>
          </h1>

          <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-base max-w-xl leading-relaxed">
            Browse a vast catalog of fonts, find expert pairings, generate custom assets on the fly, and read our latest typographic prescriptions. Built for modern creators and developers.
          </p>
        </div>
      </DoubleHero.FirstViewport>

      <DoubleHero.SecondViewport>
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SearchSortFilter
            searchPlaceholder="Search the Archive articles by title, caption or description..."
            sortOptions={SORT_OPTIONS}
            tags={tags}
            filtersModalTitle="Filter by Tags"
          />

          {children}
        </div>
      </DoubleHero.SecondViewport>
    </DoubleHero>
  );
}
