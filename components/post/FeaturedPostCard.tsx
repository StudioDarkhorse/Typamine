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
      className="group relative flex flex-col md:flex-row md:justify-between overflow-hidden border border-zinc-200 dark:border-zinc-800 min-h-[320px]"
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

      <div className="relative z-10 flex flex-col justify-end md:justify-center gap-4 p-6 sm:p-10 max-w-3xl">
        <div className="flex items-center gap-2">

          <span className="font-mono text-[10px] text-ocragray-800 dark:text-zinc-200 uppercase tracking-widest">
            {formatFiledDate(post.createdAt)}
          </span>
        </div>

        <h2 className="font-crenzo text-4xl sm:text-5xl leading-[0.95] text-black dark:text-white">
          {post.title}
        </h2>

        {post.caption && (
          <p className="font-haas text-lg text-zinc-600 dark:text-zinc-300 italic">{post.caption}</p>
        )}

        {post.description && (
          <p className="font-haas text-sm text-ocragray-800 dark:text-zinc-200 line-clamp-3 max-w-xl">
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

        <div className="flex items-center justify-between pt-2">
          <span className="font-haas text-[10px] text-bluegray-800 dark:text-redgray-200 uppercase tracking-wider">
            Filed by {authorName}
          </span>

        </div>
      </div>
      <div className="flex justify-end items-end relative z-10">
        <div className="sm:ps-12 sm:pe-8 sm:pt-10 sm:pb-4 rounded-tl-[80%] rounded-bl-[10px] rounded-tr-[25%] bg-gradient-to-r from-blue-800/80 to-bluegray-800/80 dark:from-red-800/20 dark:to-red-800/80 flex items-center gap-2 font-haas font-bold text-blue-500 dark:text-red-500">
          {ctaLabel}
          <MoveRight size={14} className="icon-altalenante" />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPostCard;
