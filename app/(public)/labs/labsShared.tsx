"use client";

import React, { useState } from "react";
import { Copy, Check, MoveLeft } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";
import { Ingredient } from "@/types";

export type FontDisplay = "swap" | "auto" | "block" | "fallback" | "optional";
export type SfntFormat = "truetype" | "opentype";

export interface ConvertedFormat {
  base64: string;
  ext: string;
  size: number;
}

export interface ConvertResult {
  fontName: string;
  isVariable: boolean;
  formats: {
    woff2: ConvertedFormat;
    woff: ConvertedFormat;
    sfnt: ConvertedFormat;
  };
}

export const FONT_DISPLAY_OPTIONS: { label: string; value: FontDisplay }[] = [
  { label: "SWAP", value: "swap" },
  { label: "AUTO", value: "auto" },
  { label: "BLOCK", value: "block" },
  { label: "FALLBACK", value: "fallback" },
  { label: "OPTIONAL", value: "optional" },
];

export const STYLE_OPTIONS = [
  { label: "NORMAL", value: "normal" },
  { label: "ITALIC", value: "italic" },
];

export const SFNT_FORMAT_OPTIONS: { label: string; value: SfntFormat }[] = [
  { label: "TTF", value: "truetype" },
  { label: "OTF", value: "opentype" },
];

export const MIME_BY_EXT: Record<string, string> = {
  woff2: "font/woff2",
  woff: "font/woff",
  ttf: "font/ttf",
  otf: "font/otf",
};

export function slugifyVar(name: string): string {
  return (name || "font")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "font";
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function base64ToUint8Array(base64: string): Uint8Array {
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return arr;
}

export function base64ToBlob(base64: string, mime: string): Blob {
  return new Blob([base64ToUint8Array(base64).buffer as ArrayBuffer], { type: mime });
}

export function buildCatalogOptions(catalog: Ingredient[]) {
  return [
    { label: "— Custom (no catalog font) —", value: "" },
    ...catalog.map((ing) => ({ label: ing.name, value: ing.slug })),
  ];
}

// Handoff Converter -> @font-face Generator: sono due pagine/route diverse
// ora, quindi non si passa più per React state. I formati convertiti (base64)
// vengono depositati in sessionStorage prima della navigazione client-side;
// la pagina di destinazione li legge una volta al mount, ricrea i blob URL
// (validi solo per questa sessione di tab) e ripulisce la chiave.
const CONVERTER_HANDOFF_KEY = "labs:converter-handoff";

export function writeConverterHandoff(result: ConvertResult) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(CONVERTER_HANDOFF_KEY, JSON.stringify(result));
}

export function readAndClearConverterHandoff(): ConvertResult | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(CONVERTER_HANDOFF_KEY);
  if (!raw) return null;
  window.sessionStorage.removeItem(CONVERTER_HANDOFF_KEY);
  try {
    return JSON.parse(raw) as ConvertResult;
  } catch {
    return null;
  }
}

// ─── Shared presentational pieces ───

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 rounded-lg p-6 space-y-4 ${className}`}>
      {children}
    </div>
  );
}

export function PanelHeading({ dot, title }: { dot: string; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <h2 className="font-haas text-sm font-bold text-black dark:text-zinc-200">{title}</h2>
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-zinc-500 dark:text-zinc-500 text-[9px] font-bold uppercase tracking-wider block mb-1">{children}</span>;
}

// Stesso toggle switch usato altrove nell'admin (es. PairingForm) — versione
// pubblica, palette blue/cyan invece di blue/red.
export function ToggleSwitch({
  checked,
  onChange,
  label,
  helperText,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  helperText?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="min-w-0">
        <p className="text-xs font-bold text-black dark:text-white">{label}</p>
        {helperText && <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 mt-0.5">{helperText}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:peer-checked:after:border-zinc-800 peer-checked:bg-blue dark:peer-checked:bg-red" />
      </label>
    </div>
  );
}

// Bottone copia con feedback "Copied" temporaneo — usato per ogni blocco di
// codice generato (font-face, config JS, CSS @theme).
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 dark:bg-white/80 text-white dark:text-black text-[10px] font-bold uppercase tracking-wider backdrop-blur-md hover:opacity-90 transition-opacity"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// Ogni tool ha ormai la sua route dedicata: niente più tab ridondanti verso
// gli altri 2 tool sulla stessa pagina, solo il rimando all'hub.
export function ToolNav({ ingredientSlug }: { ingredientSlug?: string }) {
  const qs = ingredientSlug ? `?ingredient=${encodeURIComponent(ingredientSlug)}` : "";
  return (
    <MinimalLink
      href={`/labs${qs}`}
      label="Back to Labs"
      icon={<MoveLeft size={12} />}
      iconPosition="left"
      className="font-bold tracking-widest text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white"
    />
  );
}

export function useLabsGrainientOptions(theme: string) {
  return {
    color1: theme === "light" ? "#fdfdfd" : "#09090b",
    color2: theme === "light" ? "#c0d3ed" : "#570d22",
    color3: theme === "light" ? "#e5e7eb" : "#27272a",
  };
}
