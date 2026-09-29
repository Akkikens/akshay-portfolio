import Reveal from "@/components/ui/Reveal";
import { method, sectionById } from "@/lib/content";

const section = sectionById("method");

/**
 * "How I work" — the seam between the two worlds. Three statements on the
 * bare void, set large, with a mono index and a hairline that reads as a
 * trace between them. No panels, no imagery: it lets the forest fade out
 * fully before the temple night fades in.
 */
export default function Manifesto() {
  return (
    <section id={section.id} className="relative scroll-mt-24 bg-void py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <p className="span-label whitespace-nowrap">
              TRACE {String(section.index).padStart(3, "0")} — {section.label}
            </p>
            <div aria-hidden className="h-px flex-1 bg-line" />
            {section.annotation ? (
              <p className="hidden font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink-faint sm:block">
                {section.annotation}
              </p>
            ) : null}
          </div>
          <h2 className="sr-only">{section.title}</h2>
        </Reveal>

        <ol className="mt-14 divide-y divide-line border-y border-line md:mt-20">
          {method.phases.map((phase, i) => (
            <li key={phase.title}>
              <Reveal delay={i * 0.08} y={28}>
                <div className="grid gap-4 py-10 md:grid-cols-12 md:items-baseline md:gap-8 md:py-14">
                  <span
                    aria-hidden
                    className="font-mono text-[0.8125rem] font-medium tracking-[0.12em] text-signal md:col-span-2"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.025em] text-ink text-balance md:col-span-7">
                    {phase.title}
                  </p>
                  <p className="font-mono text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.12em] text-ink-dim md:col-span-3 md:text-right">
                    {phase.sub}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
