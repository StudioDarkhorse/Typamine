import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Post } from "@/types";

interface FeaturedPostCardProps {
  post: Post;
}

function formatFiledDate(iso?: string): string {
  if (!iso) return "UNDATED";
  try {
    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
      .format(new Date(iso))
      .toUpperCase();
  } catch {
    return "UNDATED";
  }
}

// Card "fascicolo aperto sul tavolo" — usata per ogni post sia in /archive
// che in /pills (stessa identica resa visiva, solo la label della CTA cambia).
export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  const cover = post.imageUrl || post.thumbnailUrl;
  const routeBase = post.postType === "BLOG" ? "pills" : "archive";
  const href = post.href || `/${routeBase}/${post.slug}`;
  const ctaLabel = post.postType === "BLOG" ? "Read Article" : "Open Case File";
  const authorName = post.author?.name
    ? `${post.author.name} ${post.author.surname || ""}`.trim()
    : "Typamine Studio";

  return (
    <Link
      href={href as any}
      className="group relative flex flex-col md:flex-row md:justify-between overflow-hidden border border-zinc-200 dark:border-zinc-800 h-[640px]"
    >
      {/* Background image spanning the whole spotlight, same overlay trick as PrescriptionCard */}
      {cover && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${cover})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/95 dark:from-zinc-950/95 via-white/70 dark:via-zinc-950/70 to-white/20 dark:to-zinc-950/20" />
        </>
      )}
      {!cover && <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900" />}

      {/* pb generoso: sotto c'è la linguetta CTA in assoluto, il testo non
          deve finirci sotto (soprattutto "Filed by" a schermi stretti). */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-8 pt-8 pb-24 sm:px-12 sm:pt-12 sm:pb-28 md:px-16 md:pt-16 max-w-4xl">
        <div className="grow flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-ocragray-800 dark:text-zinc-200 uppercase tracking-widest">
              {formatFiledDate(post.createdAt)}
            </span>
          </div>

          <h2 className="font-crenzo text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.85] text-black dark:text-white line-clamp-5 overflow-hidden">
            {post.title}
          </h2>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {post.caption && (
            <p className="font-haas text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 italic line-clamp-1">{post.caption}</p>
          )}

          {post.description && (
            <p className="font-haas text-sm sm:text-base text-ocragray-800 dark:text-zinc-200 line-clamp-4 max-w-2xl">
              {post.description}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge key={tag.id} variant="warm">{tag.name}</Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <span className="font-haas text-[10px] sm:text-xs text-bluegray-800 dark:text-redgray-200 uppercase tracking-wider">
              Filed by {authorName}
            </span>
          </div>
        </div>
      </div>
      {/* Linguetta CTA incollata all'angolo del fascicolo. Posizionata in
          assoluto invece che come figlio flex: così la sua forma non cambia
          con la lunghezza dell'etichetta ("Read Article" vs "Open Case File")
          né col passaggio da colonna a riga della card. I raggi sono in rem e
          non in percentuale, che su una scatola auto-dimensionata dava una
          curva diversa a ogni testo. */}
      <div className="absolute bottom-0 right-0 z-20">
        <div
          className="flex items-center gap-3 pl-10 pr-7 py-4 sm:pl-14 sm:pr-9 sm:py-5
                     rounded-tl-[2.75rem] 
                     border-t border-l border-white/25 dark:border-white/10
                     bg-blue-900/85 dark:bg-red-900/80 backdrop-blur-md
                     text-white shadow-[0_-10px_30px_rgba(0,0,0,0.25)]
                     transition-[background-color,padding] duration-300
                     group-hover:bg-blue-800/90 dark:group-hover:bg-red-800/85
                     sm:group-hover:pr-12"
        >
          <span className="font-haas text-xs sm:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
            {ctaLabel}
          </span>
          <MoveRight size={16} className="icon-altalenante shrink-0" />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPostCard;
