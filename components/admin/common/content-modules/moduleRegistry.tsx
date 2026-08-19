import {
  Image as ImageIcon,
  Layout,
  Type,
  Quote as QuoteIcon,
  Columns,
  MoveRight,
  ExternalLink,
  Minus,
  FileText,
} from "lucide-react";
import { Module as GenericModule } from "@/components/admin/common/content-modules/shared";
import SimpleHeroModule from "@/components/admin/common/content-modules/SimpleHeroModule";
import GridHeroModule from "@/components/admin/common/content-modules/GridHeroModule";
import ParagraphModule from "@/components/admin/common/content-modules/ParagraphModule";
import QuoteModule from "@/components/admin/common/content-modules/QuoteModule";
import ParagraphWithImageModule from "@/components/admin/common/content-modules/ParagraphWithImageModule";
import HorizontalSliderModule from "@/components/admin/common/content-modules/HorizontalSliderModule";
import ActionCtaModule from "@/components/admin/common/content-modules/ActionCtaModule";
import SpacerModule from "@/components/admin/common/content-modules/SpacerModule";
import MarkdownModule from "@/components/admin/common/content-modules/MarkdownModule";

// Registro unico dei content-module — prima duplicato 3 volte (ArchivePostForm,
// PairingForm, BlogForm) con lo stesso identico switch/default-props/icone.
// Usato da PostForm con MODULE_OPTIONS_FULL per postType "BLOG" (tutte le 9
// varianti, markdown incluso) e MODULE_OPTIONS_BASIC per postType "ARCHIVE"
// (le 3 storiche).
// PairingForm mantiene la propria copia locale, fuori scope di questo refactor.

export type ModuleType =
  | "paragraph"
  | "markdown"
  | "paragraphWithImage"
  | "quote"
  | "simpleHero"
  | "gridHero"
  | "horizontalSlider"
  | "actioncta"
  | "spacer";

export interface Module extends GenericModule {
  type: ModuleType;
}

export function getModuleDefaultProps(type: ModuleType): Record<string, any> {
  switch (type) {
    case "simpleHero":
      return { title: '', subtitle: '', imageSrc: '', imageAlt: 'Hero image', align: 'center', vAlign: 'center', titleColorClassName: 'text-white/100 dark:text-white/100', titleFontFamily: 'standard', subtitleColorClassName: 'text-white/80 dark:text-white/80', subtitleFontFamily: 'standard', overlayColorClassName: 'bg-black/40 dark:bg-black/40' };
    case "gridHero":
      return {
        imageSrc: '',
        imageAlt: 'GridHero image',
        imagePosition: 'left',
        topTitle: '',
        topSubtitle: '',
        topBgColorClassName: 'bg-white/100 dark:bg-black/100',
        topTitleColorClassName: 'text-black/100 dark:text-white/100',
        topSubtitleColorClassName: 'text-black/80 dark:text-white/80',
        topTitleFontFamily: 'standard',
        topSubtitleFontFamily: 'standard',
        bottomParagraph: '',
        bottomBgColorClassName: 'bg-white/80 dark:bg-black/80',
        bottomParagraphColorClassName: 'text-black/100 dark:text-white/100',
        bottomFontFamily: 'standard',
        hasButton: false,
        buttonLabel: 'Discovery',
        buttonHref: '/',
        buttonVariant: 'primary',
      };
    case "paragraph":
      return { children: '', as: 'p', size: 'md', weight: 'normal', variant: 'default', align: 'left', colorClassName: 'text-black/100 dark:text-white/100', fontFamily: 'standard' };
    case "markdown":
      return { content: '', size: 'md', align: 'left', colorClassName: 'text-black/100 dark:text-white/100', fontFamily: 'standard' };
    case "quote":
      return { children: '', author: '', authorDates: '', authorInfo: '', colorClassName: 'text-black/100 dark:text-white/100', bgColorClassName: 'bg-white/20 dark:bg-black/20', fontFamily: 'standard' };
    case "paragraphWithImage":
      return { children: '', as: 'p', size: 'md', weight: 'normal', variant: 'default', align: 'left', imageSrc: '', imageAlt: '', imagePosition: 'left', imageAspectRatio: 'video', parallax: false, parallaxSpeed: 0.3, overlayOpacity: 0.4, colorClassName: 'text-black/100 dark:text-white/100', fontFamily: 'standard' };
    case "horizontalSlider":
      return {
        title: '', subtitle: '',
        titleColorClassName: 'text-black/100 dark:text-white/100',
        subtitleColorClassName: 'text-black/80 dark:text-white/80',
        bgColorClassName: 'bg-white/100 dark:bg-black/100',
        cardColorClassName: 'bg-white/80 dark:bg-black/80',
        items: [],
      };
    case "actioncta":
      return { title: '', paragraph: '', imageSrc: '', imageAlt: '', imagePosition: 'right', buttonOneLabel: 'Learn More', buttonOneLink: '/', buttonOneVariant: 'outline', buttonOneIsExternal: false, buttonTwoLabel: '', buttonTwoLink: '', buttonTwoVariant: 'secondary', buttonTwoIsExternal: false, fontFamily: 'standard', titleColorClassName: 'text-red-500/100 dark:text-white/100', paragraphColorClassName: 'text-black/100 dark:text-white/100' };
    case "spacer":
      return { height: 'md', type: 'spacer', lineColorClassName: 'bg-black/20 dark:bg-white/20', lineWidth: '100%', lineHeight: '1' };
    default:
      return {};
  }
}

