"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Search, Check, Type as TypeIcon, Loader2, Plus } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import InViewTrigger from "@/components/common/InViewTrigger";
import { Input } from "@/components/common/Input";
import { getFontsPage, getFontsByIds } from "@/lib/actions/font";

export interface FontPickerFont {
  id: string;
  name: string;
  category?: string;
  creator?: string | null;
  variants?: { woff2Url?: string | null }[];
}

interface CommonProps {
  label?: string;
  /**
   * Lista statica già fetchata dal chiamante — comportamento legacy, filtro
   * client-side con troncamento a PREVIEW_LIMIT. Ometti questa prop per il
   * fetch progressivo self-fetching (30 alla volta, mano a mano che si
   * scrolla), consigliato per liste che possono crescere oltre poche decine.
   */
  fonts?: FontPickerFont[];
  placeholder?: string;
}

interface SingleProps extends CommonProps {
  multiple?: false;
  value: string;
  onChange: (id: string) => void;
  max?: never;
}

interface MultipleProps extends CommonProps {
  multiple: true;
  /** Font id selezionati, in ordine di scelta. */
  value: string[];
  onChange: (ids: string[]) => void;
  /** Numero massimo di font selezionabili. */
  max: number;
}

export type FontPickerProps = SingleProps | MultipleProps;

const PAGE_SIZE = 30;
const PREVIEW_LIMIT = 60; // solo modalità legacy (fonts fornito)

