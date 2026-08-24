"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Search, Check, Type as TypeIcon, X, Loader2 } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import InViewTrigger from "@/components/common/InViewTrigger";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { getFontsPage, getFontsByIds } from "@/lib/actions/font";

export interface FontMultiPickerFont {
  id: string;
  name: string;
  category?: string;
  variants?: { woff2Url?: string | null }[];
}

interface FontMultiPickerProps {
  label?: string;
  /**
   * Lista statica già fetchata dal chiamante — comportamento legacy, filtro
   * client-side con troncamento a PREVIEW_LIMIT. Ometti questa prop per il
   * fetch progressivo self-fetching (30 alla volta, mano a mano che si
   * scrolla), consigliato per liste che possono crescere oltre poche decine
   * — stesso pattern dual-mode di FontPicker.
   */
  fonts?: FontMultiPickerFont[];
  value: string[];
  onChange: (ids: string[]) => void;
  emptyLabel?: string;
}

// Combina la ricerca live + preview reale del FontPicker (single-select) con
// il multi-select a chip del TagPicker: qui serve entrambe le cose perché
// ArchivePost.fonts è una relazione many-to-many, non un singolo font.
const PAGE_SIZE = 30;
const PREVIEW_LIMIT = 60; // solo modalità legacy (fonts fornito)

