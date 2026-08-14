"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminStatistics } from "@/lib/actions/statistics";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/common/Tabs";
import { Card, CardBody } from "@/components/common/Card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Mail, 
  BadgeCheck, 
  Loader2, 
  AlertCircle, 
  Lock, 
  LineChart, 
  Compass, 
  FileText, 
  Database 
} from "lucide-react";
import Link from "next/link";

interface LicenseStat {
  label: string;
  count: number;
  color: string;
}

export default function AdminStatisticsView() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: () => getAdminStatistics(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-ocragray-800 dark:text-zinc-400">
          Calculating metrics...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
        <AlertCircle className="h-10 w-10" />
        <p className="text-sm font-bold">Failed to load system statistics.</p>
        <p className="text-xs opacity-75">{error?.message || "Unknown error"}</p>
      </div>
    );
  }

  const { licenses, authors } = data;

  // 1. Process Licenses
  const totalFonts = Object.values(licenses).reduce((a, b) => a + b, 0);

  const licenseStats: LicenseStat[] = [
    { label: "Free", count: licenses["Free"] || 0, color: "#10b981" }, // Emerald
    { label: "Open Source (SIL OFL)", count: licenses["Open Source (SIL OFL)"] || 0, color: "#14b8a6" }, // Teal
    { label: "Free for Personal Use", count: licenses["Free for Personal Use"] || 0, color: "#6366f1" }, // Indigo
    { label: "Public Domain", count: licenses["Public Domain"] || 0, color: "#3b82f6" }, // Blue
    { label: "Demo", count: licenses["Demo"] || 0, color: "#f59e0b" }, // Amber
    { label: "Donationware", count: licenses["Donationware"] || 0, color: "#ec4899" }, // Pink
    { label: "Commercial", count: licenses["Commercial"] || 0, color: "#ef4444" }, // Red
    { label: "Not Defined", count: licenses["Not Defined"] || 0, color: "#71717a" }, // Zinc
  ].filter((stat) => stat.count > 0);

  // Calculate offsets for SVG circular segments
  let accumulated = 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.327

  const segments = licenseStats.map((stat) => {
    const percentage = totalFonts > 0 ? stat.count / totalFonts : 0;
    const strokeLength = percentage * circumference;
    const strokeOffset = accumulated;
    accumulated += strokeLength;

    return {
      ...stat,
      percentage,
      strokeLength,
      strokeOffset,
    };
  });

  // 2. Process Authors
  const realEmailPercent = authors.total > 0 ? (authors.realEmail / authors.total) * 100 : 0;
  const verifiedPercent = authors.total > 0 ? (authors.verified / authors.total) * 100 : 0;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="fonts" className="w-full">
        <div className="flex justify-center mb-5">
          <TabsList className="bg-zinc-100/60 dark:bg-zinc-900/60 p-1.5 rounded-xl border border-black/5 dark:border-white/5 flex gap-1">
            <TabsTrigger value="fonts" icon={<Database className="h-4 w-4" />}>
              Fonts License
            </TabsTrigger>
            <TabsTrigger value="authors" icon={<Users className="h-4 w-4" />}>
              Authors
            </TabsTrigger>
            <TabsTrigger value="analytics" icon={<LineChart className="h-4 w-4" />}>
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        {/* FONTS TAB */}
        <TabsContent value="fonts">
          <Card roundness="xl" className="p-6 md:p-8">
            <div className="flex justify-between items-start border-b border-black/5 dark:border-white/5 pb-3 mb-5">
              <div>
                <h3 className="text-lg font-crenzo font-black uppercase tracking-widest text-black dark:text-white leading-none">
                  License Type Distribution
                </h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-400 mt-1">
                  Overview of available fonts grouped by licensing models
                </p>
              </div>
            </div>
            <CardBody className="p-0">
              {totalFonts === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  <Database className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-bold">No fonts found in database.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* SVG Chart & Centered Label (lg:col-span-5) */}
                  <div className="flex flex-col items-center justify-center lg:col-span-5 space-y-4">
                    <div className="relative">
                      <svg viewBox="0 0 120 120" className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 select-none drop-shadow-md">
                        {segments.map((seg, idx) => (
                          <circle
                            key={seg.label}
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth={hoveredIndex === idx ? "16" : "12"}
                            strokeDasharray={`${seg.strokeLength} ${circumference - seg.strokeLength}`}
                            strokeDashoffset={-seg.strokeOffset}
                            transform="rotate(-90 60 60)"
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          />
                        ))}
                        {/* Center hole */}
                        <circle cx="60" cy="60" r={radius - 6} className="fill-white dark:fill-zinc-950 transition-colors" />
                      </svg>

                      {/* Absolute centered count */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={hoveredIndex ?? "total"}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.15 }}
                            className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-red-200 leading-none font-crenzo select-none"
                          >
                            {hoveredIndex !== null ? licenseStats[hoveredIndex].count : totalFonts}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Label below the doughnut chart */}
                    <div className="h-6 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={hoveredIndex ?? "total"}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="text-xs font-black text-black dark:text-white uppercase tracking-widest font-haas select-none text-center"
                        >
                          {hoveredIndex !== null ? licenseStats[hoveredIndex].label : "Total Fonts"}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Legend list in grid format to save space (lg:col-span-7) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {licenseStats.map((stat, idx) => {
                      const percentage = totalFonts > 0 ? (stat.count / totalFonts) * 100 : 0;
                      const isHovered = hoveredIndex === idx;
                      return (
                        <div
                          key={stat.label}
                          onMouseEnter={() => setHoveredIndex(idx)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-transparent transition-all duration-150 ${
                            isHovered
                              ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200/50 dark:border-zinc-700/50 scale-[1.02] shadow-xs"
                              : "opacity-85 hover:opacity-100"
                          }`}
                        >
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: stat.color }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-black dark:text-white truncate font-haas leading-tight">
                              {stat.label}
                            </p>
                          </div>
                          <div className="text-xs font-extrabold text-zinc-600 dark:text-zinc-400 font-haas tabular-nums shrink-0">
                            {stat.count} <span className="opacity-50 ml-0.5">({percentage.toFixed(0)}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </TabsContent>

        {/* AUTHORS TAB */}
        <TabsContent value="authors">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Total Authors Card */}
              <Card roundness="xl" className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 min-h-[140px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-400">
                    Total Authors
                  </p>
                  <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-4xl font-extrabold text-black dark:text-white font-crenzo leading-none">
                    {authors.total}
                  </p>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold mt-1.5 select-none">
                    Registered creators
                  </p>
                </div>
              </Card>

              {/* Real Contacts Card */}
              <Card roundness="xl" className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 min-h-[140px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-400">
                    Real Contacts
                  </p>
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-extrabold text-black dark:text-white font-crenzo leading-none">
                      {authors.realEmail}
                    </p>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      ({realEmailPercent.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${realEmailPercent}%` }}
                    />
                  </div>
                </div>
              </Card>

              {/* Verified Status Card */}
              <Card roundness="xl" className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 min-h-[140px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ocragray-800 dark:text-zinc-400">
                    Verified Status
                  </p>
                  <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <BadgeCheck className="h-4 w-4 text-purple-500" />
                  </div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-extrabold text-black dark:text-white font-crenzo leading-none">
                      {authors.verified}
                    </p>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                      ({verifiedPercent.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${verifiedPercent}%` }}
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Horizontal Verification Breakdown to use available vertical space */}
            <Card roundness="xl" className="p-5 border border-black/5 dark:border-white/5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left space-y-1">
                  <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                    Verification Breakdown
                  </h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    Proportion of verified creators versus unverified profiles
                  </p>
                </div>
                <div className="flex-1 w-full max-w-md space-y-2">
                  <div className="h-2.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex">
                    <div 
                      className="h-full bg-purple-500 transition-all duration-500" 
                      style={{ width: `${verifiedPercent}%` }}
                    />
                    <div 
                      className="h-full bg-zinc-400 dark:bg-zinc-600 flex-1 transition-all duration-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-haas">
                    <span>Verified ({authors.verified})</span>
                    <span>Unverified ({authors.total - authors.verified})</span>
                  </div>
                </div>
              </div>
            </Card>

            <p className="text-[9px] uppercase tracking-widest text-center font-bold text-ocragray-800 dark:text-ocragray-200 mt-2 select-none">
              Verified authors are active designers whose profiles have been confirmed.
            </p>
          </div>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics">
          <Card roundness="xl" className="p-8 border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/10 dark:bg-zinc-900/5 backdrop-blur-sm">
            <CardBody className="flex flex-col items-center justify-center text-center py-8 max-w-xl mx-auto space-y-6">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-inner">
                  <LineChart className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                  <Lock className="h-2.5 w-2.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-md font-crenzo font-black uppercase tracking-widest text-black dark:text-white leading-none">
                  Analytics Offline
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-haas leading-relaxed">
                  Real-time website traffic metrics, page views, and download analytics are currently offline. 
                  Connect your web analytics provider (Google Analytics or Meta Pixel) in Settings to activate this tab.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto pt-2">
                <Link href="/admin/settings" className="w-full sm:w-auto">
                  <button className="w-full px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-[10px] font-bold text-white dark:text-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5">
                    <Compass className="h-4 w-4" />
                    Configure Integrations
                  </button>
                </Link>
                <button 
                  onClick={() => alert("Mock Analytics data will be available in future releases.")} 
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <FileText className="h-4 w-4" />
                  View Mock Data
                </button>
              </div>
            </CardBody>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
