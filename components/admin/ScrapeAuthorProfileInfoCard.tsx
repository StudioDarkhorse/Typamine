"use client";

import { useRef, useState, useEffect } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import BaseModal from "@/components/common/BaseModal";
import {
  getAuthorsNeedingProfileInfo,
  scrapeAuthorProfileInfo,
  type ProfileInfoCandidateAuthor,
} from "@/lib/actions/fontAuthor";

type Phase = "idle" | "loading-candidates" | "ready" | "running" | "done";

// Due scrape per autore (pagina autore + pagina profilo utente): stessa
// cortesia verso lo scraper interno delle altre card, applicata fra un autore
// e il successivo.
const REQUEST_STAGGER_MS = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// "Scrape Profile Info" in dashboard — secondo salto della catena dafont:
// dalla pagina autore già salvata (dafontProfileUrl) al link della profile
// info page (profileInfoUrl, /profile.php?user=NNNN) e da lì, se pubblica,
// all'email di contatto, che sostituisce quella dell'autore.
// I candidati sono per costruzione solo autori arrivati da dafont: chi viene
// da 1001fonts la profile info page ce l'ha già dall'import e non compare
// mai in questa lista.
export default function ScrapeAuthorProfileInfoCard({ count }: { count: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [candidates, setCandidates] = useState<ProfileInfoCandidateAuthor[]>([]);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<{
    profiles: Array<{ name: string; profileInfoUrl: string }>;
    emails: Array<{ name: string; email: string }>;
    skipped: Array<{ name: string; dafontName: string | null; email: string; profileInfoUrl: string }>;
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
      const authors = await getAuthorsNeedingProfileInfo();
      setCandidates(authors);
      setPhase("ready");
    } catch (err: any) {
      setLogs([`[ERROR] Failed to load candidate authors: ${err.message}`]);
      setPhase("done");
      setResults({ profiles: [], emails: [], skipped: [], notFound: [], failed: [] });
    }
  };

  const runScraping = async () => {
    setPhase("running");
    setProgress(0);
    setLogs([
      `Found ${candidates.length} author(s) with a dafont page but no profile info.`,
      "Starting dafont.com profile info + email lookup...",
    ]);

    const profiles: Array<{ name: string; profileInfoUrl: string }> = [];
    const emails: Array<{ name: string; email: string }> = [];
    const skipped: Array<{ name: string; dafontName: string | null; email: string; profileInfoUrl: string }> = [];
    const notFound: Array<{ name: string }> = [];
    const failed: Array<{ name: string; error: string }> = [];

    for (let i = 0; i < candidates.length; i++) {
      if (cancelRequestedRef.current) {
        setLogs((prev) => [...prev, `Cancelled by user after ${i}/${candidates.length} author(s).`].slice(-40));
        break;
      }

      const author = candidates[i];
      setLogs((prev) =>
        [...prev, `[${i + 1}/${candidates.length}] ${author.name} → reading ${author.dafontProfileUrl}...`].slice(-40)
      );

      try {
        const result = await scrapeAuthorProfileInfo(author.id);

        if (result.notFound) {
          notFound.push({ name: author.name });
          setLogs((prev) => [...prev, `⚠ ${author.name} → author page not found on dafont.com (404)`].slice(-40));
        } else if (!result.profileInfoUrl) {
          notFound.push({ name: author.name });
          setLogs((prev) => [...prev, `⚠ ${author.name} → no user profile link on the author page`].slice(-40));
        } else {
          profiles.push({ name: author.name, profileInfoUrl: result.profileInfoUrl });
          setLogs((prev) => [...prev, `✓ ${author.name} → profile ${result.profileInfoUrl}`].slice(-40));

          if (result.profileInfoNotFound) {
            setLogs((prev) => [...prev, `⚠ ${author.name} → profile page not found (404), no email`].slice(-40));
          } else if (result.skippedEmail) {
            skipped.push({
              name: author.name,
              dafontName: result.dafontName,
              email: result.skippedEmail,
              profileInfoUrl: result.profileInfoUrl,
            });
            setLogs((prev) =>
              [
                ...prev,
                `⊘ ${author.name} → profile belongs to "${result.dafontName ?? "unknown"}", email ${result.skippedEmail} NOT saved (fix manually)`,
              ].slice(-40)
            );
          } else if (result.email) {
            emails.push({ name: author.name, email: result.email });
            setLogs((prev) => [...prev, `✉ ${author.name} → email ${result.email} (was ${result.previousEmail})`].slice(-40));
          } else {
            setLogs((prev) => [...prev, `⚠ ${author.name} → profile has no public email, kept existing`].slice(-40));
          }
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
      `Done. Profiles ${profiles.length}, emails ${emails.length}, skipped (name mismatch) ${skipped.length}, not found ${notFound.length}, failed ${failed.length}.`,
      ...(skipped.length > 0
        ? [`${skipped.length} author(s) kept their email: the dafont profile is signed by someone else — fix manually.`]
        : []),
    ]);
    setResults({ profiles, emails, skipped, notFound, failed });
    setPhase("done");

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("Dafont profile info complete", {
        body: `Saved ${profiles.length} profile(s) and ${emails.length} email(s)${skipped.length ? `, ${skipped.length} skipped (name mismatch)` : ""}${failed.length ? `, ${failed.length} failed` : ""}.`,
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
            {count} dafont author{count !== 1 ? "s" : ""} without profile info
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
                <div className="h-10 w-10 rounded-md bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-crenzo text-black dark:text-white leading-tight">
                    Scrape Profile Info
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 mt-0.5">
                    dafont.com &middot; User profile &amp; contact email
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
                <Loader2 className="h-6 w-6 text-teal-500 animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                  Scanning authors...
                </p>
              </div>
            )}

            {phase === "ready" && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  Found <span className="text-black dark:text-white font-black">{candidates.length}</span> author(s)
                  with a dafont page but no profile info yet. For each one: the author page is read to get the user
                  profile link (/profile.php?user=NNNN), which is saved, then that profile is read to get the contact
                  email. The email replaces the author&apos;s current one{" "}
                  <span className="text-black dark:text-white font-black">only if the dafont profile is signed with
                  the same name</span> — otherwise the url is still saved, the email is skipped and listed at the end.
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
                          {author.email}
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
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500"
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
                      Profile Info Log
                    </span>
                  </div>
                  <div
                    ref={terminalRef}
                    className="p-4 h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 font-mono text-[10px]"
                  >
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-teal-500 shrink-0 mt-px">{">"}</span>
                        <span className="text-zinc-300 break-all">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {results && (
                  <div className="space-y-3">
                    {/* Esiti principali (profilo salvato, email salvata) su una
                        riga, i tre esiti "non risolti" su quella sotto. */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400 block">
                          Profiles
                        </span>
                        <span className="text-2xl font-black text-teal-600 dark:text-teal-400 leading-none">
                          {results.profiles.length}
                        </span>
                      </div>
                      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block">
                          Emails
                        </span>
                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                          {results.emails.length}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-violet-700 dark:text-violet-400 block">
                          Skipped
                        </span>
                        <span className="text-2xl font-black text-violet-600 dark:text-violet-400 leading-none">
                          {results.skipped.length}
                        </span>
                      </div>
                      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 block">
                          Not Found
                        </span>
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400 leading-none">
                          {results.notFound.length}
                        </span>
                      </div>
                      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 dark:text-red-400 block">
                          Failed
                        </span>
                        <span className="text-2xl font-black text-red-600 dark:text-red-400 leading-none">
                          {results.failed.length}
                        </span>
                      </div>
                    </div>

                    {/* Email trovate ma non salvate: il profilo dafont è di un
                        altro autore. Elencate con il nome dafont e l'indirizzo
                        scartato, per la correzione manuale. */}
                    {results.skipped.length > 0 && (
                      <div className="rounded-xl border border-violet-200 dark:border-violet-900/30 bg-violet-50 dark:bg-violet-950/20 p-3 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-violet-700 dark:text-violet-400">
                          Name mismatch &middot; email not saved, fix manually
                        </p>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {results.skipped.map((skip, index) => (
                            <div key={index} className="text-[10px] text-violet-800 dark:text-violet-300 font-bold break-all">
                              <span className="opacity-70">{skip.name}</span> → dafont: {skip.dafontName ?? "unknown"} ·{" "}
                              {skip.email}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                  <Mail className="h-4 w-4" />
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