export default function FontMultiPicker({
  label,
  fonts,
  value,
  onChange,
  emptyLabel = "No fonts available.",
}: FontMultiPickerProps) {
  const selfFetching = fonts === undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setDebouncedQuery("");
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // --- Modalità legacy: filtro client-side sulla lista fornita ---
  const legacyFiltered = useMemo(() => {
    if (selfFetching) return [];
    const q = query.trim().toLowerCase();
    if (!q) return fonts!;
    return fonts!.filter(
      (f) => f.name.toLowerCase().includes(q) || (f.category || "").toLowerCase().includes(q)
    );
  }, [fonts, query, selfFetching]);
  const legacyVisible = legacyFiltered.slice(0, PREVIEW_LIMIT);
  const legacyHiddenCount = legacyFiltered.length - legacyVisible.length;

  // --- Modalità self-fetching: pagine da 30 via TanStack Query ---
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["font-multi-picker", debouncedQuery],
    queryFn: ({ pageParam }) => getFontsPage({ search: debouncedQuery, cursor: pageParam, limit: PAGE_SIZE }),
    initialPageParam: null as string | null,
    getNextPageParam: (last) => last.nextCursor,
    enabled: selfFetching && isOpen,
  });

  const fetchedItems = useMemo(
    () => (selfFetching ? infiniteQuery.data?.pages.flatMap((p) => p.items) ?? [] : []),
    [selfFetching, infiniteQuery.data]
  );
  const lastPageSize = selfFetching
    ? infiniteQuery.data?.pages[infiniteQuery.data.pages.length - 1]?.items.length ?? 0
    : 0;
  const triggerIndex = Math.max(0, fetchedItems.length - Math.ceil(lastPageSize / 2));

  const visible = selfFetching ? fetchedItems : legacyVisible;

  // Chip dei selezionati: risolti dalla lista visibile quando possibile, coi
  // buchi (id selezionati ma non ancora nella pagina/lista corrente) presi
  // con un fetch mirato per id — mai serve l'intero catalogo solo per
  // mostrare il nome di 2-3 font già scelti.
  const knownById = useMemo(() => {
    const map = new Map<string, FontMultiPickerFont>();
    (selfFetching ? fetchedItems : fonts!).forEach((f) => map.set(f.id, f));
    return map;
  }, [selfFetching, fetchedItems, fonts]);

  const missingSelectedIds = useMemo(
    () => value.filter((id) => !knownById.has(id)),
    [value, knownById]
  );
  const missingLookup = useQuery({
    queryKey: ["fonts-by-ids", missingSelectedIds.join(",")],
    queryFn: () => getFontsByIds(missingSelectedIds),
    enabled: missingSelectedIds.length > 0,
  });

  const selectedFonts = useMemo(() => {
    const lookupById = new Map((missingLookup.data ?? []).map((f) => [f.id, f]));
    return value
      .map((id) => knownById.get(id) ?? lookupById.get(id))
      .filter((f): f is FontMultiPickerFont => !!f);
  }, [value, knownById, missingLookup.data]);

  const fontFaceCss = useMemo(() => {
    return [...visible, ...selectedFonts]
      .filter((f, idx, arr) => arr.findIndex((g) => g.id === f.id) === idx)
      .map((f) => {
        const woff2 = f.variants?.[0]?.woff2Url;
        if (!woff2) return "";
        return `@font-face { font-family: 'FontMultiPicker_${f.id}'; src: url('${woff2}') format('woff2'); font-display: swap; }`;
      })
      .join("\n");
  }, [visible, selectedFonts]);

  const toggleFont = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  const removeFont = (id: string) => onChange(value.filter((v) => v !== id));

  const noFontsAtAll = !selfFetching && fonts!.length === 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
          {label}
        </label>
      )}

      <div className="p-3 border border-black/10 dark:border-white/10 rounded-lg bg-white/50 dark:bg-zinc-900/50 space-y-3">
        <div className="flex flex-wrap gap-2 min-h-[1.75rem]">
          {fontFaceCss && <style>{fontFaceCss}</style>}
          {selectedFonts.length === 0 && (
            <span className="text-xs text-zinc-400 italic">No fonts selected yet.</span>
          )}
          {selectedFonts.map((f) => (
            <span
              key={f.id}
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-black text-white dark:bg-white dark:text-black"
            >
              {f.name}
              <button type="button" onClick={() => removeFont(f.id)} className="hover:opacity-70" title={`Remove ${f.name}`}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={noFontsAtAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-dashed border-black/20 dark:border-white/20 text-ocragray-800 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <TypeIcon className="w-3.5 h-3.5" />
          {noFontsAtAll ? emptyLabel : "Add fonts..."}
        </button>
      </div>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <BaseModal.Header onClose={() => setIsOpen(false)}>
            <h3 className="text-2xl text-black dark:text-white">
              {label || "Select fonts"}
            </h3>
          </BaseModal.Header>
          <BaseModal.Body>
            <div className="space-y-4">
              <Input
                ref={inputRef}
                type="text"
                value={query}
                onChange={setQuery}
                placeholder={selfFetching ? "Search fonts by name..." : `Search ${fonts!.length} fonts by name or category...`}
                autoComplete="off"
                leftIcon={<Search className="h-3.5 w-3.5" />}
              />

              <div className="max-h-96 overflow-y-auto rounded-xl border border-black/10 dark:border-white/10 divide-y divide-black/5 dark:divide-white/5">
                {visible.map((f, idx) => {
                  const isSelected = value.includes(f.id);
                  const hasWoff2 = Boolean(f.variants?.[0]?.woff2Url);

                  const row = (
                    <button
                      type="button"
                      onClick={() => toggleFont(f.id)}
                      className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${isSelected ? "bg-blue/10 dark:bg-red/10" : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                    >
                      <span className="min-w-0">
                        <span
                          className="block text-base text-black dark:text-white truncate"
                          style={hasWoff2 ? { fontFamily: `"FontMultiPicker_${f.id}", sans-serif` } : undefined}
                        >
                          {f.name}
                        </span>
                        {f.category && (
                          <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{f.category}</span>
                        )}
                      </span>
                      {isSelected && <Check className="h-4 w-4 text-blue dark:text-red shrink-0" />}
                    </button>
                  );

                  if (selfFetching && idx === triggerIndex && infiniteQuery.hasNextPage) {
                    return (
                      <InViewTrigger
                        key={f.id}
                        onVisible={() => {
                          if (!infiniteQuery.isFetchingNextPage) infiniteQuery.fetchNextPage();
                        }}
                      >
                        {row}
                      </InViewTrigger>
                    );
                  }

                  return <div key={f.id}>{row}</div>;
                })}

                {selfFetching && (infiniteQuery.isLoading || infiniteQuery.isFetchingNextPage) && (
                  <div className="px-4 py-3 flex items-center justify-center gap-2 text-xs text-zinc-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Loading fonts...
                  </div>
                )}

                {visible.length === 0 && !(selfFetching && infiniteQuery.isLoading) && (
                  <div className="px-4 py-8 text-center text-xs text-zinc-400">
                    No fonts match &quot;{query}&quot;.
                  </div>
                )}
              </div>

              {!selfFetching && legacyHiddenCount > 0 && (
                <p className="text-[10px] text-zinc-400 text-center">
                  {legacyHiddenCount} more font(s) hidden &mdash; refine your search to narrow the list.
                </p>
              )}
            </div>
          </BaseModal.Body>
          <BaseModal.Footer>
            <Button
              type="button"
              variant="primary"
              size="md"
              roundness="md"
              onClick={() => setIsOpen(false)}
              fullWidth
              className="flex items-center justify-center gap-2 font-bold"
            >
              <Check className="h-4 w-4" />
              Done ({value.length} selected)
            </Button>
          </BaseModal.Footer>
        </BaseModal>
      )}
    </div>
  );
}
