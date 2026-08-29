"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  RefreshCw,
  Trash2,
  GripVertical,
  ChevronDown,
  Maximize2,
  Minimize2,
  FileText,
  Plus,
} from "lucide-react";
import { Reorder } from "framer-motion";
import { savePost } from "@/lib/actions/post";
import { PostType } from "@/types";
import { Button } from "@/components/common/Button";
import FontMultiPicker from "@/components/common/FontMultiPicker";
import TagPicker from "@/components/common/TagPicker";
import FormActions from "@/components/admin/common/FormActions";
import SavingOverlay from "@/components/admin/common/SavingOverlay";
import { useFilePreview } from "@/components/admin/common/useFilePreview";
import ImageDropInput from "@/components/admin/common/ImageDropInput";
import { Input, Label } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import {
  Module,
  ModuleType,
  MODULE_OPTIONS_BASIC,
  MODULE_OPTIONS_FULL,
  getModuleDefaultProps,
  getModuleIcon,
  ModuleEditorForm,
} from "@/components/admin/common/content-modules/moduleRegistry";
import { isAnyModuleImageCompressing } from "@/components/admin/common/content-modules/shared";

interface PostFormProps {
  postType: PostType;
  initialData?: any;
  tags: any[];
}

// Font picker sempre self-fetching (FontMultiPicker senza prop `fonts`, 30
// alla volta via getFontsPage) — niente più bisogno di passare l'intero
// catalogo da qui, vedi anche i due page.tsx che montano questo form.
export default function PostForm({ postType, initialData, tags }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // La sezione admin resta "/admin/blog", ma la rotta pubblica dei post BLOG
  // è "/pills", non "/blog".
  const routeBase = postType === "BLOG" ? "blog" : "archive";
  const publicRouteBase = postType === "BLOG" ? "pills" : "archive";
  const entityLabel = postType === "BLOG" ? "Blog Post" : "Archive Post";
  // Il blog offre tutte le varianti di content-module, l'archive solo le 3
  // storiche (paragraph/paragraphWithImage/quote) — unica differenza tra
  // i due form, tutto il resto è identico.
  const moduleOptions = postType === "BLOG" ? MODULE_OPTIONS_FULL : MODULE_OPTIONS_BASIC;

  // Basic Form Fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);
  const [caption, setCaption] = useState(initialData?.caption || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageAlt, setImageAlt] = useState(initialData?.imageAlt || "");
  // Un post nuovo parte sempre come bozza (draft) — va pubblicato a mano.
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    (initialData?.tags || []).map((t: any) => t.id)
  );
  const [selectedFontIds, setSelectedFontIds] = useState<string[]>(
    (initialData?.fonts || []).map((f: any) => f.id)
  );

  // Content vs SEO tab — tutti i campi restano nello state React a
  // prescindere dal tab visibile (solo show/hide via JSX condizionale), così
  // handleSubmit può leggerli sempre indipendentemente da quale tab era
  // aperto all'ultimo click di Save.
  const [activeFormTab, setActiveFormTab] = useState<"content" | "seo">("content");

  // SEO Module — vedi lib/services/seo.ts. Precompilato da initialData.seo
  // in modifica, vuoto in creazione (il fallback all'immagine thumbnail
  // scatta lato server al salvataggio se questi campi restano vuoti).
  const seo = initialData?.seo;
  const [seoMetaTitle, setSeoMetaTitle] = useState(seo?.metaTitle || "");
  const [seoMetaDescription, setSeoMetaDescription] = useState(seo?.metaDescription || "");
  const [seoKeywords, setSeoKeywords] = useState(seo?.keywords || "");
  const [seoCanonicalUrl, setSeoCanonicalUrl] = useState(seo?.canonicalUrl || "");
  const [seoNoIndex, setSeoNoIndex] = useState<boolean>(seo?.noIndex || false);

  const [seoOgTitle, setSeoOgTitle] = useState(seo?.ogTitle || "");
  const [seoOgDescription, setSeoOgDescription] = useState(seo?.ogDescription || "");
  const [seoOgImageAlt, setSeoOgImageAlt] = useState(seo?.ogImageAlt || "");
  const [currentOgImageUrl, setCurrentOgImageUrl] = useState<string | null>(seo?.ogImageUrl || null);
  const [removeOgImage, setRemoveOgImage] = useState(false);
  const ogImagePreview = useFilePreview();

  const [seoTwitterTitle, setSeoTwitterTitle] = useState(seo?.twitterTitle || "");
  const [seoTwitterDescription, setSeoTwitterDescription] = useState(seo?.twitterDescription || "");
  const [seoTwitterImageAlt, setSeoTwitterImageAlt] = useState(seo?.twitterImageAlt || "");
  const [seoTwitterCard, setSeoTwitterCard] = useState<string>(seo?.twitterCard || "summary_large_image");
  const [currentTwitterImageUrl, setCurrentTwitterImageUrl] = useState<string | null>(seo?.twitterImageUrl || null);
  const [removeTwitterImage, setRemoveTwitterImage] = useState(false);
  const twitterImagePreview = useFilePreview();

  // Thumbnail & Hero Image
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(initialData?.thumbnailUrl || null);
  const [removeThumbnail, setRemoveThumbnail] = useState(false);
  const thumbnailPreview = useFilePreview();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialData?.imageUrl || null);
  const [removeImage, setRemoveImage] = useState(false);
  const heroImagePreview = useFilePreview();

  // Insight Modules State
  const [insightModules, setInsightModules] = useState<Module[]>(() => {
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
  const [pendingScrollToInsightId, setPendingScrollToInsightId] = useState<string | null>(null);

  const addInsightModule = (type: ModuleType) => {
    const newId = Math.random().toString(36).substring(2, 11);
    const newModule: Module = {
      id: newId,
      type,
      props: getModuleDefaultProps(type),
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
  // senza dover riscrollare a mano una volta che ci sono già molti moduli —
  // la toolbar vive nel tab Content, quindi se l'utente è sul tab SEO lo
  // cambiamo prima di scrollare.
  const scrollToModuleToolbar = () => {
    const scroll = () => document.getElementById("insight-module-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (activeFormTab !== "content") {
      setActiveFormTab("content");
      setTimeout(scroll, 50);
    } else {
      scroll();
    }
  };

  // Auto-slug generator
  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  const isAnyImageCompressing =
    thumbnailPreview.isCompressing ||
    heroImagePreview.isCompressing ||
    ogImagePreview.isCompressing ||
    twitterImagePreview.isCompressing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Evita di sottomettere prima che la compressione (async) abbia finito
    // di sostituire il file nell'<input>/nello stato — altrimenti si
    // rischia di inviare ancora il file originale non compresso.
    // isAnyImageCompressing è calcolato a render-time e copre solo i 4 campi
    // immagine "top level" del post; le ImageUpload dei moduli insight hanno
    // uno stato di compressione locale che non fa mai ri-renderizzare
    // PostForm, quindi vanno controllate qui con una lettura live.
    if (isAnyImageCompressing || isAnyModuleImageCompressing()) {
      setErrorMessage("Please wait for image compression to finish before saving.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    selectedTagIds.forEach((tId) => formData.append("tagIds", tId));
    selectedFontIds.forEach((fId) => formData.append("fontIds", fId));
    formData.set("published", String(published));

    // Campi del tab Content appesi esplicitamente da stato React: i loro
    // input nativi vivono dentro `{activeFormTab === "content" && (...)}` e
    // vengono smontati quando si salva da tab SEO, quindi new FormData(form)
    // li perdeva del tutto — title/slug mancanti facevano fallire la validazione
    // server ("Title and Slug are required.") anche se compilati, e gli altri
    // campi (caption/description/imageAlt/immagini) sarebbero stati silenziosamente
    // svuotati. Stesso pattern già usato qui sotto per i campi SEO.
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("caption", caption);
    formData.set("description", description);
    formData.set("imageAlt", imageAlt);
    if (thumbnailPreview.file) formData.set("thumbnail", thumbnailPreview.file);
    if (heroImagePreview.file) formData.set("image", heroImagePreview.file);

    if (removeThumbnail) formData.set("removeThumbnail", "true");
    if (removeImage) formData.set("removeImage", "true");

    // Campi SEO appesi esplicitamente da stato React (non da `name` sui campi
    // nativi): il tab SEO può essere smontato via JSX condizionale a seconda
    // di quale tab era attivo, e new FormData(form) non includerebbe input
    // non montati. Così il salvataggio funziona indipendentemente dal tab
    // visibile all'ultimo click di Save.
    formData.set("seoMetaTitle", seoMetaTitle);
    formData.set("seoMetaDescription", seoMetaDescription);
    formData.set("seoKeywords", seoKeywords);
    formData.set("seoCanonicalUrl", seoCanonicalUrl);
    formData.set("seoNoIndex", String(seoNoIndex));
    formData.set("seoOgTitle", seoOgTitle);
    formData.set("seoOgDescription", seoOgDescription);
    formData.set("seoOgImageAlt", seoOgImageAlt);
    formData.set("seoTwitterTitle", seoTwitterTitle);
    formData.set("seoTwitterDescription", seoTwitterDescription);
    formData.set("seoTwitterImageAlt", seoTwitterImageAlt);
    formData.set("seoTwitterCard", seoTwitterCard);
    if (removeOgImage) formData.set("removeOgImage", "true");
    if (removeTwitterImage) formData.set("removeTwitterImage", "true");
    if (ogImagePreview.file) formData.set("ogImage", ogImagePreview.file);
    if (twitterImagePreview.file) formData.set("twitterImage", twitterImagePreview.file);

    startTransition(async () => {
      const err = await savePost(null, formData, postType, initialData?.id);
      if (err) {
        setErrorMessage(err);
      } else {
        // Torna esattamente alla lista con pagina/ricerca/ordinamento con cui
        // l'utente era arrivato qui, invece di un redirect server-side fisso
        // che riparte sempre dalla lista non filtrata pagina 1.
        router.back();
      }
    });
  };

  return (
    <div className="space-y-6">
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
            backLink={`/admin/${routeBase}`}
            backLabel={`Back to ${routeBase} list`}
            buttonLabel={initialData ? "Save Changes" : `Create ${entityLabel}`}
            disabled={isPending || isAnyImageCompressing}
          />
        </div>

        {/* Content / SEO tab switcher — tutti i campi restano nello state a
            prescindere dal tab attivo, vedi handleSubmit. */}
        <div className="lg:col-span-12">
          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setActiveFormTab("content")}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeFormTab === "content"
                ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
            >
              Content
            </button>
            <button
              type="button"
              onClick={() => setActiveFormTab("seo")}
              className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeFormTab === "seo"
                ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
            >
              SEO
            </button>
          </div>
        </div>

        {activeFormTab === "content" && (
          <>
            {/* Card 1: Identity & Details (Left, 2/3 width) */}
            <div className="lg:col-span-8 relative z-10 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
              <div>
                <h3 className="text-xl font-crenzo font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
                  {entityLabel} basic infos
                </h3>
              </div>

              {/* Title */}
              <Input
                label="Title *"
                name="title"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. The Rise of Neo-Grotesque Typefaces"
              />

              {/* Slug */}
              <Input
                label="Slug *"
                name="slug"
                required
                value={slug}
                onChange={(val) => {
                  setSlug(val);
                  setAutoSlug(false);
                }}
                placeholder="rise-of-neo-grotesque-typefaces"
                rightIcon={
                  !autoSlug ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAutoSlug(true);
                        setSlug(generateSlug(title));
                      }}
                      className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors text-bluegray-800 dark:text-redgray-200"
                      title="Auto-generate from Title"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  ) : undefined
                }
              />

              {/* Caption */}
              <Input
                label="Caption"
                name="caption"
                value={caption}
                onChange={setCaption}
                placeholder="Short deck / subtitle shown under the title"
              />

              {/* Description */}
              <Input
                label="Description"
                name="description"
                as="textarea"
                rows={3}
                value={description}
                onChange={setDescription}
                placeholder="Short summary used in listings and previews..."
              />

              {/* Thumbnail — usata nella grid preview card di /{publicRouteBase} */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                  Thumbnail
                </label>
                <ImageDropInput
                  name="thumbnail"
                  inputRef={thumbnailPreview.inputRef}
                  previewUrl={thumbnailPreview.previewUrl}
                  currentUrl={removeThumbnail ? null : currentThumbnailUrl}
                  isCompressing={thumbnailPreview.isCompressing}
                  onSelect={(e) => {
                    setRemoveThumbnail(false);
                    thumbnailPreview.onSelect(e);
                  }}
                  onRemove={() => {
                    if (thumbnailPreview.previewUrl) {
                      thumbnailPreview.clear();
                    } else {
                      setRemoveThumbnail(true);
                    }
                  }}
                  containerClassName="aspect-[4/3] rounded-lg w-full"
                  label="Upload Thumbnail"
                  helperText={`Used in the ${publicRouteBase} grid preview card.`}
                />
              </div>
            </div>

            {/* Card 2: Taxonomy & Visibility (Right, 1/3 width) */}
            <div className="lg:col-span-4 relative z-20 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
              <div>
                <h3 className="text-sm font-crenzo font-bold text-black text-center dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
                  Taxonomy & Visibility
                </h3>
              </div>

              <TagPicker
                label="Assign Tags"
                tags={tags}
                value={selectedTagIds}
                onChange={setSelectedTagIds}
                emptyLabel="No tags available. You can create tags in /admin/tags."
              />

              {/* I post BLOG non referenziano font del catalogo (a differenza di
              Archive) — il picker resterebbe sempre vuoto, non lo mostriamo. */}
              {postType !== "BLOG" && (
                <FontMultiPicker
                  label="Featured Fonts"
                  value={selectedFontIds}
                  onChange={setSelectedFontIds}
                  emptyLabel="No fonts available."
                />
              )}

              {/* Published Toggle */}
              <div className="flex items-start justify-between p-4 border border-black/5 dark:border-white/5 rounded-xl bg-black/5 dark:bg-white/5">
                <div>
                  <p className="text-sm font-bold text-black dark:text-white">Publish Post</p>
                  <p className="mt-4 text-xs text-ocragray-800 dark:text-zinc-200">Make this post publicly visible on /{publicRouteBase}</p>
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

            {/* Card 4: Hero Image — solo per Archive, Blog costruisce la propria
            hero coi moduli simpleHero/gridHero. Thumbnail ora vive dentro
            "basic infos" (Card 1), non serve più affiancarla qui. */}
            {postType !== "BLOG" && (
              <div className="lg:col-span-12 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-4">
                <h3 className="text-xl font-crenzo font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
                  Hero Image
                </h3>
                <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 -mt-2">Shown at the top of the post's detail page.</p>

                <ImageDropInput
                  name="image"
                  inputRef={heroImagePreview.inputRef}
                  previewUrl={heroImagePreview.previewUrl}
                  currentUrl={removeImage ? null : currentImageUrl}
                  isCompressing={heroImagePreview.isCompressing}
                  onSelect={(e) => {
                    setRemoveImage(false);
                    heroImagePreview.onSelect(e);
                  }}
                  onRemove={() => {
                    if (heroImagePreview.previewUrl) {
                      heroImagePreview.clear();
                    } else {
                      setRemoveImage(true);
                    }
                  }}
                  containerClassName="aspect-[1.91/1] rounded-xl w-full"
                  label="Upload Hero Image"
                  helperText="Recommended: 1200x630px"
                />

                <Input
                  label="Image Alt Text"
                  name="imageAlt"
                  value={imageAlt}
                  onChange={setImageAlt}
                  placeholder="Describe the hero image for accessibility"
                />
              </div>
            )}

            {/* Card 5: Content Insight Modules (Full Width) */}
            <div className="lg:col-span-12 space-y-6">
              <div className="border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-black/5 dark:bg-white/10 rounded-2xl shadow-inner text-black dark:text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-crenzo font-bold text-black dark:text-white">{entityLabel} Insight Modules</h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                        Build the article body using {moduleOptions.map((o) => o.label).join(", ")} modules
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
                    {moduleOptions.map((opt) => (
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
                                {getModuleIcon(module.type)}
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
                              <ModuleEditorForm
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
                        Click one of the buttons above to add content to this post.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeFormTab === "seo" && (
          <>
            {/* SEO Basics (Full Width) */}
            <div className="lg:col-span-12 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
              <div>
                <h3 className="text-xl font-rezland font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
                  Search Engine Basics
                </h3>
                <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 mt-1">Meta tags used by search engines for this post's own page.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-0">
                    <Label className="mb-0">Meta Title</Label>
                    <span className={`text-[10px] font-mono ${seoMetaTitle.length > 60 ? "text-red-500" : "text-zinc-400"}`}>
                      {seoMetaTitle.length}/60
                    </span>
                  </div>
                  <Input
                    value={seoMetaTitle}
                    onChange={setSeoMetaTitle}
                    placeholder={title || "Falls back to the post title if left empty"}
                  />
                </div>

                <div>
                  <Input
                    label="Canonical URL"
                    value={seoCanonicalUrl}
                    onChange={setSeoCanonicalUrl}
                    placeholder={`https://typamine.com/${publicRouteBase}/...`}
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-0">
                  <Label className="mb-0">Meta Description</Label>
                  <span className={`text-[10px] font-mono ${seoMetaDescription.length > 160 ? "text-red-500" : "text-zinc-400"}`}>
                    {seoMetaDescription.length}/160
                  </span>
                </div>
                <Input
                  as="textarea"
                  rows={2}
                  value={seoMetaDescription}
                  onChange={setSeoMetaDescription}
                  placeholder={description || "Falls back to the post description if left empty"}
                  className="resize-none"
                />
              </div>

              <div>
                <Input
                  label="Keywords"
                  value={seoKeywords}
                  onChange={setSeoKeywords}
                  placeholder="typography, type design, neo-grotesque (comma separated)"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-black/5 dark:border-white/5 rounded-xl bg-black/5 dark:bg-white/5">
                <div>
                  <p className="text-sm font-bold text-black dark:text-white">Hide from Search Engines</p>
                  <p className="text-xs text-ocragray-800 dark:text-zinc-200">Adds a "noindex" directive — the page stays reachable but won't be indexed.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seoNoIndex}
                    onChange={(e) => setSeoNoIndex(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:after:border-zinc-800 peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>

            {/* Open Graph (Facebook/LinkedIn/...) — Left half */}
            <div className="lg:col-span-6 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-4">
              <h3 className="text-xl font-rezland font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
                Open Graph
              </h3>
              <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 -mt-2">How this post looks when shared on Facebook, LinkedIn, iMessage, etc.</p>

              <ImageDropInput
                inputRef={ogImagePreview.inputRef}
                previewUrl={ogImagePreview.previewUrl}
                currentUrl={removeOgImage ? null : currentOgImageUrl}
                isCompressing={ogImagePreview.isCompressing}
                onSelect={(e) => {
                  setRemoveOgImage(false);
                  ogImagePreview.onSelect(e);
                }}
                onRemove={() => {
                  if (ogImagePreview.previewUrl) {
                    ogImagePreview.clear();
                  } else {
                    setRemoveOgImage(true);
                  }
                }}
                containerClassName="aspect-[1.91/1] rounded-xl w-full"
                label="Upload OG Image"
                helperText="Defaults to the Thumbnail if left unassigned"
              />

              <Input
                value={seoOgImageAlt}
                onChange={setSeoOgImageAlt}
                placeholder="OG image alt text"
              />
              <Input
                value={seoOgTitle}
                onChange={setSeoOgTitle}
                placeholder={seoMetaTitle || title || "OG title override (optional)"}
              />
              <Input
                as="textarea"
                rows={2}
                value={seoOgDescription}
                onChange={setSeoOgDescription}
                placeholder={seoMetaDescription || description || "OG description override (optional)"}
                className="resize-none"
              />
            </div>

            {/* Twitter / X — Right half */}
            <div className="lg:col-span-6 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-4">
              <h3 className="text-xl font-rezland font-bold text-black dark:text-white pb-3 border-b border-black/5 dark:border-white/5">
                Twitter / X
              </h3>
              <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 -mt-2">How this post looks when shared on Twitter/X.</p>

              <ImageDropInput
                inputRef={twitterImagePreview.inputRef}
                previewUrl={twitterImagePreview.previewUrl}
                currentUrl={removeTwitterImage ? null : currentTwitterImageUrl}
                isCompressing={twitterImagePreview.isCompressing}
                onSelect={(e) => {
                  setRemoveTwitterImage(false);
                  twitterImagePreview.onSelect(e);
                }}
                onRemove={() => {
                  if (twitterImagePreview.previewUrl) {
                    twitterImagePreview.clear();
                  } else {
                    setRemoveTwitterImage(true);
                  }
                }}
                containerClassName="aspect-[1.91/1] rounded-xl w-full"
                label="Upload Twitter Image"
                helperText="Defaults to the Thumbnail if left unassigned"
              />

              <Input
                value={seoTwitterImageAlt}
                onChange={setSeoTwitterImageAlt}
                placeholder="Twitter image alt text"
              />
              <Input
                value={seoTwitterTitle}
                onChange={setSeoTwitterTitle}
                placeholder={seoOgTitle || seoMetaTitle || title || "Twitter title override (optional)"}
              />
              <Input
                as="textarea"
                rows={2}
                value={seoTwitterDescription}
                onChange={setSeoTwitterDescription}
                placeholder={seoOgDescription || seoMetaDescription || description || "Twitter description override (optional)"}
                className="resize-none"
              />

              <Select
                label="Card Type"
                value={seoTwitterCard}
                onChange={setSeoTwitterCard}
                options={[
                  { label: "Summary — Large Image", value: "summary_large_image" },
                  { label: "Summary — Small Image", value: "summary" },
                ]}
              />
            </div>
          </>
        )}
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

      <SavingOverlay message={`Saving ${entityLabel}...`} show={isPending} />
    </div>
  );
}
