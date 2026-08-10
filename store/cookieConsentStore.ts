import { create } from "zustand";

// Consenso cookie del visitatore pubblico — letto da CookieBanner (che lo
// scrive) e da ThirdPartyScripts (che decide se caricare GA/GTM/Pixel, gli
// unici script davvero "non essenziali" tra le Integrations). reCAPTCHA non
// è gated: è funzionale alla sicurezza dei form, trattato come necessario
// dalla maggior parte delle cookie policy.
export type CookieConsent = "unknown" | "accepted" | "declined";

const STORAGE_KEY = "typamine-cookie-consent";

function readStoredConsent(): CookieConsent {
  if (typeof window === "undefined") return "unknown";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : "unknown";
}

interface CookieConsentState {
  consent: CookieConsent;
  setConsent: (consent: Exclude<CookieConsent, "unknown">) => void;
  hydrate: () => void;
}

export const useCookieConsentStore = create<CookieConsentState>((set) => ({
  consent: "unknown",
  hydrate: () => set({ consent: readStoredConsent() }),
  setConsent: (consent) => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, consent);
    set({ consent });
  },
}));
