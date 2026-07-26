import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { sectionById, contact, socials } from "@/lib/content";

/** Inline SVG brand marks — no emoji, no external icon package. */
function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  GitHub: <GithubIcon />,
  LinkedIn: <LinkedinIcon />,
};

/**
 * §5.8 — Contact. The closer: centered, generous whitespace. Trace-span
 * header keeps the house eyebrow (`TRACE 00N — handoff`) but the display
 * title is overridden with `content.contact.headline` per spec. Below it,
 * a blurb, a terminal-styled mailto card (whole card is the link, blinking
 * block cursor, email selectable), then ghost social buttons.
 */
export default function Contact() {
  const section = sectionById("contact");

  return (
    <Section {...section} title={contact.headline}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center">
        <Reveal>
          <p className="text-balance text-[1.0625rem] leading-[1.65] text-ink-dim">
            {contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="w-full">
          <a
            href={`mailto:${contact.email}`}
            className="glass-panel group relative block w-full overflow-hidden text-left transition-colors duration-200 hover:border-signal/50"
          >
            <div className="flex items-center gap-1.5 border-b border-line px-5 py-3.5">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-faint/30" />
              <span className="ml-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-faint">
                handoff://shell
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-6 py-8 font-mono text-base sm:text-lg md:px-10 md:py-10">
              <span className="text-ink-faint">$</span>
              <span className="text-ink-dim">open mailto:</span>
              <span className="break-all text-signal group-hover:text-signal-bright">
                {contact.email}
              </span>
              <span
                aria-hidden
                className="inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] animate-blink bg-signal align-middle"
              />
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socials.map((s) => (
              <MagneticButton key={s.name} href={s.url} variant="ghost" external>
                {icons[s.name]}
                {s.name}
              </MagneticButton>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
