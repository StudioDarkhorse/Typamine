"use client";

import React from "react";
import Link from "next/link";
import { Globe, ShieldCheck, User, Download, Users, Star, Link2 } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import Grainient from "@/components/cherry/Grainient";
import { IngredientCard } from "@/components/font/IngredientCard";
import { FontAuthor, Ingredient } from "@/types";

interface AuthorDetailClientProps {
  author: FontAuthor;
  fonts: Ingredient[];
}

export default function AuthorDetailClient({ author, fonts }: AuthorDetailClientProps) {
  const { theme } = useThemeStore();

  const grainientColors = {
    color1: theme === "light" ? "#fdfdfd" : "#09090b",
    color2: theme === "light" ? "#c0d3ed" : "#570d22",
    color3: theme === "light" ? "#e5e7eb" : "#27272a",
  };

  const { totalFontsCount, totalDownloads, followersCount, usersRating } = author.metrics;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 space-y-8">
      {/* Author Header */}
      <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {author.bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={author.bannerUrl} alt="" className="w-full h-full object-cover opacity-40" />
          ) : (
            <Grainient
              timeSpeed={0.5}
              colorBalance={0}
              warpStrength={0.5}
              warpFrequency={3}
              warpSpeed={0.5}
              warpAmplitude={30}
              blendAngle={0}
              blendSoftness={0.1}
              rotationAmount={100}
              noiseScale={2}
              grainAmount={0.15}
              grainScale={1.5}
              grainAnimated={false}
              contrast={1.2}
              gamma={1}
              saturation={0.5}
              centerX={0}
              centerY={0}
              zoom={1}
              {...grainientColors}
            />
          )}
        </div>

        <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            {author.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-zinc-400" />
            )}
          </div>

          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-haas text-2xl font-bold text-blue dark:text-red text-glow-cyan dark:text-glow-red">
                {author.name}
              </h1>
              {author.isVerified && <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />}
              <span className="text-[10px] font-haas uppercase tracking-wider px-2 py-1 rounded-sm bg-zinc-100 dark:bg-zinc-900 text-ocragray-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
                {author.type}
              </span>
            </div>

            {author.bio && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300 font-haas max-w-2xl">{author.bio}</p>
            )}

            <div className="flex items-center gap-4 flex-wrap text-xs font-haas text-ocragray-800 dark:text-zinc-200">
              {author.nationality && <span>{author.nationality}</span>}
              {author.website && (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-1 text-blue dark:text-red hover:underline"
                >
                  <Globe size={12} /> Website
                </a>
              )}
              {author.socialLinks?.map((s) => (
                <a
                  key={s.platform + s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-1 hover:text-blue dark:hover:text-red transition-colors capitalize"
                >
                  <Link2 size={12} /> {s.handle || s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile icon={<User size={14} />} label="FONTS" value={totalFontsCount} />
        <StatTile icon={<Download size={14} />} label="DOWNLOADS" value={totalDownloads} />
        <StatTile icon={<Users size={14} />} label="FOLLOWERS" value={followersCount} />
        <StatTile
          icon={<Star size={14} />}
          label="RATING"
          value={usersRating.totalReviews > 0 ? usersRating.average.toFixed(1) : "—"}
        />
      </div>

      {/* Fonts by this author */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
          {`FONTS BY ${author.name.toUpperCase()}: ${fonts.length}`}
        </p>

        {fonts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
            {fonts.map((font, idx) => (
              <IngredientCard key={font.id} font={font} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-zinc-200 dark:border-zinc-800 border-dashed rounded-lg text-ocragray-800 dark:text-zinc-200 font-haas">
            NO FONTS PUBLISHED BY THIS AUTHOR YET
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white/50 dark:bg-zinc-900/20 flex flex-col gap-1">
      <span className="flex items-center gap-1.5 text-[10px] font-haas uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
        {icon} {label}
      </span>
      <span className="font-haas font-bold text-lg text-blue dark:text-red">{value}</span>
    </div>
  );
}
