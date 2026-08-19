import type { ComponentType } from "react";
import Link from "next/link";
import { Code2, RefreshCw, ArrowRight, ShieldCheck } from "lucide-react";
import { getIngredientBySlug } from "@/lib/services/font";
import { ChromeBlobHero } from "@/components/cheyy/ChromeBlobHero";

export const dynamic = "force-dynamic";

interface LabsPageProps {
  searchParams: Promise<{ ingredient?: string }>;
}

// Logo Tailwind vero (public/images/icons/tailwind.svg) invece dell'icona
// generica "Palette" — fill hardcoded a #000 nell'originale sostituito con
// currentColor per poter essere colorata/animata come le altre icone lucide.
function TailwindLogo({ className }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"
      />
    </svg>
  );
}

interface LabsTool {
  slug: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  iconClass: string;
  gradient: string;
}

const TOOLS: LabsTool[] = [
  {
    slug: "font-face-generator",
    title: "Fontface Generator",
    description: "Turn a font file into copy-paste-ready CSS. Stack WOFF2, WOFF and TTF/OTF sources in the right fallback order, tune weight, style and font-display, and preview it live — for when you're wiring a new typeface into a site and need clean, production-safe @font-face rules in seconds instead of writing them by hand.",
    icon: Code2,
    iconClass: "text-red",
    gradient: "from-red/10 via-red/0 to-transparent",
  },
  {
    slug: "tailwind-generator",
    title: "Tailwind Setup",
    description: "Wire any font family into Tailwind as a real font-* utility class. Get both the classic tailwind.config.js extend.fontFamily snippet and the native v4 CSS-first @theme syntax, generated side by side — for when you're setting up a project and want the font available everywhere without hand-editing config files.",
    icon: TailwindLogo,
    iconClass: "text-blue",
    gradient: "from-blue/10 via-blue/0 to-transparent",
  },
  {
    slug: "font-converter",
    title: "Format Converter",
    description: "Drop in a .ttf, .otf, .woff or .woff2 file — or pull one straight from the catalog — and get back all 3 web-ready formats at once. Download them individually, bundled as a .zip, or send them straight into the @font-face Generator — for when you've got a font from outside Typamine that needs packaging for the web fast.",
    icon: RefreshCw,
    iconClass: "text-green",
    gradient: "from-green/10 via-green/0 to-transparent",
  },
  {
    slug: "wcag",
    title: "WCAG Checker",
    description: "Audit a typeface against WCAG 2.2 before it ships. Customize size, weight, and colors, then check key accessibility criteria: contrast ratios, reflow at 320px, 200% resize, text-spacing, font overrides, and character legibility — with a copy-paste report at the end.",
    icon: ShieldCheck,
    iconClass: "text-orange-400",
    gradient: "from-orange-400/10 via-orange-400/0 to-transparent",
  },
];

export default async function LabsPage({ searchParams }: LabsPageProps) {
  const { ingredient: ingredientSlug } = await searchParams;
  const ingredient = ingredientSlug ? await getIngredientBySlug(ingredientSlug) : null;

  // La CTA in ingredients/[slug] arriva qui come /labs?ingredient=<slug> —
  // lo stesso query param viene ripassato integralmente ad ogni tool, così
  // arrivando da un font specifico il tool scelto parte già precompilato.
  const qs = ingredientSlug ? `?ingredient=${encodeURIComponent(ingredientSlug)}` : "";

  return (
    <ChromeBlobHero
      heightClassName="min-h-dvh"
      contentClassName="relative z-10 w-full flex flex-col"
      fixedBackground
      blobColorClassName="bg-[#4FE8E8] dark:bg-[#FF3132]"
      backgroundColorClassName="bg-[#EEF0F2] dark:bg-[#13100F]"
    >
      {/* Sezione hero: stessa impaginazione centrata di prima, ma come
          sezione dentro il flusso invece che come singolo contenuto
          dell'hero — il resto della pagina segue subito sotto, sullo
          stesso sfondo animato (fixedBackground: il canvas resta ancorato
          al viewport mentre scrolli). */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 p-8 sm:p-16 pt-32 min-h-dvh">
        <div className="bg-bluegray-200/20 dark:bg-redgray-800/40 backdrop-blur-md px-6 py-8 w-fit flex flex-col gap-y-4 items-center rounded-md border border-4 border-blue-800 dark:border-redgray-200 ">
          <h1 className="font-crenzo text-3xl sm:text-5xl font-bold uppercase tracking-[1rem] text-blue-900 dark:text-redgray-200 max-w-5xl">
            Tools designed for Creatives and Developers
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base max-w-xl leading-relaxed font-haas font-bold">
            {ingredient ? (
              <>
                Technical utilities to process, package, and integrate font assets into modern web apps. Pre-loaded with{" "}
                <span className="uppercase font-bold text-blue dark:text-red">&quot;{ingredient.name}&quot;</span>.
              </>
            ) : (
              "Technical utilities to process, package, and integrate font assets into modern web apps."
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-dvh">
        {/* 4 tool: 2 righe da 2 su desktop (prima erano 3 in fila) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/labs/${tool.slug}${qs}`}
                className="group relative overflow-hidden border border-zinc-300 dark:border-zinc-800 rounded-lg p-6 flex flex-col gap-4 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icona enorme, inclinata, in trasparenza sullo sfondo — si
                    raddrizza, ingrandisce e diventa più visibile all'hover.
                    Più intensa in light mode, dove il colore tende a lavarsi
                    via su sfondo bianco. */}
                <Icon
                  strokeWidth={1.25}
                  className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rotate-[18deg] opacity-[0.16] dark:opacity-[0.12] transition-all duration-500 ease-out group-hover:rotate-[4deg] group-hover:scale-110 group-hover:opacity-70 dark:group-hover:opacity-40 ${tool.iconClass}`}
                />

                <div className="relative z-10 flex items-center justify-end gap-2">
                  <h3 className="font-rezland text-4xl font-bold text-black dark:text-white">{tool.title}</h3>
                </div>

                <p className="relative z-10 text-black/80 dark:text-white/80 text-md leading-relaxed flex-1">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </ChromeBlobHero>
  );
}
