"use client";

import { useState } from "react";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Card } from "@/components/common/Card";
import AdminStatisticsView from "./AdminStatisticsView";

interface AdminDashboardClientProps {
  bulkTasks: React.ReactNode[];
  quickActionsPanel: React.ReactNode;
  hasQuickActions: boolean;
}

export default function AdminDashboardClient({
  bulkTasks,
  quickActionsPanel,
  hasQuickActions,
}: AdminDashboardClientProps) {
  const [showStats, setShowStats] = useState(false);

  if (showStats) {
    return (
      <div className="w-full space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-black/5 dark:border-white/5 pb-2.5">
          <button
            onClick={() => setShowStats(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-bold text-black dark:text-white uppercase tracking-wider transition-colors border border-black/5 dark:border-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <h2 className="text-2xl md:text-3xl font-crenzo font-black uppercase tracking-widest text-center text-black dark:text-white leading-none">
            System Statistics
          </h2>
          <div className="hidden sm:block w-[140px]" /> {/* Spacer to center heading visually */}
        </div>

        <AdminStatisticsView />
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
            onClick={() => setShowStats(true)}
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
