import { getPostsPage, PostSort } from "@/lib/services/post";
import { FeaturedPostCard } from "@/components/post/FeaturedPostCard";
import { ListPagination } from "@/components/common/ListHandlers";

interface ArchivePostsResultsProps {
  page: number;
  perPage: number;
  tagIds: string[];
  search: string;
  sort: PostSort;
}

// Server Component isolato nel proprio Suspense boundary (vedi
// app/(public)/archive/page.tsx) — stesso pattern di PrescriptionsResults:
// solo questa parte "lampeggia" con lo skeleton quando cambi pagina/filtro,
// hero e barra di ricerca (in ArchiveClient) restano stabili.
export default async function ArchivePostsResults({ page, perPage, tagIds, search, sort }: ArchivePostsResultsProps) {
  const { items: posts, total } = await getPostsPage({ postType: "ARCHIVE", page, perPage, publishedOnly: true, tagIds, search, sort });

  const hasActiveFilters = tagIds.length > 0 || !!search;

  return (
    <div className="space-y-8">
       <p className="text-sm font-x-typewriter uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
        {`${total} CASE FILE${total === 1 ? "" : "S"} IN THE ARCHIVE`}
      </p>

      {posts.length > 0 && (
        <div className="flex flex-col gap-8 mb-16">
          {posts.map((post) => (
            <FeaturedPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-ocragray-800 dark:text-zinc-200 mb-16">
          <p className="font-x-typewriter font-bold text-2xl text-black dark:text-white mb-2">The archive is silent</p>
          <p className="text-sm">
            {hasActiveFilters ? "No case files match this search." : "No dispatches have been filed yet."}
          </p>
        </div>
      )}

      {total > 0 && (
        <ListPagination totalCount={total} entityNamePlural="Case Files" defaultPerPage={perPage} />
      )}
    </div>
  );
}
