"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";
import { Badge } from "@/components/common/Badge";
import { Post } from "@/types";
import PostInsightPageRenderer from "@/components/post/PostInsightPageRenderer";

interface PillDetailClientProps {
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

interface InsightModule {
  id: string;
  type: string;
  props: Record<string, any>;
}

const HERO_MODULE_TYPES = new Set(["simpleHero", "gridHero"]);

// Niente DoubleHero qui a differenza di /archive/[slug]: un pill costruisce
// già la propria hero come primo modulo del content editor (simpleHero o
// gridHero) — un'altra hero sopra sarebbe ridondante. Niente sezione font
// collegati nemmeno (a differenza di Archive): i post BLOG non referenziano
// font del catalogo, sarebbe sempre vuota — è solo un articolo.
//
// Se il primo modulo è una hero, va reso a piena pagina (100dvh, edge-to-edge,
// fin sotto la navbar) — per questo esce dal contenitore max-w-7xl/pt-24 che
// invece racchiude il resto (meta autore/tag + moduli successivi).
export default function PillDetailClient({ post }: PillDetailClientProps) {
  const tags = post.tags || [];
  const authorName = post.author?.name ? `${post.author.name} ${post.author.surname || ""}`.trim() : "Typamine Studio";

  let modules: InsightModule[] = [];
  if (post.insight) {
    try {
      const parsed = JSON.parse(post.insight);
      if (Array.isArray(parsed)) modules = parsed;
    } catch {}
  }

  const firstIsHero = modules.length > 0 && HERO_MODULE_TYPES.has(modules[0]?.type);
  const heroModule = firstIsHero ? modules[0] : null;
  const restModules = firstIsHero ? modules.slice(1) : modules;

  const backLink = (
    <MinimalLink
      href="/pills"
      label="Back to Pills"
      icon={<MoveLeft size={12} />}
      iconPosition="left"
      className="ml-4 font-bold tracking-widest text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white"
    />
  );

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Bagliore verticale centrale: ellisse allungata (vertici in alto/basso
          pagina, larghezza centrata sull'asse X) che illumina leggermente il
          contenuto centrale — dietro a tutto (-z-10) ma visibile dove il
          contenuto sopra è trasparente/translucido. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[70%] max-w-4xl -z-10 pointer-events-none bg-radial from-ocragray-300/80 via-ocragray-200/60 to-transparent dark:from-ocragray-600/40 dark:via-ocragray-700/20 dark:to-transparent blur-3xl"
      />

      {heroModule ? (
        <>
          {/* Back button overlaid sopra la hero a piena pagina, stessa posizione/z-index di /archive/[slug] */}
          <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 mb-4 pointer-events-auto">
              {backLink}
            </div>
          </div>
          <PostInsightPageRenderer content={JSON.stringify([heroModule])} section="blog" />
        </>
      ) : null}

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 space-y-8">
        {!heroModule && backLink}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end border-b border-black/10 dark:border-white/10 pb-6">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/pills?tags=${encodeURIComponent(tag.name)}`}>
                <Badge hoverZoom>{tag.name}</Badge>
              </Link>
            ))}
          </div>
        )}

        {restModules.length > 0 ? (
          <PostInsightPageRenderer content={JSON.stringify(restModules)} section="blog" />
        ) : !heroModule ? (
          <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 dark:text-zinc-600 font-haas">
            No content yet.
          </div>
        ) : null}

        {/* Byline autore — in fondo, dopo il contenuto */}
        <div className="flex justify-center items-center gap-3 border-t border-black/10 dark:border-white/10 pt-6">
          <div className="h-10 w-10 shrink-0 rounded-full bg-blue/20 dark:bg-red/20 flex items-center justify-center overflow-hidden">
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
            <p className="font-haas text-sm font-bold text-black dark:text-white">Written by {authorName}</p>
            <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {formatFiledDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
