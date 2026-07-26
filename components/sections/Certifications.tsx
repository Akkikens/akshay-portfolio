import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { sectionById, certifications } from "@/lib/content";

/** Small external-link glyph — consistent stroke, reused for both PDF and verify links. */
function ArrowOutIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width={13}
      height={13}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * §5.7 — credentials grid. `content.certifications` rendered as glass-panel
 * cards: issuer mono eyebrow, cert name (linked to the PDF when present, with
 * an arrow-out icon + descriptive aria-label), optional date, and a separate
 * small "Verify" link when `.verify` exists. Certs with neither `pdf` nor
 * `verify` render as static, non-interactive cards. Subtle hover/focus lift,
 * no layout shift (transform only).
 */
export default function Certifications() {
  const section = sectionById("certifications");

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title={section.title}
      annotation={section.annotation}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.05} className="h-full">
            <div className="glass-panel flex h-full flex-col gap-3 p-6 transition-transform duration-200 [transition-timing-function:var(--ease-house)] hover:-translate-y-0.5 focus-within:-translate-y-0.5">
              <p className="span-label">{cert.issuer}</p>

              <h3 className="font-display text-lg font-semibold leading-snug text-ink text-balance">
                {cert.pdf ? (
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Open ${cert.name} certificate PDF`}
                    className="link-sweep inline-flex items-start gap-1.5"
                  >
                    {cert.name}
                    <ArrowOutIcon className="mt-1 opacity-70" />
                  </a>
                ) : (
                  cert.name
                )}
              </h3>

              {cert.date ? (
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-dim">
                  {cert.date}
                </p>
              ) : null}

              {cert.verify ? (
                <a
                  href={cert.verify}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.name} credential`}
                  className="link-sweep mt-1 inline-flex w-fit items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-signal hover:text-signal-bright"
                >
                  Verify
                  <ArrowOutIcon className="opacity-80" />
                </a>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
