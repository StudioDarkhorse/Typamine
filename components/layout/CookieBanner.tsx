"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/common/Button";
import { useCookieConsentStore } from "@/store/cookieConsentStore";

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

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  if (!hydrated || consent !== "unknown") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[70] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="h-5 w-5 shrink-0 mt-0.5 text-bluegray-800 dark:text-redgray-200" />
          <p className="text-xs sm:text-sm font-haas text-black dark:text-white leading-relaxed">
            {text || "We use cookies to improve your experience and analyze site traffic."}
            {(privacyPolicyUrl || termsOfServiceUrl) && (
              <>
                {" "}
                {privacyPolicyUrl && (
                  <a href={privacyPolicyUrl} className="underline underline-offset-2 hover:opacity-70">
                    Privacy Policy
                  </a>
                )}
                {privacyPolicyUrl && termsOfServiceUrl && " · "}
                {termsOfServiceUrl && (
                  <a href={termsOfServiceUrl} className="underline underline-offset-2 hover:opacity-70">
                    Terms of Service
                  </a>
                )}
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <Button type="button" variant="outline" size="sm" onClick={() => setConsent("declined")}>
            Decline
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={() => setConsent("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
