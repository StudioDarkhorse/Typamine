"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { PageHeading } from "@/components/common/PageHeading";
import { Cta } from "@/components/common/Cta";
import { useThemeStore } from "@/store/themeStore";
import { SearchSortFilter } from "@/components/common/SearchSortFilter";
import { useListScrollRestoration } from "@/lib/hooks/useListScrollRestoration";

const SORT_OPTIONS = [
  { label: "NEWEST FIRST", value: "recent" },
  { label: "NAME (A-Z)", value: "name_asc" },
  { label: "NAME (Z-A)", value: "name_desc" },
];

interface PrescriptionsClientProps {
  tags: { id: string; name: string }[];
  children: React.ReactNode;
}

// Shell statico: header, toolbar di ricerca/filtri e CTA vivono qui e non
// dipendono dal fetch, quindi non smontano/rimontano mai (niente "flash")
// quando cambi pagina — solo `children` (i risultati) è dentro un Suspense
// boundary.
export default function PrescriptionsClient({ tags, children }: PrescriptionsClientProps) {
  const { theme } = useThemeStore();
  useListScrollRestoration();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 space-y-8">
      {/* Route Header */}
      <PageHeading
        title="PRESCRIPTIONS // Font Pairing Examples"
        subtitle="Curated pairings for your next project"
        useGrainient
        grainientOptions={{
          color1: theme === "light" ? "#fdfdfd" : "#09090b",
          color2: theme === "light" ? "#c0d3ed" : "#570d22",
          color3: theme === "light" ? "#e5e7eb" : "#27272a",
        }}
      />

      <SearchSortFilter
        searchPlaceholder="Search pairings by name..."
        sortOptions={SORT_OPTIONS}
        tags={tags}
        filtersModalTitle="Filter by Tags"
        showSearch={false}
      />

      {children}

      <Cta
        title={<>The <span className="text-blue-600 dark:text-red ">Vintage</span> Archive</>}
        subtitle="Explore our curated collection of vintage posters, spanning from Soviet propaganda and 1950s sci-fi to Bauhaus, Futurism, and Art Deco."
        align="center"
        bgImage="/images/prescriptions/cta-bg.png"
        useGlassmorphism
      >
        <Link href="/archive" className="inline-block">
          <Button variant="primary">Explore the Archive</Button>
        </Link>
      </Cta>
    </div>
  );
}
