"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Select } from "@/components/common/Select";
import { Input } from "@/components/common/Input";
import LivePreview from "@/components/common/LivePreview";
import { Ingredient } from "@/types";
import LabsHubHeader from "../LabsHubHeader";
import {
  ToolNav,
  Panel,
  PanelHeading,
  FieldLabel,
  CopyButton,
  ToggleSwitch,
  FONT_DISPLAY_OPTIONS,
  STYLE_OPTIONS,
  SFNT_FORMAT_OPTIONS,
  FontDisplay,
  SfntFormat,
  buildCatalogOptions,
  base64ToBlob,
  readAndClearConverterHandoff,
} from "../labsShared";

interface FontFaceGeneratorClientProps {
  initialIngredient: Ingredient | null;
  catalog: Ingredient[];
  ingredientSlug?: string;
}

export default function FontFaceGeneratorClient({ initialIngredient, catalog, ingredientSlug }: FontFaceGeneratorClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>(initialIngredient?.slug || "");
  const [familyName, setFamilyName] = useState<string>(initialIngredient?.name || "");
  const [woff2Url, setWoff2Url] = useState<string>(initialIngredient?.variants?.[0]?.woff2Url || "");
  const [woffUrl, setWoffUrl] = useState<string>("");
  const [sfntUrl, setSfntUrl] = useState<string>("");
  const [sfntFormat, setSfntFormat] = useState<SfntFormat>("truetype");
  const [weight, setWeight] = useState<string>("400");
  const [style, setStyle] = useState<string>("normal");
  const [fontDisplay, setFontDisplay] = useState<FontDisplay>("swap");
  const [includeLocal, setIncludeLocal] = useState(false);
  const [localName, setLocalName] = useState<string>("");

  // Handoff dal Format Converter (route diversa): se arriva con formati appena
  // convertiti in sessionStorage, precompila i campi con i blob URL locali.
  useEffect(() => {
    const handoff = readAndClearConverterHandoff();
    if (!handoff) return;
    setSelectedSlug("");
    setFamilyName(handoff.fontName);
    setWoff2Url(URL.createObjectURL(base64ToBlob(handoff.formats.woff2.base64, "font/woff2")));
    setWoffUrl(URL.createObjectURL(base64ToBlob(handoff.formats.woff.base64, "font/woff")));
    setSfntUrl(URL.createObjectURL(base64ToBlob(handoff.formats.sfnt.base64, "font/" + handoff.formats.sfnt.ext)));
    setSfntFormat(handoff.formats.sfnt.ext === "otf" ? "opentype" : "truetype");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // local() va prima nella cascata: se l'utente ha già il font installato
    // sul sistema, il browser lo usa direttamente saltando il download.
    if (includeLocal) {
      const name = (localName.trim() || familyName || "").trim();
      if (name) srcLines.push(`local('${name}')`);
    }
    if (woff2Url) srcLines.push(`url('${woff2Url}') format('woff2')`);
    if (woffUrl) srcLines.push(`url('${woffUrl}') format('woff')`);
    if (sfntUrl) srcLines.push(`url('${sfntUrl}') format('${sfntFormat}')`);

    if (srcLines.length === 0) {
      return `/* Add at least one font file URL to generate the cascade */`;
    }

    return `@font-face {
  font-family: '${familyName || "Font Name"}';
  src: ${srcLines.join(",\n       ")};
  font-weight: ${weight || "400"};
  font-style: ${style};
  font-display: ${fontDisplay};
}`;
  }, [familyName, includeLocal, localName, woff2Url, woffUrl, sfntUrl, sfntFormat, weight, style, fontDisplay]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-8">
      <LabsHubHeader tool="fontface" ingredientName={initialIngredient?.name} />
      <ToolNav ingredientSlug={ingredientSlug} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Panel>
          <PanelHeading dot="bg-red glow-red" title="@font-face Generator" />
          <p className="text-ocragray-800 dark:text-zinc-200 text-xs leading-relaxed">
            Build a single cascading declaration — WOFF2 first, older formats loaded only as fallback.
          </p>

          <div className="space-y-1">
            <FieldLabel>Load from catalog</FieldLabel>
            <Select options={catalogOptions} value={selectedSlug} onChange={applyCatalogSelection} />
          </div>

          <Input label="Font Family Name" value={familyName} onChange={setFamilyName} placeholder="My Custom Font" />

          <ToggleSwitch
            checked={includeLocal}
            onChange={setIncludeLocal}
            label="Font is installed locally"
            helperText="Adds local() first in the cascade — skips the download for visitors who already have it."
          />
          {includeLocal && (
            <Input
              label="Local Font Name (optional)"
              value={localName}
              onChange={setLocalName}
              placeholder={familyName || "Defaults to Font Family Name"}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Weight" value={weight} onChange={setWeight} placeholder="400 or 100 900" />
            <div>
              <FieldLabel>Style</FieldLabel>
              <Select options={STYLE_OPTIONS} value={style} onChange={setStyle} />
            </div>
          </div>

          <div className="space-y-1">
            <FieldLabel>Font Display</FieldLabel>
            <Select options={FONT_DISPLAY_OPTIONS} value={fontDisplay} onChange={(v) => setFontDisplay(v as FontDisplay)} />
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-3">
            <FieldLabel>Cascade Sources (best format first)</FieldLabel>
            <Input label="WOFF2 URL" value={woff2Url} onChange={setWoff2Url} placeholder="https://.../font.woff2" />
            <Input label="WOFF URL (fallback)" value={woffUrl} onChange={setWoffUrl} placeholder="https://.../font.woff" />
            <div className="grid grid-cols-[1fr_110px] gap-2 items-end">
              <Input label="TTF / OTF URL (fallback)" value={sfntUrl} onChange={setSfntUrl} placeholder="https://.../font.ttf" />
              <Select options={SFNT_FORMAT_OPTIONS} value={sfntFormat} onChange={(v) => setSfntFormat(v as SfntFormat)} />
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="relative">
            <PanelHeading dot="bg-blue glow-cyan" title="Generated CSS" />
            <div className="relative">
              <CopyButton text={fontFaceCode} />
              <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 font-haas text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                {fontFaceCode}
              </pre>
            </div>
          </Panel>

          {woff2Url && familyName && (
            <Panel>
              <PanelHeading dot="bg-green" title="Live Preview" />
              <LivePreview
                fontName={familyName}
                fontUrl={woff2Url}
                initialText="The quick brown fox jumps over the lazy dog"
                initialSize={28}
                showToolbar={false}
                showControls={false}
                compact
              />
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
