"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "card" | "row";

interface ViewModeToggleProps {
  paramKey?: string;
  className?: string;
}

// Scrive/legge la modalità di visualizzazione (card griglia vs riga) sull'URL
// (stesso pattern di SearchSortFilter/ListPagination) — così il server
// component che fa il fetch (es. IngredientsResults) la riceve come prop
// normale senza bisogno di stato client condiviso, e resta persistente su
// reload/link condivisi. Non tocca "page": cambiare vista non deve resettare
// la paginazione.
export function ViewModeToggle({ paramKey = "view", className = "" }: ViewModeToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = (searchParams.get(paramKey) as ViewMode) || "card";

  const setView = (mode: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "card") params.delete(paramKey);
    else params.set(paramKey, mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const baseBtn =
    "h-8 w-8 flex items-center justify-center rounded-md transition-colors";
  const active = "bg-blue/20 dark:bg-red/20 text-blue dark:text-red";
  const inactive = "text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white";

  return (
    <div className={cn("flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 shrink-0", className)}>
      <button
        type="button"
        aria-label="Grid view"
        aria-pressed={current === "card"}
        onClick={() => setView("card")}
        className={cn(baseBtn, current === "card" ? active : inactive)}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Row view"
        aria-pressed={current === "row"}
        onClick={() => setView("row")}
        className={cn(baseBtn, current === "row" ? active : inactive)}
      >
        <Rows3 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default ViewModeToggle;