export function getModuleIcon(type: ModuleType) {
  switch (type) {
    case "simpleHero": return <ImageIcon className="h-5 w-5" />;
    case "paragraph": return <Type className="h-5 w-5" />;
    case "markdown": return <FileText className="h-5 w-5" />;
    case "quote": return <QuoteIcon className="h-5 w-5" />;
    case "paragraphWithImage": return <Columns className="h-5 w-5" />;
    case "gridHero": return <Layout className="h-5 w-5" />;
    case "horizontalSlider": return <MoveRight className="h-5 w-5" />;
    case "actioncta": return <ExternalLink className="h-5 w-5" />;
    case "spacer": return <Minus className="h-5 w-5" />;
    default: return <Layout className="h-5 w-5" />;
  }
}

export function ModuleEditorForm({ module, onChange }: { module: Module; onChange: (newProps: Record<string, any>) => void }) {
  switch (module.type) {
    case "simpleHero":
      return <SimpleHeroModule module={module} onChange={onChange} />;
    case "gridHero":
      return <GridHeroModule module={module} onChange={onChange} />;
    case "paragraph":
      return <ParagraphModule module={module} onChange={onChange} />;
    case "markdown":
      return <MarkdownModule module={module} onChange={onChange} />;
    case "quote":
      return <QuoteModule module={module} onChange={onChange} />;
    case "paragraphWithImage":
      return <ParagraphWithImageModule module={module} onChange={onChange} />;
    case "horizontalSlider":
      return <HorizontalSliderModule module={module} onChange={onChange} />;
    case "actioncta":
      return <ActionCtaModule module={module} onChange={onChange} />;
    case "spacer":
      return <SpacerModule module={module} onChange={onChange} />;
    default:
      return <div className="text-xs text-black/60 italic">Module configuration coming soon...</div>;
  }
}

export const MODULE_OPTIONS_BASIC = [
  { type: "paragraph" as ModuleType, label: "Paragraph", icon: <Type className="h-6 w-6" /> },
  { type: "paragraphWithImage" as ModuleType, label: "Text + Image", icon: <Columns className="h-6 w-6" /> },
  { type: "quote" as ModuleType, label: "Quote", icon: <QuoteIcon className="h-6 w-6" /> },
];

export const MODULE_OPTIONS_FULL = [
  { type: "simpleHero" as ModuleType, label: "Simple Hero", icon: <ImageIcon className="h-6 w-6" /> },
  { type: "gridHero" as ModuleType, label: "Grid Hero", icon: <Layout className="h-6 w-6" /> },
  { type: "paragraph" as ModuleType, label: "Paragraph", icon: <Type className="h-6 w-6" /> },
  { type: "markdown" as ModuleType, label: "Markdown", icon: <FileText className="h-6 w-6" /> },
  { type: "paragraphWithImage" as ModuleType, label: "Text + Image", icon: <Columns className="h-6 w-6" /> },
  { type: "quote" as ModuleType, label: "Quote", icon: <QuoteIcon className="h-6 w-6" /> },
  { type: "horizontalSlider" as ModuleType, label: "Slider", icon: <MoveRight className="h-6 w-6" /> },
  { type: "actioncta" as ModuleType, label: "Action CTA", icon: <ExternalLink className="h-6 w-6" /> },
  { type: "spacer" as ModuleType, label: "Spacer / Line", icon: <Minus className="h-6 w-6" /> },
];
