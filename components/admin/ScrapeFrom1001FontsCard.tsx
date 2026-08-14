"use client";

import { useRef, useState, useEffect } from "react";
import { Download, Loader2, CheckCircle2, AlertCircle, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import BaseModal from "@/components/common/BaseModal";
import fonts1001Urls from "@/lib/data/1001fontsUrls.json";

type CategoryTree = Record<string, Record<string, string>>;
const CATEGORY_TREE = fonts1001Urls as CategoryTree;

type Step = "category" | "page" | "running" | "done";

interface NdjsonEvent {
  type: "total" | "log" | "progress" | "done";
  total?: number;
  message?: string;
  current?: number;
  imported?: string[];
  skipped?: Array<{ family: string; reason: string }>;
  failed?: Array<{ family: string; error: string }>;
}

// Gli url in lib/data/1001fontsUrls.json arrivano con un doppio slash
// ("https://www.1001fonts.com//serif-fonts.html"): innocuo per il browser, ma
// lo scraper lo passa pari pari, quindi si normalizza qui.
function resolveCategoryUrl(raw: string): string {
  try {
    const url = new URL(raw, "https://www.1001fonts.com/");
    url.pathname = url.pathname.replace(/\/{2,}/g, "/");
    return url.toString();
  } catch {
    return raw;
  }
}

function buildPagedUrl(baseUrl: string, page: number): string {
  if (page <= 1) return baseUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}page=${page}`;
}

// "Import Fonts from 1001Fonts" in dashboard — stessa modalità di
// "Scrape From Dafont" (macro categoria → sotto categoria → pagina), ma su
// 1001fonts la pagina categoria elenca solo i link ai singoli font: nome,
// autore (con il link al suo profilo), licenza e zip stanno sulla pagina di
// dettaglio, letta font per font dalla route.
// Route: app/api/admin/fonts/scrape-1001fonts-category/route.ts (NDJSON).
export default function ScrapeFrom1001FontsCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("category");

  const [macro, setMacro] = useState("");
  const [sub, setSub] = useState("");
  const [page, setPage] = useState("1");

  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [results, setResults] = useState<{
    imported: string[];
    skipped: Array<{ family: string; reason: string }>;
    failed: Array<{ family: string; error: string }>;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [logs]);

  const macroOptions = Object.keys(CATEGORY_TREE).map((k) => ({ label: k, value: k }));
  const subOptions = macro ? Object.keys(CATEGORY_TREE[macro] || {}).map((k) => ({ label: k, value: k })) : [];

  const resolvedBaseUrl = macro && sub ? resolveCategoryUrl(CATEGORY_TREE[macro][sub]) : null;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const finalUrl = resolvedBaseUrl ? buildPagedUrl(resolvedBaseUrl, pageNum) : null;

  const openModal = () => {
    setIsOpen(true);
    setStep("category");
    setMacro("");
    setSub("");
    setPage("1");
    setProgress(0);
    setTotal(0);
    setLogs([]);
    setResults(null);
    setIsRunning(false);
  };

  const close = () => {
    if (isRunning) return;
    setIsOpen(false);
  };

  const startScraping = async () => {
    if (!finalUrl) return;
    setStep("running");
    setIsRunning(true);
    setLogs([`Target: ${finalUrl}`, "Connecting to scraper..."]);
    setProgress(0);
    setTotal(0);

    try {
      const res = await fetch("/api/admin/fonts/scrape-1001fonts-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl }),
      });

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalImported: string[] = [];
      let finalSkipped: Array<{ family: string; reason: string }> = [];
      let finalFailed: Array<{ family: string; error: string }> = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          let event: NdjsonEvent;
          try {
            event = JSON.parse(line);
          } catch {
            continue;
          }

          if (event.type === "total" && typeof event.total === "number") {
            setTotal(event.total);
          } else if (event.type === "log" && event.message) {
            setLogs((prev) => [...prev, event.message as string].slice(-60));
          } else if (event.type === "progress" && typeof event.current === "number") {
            setProgress(event.current);
          } else if (event.type === "done") {
            finalImported = event.imported || [];
            finalSkipped = event.skipped || [];
            finalFailed = event.failed || [];
          }
        }
      }

      setLogs((prev) => [
        ...prev,
        "-------------------------",
        `Done. Imported ${finalImported.length}, skipped ${finalSkipped.length}, failed ${finalFailed.length}.`,
      ]);
      setResults({ imported: finalImported, skipped: finalSkipped, failed: finalFailed });
    } catch (err: any) {
      setLogs((prev) => [...prev, `✗ ${err.message || "Unknown error"}`]);
      setResults({ imported: [], skipped: [], failed: [{ family: finalUrl, error: err.message || "Unknown error" }] });
    } finally {
      setIsRunning(false);
      setStep("done");
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification("1001Fonts category scraping complete", { body: "Check the modal for the full log." });
      }
    }
  };

  return (
    <>
      <Card roundness="lg" visualHover className="cursor-pointer" onClick={openModal}>
        <div className="p-2 h-full flex flex-col justify-center items-center gap-2">
          <p className="text-xl font-bold text-black dark:text-white truncate text-center">
            Import Fonts from 1001Fonts
          </p>
          <p className="font-haas text-md text-center uppercase tracking-widest font-bold text-blue-100 dark:text-red-200 truncate">
            Run Scraper
          </p>
        </div>
      </Card>

      {isOpen && (
        <BaseModal isOpen={isOpen} onClose={close} size="lg">
          <BaseModal.Header>
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Download className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-crenzo text-black dark:text-white leading-tight">Scrape 1001Fonts</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-200 mt-0.5">
                    Import a whole 1001fonts.com category
                  </p>
                </div>
              </div>
              {!isRunning && (
                <button onClick={close} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                  <X className="h-4 w-4 text-ocragray-800 dark:text-zinc-200" />
                </button>
              )}
            </div>
          </BaseModal.Header>

          <BaseModal.Body>
            {step === "category" && (
              <div className="space-y-5">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  Choose a category from 1001fonts.com. Every font listed on that category page gets its detail page
                  read (name, author + author profile link, license, zip), then it is downloaded, converted to WOFF2
                  and imported.
                </p>
                <Select
                  label="Macro Category"
                  options={macroOptions}
                  value={macro}
                  onChange={(v) => {
                    setMacro(v);
                    setSub("");
                  }}
                  placeholder="Choose a macro category..."
                />
                <Select
                  label="Sub Category"
                  options={subOptions}
                  value={sub}
                  onChange={setSub}
                  placeholder={macro ? "Choose a sub category..." : "Choose a macro category first"}
                />
              </div>
            )}

            {step === "page" && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200 mb-1">
                    Category
                  </p>
                  <p className="text-sm font-bold text-black dark:text-white">
                    {macro} / {sub}
                  </p>
                </div>
                <Input type="number" min={1} label="Page" value={page} onChange={setPage} placeholder="1" />
                {finalUrl && (
                  <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-1">
                      Will scrape
                    </p>
                    <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300 break-all">{finalUrl}</p>
                    <p className="text-[10px] text-zinc-500 mt-2">12 fonts per page on 1001fonts.com.</p>
                  </div>
                )}
              </div>
            )}

            {(step === "running" || step === "done") && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                    <span>Progress</span>
                    <span className="tabular-nums">
                      {progress} / {total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
                      style={{ width: total > 0 ? `${(progress / total) * 100}%` : "0%" }}
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">
                      1001Fonts Import Log
                    </span>
                  </div>
                  <div
                    ref={terminalRef}
                    className="p-4 h-56 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 font-mono text-[10px]"
                  >
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-orange-500 shrink-0 mt-px">{">"}</span>
                        <span className="text-zinc-300 whitespace-pre-wrap break-all">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {results && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 block">
                          Imported
                        </span>
                        <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                          {results.imported.length}
                        </span>
                      </div>
                      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 px-3 py-2 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 block">
                          Skipped
                        </span>
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400 leading-none">
                          {results.skipped.length}
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

                    {results.failed.length > 0 && (
                      <div className="max-h-28 overflow-y-auto rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 p-3 space-y-1">
                        {results.failed.map((fail, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-[10px] text-red-700 dark:text-red-400 font-bold"
                          >
                            <AlertCircle className="h-3 w-3 shrink-0 mt-px" />
                            <span>
                              <span className="opacity-70">{fail.family}:</span> {fail.error}
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
            {step === "category" && (
              <div className="flex gap-2 w-full">
                <Button variant="secondary" size="md" roundness="md" onClick={close} className="font-bold">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  roundness="md"
                  disabled={!macro || !sub}
                  onClick={() => setStep("page")}
                  fullWidth
                  className="font-bold"
                >
                  Next: Choose Page
                </Button>
              </div>
            )}
            {step === "page" && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="secondary"
                  size="md"
                  roundness="md"
                  onClick={() => setStep("category")}
                  className="flex items-center gap-2 font-bold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  roundness="md"
                  disabled={!finalUrl}
                  onClick={startScraping}
                  fullWidth
                  className="flex items-center justify-center gap-2 font-bold"
                >
                  <Download className="h-4 w-4" />
                  Start Scraping
                </Button>
              </div>
            )}
            {step === "running" && (
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
            )}
            {step === "done" && (
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
