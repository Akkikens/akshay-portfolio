import { caseStudies } from "@/lib/caseStudies";
import Link from "next/link";

/**
 * Glass cards linking to the /work/ case studies, used on the homepage and
 * /work/. No scroll reveal: these are the internal links, so they are
 * visible in the static HTML from the first paint.
 */
export default function CaseStudyCards({ exclude }: { exclude?: string }) {
  const items = caseStudies.filter((c) => c.slug !== exclude);
  return (
    <ul className={`grid gap-5 ${items.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {items.map((study) => (
        <li key={study.slug}>
            <Link
              href={`/work/${study.slug}/`}
              className="glass-panel group flex h-full flex-col gap-3 p-6 hover:border-line-bright"
            >
              <span className="text-[0.8125rem] font-medium text-ink-faint">
                {study.org} · {study.period}
              </span>
              <span className="font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-ink group-hover:text-signal">
                {study.title}
              </span>
              <span className="text-[0.9375rem] leading-[1.6] text-ink-dim">{study.description}</span>
              <span className="mt-auto pt-2 text-[0.9375rem] font-semibold text-signal">
                Read the {study.name} case study
              </span>
            </Link>
        </li>
      ))}
    </ul>
  );
}
