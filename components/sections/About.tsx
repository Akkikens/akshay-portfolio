import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { about, sectionById } from "@/lib/content";

const aboutSection = sectionById("about");

/**
 * Profile trace-span (§5.4): bio + mission callout + mono skill cloud on the
 * left (7/12), a duotone fiducial-framed portrait on the right (5/12), and a
 * compact mono metrics readout spanning the full width beneath.
 */
export default function About() {
  return (
    <Section
      id={aboutSection.id}
      index={aboutSection.index}
      label={aboutSection.label}
      title={aboutSection.title}
      annotation={aboutSection.annotation}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8 lg:gap-14">
        {/* Bio, mission, skills */}
        <div className="order-2 md:order-1 md:col-span-7">
          <Reveal>
            <div className="glass-panel space-y-5 p-6 sm:p-8">
              {about.paragraphs.map((paragraph, i) => (
                <p
                  key={`about-p-${i}`}
                  className={
                    i === 0
                      ? "text-[1.25rem] leading-[1.6] text-ink"
                      : "text-base leading-[1.65] text-ink-dim"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel relative mt-8 overflow-hidden p-6 sm:p-8">
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-signal" />
              <p className="span-label">Mission</p>
              <p className="mt-3 text-balance text-[1.0625rem] leading-[1.65] text-ink">
                {about.mission}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="glass-panel mt-8 space-y-6 p-6 sm:p-8">
              {about.skillGroups.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-base font-medium uppercase tracking-[0.12em] text-ink-faint">
                    {group.label}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <span className="inline-flex items-center rounded-full border border-line px-3 py-1.5 font-mono text-[0.8125rem] text-ink-dim transition-colors duration-200 hover:border-signal hover:text-ink">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Portrait — duotone + fiducials */}
        <div className="order-1 md:order-2 md:col-span-5">
          <Reveal delay={0.1} className="md:sticky md:top-28">
            <div className="duotone-frame fiducials overflow-hidden rounded-2xl border border-line bg-raised">
              <img
                src={about.image.src}
                width={about.image.width}
                height={about.image.height}
                alt={about.image.alt}
                loading="lazy"
                className="block h-auto w-full object-cover"
              />
              <span className="fiducial-corners" aria-hidden />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Metrics — compact mono stat row */}
      <Reveal delay={0.2}>
        <div className="glass-panel mt-16 overflow-x-auto">
          <dl className="flex min-w-max">
            {about.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`flex flex-col gap-1.5 px-6 py-5 sm:px-8 ${
                  i === 0 ? "" : "border-l border-line"
                }`}
              >
                <dt className="order-2 whitespace-nowrap font-mono text-base font-medium uppercase tracking-[0.08em] text-ink-faint">
                  {metric.label}
                </dt>
                <dd className="order-1 m-0 font-mono text-2xl font-bold tracking-tight text-signal sm:text-[1.75rem]">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
