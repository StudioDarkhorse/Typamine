"use client";

import { useState, useRef, useEffect, memo } from "react";
import imageCompression from "browser-image-compression";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/common/Select";
import BaseModal from "@/components/common/BaseModal";
import { Label } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import ImageDropInput from "@/components/admin/common/ImageDropInput";
import HexColorPickerPopover from "@/components/common/HexColorPickerPopover";
import { extractColorToken } from "@/lib/dynamicStyle";

// Un colore "custom" (scelto via react-colorful invece che dalla palette
// SITE_COLORS) viene tenuto in stato/props come hex letterale ("#ff3131")
// invece che come id — si riconosce così, senza bisogno di un flag separato.
const isCustomColor = (id: string) => id.startsWith("#");

// Infrastruttura generica per i "content module" (blocchi editoriali
// riordinabili: hero, paragrafo, quote, cta, ecc.) — condivisa da qualunque
// entità abbia bisogno di costruire contenuti ricchi (blog, pairing insight,
// archive...). Non dipende da nessuna entità specifica.

export interface Module {
  id: string;
  type: string;
  props: Record<string, any>;
}

// Combinazioni bg/testo per i moduli, ricavate dalla palette reale del sito:
// coppia chiara in light mode, invertita in dark mode.
export const COLOR_PAIRS = [
  { id: 'zinc-black', label: 'Zinc / Black', classes: 'bg-zinc-100 text-black dark:bg-black dark:text-white' },
  { id: 'white-black', label: 'White / Black', classes: 'bg-white text-black dark:bg-zinc-950 dark:text-white' },
  { id: 'black-white', label: 'Black / White', classes: 'bg-black text-white dark:bg-white dark:text-black' },
  { id: 'blue-black', label: 'Blue / Black', classes: 'bg-blue-100 text-black dark:bg-blue-950 dark:text-white' },
  { id: 'red-black', label: 'Red / Black', classes: 'bg-red-100 text-black dark:bg-red-950 dark:text-white' },
  { id: 'stone-black', label: 'Stone / Black', classes: 'bg-stone-100 text-black dark:bg-black dark:text-white' },
  { id: 'black-red', label: 'Black / Red', classes: 'bg-black text-red-500 dark:bg-red-950 dark:text-white' },
  { id: 'ocra-black', label: 'Ocra / Black', classes: 'bg-ocra-100 text-black dark:bg-ocra-950 dark:text-white' },
];

export const PAGE_THEMES = [
  { id: 'zinc-black', label: 'Zinc / Black', classes: 'bg-zinc-50 dark:bg-black' },
  { id: 'white-zinc', label: 'White / Zinc', classes: 'bg-white dark:bg-zinc-950' },
  { id: 'red-black', label: 'Red / Black', classes: 'bg-red-100 dark:bg-red-950' },
  { id: 'blue-black', label: 'Blue / Black', classes: 'bg-blue-100 dark:bg-blue-950' },
  { id: 'stone-black', label: 'Stone / Black', classes: 'bg-stone-100 dark:bg-black' },
  { id: 'bluegray-redgray', label: 'Bluegray / Redgray', classes: 'bg-bluegray-100 dark:bg-redgray-950' },
  { id: 'ocra-black', label: 'Ocra / Black', classes: 'bg-ocra-50 dark:bg-ocra-950' },
];

// Font disponibili sul sito (tutte le famiglie che Typamine mostra/vende come
// "ingredienti"), utilizzabili anche per il testo dei content module.
export const FONT_FAMILIES = [
  { id: 'standard', label: 'Standard (Haas Grotesk)', class: 'font-haas' },
  { id: 'jakarta', label: 'Plus Jakarta Sans', class: 'font-jakarta' },
  { id: 'rezland', label: 'Rezland', class: 'font-rezland' },
  { id: 'candyhaus', label: 'Candy Haus', class: 'font-candyhaus' },
  { id: 'galaxytail', label: 'Galaxy Tail', class: 'font-galaxytail' },
  { id: 'ikosdubOutline', label: 'Ikos Dub Outline', class: 'font-ikosdub-outline' },
  { id: 'ikosdubSolid', label: 'Ikos Dub Solid', class: 'font-ikosdub-solid' },
  { id: 'neuropol', label: 'Neuropol', class: 'font-neuropol' },
  { id: 'xtypewriter', label: 'X Typewriter', class: 'font-x-typewriter' },
];

