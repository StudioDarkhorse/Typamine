import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { MoveLeft } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";

export const metadata: Metadata = buildMetadata({
  path: "/terms",
  title: "Terms of Service",
  description:
    "The terms that govern use of Typamine: font downloads and licences, the free typography tools, user submissions and the limits of our liability.",
  keywords: ["terms of service", "font licence terms", "usage terms"],
});

export default function TermsOfServicePage() {
  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 space-y-8 font-haas">
      <div className="space-y-2">
        <div className="mb-2">
          <MinimalLink
            href="/"
            label="Back to Lab"
            icon={<MoveLeft size={12} />}
            iconPosition="left"
            className="!flex lg:!inline-flex font-bold tracking-widest text-bluegray-800 dark:text-redgray-200 hover:text-black dark:hover:text-white"
          />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-blue-900 dark:text-white leading-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-ocragray-800 dark:text-zinc-400 uppercase tracking-widest font-bold">
          Last updated: August 19, 2026
        </p>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the Typamine platform, tools, and services (collectively, &quot;Typamine&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            2. Platform Purpose & Disclaimer
          </h2>
          <p>
            Typamine serves as a typographic sandbox, font testing aggregator, and formatting environment. The catalog aggregates font metadata and references to open-source or licensed fonts. You are responsible for ensuring your compliance with individual font licenses (e.g., SIL Open Font License, Apache, commercial licenses) before downloading or integrating them into your projects.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            3. Intellectual Property & Brand Assets
          </h2>
          <p>
            The software, layout, animations, chemical-apothecary identity, logo designs, and code of Typamine are the intellectual property of Typamine Studio and its contributors. You may not copy, reverse-engineer, or redistribute Typamine core assets without explicit permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            4. User Responsibilities & Acceptable Use
          </h2>
          <p>
            When utilizing Typamine&apos;s tools, such as the WCAG Checker, Format Converter, and Tailwind Generator, you agree not to submit malicious assets, attempt to exploit service endpoints, or overload our infrastructure. We reserve the right to limit access to any user found abusing the system.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            5. Limitation of Liability
          </h2>
          <p>
            Typamine is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, expressed or implied, regarding the uptime, correctness of aggregated data, or safety of conversion outputs. In no event shall Typamine Studio be liable for any damages arising out of the use or inability to use our tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Your continued use of the platform following the posting of modifications constitutes acceptance of the revised Terms of Service.
          </p>
        </section>
      </div>
    </div>
  );
}
