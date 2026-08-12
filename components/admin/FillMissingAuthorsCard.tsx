"use client";

import { useState, useEffect } from "react";
import { UserPlus, Loader2, CheckCircle2, SkipForward } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import BaseModal from "@/components/common/BaseModal";
import { getFontsNeedingManualAuthor, assignManualFontAuthor } from "@/lib/actions/font";

interface CandidateFont {
  id: string;
  name: string;
  creator: string | null;
}

export default function FillMissingAuthorsCard({ count }: { count: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [queue, setQueue] = useState<CandidateFont[]>([]);
  const [index, setIndex] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const current = queue[index];
  const isDone = !isLoading && queue.length > 0 && index >= queue.length;

  useEffect(() => {
    setAuthorName("");
    setError(null);
  }, [index]);

  const openModal = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setSavedCount(0);
    setIndex(0);
    setError(null);
    try {
      const fonts = await getFontsNeedingManualAuthor();
      setQueue(fonts);
    } catch (err: any) {
      setError(err.message || "Failed to load fonts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!current || !authorName.trim() || isSaving) return;
    setIsSaving(true);
    setError(null);
    try {
      await assignManualFontAuthor(current.id, authorName.trim());
      setSavedCount((c) => c + 1);
      setIndex((i) => i + 1);
    } catch (err: any) {
      setError(err.message || "Failed to save author.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    if (isSaving) return;
    setIndex((i) => i + 1);
  };

  const close = () => setIsOpen(false);

  return (
    <>
      <Card roundness="lg" visualHover className="cursor-pointer" onClick={openModal}>
        <div className="p-2 h-full flex justify-center items-center gap-4">

          <div className="min-w-0">
            <p className="text-xl font-bold text-black dark:text-white truncate">
              {count} font{count !== 1 ? "s" : ""} without an author
            </p>
            <p className="font-haas text-md text-center uppercase tracking-widest font-bold text-blue-800 dark:text-red-600 truncate">
              Fill Manually
            </p>
          </div>
        </div>
      </Card>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={() => (!isSaving ? close() : undefined)} size="md">
          <BaseModal.Header onClose={() => (!isSaving ? close() : undefined)}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <UserPlus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-crenzo text-black dark:text-white leading-tight">Fill Authors</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 mt-0.5">
                  One font at a time
                </p>
              </div>
            </div>
          </BaseModal.Header>

          <BaseModal.Body>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                  Loading fonts...
                </p>
              </div>
            ) : queue.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <p className="text-sm font-bold text-black dark:text-white">Nothing to fill</p>
              </div>
            ) : isDone ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <p className="text-sm font-bold text-black dark:text-white">All done</p>
                <p className="text-xs text-ocragray-800 dark:text-zinc-200">{savedCount} author(s) filled in.</p>
              </div>
            ) : current ? (
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                  <span>Progress</span>
                  <span className="tabular-nums">{index + 1} / {queue.length}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500"
                    style={{ width: `${(index / queue.length) * 100}%` }}
                  />
                </div>

                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200 mb-1">Font</p>
                  <p className="text-lg font-haas text-black dark:text-white">{current.name.replace('_',' ')}</p>
                </div>

                <Input
                  id="manual-author-name"
                  name="authorName"
                  label="Author Name"
                  value={authorName}
                  onChange={setAuthorName}
                  placeholder="e.g. Dalton Maag"
                  autoComplete="off"
                  autoFocus
                />

                {error && <p className="text-[10px] text-red-500 font-bold">{error}</p>}
              </div>
            ) : null}
          </BaseModal.Body>

          <BaseModal.Footer>
            {!isLoading && current && !isDone && (
              <div className="flex items-center gap-3 w-full">
                <Button
                  variant="secondary"
                  size="md"
                  roundness="md"
                  onClick={handleSkip}
                  disabled={isSaving}
                  className="flex items-center gap-2 font-bold"
                >
                  <SkipForward className="h-4 w-4" />
                  Skip
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  roundness="md"
                  onClick={handleSave}
                  disabled={isSaving || !authorName.trim()}
                  fullWidth
                  className="flex items-center justify-center gap-2 font-bold"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  {isSaving ? "Saving..." : "Save & Next"}
                </Button>
              </div>
            )}
            {(isDone || queue.length === 0) && !isLoading && (
              <Button
                variant="primary"
                size="md"
                roundness="md"
                onClick={close}
                fullWidth
                className="flex items-center justify-center gap-2 font-bold"
              >
                <CheckCircle2 className="h-4 w-4" />
                Done
              </Button>
            )}
          </BaseModal.Footer>
        </BaseModal>
      )}
    </>
  );
}
