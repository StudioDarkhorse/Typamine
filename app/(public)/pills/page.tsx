import { Suspense } from "react";
import PillsClient from "@/app/(public)/pills/PillsClient";
import PillsResults from "@/app/(public)/pills/PillsResults";
import { FeaturedPostCardSkeleton } from "@/components/post/FeaturedPostCardSkeleton";
import { getTags } from "@/lib/services/tag";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PostSort } from "@/lib/services/post";

export const dynamic = "force-dynamic";

const PER_PAGE = 12;

export const metadata: Metadata = buildMetadata({
  path: "/pills",
  title: "Typography Blog: Font Guides, Tips & Type Design",
  description:
    "Articles and guides on typography: how to choose and pair fonts, web font performance, licensing, variable fonts and the craft behind type design.",
  keywords: [
    "typography blog",
    "font guides",
    "typography tips",
    "type design articles",
    "how to choose fonts",
    "web typography",
    "font licensing",
  ],
});

interface PillsPageProps {
  searchParams: Promise<{
    page?: string;
    tags?: string;
    search?: string;
    sort?: string;
  }>;
}

function ResultsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-3 w-40 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="flex flex-col gap-6">
        {Array.from({ length: PER_PAGE }).map((_, idx) => (
          <FeaturedPostCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default async function PillsPage({ searchParams }: PillsPageProps) {
  const resolved = await searchParams;
  const page = parseInt(resolved.page || "1", 10);
  const tagNames = (resolved.tags || "").split(",").filter(Boolean);
  const search = resolved.search || "";
  const sort = (resolved.sort || "recent") as PostSort;

  const tags = await getTags();
  // L'URL usa il nome del tag (human-readable, es. ?tags=Serif invece di un
  // uuid) — qui lo convertiamo negli id richiesti dal filtro Prisma, senza
  // una query aggiuntiva dato che `tags` è già stato caricato sopra.
  const tagIds = tags.filter((t) => tagNames.includes(t.name)).map((t) => t.id);

  return (
    <PillsClient tags={tags}>
      <Suspense key={`${page}-${tagIds.join(",")}-${search}-${sort}`} fallback={<ResultsSkeleton />}>
        <PillsResults page={page} perPage={PER_PAGE} tagIds={tagIds} search={search} sort={sort} />
      </Suspense>
    </PillsClient>
  );
}
