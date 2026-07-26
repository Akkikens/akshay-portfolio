import type { Metadata } from "next";

import MagneticButton from "@/components/ui/MagneticButton";
import ConstellationFallback from "@/components/three/ConstellationFallback";

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
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-void px-6">
      <ConstellationFallback className="absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="span-label">TRACE NOT FOUND</p>

        <h1 className="mt-6 font-display text-[clamp(4.5rem,18vw,10rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
          404
        </h1>

        <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.65] text-ink-dim">
          This span emitted no output.
        </p>

        <MagneticButton href="/" variant="solid" className="mt-10">
          Return to mission control
        </MagneticButton>
      </div>
    </main>
  );
}
