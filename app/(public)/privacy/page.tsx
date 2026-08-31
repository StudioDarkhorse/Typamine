import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { MoveLeft } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";

export const metadata: Metadata = buildMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Typamine collects, uses and protects personal data, including font designer and foundry details listed in the catalogue, and how to exercise your data rights.",
  keywords: ["privacy policy", "data protection", "gdpr"],
});

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs text-ocragray-800 dark:text-zinc-400 uppercase tracking-widest font-bold">
          Last updated: August 19, 2026
        </p>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            1. Scope of This Policy
          </h2>
          <p>
            Typamine acts as an aggregator of font assets and a laboratory sandbox for testing typography. We do not provide user sign-ups or user profiles for general site visitors. Consequently, this Privacy Policy applies exclusively to the collection, aggregation, and processing of professional profile information of font designers, creators, and foundries (&quot;Authors&quot;).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            2. Author Information We Process
          </h2>
          <p>
            To credit and promote font creators, our catalog aggregates and maintains key details defined in our FontAuthor model:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Identity Details:</strong> Designer name, biography, avatar, banner image, and creator type (individual or foundry).
            </li>
            <li>
              <strong>Contact & Support Channels:</strong> Publicly available email addresses and support emails to allow users to contact authors for licensing queries.
            </li>
            <li>
              <strong>Creator Portfolios & Socials:</strong> Official website links, social media links (Twitter, Instagram, etc.), and references to external profile indexes (such as public designer directories and community links).
            </li>
            <li>
              <strong>Direct Support Links:</strong> Compensation/donation links (e.g., PayPal, Ko-fi) enabling platform users to directly support authors.
            </li>
            <li>
              <strong>Demographic Attributes:</strong> Nationality, specialties, and spoken languages used for catalog filtering and search optimization.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            3. Purpose of Processing
          </h2>
          <p>
            We process and display this information solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Ensure proper attribution for all indexed fonts.</li>
            <li>Direct users to official support channels or licensing sites to negotiate terms.</li>
            <li>Provide a direct donation portal for users who wish to compensate authors for their work.</li>
            <li>Verify designer profiles to prevent impersonation and maintain catalog authenticity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            4. Information Sources
          </h2>
          <p>
            We collect Author details through:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Public Directories:</strong> Data aggregated from public profiles on font distribution and sharing platforms under standard web indexing guidelines.
            </li>
            <li>
              <strong>Direct Submission:</strong> Information submitted or updated directly by creators claiming their catalog page, updating their profile information, or requesting verified status.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            5. Creator Rights & Opt-Out
          </h2>
          <p>
            We respect the intellectual property and privacy rights of all typography designers. At any time, you have the right to request updates, corrections, or the complete removal of your profile, email addresses, donation links, and aggregated font assets from Typamine.
          </p>
          <p>
            To exercise your rights, request modifications, or opt-out of our indexing services, please email the platform administration team at <a href="mailto:privacy@typamine.com" className="text-blue dark:text-red hover:underline font-bold">privacy@typamine.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
