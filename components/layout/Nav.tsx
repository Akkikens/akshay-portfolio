"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { hero, sections, type SectionDef } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";

type NavSection = SectionDef & { nav: string };

const navItems: NavSection[] = sections.filter(
  (s): s is NavSection => typeof s.nav === "string"
);

/** Small inline hamburger↔close glyph. Pure CSS transform morph. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line
        x1="2"
        y1="5"
        x2="18"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="transition-transform duration-250 [transition-timing-function:var(--ease-house)]"
        style={{
          transformOrigin: "10px 10px",
          transform: open ? "translateY(5px) rotate(45deg)" : "none",
        }}
      />
      <line
        x1="2"
        y1="10"
        x2="18"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="transition-opacity duration-200 ease-out"
        style={{ opacity: open ? 0 : 1 }}
      />
      <line
        x1="2"
        y1="15"
        x2="18"
        y2="15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="transition-transform duration-250 [transition-timing-function:var(--ease-house)]"
        style={{
          transformOrigin: "10px 10px",
          transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
        }}
      />
    </svg>
  );
}

/**
 * Fixed top nav. Glass panel materializes past scrollY 40; transparent at the
 * very top of the page (over the hero). Desktop shows the nav-registry links
 * with mono index prefixes, scroll-spied against every section (not just the
 * nav-eligible ones, so the closest earlier nav item stays lit while passing
 * through non-nav spans; `standalone` spans like the film reel light nothing).
 * Mobile collapses into a focus-trapped, scroll-locked full-screen overlay.
 */
export default function Nav() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Scroll-spy across every registered section; map the currently-nearest
  // section back to the last nav item at or before it in trace order.
  useEffect(() => {
    const targets = sections
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0 || navItems.length === 0) return;

    const visibleTops = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleTops.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleTops.delete(entry.target.id);
          }
        });

        // Nothing registered in view (the hero) — no span is active.
        if (visibleTops.size === 0) {
          setActiveId("");
          return;
        }

        const [currentId] = [...visibleTops.entries()].sort(
          (a, b) => Math.abs(a[1]) - Math.abs(b[1])
        )[0];
        const current = sections.find((s) => s.id === currentId);
        if (!current) return;
        if (current.standalone) {
          setActiveId("");
          return;
        }

        const eligible = navItems.filter((n) => n.index <= current.index);
        const target = eligible[eligible.length - 1] ?? navItems[0];
        setActiveId(target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.5, 1] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Body scroll lock + Esc-to-close + focus trap while the overlay is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    // aria-modal on a div dialog isn't self-enforcing: without inert, screen
    // readers browsing by virtual cursor still reach the page behind the
    // overlay. The header stays interactive (it holds the close toggle).
    const inertTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '#main, footer, nav[aria-label="Section trace"]'
      )
    );
    inertTargets.forEach((el) => {
      el.inert = true;
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        // The close toggle lives in the header (above the overlay, z-50), not
        // inside it — include it in the cycle or keyboard users can never
        // reach the dialog's own close control.
        const focusable = [
          toggleRef.current,
          ...overlayRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          ),
        ].filter((el): el is HTMLElement => Boolean(el));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((el) => {
        el.inert = false;
      });
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-panel/75 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
          <a
            href="#top"
            // While the modal overlay is open the logo sits above it (z-50) —
            // pull it out of the tab order and a11y tree for the duration.
            tabIndex={open ? -1 : undefined}
            aria-hidden={open || undefined}
            className="font-mono text-sm font-semibold tracking-[0.12em] text-ink transition-colors hover:text-signal"
          >
            AK—02
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`link-sweep inline-flex items-center gap-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                    isActive ? "text-signal" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      isActive ? "bg-signal" : "bg-transparent"
                    }`}
                  />
                  {/* Sequential position in THIS nav (01..04), not the section's
                      registry index (1/3/4/8) — the raw index reads as broken
                      numbering ("where's 2, 5, 6, 7?") since only a curated
                      subset of the 8 trace spans appears here. The full 1-8
                      sequence lives in TraceRail, where every span gets a mark. */}
                  <span aria-hidden className="text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.nav}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <MagneticButton href={hero.ctaSecondary.href} variant="ghost" external>
              {hero.ctaSecondary.label}
            </MagneticButton>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-overlay"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink md:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </header>

      {/*
        Always mounted, state-driven. AnimatePresence's exit-complete callback
        proved unreliable here (React 19 strict mode) and left the exited
        overlay in the DOM at opacity 0 with pointer-events:auto — an invisible
        click shield over the whole page. Driving open/closed on a permanent
        element with `inert` + pointer-events removes that failure mode
        entirely: closed means non-interactive and out of the a11y tree, no
        unmount callback required.
      */}
      <motion.div
        id="mobile-nav-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        inert={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.25, ease: EASE_OUT }}
        style={{ pointerEvents: open ? undefined : "none" }}
        className="fixed inset-0 z-40 flex flex-col bg-void md:hidden"
        onClick={closeMenu}
      >
        <div className="h-16 shrink-0" aria-hidden />
        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col items-start justify-center gap-1 px-8"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item, i) => {
            const isActive = activeId === item.id;
            return (
              <motion.a
                key={item.id}
                ref={i === 0 ? firstLinkRef : undefined}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={closeMenu}
                initial={false}
                animate={
                  reduced || open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: reduced ? 0 : open ? 0.4 : 0.15,
                  ease: EASE_OUT,
                  delay: reduced || !open ? 0 : 0.05 * i,
                }}
                className={`flex items-baseline gap-4 py-3 font-display text-4xl font-bold tracking-[-0.02em] ${
                  isActive ? "text-signal" : "text-ink"
                }`}
              >
                <span className="font-mono text-base font-medium text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.nav}
              </motion.a>
            );
          })}
          <motion.div
            initial={false}
            animate={reduced || open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: reduced ? 0 : open ? 0.4 : 0.15,
              ease: EASE_OUT,
              delay: reduced || !open ? 0 : 0.05 * navItems.length,
            }}
            className="mt-6"
          >
            <MagneticButton href={hero.ctaSecondary.href} variant="ghost" external>
              {hero.ctaSecondary.label}
            </MagneticButton>
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}
