import React from "react";
import Img from "../../../components/smallComp/image/Img";
import ArrowIcon from "../../../components/Icons/ArrowIcon";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";
import Reveal from "../../Shared/Motion/Reveal";

// Inline SVG section icons (Heroicons outline paths) — no emoji icons
const SectionIcon = ({ d, className }: { d: string; className?: string }) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const ICON_PATHS = {
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  stack:
    "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
  code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  target:
    "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0-4.5h.008v.008H12V12z",
};

// Modern Dark surface language: translucent glass + hairline borders
const glassCard =
  "rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-colors duration-200 hover:border-AAsecondary/30 hover:bg-white/[0.05]";

export default function AboutMe() {
  const technologies: string[][] = [
    ["Claude Code & MCP", "Anthropic / OpenAI APIs", "LangChain", "Hume AI", "Multi-Agent RL", "Prompt Engineering"],
    ["TypeScript / JavaScript", "Python", "Java", "C#", "SQL", "C++"],
    ["Next.js / React", "Node.js", "Django", "Spring Boot", "GraphQL / REST", "PostgreSQL (Drizzle ORM)"],
    ["AWS (Lambda, S3, EC2)", "GCP", "Kubernetes & Helm", "Terraform", "Docker", "GitHub Actions CI/CD"],
  ];

  const quickSnapshot = [
    "100K+ users scaled",
    "1,180+ OSS commits",
    "86 Claude Code skills",
    "500+ tests written",
    "99.9% uptime",
    "-50% cold-start latency",
  ];

  const systemsPlatform = [
    "AI Agents & Tool Harnesses",
    "Claude Code & MCP Servers",
    "Multi-Agent Systems",
    "Production AI Deployment",
    "Observability (Datadog, OpenTelemetry)",
    "Kubernetes & Helm",
    "Terraform IaC",
    "CI/CD Automation",
    "Distributed Systems",
    "LLM Prompt & Context Strategies",
  ];

  const keyBullets = [
    "Build AI agent harnesses, Claude Code plugins, and MCP servers that power autonomous PR review, code generation, and multi-file editing across engineering orgs.",
    "Design production observability pipelines with Datadog and OpenTelemetry — OTLP receivers, structured collectors, automated failure classification.",
    "Drive platform infrastructure with Kubernetes, Helm, and Terraform: job lifecycle orchestration, zero-downtime migrations, keep-main-green CI.",
    "Architect distributed systems at scale — onboarding flows for 100K+ users, real-time data pipelines, serverless backends on AWS Lambda with PostgreSQL.",
    "Ship full-stack product fast: Next.js, TypeScript, Node.js, Python — with the testing, monitoring, and CI/CD discipline to keep it reliable.",
  ];

  return (
    <div
      id="aboutSection"
      className="flex flex-col items-center py-20 sm:py-28 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-0 right-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={60} />
      <ParallaxBlob className="absolute bottom-0 left-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={-45} />

      <div className="relative w-full max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 xl:px-12 space-y-12">
        <SectionHeader index="01" eyebrow="About" title="About Me" />

        {/* Intro text + portrait */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,70ch)_340px] lg:grid-cols-[minmax(0,76ch)_360px] gap-y-10 md:gap-x-12 lg:gap-x-16 xl:gap-x-20">
          <div className="space-y-5 text-[15px] leading-[1.75] md:pr-6">
            <Reveal>
              <p className="text-AAsubtext">
                Hello! I&apos;m Akshay, an{" "}
                <span className="text-AAsecondary">AI agent engineer</span> with 4+ years of
                full-stack &amp; platform experience building scalable, real-time, production AI
                systems. I hold an{" "}
                <span className="text-AAsecondary">
                  M.S. in Computer Science from Clark University
                </span>{" "}
                (GPA 3.8, May 2025) and a B.E. in Information Technology from the University of
                Mumbai (GPA 3.6).
              </p>
            </Reveal>

            <Reveal index={1}>
              <p className="text-AAsubtext">
                Most recently I worked as an{" "}
                <span className="text-AAsecondary">AI Platform Engineer at Softmax</span> —
                building Claude Code plugins, MCP tool harnesses, and the observability and
                Kubernetes infrastructure behind a multi-agent RL training platform — while at{" "}
                <span className="text-AAsecondary">Climb Together</span> I drive architecture for
                an AI-powered onboarding platform serving 100K+ users.
              </p>
            </Reveal>

            <Reveal index={2}>
              <p className="text-AAsubtext">
                I thrive <span className="text-AAsecondary">forward-deployed</span>: embedded with
                customers in fast-paced environments, owning problems from infrastructure to UI
                and shipping production systems on the ground.
              </p>
            </Reveal>

            <Reveal index={3}>
              <ul className="list-none space-y-2">
                {keyBullets.map((b, i) => (
                  <li key={i} className="flex items-start">
                    <ArrowIcon className="h-3 w-3 mt-1.5 flex-none text-AAsecondary" />
                    <span className="ml-2 text-AAtext">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Portrait — sticky on desktop, centered on mobile */}
          <Reveal className="relative mx-auto md:mx-0 md:justify-self-end md:sticky md:top-24">
            <figure className="relative w-56 sm:w-64 md:w-[300px] lg:w-[320px] xl:w-[360px]">
              <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 hover:ring-AAsecondary/50 hover:shadow-2xl hover:shadow-AAsecondary/20">
                <div className="relative w-full aspect-[4/5]">
                  <Img
                    src={"/Portfolio-portrait-5.jpg"}
                    className="object-cover w-full h-full rounded-2xl"
                    alt="Akshay Kalapgar portrait"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl translate-x-3 translate-y-3 border border-AAsecondary/30" />
            </figure>
          </Reveal>
        </div>

        {/* Signature Highlights — bento grid, no pinning, no dead scroll */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
          <Reveal className="md:col-span-5" index={0}>
            <div className={`${glassCard} h-full p-6 lg:p-7`}>
              <h4 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-AAtext">
                <SectionIcon d={ICON_PATHS.bolt} className="w-5 h-5 text-AAsecondary" />
                Quick Snapshot
              </h4>
              <div className="flex flex-wrap gap-2">
                {quickSnapshot.map((item) => (
                  <span
                    key={item}
                    className="font-mono rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs sm:text-sm text-AAtext"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" index={1}>
            <div className={`${glassCard} h-full p-6 lg:p-7`}>
              <h4 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-AAtext">
                <SectionIcon d={ICON_PATHS.stack} className="w-5 h-5 text-AAaccent" />
                Systems &amp; Platform
              </h4>
              <div className="flex flex-wrap gap-2">
                {systemsPlatform.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs sm:text-sm text-AAtext"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" index={2}>
            <div className={`${glassCard} h-full p-6 lg:p-7`}>
              <h4 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-AAtext">
                <SectionIcon d={ICON_PATHS.code} className="w-5 h-5 text-AAsecondary" />
                Technologies I Use
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {technologies.map((group, gi) => (
                  <div key={gi} className="flex flex-col space-y-2.5">
                    {group.map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <ArrowIcon className="h-3 w-3 flex-none text-AAsecondary" />
                        <span className="text-sm text-AAtext">{tech}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" index={3}>
            <div className="h-full rounded-2xl border border-AAsecondary/30 bg-gradient-to-br from-AAsecondary/[0.08] to-AAaccent/[0.06] p-6 lg:p-7 transition-colors duration-200 hover:border-AAsecondary/50">
              <h4 className="mb-3 flex items-center gap-2.5 text-lg font-bold text-AAtext">
                <SectionIcon d={ICON_PATHS.target} className="w-5 h-5 text-AAaccent" />
                Mission Next
              </h4>
              <p className="leading-relaxed text-AAtext">
                Looking for{" "}
                <span className="font-semibold text-AAaccent">
                  AI agent, platform, and forward-deployed engineering
                </span>{" "}
                roles where I can build{" "}
                <span className="font-semibold text-AAsecondary">
                  multi-agent systems, harnesses, evals, and observability
                </span>{" "}
                that ship production AI — embedded with customers, with high ownership.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
