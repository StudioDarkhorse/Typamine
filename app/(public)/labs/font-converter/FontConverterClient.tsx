"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zipSync } from "fflate";
import {
  Code2,
  UploadCloud,
  Loader2,
  AlertCircle,
  Download,
  FileType,
  WandSparkles,
  Sparkles,
  FileArchive,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Ingredient } from "@/types";
import LabsHubHeader from "../LabsHubHeader";
import {
  ToolNav,
  Panel,
  PanelHeading,
  ConvertedFormat,
  ConvertResult,
  formatBytes,
  base64ToBlob,
  base64ToUint8Array,
  MIME_BY_EXT,
  writeConverterHandoff,
} from "../labsShared";

interface FontConverterClientProps {
  ingredientSlug?: string;
  initialIngredient: Ingredient | null;
}

export default function FontConverterClient({ ingredientSlug, initialIngredient }: FontConverterClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);
  const [convertResult, setConvertResult] = useState<ConvertResult | null>(null);
  const [convertedFileName, setConvertedFileName] = useState<string>("font");
  const [autoLoadLabel, setAutoLoadLabel] = useState<string | null>(null);

  const runConversion = async (file: File) => {
    setIsConverting(true);
    setConvertError(null);
    setConvertResult(null);
    setConvertedFileName(file.name.replace(/\.[^/.]+$/, "") || "font");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/labs/convert-font", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Server returned status ${res.status}`);
      setConvertResult(data as ConvertResult);
    } catch (err: any) {
      setConvertError(err.message || "Conversion failed.");
    } finally {
      setIsConverting(false);
    }
  };

  // Arrivando da /ingredients/[slug] via ?ingredient=<slug>, il font è già
  // sul catalogo (woff2 su R2): lo scarichiamo e lo mandiamo in conversione
  // da soli invece di chiedere all'utente di ricaricarlo a mano.
  useEffect(() => {
    const woff2Url = initialIngredient?.variants?.[0]?.woff2Url;
    if (!woff2Url) return;

    let cancelled = false;
    (async () => {
      setAutoLoadLabel(initialIngredient!.name);
      try {
        const res = await fetch(woff2Url);
        if (!res.ok) throw new Error(`Failed to fetch catalog font (status ${res.status})`);
        const blob = await res.blob();
        if (cancelled) return;
        const file = new File([blob], `${initialIngredient!.slug}.woff2`, { type: "font/woff2" });
        await runConversion(file);
      } catch (err: any) {
        if (!cancelled) setConvertError(err.message || "Failed to auto-load catalog font.");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAutoLoadLabel(null);
      runConversion(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setAutoLoadLabel(null);
      runConversion(file);
    }
  };

  const downloadFormat = (fmt: ConvertedFormat) => {
    const blob = base64ToBlob(fmt.base64, MIME_BY_EXT[fmt.ext] || "font/ttf");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${convertedFileName}.${fmt.ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadAllAsZip = () => {
    if (!convertResult) return;
    const { woff2, woff, sfnt } = convertResult.formats;
    const zipped = zipSync({
      [`${convertedFileName}.woff2`]: base64ToUint8Array(woff2.base64),
      [`${convertedFileName}.woff`]: base64ToUint8Array(woff.base64),
      [`${convertedFileName}.${sfnt.ext}`]: base64ToUint8Array(sfnt.base64),
    });
    const blob = new Blob([zipped], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${convertedFileName}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const loadIntoFontFaceGenerator = () => {
    if (!convertResult) return;
    writeConverterHandoff(convertResult);
    router.push("/labs/font-face-generator");
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-8">
      <LabsHubHeader tool="converter" ingredientName={initialIngredient?.name} />
      <ToolNav ingredientSlug={ingredientSlug} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Panel>
          <PanelHeading dot="bg-blue glow-cyan" title="Format Converter" />
          <p className="text-ocragray-800 dark:text-zinc-200 text-xs leading-relaxed">
            Upload a .ttf, .otf, .woff or .woff2 file — get back all 3 formats, ready for a cascading @font-face.
          </p>

          {autoLoadLabel && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue/10 border border-blue/30 dark:bg-red/10 dark:border-red/30">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-blue/15 border border-blue/30 dark:border-red/30 flex items-center justify-center">
                <WandSparkles className="h-4 w-4 text-blue dark:text-red" />
              </div>
              <div className="min-w-0 text-xs leading-relaxed">
                <p className="font-bold text-black dark:text-white">
                  Auto-loaded "{autoLoadLabel}" from the catalog
                </p>
                <p className="text-ocragray-800 dark:text-zinc-200 mt-0.5">
                  Drop a different file below to convert something else.
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onClick={() => !isConverting && fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg py-12 text-center transition-colors cursor-pointer ${isDragging
                ? "border-black dark:border-white bg-black/5 dark:bg-white/5"
                : "border-zinc-300 dark:border-zinc-800 bg-black/[0.02] dark:bg-white/[0.02] hover:border-zinc-400 dark:hover:border-zinc-700"
              }`}
          >
            {isConverting ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                <span className="font-haas text-xs text-zinc-500">Converting...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="h-5 w-5 text-zinc-400" />
                <span className="font-haas text-xs text-zinc-500">Drop a font file here, or click to browse</span>
                <span className="font-haas text-[10px] text-zinc-400">MAX_SIZE: 10MB</span>
              </div>
            )}
          </div>

          {convertError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-px" />
              {convertError}
            </div>
          )}
        </Panel>

        <Panel>
          <PanelHeading dot="bg-green" title="Converted Files" />
          {!convertResult && !isConverting && (
            <p className="text-ocragray-800 dark:text-zinc-200 text-xs">
              Converted formats will show up here once you upload a font file.
            </p>
          )}

          {convertResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-end gap-2 flex-wrap">
                <Badge variant="monochrome">{convertResult.fontName}</Badge>
                {convertResult.isVariable && (
                  <Badge variant="standard" icon={<Sparkles className="h-3 w-3" />}>Variable</Badge>
                )}
              </div>

              <div className="space-y-2">
                {([
                  ["woff2", convertResult.formats.woff2],
                  ["woff", convertResult.formats.woff],
                  [convertResult.formats.sfnt.ext, convertResult.formats.sfnt],
                ] as const).map(([key, fmt]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black/[0.02] dark:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileType className="h-4 w-4 text-zinc-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-black dark:text-white uppercase">{fmt.ext}</p>
                        <p className="text-[10px] text-zinc-500">{formatBytes(fmt.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadFormat(fmt)}
                      className="p-2 rounded-md text-zinc-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
                      title={`Download .${fmt.ext}`}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="md" roundness="md" onClick={downloadAllAsZip} className="flex items-center justify-center gap-2">
                  <FileArchive className="h-3.5 w-3.5" />
                  Download .zip
                </Button>
                <Button variant="secondary" size="md" roundness="md" onClick={loadIntoFontFaceGenerator} className="flex items-center justify-center gap-2">
                  <Code2 className="h-3.5 w-3.5" />
                  Font Face Generator
                </Button>
              </div>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
