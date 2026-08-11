"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Layers, Tag, X, Check, AlertTriangle } from "lucide-react";
import ContentTable from "@/components/common/ContentTable";
import DeleteButton from "@/components/common/DeleteButton";
import { deleteFont } from "@/lib/actions/font";
import { GetSymbol } from "@/components/font/IngredientCard";
import { ListHeaderHandlers, ListPagination } from "@/components/common/ListHandlers";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface FontListClientProps {
  fonts: any[];
  totalCount: number;
  canUpdate: boolean;
  canDelete: boolean;
}

export default function FontListClient({ fonts, totalCount, canUpdate, canDelete }: FontListClientProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

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
    if (selectedIds.length === fonts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(fonts.map((font) => font.id));
    }
  };

  const executeBulkDelete = async () => {
    setIsProcessing(true);
    try {
      await Promise.all(selectedIds.map(id => deleteFont(id)));

      setIsSelectionMode(false);
      setSelectedIds([]);
      setIsModalOpen(false);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Bulk deletion failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <ListHeaderHandlers
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={handleToggleSelectionMode}
        selectedCount={selectedIds.length}
        buttonLabel="Select Fonts"
        canMassAction={canDelete}
        massActions={[
          {
            label: "Delete Selected",
            variant: "primary",
            onClick: () => setIsModalOpen(true),
          },
        ]}
        sortOptions={[
          { label: "Newest Created", value: "createdAt_desc" },
          { label: "Oldest Created", value: "createdAt_asc" },
          { label: "Name (A-Z)", value: "name_asc" },
          { label: "Name (Z-A)", value: "name_desc" },
          { label: "Most Variants", value: "variants_desc" },
          { label: "Fewer Variants", value: "variants_asc" },
        ]}
        searchPlaceholder="Search fonts by name, category, formula or creator..."
      />

      <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xs">
        <ContentTable
          data={fonts}
          keyExtractor={(font: any) => font.id}
          emptyStateText="No typographic elements matching your search criteria."
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelectRow={handleToggleSelectRow}
          onToggleSelectAll={handleToggleSelectAll}
          columns={[
            {
              key: "name",
              header: "Font",
              className: "w-1/2 min-w-0",
              render: (font: any) => (
                <div className="flex items-center gap-4 min-w-0 py-1">
                  <div className="w-12 h-12 border border-blue-800 dark:border-red-200 rounded bg-bluegray-100 dark:bg-redgray-900 flex items-center justify-center font-haas font-bold text-lg text-blue-600 dark:text-red-400 transition-all shrink-0">
                    {font.symbol || GetSymbol({ fontName: font.name })}
                  </div>
                  <div className="min-w-0">
                    <p className="font-rezland text-2xl text-black dark:text-white leading-tight truncate">
                      {font.name}
                    </p>
                    <p className="text-[10px] text-blue-400 dark:text-red-400 font-bold uppercase tracking-widest mt-1 truncate">
                      {font.category}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: "isVariable",
              header: "Is Variable",
              className: "w-1/8 hidden sm:block",
              render: (font: any) => (
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-1 truncate">

                  {font.isVariable ? (
                    <div className="flex gap-2 items-center text-green-500">

                      <Check className="h-3.5 w-3.5 shrink-0" />
                      <span>Yes</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center text-red-500">

                      <X className="h-3.5 w-3.5  shrink-0" />
                      <span>No</span>
                    </div>

                  )}
                </div>
              ),
            },
            {
              key: "variants",
              header: "Variants",
              className: "w-1/8 hidden md:block",
              render: (font: any) => (
                <div className={`px-3 py-1.5 rounded-md flex items-center gap-2 border shadow-sm text-xs max-w-fit mt-1 ${font?.variants?.length
                  ? "bg-white text-blue-800 dark:bg-redgray-800 dark:text-red-200 border-blue-800 dark:border-red-200"
                  : "bg-zinc-400 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-900 text-zinc-900 dark:text-zinc-400"
                  }`}
                >                  <Layers className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    {font.variants?.length || 0} Variants
                  </span>
                </div>
              ),
            },
            {
              key: "tags",
              header: "Tags",
              className: "w-1/8 hidden lg:block",
              render: (font: any) => (
                <div
                  className={`px-3 py-1.5 rounded-md flex items-center gap-2 border shadow-sm text-xs max-w-fit mt-1 ${font.tags?.length
                    ? "bg-white text-blue-800 dark:bg-redgray-800 dark:text-red-200 border-blue-800 dark:border-red-200"
                    : "bg-zinc-400 dark:bg-zinc-900 border-zinc-900 dark:border-zinc-900 text-zinc-900 dark:text-zinc-400"
                    }`}
                >
                  <Tag className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    {font.tags?.length || 0} {font.tags?.length === 1 ? "Tag" : "Tags"}
                  </span>
                </div>
              ),
            },
          ]}
          rowActions={(font: any) => (
            <>
              {canUpdate && (
                <Link
                  href={`/admin/fonts/${font.id}/edit`}
                  className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                >
                  <Edit className="h-4 w-4" />
                </Link>
              )}
              {canDelete && (
                <DeleteButton
                  id={font.id}
                  name={font.name}
                  entityName="font"
                  onDelete={deleteFont}
                  confirmDescription="This will permanently delete this font and all of its associated weight assets from the database and storage."
                />
              )}
            </>
          )}
        />

        <ListPagination
          totalCount={totalCount}
          entityNamePlural="Fonts"
        />
      </div>

      {/* Bulk Delete Confirmation Modal */}
      <BaseModal isOpen={isModalOpen} onClose={() => !isProcessing && setIsModalOpen(false)}>
        <BaseModal.Header onClose={() => !isProcessing && setIsModalOpen(false)}>
          <div className="flex items-end gap-4">
            <div className="p-2 rounded-xl bg-red/10">
              <AlertTriangle className="w-6 h-6 text-red" />
            </div>
            <h2 className="text-2xl font-rezland text-black dark:text-white">Confirm Bulk Deletion</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-xl font-rezland text-center mb-8 font-bold text-black dark:text-white leading-tight">
              Delete {selectedIds.length} selected font{selectedIds.length !== 1 && "s"}?
            </p>
            <p className="text-sm text-ocragray-800 dark:text-zinc-200 leading-relaxed">
              This will permanently delete the selected fonts and all of their associated weight assets from the database and storage. This action cannot be undone.
            </p>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              size="md"
              roundness="lg"
              fullWidth
              className="sm:w-auto"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={executeBulkDelete}
              variant="primary"
              size="md"
              roundness="lg"
              fullWidth
              className="sm:w-auto flex items-center gap-2"
              disabled={isProcessing}
              isLoading={isProcessing}
            >
              Confirm Bulk Delete
            </Button>
          </div>
        </BaseModal.Footer>
      </BaseModal>
    </div>
  );
}
