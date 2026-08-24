"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter as FilterIcon, Check } from "lucide-react";
import { Input, Label } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import BaseModal from "@/components/common/BaseModal";

export interface SearchSortFilterOption {
  label: string;
  value: string;
}

export interface SearchSortFilterTag {
  id: string;
  name: string;
}

export interface SearchSortFilterToggle {
  /** Query param scritto/letto nell'URL, es. "curated". */
  paramKey: string;
  /** Etichetta mostrata accanto allo switch nel modale. */
  label: string;
}

export interface SearchSortFilterProps {
  searchPlaceholder?: string;
  searchParamKey?: string;
  sortOptions?: SearchSortFilterOption[];
  sortParamKey?: string;
  categoryOptions?: SearchSortFilterOption[];
  categoryParamKey?: string;
  ratingOptions?: SearchSortFilterOption[];
  ratingParamKey?: string;
  licenseOptions?: SearchSortFilterOption[];
  licenseParamKey?: string;
  /** Tag disponibili per il filtro multiplo — selezione a "OR": più tag scelti, più risultati (unione, non intersezione). */
  tags?: SearchSortFilterTag[];
  tagsParamKey?: string;
  /** Filtri booleani generici (switch on/off), es. "mostra solo le curate a mano". */
  toggleOptions?: SearchSortFilterToggle[];
  filtersModalTitle?: string;
  className?: string;
  showSearch?: boolean;
}