// Un solo picker per entrambi i casi d'uso: prima erano due componenti gemelli
// (FontPicker e MultiFontPicker) identici a meno della singola vs multipla
// selezione. `multiple` sceglie il comportamento:
//   - single   → il modale si chiude alla scelta
//   - multiple → resta aperto per selezionare più font in fila, con limite
//                `max` e un bottone "Done" in footer
export default function FontPicker(props: FontPickerProps) {
  const { label, fonts, placeholder } = props;
  const isMultiple = props.multiple === true;
  const selfFetching = fonts === undefined;

  // Normalizzata a array così il resto del componente non si ramifica.
  const selectedIds = useMemo(
    () => (isMultiple ? (props.value as string[]) : props.value ? [props.value as string] : []),
    [isMultiple, props.value]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce solo rilevante in modalità self-fetching (ogni cambio di query
  // riparte da zero con una nuova query key) — innocuo lasciarlo attivo anche
  // in modalità legacy, semplicemente non viene usato lì.
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
      (f) =>
        f.name.toLowerCase().includes(q) ||
        (f.category || "").toLowerCase().includes(q) ||
        (f.creator || "").toLowerCase().includes(q)
    );
  }, [fonts, query, selfFetching]);
  const legacyVisible = legacyFiltered.slice(0, PREVIEW_LIMIT);
  const legacyHiddenCount = legacyFiltered.length - legacyVisible.length;

  // --- Modalità self-fetching: pagine da 30 via TanStack Query ---
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["font-picker", debouncedQuery],
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
  // Trigger a metà dell'ultimo batch appena fetchato, non in fondo alla lista
  // intera — il prefetch parte mentre l'utente sta ancora scrollando dentro
  // il batch corrente, niente attesa visibile quando arriva al fondo.
  const triggerIndex = Math.max(0, fetchedItems.length - Math.ceil(lastPageSize / 2));

  const visible = selfFetching ? fetchedItems : legacyVisible;

  // Solo in single: il trigger mostra nome e categoria del font scelto, che
  // può non essere in nessuna pagina già fetchata.
  const singleValue = isMultiple ? "" : (props.value as string);
  const selectedFromList = selfFetching
    ? fetchedItems.find((f) => f.id === singleValue)
    : fonts?.find((f) => f.id === singleValue);
  const needsSelectedLookup = !isMultiple && selfFetching && !!singleValue && !selectedFromList;
  const selectedLookup = useQuery({
    queryKey: ["font-by-id", singleValue],
    queryFn: () => getFontsByIds([singleValue]),
    enabled: needsSelectedLookup,
  });
  const selected = selectedFromList ?? selectedLookup.data?.[0];

  const fontFaceCss = useMemo(() => {
    return visible
      .map((f) => {
        const woff2 = f.variants?.[0]?.woff2Url;
        if (!woff2) return "";
        return `@font-face { font-family: 'FontPicker_${f.id}'; src: url('${woff2}') format('woff2'); font-display: swap; }`;
      })
      .join("\n");
  }, [visible]);

  const max = isMultiple ? props.max : 1;
  const atMax = isMultiple && selectedIds.length >= max;

  const pick = (id: string) => {
    if (!isMultiple) {
      props.onChange(id);
      setIsOpen(false);
      return;
    }
    if (selectedIds.includes(id)) {
      props.onChange(selectedIds.filter((v) => v !== id));
    } else if (!atMax) {
      props.onChange([...selectedIds, id]);
    }
  };

  const triggerPlaceholder = placeholder ?? (isMultiple ? "Add a font..." : "Select a font...");

  const searchPlaceholder = selfFetching
    ? "Search fonts by name..."
    : `Search ${fonts!.length} fonts by name, category or creator...`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full bg-bluegray-100 dark:bg-redgray-900/50 border border-bluegray-300 dark:border-redgray-700 hover:border-bluegray-400 dark:hover:border-redgray-600 rounded-lg px-3 py-2 transition-all text-left"
      >
        {isMultiple ? (
          <span className="min-w-0 truncate text-sm text-zinc-500">
            {selectedIds.length > 0 ? `${selectedIds.length} / ${max} fonts selected` : triggerPlaceholder}
          </span>
        ) : (
          <span className="min-w-0 truncate">
            {selected ? (
              <>
                <span className="block text-sm font-bold text-black dark:text-white font-x-typewriter truncate">
                  {selected.name}
                </span>
                {selected.category && (
                  <span className="block text-[10px] text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    {selected.category}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-zinc-500">{triggerPlaceholder}</span>
            )}
          </span>
        )}
        {isMultiple ? (
          <Plus className="h-4 w-4 text-zinc-800 dark:text-zinc-200 shrink-0 ml-2" />
        ) : (
          <TypeIcon className="h-4 w-4 text-zinc-800 dark:text-zinc-200 shrink-0 ml-2" />
        )}
      </button>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <BaseModal.Header onClose={() => setIsOpen(false)}>
            <div>
              <h3 className="text-2xl text-black dark:text-white">
                {label || (isMultiple ? "Select fonts" : "Select a font")}
              </h3>
              {isMultiple && (
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                  {selectedIds.length} / {max} selected
                </p>
              )}
            </div>
          </BaseModal.Header>

          <BaseModal.Body>
            {fontFaceCss && <style>{fontFaceCss}</style>}
            <div className="space-y-4">
              <Input
                ref={inputRef}
                type="text"
                value={query}
                onChange={setQuery}
                placeholder={searchPlaceholder}
                autoComplete="off"
                leftIcon={<Search className="h-3.5 w-3.5" />}
              />

              <div className="max-h-96 overflow-y-auto rounded-xl border border-black/10 dark:border-white/10 divide-y divide-black/5 dark:divide-white/5">
                {visible.map((f, idx) => {
                  const isSelected = selectedIds.includes(f.id);
                  const disabled = isMultiple && !isSelected && atMax;
                  const hasWoff2 = Boolean(f.variants?.[0]?.woff2Url);

                  const row = (
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => pick(f.id)}
                      className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? "bg-blue/10 dark:bg-red/10"
                          : disabled
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="min-w-0">
                        <span
                          className="block text-base text-black dark:text-white truncate"
                          style={hasWoff2 ? { fontFamily: `"FontPicker_${f.id}", sans-serif` } : undefined}
                        >
                          {f.name}
                        </span>
                        <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                          {f.category}
                          {f.creator ? ` · ${f.creator}` : ""}
                        </span>
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

              {atMax && <p className="text-[10px] text-zinc-500 text-center">Maximum of {max} fonts reached.</p>}
            </div>
          </BaseModal.Body>

          {/* In multipla il modale non si chiude da solo a ogni scelta: serve
              un modo esplicito per uscire dalla selezione. */}
          {isMultiple && (
            <BaseModal.Footer>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-lg px-4 py-2.5 hover:opacity-90 transition-opacity"
              >
                Done <TypeIcon className="h-3.5 w-3.5" />
              </button>
            </BaseModal.Footer>
          )}
        </BaseModal>
      )}
    </div>
  );
}
