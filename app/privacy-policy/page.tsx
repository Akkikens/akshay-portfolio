import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

/**
 * Privacy policy — ported from the v1 static page (legacy/pages/privacy-policy).
 * Note: `lib/content.ts` has no `privacyPolicy` export to source this copy from
 * (only `site` — email/domain — applies here), so the prose is authored directly
 * in this server component per SPEC.md §5.10's port instruction. Kept minimal:
 * mono eyebrow, display H1, prose sections, back link.
 */
export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — Akshay Kalapgar" },
  description:
    "How akshaykalapgar.com handles visitor data: analytics collected, what is never gathered, and how to get in touch about it.",
  alternates: {
    canonical: "/privacy-policy/",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Metadata merges per top-level key — without these blocks the page keeps
  // the homepage's og:title/og:url/twitter card, so shares unfurl wrong.
  openGraph: {
    type: "article",
    url: `${site.url}/privacy-policy/`,
    title: "Privacy Policy — Akshay Kalapgar",
    description:
      "How akshaykalapgar.com handles visitor data: analytics collected, what is never gathered, and how to get in touch about it.",
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — Akshay Kalapgar",
    description:
      "How akshaykalapgar.com handles visitor data: analytics collected, what is never gathered, and how to get in touch about it.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="min-h-screen bg-void">
      <div className="mx-auto max-w-3xl px-6 py-28 md:px-10 md:py-40">
        <p className="span-label">Privacy Policy</p>

        <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
          Privacy Policy
        </h1>

        <p className="mt-4 font-mono text-[0.8125rem] text-ink-faint">
          Effective date: 5 Oct 2024
        </p>

        <div className="mt-12 space-y-12 text-[1.0625rem] leading-[1.65] text-ink-dim md:mt-16">
          <section>
            <h2 className="font-display text-[1.375rem] font-semibold text-ink">
              1. Google Analytics
            </h2>
            <p className="mt-4">
              This website uses Google Analytics to collect and analyze visitor data, such as:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Device type</li>
              <li>Browser information</li>
              <li>General user behavior (e.g., pages viewed, session duration)</li>
            </ul>
            <p className="mt-4">
              This data is non-personally identifiable and is collected only for analytical
              purposes to improve the user experience.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] font-semibold text-ink">
              2. Portfolio and Projects
            </h2>
            <p className="mt-4">
              This website,{" "}
              <a href={site.url} className="link-sweep text-ink">
                {site.domain}
              </a>
              , serves as my personal portfolio where I share my résumé and software projects.
            </p>
            <p className="mt-4">
              One of the projects demonstrates, for educational purposes, what websites can
              collect about users. That project does not collect data unless a visitor
              explicitly interacts with it to learn more about data collection practices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] font-semibold text-ink">
              3. No Personal Data Collection
            </h2>
            <p className="mt-4">
              Unless a visitor specifically interacts with certain features, this website does
              not collect personal data. It functions as a portfolio to showcase my work.
            </p>
            <p className="mt-4">
              Only standard Google Analytics data is collected for non-personal tracking
              purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] font-semibold text-ink">
              4. Contact Information
            </h2>
            <p className="mt-4">
              If you have any questions regarding this privacy policy, feel free to contact me
              at:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a href={`mailto:${site.email}`} className="link-sweep text-ink">
                {site.email}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Link href="/" className="link-sweep font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-signal">
            ← Return to mission control
          </Link>
        </div>
      </div>
    </main>
  );
}
