import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Backdrop from "@/components/layout/Backdrop";

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

/**
 * One long scroll of glass over a soft luminous ground: the agent-engineer
 * pitch, the person, the work and proof, then the apps and the handoff.
 */
export default function Home() {
  return (
    <div id="top" className="relative min-h-screen w-full">
      <Backdrop />
      <Nav />
      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        <Hero />
        <StatusStrip />
        <About />
        <Experience />
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
