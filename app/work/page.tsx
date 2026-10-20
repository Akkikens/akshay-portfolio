import type { Metadata } from "next";

import Backdrop from "@/components/layout/Backdrop";
import Footer from "@/components/layout/Footer";
import SubpageHeader from "@/components/layout/SubpageHeader";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import { shareImages, site } from "@/lib/site";
import Link from "next/link";

const description =
  "Case studies from AI agent engineer Akshay Kalapgar: Goldi, a production career agent for 100K+ users, MCP servers and Claude Code tooling, and Wingline.";

export const metadata: Metadata = {
  title: "Case studies: AI agent work",
  description,
  alternates: { canonical: "/work/" },
  openGraph: {
    url: `${site.url}/work/`,
    title: `Case studies: AI agent work · ${site.name}`,
    description,
    images: shareImages.og,
  },
  twitter: {
    card: "summary_large_image",
    title: `Case studies: AI agent work · ${site.name}`,
    description,
    images: shareImages.twitter,
  },
};

/** Index of the /work/ case studies. */
export default function WorkIndex() {
  return (
    <div className="relative min-h-screen w-full">
      <Backdrop />
      <SubpageHeader />
      <main id="main" className="relative z-[1] mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-10 md:pt-36">
        <p className="span-label">Case studies</p>
        <h1 className="mt-4 text-balance font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          AI agent work, in detail
        </h1>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-dim">
          How I build agent systems that hold up in production: the problem, the approach, the
          architecture and what it changed.
        </p>
        <div className="mt-12">
          <CaseStudyCards />
        </div>
        <p className="mt-12 text-[1rem] text-ink-dim">
          <Link href="/" className="font-semibold text-signal hover:text-signal-bright">
            Back to Akshay Kalapgar&apos;s homepage
          </Link>
        </p>
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}
