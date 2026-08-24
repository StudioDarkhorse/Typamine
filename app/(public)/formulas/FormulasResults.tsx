import { getAllFormulas, FormulaSort } from "@/lib/services/formula";
import { getVirtualFormulas } from "@/lib/services/virtualFormula";
import { FormulaCard } from "@/components/collection/FormulaCard";
import { ListPagination } from "@/components/common/ListHandlers";
import { Formula } from "@/types";

interface FormulasResultsProps {
  page: number;
  perPage: number;
  sort: FormulaSort;
  search: string;
  category: string;
  tagIds: string[];
  curatedOnly: boolean;
}

// Server Component isolato dentro il proprio Suspense boundary — solo questa
// parte "lampeggia" con lo skeleton quando cambi pagina/ordinamento/filtro;
// header, toolbar e CTA vivono fuori (in FormulasClient) e restano stabili.
export default async function FormulasResults({ page, perPage, sort, search, category, tagIds, curatedOnly }: FormulasResultsProps) {
  // Le formule programmatiche non sono righe nel DB, quindi non si possono
  // paginare/ordinare a livello di query: combiniamo tutto e lavoriamo in
  // memoria. Il volume atteso (curate + generate) resta gestibile.
  const [realFormulas, virtualFormulas] = await Promise.all([
    getAllFormulas(),
    curatedOnly ? Promise.resolve([]) : getVirtualFormulas(),
  ]);

  let items: { formula: Formula; isCurated: boolean }[] = [
    ...realFormulas.map((formula) => ({ formula, isCurated: true })),
    ...virtualFormulas.map((formula) => ({ formula, isCurated: false })),
  ];

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      ({ formula }) =>
        formula.name.toLowerCase().includes(q) ||
        (formula.description || "").toLowerCase().includes(q)
    );
  }

  if (category && category !== "ALL") {
    items = items.filter(({ formula }) => formula.fontCategory === category);
  }

  if (tagIds.length > 0) {
    items = items.filter(({ formula }) =>
      (formula.tags || []).some((t) => tagIds.includes(t.id))
    );
  }

  const bySort = (a: { formula: Formula }, b: { formula: Formula }) => {
    if (sort === "name_asc") return a.formula.name.localeCompare(b.formula.name);
    if (sort === "name_desc") return b.formula.name.localeCompare(a.formula.name);
    return new Date(b.formula.createdAt).getTime() - new Date(a.formula.createdAt).getTime();
  };

  // Le curate (da BE) vengono sempre prima, le programmatiche dopo — l'ordinamento
  // scelto si applica dentro ciascun gruppo, non li mescola tra loro.
  items = [
    ...items.filter((i) => i.isCurated).sort(bySort),
    ...items.filter((i) => !i.isCurated).sort(bySort),
  ];

  const total = items.length;
  const pageItems = items.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <p className="text-sm font-x-typewriter uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
        {`TOTAL FORMULAS: ${total}`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
        {pageItems.map(({ formula, isCurated }) => (
          <FormulaCard key={formula.id} formula={formula} isCurated={isCurated} />
        ))}
      </div>

      {pageItems.length === 0 && (
        <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-lg text-ocragray-800 dark:text-zinc-200 font-haas">
          NO FORMULAS MATCH YOUR CRITERIA
        </div>
      )}

      {total > 0 && (
        <ListPagination totalCount={total} entityNamePlural="Formulas" defaultPerPage={perPage} />
      )}
    </>
  );
}
