"use client";

import { ArrowLeft } from "lucide-react";

interface AdminViewHeaderProps {
  title: string;
  /** Torna alla dashboard. Disabilitato mentre un job è in corso. */
  onBack: () => void;
  backDisabled?: boolean;
  backLabel?: string;
  /** Slot a destra: quando presente sostituisce lo spacer che centra il titolo. */
  right?: React.ReactNode;
}

// Header condiviso dalle "tab" full page della dashboard admin (statistiche,
// import fonts). Stessa riga per tutte: back a sinistra, titolo centrato,
// slot/spacer a destra.
export default function AdminViewHeader({
  title,
  onBack,
  backDisabled = false,
  backLabel = "Back to Dashboard",
  right,
}: AdminViewHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-black/5 dark:border-white/5 pb-2.5">
      <button
        onClick={onBack}
        disabled={backDisabled}
        title={backDisabled ? "Wait for the running job to finish" : undefined}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-bold text-black dark:text-white uppercase tracking-wider transition-colors border border-black/5 dark:border-white/5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 dark:disabled:hover:bg-zinc-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </button>

      <h2 className="text-2xl md:text-3xl font-crenzo font-black uppercase tracking-widest text-center text-black dark:text-white leading-none">
        {title}
      </h2>

      {right ?? <div className="hidden sm:block w-[180px]" />}
    </div>
  );
}
