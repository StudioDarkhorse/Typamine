"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  UploadCloud,
  Loader2,
  ShieldCheck,
  Type as TypeIcon,
} from "lucide-react";
import { Select } from "@/components/common/Select";
import { Input } from "@/components/common/Input";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import HexColorPickerPopover from "@/components/common/HexColorPickerPopover";
import { Ingredient } from "@/types";
import {
  analyzeFontDisplay,
  analyzeFontSize,
  analyzeFontStack,
  analyzeFontWeight,
  evaluateContrast,
  formatRatio,
  MAX_LINE_CHARS_AAA,
  REFLOW_WIDTH_PX,
  RESIZE_FACTOR,
  TEXT_SPACING_OVERRIDES,
  Verdict,
} from "@/lib/wcag";
import LabsHubHeader from "../LabsHubHeader";
import {
  ToolNav,
  Panel,
  PanelHeading,
  FieldLabel,
  CopyButton,
  buildCatalogOptions,
} from "../labsShared";
import { glyphDifference, inkRatioVsReference, loadFontFace, measureText } from "./wcagMeasure";

interface WcagCheckerClientProps {
  initialIngredient: Ingredient | null;
  catalog: Ingredient[];
  ingredientSlug?: string;
}

interface AuditItem {
  id: string;
  criterion: string;
  level: "AA" | "AAA" | "Advisory";
  verdict: Verdict;
  measured?: string;
  detail: string;
}

interface AuditSection {
  title: string;
  items: AuditItem[];
}

const DEFAULT_SAMPLE =
  "Typography is the craft of endowing human language with a durable visual form. A well-set paragraph should stay readable when the reader zooms in, overrides your spacing, or replaces your typeface entirely — Illustrated 1000 words, O0 and Il1 included.";

const DEFAULT_STACK = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => ({
  label: String(w),
  value: String(w),
}));

const FONT_DISPLAY_OPTIONS = ["swap", "fallback", "optional", "auto", "block"].map((v) => ({
  label: v.toUpperCase(),
  value: v,
}));

const CONTAINER_WIDTH_OPTIONS = [
  { label: "320px — mobile (reflow)", value: "320" },
  { label: "480px — small", value: "480" },
  { label: "640px — reading column", value: "640" },
  { label: "800px — wide column", value: "800" },
  { label: "1024px — full width", value: "1024" },
];

type PreviewMode = "normal" | "zoom" | "spacing" | "override";

const PREVIEW_MODES: { label: string; value: PreviewMode; hint: string }[] = [
  { label: "Baseline", value: "normal", hint: "Rendering as configured" },
  { label: "200% zoom", value: "zoom", hint: "WCAG 1.4.4 Resize Text" },
  { label: "Text spacing", value: "spacing", hint: "WCAG 1.4.12 override" },
  { label: "Arial override", value: "override", hint: "User font substitution" },
];

const VERDICT_STYLES: Record<Verdict, { icon: React.ReactNode; className: string; label: string }> = {
  pass: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    className: "text-green border-green/40 bg-green/10",
    label: "Pass",
  },
  fail: {
    icon: <XCircle className="h-4 w-4" />,
    className: "text-red border-red/40 bg-red/10",
    label: "Fail",
  },
  warn: {
    icon: <AlertTriangle className="h-4 w-4" />,
    className: "text-amber-500 border-amber-500/40 bg-amber-500/10",
    label: "Warning",
  },
  info: {
    icon: <Info className="h-4 w-4" />,
    className: "text-blue dark:text-zinc-300 border-zinc-400/40 bg-zinc-400/10",
    label: "Info",
  },
};

