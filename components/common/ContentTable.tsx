"use client";

import React from "react";
import { CheckCircle2, Circle, Square, SquareCheckBig } from "lucide-react";
import Badge from "@/components/common/Badge";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T) => React.ReactNode;
  className?: string; // Tailwind classes for column alignment, visibility, etc.
}

export interface ContentTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T) => string;
  rowActions?: (item: T) => React.ReactNode;
  emptyStateText?: string;

  // Controlled selection states
  isSelectionMode?: boolean;
  selectedIds?: string[];
  onToggleSelectRow?: (id: string) => void;
  onToggleSelectAll?: () => void;
}

export default function ContentTable<T>({
  data,
  columns,
  keyExtractor,
  rowActions,
  emptyStateText = "No items found.",
  isSelectionMode = false,
  selectedIds = [],
  onToggleSelectRow,
  onToggleSelectAll,
}: ContentTableProps<T>) {
  const handleSelectAllToggle = () => {
    if (onToggleSelectAll) {
      onToggleSelectAll();
    }
  };

  const handleSelectRow = (id: string) => {
    if (onToggleSelectRow) {
      onToggleSelectRow(id);
    }
  };

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="w-full">
      {/* Table Columns Row */}
      <div className={cn(
        // Impostiamo un'altezza minima abbondante (76px) per assorbire l'ingombro del Badge
        // mantenendo py-4. items-center centrerà il contenuto in entrambi gli stati.
        "flex justify-between items-center py-4 min-h-[76px] px-8 border-b bg-bluegray-100 dark:bg-redgray-900/50  border-black/5 dark:border-white/5"
      )}>
        {columns.map((column, idx) => (
          <div
            key={column.key}
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest text-bluegray-800 dark:text-redgray-200",
              column.className || "flex-1"
            )}
          >
            {/* Selezioniamo la prima colonna in selection mode */}
            {isSelectionMode && idx === 0 ? (
              <div
                onClick={handleSelectAllToggle}
                className="cursor-pointer animate-in fade-in duration-200 w-fit"
              >
                {isAllSelected ? (
                  <div className="flex items-center gap-2 p-1 rounded-sm">
                    <Badge icon={<SquareCheckBig />} variant="monochrome">{selectedIds.length} Selected</Badge>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-1 rounded-sm">
                    {/* Corretto l'icona qui in Square */}
                    <Badge icon={<Square />} variant="monochrome">Select All</Badge>
                  </div>
                )}
              </div>
            ) : (
              // Mostra normalmente la label per tutte le altre colonne o se non siamo in selection mode
              column.header
            )}
          </div>
        ))}

        {/* Actions */}
        {rowActions && (
          <div className=" text-[10px] font-bold uppercase tracking-widest text-bluegray-800 dark:text-redgray-200 text-right">
            Actions
          </div>
        )}
      </div>

      {/* Table Body */}
      <div className="divide-y divide-black/5 dark:divide-white/5">
        {data.map((item) => {
          const itemId = keyExtractor(item);
          const isSelected = selectedIds.includes(itemId);

          return (
            <div
              key={itemId}
              onClick={() => isSelectionMode && handleSelectRow(itemId)}
              className={cn(
                "flex justify-between items-center px-8 py-6 transition-all duration-300 group",
                isSelectionMode
                  ? "cursor-pointer hover:bg-zinc-900/5 dark:hover:bg-white/5"
                  : "hover:bg-zinc-900/5 dark:hover:bg-white/5",
                isSelected && "bg-blue/5 dark:bg-red/10"
              )}
            >
              {/* Data Cells */}
              {columns.map((column, idx) => (
                <div
                  key={column.key}
                  className={cn(
                    "min-w-0 flex items-center text-black dark:text-white",
                    column.className || "flex-1"
                  )}
                >
                  {/* Il Checkbox viene renderizzato DENTRO la prima colonna */}
                  {isSelectionMode && idx === 0 && (
                    <div className="mr-4 shrink-0 text-zinc-500/40 dark:text-zinc-400/40">
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-blue dark:text-red fill-blue/10 dark:fill-red/20 animate-in zoom-in duration-200" />
                      ) : (
                        <Circle className="w-6 h-6 animate-in zoom-in fade-in duration-200" />
                      )}
                    </div>
                  )}

                  <div className="truncate w-full min-w-0">
                    {column.render
                      ? column.render(item)
                      : (item as any)[column.key] !== undefined
                        ? String((item as any)[column.key])
                        : null}
                  </div>
                </div>
              ))}

              {/* Row Actions */}
              {rowActions && (
                <div className="flex items-center justify-end gap-3">
                  <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-x-4 lg:group-hover:translate-x-0">
                    {rowActions(item)}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-ocragray-800 dark:text-zinc-200 text-sm font-bold uppercase tracking-wider">
              {emptyStateText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}