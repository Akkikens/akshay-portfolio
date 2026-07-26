import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { sectionById, projects, type Project } from "@/lib/content";

const section = sectionById("projects");

/* ------------------------------- Icons ------------------------------- */
/* Inline SVG only — no emoji, no icon fonts. Stroke icons use 1.75 weight
   to match the rest of the site; the GitHub mark is the standard filled
   logo path. */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
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
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.91 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

/* ---------------------------- Sub-pieces ---------------------------- */

function TechChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-dim">
      {label}
    </span>
  );
}

function ProjectLinks({ project, size = "md" }: { project: Project; size?: "sm" | "md" }) {
  if (!project.github && !project.live) return null;
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const linkClass = `inline-flex ${dim} shrink-0 items-center justify-center rounded-lg border border-line text-ink-dim transition-colors hover:border-signal hover:text-signal-bright`;

  return (
    <div className="flex items-center gap-3">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — view source on GitHub`}
          className={linkClass}
        >
          <GithubIcon className={icon} />
        </a>
      ) : null}
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — view live`}
          className={linkClass}
        >
          <ExternalLinkIcon className={icon} />
        </a>
      ) : null}
    </div>
  );
}

/** First two `featured` projects: full-width alternating image/text rows. */
function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <Reveal delay={Math.min(index * 0.06, 0.18)}>
      <TiltCard className="overflow-hidden p-6 md:p-10">
        <div className={`grid items-center gap-8 md:gap-14 ${project.image ? "md:grid-cols-2" : ""}`}>
          {project.image ? (
            <div className={reversed ? "md:order-2" : ""}>
              <div className="glass-panel fiducials relative aspect-video overflow-hidden">
                <span aria-hidden className="fiducial-corners" />
                <img
                  src={project.image.src}
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  alt={`${project.name} screenshot`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}

          <div className={`flex flex-col gap-5 ${project.image && reversed ? "md:order-1" : ""}`}>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
            <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-ink">
              {project.name}
            </h3>
            <p className="text-[1.0625rem] leading-[1.65] text-ink-dim">{project.description}</p>
            <ProjectLinks project={project} />
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

/** Remaining projects: compact 3-col grid of TiltCards. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.25)}>
      <TiltCard className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <FolderIcon className="h-6 w-6 text-signal" />
          <ProjectLinks project={project} size="sm" />
        </div>
        <h3 className="font-display text-[1.125rem] font-semibold leading-snug text-ink">
          {project.name}
        </h3>
        <p className="line-clamp-2 text-[0.9375rem] leading-[1.6] text-ink-dim">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tech.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <Section
      id={section.id}
      index={section.index}
      label={section.label}
      title={section.title}
      annotation={section.annotation}
    >
      <div className="flex flex-col gap-8 md:gap-10">
        {featured.map((project, i) => (
          <FeaturedProject key={project.name} project={project} index={i} />
        ))}
      </div>

      {rest.length ? (
        <div className="mt-8 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 md:mt-10 md:gap-8 lg:grid-cols-3">
          {rest.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
