"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Sync with theme state and localStorage on mount to prevent hydration flickers
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("typamine-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to dark as requested
      setTheme("dark");
    }
  }, [setTheme]);

  if (!mounted) {
    return (
      <div className="w-24 h-6 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 rounded px-2.5 py-1 transition-all select-none cursor-pointer font-haas text-[9px]"
      title="Toggle Lab State"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all ${theme === "dark" ? "bg-[#ff3131] glow-red animate-pulse" : "bg-[#00cece] glow-cyan"
          }`}
      />
      <span className="text-ocragray-800 dark:text-zinc-200 font-bold uppercase tracking-wider">
        {theme === "dark" ? "REACTION (DARK)" : "STABILITY (LIGHT)"}
      </span>
    </button>
  );
};
