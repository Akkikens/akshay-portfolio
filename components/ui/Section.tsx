import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  index: number;
  label: string;
  title: string;
  annotation?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Trace-span section shell: mono `TRACE 00N — label` eyebrow with hairline
 * rule and optional right-aligned annotation, then the display H2, then body.
 */
export default function Section({
  id,
  index,
  label,
  title,
  annotation,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-28 md:py-40 scroll-mt-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <p className="span-label whitespace-nowrap">
              TRACE {String(index).padStart(3, "0")} — {label}
            </p>
            <div aria-hidden className="h-px flex-1 bg-line" />
            {annotation ? (
              <p className="hidden font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink-faint sm:block">
                {annotation}
              </p>
            ) : null}
          </div>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink text-balance">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
