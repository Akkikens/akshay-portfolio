import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { sectionById, apps, type App, type AppChip } from "@/lib/content";

const section = sectionById("apps");

/* Status chips read in words first; color only reinforces them. */
const CHIP: Record<AppChip, { label: string; className: string }> = {
  beta: { label: "Beta", className: "bg-signal-dim text-signal" },
  "in-review": { label: "In review", className: "bg-ochre/12 text-ochre" },
  "in-development": { label: "In development", className: "bg-blue/10 text-blue" },
  concept: { label: "Concept", className: "bg-ink/[0.06] text-ink-dim" },
};

function StatusChips({ app }: { app: App }) {
  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-wrap gap-1.5" aria-label="Status">
        {app.chips.map((chip) => (
          <li
            key={chip}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${CHIP[chip].className}`}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
            {CHIP[chip].label}
          </li>
        ))}
      </ul>
      <p className="text-[0.8125rem] leading-snug text-ink-faint">{app.statusLabel}</p>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function AppLinks({ app }: { app: App }) {
  if (!app.links.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {app.links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-[0.875rem] font-semibold transition-colors ${
            i === 0
              ? "bg-signal text-on-signal hover:bg-signal-bright"
              : "border border-line-bright text-ink hover:border-signal hover:text-signal"
          }`}
        >
          {link.label}
          <ArrowIcon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

/** The app's real screen in a phone bezel, standing on a tinted stage at the top of the card. */
function DevicePreview({ app }: { app: App }) {
  if (!app.screen) return null;
  const { screen } = app;
  return (
    <div className="device-stage relative -mx-5 -mt-5 mb-1 flex justify-center overflow-hidden rounded-t-[1.25rem] px-6 pt-8 md:-mx-6 md:-mt-6">
      <div className="phone-frame w-[min(62%,13.5rem)] translate-y-0">
        <div className="phone-frame__screen aspect-[9/16]">
          <img
            src={screen.src}
            width={screen.width}
            height={screen.height}
            loading="lazy"
            decoding="async"
            alt={screen.alt}
            className={`absolute inset-0 h-full w-full object-cover ${
              screen.focus === "bottom" ? "object-bottom" : "object-top"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

function AppCard({ app, index }: { app: App; index: number }) {
  return (
    <Reveal delay={Math.min(index * 0.06, 0.18)} className="h-full">
      <TiltCard className="flex h-full flex-col gap-5 overflow-hidden p-5 md:p-6">
        <DevicePreview app={app} />
        <div className="flex items-center gap-3.5">
          {app.icon ? (
            <img
              src={app.icon.src}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              alt={app.icon.alt}
              className="h-14 w-14 flex-none rounded-[1rem] shadow-[0_4px_14px_-6px_rgba(0,0,0,0.35)]"
            />
          ) : null}
          <div className="min-w-0">
            <h3 className="font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{app.name}</h3>
            <p className="text-[0.9375rem] leading-snug text-ink-dim">{app.kind}</p>
          </div>
        </div>
        <StatusChips app={app} />
        <p className="text-[0.9375rem] leading-[1.65] text-ink-dim">{app.description}</p>
        <ul className="flex flex-col gap-2">
          {app.highlights.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.875rem] leading-[1.55] text-ink">
              <CheckIcon className="mt-[0.2em] h-4 w-4 flex-none text-signal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <p className="text-[0.8125rem] font-medium text-ink-faint">{app.platforms}</p>
          {app.credit ? <p className="text-[0.8125rem] leading-[1.5] text-ink-faint">{app.credit}</p> : null}
          <AppLinks app={app} />
        </div>
      </TiltCard>
    </Reveal>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

/** An idea still being validated: one quiet row, no screenshot to oversell it. */
function ConceptRow({ app }: { app: App }) {
  return (
    <Reveal>
      <div className="glass-panel grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10 md:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-ink">{app.name}</h3>
          <p className="text-[0.9375rem] text-ink-dim">{app.kind}</p>
          <StatusChips app={app} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[0.9375rem] leading-[1.65] text-ink-dim">{app.description}</p>
          <p className="text-[0.8125rem] font-medium text-ink-faint">{app.platforms}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Apps() {
  const products = apps.filter((app) => app.status !== "concept");
  const concepts = apps.filter((app) => app.status === "concept");

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title={section.title}
      annotation={section.annotation}
    >
      <div className="mx-auto grid max-w-md grid-cols-1 items-stretch gap-6 md:gap-8 lg:max-w-none lg:grid-cols-3">
        {products.map((app, i) => (
          <AppCard key={app.name} app={app} index={i} />
        ))}
      </div>
      {concepts.length ? (
        <div className="mt-6 flex flex-col gap-6 md:mt-8">
          {concepts.map((app) => (
            <ConceptRow key={app.name} app={app} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
