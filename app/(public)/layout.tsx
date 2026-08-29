import type { Metadata } from "next";
import "../globals.css";
import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import MarqueeBar from "@/components/layout/MarqueeBar";
import ThirdPartyScripts from "@/components/layout/ThirdPartyScripts";
import CookieBanner from "@/components/layout/CookieBanner";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { getAdminSettings } from "@/lib/services/adminSettings";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "TYPAMINE // Typographic Lab & Font Aggregator",
  description: "A high-performance technical typographic playground and curated font laboratory. Test, pair, and formulate typography at the edge.",
};

export default async function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // headers() PRIMA di getAdminSettings, non dopo: e' la lettura che segnala a
  // Next che questo layout e' dinamico. Leggendola per prima, il tentativo di
  // prerender in fase di build esce qui e non arriva mai a toccare il DB —
  // durante `next build` non esiste alcun contesto Cloudflare, quindi
  // lib/prisma.ts ripiegherebbe su sqlite locale e fallirebbe l'intera build
  // in CI, dove DATABASE_URL non e' definita (il DB di produzione e' il
  // binding D1, non un file).
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const isHome = pathname === "/";
  const adminSettings = await getAdminSettings();
  // "every_page" copre tutto il sito, "homepage_top" solo "/" — stessa
  // striscia fissa sopra l'header in entrambi i casi (vedi MarqueeBar).
  // "homepage_banner" non passa da qui: è renderizzato in-flow dentro
  // HomeClient, sotto l'hero, e non richiede l'offset dell'header.
  const showMarqueeStrip =
    adminSettings.marqueeActive &&
    (adminSettings.marqueeType === "every_page" || (adminSettings.marqueeType === "homepage_top" && isHome));

  return (
    <html lang="en" className={cn("h-full antialiased overflow-x-hidden", "font-sans", inter.variable)} suppressHydrationWarning>
      <head>
        {/* Dynamic theme-based favicons */}
        <link rel="icon" href="/icon-dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/icon.png" media="(prefers-color-scheme: light)" />
        
        {/* Inline script to prevent theme hydration flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('typamine-theme');
                if (saved === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-red selection:text-white relative scanline overflow-x-hidden"
        style={{ "--marquee-offset": showMarqueeStrip ? "2.25rem" : "0px" } as React.CSSProperties}
      >
        {showMarqueeStrip && (
          <MarqueeBar
            text={adminSettings.marqueeText || ""}
            textColorClassName={adminSettings.marqueeTextColor}
            bgColorClassName={adminSettings.marqueeBgColor}
          />
        )}

        <Header
          letterTFont={adminSettings.letterTFont}
          letterTFontSizePercent={adminSettings.letterTFontSizePercent}
          logoLightModeColor={adminSettings.logoLightModeColor}
          logoDarkModeColor={adminSettings.logoDarkModeColor}
        />

        {/* MAIN LAB BENCH CONTENT */}
        <main
          className="flex-grow flex flex-col transition-colors duration-300"
          style={{ paddingTop: "var(--marquee-offset, 0px)" }}
        >
          {children}
        </main>

        <Footer
          letterTFont={adminSettings.letterTFont}
          letterTFontSizePercent={adminSettings.letterTFontSizePercent}
          logoLightModeColor={adminSettings.logoLightModeColor}
          logoDarkModeColor={adminSettings.logoDarkModeColor}
        />

        {adminSettings.cookieBannerActive && (
          <CookieBanner
            text={adminSettings.cookieBannerText}
            privacyPolicyUrl={adminSettings.privacyPolicyUrl}
            termsOfServiceUrl={adminSettings.termsOfServiceUrl}
          />
        )}

        <ThirdPartyScripts
          integrationsConfig={adminSettings.integrationsConfig}
          cookieBannerActive={adminSettings.cookieBannerActive}
        />
      </body>
    </html>
  );
}
