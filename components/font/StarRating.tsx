"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** Media 0-5 — arrotondata al mezzo punto più vicino per il rendering (display mode). */
  value: number;
  /** Voto correntemente selezionato/inviato dall'utente, se già votato — mostra le stelle piene fino a questo intero invece della media. */
  selected?: number | null;
  interactive?: boolean;
  disabled?: boolean;
  size?: number;
  onRate?: (value: number) => void;
}

export default function StarRating({
  value,
  selected,
  interactive = false,
  disabled = false,
  size = 20,
  onRate,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (interactive) {
    const active = hovered ?? selected ?? 0;
    return (
      <div className="inline-flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onMouseEnter={() => !disabled && setHovered(n)}
            onClick={() => !disabled && onRate?.(n)}
            className={cn("transition-transform", !disabled && "cursor-pointer hover:scale-110", disabled && "cursor-default")}
            title={`Rate ${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              width={size}
              height={size}
              className={cn(
                "transition-colors",
                active >= n ? "fill-yellow-400 text-yellow-400" : "text-zinc-400"
              )}
            />
          </button>
        ))}
      </div>
    );
  }

  // Display mode: ogni stella è full/half/empty, arrotondata al mezzo punto
  // più vicino — resa per-stella (non un clip percentuale sull'intera riga)
  // così il mezzo voto ricade sempre esattamente su una stella intera, non su
  // un gap tra due stelle.
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = rounded >= n ? "full" : rounded >= n - 0.5 ? "half" : "empty";
        return (
          <span key={n} className="relative inline-block shrink-0" style={{ width: size, height: size }}>
            <Star width={size} height={size} className="absolute inset-0 text-zinc-300 dark:text-zinc-700" />
            {fill !== "empty" && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: fill === "half" ? "50%" : "100%" }}
              >
                <Star width={size} height={size} className="fill-yellow-400 text-yellow-400" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
