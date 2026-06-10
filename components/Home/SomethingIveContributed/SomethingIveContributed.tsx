import React from "react";
import { useState } from "react";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";

export default function SomethingIveContributed() {
  const [activeTab, setActiveTab] = useState("Metta");

  const contributions: Record<string, {
    title: string;
    company: string;
    description: string;
    techStack: string[];
    image?: string | null;
    githubLink: string;
    liveLink: string;
  }> = {
    Metta: {
      title: "Metta AI - Multi-Agent RL Platform",
      company: "Softmax",
      description:
        "Shipped 1,180+ commits to Metta AI, an open-source multi-agent reinforcement learning platform. Built Claude Code plugins (86 skills across 6 plugins) and MCP tool harnesses for AI-assisted dev workflows, a Kubernetes watcher service for AI job lifecycle orchestration with automated failure classification, a Datadog + OpenTelemetry observability pipeline, and the 21-table PostgreSQL data layer with Alembic migrations and zero-downtime Helm migration jobs.",
      techStack: ["Python", "Claude Code", "MCP", "Kubernetes", "Helm", "Terraform", "Datadog", "OpenTelemetry", "PostgreSQL", "Multi-Agent RL"],
      image: null,
      githubLink: "https://github.com/Metta-AI/metta",
      liveLink: "",
    },
    Goldi: {
      title: "Goldi - AI Career Assistant",
      company: "Climb Together",
      description:
        "Core engineer on an AI-powered career assistant that teaches students a better way to land internships and jobs. Built the conversational AI with LangChain, OpenAI, and Anthropic Claude, added natural voice conversations via Hume AI, and drove the distributed onboarding architecture (Next.js, Clerk, Twilio) that scaled to 100K+ users. Supported by Google.org, Walmart.org, and university partners.",
      techStack: ["Next.js", "TypeScript", "LangChain", "OpenAI", "Anthropic Claude", "Hume AI", "Clerk", "Twilio", "PostgreSQL"],
      image: "/goldi-preview.png",
      githubLink: "https://github.com/climb-together/goldi",
      liveLink: "https://goldi.climbtogether.co/",
    },
    Factorbook: {
      title: "Factorbook 2.0 - Genomic Research Platform",
      company: "UMass Chan Medical School",
      description:
        "Led implementation of Factorbook 2.0, a genomic research platform built with React, Next.js, and GraphQL — improving First Contentful Paint by 40%. Built data-heavy genomic visualizations, integrated Prometheus dashboards to monitor distributed job queues, and wrote 500+ unit and integration tests with Jest and Playwright at 98%+ coverage.",
      techStack: ["Next.js", "React", "TypeScript", "GraphQL", "VISX", "Material UI", "Prometheus", "Jest", "Playwright"],
      image: "/Factorbook.png",
      githubLink: "https://github.com/weng-lab/Factorbook2.0",
      liveLink: "https://factorbook2-0.vercel.app/",
    },
  };

  const activeContribution = contributions[activeTab];

  return (
    <div
      id="SomethingIveContributedSection"
      className="flex flex-col w-full py-20 sm:py-28 px-5 sm:px-8 md:px-16 lg:px-24 2xl:px-72 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-1/4 right-1/4 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={55} />
      <ParallaxBlob className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={-40} />

      <SectionHeader
        index="04"
        eyebrow="Open Source"
        title="Professional Contributions"
        className="relative"
      />

      {/* Tabs Section */}
      <div className="relative -mx-2 flex overflow-x-auto sm:flex-wrap sm:overflow-visible gap-3 mt-8 sm:mt-12 px-2 scrollbar-hide">
        {Object.keys(contributions).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-3 px-5 text-xs sm:text-sm rounded-xl font-medium transition-colors duration-200 backdrop-blur-sm min-w-[220px] sm:min-w-0 text-left whitespace-normal sm:whitespace-nowrap cursor-pointer border ${
              activeTab === key
                ? "bg-AAsecondary/[0.08] text-AAsecondary border-AAsecondary/30"
                : "text-AAsubtext hover:text-AAtext bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05]"
            }`}
          >
            {contributions[key].title}
          </button>
        ))}
      </div>

      {/* Active Contribution Content */}
      <div
        className={`relative grid ${
          activeContribution.image ? "md:grid-cols-12" : "md:grid-cols-6"
        } grid-cols-1 w-full mt-8 sm:mt-12 gap-6 sm:gap-8 md:gap-12`}
      >
        {/* Left Image Section */}
        {activeContribution.image && (
          <div className="col-span-12 md:col-span-7 flex items-center justify-center order-1 md:order-1">
            <div className="relative group">
              <Img
                src={activeContribution.image}
                alt={`${activeContribution.title} Screenshot`}
                className="w-full h-auto rounded-2xl shadow-2xl object-contain border border-AAborder group-hover:shadow-AAsecondary/20 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-AAsecondary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}

        {/* Right Content Section */}
        <div
          className={`${
            activeContribution.image ? "md:col-span-5" : "md:col-span-6"
          } flex flex-col space-y-6 order-2 md:order-2 min-w-0 w-full`}
        >
          <div className="rounded-2xl p-5 sm:p-6 md:p-7 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-AAtext text-base sm:text-lg md:text-xl font-bold">
                  {activeContribution.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-AAsecondary text-xs sm:text-sm md:text-base font-semibold">@ {activeContribution.company}</span>
                </div>
              </div>
              
              <p className="text-AAtext text-sm sm:text-base md:text-lg leading-relaxed">
                {activeContribution.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {activeContribution.techStack.map((tech, index) => (
                  <span key={index} className="font-mono text-AAtext px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs border border-white/[0.08] bg-white/[0.03] hover:border-AAsecondary/40 hover:text-AAsecondary transition-colors duration-200">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                {activeContribution.liveLink && (
                  <a
                    href={activeContribution.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-AAsecondary hover:text-AAaccent font-medium transition-colors duration-300 bg-AAsecondary/10 hover:bg-AAaccent/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-AAsecondary/30 hover:border-AAaccent/30 text-xs sm:text-sm"
                  >
                    <span>Visit Project</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {activeContribution.githubLink && (
                  <GithubIcon link={activeContribution.githubLink} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
