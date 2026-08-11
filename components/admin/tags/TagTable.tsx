"use client";

import React, { useState, useTransition } from "react";
import { Edit, Plus, Tag as TagIcon, AlertTriangle } from "lucide-react";
import ContentTable from "@/components/common/ContentTable";
import DeleteButton from "@/components/common/DeleteButton";
import { saveTag, deleteTag } from "@/lib/actions/tag";
import { ListHeaderHandlers } from "@/components/common/ListHandlers";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

import TabHeading from "@/components/admin/common/TabHeading";

interface TagTableProps {
  tags: any[];
}

export default function TagTable({ tags }: TagTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleOpenCreate = () => {
    setEditingTag(null);
    setName("");
    setDescription("");
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tag: any) => {
    setEditingTag(tag);
    setName(tag.name);
    setDescription(tag.description || "");
    setErrorMessage(null);
    setIsModalOpen(true);
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
        setIsModalOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      <TabHeading
        title="Tag Management"
        subtitle="Organize typography pairings and prescriptions with custom tag labels."
        showButton={false}
        extraButtons={
          <Button
            onClick={handleOpenCreate}
            variant="primary"
            size="lg"
            roundness="md"
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Tag
          </Button>
        }
      />

      <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <ContentTable
          data={tags}
          keyExtractor={(tag: any) => tag.id}
          emptyStateText="No tags created yet."
          columns={[
            {
              key: "name",
              header: "Tag",
              className: "flex-[2] min-w-0",
              render: (tag: any) => (
                <div className="flex items-center gap-3 py-1">
                  <div className="p-2 border border-black/5 dark:border-white/5 rounded-lg bg-bluegray-100 dark:bg-redgray-900 text-black dark:text-white">
                    <TagIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-rezland text-xl font-bold text-black dark:text-white leading-tight">
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
            },
            {
              key: "prescriptions",
              header: "Pairings Count",
              className: "flex-1 hidden sm:block",
              render: (tag: any) => (
                <div className="text-xs font-bold text-black dark:text-white mt-1">
                  {tag._count?.prescriptions ?? tag.prescriptions?.length ?? 0} Pairings
                </div>
              ),
            },
          ]}
          rowActions={(tag: any) => (
            <>
              <button
                onClick={() => handleOpenEdit(tag)}
                className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                title="Edit Tag"
              >
                <Edit className="h-4 w-4" />
              </button>
              <DeleteButton
                id={tag.id}
                name={tag.name}
                entityName="tag"
                onDelete={deleteTag}
                confirmDescription="Deleting this tag will remove it from all assigned font pairings."
              />
            </>
          )}
        />
      </div>

      {/* Modal for Create / Edit Tag */}
      <BaseModal isOpen={isModalOpen} onClose={() => !isPending && setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <BaseModal.Header onClose={() => !isPending && setIsModalOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue/10 dark:bg-red/10">
                <TagIcon className="w-5 h-5 text-black dark:text-white" />
              </div>
              <h2 className="text-2xl font-rezland text-black dark:text-white">
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
                onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}
