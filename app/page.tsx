import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TraceRail from "@/components/layout/TraceRail";

import Hero from "@/components/sections/Hero";
import StatusStrip from "@/components/sections/StatusStrip";
import About from "@/components/sections/About";
import Film from "@/components/sections/Film";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen w-full bg-void">
      <Nav />
      <TraceRail />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <StatusStrip />
        <About />
        <Film />
        <Experience />
        <Projects />
        <OpenSource />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
