"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/common/Card";
import AdminStatisticsView from "./AdminStatisticsView";
import AdminImportFontsView from "./AdminImportFontsView";
import AdminViewHeader from "./AdminViewHeader";
import ImportFontsCard from "./ImportFontsCard";

// Le sezioni pesanti (statistiche, import fonts) non sono modali: la dashboard
// si svuota e la sezione prende tutta la viewport, con "Back to Dashboard" in
// testa.
type DashboardView = "dashboard" | "stats" | "import";

interface AdminDashboardClientProps {
  bulkTasks: React.ReactNode[];
  canImportFonts: boolean;
  quickActionsPanel: React.ReactNode;
  hasQuickActions: boolean;
}

export default function AdminDashboardClient({
  bulkTasks,
  canImportFonts,
  quickActionsPanel,
  hasQuickActions,
}: AdminDashboardClientProps) {
  const [view, setView] = useState<DashboardView>("dashboard");

  const backToDashboard = () => setView("dashboard");

  if (view === "stats") {
    return (
      <div className="w-full space-y-4 animate-in fade-in zoom-in duration-300">
        <AdminViewHeader title="System Statistics" onBack={backToDashboard} />
        <AdminStatisticsView />
      </div>
    );
  }

  if (view === "import") {
    return (
      <div className="w-full animate-in fade-in zoom-in duration-300">
        <AdminImportFontsView onBack={backToDashboard} />
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row h-full gap-8 items-start w-full animate-in fade-in duration-300">
      {/* Auto Bulk Tasks (Left Column) */}
      <div className="flex-1 w-full">
        <h2 className="mb-4 text-3xl md:text-4xl font-crenzo font-black uppercase tracking-widest text-left text-black dark:text-white">
          Auto Bulk Tasks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Get Statistics Card */}
          <Card
            roundness="lg"
            visualHover
            className="cursor-pointer border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 flex items-center justify-center p-6 h-fit"
            onClick={() => setView("stats")}
          >
            <div className="flex items-center gap-4 w-full">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-black dark:text-white truncate">
                  Get Statistics
                </p>
                <p className="font-haas text-[9px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400 truncate mt-0.5">
                  View System Charts & Metrics
                </p>
              </div>
            </div>
          </Card>

          {/* Import Fonts Card */}
          {canImportFonts && <ImportFontsCard onClick={() => setView("import")} />}

          {/* Render remaining bulk task cards */}
          {bulkTasks}
        </div>
      </div>

      {/* Quick Actions (Right Column) */}
      {hasQuickActions && (
        <div className="w-full xl:w-1/4 shrink-0 space-y-4">
          <h2 className="text-2xl font-crenzo font-black uppercase tracking-widest text-left xl:text-center text-black dark:text-white">
            Quick Actions
          </h2>
          {quickActionsPanel}
        </div>
      )}
    </div>
  );
}
