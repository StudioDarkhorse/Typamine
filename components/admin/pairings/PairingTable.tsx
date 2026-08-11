"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Check, X, Image as ImageIcon } from "lucide-react";
import ContentTable from "@/components/common/ContentTable";
import DeleteButton from "@/components/common/DeleteButton";
import { deletePairing } from "@/lib/actions/pairing";
import { ListHeaderHandlers } from "@/components/common/ListHandlers";


import TabHeading from "@/components/admin/common/TabHeading";

interface PairingTableProps {
  pairings: any[];
}

export default function PairingTable({ pairings }: PairingTableProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIds([]);
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === pairings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pairings.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      <TabHeading
        title="Typography Pairings"
        subtitle="Create, manage and publish font prescriptions and pairings with custom preview canvas images."
        buttonHref="/admin/pairings/new"
        buttonLabel="Create Pairing"
      />

      <ListHeaderHandlers
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={handleToggleSelectionMode}
        selectedCount={selectedIds.length}
        buttonLabel="Select Pairings"
        searchPlaceholder="Search pairings by name, slug or font..."
      />

      <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <ContentTable
          data={pairings}
          keyExtractor={(p: any) => p.id}
          emptyStateText="No font pairings created yet."
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelectRow={handleToggleSelectRow}
          onToggleSelectAll={handleToggleSelectAll}
          columns={[
            {
              key: "preview",
              header: "Preview",
              className: "w-24 shrink-0",
              render: (p: any) => (
                <div className="w-16 h-12 rounded-lg border border-black/10 dark:border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              ),
            },
            {
              key: "name",
              header: "Pairing / Slug",
              className: "flex-[2] min-w-0",
              render: (p: any) => (
                <div className="min-w-0 py-1">
                  <p className="font-rezland text-xl font-bold text-black dark:text-white leading-tight truncate">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 font-mono tracking-wider mt-0.5 truncate">
                    /{p.slug}
                  </p>
                </div>
              ),
            },
            {
              key: "fonts",
              header: "Paired Fonts",
              className: "flex-[2] hidden md:block",
              render: (p: any) => (
                <div className="text-xs font-bold text-black dark:text-white space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-blue-600 dark:text-red-400">Primary:</span>
                    <span>{p.primaryFont?.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ocragray-800 dark:text-zinc-200">
                    <span className="text-[10px] font-black uppercase">Secondary:</span>
                    <span>{p.secondaryFont?.name || "N/A"}</span>
                  </div>
                </div>
              ),
            },
            {
              key: "tags",
              header: "Tags",
              className: "flex-1 hidden lg:block",
              render: (p: any) => (
                <div className="flex flex-wrap gap-1">
                  {p.tags && p.tags.length ? (
                    <span className="text-xs text-black dark:text-white italic">{p.tags.length} Tags</span>
                  ) : (
                    <span className="text-xs text-zinc-400 italic">No tags</span>
                  )}

                </div>
              ),
            },
            {
              key: "published",
              header: "Status",
              className: "w-28 shrink-0",
              render: (p: any) => (
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px]">
                      <Check className="w-3 h-3" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-500/10 text-zinc-400 text-[10px]">
                      <X className="w-3 h-3" /> Draft
                    </span>
                  )}
                </div>
              ),
            },
          ]}
          rowActions={(p: any) => (
            <>
              <Link
                href={`/admin/pairings/${p.id}`}
                className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                title="Edit Pairing"
              >
                <Edit className="h-4 w-4" />
              </Link>
              <DeleteButton
                id={p.id}
                name={p.name}
                entityName="pairing"
                onDelete={deletePairing}
                confirmDescription="This will permanently delete this pairing and its preview image from storage."
              />
            </>
          )}
        />
      </div>
    </div>
  );
}
