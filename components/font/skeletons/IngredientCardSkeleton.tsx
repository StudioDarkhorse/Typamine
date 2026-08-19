import React from "react";

// Placeholder con le stesse dimensioni/spaziature di IngredientCard, per
// evitare che il layout "salti" quando i dati reali arrivano dopo il loader.
export const IngredientCardSkeleton: React.FC = () => {
    return (
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 rounded-lg p-2 flex flex-col justify-between relative overflow-hidden animate-pulse">
            {/* Corner tag index */}
            <div className="absolute top-2 right-2 h-2.5 w-10 rounded bg-zinc-200 dark:bg-zinc-800" />

            {/* Chemical Element layout */}
            <div className="space-y-4 mt-4">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 ml-2 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex flex-col items-end gap-1.5">
                        <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </div>

                <div className="ps-2 space-y-1.5">
                    <div className="h-3.5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-2.5 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>

            {/* Live Preview placeholder — same footprint as LivePreview's
                compact mode (h-[110px], rounded-md, margini lg:mx-1). */}
            <div className="my-4 lg:mx-1 h-[110px] rounded-md border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-900" />

            <div className="pt-2 pe-2 mx-2 flex justify-between items-center border-t border-zinc-400/50">
                <div className="h-2.5 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
        </div>
    );
};

export default IngredientCardSkeleton;
