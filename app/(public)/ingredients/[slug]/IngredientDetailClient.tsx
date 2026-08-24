"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveLeft, Sparkles, ArrowRight, FileSignature, Download, Loader2 } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";
import { useThemeStore } from "@/store/themeStore";
import Grainient from "@/components/cherry/Grainient";
import { DynamicPlayground } from "@/components/font/DynamicPlayground";
import GlyphMatrix from "@/components/font/GlyphMatrix";
import { getDeterministicFormula } from "@/lib/utils";
import { Cta } from "@/components/common/Cta";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import BaseModal from "@/components/common/BaseModal";
import IngredientHeader from "@/components/font/IngredientHeader";
import { Ingredient } from "@/types";
import { NON_REAL_FONT_AUTHOR_SLUGS } from "@/lib/constants/placeholderFontAuthors";
import { isFreeLicense } from "@/lib/constants/fontLicenseTypes";

// Licenze considerate abbastanza libere da consentire il download diretto —
// tutte le altre (incluso "non ancora classificata") mostrano il modale di
// attesa consenso invece di scaricare, finché non c'è un accordo firmato
// con l'autore. Definizione condivisa (vedi lib/constants/fontLicenseTypes.ts):
// lo stesso criterio conta i font "da autorizzare" nella mail all'autore, e
// due liste separate avrebbero potuto divergere.

interface IngredientDetailClientProps {
  ingredient: Ingredient;
  hasPairings?: boolean;
  hasVoted?: boolean;
}

