"use client";

import { Download } from "lucide-react";
import { Card } from "@/components/common/Card";

interface ImportFontsCardProps {
  /** Apre la tab full page dell'import (AdminImportFontsView). */
  onClick: () => void;
}

// Solo la tile in dashboard: il flusso di import vive in
// components/admin/AdminImportFontsView.tsx, aperto come tab a tutta pagina
// (prima era una BaseModal).
export default function ImportFontsCard({ onClick }: ImportFontsCardProps) {
  return (
    <Card
      roundness="lg"
      visualHover
      className="cursor-pointer border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 flex items-center justify-center p-6 h-fit"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 w-full">
        <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
          <Download className="h-5 w-5 text-violet-500" />
        </div>
        <div className="min-w-0 text-left">
          <p className="text-sm font-bold text-black dark:text-white truncate">Import Fonts</p>
          <p className="font-haas text-[9px] uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 truncate mt-0.5">
            Scrape DaFont / 1001Fonts
          </p>
        </div>
      </div>
    </Card>
  );
}
