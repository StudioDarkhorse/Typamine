import React from "react";

// Placeholder con le stesse dimensioni/spaziature di IngredientRow.
export const IngredientRowSkeleton: React.FC = () => {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 rounded-lg p-4 sm:p-6 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="h-3.5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex items-center gap-4">
          <div className="h-2.5 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
        </div>
      </div>

      <div className="my-4 h-24 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-900" />

      <div className="pt-3 flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800">
        <div className="h-2.5 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default IngredientRowSkeleton;
