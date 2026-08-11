"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";
import { DoubleHero } from "@/components/common/DoubleHero";
import { useThemeStore } from "@/store/themeStore";
import Grainient from "@/components/cherry/Grainient";
import { Badge } from "@/components/common/Badge";
import { Post, Ingredient } from "@/types";
import { IngredientCard } from "@/components/font/IngredientCard";
import PostInsightPageRenderer from "@/components/post/PostInsightPageRenderer";

interface ArchivePostDetailClientProps {
  post: Post;
}

function formatFiledDate(iso?: string): string {
  if (!iso) return "Undated";
  try {
    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(iso));
  } catch {
    return "Undated";
  }
}

function authorInitials(name?: string, surname?: string): string {
  const a = (name || "").charAt(0);
  const b = (surname || "").charAt(0);
  return (a + b).toUpperCase() || "TS";
}

export default function ArchivePostDetailClient({ post }: ArchivePostDetailClientProps) {
  const { theme } = useThemeStore();
  const tags = post.tags || [];
  const fonts = post.fonts || [];
  const hasFonts = fonts.length > 0;
  const authorName = post.author?.name ? `${post.author.name} ${post.author.surname || ""}`.trim() : "Typamine Studio";

  // L'insight è un JSON di content-module (paragraph/paragraphWithImage/quote);
  // mostriamo la sezione solo se esiste ed effettivamente contiene moduli.
  let hasInsight = false;
  if (post.insight) {
    try {
      const parsed = JSON.parse(post.insight);
      hasInsight = Array.isArray(parsed) && parsed.length > 0;
    } catch {
      hasInsight = false;
    }
  }

  const grainientColors = {
    color1: theme === "light" ? "#72afc9" : "#0f0401",
    color2: theme === "light" ? "#5e95e2" : "#610f05",
    color3: theme === "light" ? "#89608e" : "#79353a",
  };

  return (
    <div className="relative w-full mx-auto">
      {/* Back button — stessa posizione (max-w-7xl, pt-24) delle altre pagine di dettaglio, posizionato sopra a DoubleHero con z-30 */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 mb-4 pointer-events-auto">
          <MinimalLink
            href="/archive"
            label="Back to the Archive"
            icon={<MoveLeft size={12} />}
            iconPosition="left"
            className="ml-4 font-bold tracking-widest text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white"
          />
        </div>
      </div>

      <DoubleHero bgImage={post.imageUrl} bgObjectFit="cover" fullWidth>
        <DoubleHero.FirstViewport className="pt-24 pb-12 px-6 md:px-12 flex flex-col justify-end">
          <div className="max-w-3xl flex flex-col space-y-4 text-right items-end ml-auto">
            <h1 className="font-haas text-2xl md:text-5xl font-bold tracking-tight text-foreground text-glow-blue dark:text-glow-red">
              <span className="font-haas">{post.title}</span>
            </h1>

            <p className="text-zinc-700 dark:text-zinc-300 text-xs md:text-base max-w-xl leading-relaxed">
              {post.caption || ""}
            </p>
          </div>
        </DoubleHero.FirstViewport>

        <DoubleHero.SecondViewport>
          {/* Con font associati: dossier + font card grid, tutto qui dentro (invariato).
              Senza font e con insight: il dossier si sposta più in basso, affiancato
              agli insight (vedi grid dopo DoubleHero) — qui non renderizziamo nulla.
              Senza font e senza insight: il dossier resta qui, full width. */}
          {(hasFonts || !hasInsight) && (
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-6">
              <div className={`mx-auto flex flex-col ${hasFonts ? "w-full bg-ocragray-200/50 dark:bg-ocragray-900/50 p-6 mb-8" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch">
                  <DossierPanel
                    post={post}
                    tags={tags}
                    hasFonts={hasFonts}
                    hasInsight={hasInsight}
                    authorName={authorName}
                    grainientColors={grainientColors}
                    className={hasFonts ? "lg:col-span-4 lg:row-span-2" : "lg:col-span-12"}
                  />

                  {/* Right Column: Featured fonts (each card 4/12 cols wide) */}
                  {hasFonts &&
                    fonts.map((font: Ingredient, idx: number) => (
                      <div key={font.id} className="lg:col-span-4">
                        <IngredientCard font={font} idx={idx} linklabel="Explore Font" fontSize={28} className="!rounded-none h-full" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </DoubleHero.SecondViewport>
      </DoubleHero>

      {hasFonts && hasInsight && (
        <div className="mx-auto w-full lg:px-8 mt-8 lg:mt-8">
          <div className="w-full mx-auto flex flex-col bg-ocragray-200/50 dark:bg-ocragray-900/50 p-4 lg:py-12">
            <section className="space-y-4">
              <PostInsightPageRenderer content={post.insight as string} section="archive" />
            </section>
          </div>
        </div>
      )}

      {/* Senza font associati e con insight presenti: dossier (Classification +
          Description) a sinistra degli insight, affiancati nella stessa riga. */}
      {!hasFonts && hasInsight && (
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 my-4 lg:my-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch">
            <DossierPanel
              post={post}
              tags={tags}
              hasFonts={hasFonts}
              hasInsight={hasInsight}
              authorName={authorName}
              grainientColors={grainientColors}
              className="lg:col-span-4"
            />
            <div className="lg:col-span-8 bg-ocragray-200/50 dark:bg-ocragray-900/50 p-4 lg:py-12">
              <section className="space-y-4">
                <PostInsightPageRenderer content={post.insight as string} section="archive" />
              </section>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

interface DossierPanelProps {
  post: Post;
  tags: Array<{ id: string; name: string }>;
  hasFonts: boolean;
  hasInsight: boolean;
  authorName: string;
  grainientColors: { color1: string; color2: string; color3: string };
  className?: string;
}

// Estratto in componente a parte: renderizzato in due punti diversi dell'albero
// a seconda di hasFonts/hasInsight (dentro DoubleHero, oppure affiancato agli
// insight più in basso) — evita di duplicare i tre blocchi (tag/descrizione/autore).
function DossierPanel({ post, tags, hasFonts, hasInsight, authorName, grainientColors, className = "" }: DossierPanelProps) {
  const authorStamp = (
    <div className="flex items-center gap-3 border-t border-black/10 dark:border-white/10 pt-4">
      <div className="h-9 w-9 shrink-0 rounded-full bg-blue/20 dark:bg-red/20 flex items-center justify-center overflow-hidden">
        {post.author?.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.author.imageUrl} alt={authorName} className="w-full h-full object-cover" />
        ) : (
          <span className="font-mono text-xs font-bold text-blue dark:text-red">
            {authorInitials(post.author?.name, post.author?.surname)}
          </span>
        )}
      </div>
      <div className="leading-tight">
        <p className="font-haas text-xs font-bold text-black dark:text-white">Filed by {authorName}</p>
        <p className="font-mono text-[10px] text-ocragray-800 dark:text-zinc-200 uppercase tracking-wider">
          {formatFiledDate(post.createdAt)}
        </p>
      </div>
    </div>
  );

  return (
    <section className={`relative overflow-hidden border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 h-full flex flex-col justify-between space-y-6 ${className}`}>
      <div className="absolute inset-0 h-full mb-0 z-0 pointer-events-none opacity-50 dark:opacity-40">
        <Grainient
          timeSpeed={1.5}
          colorBalance={0}
          warpStrength={1.5}
          warpFrequency={3}
          warpSpeed={1.5}
          warpAmplitude={30}
          blendAngle={0}
          blendSoftness={0.1}
          rotationAmount={100}
          noiseScale={2}
          grainAmount={0.15}
          grainScale={1.5}
          grainAnimated={true}
          contrast={1.2}
          gamma={1}
          saturation={0.7}
          centerX={0}
          centerY={0}
          zoom={1}
          color1={grainientColors.color1}
          color2={grainientColors.color2}
          color3={grainientColors.color3}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col space-y-6">
        {/* Senza font associati: tag + autore passano prima della descrizione */}
        {/* Stessa struttura sempre: Classification, Filed by, Description — sia con
            che senza font associati. */}
        {tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-rezland text-2xl text-black dark:text-white">Classification</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: any) => (
                <Link key={tag.id} href={`/archive?tags=${encodeURIComponent(tag.name)}`}>
                  <Badge hoverZoom>{tag.name}</Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {authorStamp}

        <div className="space-y-3">
          {post.description && (
            <p className="text-black dark:text-white leading-relaxed font-medium text-sm sm:text-base">
              {post.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
