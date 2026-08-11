import React from "react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// Shared card shell for a settings tab — matches the CollectionForm/RoleForm
// pattern (bg-zinc-100/40 rounded-2xl ...) so settings pages look identical
// to every other admin form despite not being a database-backed form.
export function SettingsSection({ title, subtitle, right, children, className }: SettingsSectionProps) {
  return (
    <div
      className={cn(
        "bg-zinc-100/40 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all",
        className
      )}
    >
      <div className="flex items-end justify-between gap-4 mb-10 border-b border-black/5 dark:border-white/5 pb-6">
        <div className="flex flex-col justify-end">
          <h3 className="text-4xl font-rezland text-black dark:text-white">{title}</h3>
          {subtitle && (
            <p className="text-[10px] ps-2 uppercase tracking-widest font-bold text-bluegray-800 dark:text-redgray-200 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {right}
      </div>
      <div className="space-y-10">{children}</div>
    </div>
  );
}

interface SettingsSubCardProps {
  title: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSubCard({ title, description, right, children, className }: SettingsSubCardProps) {
  return (
    <div
      className={cn(
        "bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-8 transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-black dark:text-white">{title}</h4>
          {description && (
            <p className="text-xs text-ocragray-800 dark:text-zinc-200 mt-1 font-haas leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export default SettingsSection;
