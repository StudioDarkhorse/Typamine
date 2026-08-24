"use client";

import { DoubleHero } from "@/components/common/DoubleHero";
import MinimalLink from "@/components/common/MinimalLink";
import { IngredientCard } from "@/components/font/IngredientCard";
import { IngredientCardSkeleton } from "@/components/font/skeletons/IngredientCardSkeleton";
import { PrescriptionCard } from "@/components/pairing/PrescriptionCard";
import { PrescriptionCardSkeleton } from "@/components/pairing/skeletons/PrescriptionCardSkeleton";
import { FormulaCard } from "@/components/collection/FormulaCard";
import { Cta } from "@/components/common/Cta";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";
import { Formula, Ingredient, Prescription, AdminSettings } from "@/types";
import HomepageBanner from "@/components/layout/HomepageBanner";
import PopupModal from "@/components/layout/PopupModal";
import HeroWordmark from "@/components/layout/HeroWordmark";

interface HomeClientProps {
  recentIngredients?: Ingredient[];
  recentPairings?: Prescription[];
  featuredFormulas?: { formula: Formula; isCurated: boolean }[];
  adminSettings?: AdminSettings;
}

export default function HomeClient({ recentIngredients = [], recentPairings = [], featuredFormulas = [], adminSettings }: HomeClientProps) {
  const showHomepageBanner = adminSettings?.marqueeActive && adminSettings.marqueeType === "homepage_banner";
  const { theme } = useThemeStore();
  const dynamicHeroBgImageUrl = theme === "dark" ? "/images/home/double-hero/hero-bg-dark.png" : "/images/home/double-hero/hero-bg-light.png";

  const safeIngredients = recentIngredients || [];
  const safePairings = recentPairings || [];

  return (
    <div className="flex flex-col">
      {adminSettings && <PopupModal settings={adminSettings} />}

      {/* 1. DOUBLE HERO SECTION */}
      <DoubleHero bgImage={dynamicHeroBgImageUrl} fullWidth>
        <DoubleHero.FirstViewport className="pt-24 pb-12 px-6 md:px-12 flex flex-col items-center justify-center gap-8">
          <HeroWordmark
            fonts={adminSettings?.heroWordmarkFontsResolved ?? []}
            loop={adminSettings?.heroWordmarkLoop ?? true}
            loopSpeed={adminSettings?.heroWordmarkLoopSpeed ?? 1}
            logoLightModeColor={adminSettings?.logoLightModeColor}
            logoDarkModeColor={adminSettings?.logoDarkModeColor}
            className="font-rezland text-black dark:text-white text-[clamp(3rem,9vw,8rem)] mx-auto"
          />


        </DoubleHero.FirstViewport>

        <DoubleHero.SecondViewport fixedHeight={140} className="pb-12 flex flex-col">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 mt-auto">
            {/* 3. FEATURED INGREDIENTS (FONT TILES) — unica sezione rimasta dentro
                DoubleHero: Prescriptions e tutto il resto sono stati spostati fuori. */}
            <section className="space-y-4 pb-32">
              <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-red font-haas text-sm">[+]</span>
                  <h2 className="font-haas text-sm font-bold tracking-wider">LAST IMPORTED INGREDIENTS // Fonts</h2>
                </div>
                <MinimalLink href="/ingredients" label="ALL FONTS" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {safeIngredients.length === 0
                  ? Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={idx >= 4 ? (idx >= 6 ? "hidden lg:block" : "hidden sm:block") : "block"}
                    >
                      <IngredientCardSkeleton />
                    </div>
                  ))
                  : safeIngredients.slice(0, 8).map((font, idx) => (
                    <div
                      key={font.id}
                      className={idx >= 4 ? (idx >= 6 ? "hidden lg:block" : "hidden sm:block") : "block"}
                    >
                      <IngredientCard font={font} idx={idx} />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </DoubleHero.SecondViewport>
      </DoubleHero>

      {showHomepageBanner && (
        <HomepageBanner
          text={adminSettings?.marqueeText || ""}
          textColorClassName={adminSettings?.marqueeTextColor}
          bgColorClassName={adminSettings?.marqueeBgColor}
        />
      )}

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 4. OUR PRESCRIPTIONS (PAIRINGS) — ora fuori da DoubleHero, primo
            elemento di questo contenitore: mt-48 piatto basta perché il
            confine DoubleHero->div successivo (py-8 doppio + margini interni)
            aggiunge da solo l'extra necessario per arrivare allo stesso gap
            totale (304px = 19rem) delle altre transizioni — stesso meccanismo
            di cui prima beneficiava Formulas, quando era lei subito dopo DoubleHero. */}
        <section className="space-y-4 mt-48 lg:mt-0">
          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <div className="flex items-center space-x-2">
              <span className="text-ocragray-800 dark:text-zinc-200 font-haas text-sm">[x]</span>
              <h2 className="font-haas text-sm font-bold tracking-wider">POPULAR PRESCRIPTIONS // Font Pairing Examples</h2>
            </div>
            <MinimalLink href="/prescriptions" label="OUR PAIRING SELECTION" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safePairings.length === 0
              ? Array.from({ length: 4 }).map((_, idx) => (
                <PrescriptionCardSkeleton key={idx} />
              ))
              : safePairings.map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
          </div>
        </section>

        {/* 5. ACTIVE FORMULAS (COLLECTIONS) — stesso contenitore di Prescriptions
            sopra, nessun confine da attraversare: serve il margin-top esplicito
            più grande (stesso ruolo che prima aveva la sezione Prescriptions). */}
        <section className="space-y-4 mt-[19rem] lg:mt-0">
          <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <div className="flex items-center space-x-2">
              <span className="text-blue font-haas text-sm">[o]</span>
              <h2 className="font-haas text-sm font-bold tracking-wider">FEATURED FORMULAS // Collections</h2>
            </div>
            <MinimalLink href="/formulas" label="BROWSE COLLECTIONS" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredFormulas.map(({ formula, isCurated }) => (
              <FormulaCard key={formula.id} formula={formula} isCurated={isCurated} />
            ))}
          </div>
        </section>

        {/* 6. CTA SECTION — stesso mt-[19rem] della sezione Prescriptions sopra
            (stesso contenitore, nessun confine da attraversare): vedi nota lì. */}
        <div className="mt-[19rem] lg:mt-0">
          <Cta
            title={<>Daily <span className="text-blue-600 dark:text-red px-2">Typographic</span> Pills</>}
            subtitle="Subscribe to our blog for weekly doses of typographic inspiration, technical tutorials, and experimental font pairings directly to your console."
            align="center"
            useGrainient
            useGlassmorphism
            grainientOptions={{
              color1: theme === "light" ? "#c1dada" : "#321c1c",
              color2: theme === "light" ? "#024A70" : "#7c1111",
              color3: theme === "light" ? "#FCCEE9" : "#fca2a2",
            }}
          >
            <Link href="/pills" className="inline-block">
              <Button variant="metallic" ringColor="ring-blue-200 dark:ring-red-200">READ THE BLOG</Button>
            </Link>
          </Cta>
        </div>
      </div>
    </div>
  );
}
