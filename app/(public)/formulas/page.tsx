import { Suspense } from "react";
import FormulasClient from "./FormulasClient";
import FormulasResults from "./FormulasResults";
import { FormulaCardSkeleton } from "@/components/collection/skeletons/FormulaCardSkeleton";
import { FormulaSort } from "@/lib/services/formula";
import { getTags } from "@/lib/services/tag";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const PER_PAGE = 12;

export const metadata: Metadata = buildMetadata({
  path: "/formulas",
  title: "Font Collections: Curated Typeface Sets by Style",
  description:
    "Curated font collections grouped by style, mood and use case — brutalist, editorial, retro, technical. Compare the typefaces in each set and preview them side by side.",
  keywords: [
    "font collections",
    "curated fonts",
    "font sets",
    "fonts by style",
    "editorial fonts",
    "display font collection",
    "best fonts for branding",
  ],
});

interface FormulasPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    search?: string;
    category?: string;
    tags?: string;
    curated?: string;
  }>;
}

function ResultsSkeleton() {
  return (
    <>
      <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
        {Array.from({ length: PER_PAGE }).map((_, idx) => (
          <FormulaCardSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}

export default async function FormulasPage({ searchParams }: FormulasPageProps) {
  const resolved = await searchParams;
  const page = parseInt(resolved.page || "1", 10);
  const sort = (resolved.sort || "recent") as FormulaSort;
  const search = resolved.search || "";
  const category = resolved.category || "ALL";
  const tagNames = (resolved.tags || "").split(",").filter(Boolean);
  const curatedOnly = resolved.curated === "true";

  const tags = await getTags();
  // L'URL usa il nome del tag (human-readable) — conversione a id qui,
  // senza query aggiuntiva dato che `tags` è già caricato sopra.
  const tagIds = tags.filter((t) => tagNames.includes(t.name)).map((t) => t.id);

  return (
    <FormulasClient tags={tags}>
      <Suspense key={`${page}-${sort}-${search}-${category}-${tagIds.join(",")}-${curatedOnly}`} fallback={<ResultsSkeleton />}>
        <FormulasResults
          page={page}
          perPage={PER_PAGE}
          sort={sort}
          search={search}
          category={category}
          tagIds={tagIds}
          curatedOnly={curatedOnly}
        />
      </Suspense>
    </FormulasClient>
  );
}
