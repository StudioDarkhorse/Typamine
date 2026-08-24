"use client";

import { useRef, useState, useEffect } from "react";
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Globe,
  Layers,
  FileDigit,
  SkipForward,
  XCircle,
  Link2,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import AdminViewHeader from "./AdminViewHeader";
import dafontUrls from "@/lib/data/dafontUrls.json";
import fonts1001Urls from "@/lib/data/1001fontsUrls.json";

// "Import Fonts" — un solo scraper per entrambe le sorgenti remote (prima
// erano due card gemelle, ScrapeFromDafontCard e ScrapeFrom1001FontsCard,
// identiche a meno di json delle categorie, endpoint e colori). La sorgente si
// sceglie come primo step, poi il flusso è lo stesso: macro categoria → sotto
// categoria → pagina → run → summary.
//
// Il flusso viveva dentro una BaseModal: ora è una "tab" full page della
// dashboard (stesso pattern di AdminStatisticsView) così log e riepilogo hanno
// tutta la viewport a disposizione.
//
// Route NDJSON: app/api/admin/fonts/scrape-dafont-category e
// app/api/admin/fonts/scrape-1001fonts-category.

type CategoryTree = Record<string, Record<string, string>>;
type SourceId = "dafont" | "1001fonts";
type Step = "source" | "category" | "page" | "running" | "done";

const STEP_ORDER: Step[] = ["source", "category", "page", "running", "done"];

const STEP_META: Record<Step, { label: string; hint: string }> = {
  source: { label: "Source", hint: "Where fonts come from" },
  category: { label: "Category", hint: "Macro + sub category" },
  page: { label: "Page", hint: "Which listing page" },
  running: { label: "Import", hint: "Live scraping log" },
  done: { label: "Summary", hint: "What landed in the library" },
};

interface ImportSource {
  id: SourceId;
  label: string;
  host: string;
  origin: string;
  endpoint: string;
  tree: CategoryTree;
  /** Cosa viene letto per ogni font, mostrato prima di partire. */
  description: string;
  /** Nota sul paging del sito, quando è nota. */
  pageNote?: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentBar: string;
}

const SOURCES: Record<SourceId, ImportSource> = {
  dafont: {
    id: "dafont",
    label: "DaFont",
    host: "dafont.com",
    origin: "https://www.dafont.com/",
    endpoint: "/api/admin/fonts/scrape-dafont-category",
    tree: dafontUrls as CategoryTree,
    description:
      "Every font listed on the category page gets downloaded, converted to WOFF2 and imported, with author and license read from the listing.",
    accentText: "text-cyan-600 dark:text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/20",
    accentBar: "from-cyan-400 to-cyan-600",
  },
  "1001fonts": {
    id: "1001fonts",
    label: "1001Fonts",
    host: "1001fonts.com",
    origin: "https://www.1001fonts.com/",
    endpoint: "/api/admin/fonts/scrape-1001fonts-category",
    tree: fonts1001Urls as CategoryTree,
    description:
      "The category page only lists links, so every font detail page is read first (name, author + profile info page, license, zip), then downloaded, converted to WOFF2 and imported.",
    pageNote: "12 fonts per page on 1001fonts.com.",
    accentText: "text-orange-600 dark:text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/20",
    accentBar: "from-orange-400 to-orange-600",
  },
};

interface NdjsonEvent {
  type: "total" | "log" | "progress" | "done";
  total?: number;
  message?: string;
  current?: number;
  imported?: string[];
  skipped?: Array<{ family: string; reason: string }>;
  failed?: Array<{ family: string; error: string }>;
}

