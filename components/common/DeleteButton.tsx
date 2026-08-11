"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import BaseModal from "@/components/common/BaseModal";
import { Button } from "@/components/common/Button";

interface DeleteButtonProps {
  id: string;
  name: string;
  entityName: string;
  onDelete: (id: string) => Promise<void> | void;
  confirmTitle?: string;
  confirmDescription?: string;
  buttonClassName?: string;
}

export default function DeleteButton({
  id,
  name,
  entityName,
  onDelete,
  confirmTitle = "Confirm Deletion",
  confirmDescription,
  buttonClassName = "p-2.5 text-bluegray-800 dark:text-redgray-200 hover:text-red hover:bg-red/10 rounded-md transition-all disabled:opacity-50 shadow-sm",
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
      setShowConfirm(false);
      router.refresh();
    } catch (error: any) {
      alert(error.message || `Failed to delete ${entityName}.`);
    } finally {
      setIsDeleting(false);
    }
  };

  const defaultDescription = `This will permanently delete this ${entityName}. This action cannot be undone.`;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirm(true);
        }}
        disabled={isDeleting}
        className={buttonClassName}
        title={`Delete ${entityName}`}
      >
        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>

      <BaseModal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <BaseModal.Header onClose={() => setShowConfirm(false)}>
          <div className="flex items-end gap-4">
            <div className="p-2 bg-red/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red" />
            </div>
            <h2 className="text-2xl font-rezland text-black dark:text-white">{confirmTitle}</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-xl font-rezland text-center mb-8 font-bold text-black dark:text-white leading-tight">
              Delete {entityName} <span className="text-red">"{name}"</span> ?
            </p>
            <p className="text-sm text-ocragray-800 dark:text-zinc-200 leading-relaxed">
              {confirmDescription || defaultDescription}
            </p>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
            <Button
              onClick={() => setShowConfirm(false)}
              variant="outline"
              size="md"
              roundness="md"
              fullWidth
              className="sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="primary"
              size="md"
              roundness="md"
              fullWidth
              className="flex items-center gap-2"
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              {isDeleting ? "Deleting..." : `Delete ${entityName.charAt(0).toUpperCase() + entityName.slice(1)}`}
            </Button>
          </div>
        </BaseModal.Footer>
      </BaseModal>
    </>
  );
}
