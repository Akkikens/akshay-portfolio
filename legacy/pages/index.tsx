// pages/index.tsx
import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import ScreenSizeDetector from "../components/CustomComponents/ScreenSizeDetector";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useLenis } from "../hooks/useLenis";

// Above-the-fold components are statically imported — dynamic() would add a
// hydration chunk round-trip that delays the hero entrance.
import Header from "../components/Header/Header";
import MyName from "../components/Home/MyName/MyName";
import SocialMediaArround from "../components/Home/SocialMediaArround/SocialMediaArround";

// Code-split below-the-fold content. next/dynamic (not React.lazy) — in the
// pages router, React.lazy + Suspense renders fallback/content inconsistently
// between server and client, which throws hydration "text content does not
// match" errors.
const CinematicScrub = dynamic(
  () => import("../components/Home/CinematicScrub/CinematicScrub"),
  { ssr: false }
);
const AboutMe = dynamic(() => import("../components/Home/AboutMe/AboutMe"));
const WhereIHaveWorked = dynamic(
  () => import("../components/Home/WhereIHaveWorked/WhereIHaveWorked")
);
const SomethingIveContributed = dynamic(
  () => import("../components/Home/SomethingIveContributed/SomethingIveContributed")
);
const SomethingIveBuilt = dynamic(
  () => import("../components/Home/SomethingIveBuilt/SomethingIveBuilt")
);
const Certifications = dynamic(
  () => import("../components/Home/Certifications/Certifications")
);
const GetInTouch = dynamic(
  () => import("../components/Home/GetInTouch/GetInTouch")
);
const Testimonials = dynamic(
  () => import("../components/Home/Testimonials/Testimonials")
);

const Footer = dynamic(() => import("../components/Footer/Footer"));
const ChaosOverlay = dynamic(
  () => import("../components/Shared/ChaosOverlay/ChaosOverlay"),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("../components/Shared/ScrollProgress/ScrollProgress"),
  { ssr: false }
);
const WebVitalsMonitor = dynamic(
  () => import("../components/Shared/WebVitals/WebVitalsMonitor"),
  { ssr: false }
);

export default function Home() {
  // Inertia smooth scrolling (Lenis) + lenis-aware anchor clicks.
  // useLenis no-ops entirely under prefers-reduced-motion.
  useLenis();
  useSmoothScroll();

  useEffect(() => {
    // Safeguard against stuck overflow state (viewport is the scroller now)
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  // --- Meta ---
  const meta = {
    title: "Akshay Kalapgar — AI Agent Engineer · Multi-Agent Systems & MCP",
    description:
      "AI Agent Engineer with 4+ years shipping production agentic systems — multi-agent orchestration, agent harnesses, MCP servers, evals, and tool-use pipelines — plus the platform, observability, and infra that runs them. Claude/LLM tooling, Next.js, TypeScript, Python, Kubernetes, Terraform, AWS/GCP.",
    image: "https://akshaykalapgar.com/Portfolio-portrait-5.jpg",
    type: "website",
  };
  const isProd = process.env.NODE_ENV === "production";

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta name="keywords" content="AI Agent Engineer, Agentic AI Engineer, Multi-Agent Systems, AI Agents, Agent Orchestration, LLM Evals, Tool Use, Function Calling, MCP Servers, Model Context Protocol, Claude Code, Anthropic, LLM Tooling, RAG, Forward-Deployed Engineer, AI Platform Engineer, Full Stack Engineer, Observability, Datadog, OpenTelemetry, Kubernetes, Helm, Terraform, AWS, GCP, Next.js, TypeScript, Python, Node.js, PostgreSQL, CI/CD" />
        <meta name="author" content="Akshay Kalapgar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://akshaykalapgar.com" />
        <link rel="canonical" href="https://akshaykalapgar.com" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Akshay Kalapgar Portfolio" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@akshaykalapgar" />
        <meta name="twitter:creator" content="@akshaykalapgar" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="theme-color" content="#0a0e1a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Akshay Kalapgar",
              url: "https://akshaykalapgar.com",
              image: "https://akshaykalapgar.com/Portfolio-portrait-5.jpg",
              jobTitle: "AI Agent Engineer",
              description: meta.description,
              email: "mailto:akshay@climbtogether.co",
              address: {
                "@type": "PostalAddress",
                addressLocality: "San Francisco",
                addressRegion: "CA",
                addressCountry: "US",
              },
              sameAs: [
                "https://github.com/Akkikens",
                "https://www.linkedin.com/in/akshaykalapgar/",
              ],
              knowsAbout: [
                "AI Agents",
                "Multi-Agent Systems",
                "Agent Orchestration",
                "Model Context Protocol (MCP)",
                "LLM Evals",
                "Tool Use & Function Calling",
                "Claude Code",
                "Retrieval-Augmented Generation",
                "Kubernetes",
                "Terraform",
                "Observability (Datadog, OpenTelemetry)",
                "TypeScript",
                "Python",
              ],
            }),
          }}
        />
      </Head>

      <div className="relative min-h-screen w-full bg-AAprimary">
        <ScrollProgress />
        <Header finishedLoading={true} sectionsRef={null} />
        <MyName />
        <SocialMediaArround />
        <CinematicScrub />
        <AboutMe />
        <WhereIHaveWorked />
        <Certifications />
        <SomethingIveContributed />
        <SomethingIveBuilt />
        <Testimonials />
        <GetInTouch />
        <Footer
          githubUrl={"https://github.com/Akkikens/akshay-portfolio"}
          hideSocialsInDesktop={true}
        />
        <ChaosOverlay />
        {!isProd && <WebVitalsMonitor />}
        {!isProd && <ScreenSizeDetector />}
      </div>
    </>
  );
}
