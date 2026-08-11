"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, Check, X, AlertTriangle, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import ContentTable from "@/components/common/ContentTable";
import DeleteButton from "@/components/common/DeleteButton";
import { deletePost, publishPost, unpublishPost } from "@/lib/actions/post";
import { PostType } from "@/types";
import { ListHeaderHandlers, ListPagination } from "@/components/common/ListHandlers";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface PostListClientProps {
  postType: PostType;
  posts: any[];
  totalCount: number;
  canUpdate: boolean;
  canDelete: boolean;
}

export default function PostListClient({ postType, posts, totalCount, canUpdate, canDelete }: PostListClientProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const routeBase = postType === "BLOG" ? "blog" : "archive";
  const entityLabel = postType === "BLOG" ? "blog post" : "archive post";

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
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const executeBulkDelete = async () => {
    setIsProcessing(true);
    try {
      await Promise.all(selectedIds.map((id) => deletePost(id)));
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

  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleTogglePublished = async (p: any) => {
    setTogglingId(p.id);
    try {
      await (p.published ? unpublishPost(p.id) : publishPost(p.id));
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  // Publish/unpublish sono reversibili — nessuna modale di conferma, a
  // differenza della delete.
  const executeBulkPublish = async (published: boolean) => {
    setIsProcessing(true);
    try {
      await Promise.all(selectedIds.map((id) => (published ? publishPost(id) : unpublishPost(id))));
      setIsSelectionMode(false);
      setSelectedIds([]);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Bulk update failed");
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
        buttonLabel="Select Posts"
        canMassAction={canDelete || canUpdate}
        massActions={[
          ...(canUpdate ? [
            { label: "Publish Selected", variant: "secondary" as const, onClick: () => executeBulkPublish(true) },
            { label: "Unpublish Selected", variant: "outline" as const, onClick: () => executeBulkPublish(false) },
          ] : []),
          ...(canDelete ? [
            { label: "Delete Selected", variant: "primary" as const, onClick: () => setIsModalOpen(true) },
          ] : []),
        ]}
        sortOptions={[
          { label: "Newest Created", value: "createdAt_desc" },
          { label: "Oldest Created", value: "createdAt_asc" },
          { label: "Title (A-Z)", value: "name_asc" },
          { label: "Title (Z-A)", value: "name_desc" },
        ]}
        searchPlaceholder="Search posts by title, caption or description..."
      />

      <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xs">
        <ContentTable
          data={posts}
          keyExtractor={(p: any) => p.id}
          emptyStateText={`No ${entityLabel}s match your search criteria.`}
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelectRow={handleToggleSelectRow}
          onToggleSelectAll={handleToggleSelectAll}
          columns={[
            {
              key: "preview",
              header: "Preview",
              className: "w-1/8 shrink-0",
              render: (p: any) => (
                <div className="w-16 h-12 rounded-lg border border-black/10 dark:border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative">
                  {p.thumbnailUrl || p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.thumbnailUrl || p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              ),
            },
            {
              key: "title",
              header: "Title / Slug",
              className: "w-1/4 min-w-0",
              render: (p: any) => (
                <div className="min-w-0 w-full py-1">
                  <p className="font-rezland text-2xl font-bold text-black dark:text-white leading-tight truncate" title={p.title}>
                    {p.title}
                  </p>
                  <p className="text-[10px] text-blue-400 dark:text-red-400 font-bold uppercase tracking-widest mt-1 truncate">

                    /{p.slug}
                  </p>
                </div>
              ),
            },
            {
              key: "author",
              header: "Author",
              className: "w-1/8 min-w-0 hidden md:block",
              render: (p: any) => (
                <span className="block text-xs font-bold text-black dark:text-white truncate">
                  {p.author?.name ? `${p.author.name} ${p.author.surname || ""}`.trim() : "Unknown"}
                </span>
              ),
            },
            {
              key: "published",
              header: "Status",
              className: "w-1/8 shrink-0",
              render: (p: any) => (
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px]">
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
              {canUpdate && (
                <button
                  type="button"
                  onClick={() => handleTogglePublished(p)}
                  disabled={togglingId === p.id}
                  className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md disabled:opacity-50"
                  title={p.published ? "Unpublish" : "Publish"}
                >
                  {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
              {canUpdate && (
                <Link
                  href={`/admin/${routeBase}/${p.id}`}
                  className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                  title="Edit Post"
                >
                  <Edit className="h-4 w-4" />
                </Link>
              )}
              {canDelete && (
                <DeleteButton
                  id={p.id}
                  name={p.title}
                  entityName={entityLabel}
                  onDelete={deletePost}
                  confirmDescription="This will permanently delete this post and its thumbnail/hero image from storage."
                />
              )}
            </>
          )}
        />

        <ListPagination
          totalCount={totalCount}
          entityNamePlural="Posts"
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
              Delete {selectedIds.length} selected post{selectedIds.length !== 1 && "s"}?
            </p>
            <p className="text-sm text-ocragray-800 dark:text-zinc-200 leading-relaxed">
              This will permanently delete the selected posts from the database and any thumbnail/hero images from storage. This action cannot be undone.
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
