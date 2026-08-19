"use client";

import { useRef, useState, useEffect } from "react";
import { UserSearch, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import BaseModal from "@/components/common/BaseModal";
import {
  getAuthorsNeedingDafontProfile,
  scrapeAuthorDafontProfile,
  type DafontProfileCandidateAuthor,
} from "@/lib/actions/fontAuthor";

type Phase = "idle" | "loading-candidates" | "ready" | "running" | "done";

// Stessa cortesia verso lo scraper interno di ForceDafontScrapingCard: una
// richiesta alla volta, con una pausa fra un autore e il successivo.
const REQUEST_STAGGER_MS = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// "Scrape Author Dafont Profiles" in dashboard — per ogni autore reale senza
// dafontProfileUrl legge la pagina dafont del suo PRIMO font e ne estrae il
// link al profilo dell'autore ("by [Nome](https://www.dafont.com/mjtype.d10200)"),
// che dafont non rende derivabile dal nome (id numerico). Stesso schema
// modale/terminal-log di ForceDafontScrapingCard, salvataggio autore per autore.
export default function ScrapeAuthorProfilesCard({ count }: { count: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [candidates, setCandidates] = useState<DafontProfileCandidateAuthor[]>([]);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<{
    found: Array<{ name: string; profileUrl: string }>;
    notFound: Array<{ name: string }>;
    failed: Array<{ name: string; error: string }>;
  } | null>(null);

  const [isCancelling, setIsCancelling] = useState(false);
  const cancelRequestedRef = useRef(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const openModal = async () => {
    setIsOpen(true);
    setPhase("loading-candidates");
    setResults(null);
    setProgress(0);
    setLogs([]);
    cancelRequestedRef.current = false;
    setIsCancelling(false);
    try {
      const authors = await getAuthorsNeedingDafontProfile();
      setCandidates(authors);
      setPhase("ready");
    } catch (err: any) {
      setLogs([`[ERROR] Failed to load candidate authors: ${err.message}`]);
      setPhase("done");
      setResults({ found: [], notFound: [], failed: [] });
    }
  };

  const runScraping = async () => {
    setPhase("running");
    setProgress(0);
    setLogs([
      `Found ${candidates.length} author(s) without a dafont profile link.`,
      "Starting dafont.com author profile lookup...",
    ]);

    const found: Array<{ name: string; profileUrl: string }> = [];
    const notFound: Array<{ name: string }> = [];
    const failed: Array<{ name: string; error: string }> = [];

    for (let i = 0; i < candidates.length; i++) {
      if (cancelRequestedRef.current) {
        setLogs((prev) => [...prev, `Cancelled by user after ${i}/${candidates.length} author(s).`].slice(-40));
        break;
      }

      const author = candidates[i];
      setLogs((prev) =>
        [...prev, `[${i + 1}/${candidates.length}] ${author.name} → reading ${author.dafontFontUrl}...`].slice(-40)
      );

      try {
        const result = await scrapeAuthorDafontProfile(author.id);

        if (result.notFound) {
          notFound.push({ name: author.name });
          setLogs((prev) => [...prev, `⚠ ${author.name} → font page not found on dafont.com (404)`].slice(-40));
        } else if (!result.profileUrl) {
          notFound.push({ name: author.name });
          setLogs((prev) => [...prev, `⚠ ${author.name} → no author link on the page`].slice(-40));
        } else {
          found.push({ name: author.name, profileUrl: result.profileUrl });
          setLogs((prev) => [...prev, `✓ ${author.name} → ${result.profileUrl}`].slice(-40));
        }
      } catch (err: any) {
        failed.push({ name: author.name, error: err.message || "Unknown error" });
        setLogs((prev) => [...prev, `✗ ${author.name} failed: ${err.message}`].slice(-40));
      }

      setProgress(i + 1);
      if (i < candidates.length - 1) await sleep(REQUEST_STAGGER_MS);
    }

    setLogs((prev) => [
      ...prev,
      "-------------------------",
      `Done. Found ${found.length}, not found ${notFound.length}, failed ${failed.length}.`,
    ]);
    setResults({ found, notFound, failed });
    setPhase("done");

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("Dafont author profiles complete", {
        body: `Saved ${found.length} profile(s)${notFound.length ? `, ${notFound.length} not found` : ""}${failed.length ? `, ${failed.length} failed` : ""}.`,
      });
    }
  };

  const handleCancel = () => {
    cancelRequestedRef.current = true;
    setIsCancelling(true);
    setLogs((prev) => [...prev, "Cancelling after the current author finishes..."].slice(-40));
  };

  const close = () => {
    setIsOpen(false);
    setPhase("idle");
  };

  return (
    <>
      <Card roundness="lg" visualHover className="cursor-pointer" onClick={openModal}>
        <div className="p-2 h-full flex flex-col justify-center items-center gap-2">
          <p className="text-xl font-bold text-black dark:text-white truncate text-center">
            {count} dafont-imported author{count !== 1 ? "s" : ""} without a profile page
          </p>
           <p className="font-haas text-md text-center uppercase tracking-widest font-bold text-blue-200 dark:text-red-400 truncate">
            Run Dafont Scraping
          </p>
        </div>
      </Card>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={() => (phase !== "running" ? close() : undefined)} size="lg">
          <BaseModal.Header>
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <UserSearch className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-crenzo text-black dark:text-white leading-tight">
                    Scrape Author Profiles
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 mt-0.5">
                    dafont.com &middot; Author profile page lookup
                  </p>
                </div>
              </div>
              {phase !== "running" && (
                <button onClick={close} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                  <X className="h-4 w-4 text-ocragray-800 dark:text-zinc-200" />
                </button>
              )}
            </div>
          </BaseModal.Header>

          <BaseModal.Body>
            {phase === "loading-candidates" && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="h-6 w-6 text-violet-500 animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                  Scanning authors...
                </p>
              </div>
            )}

            {phase === "ready" && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  Found <span className="text-black dark:text-white font-black">{candidates.length}</span> author(s)
                  without a dafont profile link. For each one, the dafont page of their first font is read (name →
                  slug, e.g. "Matcha_Mint" → matcha-mint.font) and the author link found on it
                  ("by [Name](...)") is saved on the author.
                </p>
                {candidates.length > 0 && (
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {candidates.map((author) => (
                      <div
                        key={author.id}
                        className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{author.name}</span>
                        <span className="text-[10px] text-zinc-400 shrink-0 font-mono truncate max-w-[55%]">
                          {author.firstFontName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {(phase === "running" || phase === "done") && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                    <span>Progress</span>
                    <span className="tabular-nums">
                      {progress} / {candidates.length}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600 transition-all duration-500"
                      style={{ width: candidates.length > 0 ? `${(progress / candidates.length) * 100}%` : "0%" }}
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">
                      Author Profile Log
                    </span>
                  </div>
                  <div
                    ref={terminalRef}
                    className="p-4 h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 font-mono text-[10px]"
                  >
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-violet-500 shrink-0 mt-px">{">"}</span>
                        <span className="text-zinc-300 break-all">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {results && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block mb-1">
                          Found
                        </span>
                        <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                          {results.found.length}
                        </span>
                      </div>
                      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 block mb-1">
                          Not Found
                        </span>
                        <span className="text-3xl font-black text-amber-600 dark:text-amber-400 leading-none">
                          {results.notFound.length}
                        </span>
                      </div>
                      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 dark:text-red-400 block mb-1">
                          Failed
                        </span>
                        <span className="text-3xl font-black text-red-600 dark:text-red-400 leading-none">
                          {results.failed.length}
                        </span>
                      </div>
                    </div>

                    {results.failed.length > 0 && (
                      <div className="max-h-28 overflow-y-auto rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 p-3 space-y-1">
                        {results.failed.map((fail, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-[10px] text-red-700 dark:text-red-400 font-bold"
                          >
                            <AlertCircle className="h-3 w-3 shrink-0 mt-px" />
                            <span>
                              <span className="opacity-70">{fail.name}:</span> {fail.error}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </BaseModal.Body>

          <BaseModal.Footer>
            {phase === "ready" && (
              <div className="flex gap-2 w-full">
                <Button variant="secondary" size="md" roundness="md" onClick={close} className="font-bold">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  roundness="md"
                  disabled={candidates.length === 0}
                  onClick={runScraping}
                  fullWidth
                  className="flex items-center justify-center gap-2 font-bold"
                >
                  <UserSearch className="h-4 w-4" />
                  {candidates.length === 0 ? "Nothing to scrape" : `Scrape ${candidates.length} author(s)`}
                </Button>
              </div>
            )}
            {phase === "running" && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="secondary"
                  size="md"
                  roundness="md"
                  disabled={isCancelling}
                  onClick={handleCancel}
                  className="font-bold"
                >
                  {isCancelling ? "Cancelling..." : "Cancel"}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  roundness="md"
                  disabled
                  fullWidth
                  className="flex items-center justify-center gap-2 font-bold"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Scraping...
                </Button>
              </div>
            )}
            {phase === "done" && (
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