// Componente riutilizzabile per ricerca + ordinamento + filtri, pensato per
// liste sia pubbliche (fonts, pairing) che admin. Legge/scrive tutto sui
// search params dell'URL, quindi la pagina che lo usa deve solo leggerli
// lato server per interrogare il DB.
export function SearchSortFilter({
  searchPlaceholder = "Search...",
  searchParamKey = "search",
  sortOptions = [],
  sortParamKey = "sort",
  categoryOptions = [],
  categoryParamKey = "category",
  ratingOptions = [],
  ratingParamKey = "rating",
  licenseOptions = [],
  licenseParamKey = "license",
  tags = [],
  tagsParamKey = "tags",
  toggleOptions = [],
  filtersModalTitle = "Filters",
  className = "",
  showSearch = true,
}: SearchSortFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get(searchParamKey) || "";
  const currentSort = searchParams.get(sortParamKey) || sortOptions[0]?.value || "";
  const currentCategory = searchParams.get(categoryParamKey) || categoryOptions[0]?.value || "ALL";
  const currentRating = searchParams.get(ratingParamKey) || ratingOptions[0]?.value || "ALL";
  const currentLicenseTypes = (searchParams.get(licenseParamKey) || "").split(",").filter(Boolean);
  // Il param URL usa il NOME del tag (human-readable, es. ?tags=Serif)
  // invece dell'id — le pagine che consumano questo param convertono a id
  // internamente prima di interrogare il DB (vedi lib/services/tag.ts).
  const currentTagNames = (searchParams.get(tagsParamKey) || "").split(",").filter(Boolean);
  const currentToggles: Record<string, boolean> = {};
  toggleOptions.forEach((opt) => {
    currentToggles[opt.paramKey] = searchParams.get(opt.paramKey) === "true";
  });

  const hasFilterModal =
    categoryOptions.length > 0 ||
    ratingOptions.length > 0 ||
    licenseOptions.length > 0 ||
    tags.length > 0 ||
    toggleOptions.length > 0;

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Stato locale per la ricerca + debounce: senza buffering locale, ogni
  // tasto premuto farebbe subito router.push, con l'input che aspetta un
  // giro di navigazione prima che il carattere successivo "si registri".
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(currentSearch);

  if (currentSearch !== prevUrlSearch) {
    setPrevUrlSearch(currentSearch);
    setSearchValue(currentSearch);
  }

  useEffect(() => {
    if (searchValue === currentSearch) return;
    const timeout = setTimeout(() => {
      updateParams({ [searchParamKey]: searchValue || null });
    }, 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  // Modale filtri: stato bozza, applicato tutto insieme con un solo push
  // invece di una navigazione per ogni checkbox/select toccato.
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [draftCategory, setDraftCategory] = useState(currentCategory);
  const [draftRating, setDraftRating] = useState(currentRating);
  const [draftLicenseTypes, setDraftLicenseTypes] = useState<string[]>(currentLicenseTypes);
  const [draftTagNames, setDraftTagNames] = useState<string[]>(currentTagNames);
  const [draftToggles, setDraftToggles] = useState<Record<string, boolean>>(currentToggles);

  const openFilterModal = () => {
    setDraftCategory(currentCategory);
    setDraftRating(currentRating);
    setDraftLicenseTypes(currentLicenseTypes);
    setDraftTagNames(currentTagNames);
    setDraftToggles(currentToggles);
    setIsFilterModalOpen(true);
  };

  const toggleDraftTag = (tagName: string) => {
    setDraftTagNames((prev) =>
      prev.includes(tagName) ? prev.filter((name) => name !== tagName) : [...prev, tagName]
    );
  };

  const toggleDraftSwitch = (paramKey: string) => {
    setDraftToggles((prev) => ({ ...prev, [paramKey]: !prev[paramKey] }));
  };

  const applyFilters = () => {
    const toggleUpdates: Record<string, string | null> = {};
    toggleOptions.forEach((opt) => {
      toggleUpdates[opt.paramKey] = draftToggles[opt.paramKey] ? "true" : null;
    });
    updateParams({
      [categoryParamKey]: categoryOptions.length > 0 ? draftCategory : null,
      [ratingParamKey]: ratingOptions.length > 0 ? draftRating : null,
      [licenseParamKey]: licenseOptions.length > 0 && draftLicenseTypes.length > 0 ? draftLicenseTypes.join(",") : null,
      [tagsParamKey]: draftTagNames.length > 0 ? draftTagNames.join(",") : null,
      ...toggleUpdates,
    });
    setIsFilterModalOpen(false);
  };

  const clearFilters = () => {
    setDraftCategory(categoryOptions[0]?.value || "ALL");
    setDraftRating(ratingOptions[0]?.value || "ALL");
    setDraftLicenseTypes([]);
    setDraftTagNames([]);
    setDraftToggles({});
    const toggleUpdates: Record<string, string | null> = {};
    toggleOptions.forEach((opt) => {
      toggleUpdates[opt.paramKey] = null;
    });
    updateParams({
      [categoryParamKey]: null,
      [ratingParamKey]: null,
      [licenseParamKey]: null,
      [tagsParamKey]: null,
      ...toggleUpdates,
    });
    setIsFilterModalOpen(false);
  };

  const activeFilterCount =
    (categoryOptions.length > 0 && currentCategory !== (categoryOptions[0]?.value || "ALL") ? 1 : 0) +
    (ratingOptions.length > 0 && currentRating !== (ratingOptions[0]?.value || "ALL") ? 1 : 0) +
    currentLicenseTypes.length +
    currentTagNames.length +
    toggleOptions.filter((opt) => currentToggles[opt.paramKey]).length;

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}>

      <div className="flex-1 min-w-0">
        {showSearch && (
          <Input
            id="search-sort-filter-search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={setSearchValue}
          />
        )}
      </div>


      {sortOptions.length > 0 && (
        <div className="w-full sm:w-auto sm:min-w-[170px] shrink-0">
          <Select
            options={sortOptions}
            value={currentSort}
            onChange={(val) => updateParams({ [sortParamKey]: val })}
          />
        </div>
      )}

      {hasFilterModal && (
        <Button
          variant="outline"
          size="md"
          roundness="md"
          onClick={openFilterModal}
          className="flex items-center gap-2 shrink-0 font-normal border-bluegray-200 hover:border-bluegray-400 dark:border-redgray-800 dark:text-white dark:hover:border-redgray-600 dark:hover:text-white"
        >
          <FilterIcon className="h-3.5 w-3.5" />
          {filtersModalTitle}
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-blue dark:bg-red text-black text-[10px] font-black">
              {activeFilterCount}
            </span>
          )}
        </Button>
      )}

      {hasFilterModal && (
        <BaseModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} size="xl">
          <BaseModal.Header onClose={() => setIsFilterModalOpen(false)}>
            {filtersModalTitle}
          </BaseModal.Header>
          <BaseModal.Body>
            <div className="space-y-6">
              {(categoryOptions.length > 0 || licenseOptions.length > 0) && (
                <div className={categoryOptions.length > 0 && licenseOptions.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "w-full"}>
                  {categoryOptions.length > 0 && (
                    <div>
                      <Label>Category</Label>
                      <Select options={categoryOptions} value={draftCategory} onChange={setDraftCategory} />
                    </div>
                  )}

                  {licenseOptions.length > 0 && (
                    <div>
                      <Label>License Type</Label>
                      <Select
                        mode="multiselect"
                        options={licenseOptions}
                        value={draftLicenseTypes}
                        onChange={setDraftLicenseTypes}
                        placeholder="Select licenses..."
                      />
                    </div>
                  )}
                </div>
              )}

              {ratingOptions.length > 0 && (
                <div>
                  <Label>Typamine® Minimum Rating</Label>
                  <Select options={ratingOptions} value={draftRating} onChange={setDraftRating} />
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <Label>Tags — select multiple, results include any match</Label>
                  <div className="flex flex-wrap gap-2 p-3 border border-black/10 dark:border-white/10 rounded-lg bg-white/50 dark:bg-zinc-900/50 max-h-48 overflow-y-auto">
                    {tags.map((t) => {
                      const isSelected = draftTagNames.includes(t.name);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleDraftTag(t.name)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${isSelected
                              ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                              : "bg-transparent text-zinc-600 dark:text-zinc-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                            }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {t.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {toggleOptions.map((opt) => {
                const isOn = !!draftToggles[opt.paramKey];
                return (
                  <button
                    key={opt.paramKey}
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    onClick={() => toggleDraftSwitch(opt.paramKey)}
                    className={`flex items-center gap-3 w-full h-[42px] rounded-xl border px-4 transition-all text-left ${isOn
                        ? "border-blue/60 dark:border-red/60 bg-blue/10 dark:bg-red/10"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60"
                      }`}
                  >
                    <span className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 transition-colors ${isOn ? "border-blue dark:border-red bg-blue dark:bg-red" : "border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800"}`}>
                      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform mt-px ${isOn ? "translate-x-3.5" : "translate-x-px"}`} />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-black dark:text-white">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </BaseModal.Body>
          <BaseModal.Footer>
            <div className="flex items-center justify-between gap-3 w-full">
              <Button variant="ghost" size="md" roundness="md" onClick={clearFilters}>
                Clear All
              </Button>
              <Button variant="primary" size="md" roundness="md" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </BaseModal.Footer>
        </BaseModal>
      )}
    </div>
  );
}

export default SearchSortFilter;
