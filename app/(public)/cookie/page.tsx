import { Metadata } from "next";
import { MoveLeft } from "lucide-react";
import MinimalLink from "@/components/common/MinimalLink";

export const metadata: Metadata = {
  title: "Cookie Policy // Typamine",
  description: "Cookie Policy explaining our use of cookies and tracking technologies on the Typamine platform.",
};

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>
        <p className="text-xs text-ocragray-800 dark:text-zinc-400 uppercase tracking-widest font-bold">
          Last updated: August 19, 2026
        </p>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your computer or mobile device by your web browser when you visit websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            2. How We Use Cookies
          </h2>
          <p>
            On Typamine, we use cookies to manage your experience and remember your preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Essential Cookies:</strong> Needed to support authentication, session persistence, security, and access controls. Without these, core portions of the Typamine platform (like user dashboards and settings) will not function.
            </li>
            <li>
              <strong>Preference Cookies:</strong> Used to remember your local configurations (such as dark/light theme state, custom font sizing options, and active view modes) so they remain active on future visits.
            </li>
            <li>
              <strong>Analytical Cookies:</strong> Used to collect anonymous statistics about visits, load times, and usage of our tools (such as the WCAG Checker and Format Converter) so we can optimize performance.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            3. Local Storage Usage
          </h2>
          <p>
            In addition to cookies, we utilize HTML5 Local Storage to manage layout state, specifically caching your theme choice (`typamine-theme`) and list preference options. This data is kept strictly on your local machine and is not sent to our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            4. Managing Your Preferences
          </h2>
          <p>
            You can control or delete cookies as you wish through your web browser&apos;s settings. Most modern browsers allow you to decline cookies, block third-party cookies, or clear all cookie storage on exit. Please note that blocking or deleting essential and preference cookies on Typamine will reset your lab settings and log out your active session.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-wide">
            5. Updates to This Policy
          </h2>
          <p>
            We may update our Cookie Policy periodically to reflect changes in our tools or regulations. Any updates will be posted directly to this page with the modified &quot;Last updated&quot; date.
          </p>
        </section>
      </div>
    </div>
  );
}
