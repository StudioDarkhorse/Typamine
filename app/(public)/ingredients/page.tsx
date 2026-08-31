import { Suspense } from "react";
import { cookies } from "next/headers";
import IngredientsClient from "./IngredientsClient";
import IngredientsResults from "./IngredientsResults";
import { IngredientCardSkeleton } from "@/components/font/skeletons/IngredientCardSkeleton";
import { IngredientRowSkeleton } from "@/components/font/skeletons/IngredientRowSkeleton";
import { getTags } from "@/lib/services/tag";
import { IngredientSort, getIngredientsCount } from "@/lib/services/font";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import {
  DEFAULT_VIEW_MODE,
  VIEW_MODE_COOKIE,
  parseViewMode,
  type ViewMode,
} from "@/lib/constants/viewMode";

const PER_PAGE = 12;

// Il conteggio reale del catalogo entra nel title: e' il numero che fa
// differenza in SERP su query tipo "free fonts". Arrotondato per difetto alla
// cinquantina cosi' non cambia (e non invalida la SERP) a ogni import.
export async function generateMetadata(): Promise<Metadata> {
  const total = await getIngredientsCount();
  const rounded = total >= 50 ? `${Math.floor(total / 50) * 50}+` : `${total}`;

  return buildMetadata({
    path: "/ingredients",
    title: `Free Fonts: Browse & Download ${rounded} Typefaces`,
    description: `Browse ${rounded} free and open-source fonts: preview every typeface live, check licence and variable axes, then download the font files or grab ready-made @font-face CSS.`,
    keywords: [
      "free fonts",
      "download fonts",
      "font library",
      "open source fonts",
      "google fonts alternative",
      "variable fonts",
      "font catalogue",
      "sans serif fonts",
      "serif fonts",
      "display fonts",
    ],
  });
}

interface IngredientsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    rating?: string;
    license?: string;
    tags?: string;
    search?: string;
    sort?: string;
    view?: string;
  }>;
}

function ResultsSkeleton({ view }: { view: ViewMode }) {
  return (
    <>
      <div className="h-3 w-40 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      {view === "row" ? (
        <div className="flex flex-col gap-4 relative z-0">
          {Array.from({ length: PER_PAGE }).map((_, idx) => (
            <IngredientRowSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
          {Array.from({ length: PER_PAGE }).map((_, idx) => (
            <IngredientCardSkeleton key={idx} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function IngredientsPage({ searchParams }: IngredientsPageProps) {
  const resolved = await searchParams;
  const page = parseInt(resolved.page || "1", 10);
  const category = resolved.category || "ALL";
  const rating = resolved.rating || "ALL";
  const license = resolved.license || "ALL";
  const tagNames = (resolved.tags || "").split(",").filter(Boolean);
  const search = resolved.search || "";
  const sort = (resolved.sort || "recent") as IngredientSort;
  // Precedenza: parametro in URL (link condiviso / scelta appena fatta) →
  // cookie della preferenza salvata → default di sistema (riga).
  const cookieStore = await cookies();
  const view: ViewMode =
    parseViewMode(resolved.view) ?? parseViewMode(cookieStore.get(VIEW_MODE_COOKIE)?.value) ?? DEFAULT_VIEW_MODE;

  const tags = await getTags();
  // L'URL usa il nome del tag (human-readable) — conversione a id qui,
  // senza query aggiuntiva dato che `tags` è già caricato sopra.
  const tagIds = tags.filter((t) => tagNames.includes(t.name)).map((t) => t.id);

  return (
    <IngredientsClient tags={tags}>
      <Suspense key={`${page}-${category}-${rating}-${license}-${tagIds.join(",")}-${search}-${sort}-${view}`} fallback={<ResultsSkeleton view={view} />}>
        <IngredientsResults
          page={page}
          category={category}
          rating={rating}
          license={license}
          tagIds={tagIds}
          search={search}
          sort={sort}
          perPage={PER_PAGE}
          view={view}
        />
      </Suspense>
    </IngredientsClient>
  );
}
