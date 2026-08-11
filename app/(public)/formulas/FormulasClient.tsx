"use client";

import React from "react";
import Link from "next/link";
import { PageHeading } from "@/components/common/PageHeading";
import { useThemeStore } from "@/store/themeStore";
import { Cta } from "@/components/common/Cta";
import { Button } from "@/components/common/Button";
import { SearchSortFilter } from "@/components/common/SearchSortFilter";
import { useListScrollRestoration } from "@/lib/hooks/useListScrollRestoration";

const SORT_OPTIONS = [
  { label: "NEWEST FIRST", value: "recent" },
  { label: "NAME (A-Z)", value: "name_asc" },
  { label: "NAME (Z-A)", value: "name_desc" },
];

const CATEGORY_OPTIONS = [
  { label: "ALL CATEGORIES", value: "ALL" },
  { label: "MONOSPACE", value: "Monospace" },
  { label: "SANS-SERIF", value: "Sans-Serif" },
  { label: "NEO-GROTESQUE", value: "Neo-Grotesque" },
  { label: "GEOMETRIC SANS", value: "Geometric Sans" },
  { label: "SERIF", value: "Serif" },
  { label: "DECORATIVE", value: "Decorative" },
  { label: "MIXED", value: "Mixed" },
];

interface FormulasClientProps {
  tags: { id: string; name: string }[];
  children: React.ReactNode;
}

// Shell statico: header, toolbar di ricerca/ordinamento/filtri e CTA vivono
// qui e non dipendono dal fetch, quindi non smontano/rimontano mai (niente
// "flash") quando cambi pagina/ordinamento/filtro — solo `children` (i
// risultati) è dentro un Suspense boundary.
export default function FormulasClient({ tags, children }: FormulasClientProps) {
  const { theme } = useThemeStore();
  useListScrollRestoration();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 space-y-8">
      {/* Route Header */}
      <PageHeading
        title="CURATED FORMULAS // Our Collections"
        subtitle="Hand-picked bundles and programmatic collections, generated straight from our archive"
        useGrainient
        grainientOptions={{
          color1: theme === "light" ? "#fdfdfd" : "#09090b",
          color2: theme === "light" ? "#c0d3ed" : "#570d22",
          color3: theme === "light" ? "#e5e7eb" : "#27272a",
        }}
      />

      <SearchSortFilter
        searchPlaceholder="Search collections by name..."
        sortOptions={SORT_OPTIONS}
        categoryOptions={CATEGORY_OPTIONS}
        tags={tags}
        toggleOptions={[
          { paramKey: "curated", label: "Typamine Selection Only" },
        ]}
        filtersModalTitle="Filters"
        showSearch={false}
      />

      {children}

      <Cta
        title={<>Looking for <span className="text-blue-600 dark:text-red"> Inspirations?</span></>}
        subtitle="Check out our Prescriptions for expert typography pairings, or dive into our Vintage Archive to discover great examples from the past."
        align="right"
        bgImage="/images/formulas/cta-bg.png"
        useGlassmorphism
      >
        <Link href="/prescriptions" className="inline-block">
          <Button variant="secondary">VIEW PRESCRIPTIONS</Button>
        </Link>
        <Link href="/prescriptions/archive" className="inline-block">
          <Button variant="primary">THE ARCHIVE</Button>
        </Link>
      </Cta>
    </div>
  );
}
