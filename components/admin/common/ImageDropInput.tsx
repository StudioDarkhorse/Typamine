"use client";

import React, { useState } from "react";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropInputProps {
  /** Name attribute for the native <input> — required if the parent form reads it via `new FormData(form)`. */
  name?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  /** Blob/data URL of a just-picked (not yet saved) file — shows a "New" badge over `currentUrl`. */
  previewUrl?: string | null;
  /** Already-persisted image URL, shown until a new file replaces it. */
  currentUrl?: string | null;
  isCompressing?: boolean;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  accept?: string;
  label?: string;
  helperText?: string;
  /** Full size/shape classes for the drop zone, e.g. "aspect-[4/3] rounded-xl" or "h-52 w-52 rounded-full mx-auto". */
  containerClassName?: string;
  disabled?: boolean;
}

// Un solo componente per "grande bottone tratteggiato che è anche una drop
// zone e mostra l'anteprima" — sostituisce i pattern precedenti (box
// tratteggiato + input file separato sotto) sparsi in ogni form che carica
// immagini.
export default function ImageDropInput({
  name,
  inputRef,
  previewUrl,
  currentUrl,
  isCompressing = false,
  onSelect,
  onRemove,
  accept = "image/*",
  label = "Upload image",
  helperText,
  containerClassName = "aspect-[4/3] rounded-xl w-full",
  disabled = false,
}: ImageDropInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const displayUrl = previewUrl || currentUrl || null;
  const isNew = Boolean(previewUrl) && Boolean(currentUrl);

  const triggerFileDialog = () => {
    if (!disabled) inputRef.current?.click();
  };

  // Un file droppato non passa dall'evento onChange nativo dell'<input> —
  // lo iniettiamo noi nel suo FileList e ridispatchiamo un evento "change"
  // reale sull'elemento, così `onSelect` (che si aspetta un ChangeEvent) fa
  // esattamente lo stesso lavoro (compressione inclusa) di una selezione manuale.
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (!file || !inputRef.current) return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputRef.current.files = dataTransfer.files;
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return (
    <div
      onClick={!displayUrl ? triggerFileDialog : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "relative group border-2 border-dashed overflow-hidden transition-all bg-black/[0.02] dark:bg-white/[0.02]",
        containerClassName,
        isDragging ? "border-black dark:border-white bg-black/5 dark:bg-white/5" : "border-black/10 dark:border-white/10",
        !displayUrl && !disabled && "cursor-pointer hover:border-black/30 dark:hover:border-white/30",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={onSelect}
        disabled={disabled}
        className="hidden"
      />

      {isCompressing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 dark:bg-black/80 z-20">
          <Loader2 className="h-6 w-6 animate-spin text-black dark:text-white" />
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-400">Compressing...</p>
        </div>
      )}

      {displayUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={displayUrl} alt={label} className="w-full h-full object-cover" />
          {isNew && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold uppercase tracking-widest z-10">
              New
            </span>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
            <button
              type="button"
              onClick={triggerFileDialog}
              className="p-2.5 bg-white text-black rounded-lg shadow-lg hover:scale-105 transition-transform"
              title={previewUrl ? "Cancel new image" : "Replace image"}
            >
              <Upload className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="p-2.5 bg-red-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
              title={previewUrl ? "Cancel new image" : "Remove image"}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 h-full py-8 px-4 text-center">
          <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-800 dark:text-zinc-400">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>

            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-400 mb-2">{label}</p>
            <p className="text-[10px] text-zinc-800 dark:text-zinc-400">Click or drag &amp; drop</p>
            {helperText && <p className="text-[10px] text-zinc-800 dark:text-zinc-400">{helperText}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
