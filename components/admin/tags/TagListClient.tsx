"use client";

import React, { useState, useTransition } from "react";
import { Edit, Tag as TagIcon, AlertTriangle, Plus } from "lucide-react";
import ContentTable from "@/components/common/ContentTable";
import DeleteButton from "@/components/common/DeleteButton";
import { saveTag, deleteTag } from "@/lib/actions/tag";
import { ListHeaderHandlers, ListPagination } from "@/components/common/ListHandlers";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import TabHeading from "@/components/admin/common/TabHeading";
import { useRouter } from "next/navigation";


import SavingOverlay from "@/components/admin/common/SavingOverlay";

interface TagListClientProps {
  tags: any[];
  totalCount: number;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export default function TagListClient({ tags, totalCount, canCreate, canUpdate, canDelete }: TagListClientProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form modal state (for single tag creation/edition)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
    if (selectedIds.length === tags.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tags.map((t) => t.id));
    }
  };

  const handleOpenEdit = (tag: any) => {
    setEditingTag(tag);
    setName(tag.name);
    setDescription(tag.description || "");
    setErrorMessage(null);
    setIsFormModalOpen(true);
  };

  // Le tag non hanno una route /new dedicata: si creano nello stesso modale
  // usato per l'edit, solo senza un editingTag di partenza.
  const handleOpenCreate = () => {
    setEditingTag(null);
    setName("");
    setDescription("");
    setErrorMessage(null);
    setIsFormModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    startTransition(async () => {
      const err = await saveTag(null, formData, editingTag?.id);
      if (err) {
        setErrorMessage(err);
      } else {
        setIsFormModalOpen(false);
        router.refresh();
      }
    });
  };

  const executeBulkDelete = async () => {
    setIsProcessing(true);
    try {
      await Promise.all(selectedIds.map((id) => deleteTag(id)));
      setIsSelectionMode(false);
      setSelectedIds([]);
      setIsDeleteModalOpen(false);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Bulk deletion failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">

      <TabHeading
        title="Tags"
        showButton={false}
        extraButtons={
          canCreate && (
            <Button
              onClick={handleOpenCreate}
              variant="primary"
              size="lg"
              roundness="md"
              className="flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Tag
            </Button>
          )
        }
      />

      <ListHeaderHandlers
        isSelectionMode={isSelectionMode}
        onToggleSelectionMode={handleToggleSelectionMode}
        selectedCount={selectedIds.length}
        buttonLabel="Select Tags"
        canMassAction={canDelete}
        massActions={[
          {
            label: "Delete Selected",
            variant: "primary",
            onClick: () => setIsDeleteModalOpen(true),
          },
        ]}
        sortOptions={[
          { label: "Newest Created", value: "createdAt_desc" },
          { label: "Oldest Created", value: "createdAt_asc" },
          { label: "Name (A-Z)", value: "name_asc" },
          { label: "Name (Z-A)", value: "name_desc" },
        ]}
        searchPlaceholder="Search tags by name or description..."
      />

      <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xs">
        <ContentTable
          data={tags}
          keyExtractor={(tag: any) => tag.id}
          emptyStateText="No tags match your search criteria."
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelectRow={handleToggleSelectRow}
          onToggleSelectAll={handleToggleSelectAll}
          columns={[
            {
              key: "name",
              header: "Tag",
              className: "flex-[2] min-w-0",
              render: (tag: any) => (
                <div className="flex items-center gap-3 py-1">
                  <div>
                    <p className="font-haas text-bold text-2xl font-bold text-black dark:text-white leading-tight">
                      {tag.name}
                    </p>
                    {tag.description && (
                      <p className="text-xs text-ocragray-800 dark:text-zinc-200 mt-0.5 line-clamp-1">
                        {tag.description}
                      </p>
                    )}
                  </div>
                </div>
              ),
            }
          ]}
          rowActions={(tag: any) => (
            <>
              {canUpdate && (
                <button
                  onClick={() => handleOpenEdit(tag)}
                  className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                  title="Edit Tag"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
              {canDelete && (
                <DeleteButton
                  id={tag.id}
                  name={tag.name}
                  entityName="tag"
                  onDelete={deleteTag}
                  confirmDescription="Deleting this tag will remove it from all assigned font pairings."
                />
              )}
            </>
          )}
        />

        <ListPagination
          totalCount={totalCount}
          entityNamePlural="Tags"
        />
      </div>

      {/* Form Modal for Create / Edit Tag */}
      <BaseModal isOpen={isFormModalOpen} onClose={() => !isPending && setIsFormModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <BaseModal.Header onClose={() => !isPending && setIsFormModalOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue/10 dark:bg-red/10">
                <TagIcon className="w-5 h-5 text-black dark:text-white" />
              </div>
              <h2 className="text-2xl text-black dark:text-white">
                {editingTag ? "Edit Tag" : "Create New Tag"}
              </h2>
            </div>
          </BaseModal.Header>
          <BaseModal.Body>
            <div className="space-y-4 py-2">
              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold">
                  {errorMessage}
                </div>
              )}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1">
                  Tag Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Editorial, Sans + Serif, Geometric..."
                  className="w-full px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this tag context..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                />
              </div>
            </div>
          </BaseModal.Body>
          <BaseModal.Footer>
            <div className="flex items-center gap-3 justify-end">
              <Button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                variant="outline"
                size="md"
                roundness="lg"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                roundness="lg"
                disabled={isPending}
                isLoading={isPending}
              >
                {editingTag ? "Save Changes" : "Create Tag"}
              </Button>
            </div>
          </BaseModal.Footer>
        </form>
      </BaseModal>

      {/* Bulk Delete Confirmation Modal */}
      <BaseModal isOpen={isDeleteModalOpen} onClose={() => !isProcessing && setIsDeleteModalOpen(false)}>
        <BaseModal.Header onClose={() => !isProcessing && setIsDeleteModalOpen(false)}>
          <div className="flex items-end gap-4">
            <div className="p-2 rounded-xl bg-red/10">
              <AlertTriangle className="w-6 h-6 text-red" />
            </div>
            <h2 className="text-2xl text-black dark:text-white">Confirm Bulk Deletion</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-xl font-rezland text-center mb-8 font-bold text-black dark:text-white leading-tight">
              Delete {selectedIds.length} selected tag{selectedIds.length !== 1 && "s"}?
            </p>
            <p className="text-sm text-ocragray-800 dark:text-zinc-200 leading-relaxed">
              This will permanently delete the selected tags from the database. All relations with existing font pairings will be removed. This action cannot be undone.
            </p>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
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

      <SavingOverlay message="Saving Tag..." show={isPending} />
    </div>
  );
}