function VerdictPill({ verdict }: { verdict: Verdict }) {
  const style = VERDICT_STYLES[verdict];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider shrink-0 ${style.className}`}
    >
      {style.icon}
      {style.label}
    </span>
  );
}

// Slider "grezzo" coerente col resto dei tool labs: input range nativo, label
// e valore corrente sopra.
function RangeControl({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <FieldLabel>{label}</FieldLabel>
        <span className="text-[10px] font-bold text-black dark:text-white tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue dark:accent-red"
      />
    </div>
  );
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="space-y-1">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-2">
        <HexColorPickerPopover color={value} onChange={onChange} title={label}>
          <button
            type="button"
            aria-label={`${label} — open color picker`}
            className="h-8 w-8 rounded-md border border-zinc-300 dark:border-zinc-700 shrink-0"
            style={{ backgroundColor: value }}
          />
        </HexColorPickerPopover>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1.5 font-mono text-xs uppercase text-black dark:text-white outline-none focus:border-blue dark:focus:border-red transition-colors"
        />
      </div>
    </div>
  );
}

export default function WcagCheckerClient({
  initialIngredient,
  catalog,
  ingredientSlug,
}: WcagCheckerClientProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [selectedSlug, setSelectedSlug] = useState(initialIngredient?.slug || "");
  const [fontName, setFontName] = useState(initialIngredient?.name || "");
  const [fontUrl, setFontUrl] = useState(initialIngredient?.variants?.[0]?.woff2Url || "");
  const [fontLoadIndex, setFontLoadIndex] = useState(0);
  const [fontState, setFontState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  const [textColor, setTextColor] = useState("#111111");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [fontSizePx, setFontSizePx] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacingEm, setLetterSpacingEm] = useState(0);
  const [wordSpacingEm, setWordSpacingEm] = useState(0);
  const [containerWidth, setContainerWidth] = useState(640);
  const [sampleText, setSampleText] = useState(DEFAULT_SAMPLE);
  const [fallbackStack, setFallbackStack] = useState(DEFAULT_STACK);
  const [fontDisplay, setFontDisplay] = useState("swap");

  const [previewMode, setPreviewMode] = useState<PreviewMode>("normal");
  const [sections, setSections] = useState<AuditSection[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);

  const catalogOptions = useMemo(() => buildCatalogOptions(catalog), [catalog]);

  // Ogni caricamento registra una famiglia con nome nuovo: riusare lo stesso
  // nome accumulerebbe più @font-face sotto la stessa famiglia e il browser
  // continuerebbe a disegnare il primo file caricato.
  const previewFamily = `WcagPreview_${fontLoadIndex}`;
  const renderedStack = fontState === "ready" ? `'${previewFamily}', ${fallbackStack}` : fallbackStack;

  useEffect(() => {
    if (!fontUrl) {
      setFontState("idle");
      return;
    }
    let cancelled = false;
    setFontState("loading");
    const family = `WcagPreview_${fontLoadIndex + 1}`;
    (async () => {
      const ok = await loadFontFace(family, fontUrl);
      if (cancelled) return;
      if (ok) {
        setFontLoadIndex((index) => index + 1);
        setFontState("ready");
      } else {
        setFontState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
    // fontLoadIndex volutamente fuori dalle dipendenze: lo incrementiamo noi
    // qui dentro, includerlo creerebbe un loop di caricamenti.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontUrl]);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    []
  );

  const applyCatalogSelection = (slug: string) => {
    setSelectedSlug(slug);
    if (!slug) {
      setFontName("");
      setFontUrl("");
      return;
    }
    const ingredient = catalog.find((item) => item.slug === slug);
    if (!ingredient) return;
    setFontName(ingredient.name);
    setFontUrl(ingredient.variants?.[0]?.woff2Url || "");
  };

  const handleUpload = (file: File) => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setSelectedSlug("");
    setFontName(file.name.replace(/\.[^/.]+$/, ""));
    setFontUrl(url);
  };

  const runAudit = useCallback(() => {
    setIsAuditing(true);

    const baseMeasure = {
      text: sampleText,
      fontFamily: renderedStack,
      fontSizePx,
      fontWeight,
      lineHeight,
      letterSpacingEm,
      wordSpacingEm,
      widthPx: containerWidth,
    };

    const baseline = measureText(baseMeasure);
    const zoomed = measureText({ ...baseMeasure, fontSizePx: fontSizePx * RESIZE_FACTOR });
    const spaced = measureText({
      ...baseMeasure,
      lineHeight: Math.max(lineHeight, TEXT_SPACING_OVERRIDES.lineHeight),
      letterSpacingEm: Math.max(letterSpacingEm, TEXT_SPACING_OVERRIDES.letterSpacingEm),
      wordSpacingEm: Math.max(wordSpacingEm, TEXT_SPACING_OVERRIDES.wordSpacingEm),
    });
    const reflowed = measureText({ ...baseMeasure, widthPx: REFLOW_WIDTH_PX });
    const substituted = measureText({ ...baseMeasure, fontFamily: "Arial, sans-serif" });

    const contrast = evaluateContrast(textColor, bgColor, fontSizePx, fontWeight);
    const stack = analyzeFontStack(renderedStack);
    const display = analyzeFontDisplay(fontDisplay);
    const weight = analyzeFontWeight(fontWeight);
    const size = analyzeFontSize(fontSizePx);

    const heightGrowth = (value: number) =>
      baseline.height > 0 ? Math.round(((value - baseline.height) / baseline.height) * 100) : 0;

    const substitutionDelta = Math.abs(heightGrowth(substituted.height));

    // Glifi: se il font custom non è caricato i test girerebbero sul
    // fallback e direbbero qualcosa su Arial, non sul font in esame.
    const glyphFamily = fontState === "ready" ? `'${previewFamily}'` : "";
    const il = glyphFamily ? glyphDifference("I", "l", glyphFamily, fontWeight) : null;
    const l1 = glyphFamily ? glyphDifference("l", "1", glyphFamily, fontWeight) : null;
    const o0 = glyphFamily ? glyphDifference("O", "0", glyphFamily, fontWeight) : null;
    const rnm = glyphFamily ? glyphDifference("rn", "m", glyphFamily, fontWeight) : null;
    const inkRatio = glyphFamily ? inkRatioVsReference("Handgloves", glyphFamily, fontWeight) : null;

    const glyphVerdict = (value: number | null): Verdict => {
      if (value === null) return "info";
      if (value < 0.12) return "fail";
      if (value < 0.25) return "warn";
      return "pass";
    };

    const glyphItem = (id: string, label: string, pair: string, value: number | null): AuditItem => ({
      id,
      criterion: `Glyph distinguishability — ${label}`,
      level: "Advisory",
      verdict: glyphVerdict(value),
      measured: value === null ? "font not loaded" : `${Math.round(value * 100)}% shape difference`,
      detail:
        value === null
          ? "Load a font file to run the glyph comparison — the fallback stack would be measured instead."
          : value < 0.12
            ? `${pair} render almost identically: high risk of misreading codes, IDs and numbers.`
            : value < 0.25
              ? `${pair} are close in shape — acceptable for display sizes, risky for data and code.`
              : `${pair} are clearly distinguishable.`,
    });

    const nextSections: AuditSection[] = [
      {
        title: "Color contrast",
        items: [
          {
            id: "1.4.3",
            criterion: "1.4.3 Contrast (Minimum)",
            level: "AA",
            verdict: contrast.passesAA ? "pass" : "fail",
            measured: `${formatRatio(contrast.ratio)} — required ${contrast.requiredAA}:1${contrast.large ? " (large text)" : ""}`,
            detail: contrast.passesAA
              ? `Text at ${fontSizePx}px / ${fontWeight} against this background meets the AA threshold.`
              : `Below the AA threshold of ${contrast.requiredAA}:1. Darken the text or lighten the background until the ratio is met.`,
          },
          {
            id: "1.4.6",
            criterion: "1.4.6 Contrast (Enhanced)",
            level: "AAA",
            verdict: contrast.passesAAA ? "pass" : contrast.passesAA ? "warn" : "fail",
            measured: `${formatRatio(contrast.ratio)} — required ${contrast.requiredAAA}:1`,
            detail: contrast.passesAAA
              ? "Also clears the enhanced AAA threshold."
              : contrast.passesAA
                ? "Meets AA but not AAA — relevant if the project targets enhanced conformance."
                : `Well below the enhanced threshold: AA fails first, at ${contrast.requiredAA}:1.`,
          },
          {
            id: "thin-stroke",
            criterion: "Thin stroke legibility (1.4.3 note)",
            level: "Advisory",
            verdict:
              inkRatio === null
                ? weight.verdict
                : inkRatio < 0.6
                  ? "fail"
                  : inkRatio < 0.8
                    ? "warn"
                    : weight.verdict,
            measured:
              inkRatio === null
                ? `weight ${fontWeight}`
                : `${Math.round(inkRatio * 100)}% ink density vs Arial at the same weight`,
            detail:
              inkRatio === null
                ? weight.message
                : inkRatio < 0.8
                  ? "Strokes are markedly thinner than a reference grotesque: perceived contrast drops below the measured ratio, especially on low-quality displays."
                  : weight.message,
          },
        ],
      },
      {
        title: "Layout resilience",
        items: [
          {
            id: "1.4.4",
            criterion: "1.4.4 Resize Text (200%)",
            level: "AA",
            verdict: zoomed.overflowsX ? "fail" : "pass",
            measured: `${Math.round(zoomed.scrollWidth)}px content in ${containerWidth}px — height +${heightGrowth(zoomed.height)}%`,
            detail: zoomed.overflowsX
              ? "At 200% the text no longer fits horizontally: content gets clipped or forces a horizontal scroll."
              : `Text reflows at 200% without horizontal overflow. The block grows to ${Math.round(zoomed.height)}px — the container must be free to grow (no fixed px height).`,
          },
          {
            id: "1.4.12",
            criterion: "1.4.12 Text Spacing",
            level: "AA",
            verdict: spaced.overflowsX ? "fail" : "pass",
            measured: `line-height 1.5 / letter 0.12em / word 0.16em — height +${heightGrowth(spaced.height)}%`,
            detail: spaced.overflowsX
              ? "With the user spacing overrides applied the text overflows its container: content is lost."
              : `Spacing overrides are absorbed without horizontal loss. Reserve at least ${Math.round(spaced.height)}px of vertical room (baseline is ${Math.round(baseline.height)}px) or the block will clip in a fixed-height box.`,
          },
          {
            id: "1.4.10",
            criterion: "1.4.10 Reflow (320px)",
            level: "AA",
            verdict: reflowed.overflowsX ? "fail" : "pass",
            measured: `${Math.round(reflowed.scrollWidth)}px content at ${REFLOW_WIDTH_PX}px viewport — ${reflowed.lineCount} lines`,
            detail: reflowed.overflowsX
              ? "At 320px an unbreakable run (long word, URL, wide glyphs) forces horizontal scrolling."
              : "Content reflows into a 320px column without horizontal scrolling.",
          },
          {
            id: "font-substitution",
            criterion: "User font substitution (Arial override)",
            level: "Advisory",
            verdict: substitutionDelta > 25 ? "fail" : substitutionDelta > 12 ? "warn" : "pass",
            measured: `${substitutionDelta}% height delta vs Arial — ${baseline.lineCount} vs ${substituted.lineCount} lines`,
            detail:
              substitutionDelta > 12
                ? "Readers who force a high-legibility font (OpenDyslexic, Verdana, Arial) get a noticeably different block height. Containers sized on this font's metrics will break."
                : "The block height barely moves when the typeface is swapped: the layout is not calibrated on this font's metrics.",
          },
          {
            id: "1.4.8",
            criterion: "1.4.8 Visual Presentation (line length & leading)",
            level: "AAA",
            verdict:
              baseline.charsPerLine <= MAX_LINE_CHARS_AAA && lineHeight >= 1.5
                ? "pass"
                : baseline.charsPerLine > MAX_LINE_CHARS_AAA && lineHeight < 1.5
                  ? "fail"
                  : "warn",
            measured: `~${baseline.charsPerLine} chars/line — line-height ${lineHeight}`,
            detail: `AAA asks for lines no longer than ${MAX_LINE_CHARS_AAA} characters and line spacing of at least 1.5 within paragraphs.`,
          },
          {
            id: "1.4.5",
            criterion: "1.4.5 Images of Text",
            level: "AA",
            verdict: "pass",
            measured: "real text, webfont-rendered",
            detail:
              "The sample is live text with a webfont, not a raster image: it scales, reflows and is exposed to assistive technology. Rasterising this block would fail the criterion.",
          },
        ],
      },
      {
        title: "Loading & fallback",
        items: [
          {
            id: "stack",
            criterion: "Fallback stack",
            level: "Advisory",
            verdict: stack.verdict,
            measured: `${stack.families.length} families${stack.endsWithGeneric ? ", generic last" : ""}`,
            detail: stack.message,
          },
          {
            id: "font-display",
            criterion: "font-display (FOIT)",
            level: "Advisory",
            verdict: display.verdict,
            measured: `font-display: ${display.value}`,
            detail: display.message,
          },
          {
            id: "size",
            criterion: "Body text size",
            level: "Advisory",
            verdict: size.verdict,
            measured: `${fontSizePx}px`,
            detail: size.message,
          },
        ],
      },
      {
        title: "Glyph legibility",
        items: [
          glyphItem("glyph-il", "Capital I vs lowercase l", "I and l", il),
          glyphItem("glyph-l1", "Lowercase l vs digit 1", "l and 1", l1),
          glyphItem("glyph-o0", "Letter O vs digit 0", "O and 0", o0),
          glyphItem("glyph-rnm", "rn vs m", "rn and m", rnm),
        ],
      },
    ];

    setSections(nextSections);
    setIsAuditing(false);
  }, [
    bgColor,
    containerWidth,
    fontDisplay,
    fontSizePx,
    fontState,
    fontWeight,
    letterSpacingEm,
    lineHeight,
    previewFamily,
    renderedStack,
    sampleText,
    textColor,
    wordSpacingEm,
  ]);

  // Primo audit al mount e ad ogni cambio di parametro: il tool è già tutto
  // client-side, non c'è motivo di far premere un bottone per vedere il
  // risultato aggiornato.
  useEffect(() => {
    const id = window.setTimeout(runAudit, 120);
    return () => window.clearTimeout(id);
  }, [runAudit]);

  const allItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const normative = useMemo(() => allItems.filter((item) => item.level === "AA"), [allItems]);
  const failures = allItems.filter((item) => item.verdict === "fail");
  const warnings = allItems.filter((item) => item.verdict === "warn");
  const normativeFailures = normative.filter((item) => item.verdict === "fail");
  const score =
    normative.length > 0
      ? Math.round(((normative.length - normativeFailures.length) / normative.length) * 100)
      : 0;

  const reportText = useMemo(() => {
    const header = [
      `WCAG audit — ${fontName || "Custom font"}`,
      `Font size ${fontSizePx}px / weight ${fontWeight} / line-height ${lineHeight}`,
      `Colors ${textColor} on ${bgColor}`,
      `Container ${containerWidth}px`,
      `AA criteria passed: ${normative.length - normativeFailures.length}/${normative.length}`,
      "",
    ];
    const body = sections.flatMap((section) => [
      `## ${section.title}`,
      ...section.items.map(
        (item) =>
          `[${item.verdict.toUpperCase()}] ${item.criterion} (${item.level})${item.measured ? ` — ${item.measured}` : ""}\n    ${item.detail}`
      ),
      "",
    ]);
    return [...header, ...body].join("\n");
  }, [
    bgColor,
    containerWidth,
    fontName,
    fontSizePx,
    fontWeight,
    lineHeight,
    normative.length,
    normativeFailures.length,
    sections,
    textColor,
  ]);

  const previewStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    fontFamily: previewMode === "override" ? "Arial, sans-serif" : renderedStack,
    fontSize: previewMode === "zoom" ? fontSizePx * RESIZE_FACTOR : fontSizePx,
    fontWeight,
    lineHeight: previewMode === "spacing" ? Math.max(lineHeight, TEXT_SPACING_OVERRIDES.lineHeight) : lineHeight,
    letterSpacing: `${previewMode === "spacing" ? Math.max(letterSpacingEm, TEXT_SPACING_OVERRIDES.letterSpacingEm) : letterSpacingEm}em`,
    wordSpacing: `${previewMode === "spacing" ? Math.max(wordSpacingEm, TEXT_SPACING_OVERRIDES.wordSpacingEm) : wordSpacingEm}em`,
    maxWidth: containerWidth,
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-8">
      <LabsHubHeader tool="wcag" ingredientName={initialIngredient?.name} />
      <ToolNav ingredientSlug={ingredientSlug} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-8">
          <Panel>
            <PanelHeading dot="bg-blue glow-cyan" title="Typeface" />

            <div className="space-y-1">
              <FieldLabel>Load from catalog</FieldLabel>
              <Select options={catalogOptions} value={selectedSlug} onChange={applyCatalogSelection} />
            </div>

            <input
              ref={uploadRef}
              type="file"
              accept=".woff2,.woff,.ttf,.otf,font/woff2,font/woff,font/ttf,font/otf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            <Button variant="outline" size="sm" onClick={() => uploadRef.current?.click()}>
              <UploadCloud className="h-4 w-4" />
              Upload a font file
            </Button>

            <div className="flex items-center gap-2 text-[11px]">
              {fontState === "loading" && (
                <span className="flex items-center gap-1.5 text-ocragray-800 dark:text-zinc-300">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading font…
                </span>
              )}
              {fontState === "ready" && (
                <span className="flex items-center gap-1.5 text-green">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {fontName || "Font"} loaded
                </span>
              )}
              {fontState === "error" && (
                <span className="flex items-center gap-1.5 text-red">
                  <XCircle className="h-3.5 w-3.5" /> Font blocked (CORS or unsupported format) — testing the fallback
                  stack
                </span>
              )}
              {fontState === "idle" && (
                <span className="flex items-center gap-1.5 text-ocragray-800 dark:text-zinc-300">
                  <TypeIcon className="h-3.5 w-3.5" /> No webfont: testing the fallback stack
                </span>
              )}
            </div>

            <Input label="Fallback stack" value={fallbackStack} onChange={setFallbackStack} />

            <div className="space-y-1">
              <FieldLabel>font-display</FieldLabel>
              <Select options={FONT_DISPLAY_OPTIONS} value={fontDisplay} onChange={setFontDisplay} />
            </div>
          </Panel>

          <Panel>
            <PanelHeading dot="bg-red glow-red" title="Typography" />

            <RangeControl label="Font size" value={fontSizePx} min={8} max={72} suffix="px" onChange={setFontSizePx} />

            <div className="space-y-1">
              <FieldLabel>Font weight</FieldLabel>
              <Select
                options={WEIGHT_OPTIONS}
                value={String(fontWeight)}
                onChange={(v) => setFontWeight(Number(v))}
              />
            </div>

            <RangeControl
              label="Line height"
              value={lineHeight}
              min={1}
              max={2.5}
              step={0.05}
              onChange={setLineHeight}
            />
            <RangeControl
              label="Letter spacing"
              value={letterSpacingEm}
              min={-0.05}
              max={0.3}
              step={0.01}
              suffix="em"
              onChange={setLetterSpacingEm}
            />
            <RangeControl
              label="Word spacing"
              value={wordSpacingEm}
              min={0}
              max={0.5}
              step={0.01}
              suffix="em"
              onChange={setWordSpacingEm}
            />

            <div className="space-y-1">
              <FieldLabel>Container width</FieldLabel>
              <Select
                options={CONTAINER_WIDTH_OPTIONS}
                value={String(containerWidth)}
                onChange={(v) => setContainerWidth(Number(v))}
              />
            </div>
          </Panel>

          <Panel>
            <PanelHeading dot="bg-green" title="Colors" />
            <ColorControl label="Text color" value={textColor} onChange={setTextColor} />
            <ColorControl label="Background color" value={bgColor} onChange={setBgColor} />
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Contrast</span>
              <span className="font-mono text-sm font-bold text-black dark:text-white">
                {formatRatio(evaluateContrast(textColor, bgColor, fontSizePx, fontWeight).ratio)}
              </span>
            </div>
          </Panel>
        </div>

        {/* Preview + results */}
        <div className="lg:col-span-2 space-y-8">
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PanelHeading dot="bg-blue glow-cyan" title="Preview" />
              <div className="flex flex-wrap gap-1.5">
                {PREVIEW_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    title={mode.hint}
                    onClick={() => setPreviewMode(mode.value)}
                    className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      previewMode === mode.value
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div className="p-6" style={{ backgroundColor: bgColor }}>
                <p style={previewStyle}>{sampleText}</p>
              </div>
            </div>

            <Input
              label="Sample text"
              as="textarea"
              rows={3}
              value={sampleText}
              onChange={setSampleText}
            />
          </Panel>

          <Panel className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PanelHeading dot="bg-green" title="WCAG 2.2 audit" />
              <div className="flex items-center gap-2">
                <Badge variant={normativeFailures.length === 0 ? "standard" : "outline"}>
                  {normative.length - normativeFailures.length}/{normative.length} AA
                </Badge>
                {isAuditing && <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />}
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <ShieldCheck
                className={`h-10 w-10 shrink-0 ${normativeFailures.length === 0 ? "text-green" : "text-red"}`}
                strokeWidth={1.25}
              />
              <div className="min-w-0">
                <p className="text-2xl font-bold text-black dark:text-white tabular-nums">{score}%</p>
                <p className="text-[11px] text-ocragray-800 dark:text-zinc-300 leading-relaxed">
                  {normativeFailures.length === 0
                    ? `All level AA criteria pass with these settings. ${warnings.length} advisory warning${warnings.length === 1 ? "" : "s"} to review.`
                    : `${normativeFailures.length} level AA criteri${normativeFailures.length === 1 ? "on fails" : "a fail"}: ${normativeFailures
                        .map((item) => item.id)
                        .join(", ")}. ${failures.length - normativeFailures.length} advisory failure${
                        failures.length - normativeFailures.length === 1 ? "" : "s"
                      } beyond that.`}
                </p>
              </div>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="space-y-2">
                <FieldLabel>{section.title}</FieldLabel>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-black dark:text-white">{item.criterion}</p>
                          {item.measured && (
                            <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {item.measured}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                            {item.level}
                          </span>
                          <VerdictPill verdict={item.verdict} />
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed text-ocragray-800 dark:text-zinc-300">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="relative">
              <CopyButton text={reportText} />
              <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 pt-10 font-haas text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap max-h-72">
                {reportText}
              </pre>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
