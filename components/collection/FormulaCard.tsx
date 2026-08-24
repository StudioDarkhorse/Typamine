"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MoveRight, Sparkles } from "lucide-react";
import { Formula } from "@/types";
import { Badge } from "@/components/common/Badge";

interface FormulaCardProps {
  formula: Formula;
  /** Collezione curata a mano in admin, invece che generata da una regola programmatica. */
  isCurated?: boolean;
}

// Funzione helper per generare il codice estetico
const getAestheticCode = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const getRandomLetter = () => letters.charAt(Math.floor(Math.random() * letters.length));

  const part1 = getRandomLetter();
  const part2 = getRandomLetter() + getRandomLetter();
  // Genera un numero da 0 a 99 e aggiunge uno zero iniziale se necessario (es. "04")
  const part3 = Math.floor(Math.random() * 100).toString().padStart(2, "0");

  return `${part1}-${part2}-${part3}`;
};

export const FormulaCard: React.FC<FormulaCardProps> = ({ formula, isCurated = false }) => {
  // Nessun "code" persistito nel modello: è solo un'etichetta estetica,
  // generata lato client per evitare errori di idratazione in Next.js.
  const [displayCode, setDisplayCode] = useState<string>("---");

  useEffect(() => {
    setDisplayCode(getAestheticCode());
  }, []);

  return (
    <Link
      href={`/formulas/${formula.slug}`}
      className="border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 p-4 rounded-lg flex flex-col sm:flex-row sm:items-stretch justify-between gap-4 transition-all group hover:border-zinc-400 dark:hover:border-zinc-700 cursor-pointer"
    >
      <div className="space-y-1 min-w-0 flex-1">
        <div className="flex items-center flex-wrap gap-2">
          <span className="font-haas text-[10px] bg-zinc-100 dark:bg-zinc-900 text-ocragray-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded">
            {displayCode}
          </span>
          <h3 className="font-haas text-lg font-bold text-foreground">{formula.name}</h3>
        </div>
        <p className="text-ocragray-800 dark:text-zinc-200 line-clamp-2">{formula.description}</p>
        <p className="font-haas text-sm text-ocragray-800 dark:text-zinc-200 capitalize mt-2">INGREDIENTS: {formula.fonts.slice(0, 2).map(f => f.name).join(" + ").replaceAll('_', " ") + "..."} </p>
      </div>

      <div className="shrink-0 font-haas text-[10px] flex flex-col items-end justify-between border-t sm:border-t-0 border-zinc-200 dark:border-zinc-800 pt-2 sm:pt-0.5 sm:pb-1 gap-2 sm:gap-0">
        {isCurated ? (
          <div className="pe-4">
            <Badge className="!text-[9px] !py-0.5" ping>
              Typamine Selection
            </Badge>
          </div>
        ) : (
          <div />
        )}

        <div className="flex flex-row items-center gap-2 font-x-typewriter font-bold text-lg font-bold text-red transition-colors pe-4 whitespace-nowrap hover:underline">
          View All
          <MoveRight size={12} className="icon-altalenante" />
        </div>
      </div>
    </Link>
  );
};
