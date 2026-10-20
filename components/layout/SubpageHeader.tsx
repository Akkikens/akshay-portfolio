import { site } from "@/lib/site";
import Link from "next/link";

/**
 * Header for pages outside the one-page scroll (/work/…). The homepage Nav
 * scroll-spies section anchors, which don't exist here, so this is a plain
 * glass bar: name home, all work, contact and the résumé.
 */
export default function SubpageHeader() {
  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
        <Link
          href="/"
          className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-signal"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <Link href="/work/" className="hidden rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-dim hover:text-ink sm:inline-flex">
            Case studies
          </Link>
          <Link href="/#contact" className="rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-dim hover:text-ink">
            Contact
          </Link>
          <a
            href={site.resume}
            download
            className="glass-panel !rounded-full px-4 py-2 text-[0.9375rem] font-medium text-ink hover:text-signal"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
