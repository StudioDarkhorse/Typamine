"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Trash2,
  RefreshCw,
  Check,
  Type,
  Columns,
  Quote as QuoteIcon,
  GripVertical,
  ChevronDown,
  Maximize2,
  Minimize2,
  FileText,
  Plus,
} from "lucide-react";
import { Reorder } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { savePairing } from "@/lib/actions/pairing";
import { getFontsPage, getFontsByIds } from "@/lib/actions/font";
import { Button } from "@/components/common/Button";
import FontPicker from "@/components/common/FontPicker";
import TagPicker from "@/components/common/TagPicker";
import BaseModal from "@/components/common/BaseModal";
import FormActions from "@/components/admin/common/FormActions";
import SavingOverlay from "@/components/admin/common/SavingOverlay";
import { useFilePreview } from "@/components/admin/common/useFilePreview";
import ImageDropInput from "@/components/admin/common/ImageDropInput";
import HexColorPickerPopover from "@/components/common/HexColorPickerPopover";
import { Select } from "@/components/common/Select";
import { Input } from "@/components/common/Input";
import { CustomRange } from "@/components/common/CustomRange";

import ParagraphModule from "@/components/admin/common/content-modules/ParagraphModule";
import ParagraphWithImageModule from "@/components/admin/common/content-modules/ParagraphWithImageModule";
import QuoteModule from "@/components/admin/common/content-modules/QuoteModule";

export type InsightModuleType = "paragraph" | "paragraphWithImage" | "quote";

export interface InsightModule {
  id: string;
  type: InsightModuleType;
  props: Record<string, any>;
}

function getInsightDefaultProps(type: InsightModuleType) {
  switch (type) {
    case "paragraph":
      return {
        children: "",
        as: "p",
        size: "md",
        weight: "normal",
        variant: "default",
        align: "left",
        colorClassName: "text-black/100 dark:text-white/100",
        fontFamily: "standard",
      };
    case "quote":
      return {
        children: "",
        author: "",
        authorDates: "",
        authorInfo: "",
        colorClassName: "text-black/100 dark:text-white/100",
        bgColorClassName: "bg-white/20 dark:bg-black/20",
        fontFamily: "standard",
      };
    case "paragraphWithImage":
      return {
        children: "",
        as: "p",
        size: "md",
        weight: "normal",
        variant: "default",
        align: "left",
        imageSrc: "",
        imageAlt: "",
        imagePosition: "left",
        imageAspectRatio: "video",
        parallax: false,
        parallaxSpeed: 0.3,
        overlayOpacity: 0.4,
        colorClassName: "text-black/100 dark:text-white/100",
        fontFamily: "standard",
      };
    default:
      return {};
  }
}

function getInsightModuleIcon(type: InsightModuleType) {
  switch (type) {
    case "paragraph":
      return <Type className="h-5 w-5" />;
    case "quote":
      return <QuoteIcon className="h-5 w-5" />;
    case "paragraphWithImage":
      return <Columns className="h-5 w-5" />;
    default:
      return <Type className="h-5 w-5" />;
  }
}

const insightModuleOptions = [
  { type: "paragraph", label: "Paragraph", icon: <Type className="h-5 w-5" /> },
  { type: "paragraphWithImage", label: "Text + Image", icon: <Columns className="h-5 w-5" /> },
  { type: "quote", label: "Quote", icon: <QuoteIcon className="h-5 w-5" /> },
] as const;

const LAYOUT_PRESET_OPTIONS = [
  { label: "Stacked", value: "stacked" },
  { label: "Centered", value: "centered" },
  { label: "Side by Side", value: "sideBySide" },
];

const TEXT_ALIGN_OPTIONS = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

function InsightModuleForm({
  module,
  onChange,
}: {
  module: InsightModule;
  onChange: (newProps: Record<string, any>) => void;
}) {
  switch (module.type) {
    case "paragraph":
      return <ParagraphModule module={module} onChange={onChange} />;
    case "paragraphWithImage":
      return <ParagraphWithImageModule module={module} onChange={onChange} />;
    case "quote":
      return <QuoteModule module={module} onChange={onChange} />;
    default:
      return null;
  }
}

interface PairingFormProps {
  initialData?: any;
  tags: any[];
}

