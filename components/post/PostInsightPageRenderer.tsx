"use client";

import React from 'react';

import Paragraph from '@/components/common/Paragraph';
import Markdown from '@/components/common/Markdown';
import ParagraphWithImage from '@/components/common/ParagraphWithImage';
import Quote from '@/components/common/Quote';
import SimpleHero from '@/components/common/SimpleHero';
import GridHero from '@/components/common/GridHero';
import HorizontalSlider from '@/components/common/HorizontalSlider';
import ActionCta from '@/components/common/ActionCta';
import Spacer from '@/components/common/Spacer';
import { COLOR_PAIRS, FONT_FAMILIES } from '@/components/admin/common/content-modules/shared';
import { dynamicTextStyle } from '@/lib/dynamicStyle';

import { cn } from "@/lib/utils";

// Renderer generico per Post.insight — usato sia da /archive/[slug] che da
// /blog/[slug]. Gestisce tutti gli 8 tipi di content-module (l'admin di
// /admin/archive ne offre solo 3 — paragraph/paragraphWithImage/quote — quindi
// gli altri 5 case semplicemente non compaiono mai in un ArchivePost, ma sono
// necessari per i moduli aggiuntivi che /admin/blog offre).
const COLOR_PAIRS_MAP: Record<string, string> = Object.fromEntries(
  COLOR_PAIRS.map((c) => [c.id, c.classes])
);

const FONT_FAMILIES_MAP: Record<string, string> = Object.fromEntries(
  FONT_FAMILIES.map((f) => [f.id, f.class])
);

interface InsightModule {
  id: string;
  type: string;
  props: Record<string, any>;
}

const resolveMediaUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith('media://')) {
    const key = url.replace('media://', '');
    return `/api/media/${key}`;
  }
  return url;
};

export type InsightSection = "archive" | "blog";

export interface PostInsightPageRendererProps {
  content: string;
  section?: InsightSection;
}

const ARCHIVE_BORDER = "lg:border border-ocragray-500/80 dark:border-ocragray-200/50 p-4";

// Stesso "case-file box" (margine + bordo) per paragraph/paragraphWithImage/quote
// in archive, applicato SEMPRE sul <section> esterno (block, width auto) — mai
// dentro il className/containerClassName interno dei componenti, dove elementi
// con `w-full` combinato a un margine sborderebbero invece di restringersi
// (width:100% + margin è extra rispetto al 100%, non lo sottrae). Applicato in
// modo uniforme a TUTTI i casi (incluso imagePosition="background"), non solo
// quando c'è testo+immagine affiancati — prima veniva escluso lì ed era la
// causa dell'immagine "sbordata" rispetto al testo semplice sopra.
const SECTION_WRAP_CLASSNAMES: Record<InsightSection, string> = {
  archive: "mx-0 lg:mx-8 " + ARCHIVE_BORDER,
  blog: "",
};

// Stile decorativo del solo componente Quote in blog (angoli arrotondati sulla
// card), indipendente dal wrap di sezione sopra — resta per-componente perché
// non ha equivalente per paragraph/paragraphWithImage.
const BLOG_QUOTE_SHAPE = "rounded-tl-[6rem] rounded-br-[6rem]";

