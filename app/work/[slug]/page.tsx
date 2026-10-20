import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Backdrop from "@/components/layout/Backdrop";
import Footer from "@/components/layout/Footer";
import SubpageHeader from "@/components/layout/SubpageHeader";
import CaseStudyCards from "@/components/sections/CaseStudyCards";
import JsonLd from "@/components/seo/JsonLd";
import { caseStudies, caseStudyBySlug } from "@/lib/caseStudies";
import { buildCaseStudyJsonLd } from "@/lib/jsonld";
import { shareImages, site } from "@/lib/site";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = caseStudyBySlug((await params).slug);
  if (!study) return {};
  const path = `/work/${study.slug}/`;
  return {
    title: study.metaTitle,
    description: study.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
      title: `${study.metaTitle} · ${site.name}`,
      description: study.description,
      images: shareImages.og,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.metaTitle} · ${site.name}`,
      description: study.description,
      images: shareImages.twitter,
    },
  };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * One case study: breadcrumb, a glass header card (H1, summary, stats,
 * links), the product image, then problem / approach / architecture /
 * results as glass panels, and links on to the other studies and home.
 * Fully server-rendered so every word is in the static HTML.
 */
export default async function CaseStudyPage({ params }: Props) {
  const study = caseStudyBySlug((await params).slug);
  if (!study) notFound();
  const tall = study.image && study.image.height > study.image.width;

  return (
    <div className="relative min-h-screen w-full">
      <JsonLd data={buildCaseStudyJsonLd(study)} />
      <Backdrop />
      <SubpageHeader />

      <main id="main" className="relative z-[1] mx-auto max-w-6xl px-6 pb-24 pt-28 md:px-10 md:pt-32">
        <nav aria-label="Breadcrumb" className="text-[0.875rem] text-ink-dim">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-signal">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/work/" className="hover:text-signal">Case studies</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">{study.name}</li>
          </ol>
        </nav>

        <header className="glass-strong mt-6 !rounded-[1.75rem] p-7 sm:p-10 md:p-12">
          <p className="span-label">
            {study.org} · {study.period}
          </p>
          <h1 className="mt-4 text-balance font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            {study.title}
          </h1>
          <p className="mt-3 text-[0.9375rem] font-medium text-ink-dim">{study.role}</p>
          <p className="mt-5 max-w-3xl text-pretty text-[1.0625rem] leading-[1.7] text-ink-dim">{study.summary}</p>

          {study.stats.length ? (
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-8">
              {study.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 text-[0.8125rem] text-ink-faint">{stat.label}</dt>
                  <dd className="order-1 m-0 font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-signal">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {study.links.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {study.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-5 text-[0.9375rem] font-semibold ${
                    i === 0
                      ? "bg-signal text-on-signal hover:bg-signal-bright"
                      : "border border-line-bright text-ink hover:border-signal hover:text-signal"
                  }`}
                >
                  {link.label}
                  <ArrowIcon />
                </a>
              ))}
            </div>
          ) : null}
        </header>

        <div className={`mt-8 grid gap-8 ${study.image ? (tall ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : "") : ""}`}>
          <div className="flex flex-col gap-6">
            {study.image && !tall ? (
              <figure className="glass-panel p-2">
                <img
                  src={study.image.src}
                  width={study.image.width}
                  height={study.image.height}
                  alt={study.image.alt}
                  decoding="async"
                  className="block h-auto w-full rounded-[0.9rem]"
                />
              </figure>
            ) : null}

            {study.sections.map((section) => (
              <section key={section.heading} className="glass-panel p-6 sm:p-8">
                <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-[1rem] leading-[1.7] text-ink-dim">
                    {p}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[1rem] leading-[1.65] text-ink-dim">
                        <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 flex-none rounded-full bg-signal" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="glass-panel p-6 sm:p-8">
              <h2 className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">Stack</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <li key={item} className="rounded-full border border-line-bright px-3 py-1.5 text-[0.875rem] text-ink-dim">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {study.image && tall ? (
            <figure className="order-first mx-auto w-full max-w-[16rem] lg:order-none lg:sticky lg:top-24 lg:self-start">
              <div className="phone-frame">
                <div className="phone-frame__screen">
                  <img
                    src={study.image.src}
                    width={study.image.width}
                    height={study.image.height}
                    alt={study.image.alt}
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </figure>
          ) : null}
        </div>

        <section aria-labelledby="more-work" className="mt-16">
          <h2 id="more-work" className="font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">
            More case studies
          </h2>
          <div className="mt-6">
            <CaseStudyCards exclude={study.slug} />
          </div>
          <p className="mt-10 text-[1rem] text-ink-dim">
            <Link href="/" className="font-semibold text-signal hover:text-signal-bright">
              Back to Akshay Kalapgar&apos;s homepage
            </Link>{" "}
            or{" "}
            <Link href="/#contact" className="font-semibold text-signal hover:text-signal-bright">
              get in touch about AI agent roles
            </Link>
            .
          </p>
        </section>
      </main>

      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}
