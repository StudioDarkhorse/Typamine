"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { useCookieConsentStore } from "@/store/cookieConsentStore";
import { IntegrationsConfig } from "@/types";

interface ThirdPartyScriptsProps {
  integrationsConfig: IntegrationsConfig;
  cookieBannerActive: boolean;
}

// Carica gli script third-party lato pubblico in base a Integrations
// (AdminSettings.integrationsConfig). GA4/GTM/Meta Pixel sono "non
// essenziali": se il cookie banner è attivo restano spenti finché il
// visitatore non accetta (useCookieConsentStore, scritto da CookieBanner).
// reCAPTCHA non è gated — protegge i form, trattato come necessario.
// Se il banner è disattivato del tutto, nessun gating: si comportano come un
// sito senza consent management.
export function ThirdPartyScripts({ integrationsConfig, cookieBannerActive }: ThirdPartyScriptsProps) {
  const { consent, hydrate } = useCookieConsentStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  const nonEssentialAllowed = !cookieBannerActive || (hydrated && consent === "accepted");

  const analytics = integrationsConfig.analytics;
  const tagManager = integrationsConfig.tagManager;
  const pixel = integrationsConfig.pixel;
  const recaptcha = integrationsConfig.recaptcha;

  return (
    <>
      {nonEssentialAllowed && analytics?.active && analytics.measurementId && (
        <GoogleAnalytics gaId={analytics.measurementId as string} />
      )}

      {nonEssentialAllowed && tagManager?.active && tagManager.containerId && (
        <GoogleTagManager gtmId={tagManager.containerId as string} />
      )}

      {nonEssentialAllowed && pixel?.active && pixel.pixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixel.pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixel.pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {recaptcha?.active && recaptcha.siteKey && (
        <Script
          id="recaptcha-v3"
          src={`https://www.google.com/recaptcha/api.js?render=${recaptcha.siteKey}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

export default ThirdPartyScripts;
