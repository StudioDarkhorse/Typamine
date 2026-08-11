"use client";

import React, { useMemo, useState } from "react";
import { Select } from "@/components/common/Select";
import { Input } from "@/components/common/Input";
import { Badge } from "@/components/common/Badge";
import { Ingredient } from "@/types";
import LabsHubHeader from "../LabsHubHeader";
import {
  ToolNav,
  Panel,
  PanelHeading,
  FieldLabel,
  CopyButton,
  slugifyVar,
  buildCatalogOptions,
} from "../labsShared";

interface TailwindGeneratorClientProps {
  initialIngredient: Ingredient | null;
  catalog: Ingredient[];
  ingredientSlug?: string;
}

export default function TailwindGeneratorClient({ initialIngredient, catalog, ingredientSlug }: TailwindGeneratorClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(initialIngredient?.slug || "");
  const [familyName, setFamilyName] = useState<string>(initialIngredient?.name || "");
  const [woff2Url, setWoff2Url] = useState<string>(initialIngredient?.variants?.[0]?.woff2Url || "");
  const [woffUrl, setWoffUrl] = useState<string>("");
  const [sfntUrl, setSfntUrl] = useState<string>("");

  const catalogOptions = useMemo(() => buildCatalogOptions(catalog), [catalog]);

  const applyCatalogSelection = (slug: string) => {
    setSelectedSlug(slug);
    if (!slug) return;
    const ing = catalog.find((i) => i.slug === slug);
    if (!ing) return;
    setFamilyName(ing.name);
    setWoff2Url(ing.variants?.[0]?.woff2Url || "");
    setWoffUrl("");
    setSfntUrl("");
  };

  const fontFaceCode = useMemo(() => {
    const srcLines: string[] = [];
    if (woff2Url) srcLines.push(`url('${woff2Url}') format('woff2')`);
    if (woffUrl) srcLines.push(`url('${woffUrl}') format('woff')`);
    if (sfntUrl) srcLines.push(`url('${sfntUrl}') format('truetype')`);

    if (srcLines.length === 0) {
      return `/* Add at least one font file URL below to embed a real @font-face block */`;
    }

    return `@font-face {
  font-family: '${familyName || "Font Name"}';
  src: ${srcLines.join(",\n       ")};
  font-display: swap;
}`;
  }, [familyName, woff2Url, woffUrl, sfntUrl]);

  const tailwindVar = slugifyVar(familyName);

  const tailwindConfigCode = `// tailwind.config.js — classic JS config
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        ${tailwindVar}: ['${familyName || "Font Name"}', 'sans-serif'],
      },
    },
  },
};`;

  const tailwindCssThemeCode = `/* globals.css — Tailwind v4+ CSS-first config */
@import "tailwindcss";

${fontFaceCode}

@theme {
  --font-${tailwindVar}: '${familyName || "Font Name"}', sans-serif;
}

/* Usage: <p className="font-${tailwindVar}">...</p> */`;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-8">
      <LabsHubHeader tool="tailwind" ingredientName={initialIngredient?.name} />
      <ToolNav ingredientSlug={ingredientSlug} />

      <Panel>
        <PanelHeading dot="bg-red glow-red" title="Tailwind Setup" />
        <p className="text-ocragray-800 dark:text-zinc-200 text-xs leading-relaxed">
          Register <span className="font-bold text-black dark:text-white">'{familyName || "Font Name"}'</span> as a
          utility class (<code className="font-mono text-[11px]">font-{tailwindVar}</code>) — pick the config style that
          matches your project.
        </p>

        <div className="space-y-1">
          <FieldLabel>Load from catalog</FieldLabel>
          <Select options={catalogOptions} value={selectedSlug} onChange={applyCatalogSelection} />
        </div>

        <Input label="Font Family Name" value={familyName} onChange={setFamilyName} placeholder="My Custom Font" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input label="WOFF2 URL" value={woff2Url} onChange={setWoff2Url} placeholder="https://.../font.woff2" />
          <Input label="WOFF URL" value={woffUrl} onChange={setWoffUrl} placeholder="https://.../font.woff" />
          <Input label="TTF URL" value={sfntUrl} onChange={setSfntUrl} placeholder="https://.../font.ttf" />
        </div>
      </Panel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Panel className="relative">
          <div className="flex items-center justify-between">
            <PanelHeading dot="bg-blue glow-cyan" title="Classic Config" />
            <Badge variant="outline">tailwind.config.js</Badge>
          </div>
          <p className="text-ocragray-800 dark:text-zinc-200 text-xs leading-relaxed">
            JS-based config — works on Tailwind v3, and on v4 in JS-config compatibility mode.
          </p>
          <div className="relative">
            <CopyButton text={tailwindConfigCode} />
            <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 font-haas text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
              {tailwindConfigCode}
            </pre>
          </div>
        </Panel>

        <Panel className="relative">
          <div className="flex items-center justify-between">
            <PanelHeading dot="bg-green" title="CSS-First Config" />
            <Badge variant="standard">Tailwind v4+</Badge>
          </div>
          <p className="text-ocragray-800 dark:text-zinc-200 text-xs leading-relaxed">
            Native <code className="font-mono text-[11px]">@theme</code> syntax — no config file, everything lives in CSS.
          </p>
          <div className="relative">
            <CopyButton text={tailwindCssThemeCode} />
            <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 font-haas text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
              {tailwindCssThemeCode}
            </pre>
          </div>
        </Panel>
      </div>
    </div>
  );
}
