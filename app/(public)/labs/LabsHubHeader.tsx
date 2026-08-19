"use client";

import { PageHeading } from "@/components/common/PageHeading";
import { useThemeStore } from "@/store/themeStore";
import { useLabsGrainientOptions } from "./labsShared";

export type LabsHeaderTool = "fontface" | "tailwind" | "converter" | "wcag";

const TOOL_COPY: Record<"hub" | LabsHeaderTool, { title: string; subtitle: string }> = {
  hub: {
    title: "LAB TOOLS // Tools designed for Creatives and Developers",
    subtitle: "Technical utilities to process, package, and integrate font assets into modern web apps.",
  },
  fontface: {
    title: "FONTFACE GENERATOR // Cascading @font-face Declarations",
    subtitle: "Generate a single @font-face rule with a WOFF2-first fallback cascade — paste your file URLs, tune weight, style and font-display, and copy production-ready CSS.",
  },
  tailwind: {
    title: "TAILWIND SETUP // Register Fonts as Utility Classes",
    subtitle: "Wire a font family into Tailwind as a font-* utility — classic tailwind.config.js or the native CSS-first @theme syntax (v4+), both built from the same @font-face block.",
  },
  converter: {
    title: "FORMAT_CONVERTER // WOFF2 ⇄ WOFF ⇄ TTF/OTF",
    subtitle: "Upload a font file — or auto-load one straight from the catalog — and get back all 3 formats: download individually, bundled as a .zip, or send straight into the @font-face generator.",
  },
  wcag: {
    title: "WCAG CHECKER // Accessibility Audit for Type",
    subtitle: "Set font, size, weight, spacing and colors, then run the full WCAG 2.2 check: contrast (1.4.3 / 1.4.6), resize to 200% (1.4.4), text-spacing overrides (1.4.12), reflow at 320px (1.4.10), font substitution, fallback stack and glyph distinguishability.",
  },
};

interface LabsHubHeaderProps {
  tool?: LabsHeaderTool;
  ingredientName?: string | null;
}

export default function LabsHubHeader({ tool, ingredientName }: LabsHubHeaderProps) {
  const { theme } = useThemeStore();
  const grainientOptions = useLabsGrainientOptions(theme);
  const copy = TOOL_COPY[tool ?? "hub"];

  return (
    <PageHeading
      title={copy.title}
      subtitle={
        ingredientName ? (
          <>
            {copy.subtitle} Pre-loaded with{" "}
            <span className="uppercase font-bold text-blue dark:text-red">"{ingredientName}"</span>.
          </>
        ) : (
          copy.subtitle
        )
      }
      useGrainient
      grainientOptions={grainientOptions}
    />
  );
}
