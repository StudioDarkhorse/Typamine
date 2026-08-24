import Link from "next/link";
import { X } from "lucide-react";
import { getPairingsPage, PairingSort } from "@/lib/services/pairing";
import RAW_PAIRINGS from "@/lib/sample-data/pairings.json";
import ALL_INGREDIENTS from "@/lib/sample-data/fonts.json";
import { Prescription, Ingredient } from "@/types";
import { PrescriptionCard } from "@/components/pairing/PrescriptionCard";
import { ListPagination } from "@/components/common/ListHandlers";

const FALLBACK_PAIRINGS: Prescription[] = RAW_PAIRINGS.map((raw) => ({
  ...raw,
  published: true,
  primaryFontId: raw.fonts[0] || "",
  secondaryFontId: raw.fonts[1] || "",
  tags: raw.tags.map((t, idx) => ({ id: `tag-${idx}`, name: t })),
  fonts: raw.fonts.map((slug) => ALL_INGREDIENTS.find((f) => f.slug === slug) as Ingredient).filter(Boolean),
}));

interface PrescriptionsResultsProps {
  page: number;
  perPage: number;
  tagIds: string[];
  search: string;
  sort: PairingSort;
  fontName: string;
}

// Server Component isolato dentro il proprio Suspense boundary — solo questa
// parte "lampeggia" con lo skeleton quando cambi pagina; header e CTA vivono
// fuori (in PrescriptionsClient) e restano stabili.
export default async function PrescriptionsResults({ page, perPage, tagIds, search, sort, fontName }: PrescriptionsResultsProps) {
  const { items, total } = await getPairingsPage({ page, perPage, publishedOnly: true, tagIds, search, sort, fontName });

  // Il fallback ai dati di esempio serve solo per un DB genuinamente vuoto —
  // se un filtro/ricerca attivo restituisce zero risultati, quello è un esito
  // legittimo e non va mascherato con i dati di esempio.
  const hasActiveFilters = tagIds.length > 0 || !!search || !!fontName;
  const useFallback = total === 0 && !hasActiveFilters;

  const pairings = useFallback ? FALLBACK_PAIRINGS.slice((page - 1) * perPage, page * perPage) : items;
  const totalCount = useFallback ? FALLBACK_PAIRINGS.length : total;

  return (
    <>
    <p className="text-sm font-x-typewriter uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
        {`TOTAL PRESCRIPTIONS: ${totalCount}`}
      </p>

      {fontName && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-blue/10 dark:bg-red/10 border border-blue/20 dark:border-red/20">
          <p className="text-xs font-bold text-black dark:text-white">
            Showing prescriptions using <span className="text-blue dark:text-red">{fontName}</span>
          </p>
          <Link
            href="/prescriptions"
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors shrink-0"
          >
            <X className="h-3 w-3" />
            Clear
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
        {pairings.map((pair) => (
          <PrescriptionCard key={pair.id} prescription={pair} />
        ))}
      </div>

      {pairings.length === 0 && (
        <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-lg text-ocragray-800 dark:text-zinc-200 font-haas">
          NO PRESCRIPTIONS FOUND IN THIS CATALOG
        </div>
      )}

      {totalCount > 0 && (
        <ListPagination totalCount={totalCount} entityNamePlural="Prescriptions" defaultPerPage={perPage} />
      )}
    </>
  );
}
