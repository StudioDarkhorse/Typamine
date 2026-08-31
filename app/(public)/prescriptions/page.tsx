import { Suspense } from "react";
import PrescriptionsClient from "./PrescriptionsClient";
import PrescriptionsResults from "./PrescriptionsResults";
import { PrescriptionCardSkeleton } from "@/components/pairing/skeletons/PrescriptionCardSkeleton";
import { getTags } from "@/lib/services/tag";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PairingSort } from "@/lib/services/pairing";

export const dynamic = "force-dynamic";

const PER_PAGE = 12;

export const metadata: Metadata = buildMetadata({
  path: "/prescriptions",
  title: "Font Pairings: Expert Typeface Combinations",
  description:
    "Font pairing ideas that actually work: heading and body typeface combinations with live previews, the reasoning behind each match, and links to download both fonts.",
  keywords: [
    "font pairings",
    "font combinations",
    "google font pairings",
    "heading and body fonts",
    "typeface pairing",
    "typography combinations",
    "what font goes with",
  ],
});

interface PrescriptionsPageProps {
  searchParams: Promise<{
    page?: string;
    tags?: string;
    search?: string;
    sort?: string;
    font?: string;
  }>;
}

function ResultsSkeleton() {
  return (
    <>
      <div className="h-3 w-44 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
        {Array.from({ length: PER_PAGE }).map((_, idx) => (
          <PrescriptionCardSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}

export default async function PrescriptionsPage({ searchParams }: PrescriptionsPageProps) {
  const resolved = await searchParams;
  const page = parseInt(resolved.page || "1", 10);
  const tagNames = (resolved.tags || "").split(",").filter(Boolean);
  const search = resolved.search || "";
  const sort = (resolved.sort || "recent") as PairingSort;
  const fontName = resolved.font || "";

  const tags = await getTags();
  // L'URL usa il nome del tag (human-readable) — conversione a id qui,
  // senza query aggiuntiva dato che `tags` è già caricato sopra.
  const tagIds = tags.filter((t) => tagNames.includes(t.name)).map((t) => t.id);

  return (
    <PrescriptionsClient tags={tags}>
      <Suspense key={`${page}-${tagIds.join(",")}-${search}-${sort}-${fontName}`} fallback={<ResultsSkeleton />}>
        <PrescriptionsResults page={page} perPage={PER_PAGE} tagIds={tagIds} search={search} sort={sort} fontName={fontName} />
      </Suspense>
    </PrescriptionsClient>
  );
}