export default function IngredientDetailClient({ ingredient, hasPairings = false, hasVoted = false }: IngredientDetailClientProps) {
  const { theme } = useThemeStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const isLicenseFree = isFreeLicense(ingredient.licenseType);

  const fontData = {
    name: ingredient.name,
    fontFamily: ingredient.variants?.[0]?.fontFamilyName || "sans-serif",
    fontUrl: ingredient.variants?.[0]?.woff2Url,
  };

  const prescriptionsHref = `/prescriptions?font=${encodeURIComponent(ingredient.name)}`;
  const tags = ingredient.tags || [];
  const hasTags = tags.length > 0;
  const showRightSidebar = hasPairings || hasTags;

  const sourceUrl = ingredient.variants?.[0]?.woff2Url;

  // Stessa palette già usata sotto per il Grainient di PageHeading — riusata
  // anche per lo sfondo della sidebar destra, stesso trattamento theme-aware
  // del pannello dossier in ArchivePostDetailClient.
  const grainientColorsHeader = {
    color1: theme === "light" ? "#fdfdfd" : "#09090b",
    color2: theme === "light" ? "#c0d3ed" : "#570d22",
    color3: theme === "light" ? "#e5e7eb" : "#27272a",
  };

  const grainientColors = {
    color1: theme === "light" ? "#fdfdfd" : "#2e1e01",
    color2: theme === "light" ? "#7fa8e0" : "#570d22",
    color3: theme === "light" ? "#bbcff7" : "#614725",
  };

  // Il file reale su R2 non ha un nome utile (spesso solo l'id della variante),
  // quindi lo rinominiamo lato client sullo slug prima del download. L'attributo
  // `download` di un <a> viene ignorato dai browser per URL cross-origin come
  // assets.typamine.com, quindi serve scaricare il blob e servirlo da un
  // object URL same-origin perché il rename abbia effetto.
  const handleDownloadClick = () => {
    if (!isLicenseFree) {
      setIsLicenseModalOpen(true);
      return;
    }
    handleDownload();
  };

  const handleDownload = async () => {
    if (!sourceUrl || isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) throw new Error(`Download failed with status ${response.status}`);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${ingredient.slug}.woff2`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);

      // Fire-and-forget: non blocca/rallenta il download dell'utente se fallisce.
      fetch(`/api/ingredients/${ingredient.slug}/download`, { method: "POST" }).catch(() => { });
    } catch (err) {
      console.error("Font download failed, falling back to direct link:", err);
      window.open(sourceUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 space-y-4">
      {/* Back button */}
      <div className="mb-4">
        <MinimalLink
          href="/ingredients"
          label="Back to Ingredients"
          icon={<MoveLeft size={12} />}
          iconPosition="left"
          className="ml-4 font-bold tracking-widest text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white"
        />
      </div>


      <IngredientHeader
        ingredient={ingredient}
        hasVoted={hasVoted}
        sourceUrl={sourceUrl}
        isDownloading={isDownloading}
        isLicenseFree={isLicenseFree}
        grainientOptions={grainientColorsHeader}
        onDownloadClick={handleDownloadClick}
      />

      {showRightSidebar ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <DynamicPlayground
              font={fontData}
              hideFontSelector={true}
            />
          </div>

          <section className="lg:col-span-1 relative overflow-hidden flex flex-col justify-between gap-6 p-6 border border-black/5 dark:border-white/5 rounded-lg backdrop-blur-xl">
            <div className="absolute inset-0 h-full z-0 pointer-events-none opacity-50 dark:opacity-40">
              <Grainient
                timeSpeed={0.5}
                colorBalance={0}
                warpStrength={0.5}
                warpFrequency={3}
                warpSpeed={0.5}
                warpAmplitude={30}
                blendAngle={0}
                blendSoftness={0.1}
                rotationAmount={100}
                noiseScale={2}
                grainAmount={0.15}
                grainScale={1.5}
                grainAnimated={false}
                contrast={1.2}
                gamma={1}
                saturation={0.7}
                centerX={0}
                centerY={0}
                zoom={1}
                color1={grainientColors.color1}
                color2={grainientColors.color2}
                color3={grainientColors.color3}
              />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-between gap-6">
              {/* Top Section: Tags */}
              {hasTags && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200 font-haas block">
                    TAGS & CATEGORIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: any) => {
                      const tagId = typeof tag === "string" ? tag : tag.id;
                      const tagName = typeof tag === "string" ? tag : tag.name;
                      return (
                        <Link key={tagId} href={`/ingredients?tags=${encodeURIComponent(tagName)}`}>
                          <Badge hoverZoom>{tagName}</Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Divider when both tags and pairings are present */}
              {hasTags && hasPairings && (
                <div className="border-t border-black/10 dark:border-white/10 my-1" />
              )}

              {/* Bottom Section: Pairings */}
              {hasPairings && (
                <div className="space-y-4 flex flex-col justify-end">
                  <p className="text-sm text-ocragray-800 dark:text-zinc-200 mt-1 leading-relaxed">
                    See examples of how we used this font in our Pairings.
                  </p>
                  <Link href={prescriptionsHref} className="inline-block self-end">
                    <Button variant="outline" size="md" roundness="md" className="flex items-center gap-2">
                      See Examples
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      ) : (
        <DynamicPlayground
          font={fontData}
          hideFontSelector={true}
        />
      )}

      {/* Download: su desktop è nell'header, su mobile è nascosto lì e ripetuto qui sotto il playground */}
      <button
        onClick={handleDownloadClick}
        disabled={!sourceUrl || isDownloading}
        className="md:hidden w-full px-5 py-3 bg-red text-black font-x-typewriter font-bold font-bold text-xs rounded hover:bg-red-600 transition-colors glow-red disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {isDownloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
        {isDownloading ? "PREPARING..." : "DOWNLOAD WOFF2"}
      </button>

      {/* Confronto glifo per glifo con Alte Haas Grotesk: mostra copertura del
          set di caratteri e differenze di proporzioni rispetto al font di
          sistema del sito. */}
      <GlyphMatrix
        fontName={ingredient.name}
        fontFamily={fontData.fontFamily}
        fontUrl={fontData.fontUrl}
      />

      <BaseModal isOpen={isLicenseModalOpen} onClose={() => setIsLicenseModalOpen(false)} size="md">
        <BaseModal.Header onClose={() => setIsLicenseModalOpen(false)}>
          <div className="flex items-center gap-4">
   
            <h2 className="text-4xl w-fit text-center leading-[1.6rem] font-x-typewriter text-black dark:text-white">Licensing In Progress</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-haas leading-relaxed">
              {ingredient.author && !NON_REAL_FONT_AUTHOR_SLUGS.includes(ingredient.author.slug) ? (
                <>
                  We're currently reaching out to <span className="font-bold text-black dark:text-white">{ingredient.author.name}</span> to secure a signed distribution agreement.
                </>
              ) : (
                <>
                  We're currently reaching out to <span className="font-bold text-black dark:text-white">{ingredient.name}</span>'s author(s) to secure a signed distribution agreement.
                </>
              )}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-haas leading-relaxed">
              Once the license is confirmed, this font will unlock for download right here — no extra steps needed on your end. We'd rather take the time to do this properly than offer a download we're not legally clear to give you.
            </p>
            <p className="text-xs text-black dark:text-white italic font-haas leading-relaxed">
              In the meantime, feel free to explore the live preview, try it in the Labs Bench, or check out how it pairs with other typefaces in our Prescriptions.
            </p>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <Button
            onClick={() => setIsLicenseModalOpen(false)}
            variant="primary"
            size="md"
            roundness="md"
            fullWidth
          >
            Got It
          </Button>
        </BaseModal.Footer>
      </BaseModal>

      <Cta
        title={<>Need <span className="text-blue-600 dark:text-red px-2">integration</span> tools?</>}
        subtitle="Head over to the Labs Bench for @font-face snippet generators, WCAG contrast ratio checkers for accessibility, Tailwind CSS utilities, and much more."
        align="right"
        bgImage="/images/ingredient/cta-bg.png"

      >
        <Link href={`/labs?ingredient=${ingredient.slug}`} className="inline-block">
          <Button variant="secondary" >ENTER THE LABS</Button>
        </Link>
      </Cta>
    </div>
  );
}
