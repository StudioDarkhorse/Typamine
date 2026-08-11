"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import StarRating from "./StarRating";

const MIN_VOTES_TO_REVEAL = 30;

interface IngredientRatingWidgetProps {
  ingredientId: string;
  slug: string;
  /** Rating editoriale Typamine, scala 0-10 (campo `Ingredient.rating`). */
  typamineRating: number;
  initialUserRating: number;
  initialUserRatingsCount: number;
  /** Letto server-side dal cookie httpOnly `tm_rated_<id>` — non leggibile/falsificabile da document.cookie lato client. */
  initialHasVoted: boolean;
  /** true = nessun proprio bg/border/rounded/backdrop — per quando il chiamante fonde il widget in un contenitore già stilizzato (es. IngredientHeader). */
  bare?: boolean;
  onRateSuccess?: () => void;
}

export default function IngredientRatingWidget({
  ingredientId,
  slug,
  typamineRating,
  initialUserRating,
  initialUserRatingsCount,
  initialHasVoted,
  bare = false,
  onRateSuccess,
}: IngredientRatingWidgetProps) {
  const [userRating, setUserRating] = useState(initialUserRating);
  const [userRatingsCount, setUserRatingsCount] = useState(initialUserRatingsCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  // Il valore votato lo conosciamo solo per un voto appena inviato in questa
  // sessione — se hasVoted arriva già true al load (cookie di una visita
  // precedente), il cookie salva solo il flag, non il valore scelto.
  const [myVote, setMyVote] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRate = async (value: number) => {
    if (hasVoted || isSubmitting) return;
    onRateSuccess?.();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/ingredients/${slug}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      const data = await res.json();
      if (res.status === 409) {
        // Cookie httpOnly già presente lato server (es. stato client stantio
        // dopo un voto in un'altra tab): allineiamo la UI invece di mostrare
        // un errore per un'azione che, di fatto, è già andata a buon fine prima.
        setHasVoted(true);
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit rating.");
      }
      setUserRating(data.userRating);
      setUserRatingsCount(data.userRatingsCount);
      setMyVote(value);
      setHasVoted(true);
      onRateSuccess?.();
    } catch (err: any) {
      setError(err.message || "Failed to submit rating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRevealed = userRatingsCount >= MIN_VOTES_TO_REVEAL;
  // Scala omogenea /5 per entrambi i punteggi: `Ingredient.rating` editoriale
  // è 0-10 in DB (invariato), qui solo convertito per il display.
  const typamineScore5 = typamineRating / 2;

  return (
    <div
      className={
        bare
          ? "flex flex-col md:flex-row md:items-center gap-4 w-full"
          : "p-6 border border-black/5 dark:border-white/5 rounded-lg backdrop-blur-xl bg-white/40 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center gap-4"
      }
    >

      <div className="flex flex-col gap-2">
        <p className="font-haas text-[10px] uppercase tracking-widest text-blue-800 dark:text-red-200">Typamine® Score</p>
        <div className="flex items-center gap-2">

          <StarRating value={typamineScore5} size={20} />
          <div className="leading-tight">

            <p className="font-haas text-lg text-blue dark:text-red leading-none">
              {typamineScore5.toFixed(1)}
              <span className="font-haas text-[10px] text-zinc-400 ml-1">/5</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-black/10 dark:bg-white/10" />

      {/* Users Score */}
      <div className="hidden md:flex flex-col gap-2">
        <p className="font-haas text-[10px] uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">Users Score</p>
        <div className="flex items-center gap-2">
          {isRevealed ?

            <StarRating value={userRating} size={20} />
            : <p className="font-haas text-xs text-ocragray-800 dark:text-zinc-200">
              Locked — {userRatingsCount}/{MIN_VOTES_TO_REVEAL} votes
            </p>}

        </div>
      </div>



      {/* Vote CTA */}
      <div className="flex items-center gap-3 justify-between w-full md:w-auto md:justify-start md:ml-auto">
        {hasVoted ? (
          <span className="flex items-center gap-1.5 font-haas text-xs font-bold text-emerald-500">
            <Check className="h-4 w-4 shrink-0" />
            {myVote !== null ? (
              <span className="flex items-center gap-2">
                You rated this font <StarRating value={myVote} size={14} />
              </span>
            ) : isRevealed ? (
              <span>You voted this font — current score {userRating.toFixed(1)}/5</span>
            ) : (
              <span>You voted this font</span>
            )}
          </span>
        ) : (
          <>
            <span className="font-haas text-[10px] uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
              {isSubmitting ? "Submitting..." : "Rate this font"}
            </span>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
            ) : (
              <StarRating value={0} selected={null} interactive onRate={handleRate} size={20} />
            )}
          </>
        )}
      </div>

      {error && <p className="font-haas text-[10px] text-red-500 font-bold">{error}</p>}
    </div>
  );
}
