"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Edit, ShieldCheck, AlertTriangle, User as UserIcon, Mail } from "lucide-react";
import ContentTable from "@/components/common/ContentTable";
import DeleteButton from "@/components/common/DeleteButton";
import { deleteFontAuthor } from "@/lib/actions/fontAuthor";
import { ListHeaderHandlers, ListPagination } from "@/components/common/ListHandlers";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";
import SendAuthorEmailModal from "@/components/admin/fontAuthors/SendAuthorEmailModal";
import { useRouter } from "next/navigation";

interface FontAuthorListClientProps {
  authors: any[];
  totalCount: number;
  canUpdate: boolean;
  canDelete: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-500/10 text-green-500",
  INACTIVE: "bg-zinc-500/10 text-zinc-400",
  SUSPENDED: "bg-red-500/10 text-red-500",
};

export default function FontAuthorListClient({ authors, totalCount, canUpdate, canDelete }: FontAuthorListClientProps) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // Un solo modale per l'intera tabella, pilotato dall'autore selezionato:
  // montarne uno per riga significherebbe decine di modali (e delle loro
  // fetch di template) istanziati per nulla.
  const [emailAuthor, setEmailAuthor] = useState<{ id: string; name: string; email?: string | null } | null>(null);
  const router = useRouter();

  const handleToggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIds([]);
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === authors.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(authors.map((a) => a.id));
    }
  };

  const executeBulkDelete = async () => {
    setIsProcessing(true);
    try {
      await Promise.all(selectedIds.map((id) => deleteFontAuthor(id)));
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
        buttonLabel="Select Font Authors"
        canMassAction={canDelete}
        massActions={
          canDelete
            ? [{ label: "Delete Selected", variant: "primary" as const, onClick: () => setIsModalOpen(true) }]
            : []
        }
        sortOptions={[
          { label: "Name (A-Z)", value: "name_asc" },
          { label: "Name (Z-A)", value: "name_desc" },
          { label: "Newest Created", value: "createdAt_desc" },
          { label: "Oldest Created", value: "createdAt_asc" },
          { label: "Top Contributors", value: "fontCount_desc" },
          { label: "Least Contributors", value: "fontCount_asc" },
        ]}
        searchPlaceholder="Search font authors..."
      />

      <div className="border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xs">
        <ContentTable
          data={authors}
          keyExtractor={(a: any) => a.id}
          emptyStateText="No font authors match your search criteria."
          isSelectionMode={isSelectionMode}
          selectedIds={selectedIds}
          onToggleSelectRow={handleToggleSelectRow}
          onToggleSelectAll={handleToggleSelectAll}
          columns={[
            {
              key: "avatar",
              header: "Avatar",
              className: "w-1/12 shrink-0",
              render: (a: any) => (
                <div className="w-12 h-12 border border-black/10 dark:border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  {a.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.avatarUrl} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              ),
            },
            {
              key: "name",
              header: "Name / Slug",
              className: "w-1/4 min-w-0",
              render: (a: any) => (
                <div className="min-w-0 py-1 flex items-center gap-2">
                  <div>
                    <p className="font-haas font-bold text-xl text-black dark:text-white leading-tight truncate flex items-center gap-1.5">
                      {a.name}
                      {a.isVerified && <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />}
                    </p>
                    <p className="text-[10px] text-blue-400 dark:text-red-400 font-bold uppercase tracking-widest mt-1 truncate">
                      /{a.slug}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: "fontCount",
              header: "Fonts",
              align: "center",
              className: "w-1/12 shrink-0 hidden sm:flex",
              render: (a: any) => (
                <span className="text-sm  text-black dark:text-white">{a._count?.fonts ?? 0}</span>
              ),
            },
            {
              key: "email",
              header: "Email",
              align: "center",
              className: "w-1/4 hidden lg:flex",
              render: (a: any) => <span className="text-xs text-ocragray-800 dark:text-zinc-200 truncate">{a.email}</span>,
            },
            {
              key: "status",
              header: "Status",
              align: "right",
              className: "w-1/6 shrink-0",
              render: (a: any) => (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[a.status] || STATUS_STYLES.ACTIVE
                    }`}
                >
                  {a.status}
                </span>
              ),
            },
          ]}
          rowActions={(a: any) => (
            <>
              {canUpdate && (
                <button
                  type="button"
                  onClick={() => setEmailAuthor({ id: a.id, name: a.name, email: a.email })}
                  className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                  title="Send Email"
                >
                  <Mail className="h-4 w-4" />
                </button>
              )}
              {canUpdate && (
                <Link
                  href={`/admin/font-authors/${a.id}`}
                  className="p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-md transition-all shadow-sm backdrop-blur-md"
                  title="Edit Font Author"
                >
                  <Edit className="h-4 w-4" />
                </Link>
              )}
              {canDelete && (
                <DeleteButton
                  id={a.id}
                  name={a.name}
                  entityName="font author"
                  onDelete={deleteFontAuthor}
                  confirmDescription="This will permanently delete this font author and their avatar/banner from storage."
                />
              )}
            </>
          )}
        />

        <ListPagination totalCount={totalCount} entityNamePlural="Font Authors" />
      </div>

      {emailAuthor && (
        <SendAuthorEmailModal author={emailAuthor} isOpen={!!emailAuthor} onClose={() => setEmailAuthor(null)} />
      )}

      <BaseModal isOpen={isModalOpen} onClose={() => !isProcessing && setIsModalOpen(false)}>
        <BaseModal.Header onClose={() => !isProcessing && setIsModalOpen(false)}>
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
              Delete {selectedIds.length} selected font author{selectedIds.length !== 1 && "s"}?
            </p>
            <p className="text-sm text-ocragray-800 dark:text-zinc-200 leading-relaxed">
              This will permanently delete the selected font authors from the database and any avatar/banner images from storage. This action cannot be undone.
            </p>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" size="md" roundness="lg" fullWidth className="sm:w-auto" disabled={isProcessing}>
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
