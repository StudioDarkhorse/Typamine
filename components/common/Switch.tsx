"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

// Generic boolean toggle — the codebase had no reusable Switch primitive yet,
// only one-off theme toggles. Styled to match the Button/Input token system
// (blue in light mode, red in dark mode) so it drops into any admin form.
export function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  name,
  id,
  className,
}: SwitchProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      {(label || description) && (
        <label
          htmlFor={id}
          className={cn("flex flex-col gap-0.5 min-w-0", !disabled && "cursor-pointer")}
        >
          {label && (
            <span className="text-sm font-bold text-black dark:text-white">{label}</span>
          )}
          {description && (
            <span className="text-xs text-ocragray-800 dark:text-zinc-200 font-haas leading-relaxed">
              {description}
            </span>
          )}
        </label>
      )}

      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative shrink-0 inline-flex h-6 w-11 items-center rounded-full border transition-colors duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-black",
          "disabled:opacity-50 disabled:pointer-events-none",
          checked
            ? "bg-blue-500 border-bluegray-800 dark:bg-red-500 dark:border-redgray-400 focus-visible:ring-blue-500 dark:focus-visible:ring-red-500"
            : "bg-bluegray-100 dark:bg-bluegray-900/50 border-bluegray-200 dark:border-redgray-800 focus-visible:ring-stone-400"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>

      {name && <input type="hidden" name={name} value={checked ? "true" : "false"} />}
    </div>
  );
}

export default Switch;
