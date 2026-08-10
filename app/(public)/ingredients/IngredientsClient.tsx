"use client";

import React from "react";
import Link from "next/link";
import { PageHeading } from "@/components/common/PageHeading";
import { useThemeStore } from "@/store/themeStore";
import { Cta } from "@/components/common/Cta";
import { Button } from "@/components/common/Button";
import { SearchSortFilter } from "@/components/common/SearchSortFilter";
import { ViewModeToggle } from "@/components/common/ViewModeToggle";
import { useListScrollRestoration } from "@/lib/hooks/useListScrollRestoration";

const CATEGORY_OPTIONS = [
  { label: "ALL FONT CATEGORIES", value: "ALL" },
  { label: "MONOSPACE", value: "Monospace" },
  { label: "SANS-SERIF", value: "Sans-Serif" },
  { label: "NEO-GROTESQUE", value: "Neo-Grotesque" },
  { label: "GEOMETRIC SANS", value: "Geometric Sans" },
  { label: "SERIF", value: "Serif" },
  { label: "DECORATIVE", value: "Decorative" },
];

const RATING_OPTIONS = [
  { label: "ANY RATING", value: "ALL" },
  { label: "9+ EXCEPTIONAL", value: "9.0" },
  { label: "8+ EXCELLENT", value: "8.0" },
  { label: "7+ GOOD", value: "7.0" },
  { label: "6+ DECENT", value: "6.0" },
];

const SORT_OPTIONS = [
  { label: "NEWEST FIRST", value: "recent" },
  { label: "NAME (A-Z)", value: "name_asc" },
  { label: "NAME (Z-A)", value: "name_desc" },
  { label: "TOP RATED", value: "rating_desc" },
];

interface IngredientsClientProps {
  tags: { id: string; name: string }[];
  children: React.ReactNode;
}

// Shell statico: header, toolbar di ricerca/filtri e CTA vivono qui e non
// dipendono dal fetch, quindi non smontano/rimontano mai (niente "flash")
// quando cambi pagina o filtro — solo `children` (i risultati) è dentro un
// Suspense boundary.
export default function IngredientsClient({ tags, children }: IngredientsClientProps) {
  const { theme } = useThemeStore();
  useListScrollRestoration();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 space-y-8">
      {/* Route Header */}
      <PageHeading
        title="INGREDIENTS ARCHIVE // All Our Fonts"
        subtitle="Browse the full typographic catalogue"
        useGrainient
        grainientOptions={{
          color1: theme === "light" ? "#fdfdfd" : "#09090b",
          color2: theme === "light" ? "#c0d3ed" : "#570d22",
          color3: theme === "light" ? "#e5e7eb" : "#27272a",
        }}
      />

      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <SearchSortFilter
            searchPlaceholder="Search fonts by name..."
            sortOptions={SORT_OPTIONS}
            categoryOptions={CATEGORY_OPTIONS}
            ratingOptions={RATING_OPTIONS}
            tags={tags}
            filtersModalTitle="Filters"
          />
        </div>
        <ViewModeToggle />
      </div>

      {children}

      <Cta
        title={<>Need help finding <br /> <span className="text-blue dark:text-red font-rezland px-2">what you&apos;re looking for?</span></>}
        subtitle="Explore our Curated Collections to find the perfect typographic bundles ready to be used in your next project."
        align="left"
        useGrainient
        useGlassmorphism
        grainientOptions={{
          color1: theme === "light" ? "#c1dada" : "#7c1111",
          color2: theme === "light" ? "#62737c" : "#380b36",
          color3: theme === "light" ? "#f1dce9" : "#693257",
          timeSpeed: 0.2,
          grainScale: 10,
        }}
      >
        <Link href="/formulas" className="inline-block">
          <Button variant="primary">EXPLORE COLLECTIONS</Button>
        </Link>
      </Cta>
    </div>
  );
}
