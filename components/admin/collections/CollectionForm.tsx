"use client";

import React, { useActionState, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveFormula } from "@/lib/actions/formula";
import { AlertCircle, Type as FontIcon, Check } from "lucide-react";
import { Select } from "@/components/common/Select";
import { Input, Label } from "@/components/common/Input";
import TagPicker from "@/components/common/TagPicker";
import FormActions from "@/components/admin/common/FormActions";
import BaseModal from "@/components/common/BaseModal";
import SavingOverlay from "@/components/admin/common/SavingOverlay";

const CATEGORY_OPTIONS = [
  { label: "MONOSPACE", value: "Monospace" },
  { label: "SANS-SERIF", value: "Sans-Serif" },
  { label: "NEO-GROTESQUE", value: "Neo-Grotesque" },
  { label: "GEOMETRIC SANS", value: "Geometric Sans" },
  { label: "SERIF", value: "Serif" },
  { label: "DECORATIVE", value: "Decorative" },
  { label: "MIXED", value: "Mixed" },
];

interface CollectionFormProps {
  formula?: any;
  fonts?: any[];
  tags?: any[];
}

export default function CollectionForm({ formula, fonts = [], tags = [] }: CollectionFormProps) {
  const router = useRouter();
  const saveAction = (prevState: any, formData: FormData) => saveFormula(prevState, formData, formula?.id);
  const [errorMessage, dispatch, isSaving] = useActionState(saveAction, undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [name, setName] = useState(formula?.name || "");
  const [slug, setSlug] = useState(formula?.slug || "");
  const [description, setDescription] = useState(formula?.description || "");
  const [fontCategory, setFontCategory] = useState(formula?.fontCategory || "Mixed");
  const [selectedFontIds, setSelectedFontIds] = useState<string[]>(
    (formula?.fonts || []).map((f: any) => f.id)
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    (formula?.tags || []).map((t: any) => t.id)
  );

  const handleFontToggle = (fontId: string) => {
    setSelectedFontIds((prev) =>
      prev.includes(fontId) ? prev.filter((id) => id !== fontId) : [...prev, fontId]
    );
  };

  useEffect(() => {
    if (!formula?.id && name) {
      const generated = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generated);
    }
  }, [name, formula?.id]);

  useEffect(() => {
    if (errorMessage) {
      setShowErrorModal(true);
    }
  }, [errorMessage]);

  // Vedi lo stesso commento in FontForm.tsx: router.back() torna alla lista
  // con pagina/ricerca/ordinamento con cui l'utente era arrivato al form,
  // invece del redirect server-side fisso di prima.
  const wasSaving = useRef(false);
  useEffect(() => {
    if (wasSaving.current && !isSaving && !errorMessage) {
      router.back();
    }
    wasSaving.current = isSaving;
  }, [isSaving, errorMessage, router]);

  return (
    <form action={dispatch} className="max-w-6xl ml-auto space-y-8 pb-20 transition-colors duration-300">
      <FormActions
        backLink="/admin/collections"
        backLabel="Back to collections list"
        buttonLabel={formula ? "Update Collection" : "Create Collection"}
      />

      <div className="bg-zinc-100/40 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all">
        <div className="flex flex-col justify-end mb-10 border-b border-black/5 dark:border-white/5 pb-6">
          <h3 className="text-4xl font-rezland text-black dark:text-white">Collection Infos {formula?.id && ' / '}<span className="text-blue dark:text-red">{formula?.name}</span></h3>
          <p className="text-[10px] ps-2 uppercase tracking-widest font-bold text-bluegray-800 dark:text-redgray-200 mt-1">Configure all the collection informations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Area (left column, span 2) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Input
                id="name"
                name="name"
                label="Collection Name"
                value={name}
                onChange={setName}
                placeholder="e.g. Art Deco Fonts"
                required
                autoComplete="off"
              />
              <Input
                id="slug"
                name="slug"
                label="Slug (URL Path)"
                value={slug}
                onChange={setSlug}
                placeholder="e.g. art-deco-fonts"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this curated collection..."
                className="w-full px-4 py-2.5 rounded-lg border border-bluegray-300 dark:border-redgray-700 hover:border-bluegray-400 dark:hover:border-redgray-600 bg-zinc-900/40 dark:bg-zinc-900/60 text-foreground text-sm focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Fonts Multiselect */}
            <div className="border-t border-black/5 dark:border-white/5 pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-bluegray-800 dark:text-redgray-200 flex items-center gap-1.5">
                  <FontIcon className="w-3.5 h-3.5" />
                  Fonts in this Collection
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 p-3 border border-black/10 dark:border-white/10 rounded-lg bg-white/50 dark:bg-zinc-900/50 max-h-64 overflow-y-auto">
                {fonts.map((f) => {
                  const isSelected = selectedFontIds.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleFontToggle(f.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                        : "bg-transparent text-zinc-600 dark:text-zinc-400 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                        }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      {f.name}
                    </button>
                  );
                })}
                {fonts.length === 0 && (
                  <span className="text-xs text-zinc-400 italic">
                    No fonts available. Create some in /admin/fonts first.
                  </span>
                )}
              </div>
              {selectedFontIds.map((fontId) => (
                <input key={fontId} type="hidden" name="fontIds" value={fontId} />
              ))}
            </div>
          </div>

          {/* Sidebar Area (right column, metadata card, span 1) */}
          <div className="lg:col-span-1">
            <div className="bg-white/20 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
              <div className="border-b border-black/5 dark:border-white/5 pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-bluegray-800 dark:text-redgray-200">Metadata & Details</h3>
                <p className="text-[10px] uppercase tracking-wider text-ocragray-800 dark:text-zinc-200 mt-1 font-semibold">Classification and additional details</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Font Category</Label>
                  <Select
                    options={CATEGORY_OPTIONS}
                    value={fontCategory}
                    onChange={setFontCategory}
                    placeholder="Select a category"
                  />
                  <input type="hidden" name="fontCategory" value={fontCategory} />
                </div>

                <div>
                  <TagPicker
                    label="Tags"
                    tags={tags}
                    value={selectedTagIds}
                    onChange={setSelectedTagIds}
                    emptyLabel="No tags available. You can create tags in /admin/tags."
                  />
                  {selectedTagIds.map((tagId) => (
                    <input key={tagId} type="hidden" name="tagIds" value={tagId} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BaseModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} size="md">
        <BaseModal.Header onClose={() => setShowErrorModal(false)}>
          <div className="flex items-end gap-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl text-black dark:text-white">Collection Save Failed</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-ocragray-800 dark:text-zinc-200 font-haas">
              We encountered an error while trying to save the collection:
            </p>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-bold text-sm">
              {errorMessage}
            </div>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <button
            type="button"
            onClick={() => setShowErrorModal(false)}
            className="w-full py-4 bg-red-500 text-white rounded-xl font-black uppercase tracking-tighter hover:bg-red-600 transition-all shadow-lg"
          >
            Review Settings
          </button>
        </BaseModal.Footer>
      </BaseModal>

      <SavingOverlay message="Saving Collection..." />
    </form>
  );
}
