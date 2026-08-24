"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Plus, Trash2, ShieldCheck } from "lucide-react";
import { saveFontAuthor } from "@/lib/actions/fontAuthor";
import { Button } from "@/components/common/Button";
import FormActions from "@/components/admin/common/FormActions";
import SavingOverlay from "@/components/admin/common/SavingOverlay";
import { useFilePreview } from "@/components/admin/common/useFilePreview";
import ImageDropInput from "@/components/admin/common/ImageDropInput";
import { Select } from "@/components/common/Select";
import { Input, Label } from "@/components/common/Input";
import type { SocialPlatform } from "@/types";

const TYPE_OPTIONS = [
  { label: "Individual", value: "INDIVIDUAL" },
  { label: "Foundry", value: "FOUNDRY" },
  { label: "Collective", value: "COLLECTIVE" },
  { label: "Unknown", value: "UNKNOWN" },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
];

const PLATFORM_OPTIONS: { label: string; value: SocialPlatform }[] = [
  { label: "GitHub", value: "github" },
  { label: "Twitter / X", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "Behance", value: "behance" },
  { label: "Dribbble", value: "dribbble" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "YouTube", value: "youtube" },
];

const DONATION_METHOD_OPTIONS = [
  { label: "— None —", value: "" },
  { label: "Ko-fi", value: "kofi" },
  { label: "Patreon", value: "patreon" },
  { label: "PayPal", value: "paypal" },
  { label: "Crypto", value: "crypto" },
  { label: "Custom", value: "custom" },
];

interface SocialLinkRow {
  id: string;
  platform: SocialPlatform;
  url: string;
  handle: string;
}

interface FontAuthorFormProps {
  initialData?: any;
}

