"use client";

import { useRef, useState, useEffect } from "react";
import { Scale, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import BaseModal from "@/components/common/BaseModal";
import { getFontsNeedingIdentityDetection, detectFontIdentityWithAI } from "@/lib/actions/font";

interface CandidateFont {
  id: string;
  name: string;
  creator: string | null;
  licenseType: string | null;
}

type Phase = "idle" | "loading-candidates" | "ready" | "running" | "done";

// Gemini 3.1 Flash-Lite free tier: 15 richieste/minuto — spaziando le
// chiamate a ~4.5s si resta sotto quota anche in un batch lungo.
const MIN_REQUEST_INTERVAL_MS = 4500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function AIFontIdentityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [candidates, setCandidates] = useState<CandidateFont[]>([]);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<{
    resolved: Array<{ family: string; author: string | null; licenseType: string | null }>;
    failed: Array<{ family: string; error: string }>;
  } | null>(null);

  const fmtConfidence = (c: number) => c.toFixed(1);

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
      const fonts = await getFontsNeedingIdentityDetection();
      setCandidates(fonts);
      setPhase("ready");
    } catch (err: any) {
      setLogs([`[ERROR] Failed to load candidate fonts: ${err.message}`]);
      setPhase("done");
      setResults({ resolved: [], failed: [] });
    }
  };

  const runDetection = async () => {
    setPhase("running");
    setProgress(0);
    setLogs([`Found ${candidates.length} font(s) with unresolved author and/or license.`, "Starting AI identity detection session..."]);

    const resolved: Array<{ family: string; author: string | null; licenseType: string | null }> = [];
    const failed: Array<{ family: string; error: string }> = [];

    let lastRequestAt = 0;

    for (let i = 0; i < candidates.length; i++) {
      if (cancelRequestedRef.current) {
        setLogs(prev => [...prev, `Cancelled by user after ${i}/${candidates.length} font(s).`].slice(-40));
        break;
      }

      const font = candidates[i];

      const elapsed = Date.now() - lastRequestAt;
      if (lastRequestAt > 0 && elapsed < MIN_REQUEST_INTERVAL_MS) {
        const wait = MIN_REQUEST_INTERVAL_MS - elapsed;
        setLogs(prev => [...prev, `Pacing... waiting ${Math.ceil(wait / 1000)}s to stay under the API rate limit.`].slice(-40));
        await sleep(wait);
      }

      setLogs(prev => [...prev, `[${i + 1}/${candidates.length}] Asking Gemini about "${font.name}"...`].slice(-40));
      lastRequestAt = Date.now();
      try {
        const result = await detectFontIdentityWithAI(font.id);
        resolved.push({ family: result.family, author: result.author, licenseType: result.licenseType });

        // Step 1 (a memoria) è sempre presente — sempre mostrato, con la
        // confidence che Gemini si è auto-assegnata.
        setLogs(prev => [
          ...prev,
          `  step1 (memory): author "${result.step1.author}", license "${result.step1.licenseType}" — confidence ${fmtConfidence(result.step1.confidence)}/10`,
        ].slice(-40));

        if (result.step2) {
          // Confidence sotto soglia → step 2 è girato con ricerca web e ha
          // vinto lui come risultato finale.
          setLogs(prev => [
            ...prev,
            `  step2 (web search): author "${result.step2!.author}", license "${result.step2!.licenseType}" — used as final result`,
          ].slice(-40));
        } else if (result.step2Error) {
          setLogs(prev => [
            ...prev,
            `  step2 (web search) failed: ${result.step2Error} — kept step1 result`,
          ].slice(-40));
        }

        const parts = [
          result.author ? `author: ${result.author}` : null,
          result.licenseType ? `license: ${result.licenseType}` : null,
        ].filter(Boolean).join(", ");
        setLogs(prev => [...prev, `✓ ${font.name} → ${parts || "nothing left to update"}`].slice(-40));
      } catch (err: any) {
        failed.push({ family: font.name, error: err.message || "Unknown error" });
        setLogs(prev => [...prev, `✗ ${font.name} failed: ${err.message}`].slice(-40));
      }
      setProgress(i + 1);
    }

    setLogs(prev => [...prev, "-------------------------", `Done. Resolved ${resolved.length}, failed ${failed.length}.`]);
    setResults({ resolved, failed });
    setPhase("done");

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("AI Font Identity detection complete", {
        body: `Resolved ${resolved.length} font(s)${failed.length ? `, ${failed.length} failed` : ""}.`,
      });
    }
  };

  const handleCancel = () => {
    cancelRequestedRef.current = true;
    setIsCancelling(true);
    setLogs(prev => [...prev, "Cancelling after the current font finishes..."].slice(-40));
  };

  const close = () => {
    setIsOpen(false);
    setPhase("idle");
  };

  return (
    <>
      <Card roundness="lg" visualHover className="!h-fit cursor-pointer" onClick={openModal}>
        <div className="p-2 flex items-center gap-4">
          <div className="h-8 w-8 shrink-0 rounded-sm border flex items-center justify-center bg-amber-500/10 border-amber-500/20">
            <Scale className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-black dark:text-white truncate">Resolve Font Identity with AI</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 truncate">
              Author &amp; license lookup
            </p>
          </div>
        </div>
      </Card>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={() => (phase !== "running" ? close() : undefined)} size="lg">
          <BaseModal.Header>
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Scale className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-rezland text-black dark:text-white leading-tight">AI Identity Detection</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 mt-0.5">
                    Author lookup &middot; License type
                  </p>
                </div>
              </div>
              {phase !== "running" && (
                <button
                  onClick={close}
                  className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  <X className="h-4 w-4 text-ocragray-800 dark:text-zinc-200" />
                </button>
              )}
            </div>
          </BaseModal.Header>

          <BaseModal.Body>
            {phase === "loading-candidates" && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="h-6 w-6 text-amber-500 animate-spin" />
                <p className="text-xs font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                  Scanning fonts...
                </p>
              </div>
            )}

            {phase === "ready" && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  Found <span className="text-black dark:text-white font-black">{candidates.length}</span> font(s)
                  missing a real author, a license type, or both. AI will look up the real designer/foundry and the
                  most likely license for each, then save whatever is still missing directly on the font.
                </p>
                {candidates.length > 0 && (
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {candidates.map(font => (
                      <div key={font.id} className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                        <span className="truncate">{font.name}</span>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest shrink-0 ml-2">{font.licenseType || "no license"}</span>
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
                    <span className="tabular-nums">{progress} / {candidates.length}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
                      style={{ width: candidates.length > 0 ? `${(progress / candidates.length) * 100}%` : "0%" }}
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">AI Identity Log</span>
                  </div>
                  <div ref={terminalRef} className="p-4 h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 font-mono text-[10px]">
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-500 shrink-0 mt-px">{">"}</span>
                        <span className="text-zinc-300">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {results && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block mb-1">Resolved</span>
                        <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">{results.resolved.length}</span>
                      </div>
                      <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 dark:text-red-400 block mb-1">Failed</span>
                        <span className="text-3xl font-black text-red-600 dark:text-red-400 leading-none">{results.failed.length}</span>
                      </div>
                    </div>

                    {results.failed.length > 0 && (
                      <div className="max-h-28 overflow-y-auto rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 p-3 space-y-1">
                        {results.failed.map((fail, index) => (
                          <div key={index} className="flex items-start gap-2 text-[10px] text-red-700 dark:text-red-400 font-bold">
                            <AlertCircle className="h-3 w-3 shrink-0 mt-px" />
                            <span><span className="opacity-70">{fail.family}:</span> {fail.error}</span>
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
                <Button
                  variant="secondary"
                  size="md"
                  roundness="md"
                  onClick={close}
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  roundness="md"
                  disabled={candidates.length === 0}
                  onClick={runDetection}
                  fullWidth
                  className="flex items-center justify-center gap-2 font-bold"
                >
                  <Scale className="h-4 w-4" />
                  {candidates.length === 0 ? "Nothing to resolve" : `Resolve ${candidates.length} font(s) with AI`}
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
                  Resolving...
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