// Gli url nei due json arrivano in formati diversi: dafont a volte relativi
// ("bitmap.php"), 1001fonts con un doppio slash ("//serif-fonts.html").
// Entrambi i casi si risolvono contro l'origin della sorgente.
function resolveCategoryUrl(raw: string, origin: string): string {
  try {
    const url = new URL(raw, origin);
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

interface AdminImportFontsViewProps {
  onBack: () => void;
}

export default function AdminImportFontsView({ onBack }: AdminImportFontsViewProps) {
  const [step, setStep] = useState<Step>("source");

  const [sourceId, setSourceId] = useState<SourceId | "">("");
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

  const source = sourceId ? SOURCES[sourceId] : null;
  const tree = source?.tree ?? {};

  const macroOptions = Object.keys(tree).map((k) => ({ label: k, value: k }));
  const subOptions = macro ? Object.keys(tree[macro] || {}).map((k) => ({ label: k, value: k })) : [];

  const resolvedBaseUrl =
    source && macro && sub ? resolveCategoryUrl(tree[macro][sub], source.origin) : null;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const finalUrl = resolvedBaseUrl ? buildPagedUrl(resolvedBaseUrl, pageNum) : null;

  const resetFlow = () => {
    setStep("source");
    setSourceId("");
    setMacro("");
    setSub("");
    setPage("1");
    setProgress(0);
    setTotal(0);
    setLogs([]);
    setResults(null);
    setIsRunning(false);
  };

  const chooseSource = (id: SourceId) => {
    setSourceId(id);
    setMacro("");
    setSub("");
    setStep("category");
  };

  const startScraping = async () => {
    if (!finalUrl || !source) return;
    setStep("running");
    setIsRunning(true);
    setLogs([`Source: ${source.label}`, `Target: ${finalUrl}`, "Connecting to scraper..."]);
    setProgress(0);
    setTotal(0);

    try {
      const res = await fetch(source.endpoint, {
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
            // La tab ha molto più spazio del vecchio modale: teniamo una
            // history di log più lunga.
            setLogs((prev) => [...prev, event.message as string].slice(-400));
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
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setLogs((prev) => [...prev, `✗ ${errorMsg}`]);
      setResults({
        imported: [],
        skipped: [],
        failed: [{ family: finalUrl, error: errorMsg }],
      });
    } finally {
      setIsRunning(false);
      setStep("done");
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification(`${source.label} category scraping complete`, {
          body: "Check the import tab for the full log.",
        });
      }
    }
  };

  const accentText = source?.accentText ?? "text-violet-600 dark:text-violet-400";
  const accentBg = source?.accentBg ?? "bg-violet-500/10";
  const accentBorder = source?.accentBorder ?? "border-violet-500/20";
  const accentBar = source?.accentBar ?? "from-violet-400 to-violet-600";

  const currentStepIndex = STEP_ORDER.indexOf(step);
  const percent = total > 0 ? Math.round((progress / total) * 100) : 0;

  // Uno step precedente è riapribile solo prima del run: da "running"/"done"
  // si riparte con "Import another category".
  const canJumpTo = (target: Step) => {
    if (step === "running" || step === "done") return false;
    return STEP_ORDER.indexOf(target) < currentStepIndex;
  };

  const jumpTo = (target: Step) => {
    if (!canJumpTo(target)) return;
    setStep(target);
  };

  return (
    <div className="w-full space-y-4">
      <AdminViewHeader
        title="Import Fonts"
        onBack={onBack}
        backDisabled={isRunning}
        right={
          <div className="hidden sm:flex items-center gap-2 w-[180px] justify-end">
            {source && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${accentBg} border ${accentBorder} text-[10px] font-bold uppercase tracking-widest ${accentText}`}
              >
                <Globe className="h-3 w-3" />
                {source.host}
              </span>
            )}
          </div>
        }
      />

      {/* Stepper: sostituisce i "next/back" ciechi del modale */}
      <ol className="flex flex-wrap items-center gap-2">
        {STEP_ORDER.map((item, index) => {
          const isCurrent = item === step;
          const isPast = index < currentStepIndex;
          const clickable = canJumpTo(item);
          return (
            <li key={item} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => jumpTo(item)}
                disabled={!clickable}
                className={[
                  "flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors",
                  isCurrent
                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                    : isPast
                      ? "bg-zinc-100 dark:bg-zinc-900 border-black/5 dark:border-white/5 text-black dark:text-white"
                      : "bg-transparent border-dashed border-black/10 dark:border-white/10 text-zinc-400 dark:text-zinc-600",
                  clickable ? "cursor-pointer hover:border-black dark:hover:border-white" : "cursor-default",
                ].join(" ")}
              >
                <span
                  className={`h-5 w-5 shrink-0 rounded-md flex items-center justify-center text-[10px] font-black ${
                    isCurrent
                      ? "bg-white/20 dark:bg-black/20"
                      : isPast
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-black/5 dark:bg-white/5"
                  }`}
                >
                  {isPast ? <Check className="h-3 w-3" /> : index + 1}
                </span>
                <span className="text-left leading-none">
                  <span className="block text-[11px] font-bold uppercase tracking-widest">
                    {STEP_META[item].label}
                  </span>
                  <span className="hidden lg:block text-[9px] uppercase tracking-widest opacity-60 mt-0.5">
                    {STEP_META[item].hint}
                  </span>
                </span>
              </button>
              {index < STEP_ORDER.length - 1 && (
                <span className="hidden sm:block h-px w-4 bg-black/10 dark:bg-white/10" />
              )}
            </li>
          );
        })}
      </ol>

      {/* ---------------------------------------------------------------- */}
      {/* Step: source                                                     */}
      {/* ---------------------------------------------------------------- */}
      {step === "source" && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold max-w-3xl">
            Both sources run the same pipeline (download → WOFF2 → R2 → author + license). Pick where the fonts come
            from.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(Object.values(SOURCES) as ImportSource[]).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => chooseSource(option.id)}
                className="text-left rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/40 p-6 space-y-3 hover:border-black dark:hover:border-white transition-colors group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`h-10 w-10 rounded-xl ${option.accentBg} border ${option.accentBorder} flex items-center justify-center shrink-0`}
                    >
                      <Download className={`h-5 w-5 ${option.accentText}`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-bold text-black dark:text-white">{option.label}</span>
                      <span className="block text-[10px] font-mono text-zinc-500">{option.host}</span>
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{option.description}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                  {Object.keys(option.tree).length} macro categories
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Step: category / page — form a sinistra, recap a destra          */}
      {/* ---------------------------------------------------------------- */}
      {(step === "category" || step === "page") && source && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2 rounded-2xl border border-black/5 dark:border-white/5 bg-zinc-100/40 dark:bg-zinc-900/40 p-6 space-y-5">
            {step === "category" ? (
              <>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  Choose a category from {source.host}. {source.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              </>
            ) : (
              <>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
                  Each run imports a single listing page. {source.pageNote ?? ""}
                </p>
                <div className="max-w-xs">
                  <Input type="number" min={1} label="Page" value={page} onChange={setPage} placeholder="1" />
                </div>
              </>
            )}
          </div>

          {/* Recap laterale */}
          <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-zinc-100/40 dark:bg-zinc-900/40 p-6 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
              Import summary
            </p>
            <dl className="space-y-3">
              <div className="flex items-start gap-2">
                <Globe className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <dt className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Source</dt>
                  <dd className="text-sm font-bold text-black dark:text-white truncate">{source.label}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Layers className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <dt className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Category</dt>
                  <dd className="text-sm font-bold text-black dark:text-white break-words">
                    {macro && sub ? `${macro} / ${sub}` : "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileDigit className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <dt className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Page</dt>
                  <dd className="text-sm font-bold text-black dark:text-white">{step === "page" ? pageNum : "—"}</dd>
                </div>
              </div>
            </dl>

            {finalUrl && step === "page" && (
              <div className={`p-3 rounded-xl ${accentBg} border ${accentBorder}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${accentText} mb-1`}>Will scrape</p>
                <p className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 break-all">{finalUrl}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Step: running — terminale largo + pannello progresso             */}
      {/* ---------------------------------------------------------------- */}
      {step === "running" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2">
            <ImportTerminal
              logs={logs}
              accentText={accentText}
              label={source?.label ?? "Import"}
              heightClass="h-[calc(100vh-26rem)] min-h-[18rem]"
              terminalRef={terminalRef}
            />
          </div>

          <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-zinc-100/40 dark:bg-zinc-900/40 p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Loader2 className={`h-4 w-4 animate-spin ${accentText}`} />
              <p className="text-[10px] font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-200">
                Scraping in progress
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl font-black tabular-nums text-black dark:text-white leading-none">
                  {percent}%
                </span>
                <span className="text-xs font-bold tabular-nums text-zinc-500">
                  {progress} / {total || "?"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${accentBar} transition-all duration-500`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 border-t border-black/5 dark:border-white/5 pt-3">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Category</p>
                <p className="text-sm font-bold text-black dark:text-white break-words">
                  {macro} / {sub}
                </p>
              </div>
              {finalUrl && (
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-1">
                    <Link2 className="h-3 w-3" /> Target
                  </p>
                  <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 break-all">{finalUrl}</p>
                </div>
              )}
            </div>

            <p className="text-[10px] text-zinc-500 leading-relaxed">
              Leave this tab open until the run finishes — navigating away aborts the stream.
            </p>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Step: done — riepilogo custom a tutta larghezza                  */}
      {/* ---------------------------------------------------------------- */}
      {step === "done" && results && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile
              label="Imported"
              value={results.imported.length}
              icon={<CheckCircle2 className="h-4 w-4" />}
              tone="emerald"
            />
            <StatTile
              label="Skipped"
              value={results.skipped.length}
              icon={<SkipForward className="h-4 w-4" />}
              tone="amber"
            />
            <StatTile label="Failed" value={results.failed.length} icon={<XCircle className="h-4 w-4" />} tone="red" />
            <StatTile
              label="Processed"
              value={results.imported.length + results.skipped.length + results.failed.length}
              icon={<Layers className="h-4 w-4" />}
              tone="zinc"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            <ResultList
              title="Imported"
              tone="emerald"
              empty="Nothing new was imported."
              items={results.imported.map((family) => ({ primary: family }))}
            />
            <ResultList
              title="Skipped"
              tone="amber"
              empty="Nothing was skipped."
              items={results.skipped.map((item) => ({ primary: item.family, secondary: item.reason }))}
            />
            <ResultList
              title="Failed"
              tone="red"
              empty="No failures."
              items={results.failed.map((item) => ({ primary: item.family, secondary: item.error }))}
            />
          </div>

          {/* Il terminale resta anche nel riepilogo: è il log completo del run. */}
          <ImportTerminal
            logs={logs}
            accentText={accentText}
            label={source?.label ?? "Import"}
            heightClass="h-64"
            terminalRef={terminalRef}
          />
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Azioni                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end border-t border-black/5 dark:border-white/5 pt-4">
        {step === "category" && (
          <>
            <Button
              variant="secondary"
              size="md"
              roundness="md"
              onClick={() => setStep("source")}
              className="flex items-center justify-center gap-2 font-bold"
            >
              <ArrowLeft className="h-4 w-4" />
              Source
            </Button>
            <Button
              variant="primary"
              size="md"
              roundness="md"
              disabled={!macro || !sub}
              onClick={() => setStep("page")}
              className="flex items-center justify-center gap-2 font-bold"
            >
              Next: Choose Page
              <ArrowRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {step === "page" && (
          <>
            <Button
              variant="secondary"
              size="md"
              roundness="md"
              onClick={() => setStep("category")}
              className="flex items-center justify-center gap-2 font-bold"
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
              className="flex items-center justify-center gap-2 font-bold"
            >
              <Download className="h-4 w-4" />
              Start Scraping
            </Button>
          </>
        )}

        {step === "running" && (
          <Button
            variant="secondary"
            size="md"
            roundness="md"
            disabled
            className="flex items-center justify-center gap-2 font-bold"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Scraping...
          </Button>
        )}

        {step === "done" && (
          <>
            <Button
              variant="secondary"
              size="md"
              roundness="md"
              onClick={resetFlow}
              className="flex items-center justify-center gap-2 font-bold"
            >
              <Download className="h-4 w-4" />
              Import Another Category
            </Button>
            <Button
              variant="primary"
              size="md"
              roundness="md"
              onClick={onBack}
              className="flex items-center justify-center gap-2 font-bold"
            >
              <CheckCircle2 className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pezzi di UI locali                                                          */
/* -------------------------------------------------------------------------- */

function ImportTerminal({
  logs,
  accentText,
  label,
  heightClass,
  terminalRef,
}: {
  logs: string[];
  accentText: string;
  label: string;
  heightClass: string;
  terminalRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">{label} Log</span>
        <span className="ml-auto text-[10px] font-mono text-zinc-600 tabular-nums">{logs.length} lines</span>
      </div>
      <div
        ref={terminalRef}
        className={`p-4 ${heightClass} overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-1.5 font-mono text-[11px]`}
      >
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 leading-relaxed">
            <span className={`${accentText} shrink-0 mt-px`}>{">"}</span>
            <span className="text-zinc-300 whitespace-pre-wrap break-all">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Tone = "emerald" | "amber" | "red" | "zinc";

const TONES: Record<Tone, { text: string; bg: string; border: string }> = {
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900/50",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900/50",
  },
  red: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-900/50",
  },
  zinc: {
    text: "text-zinc-600 dark:text-zinc-300",
    bg: "bg-zinc-100/60 dark:bg-zinc-900/40",
    border: "border-black/5 dark:border-white/5",
  },
};

function StatTile({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: Tone;
}) {
  const t = TONES[tone];
  return (
    <div className={`rounded-2xl ${t.bg} border ${t.border} px-5 py-4`}>
      <div className={`flex items-center gap-2 ${t.text}`}>
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className={`mt-2 text-4xl font-black leading-none tabular-nums ${t.text}`}>{value}</p>
    </div>
  );
}

function ResultList({
  title,
  tone,
  items,
  empty,
}: {
  title: string;
  tone: Tone;
  items: Array<{ primary: string; secondary?: string }>;
  empty: string;
}) {
  const t = TONES[tone];
  return (
    <div className={`rounded-2xl border ${t.border} ${t.bg} overflow-hidden`}>
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${t.border}`}>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${t.text}`}>{title}</span>
        <span className={`text-[10px] font-bold tabular-nums ${t.text} opacity-70`}>{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="px-4 py-6 text-[11px] text-zinc-500 text-center">{empty}</p>
      ) : (
        <ul className="max-h-72 overflow-y-auto divide-y divide-black/5 dark:divide-white/5">
          {items.map((item, index) => (
            <li key={`${item.primary}-${index}`} className="px-4 py-2">
              <p className="text-xs font-bold text-black dark:text-white break-words">{item.primary}</p>
              {item.secondary && (
                <p className="flex items-start gap-1 text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5 break-words">
                  <AlertCircle className="h-3 w-3 shrink-0 mt-px opacity-60" />
                  {item.secondary}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