export const SITE_COLORS = [
  { id: 'black', label: 'Black' },
  { id: 'white', label: 'White' },
  { id: 'zinc', label: 'Zinc' },
  { id: 'blue', label: 'Blue' },
  { id: 'red', label: 'Red' },
  { id: 'green', label: 'Green' },
  { id: 'stone', label: 'Stone' },
  { id: 'bluegray', label: 'Blue Gray' },
  { id: 'ocra', label: 'Ocra' },
];

export const colorMap: Record<string, string> = {
  'black': 'black',
  'white': 'white',
  'zinc': 'zinc-500',
  'blue': 'blue-500',
  'red': 'red-500',
  'green': 'green',
  'stone': 'stone-500',
  'bluegray': 'bluegray-500',
  'ocra': 'ocra-500',
};

export const reverseColorMap: Record<string, string> = {
  'black': 'black',
  'white': 'white',
  'zinc-500': 'zinc',
  'blue-500': 'blue',
  'red-500': 'red',
  'green': 'green',
  'stone-500': 'stone',
  'bluegray-500': 'bluegray',
  'ocra-500': 'ocra',
};

export const resolveMediaUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.startsWith('media://')) {
    const key = url.replace('media://', '');
    return `/api/media/${key}`;
  }
  return url;
};

// Contatore globale (non React state) delle ImageUpload dei moduli insight
// attualmente in compressione. PostForm non ha visibilità sullo stato locale
// di ogni singola istanza, ma deve poter bloccare il Save finché una di
// queste non ha finito — altrimenti il file compresso non è ancora nel
// campo nascosto e l'unico dato che parte è il base64 di anteprima, che il
// server rifiuta scrivendo un imageSrc vuoto invece di fallire il salvataggio.
let compressingModuleImageCount = 0;
export const isAnyModuleImageCompressing = () => compressingModuleImageCount > 0;

export function ImageUpload({ name, preview, onPreviewChange }: { name: string, preview: string | null, onPreviewChange: (v: string | null) => void }) {
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressing(true);
      compressingModuleImageCount++;

      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // Transparently replace the file in the input using DataTransfer
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(new File([compressedFile], file.name, { type: file.type }));
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onPreviewChange(reader.result as string);
        setIsCompressing(false);
        compressingModuleImageCount--;
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression failed:", error);
      setIsCompressing(false);
      compressingModuleImageCount--;
    }
  };

  return (
    <ImageDropInput
      name={name}
      inputRef={fileInputRef}
      previewUrl={preview}
      isCompressing={isCompressing}
      onSelect={handleFileChange}
      onRemove={() => onPreviewChange(null)}
      containerClassName={cn("rounded-2xl w-full", preview ? "aspect-video" : "")}
      label="Upload Thumbnail"
      helperText="Recommended: 1920x1080"
    />
  );
}