export default function PostInsightPageRenderer({ content, section }: PostInsightPageRendererProps) {
  let modules: InsightModule[] = [];

  try {
    modules = JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse post insight content:", e);
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-y-4 text-black dark:text-white">
      {modules.map((module) => {
        const { id, type, props } = module;

        switch (type) {
          case 'paragraph': {
            const sectionWrap = section ? SECTION_WRAP_CLASSNAMES[section] : "";
            return (
              <section key={id} className={sectionWrap}>
                <Paragraph
                  as={props.as}
                  size={props.size}
                  align={props.align}
                  weight={props.weight}
                  colorClassName={props.colorClassName}
                  className={cn(
                    "lg:p-4",
                    COLOR_PAIRS_MAP[props.colors],
                    FONT_FAMILIES_MAP[props.fontFamily]
                  )}
                >
                  {props.children}
                </Paragraph>
              </section>
            );
          }

          case 'markdown': {
            // Stesso wrap di sezione del paragraph: il modulo markdown è a
            // tutti gli effetti un paragrafo, solo con struttura interna
            // (liste, heading, grassetto/corsivo, br) invece che testo piatto.
            const sectionWrap = section ? SECTION_WRAP_CLASSNAMES[section] : "";
            return (
              <section key={id} className={sectionWrap}>
                <Markdown
                  content={props.content}
                  size={props.size}
                  align={props.align}
                  colorClassName={props.colorClassName}
                  className={cn("lg:p-4", FONT_FAMILIES_MAP[props.fontFamily])}
                />
              </section>
            );
          }

          case 'paragraphWithImage': {
            const isBg = props.imagePosition === 'background';
            const sectionWrap = section ? SECTION_WRAP_CLASSNAMES[section] : "";
            // Niente px-6 md:px-12 qui: containerClassName sotto ha gia' p-8
            // di suo quando non e' background — raddoppiava il padding
            // orizzontale su ogni breakpoint sotto lg.
            return (
              <section key={id} className={sectionWrap}>
                <ParagraphWithImage
                  imageSrc={resolveMediaUrl(props.imageUrl || props.image || props.imageSrc) || ""}
                  imageAlt={props.imageAlt}
                  imagePosition={props.imagePosition}
                  imageAspectRatio={props.imageAspectRatio}
                  parallax={props.parallax}
                  parallaxSpeed={props.parallaxSpeed}
                  overlayOpacity={props.overlayOpacity}
                  size={props.size}
                  weight={props.weight}
                  colorClassName={props.colorClassName}
                  containerClassName={cn(
                    "overflow-hidden",
                    !isBg && cn("lg:p-8", COLOR_PAIRS_MAP[props.colors])
                  )}
                  className={cn(FONT_FAMILIES_MAP[props.fontFamily])}
                  imageClassName='rounded-none'
                >
                  {props.children}
                </ParagraphWithImage>
              </section>
            );
          }

          case 'quote': {
            // bgColorClassName/colorClassName sono stringhe Tailwind dinamiche
            // (colore + opacità scelti in admin, sfondo anche a gradiente):
            // passate come prop dedicate, Quote le risolve in CSS reale
            // internamente (vedi lib/dynamicStyle.ts) invece di iniettarle
            // come classi statiche che Tailwind non genererebbe mai.
            const fallbackBgClass = props.bgColorClassName ? undefined : (COLOR_PAIRS_MAP[props.colors] || "bg-zinc-100/20 dark:bg-black/20");
            // Quote resta full-width, senza il mx-8+border del "case-file box"
            // usato da paragraph/paragraphWithImage — a differenza loro. NESSUN
            // padding verticale qui: sommandosi al py-12 del wrapper esterno
            // (vedi ArchivePostDetailClient) raddoppiava il bottom quando la
            // pagina finiva con un quote. Il ritmo verticale tra moduli è tutto
            // gap-y-4 sul contenitore dei moduli + il py-12 del wrapper esterno.

            // Niente padding sul <section>: Quote sotto ha gia' p-8 di suo
            // (vedi className passata) — un altro px-4/lg:px-8 qui raddoppiava
            // il padding orizzontale su ogni breakpoint.
            return (
              <section key={id}>
                <Quote
                  author={props.author}
                  authorDates={props.authorDates}
                  authorInfo={props.authorInfo}
                  colorClassName={props.colorClassName}
                  bgColorClassName={props.bgColorClassName}
                  className={cn(
                    "lg:mx-8 p-8 backdrop-blur-md",
                    fallbackBgClass,
                    FONT_FAMILIES_MAP[props.fontFamily],
                    section === "blog" && BLOG_QUOTE_SHAPE
                  )}
                >
                  {props.children}
                </Quote>
              </section>
            );
          }

          case 'simpleHero':
            return (
              <section key={id}>
                <SimpleHero
                  title={props.title}
                  subtitle={props.subtitle}
                  imageSrc={resolveMediaUrl(props.imageSrc)}
                  imageAlt={props.imageAlt}
                  align={props.align}
                  vAlign={props.vAlign}
                  titleColorClassName={props.titleColorClassName}
                  titleFontFamily={props.titleFontFamily}
                  subtitleColorClassName={props.subtitleColorClassName}
                  subtitleFontFamily={props.subtitleFontFamily}
                  overlayColorClassName={props.overlayColorClassName}
                />
              </section>
            );

          case 'gridHero':
            return (
              <section key={id}>
                <GridHero
                  imageSrc={resolveMediaUrl(props.imageSrc)}
                  imageAlt={props.imageAlt}
                  imagePosition={props.imagePosition}
                  topTitle={props.topTitle}
                  topSubtitle={props.topSubtitle}
                  topBgColorClassName={props.topBgColorClassName}
                  topTitleColorClassName={props.topTitleColorClassName}
                  topTitleFontFamily={props.topTitleFontFamily}
                  topSubtitleColorClassName={props.topSubtitleColorClassName}
                  topSubtitleFontFamily={props.topSubtitleFontFamily}
                  bottomParagraph={props.bottomParagraph}
                  bottomBgColorClassName={props.bottomBgColorClassName}
                  bottomParagraphColorClassName={props.bottomParagraphColorClassName}
                  bottomFontFamily={props.bottomFontFamily}
                  hasButton={props.hasButton}
                  buttonLabel={props.buttonLabel}
                  buttonHref={props.buttonHref}
                  buttonVariant={props.buttonVariant}
                />
              </section>
            );

          case 'horizontalSlider':
            return (
              <section key={id}>
                <HorizontalSlider
                  title={props.title}
                  subtitle={props.subtitle}
                  titleColorClassName={props.titleColorClassName}
                  subtitleColorClassName={props.subtitleColorClassName}
                  bgColorClassName={props.bgColorClassName}
                  cardColorClassName={props.cardColorClassName}
                  items={props.items}
                />
              </section>
            );

          case 'actioncta':
            return (
              <section key={id}>
                <ActionCta
                  title={props.title}
                  paragraph={props.paragraph}
                  imageSrc={resolveMediaUrl(props.imageSrc)}
                  imageAlt={props.imageAlt}
                  imagePosition={props.imagePosition}
                  titleColorClassName={props.titleColorClassName}
                  paragraphColorClassName={props.paragraphColorClassName}
                  fontFamily={props.fontFamily}
                  buttonOneLabel={props.buttonOneLabel}
                  buttonOneLink={props.buttonOneLink}
                  buttonOneVariant={props.buttonOneVariant}
                  buttonOneIsExternal={props.buttonOneIsExternal}
                  buttonTwoLabel={props.buttonTwoLabel}
                  buttonTwoLink={props.buttonTwoLink}
                  buttonTwoVariant={props.buttonTwoVariant}
                  buttonTwoIsExternal={props.buttonTwoIsExternal}
                />
              </section>
            );

          case 'spacer':
            return (
              <Spacer
                key={id}
                height={props.height}
                type={props.type}
                lineColorClassName={props.lineColorClassName}
                lineHeight={props.lineHeight}
                lineWidth={props.lineWidth}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
