"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useCookieConsentStore } from "@/store/cookieConsentStore";
import { usePathname } from "next/navigation";

interface CookieBannerProps {
  text?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
}

// Renderizzata da (public)/layout.tsx solo quando AdminSettings.cookieBannerActive
// è true. hydrate() legge il consenso salvato in un solo effect dopo il mount
// (mai durante l'SSR, altrimenti localStorage non esiste) — finché non è
// "unknown" il banner resta nascosto per evitare un flash su ogni visita già
// consenziente.
export function CookieBanner({ text, privacyPolicyUrl, termsOfServiceUrl }: CookieBannerProps) {
  const { consent, hydrate, setConsent } = useCookieConsentStore();
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();
  const isCookiePage = pathname === "/cookie";

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  // Lock background scroll while cookies are not accepted (except on the cookie policy page)
  useEffect(() => {
    if (hydrated && consent === "unknown" && !isCookiePage) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [hydrated, consent, isCookiePage]);

  if (!hydrated || consent !== "unknown") return null;

  return (
    <>
      {/* Background Overlay (leaves Header z-50 above it, hidden on cookie page) */}
      {!isCookiePage && (
        <div className="fixed inset-0 z-[45] bg-ocragray-200/80 dark:bg-ocragray-800/80 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-300" />
      )}

      <div className="fixed bottom-0 inset-x-0 z-[70] p-4 sm:p-8">
        <div className="relative overflow-hidden max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
          {/* Large background watermark cookie icon, rotated in top-left corner */}
          <Cookie className="absolute -top-12 -left-12 w-64 h-64 text-black/10 dark:text-white/10 -rotate-90 pointer-events-none" />

          <div className="flex-1 relative z-10">
            <p className="text-sm sm:text-lg font-haas text-black dark:text-white leading-relaxed">
              {text || "We use cookies to improve your experience and analyze site traffic."}
              {" "}
              {privacyPolicyUrl && (
                <a href={privacyPolicyUrl} className="underline underline-offset-2 hover:opacity-70">
                  Privacy Policy
                </a>
              )}
              {privacyPolicyUrl && " · "}
              {termsOfServiceUrl && (
                <a href={termsOfServiceUrl} className="underline underline-offset-2 hover:opacity-70">
                  Terms of Service
                </a>
              )}
              {(privacyPolicyUrl || termsOfServiceUrl) && " · "}
              <a href="/cookie" className="underline underline-offset-2 hover:opacity-70 font-bold">
                Read More
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto relative z-10">
            <Button type="button" variant="outline" size="md" onClick={() => setConsent("declined")}>
              Decline
            </Button>
            <Button type="button" variant="primary" size="md" onClick={() => setConsent("accepted")}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookieBanner;