export default function FontAuthorForm({ initialData }: FontAuthorFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);
  const [type, setType] = useState(initialData?.type || "INDIVIDUAL");
  const [status, setStatus] = useState(initialData?.status || "ACTIVE");
  const [email, setEmail] = useState(initialData?.email || "");
  const [supportEmail, setSupportEmail] = useState(initialData?.supportEmail || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [dafontProfileUrl, setDafontProfileUrl] = useState(initialData?.dafontProfileUrl || "");
  const [profileInfoUrl, setProfileInfoUrl] = useState(initialData?.profileInfoUrl || "");
  const [nationality, setNationality] = useState(initialData?.nationality || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [isVerified, setIsVerified] = useState(initialData?.isVerified ?? false);
  const [languagesSpoken, setLanguagesSpoken] = useState<string>(
    (() => {
      try {
        const parsed = initialData?.languagesSpoken ? JSON.parse(initialData.languagesSpoken) : [];
        return Array.isArray(parsed) ? parsed.join(", ") : "";
      } catch {
        return "";
      }
    })()
  );
  const [specialties, setSpecialties] = useState<string>(
    (() => {
      try {
        const parsed = initialData?.specialties ? JSON.parse(initialData.specialties) : [];
        return Array.isArray(parsed) ? parsed.join(", ") : "";
      } catch {
        return "";
      }
    })()
  );

  // Avatar / Banner uploads
  const [currentAvatarUrl] = useState<string | null>(initialData?.avatarUrl || null);
  const [currentBannerUrl] = useState<string | null>(initialData?.bannerUrl || null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [removeBanner, setRemoveBanner] = useState(false);
  const avatarPreview = useFilePreview();
  const bannerPreview = useFilePreview();

  // Social links
  const [socialLinks, setSocialLinks] = useState<SocialLinkRow[]>(() => {
    try {
      const parsed = initialData?.socialLinks ? JSON.parse(initialData.socialLinks) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.map((s: any) => ({
        id: Math.random().toString(36).substring(2, 11),
        platform: s.platform || "github",
        url: s.url || "",
        handle: s.handle || "",
      }));
    } catch {
      return [];
    }
  });

  const addSocialLink = () => {
    setSocialLinks((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2, 11), platform: "github", url: "", handle: "" },
    ]);
  };
  const removeSocialLink = (id: string) => setSocialLinks((prev) => prev.filter((s) => s.id !== id));
  const updateSocialLink = (id: string, patch: Partial<SocialLinkRow>) =>
    setSocialLinks((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  // Donation
  const initialDonation = (() => {
    try {
      return initialData?.donation ? JSON.parse(initialData.donation) : {};
    } catch {
      return {};
    }
  })();
  const [donationWebsite, setDonationWebsite] = useState(initialDonation.donationWebsite || "");
  const [preferredMethod, setPreferredMethod] = useState(initialDonation.preferredMethod || "");
  const [bitcoinWallet, setBitcoinWallet] = useState(initialDonation.cryptoWallets?.bitcoin || "");
  const [ethereumWallet, setEthereumWallet] = useState(initialDonation.cryptoWallets?.ethereum || "");
  const [solanaWallet, setSolanaWallet] = useState(initialDonation.cryptoWallets?.solana || "");

  // Business info
  const initialBusiness = (() => {
    try {
      return initialData?.businessInfo ? JSON.parse(initialData.businessInfo) : {};
    } catch {
      return {};
    }
  })();
  const [companyName, setCompanyName] = useState(initialBusiness.companyName || "");
  const [vatId, setVatId] = useState(initialBusiness.vatId || "");
  const [street, setStreet] = useState(initialBusiness.address?.street || "");
  const [city, setCity] = useState(initialBusiness.address?.city || "");
  const [state, setStateField] = useState(initialBusiness.address?.state || "");
  const [zipCode, setZipCode] = useState(initialBusiness.address?.zipCode || "");
  const [country, setCountry] = useState(initialBusiness.address?.country || "");

  // totalFontsCount e usersRating sono ricalcolati al volo dai font collegati
  // (initialData.fonts, passato da getAdminFontAuthorById) invece che letti dal
  // JSON `metrics` salvato — stesso calcolo live usato in lib/services/fontAuthor.ts,
  // così il box qui sotto non mostra mai numeri stantii.
  const metrics = (() => {
    const stored = (() => {
      try {
        return initialData?.metrics
          ? JSON.parse(initialData.metrics)
          : { totalFontsCount: 0, totalDownloads: 0, followersCount: 0, usersRating: { average: 0, totalReviews: 0 } };
      } catch {
        return { totalFontsCount: 0, totalDownloads: 0, followersCount: 0, usersRating: { average: 0, totalReviews: 0 } };
      }
    })();

    const linkedFonts: { userRating: number | null; userRatingsCount: number | null }[] = initialData?.fonts || [];
    if (linkedFonts.length === 0 && !initialData?.fonts) return stored;

    let totalReviews = 0;
    let weightedSum = 0;
    for (const f of linkedFonts) {
      const count = f.userRatingsCount ?? 0;
      totalReviews += count;
      weightedSum += (f.userRating ?? 0) * count;
    }

    return {
      ...stored,
      totalFontsCount: linkedFonts.length,
      usersRating: { average: totalReviews > 0 ? weightedSum / totalReviews : 0, totalReviews },
    };
  })();

  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (avatarPreview.isCompressing || bannerPreview.isCompressing) {
      setErrorMessage("Please wait for image compression to finish before saving.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("isVerified", String(isVerified));
    if (removeAvatar) formData.set("removeAvatar", "true");
    if (removeBanner) formData.set("removeBanner", "true");

    formData.set(
      "socialLinks",
      JSON.stringify(
        socialLinks
          .filter((s) => s.url.trim())
          .map((s) => ({ platform: s.platform, url: s.url.trim(), handle: s.handle.trim() || undefined }))
      )
    );

    const cryptoWallets: Record<string, string> = {};
    if (bitcoinWallet.trim()) cryptoWallets.bitcoin = bitcoinWallet.trim();
    if (ethereumWallet.trim()) cryptoWallets.ethereum = ethereumWallet.trim();
    if (solanaWallet.trim()) cryptoWallets.solana = solanaWallet.trim();
    formData.set(
      "donation",
      JSON.stringify({
        donationWebsite: donationWebsite.trim() || undefined,
        preferredMethod: preferredMethod || undefined,
        cryptoWallets: Object.keys(cryptoWallets).length > 0 ? cryptoWallets : undefined,
      })
    );

    const hasBusinessInfo = companyName.trim() || vatId.trim() || country.trim();
    formData.set(
      "businessInfo",
      hasBusinessInfo
        ? JSON.stringify({
          companyName: companyName.trim() || undefined,
          vatId: vatId.trim() || undefined,
          address: country.trim()
            ? {
              street: street.trim() || undefined,
              city: city.trim() || undefined,
              state: state.trim() || undefined,
              zipCode: zipCode.trim() || undefined,
              country: country.trim(),
            }
            : undefined,
        })
        : ""
    );

    startTransition(async () => {
      const err = await saveFontAuthor(null, formData, initialData?.id);
      if (err) {
        setErrorMessage(err);
      } else {
        router.back();
      }
    });
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <FormActions
            backLink="/admin/font-authors"
            backLabel="Back to font authors list"
            buttonLabel={initialData ? "Save Changes" : "Create Font Author"}
            disabled={isPending || avatarPreview.isCompressing || bannerPreview.isCompressing}
          />
        </div>

        {/* Identity */}
        <div className="lg:col-span-8 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <h3 className="text-xl font-crenzo font-bold text-black/80 dark:text-white/80 pb-3 border-b border-black/5 dark:border-white/5">
            Author Identity
          </h3>

          <Input label="Name *" name="name" required value={name} onChange={handleNameChange} placeholder="e.g. Dalton Maag" />

          <Input
            label="Slug *"
            name="slug"
            required
            value={slug}
            onChange={(val) => {
              setSlug(val);
              setAutoSlug(false);
            }}
            placeholder="dalton-maag"
            rightIcon={
              !autoSlug ? (
                <button
                  type="button"
                  onClick={() => {
                    setAutoSlug(true);
                    handleNameChange(name);
                  }}
                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors text-bluegray-800 dark:text-redgray-200"
                  title="Auto-generate from Name"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              ) : undefined
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email *" name="email" type="email" required value={email} onChange={setEmail} placeholder="hello@foundry.com" />
            <Input label="Support Email" name="supportEmail" type="email" value={supportEmail} onChange={setSupportEmail} placeholder="support@foundry.com" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Website" name="website" value={website} onChange={setWebsite} placeholder="https://foundry.com" />
            <Input label="Nationality (ISO-2)" name="nationality" value={nationality} onChange={(v) => setNationality(v.toUpperCase())} placeholder="IT" maxLength={2} />
          </div>

          {/* Popolati in automatico dalle key task "Scrape Author Dafont
              Profiles" e "Scrape Profile Info" in dashboard (e, per gli import
              da 1001fonts, direttamente in fase di import), editabili a mano
              da qui. La profile info page è la pagina da cui si legge l'email:
              profile.php su dafont, /users/<nome>/ su 1001fonts. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="DaFont Profile Page"
              name="dafontProfileUrl"
              value={dafontProfileUrl}
              onChange={setDafontProfileUrl}
              placeholder="https://www.dafont.com/mjtype.d10200"
            />
            <Input
              label="Profile Info Page (email source)"
              name="profileInfoUrl"
              value={profileInfoUrl}
              onChange={setProfileInfoUrl}
              placeholder="https://www.dafont.com/profile.php?user=1490629"
            />
          </div>

          <Input as="textarea" rows={4} label="Bio" name="bio" value={bio} onChange={setBio} placeholder="Short biography (Markdown supported)..." />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Languages Spoken (comma separated)" value={languagesSpoken} onChange={setLanguagesSpoken} placeholder="en, it, fr" />
            <input type="hidden" name="languagesSpoken" value={languagesSpoken} />
            <Input label="Specialties (comma separated)" value={specialties} onChange={setSpecialties} placeholder="Serif, Pixel Art, Calligraphy" />
            <input type="hidden" name="specialties" value={specialties} />
          </div>
        </div>

        {/* Taxonomy & visibility */}
        <div className="lg:col-span-4 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <h3 className="text-xl font-crenzo font-bold text-black/80 dark:text-white/80 text-center pb-3 border-b border-black/5 dark:border-white/5">
            Type &amp; Status
          </h3>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">Author Type</label>
            <Select options={TYPE_OPTIONS} value={type} onChange={setType} />
            <input type="hidden" name="type" value={type} />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">Status</label>
            <Select options={STATUS_OPTIONS} value={status} onChange={setStatus} />
            <input type="hidden" name="status" value={status} />
          </div>

          <div className="flex items-center justify-between p-4 border border-black/5 dark:border-white/5 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="text-sm font-bold text-black dark:text-white">Verified</p>
                <p className="text-xs text-ocragray-800 dark:text-zinc-200">Show a verified badge on this author</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:after:border-zinc-800 peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {initialData && (
            <div className="p-4 border border-black/5 dark:border-white/5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Metrics (read-only)</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-black dark:text-white font-bold">
                <p>{metrics.totalFontsCount} fonts</p>
                <p>{metrics.totalDownloads} downloads</p>
                <p>{metrics.followersCount} followers</p>
                <p>{metrics.usersRating.average.toFixed(1)}★ ({metrics.usersRating.totalReviews})</p>
              </div>
            </div>
          )}
        </div>

        {/* Avatar & Banner */}
        <div className="lg:col-span-12 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <h3 className="text-xl font-crenzo font-bold text-black/80 dark:text-white/80 pb-3 border-b border-black/5 dark:border-white/5">
            Avatar &amp; Banner
          </h3>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="shrink-0 w-[220px] mx-auto md:mx-0">
              <Label>Avatar</Label>
              <ImageDropInput
                name="avatar"
                inputRef={avatarPreview.inputRef}
                previewUrl={avatarPreview.previewUrl}
                currentUrl={removeAvatar ? null : currentAvatarUrl}
                isCompressing={avatarPreview.isCompressing}
                onSelect={(e) => {
                  setRemoveAvatar(false);
                  avatarPreview.onSelect(e);
                }}
                onRemove={() => {
                  if (avatarPreview.previewUrl) avatarPreview.clear();
                  else setRemoveAvatar(true);
                }}
                containerClassName="w-[220px] h-[220px] rounded-2xl"
                label="Upload avatar"
                helperText="Square image recommended"
              />
            </div>
            <div className="flex-1 w-full">
              <Label>Banner</Label>
              <ImageDropInput
                name="banner"
                inputRef={bannerPreview.inputRef}
                previewUrl={bannerPreview.previewUrl}
                currentUrl={removeBanner ? null : currentBannerUrl}
                isCompressing={bannerPreview.isCompressing}
                onSelect={(e) => {
                  setRemoveBanner(false);
                  bannerPreview.onSelect(e);
                }}
                onRemove={() => {
                  if (bannerPreview.previewUrl) bannerPreview.clear();
                  else setRemoveBanner(true);
                }}
                containerClassName="w-full h-[220px] rounded-2xl"
                label="Upload banner"
                helperText="Recommended: 1600x530px"
              />
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="lg:col-span-6 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 className="text-xl font-crenzo font-bold text-black/80 dark:text-white/80">Social Links</h3>
            <Button type="button" variant="secondary" size="sm" roundness="md" onClick={addSocialLink} className="flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>

          {socialLinks.length === 0 && (
            <p className="text-xs text-zinc-800 dark:text-zinc-400">No social links added yet.</p>
          )}

          <div className="space-y-3">
            {socialLinks.map((s) => (
              <div key={s.id} className="p-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-32 shrink-0">
                    <Select
                      options={PLATFORM_OPTIONS}
                      value={s.platform}
                      onChange={(v) => updateSocialLink(s.id, { platform: v as SocialPlatform })}
                    />
                  </div>
                  <input
                    type="text"
                    value={s.url}
                    onChange={(e) => updateSocialLink(s.id, { url: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <button type="button" onClick={() => removeSocialLink(s.id)} className="p-2 text-red-500/60 hover:text-red-500 transition-colors" title="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={s.handle}
                  onChange={(e) => updateSocialLink(s.id, { handle: e.target.value })}
                  placeholder="@handle (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Donation */}
        <div className="lg:col-span-6 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
          <h3 className="text-xl font-crenzo font-bold text-black/80 dark:text-white/80 pb-3 border-b border-black/5 dark:border-white/5">
            Donation Details
          </h3>
          <Input label="Donation Website" value={donationWebsite} onChange={setDonationWebsite} placeholder="https://ko-fi.com/..." />
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-black dark:text-white mb-1.5">Preferred Method</label>
            <Select options={DONATION_METHOD_OPTIONS} value={preferredMethod} onChange={setPreferredMethod} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Bitcoin Wallet" value={bitcoinWallet} onChange={setBitcoinWallet} />
            <Input label="Ethereum Wallet" value={ethereumWallet} onChange={setEthereumWallet} />
            <Input label="Solana Wallet" value={solanaWallet} onChange={setSolanaWallet} />
          </div>
        </div>

        {/* Business info */}
        <div className="lg:col-span-12 border border-black/5 dark:border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-xl bg-white/50 dark:bg-zinc-950/50 space-y-5">
        <div className="border-b border-black/5 dark:border-white/5 pb-3 ">

          <h3 className="text-xl font-crenzo font-bold text-black/80 dark:text-white/80 ">
            Business Info
          </h3>
          <p className="text-xs font-normal text-zinc-800 dark:text-zinc-400 normal-case">(optional — for authors selling commercial fonts)</p>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Company Name" value={companyName} onChange={setCompanyName} placeholder="Dalton Maag Ltd." />
            <Input label="VAT / Tax ID" value={vatId} onChange={setVatId} placeholder="IT01234567890" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Street" value={street} onChange={setStreet} />
            <Input label="City" value={city} onChange={setCity} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="State / Region" value={state} onChange={setStateField} />
            <Input label="Zip Code" value={zipCode} onChange={setZipCode} />
            <Input label="Country (ISO-2)" value={country} onChange={(v) => setCountry(v.toUpperCase())} maxLength={2} placeholder="IT" />
          </div>
        </div>
      </form>

      <SavingOverlay message="Saving Font Author..." show={isPending} />
    </div>
  );
}
