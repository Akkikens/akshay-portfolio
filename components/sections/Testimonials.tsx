import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { sectionById, testimonials } from "@/lib/content";

/**
 * §5.8 — Testimonials. Static editorial 2-col masonry (1-col mobile) of
 * glass quote cards: oversized amber quote glyph, quote body, author + role
 * in mono. Cards reveal on scroll with a light stagger.
 */
export default function Testimonials() {
  const section = sectionById("testimonials");

  return (
    <Section {...section}>
      <div className="columns-1 gap-6 md:columns-2 md:gap-8">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.author}
            delay={i * 0.07}
            className="mb-6 break-inside-avoid md:mb-8"
          >
            <figure className="glass-panel flex flex-col gap-5 p-8 md:p-10">
              <span
                aria-hidden
                className="font-display text-[3.75rem] leading-[0.6] text-signal/70 md:text-[4.25rem]"
              >
                &ldquo;
              </span>
              <blockquote className="text-[1.125rem] leading-[1.65] text-ink/90">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="flex flex-col gap-0.5 border-t border-line pt-5 font-mono text-[0.8125rem] tracking-[0.02em]">
                <span className="text-ink">{t.author}</span>
                <span className="text-ink-faint">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
