"use client";

import { useActionState } from "react";
import { saveRole } from "@/lib/actions/role";
import { Shield, CheckCircle2, Circle, Fingerprint, Lock } from "lucide-react";
import FormActions from "@/components/admin/common/FormActions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import { useState, useEffect } from "react";
import BaseModal from "../../common/BaseModal";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/common/Input";
import SavingOverlay from "@/components/admin/common/SavingOverlay";

export default function RoleForm({ role, allPermissions }: { role?: any, allPermissions: any[] }) {
  const saveAction = (prevState: any, formData: FormData) => saveRole(prevState, formData, role?.id);
  const [errorMessage, dispatch] = useActionState(saveAction, undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowErrorModal(true);
    }
  }, [errorMessage]);

  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(
    new Set(role?.permissions?.map((p: any) => p.id) || [])
  );

  const togglePermission = (id: string) => {
    setSelectedPermissionIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Group permissions by resource
  const groupedPermissions: Record<string, any[]> = {};
  allPermissions.forEach(p => {
    const [resource] = p.name.split(':');
    if (!groupedPermissions[resource]) groupedPermissions[resource] = [];
    groupedPermissions[resource].push(p);
  });

  const resourceLabels: Record<string, string> = {
    blog: "Content (Blog)",
    category: "Taxonomy (Categories)",
    therapist: "Team (Therapists)",
    session: "Operations (Sessions)",
    package: "Offers (Packages)",
    user: "Users",
    role: "Governance (Roles)",
    faq: "FAQs & Knowledge",
    font: "Fonts",
    tag: "Tags",
    pairing: "Pairings",
    collection: "Collections",
    fontAuthor: "Font Authors",
  };

  const rolePermissionIds = new Set(role?.permissions?.map((p: any) => p.id) || []);

  return (
    <form action={dispatch} className="max-w-6xl ml-auto space-y-8 pb-20 transition-colors duration-300">
      <FormActions
        backLink="/admin/roles"
        backLabel="Back to roles list"
        buttonLabel={role ? "Update Role" : "Create Role"}
      />

      <div className="bg-zinc-100/60 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all hover:shadow-zinc-900/5">
        <div className="flex flex-col justify-end mb-10 border-b border-black/5 dark:border-white/5 pb-6">
          <h3 className="text-4xl font-rezland text-black dark:text-white">Role Configuration</h3>
          <p className="text-[10px] ps-2 uppercase tracking-widest font-bold text-bluegray-800 dark:text-redgray-200 mt-1">Define functional access levels and granular permissions</p>
        </div>

        <div className="space-y-12">
          <Input
            id="name"
            name="name"
            label="Role Identity (Label)"
            defaultValue={role?.name?.replace(/_/g, " ")}
            required
            placeholder="e.g. Content Editor, Store Manager..."
            leftIcon={<Fingerprint className="h-5 w-5" />}
            autoComplete="off"
          />

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-bluegray-800 dark:text-redgray-200">Granular Permissions Matrix</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                <Lock className="h-3 w-3 text-bluegray-800 dark:text-redgray-200" />
                <span className="text-[8px] font-black uppercase tracking-tighter text-bluegray-800 dark:text-redgray-200">Secure RBAC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Object.entries(groupedPermissions).map(([resource, perms]) => (
                <div key={resource} className="bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-6 transition-all hover:bg-white/60 dark:hover:bg-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                      {resourceLabels[resource] || resource.toUpperCase()}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {perms.map(p => {
                      const action = p.name.split(':')[1];
                      const isChecked = selectedPermissionIds.has(p.id);
                      return (
                        <div key={p.id} className="relative">
                          {isChecked && <input type="hidden" name="permissions" value={p.id} />}
                          <Button
                            type="button"
                            variant={isChecked ? "primary" : "outline"}
                            size="sm"
                            roundness="md"
                            onClick={() => togglePermission(p.id)}
                            className="font-black uppercase tracking-tighter text-[10px] min-w-[100px] flex items-center gap-2"
                          >
                            {isChecked ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5 opacity-40" />}
                            {action}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BaseModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} size="md">
        <BaseModal.Header onClose={() => setShowErrorModal(false)}>
          <div className="flex items-end gap-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl text-black dark:text-white">Role Update Failed</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-ocragray-800 dark:text-zinc-200 font-haas">
              We encountered an error while trying to save the role configuration:
            </p>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-bold text-sm">
              {errorMessage}
            </div>
          </div>
        </BaseModal.Body>
        <BaseModal.Footer>
          <button
            type="button"
            onClick={() => setShowErrorModal(false)}
            className="w-full py-4 bg-red-500 text-white rounded-xl font-black uppercase tracking-tighter hover:bg-red-600 transition-all shadow-lg"
          >
            Review Settings
          </button>
        </BaseModal.Footer>
      </BaseModal>
      <SavingOverlay message="Updating role..." />
    </form>
  );
}
