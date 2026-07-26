import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { sectionById, contributions } from "@/lib/content";

/** Small external-link glyph — consistent stroke, used inline after linked names. */
function ArrowOutIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] shrink-0 opacity-70 transition-transform duration-200 [transition-timing-function:var(--ease-house)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * §5.7 — the open-source ledger. `content.contributions` rendered as
 * table-like rows: mono index, org as a mono eyebrow, name as an
 * underline-sweep link out to the project, description, tech chips at the
 * trailing edge. Each row washes signal-dim on hover/focus; hairlines divide
 * rows. Plain divs (not ul/li) so Reveal's wrapper never violates list
 * child semantics.
 */
export default function OpenSource() {
  const section = sectionById("opensource");

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title={section.title}
      annotation={section.annotation}
    >
      <div className="border-t border-line">
        {contributions.map((contribution, i) => (
          <Reveal key={contribution.name} delay={i * 0.06}>
            <div
              className="group grid grid-cols-[2.75rem_1fr] gap-x-5 gap-y-3 border-b border-line px-2 py-7 transition-colors duration-200 ease-out hover:bg-signal-dim focus-within:bg-signal-dim sm:px-4 md:grid-cols-[3rem_1fr_13rem] md:gap-x-8"
            >
              <p
                aria-hidden="true"
                className="font-mono text-sm text-ink-dim tabular-nums md:pt-1"
              >
                {String(i + 1).padStart(3, "0")}
              </p>

              <div className="min-w-0">
                <p className="span-label">{contribution.org}</p>
                <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug text-ink md:text-2xl">
                  <a
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep inline-flex items-start gap-1.5"
                  >
                    {contribution.name}
                    <ArrowOutIcon />
                  </a>
                </h3>
                <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-dim">
                  {contribution.description}
                </p>
              </div>

              <div className="col-span-2 flex flex-wrap content-start gap-2 md:col-span-1 md:justify-end md:pt-1">
                {contribution.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
