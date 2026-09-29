import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TraceRail from "@/components/layout/TraceRail";

import Hero from "@/components/sections/Hero";
import StatusStrip from "@/components/sections/StatusStrip";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Certifications from "@/components/sections/Certifications";
import Manifesto from "@/components/sections/Manifesto";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

import SylvaWorld from "@/components/worlds/SylvaWorld";
import KageWorld from "@/components/worlds/KageWorld";

/**
 * One long scroll through three worlds:
 *   1. the CRT boot log (hero)
 *   2. the living forest — the work (experience, projects, open source, credentials)
 *   3. the temple night — the person (profile, signals, handoff)
 * with "How I work" set on the bare void as the seam between the two scenes.
 */
export default function Home() {
  return (
    <div id="top" className="relative min-h-screen w-full bg-void">
      <Nav />
      <TraceRail />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <StatusStrip />
        <SylvaWorld>
          <Experience />
          <Projects />
          <OpenSource />
          <Certifications />
        </SylvaWorld>
        <Manifesto />
        <KageWorld>
          <About />
          <Testimonials />
          <Contact />
        </KageWorld>
      </main>
      <Footer />
    </div>
  );
}
