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
 * Section shell: a small accent eyebrow (`01 · Apps`) with an optional
 * right-aligned annotation, then the display H2, then the body.
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
    <section id={id} className={`relative py-24 md:py-32 scroll-mt-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <p className="span-label whitespace-nowrap">
              {String(index).padStart(2, "0")} · {label}
            </p>
            <div aria-hidden className="h-px flex-1 bg-line-bright" />
            {annotation ? (
              <p className="hidden font-mono text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink-faint sm:block">
                {annotation}
              </p>
            ) : null}
          </div>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink text-balance">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