export default function PairingForm({ initialData, tags }: PairingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Basic Form Fields
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);
  const [description, setDescription] = useState(initialData?.description || "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  // Font picker ora self-fetching (niente più intero catalogo passato da
  // qui) — su una pairing NUOVA (nessun initialData) i default primary/secondary
  // vengono presi dalla prima pagina appena arriva (vedi effect sotto),
  // invece che da un array `fonts` già in mano.
  const [primaryFontId, setPrimaryFontId] = useState<string>(initialData?.primaryFontId || "");
  const [secondaryFontId, setSecondaryFontId] = useState<string>(initialData?.secondaryFontId || "");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    (initialData?.tags || []).map((t: any) => t.id)
  );

  const defaultFontsQuery = useQuery({
    queryKey: ["pairing-default-fonts"],
    queryFn: () => getFontsPage({ limit: 2 }),
    enabled: !initialData,
  });
  useEffect(() => {
    const items = defaultFontsQuery.data?.items;
    if (!items || items.length === 0) return;
    setPrimaryFontId((prev) => prev || items[0]?.id || "");
    setSecondaryFontId((prev) => prev || items[1]?.id || items[0]?.id || "");
  }, [defaultFontsQuery.data]);

  // Oggetti font completi (per il canvas preview e i nomi) risolti per id —
  // mai serve l'intero catalogo solo per questi due.
  const selectedFontIds = [primaryFontId, secondaryFontId].filter(Boolean);
  const selectedFontsQuery = useQuery({
    queryKey: ["fonts-by-ids", selectedFontIds.join(",")],
    queryFn: () => getFontsByIds(selectedFontIds),
    enabled: selectedFontIds.length > 0,
  });

  // Insight Modules State
  const [insightModules, setInsightModules] = useState<InsightModule[]>(() => {
    if (initialData?.insight) {
      try {
        const parsed = typeof initialData.insight === "string" ? JSON.parse(initialData.insight) : initialData.insight;
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse initial insight modules JSON", e);
      }
    }
    return [];
  });
  const [collapsedInsightModules, setCollapsedInsightModules] = useState<Set<string>>(new Set());
  // Id del modulo appena aggiunto: la pagina scrolla fino al suo accordion
  // (via effect qui sotto) appena il DOM lo monta, invece di lasciare
  // l'utente a cercarlo in fondo alla lista.
  const [pendingScrollToInsightId, setPendingScrollToInsightId] = useState<string | null>(null);

  const addInsightModule = (type: InsightModuleType) => {
    const newId = Math.random().toString(36).substring(2, 11);
    const newModule: InsightModule = {
      id: newId,
      type,
      props: getInsightDefaultProps(type),
    };
    setInsightModules((prev) => [...prev, newModule]);
    setPendingScrollToInsightId(newId);
  };

  useEffect(() => {
    if (!pendingScrollToInsightId) return;
    const el = document.getElementById(`insight-module-card-${pendingScrollToInsightId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPendingScrollToInsightId(null);
  }, [pendingScrollToInsightId, insightModules]);

  const removeInsightModule = (id: string) => {
    setInsightModules((prev) => prev.filter((m) => m.id !== id));
    setCollapsedInsightModules((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateInsightModuleProps = (id: string, newProps: Record<string, any>) => {
    setInsightModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, props: newProps } : m))
    );
  };

  const toggleInsightCollapse = (id: string) => {
    setCollapsedInsightModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAllInsight = () => setCollapsedInsightModules(new Set());
  const collapseAllInsight = () =>
    setCollapsedInsightModules(new Set(insightModules.map((m) => m.id)));

  // Scorciatoia per tornare rapidamente alla toolbar "Add Insight Module"
  // senza dover riscrollare a mano una volta che ci sono già molti moduli.
  const scrollToModuleToolbar = () => {
    document.getElementById("insight-module-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Image Upload & Canvas States
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialData?.imageUrl || null);
  const [removeImage, setRemoveImage] = useState(false);
  const uploadImagePreview = useFilePreview();
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  // In modifica partiamo dalla tab "upload" (mostra l'immagine attuale così
  // com'è); in creazione partiamo da "canvas" per invogliare a usare il
  // generatore. Evita di mostrare di default un'anteprima canvas con testo
  // placeholder quando l'immagine reale è stata caricata a mano.
  const [activeTab, setActiveTab] = useState<"canvas" | "upload">(initialData ? "upload" : "canvas");
  const [isCanvasModalOpen, setIsCanvasModalOpen] = useState(false);

  // Canvas Config States
  const [primaryText, setPrimaryText] = useState("Typamine Studio");
  const [secondaryText, setSecondaryText] = useState("Harmonious Typography Pairing & Design System");
  const [bgColor, setBgColor] = useState("#0C0B0A");
  const [primaryColor, setPrimaryColor] = useState("#F5F6F9");
  const [secondaryColor, setSecondaryColor] = useState("#9CA3AF");
  const [layoutPreset, setLayoutPreset] = useState<"stacked" | "centered" | "sideBySide">("stacked");
  const [primaryFontSize, setPrimaryFontSize] = useState(56);
  const [secondaryFontSize, setSecondaryFontSize] = useState(24);
  const [primaryY, setPrimaryY] = useState(260);
  const [secondaryY, setSecondaryY] = useState(390);
  const [paddingX, setPaddingX] = useState(70);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [swapFonts, setSwapFonts] = useState(false);

  // Non salviamo i parametri del canvas (colori, font size, posizioni...) usati
  // per generare l'immagine, solo il PNG finale: non c'è modo di ripristinarli
  // in modifica. Senza questo flag, ogni save rigenererebbe e sovrascriverebbe
  // l'immagine esistente con un render fatto sui valori di default sopra.
  const [canvasTouched, setCanvasTouched] = useState(false);
  const isFirstCanvasEffectRun = useRef(true);
  useEffect(() => {
    if (isFirstCanvasEffectRun.current) {
      isFirstCanvasEffectRun.current = false;
      return;
    }
    setCanvasTouched(true);
  }, [
    primaryText, secondaryText, bgColor, primaryColor, secondaryColor,
    layoutPreset, primaryFontSize, secondaryFontSize, primaryY, secondaryY,
    paddingX, textAlign, swapFonts,
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Il <canvas> vive solo dentro il modale (mount/unmount con isCanvasModalOpen),
  // quindi appena si apre va disegnato subito: gli altri effect di redraw
  // reagiscono ai parametri, non al mount del ref.
  useEffect(() => {
    if (isCanvasModalOpen) {
      drawCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCanvasModalOpen]);

  // Find selected font objects
  const primaryFontObj = selectedFontsQuery.data?.find((f) => f.id === primaryFontId);
  const secondaryFontObj = selectedFontsQuery.data?.find((f) => f.id === secondaryFontId);

  // Inject @font-face style tags for preview
  const primaryWoff2 = primaryFontObj?.variants?.[0]?.woff2Url;
  const secondaryWoff2 = secondaryFontObj?.variants?.[0]?.woff2Url;

  const primaryFamilyName = primaryFontObj ? `Canvas_${primaryFontObj.name.replace(/\s+/g, "_")}` : "sans-serif";
  const secondaryFamilyName = secondaryFontObj ? `Canvas_${secondaryFontObj.name.replace(/\s+/g, "_")}` : "sans-serif";

  // Auto-slug generator
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (autoSlug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  };

  // Draw Canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Fill Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Grid / Scanline pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Decorative Watermark / Tag
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 14px sans-serif";
    ctx.letterSpacing = "4px";
    ctx.textAlign = "left";
    ctx.fillText("Typamine®", 70, 80);

    ctx.fillStyle = secondaryColor;
    ctx.font = "14px sans-serif";
    ctx.textAlign = "right";
    const primaryName = (primaryFontObj?.name || "Primary").replace(/_/g, " ");
    const secondaryName = (secondaryFontObj?.name || "Secondary").replace(/_/g, " ");
    ctx.fillText(`${primaryName} + ${secondaryName}`, width - 70, 80);

    // Determine font families for Title and Body text based on swapFonts setting
    const titleFamily = swapFonts ? secondaryFamilyName : primaryFamilyName;
    const bodyFamily = swapFonts ? primaryFamilyName : secondaryFamilyName;

    // Apply alignment setting
    ctx.textAlign = textAlign;

    if (layoutPreset === "stacked" || layoutPreset === "centered") {
      const actualAlign = layoutPreset === "centered" ? "center" : textAlign;
      ctx.textAlign = actualAlign;

      const xPos = actualAlign === "center" ? width / 2 : actualAlign === "right" ? width - paddingX : paddingX;

      // Primary Title
      ctx.fillStyle = primaryColor;
      ctx.font = `bold ${primaryFontSize * 1.5}px "${titleFamily}", sans-serif`;
      ctx.fillText(primaryText, xPos, primaryY);

      // Secondary Body
      ctx.fillStyle = secondaryColor;
      ctx.font = `${secondaryFontSize * 1.3}px "${bodyFamily}", sans-serif`;

      // Word wrapping for secondary text
      const words = secondaryText.split(" ");
      let line = "";
      let yPos = secondaryY;
      const maxWidth = width - (paddingX * 2);

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, xPos, yPos);
          line = words[n] + " ";
          yPos += secondaryFontSize * 1.6;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, xPos, yPos);

    } else if (layoutPreset === "sideBySide") {
      // Left side Primary (aligned left/center/right relative to half canvas)
      ctx.textAlign = textAlign;
      const leftX = textAlign === "center" ? width / 4 : textAlign === "right" ? width / 2 - paddingX : paddingX;

      ctx.fillStyle = primaryColor;
      ctx.font = `bold ${primaryFontSize * 1.3}px "${titleFamily}", sans-serif`;
      ctx.fillText(primaryText, leftX, primaryY);

      // Right side Secondary
      ctx.textAlign = textAlign;
      const rightX = textAlign === "center" ? (3 * width) / 4 : textAlign === "right" ? width - paddingX : width / 2 + paddingX;

      ctx.fillStyle = secondaryColor;
      ctx.font = `${secondaryFontSize * 1.2}px "${bodyFamily}", sans-serif`;

      // Word wrapping for secondary text in split screen
      const words = secondaryText.split(" ");
      let line = "";
      let yPos = secondaryY;
      const maxWidth = width / 2 - paddingX;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, rightX, yPos);
          line = words[n] + " ";
          yPos += secondaryFontSize * 1.5;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, rightX, yPos);
    }
  };

  // Re-draw when config parameters change, forcing font load
  useEffect(() => {
    let active = true;

    // Draw immediately (with fallback font if not yet loaded)
    drawCanvas();

    // Asynchronously load the custom fonts, then redraw to ensure correct typography
    const loadFontsAndRedraw = async () => {
      try {
        const promises = [];
        if (primaryFamilyName && primaryFamilyName !== "sans-serif") {
          promises.push(document.fonts.load(`bold 14px "${primaryFamilyName}"`));
        }
        if (secondaryFamilyName && secondaryFamilyName !== "sans-serif") {
          promises.push(document.fonts.load(`14px "${secondaryFamilyName}"`));
        }
        if (promises.length > 0) {
          await Promise.all(promises);
        }
        if (active) {
          drawCanvas();
        }
      } catch (err) {
        console.warn("Failed to load web fonts for canvas:", err);
      }
    };

    loadFontsAndRedraw();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    primaryText,
    secondaryText,
    bgColor,
    primaryColor,
    secondaryColor,
    layoutPreset,
    primaryFontSize,
    secondaryFontSize,
    primaryFontId,
    secondaryFontId,
    primaryFamilyName,
    secondaryFamilyName,
    primaryY,
    secondaryY,
    paddingX,
    textAlign,
    swapFonts
  ]);

  // Export dell'anteprima PNG (usata solo dal thumbnail fuori dal modale e
  // dal submit) disaccoppiato dal redraw: toDataURL() su un canvas 1200x630
  // e' pesante, e chiamarlo ad ogni tick di drag sui range di posizione
  // (un mousemove = uno state update = un draw) e' quello che causava il lag.
  // Debounce breve: il canvas resta fluido durante il drag, l'export riparte
  // solo quando l'utente si ferma.
  useEffect(() => {
    if (!isCanvasModalOpen) return;
    const timeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        setCanvasDataUrl(canvas.toDataURL("image/png"));
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [
    isCanvasModalOpen,
    primaryText,
    secondaryText,
    bgColor,
    primaryColor,
    secondaryColor,
    layoutPreset,
    primaryFontSize,
    secondaryFontSize,
    primaryFontId,
    secondaryFontId,
    primaryFamilyName,
    secondaryFamilyName,
    primaryY,
    secondaryY,
    paddingX,
    textAlign,
    swapFonts
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Evita di sottomettere prima che la compressione (async) abbia finito
    // di sostituire il file nell'<input> — altrimenti si rischia di inviare
    // ancora il file originale non compresso.
    if (uploadImagePreview.isCompressing) {
      setErrorMessage("Please wait for image compression to finish before saving.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    // Append tag IDs
    selectedTagIds.forEach((tId) => formData.append("tagIds", tId));
    formData.set("published", String(published));

    // Se stiamo modificando una pairing esistente, rigeneriamo (sovrascrivendo)
    // l'immagine via canvas solo se l'utente ha davvero toccato un controllo
    // del generatore in questa sessione — altrimenti un save per un motivo
    // qualunque (es. solo la description) sovrascriverebbe silenziosamente
    // l'immagine attuale con un render dai valori di default.
    if (activeTab === "canvas" && canvasDataUrl && (!initialData || canvasTouched)) {
      formData.set("canvasImageData", canvasDataUrl);
    }

    if (removeImage) {
      formData.set("removeImage", "true");
    }

    startTransition(async () => {
      const err = await savePairing(null, formData, initialData?.id);
      if (err) {
        setErrorMessage(err);
      } else {
        // Torna esattamente alla lista con pagina/ricerca/ordinamento con cui
        // l'utente era arrivato qui, invece di un redirect server-side fisso
        // che riparte sempre da /admin/pairings pagina 1.
        router.back();
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Inject @font-face dynamically for live rendering */}
      {primaryWoff2 && (
        <style>{`
          @font-face {
            font-family: '${primaryFamilyName}';
            src: url('${primaryWoff2}') format('woff2');
          }
        `}</style>
      )}
      {secondaryWoff2 && (
        <style>{`
          @font-face {
            font-family: '${secondaryFamilyName}';
            src: url('${secondaryWoff2}') format('woff2');
          }
        `}</style>
      )}


      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hidden field for serialised Insight JSON modules */}
        <input type="hidden" name="insight" value={JSON.stringify(insightModules)} />

        {/* Form Actions (Top of form, full width) */}
        <div className="lg:col-span-12">
          <FormActions
            backLink="/admin/pairings"
            backLabel="Back to pairings list"
            buttonLabel={initialData ? "Save Changes" : "Create Pairing"}
            disabled={isPending || uploadImagePreview.isCompressing}
          />
        </div>

        {/* Card 1: Identity & Details (Basic Infos - Left, 2/3 width) */}
        <div className="lg:col-span-8 relative z-10 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <div>
            <h3 className="text-xl font-rezland font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
              Pairing basic infos
            </h3>
          </div>

          {/* Name */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
              Pairing Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Editorial Modernism (Inter + Playfair)"
              className="w-full px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
              Slug *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="slug"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoSlug(false);
                }}
                placeholder="editorial-modernism"
                className="w-full px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              {!autoSlug && (
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(true);
                    handleNameChange({ target: { value: name } } as any);
                  }}
                  className="p-2.5 border border-black/10 dark:border-white/10 rounded-lg text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5"
                  title="Auto-generate from Name"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe why these two fonts work together so well..."
              className="w-full px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
            />
          </div>
        </div>

        {/* Card 3: Categorization & Visibility (Taxonomy - Right, 1/3 width) */}
        <div className="lg:col-span-4 relative z-20 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <div>
            <h3 className="text-xl font-rezland font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
              Taxonomy & Visibility
            </h3>

          </div>

          {/* Tags Multiselect */}
          <TagPicker
            label="Assign Tags"
            tags={tags}
            value={selectedTagIds}
            onChange={setSelectedTagIds}
            emptyLabel="No tags available. You can create tags in /admin/tags."
          />

          {/* Published Toggle */}
          <div className="flex items-center justify-between p-4 border border-black/5 dark:border-white/5 rounded-xl bg-black/5 dark:bg-white/5">
            <div>
              <p className="text-sm font-bold text-black dark:text-white">Publish Pairing</p>
              <p className="text-xs text-ocragray-800 dark:text-zinc-200">Make this prescription publicly visible on /prescriptions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:after:border-zinc-800 peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>

        {/* Card 2: Typography Pairing (Font Selection - Left, 1/3 width) */}
        <div className="lg:col-span-4 relative z-30 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <div>
            <h3 className="text-xl font-rezland font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
              Font Pairing Selection
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] relative z-20">
              <FontPicker
                label="Primary Font (Title / Display) *"
                value={primaryFontId}
                onChange={(val) => setPrimaryFontId(val)}
                placeholder="Select primary font..."
              />
              <input type="hidden" name="primaryFontId" value={primaryFontId} />
            </div>

            <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] relative z-10">
              <FontPicker
                label="Secondary Font (Body / Subtitle) *"
                value={secondaryFontId}
                onChange={(val) => setSecondaryFontId(val)}
                placeholder="Select secondary font..."
              />
              <input type="hidden" name="secondaryFontId" value={secondaryFontId} />
            </div>
          </div>
        </div>

        {/* Canvas & Controls Card (Right, 2/3 width) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3">
              <h2 className="text-xl font-rezland font-bold text-black dark:text-white flex items-center gap-2">
                Canvas Generator
              </h2>

              <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("canvas")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeTab === "canvas"
                    ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-black dark:hover:text-white"
                    }`}
                >
                  Canvas Generator
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("upload")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeTab === "upload"
                    ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-black dark:hover:text-white"
                    }`}
                >
                  File Upload
                </button>
              </div>
            </div>

            {activeTab === "canvas" ? (
              <div className="space-y-4">
                {/* Compact read-only preview — editing happens in the modal below,
                    so it can show controls + a big canvas side by side. */}
                <div className="relative border border-black/10 dark:border-white/10 rounded-xl overflow-hidden shadow-inner bg-black aspect-[1.91/1] flex items-center justify-center">
                  {canvasDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={canvasDataUrl} alt="Canvas preview" className="w-full h-full object-contain" />
                  ) : (
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-6 text-center">
                      Open the generator to design your cover image
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  roundness="md"
                  onClick={() => setIsCanvasModalOpen(true)}
                  className="flex items-center justify-center gap-2 font-bold w-full"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Open Canvas Generator
                </Button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <ImageDropInput
                  name="image"
                  inputRef={uploadImagePreview.inputRef}
                  previewUrl={uploadImagePreview.previewUrl}
                  currentUrl={removeImage ? null : currentImageUrl}
                  isCompressing={uploadImagePreview.isCompressing}
                  onSelect={(e) => {
                    setRemoveImage(false);
                    uploadImagePreview.onSelect(e);
                  }}
                  onRemove={() => {
                    if (uploadImagePreview.previewUrl) {
                      uploadImagePreview.clear();
                    } else {
                      setRemoveImage(true);
                    }
                  }}
                  containerClassName="aspect-[1.91/1] rounded-xl w-full"
                  label="Upload Image File"
                  helperText="Recommended: 1200x630px"
                />
              </div>
            )}
          </div>
        </div>

        {/* Canvas Generator Modal — 3 colonne (controlli / preview / controlli)
            invece di controlli-lunghi + canvas, apposta per tenere tutto
            dentro il modale senza dover scrollare per raggiungere un controllo. */}
        {isCanvasModalOpen && (
          <BaseModal isOpen={isCanvasModalOpen} onClose={() => setIsCanvasModalOpen(false)} size="7xl">
            <BaseModal.Header onClose={() => setIsCanvasModalOpen(false)}>
              <h3 className="text-2xl font-rezland text-black dark:text-white leading-tight">Canvas Generator</h3>
            </BaseModal.Header>
            <BaseModal.Body className="overflow-visible max-h-none">
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 items-start">
                {/* Left: text content */}
                <div className="space-y-4 text-xs">
                  <div className="space-y-3 p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50">
                    <h4 className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black dark:text-white">
                      Text Content &amp; Sizing
                    </h4>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <Input
                          label="Primary Title"
                          value={primaryText}
                          onChange={setPrimaryText}
                        />
                        <CustomRange
                          label="Font Size"
                          min={24}
                          max={120}
                          value={primaryFontSize}
                          onChange={setPrimaryFontSize}
                        />
                      </div>

                      <div className="space-y-2">
                        <Input
                          label="Secondary Body"
                          value={secondaryText}
                          onChange={setSecondaryText}
                        />
                        <CustomRange
                          label="Font Size"
                          min={12}
                          max={64}
                          value={secondaryFontSize}
                          onChange={setSecondaryFontSize}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: live canvas preview + palette below it */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative border border-black/10 dark:border-white/10 rounded-xl overflow-hidden shadow-inner bg-black aspect-[1.91/1] flex items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={drawCanvas}
                        title="Redraw Canvas"
                        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 dark:bg-white/80 text-white dark:text-black backdrop-blur-md shadow-lg hover:opacity-90 font-bold text-xs transition-opacity"
                      >
                        <RefreshCw className="w-3 h-3" /> Redraw
                      </button>
                    </div>
                    <p className="text-center text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                      1200 &times; 630
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 space-y-3 text-xs">
                    <h4 className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black dark:text-white">
                      Color Palette
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 rounded border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex flex-col items-center gap-1">
                        <span className="block font-bold text-black dark:text-white text-center">Bg</span>
                        <HexColorPickerPopover color={bgColor} onChange={setBgColor} title="Background color">
                          <span className="block w-10 h-7 rounded cursor-pointer border border-black/10 dark:border-white/10" style={{ backgroundColor: bgColor }} />
                        </HexColorPickerPopover>
                      </div>
                      <div className="p-2 rounded border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex flex-col items-center gap-1">
                        <span className="block font-bold text-black dark:text-white text-center">Primary</span>
                        <HexColorPickerPopover color={primaryColor} onChange={setPrimaryColor} title="Primary color">
                          <span className="block w-10 h-7 rounded cursor-pointer border border-black/10 dark:border-white/10" style={{ backgroundColor: primaryColor }} />
                        </HexColorPickerPopover>
                      </div>
                      <div className="p-2 rounded border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 flex flex-col items-center gap-1">
                        <span className="block font-bold text-black dark:text-white text-center">Secondary</span>
                        <HexColorPickerPopover color={secondaryColor} onChange={setSecondaryColor} title="Secondary color">
                          <span className="block w-10 h-7 rounded cursor-pointer border border-black/10 dark:border-white/10" style={{ backgroundColor: secondaryColor }} />
                        </HexColorPickerPopover>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: layout, styles & positioning */}
                <div className="flex flex-col gap-4 text-xs">
                  <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 space-y-3">
                    <h4 className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black dark:text-white">
                      Layout &amp; Styles
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block font-bold mb-1 text-black dark:text-white">Layout Preset</label>
                        <Select
                          options={LAYOUT_PRESET_OPTIONS}
                          value={layoutPreset}
                          onChange={(v) => setLayoutPreset(v as any)}
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1 text-black dark:text-white">Text Alignment</label>
                        <Select
                          options={TEXT_ALIGN_OPTIONS}
                          value={textAlign}
                          onChange={(v) => setTextAlign(v as any)}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <label htmlFor="swapFontsCheckbox" className="font-bold text-black dark:text-white cursor-pointer select-none">
                          Swap Fonts
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            id="swapFontsCheckbox"
                            checked={swapFonts}
                            onChange={(e) => setSwapFonts(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:peer-checked:after:border-zinc-800 peer-checked:bg-cyan-500" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 space-y-3">
                    <h4 className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black dark:text-white">
                      Positioning &amp; Spacing
                    </h4>
                    <div className="space-y-3">
                      <CustomRange
                        label="Primary Y-Pos"
                        min={50}
                        max={580}
                        value={primaryY}
                        onChange={setPrimaryY}
                      />
                      <CustomRange
                        label="Secondary Y-Pos"
                        min={50}
                        max={580}
                        value={secondaryY}
                        onChange={setSecondaryY}
                      />
                      <CustomRange
                        label="Horizontal Padding"
                        min={20}
                        max={300}
                        value={paddingX}
                        onChange={setPaddingX}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </BaseModal.Body>
            <BaseModal.Footer>
              <Button
                type="button"
                variant="primary"
                size="md"
                roundness="md"
                onClick={() => setIsCanvasModalOpen(false)}
                fullWidth
                className="flex items-center justify-center gap-2 font-bold"
              >
                <Check className="h-4 w-4" />
                Done
              </Button>
            </BaseModal.Footer>
          </BaseModal>
        )}

        {/* Card 4: Pairing Insight Modules (Full Width) */}
        <div className="lg:col-span-12 space-y-6">
          <div className="border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-black/5 dark:bg-white/10 rounded-2xl shadow-inner text-black dark:text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-rezland font-bold text-black dark:text-white">Pairing Insight Modules</h3>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                    Build rich editorial insights using Paragraph, Text + Image, and Quote modules
                  </p>
                </div>
              </div>

              {insightModules.length > 0 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={expandAllInsight}
                    className="p-2.5 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl text-black/60 dark:text-white/60 hover:bg-white dark:hover:bg-white/10 transition-all shadow-xs"
                    title="Expand All"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={collapseAllInsight}
                    className="p-2.5 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl text-black/60 dark:text-white/60 hover:bg-white dark:hover:bg-white/10 transition-all shadow-xs"
                    title="Collapse All"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Module Addition Toolbar */}
            <div id="insight-module-toolbar" className="space-y-3 scroll-mt-24">
              <label className="text-[10px] font-bold text-black/60 dark:text-white/60 uppercase tracking-[0.2em] block">
                Add Insight Module
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {insightModuleOptions.map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => addInsightModule(opt.type)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 hover:bg-white dark:hover:bg-zinc-900 transition-all group shadow-xs hover:translate-x-0.5"
                  >
                    <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/10 text-black dark:text-white group-hover:scale-105 transition-transform">
                      {opt.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">{opt.label}</p>
                      <p className="text-[9px] text-zinc-400">Insert on insight canvas</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reorderable Insight Modules Canvas */}
            <div className="space-y-4 pt-2">
              <Reorder.Group
                axis="y"
                values={insightModules}
                onReorder={setInsightModules}
                className="space-y-4"
              >
                {insightModules.map((module) => (
                  <Reorder.Item
                    key={module.id}
                    value={module}
                    id={`insight-module-card-${module.id}`}
                    className="scroll-mt-28"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="group relative bg-white/80 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 rounded-2xl shadow-md transition-all hover:border-black/20 dark:hover:border-white/20">
                      {/* Accordion Header */}
                      <div
                        className="flex items-center justify-between p-5 cursor-pointer select-none transition-colors rounded-2xl hover:bg-black/2 dark:hover:bg-white/2"
                        onClick={() => toggleInsightCollapse(module.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-black/5 dark:bg-white/10 rounded-lg text-black/60 dark:text-white/60">
                            {getInsightModuleIcon(module.type)}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-[0.15em]">
                              {module.type.replace(/([A-Z])/g, " $1")}
                            </h4>
                            <p className="text-[9px] text-zinc-400 font-mono">ID: {module.id}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeInsightModule(module.id);
                              }}
                              className="p-2 text-red-500/50 hover:text-red-500 transition-colors"
                              title="Delete Module"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <div className="p-2 text-black/30 dark:text-white/30 cursor-grab active:cursor-grabbing">
                              <GripVertical className="h-4 w-4" />
                            </div>
                          </div>
                          <div
                            className={`transition-transform duration-300 ${collapsedInsightModules.has(module.id) ? "" : "rotate-180"
                              }`}
                          >
                            <ChevronDown className="h-5 w-5 text-black/30 dark:text-white/30" />
                          </div>
                        </div>
                      </div>

                      {/* Accordion Body */}
                      {!collapsedInsightModules.has(module.id) && (
                        <div className="p-6 sm:p-8 border-t border-black/5 dark:border-white/5">
                          <InsightModuleForm
                            module={module}
                            onChange={(newProps) => updateInsightModuleProps(module.id, newProps)}
                          />
                        </div>
                      )}
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              {insightModules.length === 0 && (
                <div className="border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl py-12 flex flex-col items-center justify-center text-center px-6">
                  <div className="h-14 w-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-3 text-black/30 dark:text-white/30">
                    <FileText className="h-7 w-7" />
                  </div>
                  <h4 className="text-sm font-bold text-black/70 dark:text-white/70">No insight modules added yet</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Click one of the buttons above to add Paragraphs, Images, or Quotes to this pairing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {insightModules.length > 0 && (
        <button
          type="button"
          onClick={scrollToModuleToolbar}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-transform"
        >
          <Plus className="h-4 w-4" />
          Add Module
        </button>
      )}

      <SavingOverlay message="Saving Pairing..." show={isPending} />
    </div>
  );
}
