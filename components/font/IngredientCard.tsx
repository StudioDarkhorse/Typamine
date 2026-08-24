import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Ingredient } from "@/types";
import { getDeterministicFormula } from "@/lib/utils";
import LivePreview from "@/components/common/LivePreview";
import { NON_REAL_FONT_AUTHOR_SLUGS } from "@/lib/constants/placeholderFontAuthors";

// Mai mostrare al pubblico un nome-placeholder o una stringa "sorgente
// d'import" al posto di un autore reale: nessuno dei casi seguenti diventa
// mai altro che "UNKNOWN" — font.author su un placeholder d'import (da
// controllare) o sul terminale "unknown after AI check" (controllato,
// ignoto), oppure font.creator con un vecchio valore grezzo pre-rework tipo
// "Typamine Import" o il letterale "Unknown" scritto dall'AI.
const RAW_IMPORT_CREATOR_LABELS = new Set(["typamine import", "google fonts", "fontshare", "unknown"]);

export function getPublicCreatorLabel(font: Ingredient): string {
    if (font.author && !NON_REAL_FONT_AUTHOR_SLUGS.includes(font.author.slug)) {
        return font.author.name;
    }
    if (font.creator && !RAW_IMPORT_CREATOR_LABELS.has(font.creator.trim().toLowerCase())) {
        return font.creator;
    }
    return "UNKNOWN";
}
interface FontCardProps {
    font: Ingredient;
    idx: number;
    linklabel?: string;
    fontSize?: number;
    className?: string;
}

// Funzioni di supporto per identificare vocali e consonanti
const isVowel = (char: string) => /[aeiouAEIOU]/.test(char);
const isConsonant = (char: string) => /[a-zA-Z]/.test(char) && !isVowel(char);

// Estrae la prima vocale o la prima consonante trovata in una stringa
const getFirstCharOfType = (str: string, type: 'vowel' | 'consonant'): string | null => {
    for (const char of str) {
        if (type === 'vowel' && isVowel(char)) return char;
        if (type === 'consonant' && isConsonant(char)) return char;
    }
    return null;
};

// Logica per ottenere la seconda lettera della "formula" in modo deterministico
const getSecondLetter = (str: string, seed: number): string => {
    if (!str) return 'x'; // Fallback di sicurezza

    const pickVowel = seed % 2 === 0;
    let char = getFirstCharOfType(str, pickVowel ? 'vowel' : 'consonant');

    // Fallback: se avevamo scelto vocale ma non ce ne sono, prendiamo una consonante (e viceversa)
    if (!char) {
        char = getFirstCharOfType(str, pickVowel ? 'consonant' : 'vowel');
    }

    return char || 'x'; // Ultimo fallback se la stringa contiene solo numeri/simboli
};

export const GetSymbol = ({ fontName }: { fontName: string }): string => {
    if (!fontName) return "Zx";

    // Dividiamo per spazi multipli per evitare problemi con doppi spazi accidentali
    const words = fontName.trim().split(/\s+/);

    const firstLetter = words[0].charAt(0);
    // Creiamo un "seed" deterministico basato sulla stringa stessa (es. lunghezza + codice del primo carattere)
    const seed = fontName.length + fontName.charCodeAt(0);
    let secondLetter = 'x';

    if (words.length === 1) {
        // CASO 1: Singola parola
        // Cerchiamo nel resto della parola (escludendo la prima lettera)
        const remainingStr = words[0].slice(1);
        secondLetter = getSecondLetter(remainingStr, seed);
    } else {
        // CASO 2: Più parole
        // Prendiamo la seconda parola, e la terza se esiste
        const targetWords = words.slice(1, 3);

        // Scegliamo in base al seed invece che Math.random() per mantenere la consistenza in SSR
        const chosenWordIndex = (targetWords.length > 1 && seed % 2 === 0) ? 1 : 0;
        const chosenWord = targetWords[chosenWordIndex];

        secondLetter = getSecondLetter(chosenWord, seed);
    }

    // Formattazione stile Tavola Periodica: Prima Maiuscola, seconda minuscola
    const rawSymbol = firstLetter + secondLetter;
    return rawSymbol.charAt(0).toUpperCase() + rawSymbol.charAt(1).toLowerCase();
};

export const IngredientCard: React.FC<FontCardProps> = ({ font, idx, linklabel = "Test Now", fontSize, className = "" }) => {
    const isRealAuthor = font.author && !NON_REAL_FONT_AUTHOR_SLUGS.includes(font.author.slug);

    return (
        <div
            className={"border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 rounded-lg p-2 transition-all flex flex-col justify-between group relative overflow-hidden " + className}
        >
            {/* Invisible link covering the entire card container */}
            <Link
                href={"/ingredients/" + font.slug}
                className="absolute inset-0 z-10"
            />

            {/* Corner tag index */}
            <div className="absolute top-2 right-2 pe-2 font-haas text-[10px] text-ocra-600/80 dark:text-ocra-200/80 z-20 pointer-events-none">
                REF-0{idx + 1}
            </div>

            {/* Chemical Element layout */}
            <div className="space-y-4 mt-4 relative z-20 pointer-events-none">
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 ml-2 border border-blue/30 rounded bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center font-haas font-bold text-lg text-blue group-hover:border-blue group-hover:glow-cyan transition-all">
                        {GetSymbol({ fontName: font.name })}
                    </div>
                    <div className="text-right font-haas pe-2">
                        <span className="text-[10px] text-ocragray-800 dark:text-zinc-200 uppercase block">{font.category}</span>
                        <span className="text-xs text-ocragray-800 dark:text-zinc-200 font-bold block">
                            {font.formula || getDeterministicFormula(font.name)}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="ps-2 font-haas font-bold text-sm text-foreground">{font.name.replaceAll('_', " ")}</h3>
                    {/* Sempre renderizzato (anche senza creator) per non far scattare l'altezza della card */}
                    <p className="ps-2 font-haas text-[10px] text-ocragray-800 dark:text-zinc-200 mt-0.5">
                        CREATOR:{" "}
                        {isRealAuthor ? (
                            <Link
                                href={"/author/" + font.author!.slug}
                                className="text-foreground font-bold underline relative z-30 pointer-events-auto"
                            >
                                {getPublicCreatorLabel(font)}
                            </Link>
                        ) : (
                            <span className="text-foreground font-bold">{getPublicCreatorLabel(font)}</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Live Preview Sample */}
            <div className="relative z-20 pointer-events-none">
                <LivePreview
                    fontName={font.variants?.[0]?.fontFamilyName || font.name}
                    fontUrl={font.variants?.[0]?.woff2Url}
                    initialSize={fontSize || 18}
                    showToolbar={false}
                    showControls={false}
                    showBackgroundGlow={false}
                    editable={false}
                    compact
                    className="my-4"
                />
            </div>

            <div className="pt-2 pe-2 mx-2 flex justify-between items-center border-t border-zinc-400/50 relative z-20 pointer-events-none">
                <span className="font-haas text-[10px] text-ocragray-800 dark:text-zinc-200">OUR SCORE: <span className="text-ocra-400 font-x-typewriter font-bold">{font.rating}</span></span>
                <span className="flex flex-row items-center gap-2 font-x-typewriter font-bold text-sm text-red hover:underline transition-colors pe-1">
                    {linklabel}
                    <MoveRight size={12} className="icon-altalenante" />
                </span>
            </div>
        </div>
    );
};
