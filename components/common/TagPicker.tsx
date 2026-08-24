"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Search, Check, Tag as TagIcon, X, Loader2 } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import InViewTrigger from "@/components/common/InViewTrigger";
import { getTagsPage, getTagsByIds } from "@/lib/actions/tag";

export interface TagPickerTag {
  id: string;
  name: string;
}

interface TagPickerProps {
  label?: string;
  /**
   * Lista statica già fetchata dal chiamante — comportamento legacy, filtro
   * client-side con troncamento a PREVIEW_LIMIT. Ometti questa prop per il
   * fetch progressivo self-fetching (30 alla volta, mano a mano che si
   * scrolla), consigliato per liste che possono crescere oltre poche decine.
   */
  tags?: TagPickerTag[];
  value: string[];
  onChange: (ids: string[]) => void;
  emptyLabel?: string;
}

const PAGE_SIZE = 30;
const PREVIEW_LIMIT = 80; // solo modalità legacy (tags fornito)

export default function TagPicker({ label, tags, value, onChange, emptyLabel = "No tags available." }: TagPickerProps) {
  const selfFetching = tags === undefined;

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
    if (!q) return tags!;
    return tags!.filter((t) => t.name.toLowerCase().includes(q));
  }, [tags, query, selfFetching]);
  const legacyVisible = legacyFiltered.slice(0, PREVIEW_LIMIT);
  const legacyHiddenCount = legacyFiltered.length - legacyVisible.length;

  // --- Modalità self-fetching: pagine da 30 via TanStack Query ---
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["tag-picker", debouncedQuery],
    queryFn: ({ pageParam }) => getTagsPage({ search: debouncedQuery, cursor: pageParam, limit: PAGE_SIZE }),
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

  // Chip dei tag selezionati: servono i nomi anche per id non presenti nella
  // pagina corrente (es. selezionati prima di scrollare fin lì).
  const knownById = useMemo(() => {
    const map = new Map<string, string>();
    (selfFetching ? fetchedItems : tags!).forEach((t) => map.set(t.id, t.name));
    return map;
  }, [selfFetching, fetchedItems, tags]);
  const missingSelectedIds = selfFetching ? value.filter((id) => !knownById.has(id)) : [];
  const missingSelectedLookup = useQuery({
    queryKey: ["tags-by-ids", missingSelectedIds],
    queryFn: () => getTagsByIds(missingSelectedIds),
    enabled: selfFetching && missingSelectedIds.length > 0,
  });
  missingSelectedLookup.data?.forEach((t) => knownById.set(t.id, t.name));

  const selectedTags = value.map((id) => ({ id, name: knownById.get(id) ?? "…" }));

  const toggleTag = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  const removeTag = (id: string) => onChange(value.filter((v) => v !== id));

  const isEmptyDisabled = !selfFetching && tags!.length === 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5 flex items-center gap-1.5">
          <TagIcon className="w-3.5 h-3.5" />
          {label}
        </label>
      )}

      <div className="p-3 border border-black/10 dark:border-white/10 rounded-lg bg-white/50 dark:bg-zinc-900/50 space-y-3">
        <div className="flex flex-wrap gap-2 min-h-[1.75rem]">
          {selectedTags.length === 0 && (
            <span className="text-xs text-zinc-400 italic">No tags selected yet.</span>
          )}
          {selectedTags.map((t) => (
            <span
              key={t.id}
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-black text-white dark:bg-white dark:text-black"
            >
              {t.name}
              <button type="button" onClick={() => removeTag(t.id)} className="hover:opacity-70" title={`Remove ${t.name}`}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={isEmptyDisabled}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-dashed border-black/20 dark:border-white/20 text-ocragray-800 dark:text-zinc-200 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <TagIcon className="w-3.5 h-3.5" />
          {isEmptyDisabled ? emptyLabel : "Add tags..."}
        </button>
      </div>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <BaseModal.Header onClose={() => setIsOpen(false)}>
            <h3 className="text-2xl text-black dark:text-white">
              {label || "Select tags"}
            </h3>
          </BaseModal.Header>
          <BaseModal.Body>
            <div className="space-y-4">
              <Input
                ref={inputRef}
                type="text"
                value={query}
                onChange={setQuery}
                placeholder={selfFetching ? "Search tags by name..." : `Search ${tags!.length} tags by name...`}
                autoComplete="off"
                leftIcon={<Search className="h-3.5 w-3.5" />}
              />

              <div className="max-h-96 overflow-y-auto rounded-xl border border-black/10 dark:border-white/10 divide-y divide-black/5 dark:divide-white/5">
                {visible.map((t, idx) => {
                  const isSelected = value.includes(t.id);

                  const row = (
                    <button
                      type="button"
                      onClick={() => toggleTag(t.id)}
                      className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${isSelected ? "bg-blue/10 dark:bg-red/10" : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                    >
                      <span className="text-sm text-black dark:text-white truncate">{t.name}</span>
                      {isSelected && <Check className="h-4 w-4 text-blue dark:text-red shrink-0" />}
                    </button>
                  );

                  if (selfFetching && idx === triggerIndex && infiniteQuery.hasNextPage) {
                    return (
                      <InViewTrigger
                        key={t.id}
                        onVisible={() => {
                          if (!infiniteQuery.isFetchingNextPage) infiniteQuery.fetchNextPage();
                        }}
                      >
                        {row}
                      </InViewTrigger>
                    );
                  }

                  return <div key={t.id}>{row}</div>;
                })}

                {selfFetching && (infiniteQuery.isLoading || infiniteQuery.isFetchingNextPage) && (
                  <div className="px-4 py-3 flex items-center justify-center gap-2 text-xs text-zinc-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Loading tags...
                  </div>
                )}

                {visible.length === 0 && !(selfFetching && infiniteQuery.isLoading) && (
                  <div className="px-4 py-8 text-center text-xs text-zinc-400">
                    No tags match &quot;{query}&quot;.
                  </div>
                )}
              </div>

              {!selfFetching && legacyHiddenCount > 0 && (
                <p className="text-[10px] text-zinc-400 text-center">
                  {legacyHiddenCount} more tag(s) hidden &mdash; refine your search to narrow the list.
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
