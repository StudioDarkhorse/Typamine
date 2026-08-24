"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { Input } from "@/components/common/Input";

export interface ListHeaderHandlersProps {
  isSelectionMode: boolean;
  onToggleSelectionMode: () => void;
  selectedCount: number;
  canMassAction?: boolean;
  massActions?: {
    label: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    onClick: () => void;
  }[];

  // Sorting options
  sortOptions?: { value: string; label: string }[];

  // Search option
  searchPlaceholder?: string;
  showSearchBar?: boolean;

  buttonLabel?: string; // e.g. "Select Fonts"
}

export function ListHeaderHandlers({
  isSelectionMode,
  onToggleSelectionMode,
  selectedCount,
  canMassAction = true,
  massActions = [],
  sortOptions = [],
  searchPlaceholder = "Search...",
  showSearchBar = true,
  buttonLabel = "Select Items",
}: ListHeaderHandlersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to update search params in the URL
  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    // Reset to page 1 on filter/sort/search changes
    if (!updates.page && updates.page !== null) {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentSort = searchParams.get("sort") || sortOptions[0]?.value || "";
  const currentPerPage = searchParams.get("perPage") || "10";
  const currentSearch = searchParams.get("search") || "";

  // Stato locale per digitare senza lag: ogni tasto premuto aggiornava subito
  // l'URL (router.push), quindi ogni carattere aspettava un giro di navigazione
  // prima che il successivo potesse "registrarsi" — da qui la sensazione di
  // cercare una lettera alla volta. Ora l'input è reattivo localmente e l'URL
  // (quindi la query al DB) si aggiorna con un debounce.
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(currentSearch);

  // Se la ricerca cambia dall'esterno (back/forward del browser, reset filtri),
  // riallinea lo stato locale — pattern di aggiornamento durante il render.
  if (currentSearch !== prevUrlSearch) {
    setPrevUrlSearch(currentSearch);
    setSearchValue(currentSearch);
  }

  useEffect(() => {
    if (searchValue === currentSearch) return;
    const timeout = setTimeout(() => {
      updateQuery({ search: searchValue || null });
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

      {/* Left: Search input */}
      {showSearchBar && !isSelectionMode && (
        <div className="w-full xl:max-w-xs 2xl:max-w-md shrink-0">
          <Input
            id="list-search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      )}

      {/* Right: Actions, Sort, Pagination, and Toggle */}
      {isSelectionMode ? (
        <div className="flex flex-row items-center justify-between gap-4 w-full flex-nowrap">
          <span className="text-bluegray-900 dark:text-redgray-200 text-sm font-bold whitespace-nowrap ps-2">
            {selectedCount} Selected
          </span>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end">
            {massActions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.onClick}
                disabled={selectedCount === 0}
                variant={action.variant || "secondary"}
                size="md"
                roundness="md"
              >
                {action.label}
              </Button>
            ))}
            {canMassAction && (
              <Button
                onClick={onToggleSelectionMode}
                variant="outline"
                size="md"
                roundness="md"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-4 xl:justify-end w-full">
          {/* Sort by */}
          {sortOptions.length > 0 && (
            <div className="flex items-center gap-2">
              <Select
                options={sortOptions}
                value={currentSort}
                onChange={(val) => updateQuery({ sort: val })}
                className="min-w-[140px]"
              />
            </div>
          )}

          {/* Show per page */}
          <div className="flex items-center gap-2">
            <Select
              options={[
                { label: "10", value: "10" },
                { label: "20", value: "20" },
                { label: "50", value: "50" },
              ]}
              value={currentPerPage}
              onChange={(val) => updateQuery({ perPage: val })}
              className="min-w-[80px]"
            />
          </div>

          {/* Selection toggle */}
          {canMassAction && (
            <div className="flex items-center gap-3 shrink-0">
              <Button
                onClick={onToggleSelectionMode}
                variant="outline"
                size="md"
                roundness="md"
              >
                {buttonLabel}
              </Button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export interface ListPaginationProps {
  totalCount: number;
  entityNamePlural?: string;
  /** Fallback page size used when the URL has no `perPage` query param. */
  defaultPerPage?: number;
}

export function ListPagination({
  totalCount,
  entityNamePlural = "Items",
  defaultPerPage = 10,
}: ListPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || String(defaultPerPage), 10);
  const totalPages = Math.ceil(totalCount / perPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Niente controlli pagina se c'è una sola pagina (o zero risultati) — non
  // c'è nulla tra cui navigare, mostrarla comunque è solo rumore visivo.
  if (totalCount === 0 || totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-t  bg-bluegray-100 dark:bg-redgray-900/50  border-black/5 dark:border-white/5 rounded-b-md gap-4">
      <div className="text-xm text-ocragray-800 dark:text-zinc-200 font-x-typewriter">
        Showing{" "}
        <span className="font-bold text-black dark:text-white">
          {(page - 1) * perPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-bold text-black dark:text-white">
          {Math.min(page * perPage, totalCount)}
        </span>{" "}
        of <span className="font-bold text-black dark:text-white">{totalCount}</span>{" "}
        {entityNamePlural}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-lg bg-white/50 dark:bg-zinc-900/50 border border-zinc-900/10 dark:border-white/10 text-black dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-zinc-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-bold font-x-typewriter text-black dark:text-white px-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-2 rounded-lg bg-white/50 dark:bg-zinc-900/50 border border-zinc-900/10 dark:border-white/10 text-black dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-zinc-900 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
