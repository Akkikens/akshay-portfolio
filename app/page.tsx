import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Backdrop from "@/components/layout/Backdrop";
import JsonLd from "@/components/seo/JsonLd";
import { buildJsonLd } from "@/lib/jsonld";

import Hero from "@/components/sections/Hero";
import StatusStrip from "@/components/sections/StatusStrip";
import Apps from "@/components/sections/Apps";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Certifications from "@/components/sections/Certifications";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import CaseStudyCards from "@/components/sections/CaseStudyCards";

/**
 * One long scroll of glass over a soft luminous ground: the agent-engineer
 * pitch, the person, the work and proof, then the apps and the handoff.
 */
export default function Home() {
  return (
    <div id="top" className="relative min-h-screen w-full">
      <JsonLd data={buildJsonLd()} />
      <link rel="preload" as="image" href="/portrait-hero.webp" media="(min-width: 1024px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/portrait-avatar.webp" media="(max-width: 1023.98px)" fetchPriority="high" />
      <Backdrop />
      <Nav />
      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        <Hero />
        <StatusStrip />
        <About />
        <Experience />
        <section aria-labelledby="case-studies-title" className="relative pb-8 md:pb-12">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <p className="span-label">Case studies</p>
            <h2
              id="case-studies-title"
              className="mt-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-ink"
            >
              How the agent work was built
            </h2>
            <div className="mt-8">
              <CaseStudyCards />
            </div>
          </div>
        </section>
        <Projects />
        <OpenSource />
        <Certifications />
        <Testimonials />
        <Apps />
        <Contact />
      </main>
      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
}