export function Toggle({ checked, onChange, disabled }: { checked: boolean, onChange: (v: boolean) => void, disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 rounded-full border-2 border-transparent transition-all duration-300",
        checked ? "bg-emerald-500" : "bg-red-500/30",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xl transition duration-300",
        checked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
}

export function OpacitySelector({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newValue = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    onChange(parseFloat(newValue.toFixed(2)));
  };

  return (
    <div className="space-y-4 py-2">
      <div className="flex justify-between items-center">
        <Label className="mb-0 text-black/80! dark:text-white/80!">{label}</Label>
        <div className="text-[10px] font-black text-black dark:text-white bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full border border-black/5 shadow-inner min-w-[45px] text-center transition-all duration-200">
          {(value * 100).toFixed(0)}%
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-3 w-full bg-black/10 dark:bg-white/5 rounded-full cursor-pointer group touch-none"
        onPointerDown={(e) => {
          handleMove(e.clientX);
          const handlePointerMove = (moveEvent: PointerEvent) => handleMove(moveEvent.clientX);
          const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
          };
          window.addEventListener('pointermove', handlePointerMove);
          window.addEventListener('pointerup', handlePointerUp);
        }}
      >
        {/* Track Glow */}
        <div
          className="absolute inset-0 rounded-full blur-[2px] opacity-20 bg-black dark:bg-white transition-all duration-150"
          style={{ width: `${value * 100}%` }}
        />

        {/* Progress Bar */}
        <div
          className="absolute top-0 left-0 h-full bg-linear-to-r from-black to-black/80 dark:from-white dark:to-white/80 rounded-full z-10 transition-all duration-150"
          style={{ width: `${value * 100}%`, opacity: 0.4 + value * 0.6 }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-7 w-7 bg-white dark:bg-black border-[5px] border-black dark:border-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing z-20 hover:scale-110 transition-all duration-150"
          style={{ left: `calc(${value * 100}% - 14px)` }}
        >
          <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function OpacityRangeSelector({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const val = Math.round(pct * 9 + 1) * 10;
    onChange(val);
  };

  return (
    <div className="space-y-3 py-1">
      <div className="flex justify-between items-center">
        <Label className="mb-0 text-black/80! dark:text-white/80!">{label}</Label>
        <div className="text-[10px] font-black text-black dark:text-white bg-black/10 dark:bg-white/10 px-2.5 py-0.5 rounded-full border border-black/5 shadow-inner min-w-[40px] text-center transition-all duration-200">
          {value}%
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-2.5 w-full bg-black/10 dark:bg-white/5 rounded-full cursor-pointer group touch-none"
        onPointerDown={(e) => {
          setIsDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          handleMove(e.clientX);
        }}
        onPointerMove={(e) => {
          if (isDragging) {
            handleMove(e.clientX);
          }
        }}
        onPointerUp={(e) => {
          setIsDragging(false);
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={(e) => {
          setIsDragging(false);
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
      >
        {/* Track Glow */}
        <div
          className={cn("absolute inset-0 rounded-full blur-[2px] opacity-20 bg-black dark:bg-white", !isDragging && "transition-all duration-150")}
          style={{ width: `${value}%` }}
        />

        {/* Progress Bar */}
        <div
          className={cn("absolute top-0 left-0 h-full bg-linear-to-r from-black to-black/80 dark:from-white dark:to-white/80 rounded-full z-10", !isDragging && "transition-all duration-150")}
          style={{ width: `${value}%` }}
        />

        {/* Thumb */}
        <div
          className={cn("absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white dark:bg-black border-4 border-black dark:border-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-20 hover:scale-110", isDragging ? "cursor-grabbing scale-110" : "cursor-grab", !isDragging && "transition-all duration-150")}
          style={{ left: `calc(${value}% - 10px)` }}
        />
      </div>
    </div>
  );
}

interface GranularColorPickerProps {
  label: string;
  value?: string;
  onChange: (newValue: string) => void;
  mode?: 'text' | 'bg';
  themeMode?: 'all' | 'light' | 'dark';
}

export function GranularColorPicker({ label, value = "", onChange, mode = 'text' }: GranularColorPickerProps) {
  let lightColor = "blue";
  let lightOpacity = 100;
  let darkColor = "white";
  let darkOpacity = 100;

  const prefix = mode === 'bg' ? 'bg-' : 'text-';
  const darkPrefix = mode === 'bg' ? 'dark:bg-' : 'dark:text-';

  const tokens = value ? value.split(" ") : [];

  const lightToken = tokens.find(t => t.startsWith(prefix));
  if (lightToken) {
    const regex = new RegExp(`${prefix}([a-zA-Z0-9\\-]+)(?:\\/(\\d+))?`);
    const match = lightToken.match(regex);
    if (match) {
      const parsedColor = reverseColorMap[match[1]] || match[1];
      if (SITE_COLORS.some(c => c.id === parsedColor)) {
        lightColor = parsedColor;
      }
      if (match[2]) {
        lightOpacity = parseInt(match[2], 10);
      }
    }
  }

  const darkToken = tokens.find(t => t.startsWith(darkPrefix));
  if (darkToken) {
    const regex = new RegExp(`${darkPrefix}([a-zA-Z0-9\\-]+)(?:\\/(\\d+))?`);
    const match = darkToken.match(regex);
    if (match) {
      const parsedColor = reverseColorMap[match[1]] || match[1];
      if (SITE_COLORS.some(c => c.id === parsedColor)) {
        darkColor = parsedColor;
      }
      if (match[2]) {
        darkOpacity = parseInt(match[2], 10);
      }
    }
  }

  const updateColor = (lc: string, lo: number, dc: string, do_: number) => {
    const lightTailwindColor = colorMap[lc] || lc;
    const darkTailwindColor = colorMap[dc] || dc;
    const lightClass = `${prefix}${lightTailwindColor}/${lo}`;
    const darkClass = `${darkPrefix}${darkTailwindColor}/${do_}`;
    onChange(`${lightClass} ${darkClass}`);
  };

  return (
    <div className="space-y-4 p-5 bg-black/2 dark:bg-white/2 border border-black/5 dark:border-white/5 rounded-2xl">
      <Label className="mb-2 text-black dark:text-white font-black">{label}</Label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-4 rounded-2xl bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/5 dark:border-white/5">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <h6 className="text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/50">Light Mode</h6>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <Select
              options={SITE_COLORS.map(c => ({ label: c.label, value: c.id }))}
              value={lightColor}
              onChange={(c) => updateColor(c, lightOpacity, darkColor, darkOpacity)}
            />
          </div>

          <OpacityRangeSelector
            label="Opacity"
            value={lightOpacity}
            onChange={(o) => updateColor(lightColor, o, darkColor, darkOpacity)}
          />
        </div>

        <div className="space-y-4 p-4 rounded-2xl bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/5 dark:border-white/5">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <h6 className="text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/50">Dark Mode</h6>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <Select
              options={SITE_COLORS.map(c => ({ label: c.label, value: c.id }))}
              value={darkColor}
              onChange={(c) => updateColor(lightColor, lightOpacity, c, darkOpacity)}
            />
          </div>

          <OpacityRangeSelector
            label="Opacity"
            value={darkOpacity}
            onChange={(o) => updateColor(lightColor, lightOpacity, darkColor, o)}
          />
        </div>
      </div>
    </div>
  );
}

export function GranularColorPickerButton({ label, value = "", onChange, mode = 'text' }: GranularColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  let lightColor = "blue";
  let lightOpacity = 100;
  let darkColor = "white";
  let darkOpacity = 100;

  const prefix = mode === 'bg' ? 'bg-' : 'text-';
  const darkPrefix = mode === 'bg' ? 'dark:bg-' : 'dark:text-';

  const tokens = value ? value.split(" ") : [];

  const lightToken = tokens.find(t => t.startsWith(prefix));
  if (lightToken) {
    const extracted = extractColorToken(lightToken, prefix);
    if (extracted) {
      if (extracted.raw.startsWith("#")) {
        lightColor = extracted.raw;
      } else {
        const parsedColor = reverseColorMap[extracted.raw] || extracted.raw;
        if (SITE_COLORS.some(c => c.id === parsedColor)) lightColor = parsedColor;
      }
      lightOpacity = extracted.opacity;
    }
  }

  const darkToken = tokens.find(t => t.startsWith(darkPrefix));
  if (darkToken) {
    const extracted = extractColorToken(darkToken, darkPrefix);
    if (extracted) {
      if (extracted.raw.startsWith("#")) {
        darkColor = extracted.raw;
      } else {
        const parsedColor = reverseColorMap[extracted.raw] || extracted.raw;
        if (SITE_COLORS.some(c => c.id === parsedColor)) darkColor = parsedColor;
      }
      darkOpacity = extracted.opacity;
    }
  }

  // Un colore custom è già l'hex letterale — Tailwind lo vede come valore
  // arbitrario ("text-[#ff3131]"), niente lookup in colorMap.
  const colorToken = (id: string) => (isCustomColor(id) ? `[${id}]` : (colorMap[id] || id));

  const updateColor = (lc: string, lo: number, dc: string, do_: number) => {
    const lightClass = `${prefix}${colorToken(lc)}/${lo}`;
    const darkClass = `${darkPrefix}${colorToken(dc)}/${do_}`;
    onChange(`${lightClass} ${darkClass}`);
  };

  const getBgClass = (colorId: string) => {
    if (colorId === 'black') return 'bg-black';
    if (colorId === 'white') return 'bg-white border border-gray-200';
    return `bg-${colorMap[colorId] || colorId}`;
  };

  return (
    <div className="space-y-2 relative">
      <Label>{label}</Label>
      <div className="mt-1">
        <Button
          type="button"
          variant="outline"
          roundness="lg"
          size="lg"
          fullWidth
          onClick={() => setIsOpen(true)}
          className=""
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div
                className={cn("w-5 h-5 rounded-full shadow-sm ring-2 ring-black dark:ring-white", !isCustomColor(lightColor) && getBgClass(lightColor))}
                style={{ opacity: lightOpacity / 100, ...(isCustomColor(lightColor) ? { backgroundColor: lightColor } : {}) }}
              />
              <div
                className={cn("w-5 h-5 rounded-full shadow-sm ring-2 ring-black dark:ring-white", !isCustomColor(darkColor) && getBgClass(darkColor))}
                style={{ opacity: darkOpacity / 100, ...(isCustomColor(darkColor) ? { backgroundColor: darkColor } : {}) }}
              />
            </div>
            <span>Choose Color</span>
          </div>
        </Button>
      </div>

      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <BaseModal.Header onClose={() => setIsOpen(false)}>
          {label}
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-12">
            {/* Light Mode */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse shadow-md" />
                <h6 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Light Mode</h6>
              </div>

              <div className="flex flex-wrap gap-3">
                {SITE_COLORS.map(c => (
                  <button
                    key={`light-${c.id}`}
                    type="button"
                    onClick={() => updateColor(c.id, lightOpacity, darkColor, darkOpacity)}
                    title={c.label}
                    className={cn(
                      "w-10 h-10 rounded-full shadow-md transition-all hover:scale-110 flex items-center justify-center border border-black/5 dark:border-white/5",
                      getBgClass(c.id),
                      lightColor === c.id ? "ring-4 ring-offset-2 ring-black dark:ring-white scale-110" : ""
                    )}
                  />
                ))}
                <HexColorPickerPopover
                  color={isCustomColor(lightColor) ? lightColor : "#000000"}
                  onChange={(hex) => updateColor(hex, lightOpacity, darkColor, darkOpacity)}
                  title="Custom color"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full shadow-md transition-all hover:scale-110 flex items-center justify-center border-2 border-dashed border-black/20 dark:border-white/20",
                      isCustomColor(lightColor) && "ring-4 ring-offset-2 ring-black dark:ring-white scale-110 border-solid"
                    )}
                    style={isCustomColor(lightColor) ? { backgroundColor: lightColor } : undefined}
                  >
                    <Palette className="h-4 w-4 text-black/50 dark:text-white/50" />
                  </div>
                </HexColorPickerPopover>
              </div>
              <OpacityRangeSelector
                label="Opacity"
                value={lightOpacity}
                onChange={(o) => updateColor(lightColor, o, darkColor, darkOpacity)}
              />
            </div>

            {/* Dark Mode */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse shadow-md" />
                <h6 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Dark Mode</h6>
              </div>

              <div className="flex flex-wrap gap-3">
                {SITE_COLORS.map(c => (
                  <button
                    key={`dark-${c.id}`}
                    type="button"
                    onClick={() => updateColor(lightColor, lightOpacity, c.id, darkOpacity)}
                    title={c.label}
                    className={cn(
                      "w-10 h-10 rounded-full shadow-md transition-all hover:scale-110 flex items-center justify-center border border-black/5 dark:border-white/5",
                      getBgClass(c.id),
                      darkColor === c.id ? "ring-4 ring-offset-2 ring-black dark:ring-white scale-110" : ""
                    )}
                  />
                ))}
                <HexColorPickerPopover
                  color={isCustomColor(darkColor) ? darkColor : "#000000"}
                  onChange={(hex) => updateColor(lightColor, lightOpacity, hex, darkOpacity)}
                  title="Custom color"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full shadow-md transition-all hover:scale-110 flex items-center justify-center border-2 border-dashed border-black/20 dark:border-white/20",
                      isCustomColor(darkColor) && "ring-4 ring-offset-2 ring-black dark:ring-white scale-110 border-solid"
                    )}
                    style={isCustomColor(darkColor) ? { backgroundColor: darkColor } : undefined}
                  >
                    <Palette className="h-4 w-4 text-black/50 dark:text-white/50" />
                  </div>
                </HexColorPickerPopover>
              </div>
              <OpacityRangeSelector
                label="Opacity"
                value={darkOpacity}
                onChange={(o) => updateColor(lightColor, lightOpacity, darkColor, o)}
              />
            </div>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </div>
        </BaseModal.Footer>
      </BaseModal>
    </div>
  );
}

const ColorGrid = memo(({ title, color, opacity, onColorChange, onOpChange }: any) => {
  const getBgClass = (colorId: string) => {
    if (colorId === 'black') return 'bg-black';
    if (colorId === 'white') return 'bg-white border border-gray-200';
    return `bg-${colorMap[colorId] || colorId}`;
  };

  return (
    <div className="space-y-3 p-4 bg-black/5 dark:bg-white/5 rounded-2xl w-full">
      <h6 className="text-[10px] font-black uppercase tracking-widest text-black/80 dark:text-white/80">{title}</h6>
      <div className="flex flex-wrap gap-2">
        {SITE_COLORS.map((c: any) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onColorChange(c.id)}
            title={c.label}
            className={cn(
              "w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 flex items-center justify-center border border-black/10 dark:border-white/10",
              getBgClass(c.id),
              color === c.id ? "ring-2 ring-offset-2 ring-black dark:ring-white scale-110" : ""
            )}
          />
        ))}
        <HexColorPickerPopover
          color={isCustomColor(color) ? color : "#000000"}
          onChange={(hex) => onColorChange(hex)}
          title="Custom color"
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full shadow-sm transition-all hover:scale-110 flex items-center justify-center border-2 border-dashed border-black/20 dark:border-white/20",
              isCustomColor(color) && "ring-2 ring-offset-2 ring-black dark:ring-white scale-110 border-solid"
            )}
            style={isCustomColor(color) ? { backgroundColor: color } : undefined}
          >
            <Palette className="h-3.5 w-3.5 text-black/50 dark:text-white/50" />
          </div>
        </HexColorPickerPopover>
      </div>
      <OpacityRangeSelector label="Opacity" value={opacity} onChange={onOpChange} />
    </div>
  );
});
ColorGrid.displayName = 'ColorGrid';

export function GranularBGColorPickerButton({ label, value = "", onChange, themeMode = 'light' }: GranularColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'solid' | 'gradient'>('solid');

  const prefix = themeMode === 'dark' ? 'dark:' : '';
  const [otherClasses, setOtherClasses] = useState('');

  // Solid State
  const [solidColor, setSolidColor] = useState('white');
  const [solidOpacity, setSolidOpacity] = useState(100);

  // Gradient State
  const [gradDir, setGradDir] = useState('b');
  const [gradFrom, setGradFrom] = useState('blue');
  const [gradFromOp, setGradFromOp] = useState(100);
  const [useVia, setUseVia] = useState(false);
  const [gradVia, setGradVia] = useState('white');
  const [gradViaOp, setGradViaOp] = useState(100);
  const [gradViaPos, setGradViaPos] = useState(50);
  const [gradTo, setGradTo] = useState('white');
  const [gradToOp, setGradToOp] = useState(100);

  // Initialize from value
  useEffect(() => {
    if (!value) return;
    const tokens = value.split(" ");

    const ourTokens: string[] = [];
    const otherTokens: string[] = [];

    tokens.forEach(t => {
      if (!t) return;
      if (themeMode === 'dark') {
        if (t.startsWith('dark:')) ourTokens.push(t.replace('dark:', ''));
        else otherTokens.push(t);
      } else {
        if (t.startsWith('dark:')) otherTokens.push(t);
        else ourTokens.push(t);
      }
    });

    setOtherClasses(otherTokens.join(' '));

    const hasGradient = ourTokens.some(t => t.includes('bg-linear-to-') || t.includes('bg-gradient-to-'));
    setActiveTab(hasGradient ? 'gradient' : 'solid');

    if (hasGradient) {
      const dirToken = ourTokens.find(t => t.startsWith('bg-linear-to-') || t.startsWith('bg-gradient-to-'));
      const fromToken = ourTokens.find(t => t.startsWith('from-'));
      // Stessa disambiguazione di lib/dynamicStyle.ts: "via-[30%]" (posizione)
      // vs "via-blue-500/80" o "via-[#ff3131]/80" (colore, anche custom).
      const viaPosToken = ourTokens.find(t => t.startsWith('via-') && /^via-\[?\d+%\]?$/.test(t));
      const viaToken = ourTokens.find(t => t.startsWith('via-') && t !== viaPosToken);
      const toToken = ourTokens.find(t => t.startsWith('to-'));

      const extract = (token: string, type: 'from' | 'via' | 'to') => {
        const extracted = extractColorToken(token, `${type}-`);
        if (extracted) {
          const c = extracted.raw.startsWith('#') ? extracted.raw : (reverseColorMap[extracted.raw] || extracted.raw);
          return { color: c, opacity: extracted.opacity };
        }
        return null;
      };

      if (dirToken) {
        const m = dirToken.match(/to-([a-z]+)$/);
        if (m) setGradDir(m[1]);
      }

      const f = fromToken ? extract(fromToken, 'from') : null;
      if (f) { setGradFrom(f.color); setGradFromOp(f.opacity); }

      const v = viaToken ? extract(viaToken, 'via') : null;
      if (v) { setUseVia(true); setGradVia(v.color); setGradViaOp(v.opacity); }

      if (viaPosToken) {
        const m = viaPosToken.match(/via-\[?(\d+)%\]?/);
        if (m) setGradViaPos(parseInt(m[1], 10));
      }

      const t = toToken ? extract(toToken, 'to') : null;
      if (t) { setGradTo(t.color); setGradToOp(t.opacity); }

    } else {
      const token = ourTokens.find(t => t.startsWith('bg-') && !t.includes('linear-to') && !t.includes('gradient-to'));
      if (token) {
        const extracted = extractColorToken(token, 'bg-');
        if (extracted) {
          setSolidColor(extracted.raw.startsWith('#') ? extracted.raw : (reverseColorMap[extracted.raw] || extracted.raw));
          setSolidOpacity(extracted.opacity);
        }
      }
    }
  }, [value, themeMode]);

  const emitChange = (
    tab: 'solid' | 'gradient',
    sC: string, sO: number,
    gDir: string,
    gF: string, gFO: number,
    uV: boolean, gV: string, gVO: number, gVP: number,
    gT: string, gTO: number
  ) => {
    // Colore custom (hex letterale, scelto via react-colorful) -> valore
    // Tailwind arbitrario "[#hex]", colore della palette -> token normale.
    const getC = (c: string) => (isCustomColor(c) ? `[${c}]` : (colorMap[c] || c));

    let generatedClasses = [];
    if (tab === 'solid') {
      generatedClasses = [`bg-${getC(sC)}/${sO}`];
    } else {
      generatedClasses = [
        `bg-linear-to-${gDir}`,
        `from-${getC(gF)}/${gFO}`,
        uV ? `via-${getC(gV)}/${gVO}` : '',
        (uV && gVP !== 50) ? `via-[${gVP}%]` : '',
        `to-${getC(gT)}/${gTO}`
      ].filter(Boolean);
    }

    const ourString = generatedClasses.map(c => `${prefix}${c}`).join(' ');

    // Combine with other classes
    const finalString = `${otherClasses} ${ourString}`.trim();
    onChange(finalString);
  };

  const notify = (overrides: Record<string, any> = {}) => {
    emitChange(
      overrides.tab ?? activeTab,
      overrides.sC ?? solidColor, overrides.sO ?? solidOpacity,
      overrides.gDir ?? gradDir,
      overrides.gF ?? gradFrom, overrides.gFO ?? gradFromOp,
      overrides.uV ?? useVia, overrides.gV ?? gradVia, overrides.gVO ?? gradViaOp, overrides.gVP ?? gradViaPos,
      overrides.gT ?? gradTo, overrides.gTO ?? gradToOp
    );
  };

  const getBgClass = (colorId: string) => {
    if (colorId === 'black') return 'bg-black';
    if (colorId === 'white') return 'bg-white border border-gray-200';
    return `bg-${colorMap[colorId] || colorId}`;
  };

  const hexMap: Record<string, string> = {
    'black': '#0C0B0A',
    'white': '#F5F6F9',
    'zinc': '#71717a',
    'blue': '#00cece',
    'red': '#ff3131',
    'green': '#00d27a',
    'stone': '#ada799',
    'bluegray': '#383a43',
    'ocra': '#D5943A',
  };

  const getRgba = (color: string, opacity: number) => {
    const hex = isCustomColor(color) ? color : (hexMap[color] || '#ffffff');
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const getGradientStyle = (
    dir: string,
    from: string, fromOp: number,
    useVia: boolean, via: string, viaOp: number, viaPos: number,
    to: string, toOp: number
  ) => {
    const angleMap: Record<string, string> = {
      't': '0deg', 'b': '180deg', 'l': '270deg', 'r': '90deg',
      'tr': '45deg', 'tl': '315deg', 'br': '135deg', 'bl': '225deg'
    };
    const angle = angleMap[dir] || '180deg';
    const cFrom = getRgba(from, fromOp);
    const cTo = getRgba(to, toOp);
    if (useVia) {
      const cVia = getRgba(via, viaOp);
      return { background: `linear-gradient(${angle}, ${cFrom} 0%, ${cVia} ${viaPos}%, ${cTo} 100%)` };
    }
    return { background: `linear-gradient(${angle}, ${cFrom} 0%, ${cTo} 100%)` };
  };

  return (
    <div className="space-y-2 relative">
      <Label>{label}</Label>
      <div className="mt-1">
        <Button
          type="button"
          variant="outline"
          roundness="lg"
          size="lg"
          fullWidth
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full shadow-sm ring-2 ring-black dark:ring-white",
                activeTab === 'solid' && !isCustomColor(solidColor) ? getBgClass(solidColor) : ""
              )}
              style={
                activeTab === 'gradient'
                  ? getGradientStyle(gradDir, gradFrom, gradFromOp, useVia, gradVia, gradViaOp, gradViaPos, gradTo, gradToOp)
                  : (isCustomColor(solidColor) ? { backgroundColor: solidColor } : undefined)
              }
            />
            <span>Choose Background</span>
          </div>
        </Button>
      </div>

      <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size="4xl">
        <BaseModal.Header onClose={() => setIsOpen(false)}>
          <div className="flex items-end justify-between w-full pr-4">
            <span className="text-2xl font-crenzo text-black dark:text-white">{label}</span>
            <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-xl w-64">
              <button
                type="button"
                onClick={() => { setActiveTab('solid'); notify({ tab: 'solid' }); }}
                className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all", activeTab === 'solid' ? "bg-white dark:bg-black shadow-sm text-black dark:text-white" : "text-black/50 dark:text-white/50")}
              >
                Solid Color
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('gradient'); notify({ tab: 'gradient' }); }}
                className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all", activeTab === 'gradient' ? "bg-white dark:bg-black shadow-sm text-black dark:text-white" : "text-black/50 dark:text-white/50")}
              >
                Gradient
              </button>
            </div>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            {activeTab === 'solid' ? (
              <div className="max-w-md mx-auto">
                <ColorGrid
                  title="Background"
                  color={solidColor} opacity={solidOpacity}
                  onColorChange={(c: string) => { setSolidColor(c); notify({ sC: c }); }}
                  onOpChange={(o: number) => { setSolidOpacity(o); notify({ sO: o }); }}
                />
              </div>
            ) : (
              <div className="space-y-4">

                <div className="grid grid-cols-3 gap-2">
                  {/* Direction row */}
                  <div className={cn("col-span-1 flex flex-col justify-center gap-3 p-3 border border-black/20 dark:border-white/20 rounded-2xl bg-black/5 dark:bg-white/5 transition-all duration-300", useVia ? "pb-11" : "")}>
                    <Label className="m-0 w-full text-center">Direction</Label>
                    <div className="grid grid-cols-4 gap-2 mx-auto">
                      {['t', 'b', 'l', 'r', 'tr', 'tl', 'br', 'bl'].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => { setGradDir(d); notify({ gDir: d }); }}
                          className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-xl font-bold uppercase text-xs transition-all",
                            gradDir === d ? "bg-black text-white dark:bg-white dark:text-black shadow-md" : "bg-white dark:bg-black/50 text-black/50 dark:text-white/50 hover:bg-white/50"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Preview Box */}
                  <div className="col-span-2 flex flex-col h-full">
                    <div
                      className="w-full flex-1 min-h-[80px] rounded-2xl relative transition-all duration-300"
                      style={getGradientStyle(gradDir, gradFrom, gradFromOp, useVia, gradVia, gradViaOp, gradViaPos, gradTo, gradToOp)}
                    />
                    {useVia && (
                      <div className="px-2 pt-2 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-black/50 dark:text-white/50">
                          <span>Via Position</span>
                          <span>{gradViaPos}%</span>
                        </div>
                        <input
                          type="range"
                          min="0" max="100"
                          value={gradViaPos}
                          onChange={(e) => { const v = parseInt(e.target.value); setGradViaPos(v); notify({ gVP: v }); }}
                          className="w-full accent-black dark:accent-white h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                </div>


                <div className="space-y-4">


                  {/* Colors columns/rows */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <ColorGrid title="From Color" color={gradFrom} opacity={gradFromOp} onColorChange={(c: string) => { setGradFrom(c); notify({ gF: c }); }} onOpChange={(o: number) => { setGradFromOp(o); notify({ gFO: o }); }} />

                    <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <h6 className="text-[10px] font-black uppercase tracking-widest text-black/80 dark:text-white/80">Use Via (Middle Color)</h6>
                        <Toggle checked={useVia} onChange={(v: boolean) => { setUseVia(v); notify({ uV: v }); }} />
                      </div>
                      {useVia && (
                        <div className="pt-2 border-t border-black/5 dark:border-white/5 mt-2">
                          <ColorGrid title="Via Color" color={gradVia} opacity={gradViaOp} onColorChange={(c: string) => { setGradVia(c); notify({ gV: c }); }} onOpChange={(o: number) => { setGradViaOp(o); notify({ gVO: o }); }} />
                        </div>
                      )}
                    </div>

                    <ColorGrid title="To Color" color={gradTo} opacity={gradToOp} onColorChange={(c: string) => { setGradTo(c); notify({ gT: c }); }} onOpChange={(o: number) => { setGradToOp(o); notify({ gTO: o }); }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Done
            </Button>
          </div>
        </BaseModal.Footer>
      </BaseModal>
    </div>
  );
}
