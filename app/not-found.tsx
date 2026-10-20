import type { Metadata } from "next";

import MagneticButton from "@/components/ui/MagneticButton";
import Backdrop from "@/components/layout/Backdrop";

/**
 * Without this export the 404 inherits the root layout's metadata wholesale —
 * homepage canonical, `index, follow` robots (contradicting the `noindex`
 * Next injects on 404s), and the homepage OG/twitter card: the textbook
 * soft-404 signature. Every key here exists to override that inheritance.
 */
export const metadata: Metadata = {
  title: { absolute: "404 — Akshay Kalapgar" },
  description: "This page does not exist.",
  robots: { index: false, follow: false },
  alternates: {},
  openGraph: {
    title: "404 — Akshay Kalapgar",
    description: "This page does not exist.",
  },
  twitter: {
    card: "summary",
    title: "404 — Akshay Kalapgar",
    description: "This page does not exist.",
  },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6">
      <Backdrop />

      <div className="glass-strong relative z-10 flex max-w-lg flex-col items-center px-8 py-12 text-center md:px-14">
        <p className="span-label">Page not found</p>

        <h1 className="mt-6 font-display text-[clamp(4.5rem,18vw,10rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">
          404
        </h1>

        <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.65] text-ink-dim">
          Nothing lives at this address. The rest of the site is one tap away.
        </p>

        <MagneticButton href="/" variant="solid" className="mt-10">
          Back to the homepage
        </MagneticButton>
      </div>
    </main>
  );
}
