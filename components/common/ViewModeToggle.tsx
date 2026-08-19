"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_VIEW_MODE,
  VIEW_MODE_COOKIE,
  parseViewMode,
  type ViewMode,
} from "@/lib/constants/viewMode";

// Costanti e tipo stanno in lib/constants/viewMode.ts: un server component non
// può chiamare funzioni esportate da un modulo "use client" (diventano client
// reference). Il tipo resta ri-esportato da qui per i file che lo importavano
// già da questo path.
export type { ViewMode };

interface ViewModeToggleProps {
  paramKey?: string;
  className?: string;
}

// Scrive/legge la modalità di visualizzazione (card griglia vs riga) sull'URL
// (stesso pattern di SearchSortFilter/ListPagination) — così il server
// component che fa il fetch (es. IngredientsResults) la riceve come prop
// normale senza bisogno di stato client condiviso, e resta persistente su
// reload/link condivisi. Non tocca "page": cambiare vista non deve resettare
// la paginazione. In più la scelta finisce in un cookie, che vale per le
// visite successive quando l'URL non porta il parametro.
export function ViewModeToggle({ paramKey = "view", className = "" }: ViewModeToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Nessun parametro in URL: il toggle mostra come attiva la stessa vista che
  // il server ha usato per rendere la lista (cookie, altrimenti default). Il
  // cookie si legge dopo il mount, non durante il render: in SSR document non
  // esiste e leggerlo solo lato client darebbe markup diverso fra server e
  // idratazione.
  const [storedMode, setStoredMode] = useState<ViewMode | null>(null);

  useEffect(() => {
    const raw = document.cookie.match(new RegExp(`(?:^|; )${VIEW_MODE_COOKIE}=([^;]*)`))?.[1];
    setStoredMode(parseViewMode(raw));
  }, []);

  const current = parseViewMode(searchParams.get(paramKey)) ?? storedMode ?? DEFAULT_VIEW_MODE;

  const setView = (mode: ViewMode) => {
    // Un anno, path-wide: la preferenza di visualizzazione non è un dato
    // sensibile e non serve al server per altro (nessun httpOnly).
    document.cookie = `${VIEW_MODE_COOKIE}=${mode}; path=/; max-age=31536000; samesite=lax`;

    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const baseBtn =
    "h-8 w-8 flex items-center justify-center rounded-md transition-colors";
  const active = "bg-blue/20 dark:bg-red/20 text-blue dark:text-red";
  const inactive = "text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white";

  return (
    <div className={cn("flex items-center gap-1 border border-bluegray-200 hover:border-bluegray-400 dark:border-redgray-800 dark:border-redgray-800 rounded-lg p-1 shrink-0 dark:hover:border-redgray-600", className)}>
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
