import React, { useState } from "react";
import Img from "../../../components/smallComp/image/Img";
import ArrowIcon from "../../../components/Icons/ArrowIcon";

export default function AboutMe() {
  const [expanded, setExpanded] = useState(false);

  const technologies: string[][] = [
    ["Next.js/React", "TypeScript/JavaScript", "React Native", "Tailwind CSS", "GraphQL/REST APIs", "AWS/Azure"],
    ["Node.js", "Java", "Python", "PostgreSQL/MySQL", "Docker/Kubernetes", "CI/CD (GitHub Actions/Jenkins)"],
    ["LangChain", "Hugging Face", "OpenAI", "PyTorch", "TensorFlow", "Scikit-learn"],
    ["MLflow", "Multi-agent Systems", "NLP", "Computer Vision", "MLOps", "AI/ML"],
  ];

  const systemsPlatform = [
    "System Design", "Scalability", "Distributed Queues",
    "Caching (CDN/Redis)", "Observability (OTel/Prometheus)",
    "Testing (Jest/Playwright)", "Security & Accessibility (WCAG)",
    "AI/ML Pipelines", "Agent Orchestration", "Model Deployment",
  ];

  const quickSnapshot = [
    "Perf: LCP/TTI budgets",
    "Scale: 100K+ users",
    "Reliability: SLOs/MTTR",
    "DX: 500+ tests",
    "AI: LangChain/Hugging Face",
    "ML: PyTorch/TensorFlow",
  ];

  const keyBulletsCore = [
    "Scaled React/Next surfaces with SSR + selective hydration; enforced perf budgets (LCP/TTI/TBT).",
    "Built AI-powered chatbots with LangChain, Hugging Face, and OpenAI APIs for 100K+ users.",
    "Migrated services to AWS serverless (Lambda + API GW) and cut cold-start latency ~50%.",
  ];

  const keyBulletsMore = [
    "End-to-end observability with OTel traces/metrics/logs; Grafana dashboards → faster MTTR.",
    "Event-driven pipelines (queues + Lambdas) for SMS nudges/analytics, lifting re-engagement ~28%.",
    "Built multi-agent AI systems with LangChain orchestration and Hugging Face model integration.",
    "Implemented ML pipelines with PyTorch/TensorFlow, achieving 99.5% accuracy in production models.",
    "API reliability: typed RPC clients, retries/circuit breakers; graceful degradation under load.",
    "Security & quality gates: SBOM/dependency policy, feature flags, canaries and safe rollbacks.",
  ];

  return (
    <div id="aboutSection" data-aos="fade-up" className="snap-start flex flex-col items-center py-16 sm:py-20 bg-AAprimary">
      {/* RIGHT-ALIGNED WRAPPER (desktop): push content toward the extreme right */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-8">
      {/* Section Header */}
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <ArrowIcon className="h-4 md:h-6 w-4 md:w-5 translate-y-[0.5px] text-AAsecondary" />
            <span className="text-AAsecondary font-Header text-sm sm:text-xl">01.</span>
            <span className="text-gray-200/90 font-bold tracking-wider text-lg sm:text-2xl pl-4">About Me</span>
          </div>
          <div className="bg-gray-400/40 h-px w-full sm:w-72 ml-4" />
        </div>

        {/* Desktop grid: tighter measure on text, sticky image on the far right */}
        <div className="hidden md:grid 
                 md:grid-cols-[minmax(0,70ch)_340px] 
                 lg:grid-cols-[minmax(0,76ch)_360px] 
                 md:gap-x-12 lg:gap-x-16 xl:gap-x-20">          {/* Text column with clean measure */}
          <div className="space-y-5 text-[15px] leading-[1.75] md:pr-6">
            <p className="font-Header text-justify text-gray-400">
              Hello! I'm Akshay, a <span className="text-AAsecondary">Full Stack Software Engineer</span> focused on building fast, reliable products.
              I earned a <span className="text-AAsecondary">B.E. in Information Technology</span> and{" "}
              <span className="text-AAsecondary">completed my M.S. in Computer Science (May 2025)</span>.
            </p>

            <p className="font-Header text-justify text-gray-400">
              I’ve shipped production software across healthcare, e-commerce and edtech at{" "}
              <span className="text-AAsecondary">Capgemini</span> and{" "}
              <span className="text-AAsecondary">UMass Chan Medical School</span>, with a focus on performance, reliability and developer experience.
            </p>

            <p className="font-Header text-justify text-gray-400">
              <span className="text-AAsecondary">Currently at Climb Together</span>, I lead web performance for large Next.js surfaces
              (SSR + selective hydration, code-splitting, perf budgets) and own SLI/SLOs with OTel-based RUM. On the backend, I help run
              an AWS serverless stack (Lambda, API Gateway, Postgres) and real-time pipelines for notifications/analytics. I also build
              AI-powered chatbots using LangChain, Hugging Face models, and OpenAI APIs for intelligent conversational experiences.
            </p>

            {/* Impact bullets */}
            <ul className="list-none space-y-2">
              {keyBulletsCore.map((b, i) => (
                <li key={i} className="flex items-start">
                  <ArrowIcon className="h-3 w-3 mt-1 text-AAsecondary" />
                  <span className="ml-2 text-gray-400">{b}</span>
                </li>
              ))}
              {expanded &&
                keyBulletsMore.map((b, i) => (
                  <li key={`m-${i}`} className="flex items-start">
                    <ArrowIcon className="h-3 w-3 mt-1 text-AAsecondary" />
                    <span className="ml-2 text-gray-400">{b}</span>
                  </li>
                ))}
            </ul>

            {/* Quick snapshot chips (recruiter-friendly) */}
            <div className="pt-1">
              <div className="text-gray-300/90 font-semibold mb-2">Quick snapshot</div>
              <div className="flex flex-wrap gap-2">
                {quickSnapshot.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-gray-300 bg-MobileNavBarColor/50 border border-MobileNavBarColor/70 rounded px-2 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Systems & Platform */}
            <div className="pt-2">
              <div className="text-gray-300/90 font-semibold mb-2">Systems & Platform</div>
              <div className="flex flex-wrap gap-2">
                {systemsPlatform.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-gray-300 bg-MobileNavBarColor/50 border border-MobileNavBarColor/70 rounded px-2 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech grid */}
            <div className="font-Header tracking-wide">
              <div className="text-gray-300/90 font-semibold mt-4 mb-2">Technologies I use</div>
              <div className="flex flex-row flex-wrap gap-x-12 gap-y-3">
                {technologies.map((group, gi) => (
                  <div key={gi} className="flex flex-col space-y-2">
                    {group.map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <ArrowIcon className="h-3 w-3 text-AAsecondary" />
                        <span className="text-gray-400 text-[13px]">{tech}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Show more / less */}
            <div className="pt-2">
              <button
                onClick={() => setExpanded((s) => !s)}
                className="text-AAsecondary hover:underline text-sm font-medium"
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            </div>

            {/* Target statement */}
            <p className="font-Header text-justify text-gray-400 pt-1">
              Targeting high-ownership roles at product-focused teams where I can drive web platform performance,
              build AI/ML systems with LangChain and Hugging Face, own services end-to-end, and mentor while shipping measurable wins.
            </p>
          </div>

          {/* Sticky portrait on the far right */}
          <div className="relative md:justify-self-end md:sticky md:top-24">
          <figure className="relative w-[300px] lg:w-[320px] xl:w-[360px]">
          <div className="rounded-lg overflow-hidden ring-2 ring-AAsecondary/70 ring-offset-4 ring-offset-AAprimary transition-transform duration-200 hover:translate-x-1.5 hover:translate-y-1.5">
                <div className="relative w-full aspect-[4/5]">
                  <Img
                    src={"/Portfolio-portrait-4.jpg"}
                    className="object-cover w-full h-full rounded-lg"
                    alt="Akshay portrait"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg translate-x-3 translate-y-3 border-2 border-AAsecondary/60" />
            </figure>
          </div>
        </div>

        {/* Mobile layout (unchanged) */}
        <div className="md:hidden space-y-6">
          <div className="space-y-5 sm:text-base text-sm leading-relaxed">
            <p className="font-Header text-justify text-gray-400">
              Hello! I'm Akshay, a <span className="text-AAsecondary">Full Stack Software Engineer</span> focused on building fast, reliable products.
              I earned a <span className="text-AAsecondary">B.E. in Information Technology</span> and{" "}
              <span className="text-AAsecondary">completed my M.S. in Computer Science (May 2025)</span>.
            </p>
            <p className="font-Header text-justify text-gray-400">
              I’ve shipped software at <span className="text-AAsecondary">Capgemini</span> and{" "}
              <span className="text-AAsecondary">UMass Chan Medical School</span> with a focus on performance, reliability and DX.
            </p>
          </div>

          <figure className="relative w-48 mx-auto">
            <div className="rounded-lg overflow-hidden ring-2 ring-AAsecondary/70 ring-offset-4 ring-offset-AAprimary">
              <div className="w-full aspect-[4/5]">
                <Img
                  src={"/Portfolio-portrait-4.jpg"}
                  className="object-cover w-full h-full rounded-lg"
                  alt="Akshay portrait"
                  loading="lazy"
                />
              </div>
            </div>
          </figure>

          {/* (The rest of the content stacks below on mobile, as before) */}
        </div>
      </div>
    </div>
  );
}
