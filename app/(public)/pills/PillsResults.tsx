import { getPostsPage, PostSort } from "@/lib/services/post";
import { FeaturedPostCard } from "@/components/post/FeaturedPostCard";
import { ListPagination } from "@/components/common/ListHandlers";

interface PillsResultsProps {
  page: number;
  perPage: number;
  tagIds: string[];
  search: string;
  sort: PostSort;
}

// Server Component isolato nel proprio Suspense boundary (vedi
// app/(public)/pills/page.tsx) — stesso pattern di ArchivePostsResults: solo
// questa parte "lampeggia" con lo skeleton quando cambi pagina/filtro, hero e
// barra di ricerca (in PillsClient) restano stabili.
export default async function PillsResults({ page, perPage, tagIds, search, sort }: PillsResultsProps) {
  const { items: posts, total } = await getPostsPage({ postType: "BLOG", page, perPage, publishedOnly: true, tagIds, search, sort });

  const hasActiveFilters = tagIds.length > 0 || !!search;

  return (
    <div className="space-y-8">
      <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
        {`${total} PILL${total === 1 ? "" : "S"} PUBLISHED`}
      </p>

      {posts.length > 0 && (
        <div className="flex flex-col gap-8 mb-16">
          {posts.map((post) => (
            <FeaturedPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-ocragray-800 dark:text-zinc-200 font-haas">
          <p className="font-rezland text-2xl text-black dark:text-white mb-2">No pills yet</p>
          <p className="text-sm">
            {hasActiveFilters ? "No posts match this search." : "No posts have been published yet."}
          </p>
        </div>
      )}

      {total > 0 && (
        <ListPagination totalCount={total} entityNamePlural="Posts" defaultPerPage={perPage} />
      )}
    </div>
  );
}
