"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { saveUser } from "@/lib/actions/user";
import { Mail, Lock, Shield, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import imageCompression from 'browser-image-compression';
import FormActions from "@/components/admin/common/FormActions";
import { Select } from "@/components/common/Select";
import BaseModal from "../../common/BaseModal";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/common/Input";
import SavingOverlay from "@/components/admin/common/SavingOverlay";
import ImageDropInput from "@/components/admin/common/ImageDropInput";

export default function UserForm({ user, roles }: { user?: any, roles: any[] }) {
  const saveAction = (prevState: any, formData: FormData) => saveUser(prevState, formData, user?.id);
  const [errorMessage, dispatch] = useActionState(saveAction, undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowErrorModal(true);
    }
  }, [errorMessage]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [selectedRoleId, setSelectedRoleId] = useState(user?.roles?.[0]?.id || "");

  return (
    <form action={dispatch} className="max-w-6xl ml-auto space-y-8 pb-20 transition-colors duration-300">
      <FormActions
        backLink="/admin/users"
        backLabel="Back to users list"
        buttonLabel={user ? "Update Account" : "Create User"}
      />

      <div className="bg-zinc-100/40 dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all hover:shadow-zinc-900/5">
        <div className="flex flex-col justify-end mb-10 border-b border-black/5 dark:border-white/5 pb-6">

          <h3 className="text-4xl font-crenzo text-black/80 dark:text-white/80">User Identity</h3>
          <p className="text-[10px] ps-2 uppercase tracking-widest font-bold text-bluegray-800 dark:text-redgray-200 mt-1">Configure administrator access and profile details</p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Input
                id="name"
                name="name"
                label="First Name"
                defaultValue={user?.name}
                placeholder="e.g. Robert"
                autoComplete="off"
              />
              <Input
                id="surname"
                name="surname"
                label="Last Name"
                defaultValue={user?.surname}
                placeholder="e.g. Fox"
                autoComplete="off"
              />
            </div>

            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              defaultValue={user?.email}
              required
              placeholder="admin@angkorfloat.com"
              leftIcon={<Mail className="h-5 w-5" />}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label={user ? "Password (Leave blank to keep)" : "Password"}
                value={password}
                onChange={setPassword}
                required={!user}
                minLength={6}
                placeholder="••••••••"
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                autoComplete="new-password"
              />
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                label="Confirm Password"
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                required={!user || password.length > 0}
                placeholder="••••••••"
                leftIcon={<Lock className={cn("h-5 w-5", password && password === passwordConfirm ? "text-emerald-500" : "text-ocragray-800 dark:text-zinc-200")} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="text-ocragray-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                className={password && password !== passwordConfirm ? "border-red-500/50 ring-red-500/20" : ""}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="text-[10px] text-bluegray-800 dark:text-redgray-200 uppercase tracking-wider block mb-1">Access Role</label>
              <div className="relative">
                <Select
                  options={roles.map(role => ({ value: role.id, label: role.name.replace(/_/g, " ") }))}
                  value={selectedRoleId}
                  onChange={setSelectedRoleId}
                  placeholder="Select a role"
                />
                <input type="hidden" name="roleId" value={selectedRoleId} />
              </div>
            </div>

            <div className="">
              <label className="text-[10px] font-jakarta text-bluegray-800 dark:text-redgray-200 uppercase tracking-wider block mb-1">Biography</label>
              <textarea
                id="biography"
                name="biography"
                defaultValue={user?.biography}
                placeholder="Write a short biography about the author..."
                rows={5}
                className="w-full bg-zinc-900/40 dark:bg-zinc-900/60 border border-bluegray-300 dark:border-redgray-700 focus:border-blue dark:focus:border-red rounded-lg px-3 py-2 text-foreground outline-none transition-colors resize-none min-h-[120px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-[10px] font-bold text-center uppercase tracking-widest text-bluegray-800 dark:text-redgray-200 mb-4">Avatar Photo</h3>
              <div className="flex flex-col items-center gap-4">
                <ImageDropInput
                  name="image"
                  inputRef={fileInputRef}
                  previewUrl={imagePreview}
                  currentUrl={removeImage ? null : (user?.imageUrl || user?.image || null)}
                  isCompressing={isCompressing}
                  onSelect={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setIsCompressing(true);
                      setRemoveImage(false);
                      const options = { maxSizeMB: 0.5, maxWidthOrHeight: 512, useWebWorker: true };
                      const compressedFile = await imageCompression(file, options);
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(new File([compressedFile], file.name, { type: file.type }));
                      if (fileInputRef.current) fileInputRef.current.files = dataTransfer.files;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                        setIsCompressing(false);
                      };
                      reader.readAsDataURL(compressedFile);
                    } catch (error) {
                      console.error("Compression failed:", error);
                      setIsCompressing(false);
                    }
                  }}
                  onRemove={() => {
                    setImagePreview(null);
                    setRemoveImage(true);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  containerClassName="h-52 w-52 rounded-xl"
                  label="Upload Avatar"
                />
                <input type="hidden" name="removeImage" value={String(removeImage)} />
                <p className="text-[10px] text-ocragray-800 dark:text-zinc-200 uppercase tracking-tighter font-bold">Square profile image.</p>
              </div>
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
            <h2 className="text-2xl text-black dark:text-white">User Profile Update Failed</h2>
          </div>
        </BaseModal.Header>
        <BaseModal.Body>
          <div className="space-y-4">
            <p className="text-ocragray-800 dark:text-zinc-200 font-haas">
              We encountered an error while trying to save the user profile:
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
            I Understand
          </button>
        </BaseModal.Footer>
      </BaseModal>
      <SavingOverlay message="Updating profile..." />
    </form>
  );
}
