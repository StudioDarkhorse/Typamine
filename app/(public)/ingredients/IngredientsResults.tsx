import { getIngredientsPage, IngredientSort } from "@/lib/services/font";
import { IngredientCard } from "@/components/font/IngredientCard";
import { IngredientRow } from "@/components/font/IngredientRow";
import { ListPagination } from "@/components/common/ListHandlers";
import type { ViewMode } from "@/lib/constants/viewMode";
import { ViewModeToggle } from "@/components/common/ViewModeToggle";

interface IngredientsResultsProps {
  page: number;
  category: string;
  rating: string;
  tagIds: string[];
  search: string;
  sort: IngredientSort;
  perPage: number;
  view: ViewMode;
}

// Server Component isolato dentro il proprio Suspense boundary: solo questa
// parte deve "lampeggiare" con lo skeleton quando cambi pagina o filtro —
// header e CTA vivono fuori e non devono mai smontarsi/rimontarsi.
export default async function IngredientsResults({
  page,
  category,
  rating,
  tagIds,
  search,
  sort,
  perPage,
  view,
}: IngredientsResultsProps) {
  const { items, total } = await getIngredientsPage({ page, perPage, category, rating, tagIds, search, sort });

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
          {`TOTAL INGREDIENTS: ${total}`}
        </p>
        <div className="lg:hidden">
          <ViewModeToggle />
        </div>
      </div>

      {view === "row" ? (
        // Vista riga: sempre a colonna singola, ogni riga occupa l'intera
        // larghezza della griglia (font size più grande, vedi IngredientRow).
        <div className="flex flex-col gap-4 relative z-0">
          {items.map((item, idx) => (
            <IngredientRow key={item.id} font={item} idx={(page - 1) * perPage + idx} fontSize={64} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
          {items.map((item, idx) => (
            <IngredientCard key={item.id} font={item} idx={(page - 1) * perPage + idx} fontSize={24} />
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-lg text-ocragray-800 dark:text-zinc-200 font-haas">
          NO COMPOUNDS FOUND FOR THIS CLASSIFICATION
        </div>
      )}

      {total > 0 && (
        <ListPagination totalCount={total} entityNamePlural="Ingredients" defaultPerPage={perPage} />
      )}
    </>
  );
}
