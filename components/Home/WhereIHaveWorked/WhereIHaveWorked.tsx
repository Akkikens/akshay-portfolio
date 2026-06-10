import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";

type Bullet = { text: string; keywords?: string[] };

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  date: string;
  bullets: Bullet[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "climb-together",
    company: "Climb Together",
    role: "Full Stack Developer & AI Engineer",
    location: "San Francisco, CA",
    date: "May 2025 – Present",
    bullets: [
      {
        text: "Built an AI-powered chatbot with LangChain, OpenAI, and Anthropic Claude; added voice via Hume AI for natural conversations.",
        keywords: ["LangChain", "OpenAI", "Anthropic Claude", "Hume AI"],
      },
      {
        text: "Drove architecture for a distributed onboarding system (Next.js, Clerk, Twilio) scaling to 100K+ users with a 35% lift in verified opt-ins.",
        keywords: ["Next.js", "Clerk", "Twilio", "distributed onboarding system"],
      },
      {
        text: "Built real-time data pipelines powering SMS nudges and behavior analytics, driving a 28% increase in feature re-engagement.",
        keywords: ["real-time data pipelines"],
      },
      {
        text: "Drove migration to serverless (AWS Lambda) and PostgreSQL with Drizzle ORM, cutting cold-start latency by 50%.",
        keywords: ["AWS Lambda", "PostgreSQL", "Drizzle ORM", "serverless"],
      },
      {
        text: "Set up CI/CD with automated testing, linting, and environment-specific deploys to Vercel; instrumented Sentry error tracking and PostHog product analytics.",
        keywords: ["CI/CD", "Vercel", "Sentry", "PostHog"],
      },
      {
        text: "Led architectural reviews enforcing modular design, code ownership, and performance benchmarks.",
        keywords: ["architectural reviews"],
      },
    ],
  },
  {
    id: "softmax",
    company: "Softmax",
    role: "AI Platform Engineer (Contract)",
    location: "San Francisco, CA",
    date: "Nov 2025 – Apr 2026",
    bullets: [
      {
        text: "Built and maintained Claude Code plugins (86 skills across 6 plugins) and MCP tool harnesses powering AI-assisted dev workflows — autonomous PR review, code generation, and multi-file editing across the org.",
        keywords: ["Claude Code", "MCP tool harnesses", "86 skills across 6 plugins"],
      },
      {
        text: "Designed a production observability pipeline (Datadog + OpenTelemetry: OTLP receivers, structured collectors), replacing legacy monitoring for a multi-agent RL training platform.",
        keywords: ["Datadog", "OpenTelemetry", "OTLP", "multi-agent RL"],
      },
      {
        text: "Built a Kubernetes watcher service for AI job lifecycle orchestration — automated failure classification (timeout/OOM/policy_error), stuck-job reconciliation, and keep-main-green CI.",
        keywords: ["Kubernetes", "failure classification", "keep-main-green CI"],
      },
      {
        text: "Engineered Terraform IaC for AWS (Lambda, Secrets Manager, IAM) powering GitHub webhook integrations and deploy pipelines.",
        keywords: ["Terraform", "AWS", "Lambda", "Secrets Manager", "IAM"],
      },
      {
        text: "Built a tournament system with daily reporting cronjobs, error-log surfacing, and diagnostic scoring to evaluate multi-agent RL policy performance.",
        keywords: ["tournament system", "diagnostic scoring"],
      },
      {
        text: "Owned the data layer: 21-table PostgreSQL schema with Alembic migrations and SQLModel ORM; pre-deploy Helm migration jobs for zero-downtime releases.",
        keywords: ["PostgreSQL", "Alembic", "SQLModel", "Helm", "zero-downtime", "21-table"],
      },
      {
        text: "Shipped 1,180+ commits to the Metta AI open-source multi-agent RL platform.",
        keywords: ["Metta AI", "open-source"],
      },
    ],
  },
  {
    id: "umass-chan",
    company: "UMass Chan",
    role: "Software Engineer Intern",
    location: "Boston, MA",
    date: "May 2024 – Jan 2025",
    bullets: [
      {
        text: "Led implementation of Factorbook 2.0 (React, Next.js, GraphQL), improving First Contentful Paint by 40%.",
        keywords: ["Factorbook 2.0", "React", "Next.js", "GraphQL"],
      },
      {
        text: "Integrated real-time dashboards with Prometheus to monitor distributed job queues and system health.",
        keywords: ["Prometheus", "distributed job queues"],
      },
      {
        text: "Wrote 500+ unit and integration tests with Jest and Playwright, maintaining 98%+ coverage.",
        keywords: ["Jest", "Playwright"],
      },
      {
        text: "Ran sprints, standups, and retros for a 6-person agile pod; built data-heavy genomic visualizations.",
        keywords: ["genomic visualizations", "agile pod"],
      },
    ],
  },
  {
    id: "capgemini",
    company: "Capgemini",
    role: "Full Stack Engineer",
    location: "Mumbai, India",
    date: "Aug 2021 – Aug 2023",
    bullets: [
      {
        text: "Built 10+ microservices (Java, Spring Boot) for BMW's global platform — 200K+ users, 99.9% uptime, and a 55% performance gain.",
        keywords: ["Java", "Spring Boot", "BMW", "microservices"],
      },
      {
        text: "Built e-commerce modules with React, Redux, and Webpack, cutting page load times by 50%.",
        keywords: ["React", "Redux", "Webpack"],
      },
      {
        text: "Migrated a legacy monolith to Vue.js, improving performance by 40%.",
        keywords: ["Vue.js", "legacy monolith"],
      },
      {
        text: "Owned CI/CD with Jenkins and Docker, reducing manual deploy effort by 70%; mentored 4 junior developers.",
        keywords: ["Jenkins", "Docker", "CI/CD"],
      },
    ],
  },
  {
    id: "tag8",
    company: "tag8",
    role: "Software Engineer",
    location: "Mumbai, India",
    date: "Aug 2020 – Aug 2021",
    bullets: [
      {
        text: "Integrated Redis caching and Elasticsearch with a Django backend, cutting database query latency by 60% and powering real-time dashboards.",
        keywords: ["Redis", "Elasticsearch", "Django", "real-time dashboards"],
      },
      {
        text: "Lifted customer satisfaction by 25% through a UI/UX redesign of high-traffic flows.",
        keywords: ["UI/UX redesign"],
      },
    ],
  },
  {
    id: "kpmg",
    company: "KPMG",
    role: "Software Engineer Intern",
    location: "Mumbai, India",
    date: "Jul 2020 – Dec 2020",
    bullets: [
      {
        text: "Shipped 30+ CRM feature enhancements in Java; contributed to distributed application architecture and data-handling compliance.",
        keywords: ["Java", "CRM", "distributed application architecture", "compliance"],
      },
    ],
  },
];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Metrics (35%, 100K+, 1,180+, 99.9%, -50%…) get bold mono accent; tech keywords get cyan.
const METRIC_REGEX = /([+\-−]?\d[\d,]*(?:\.\d+)?(?:[KM])?(?:%\+?|\+)|\d[\d,]*(?:\.\d+)?%)/g;

const highlightBullet = (text: string, keywords: string[] = []) => {
  let html = text.replace(
    METRIC_REGEX,
    (m) => `<span class="font-mono font-semibold text-AAaccent">${m}</span>`
  );
  if (keywords.length > 0) {
    const regex = new RegExp(keywords.map(escapeRegex).join("|"), "g");
    html = html.replace(regex, (m) => `<span class="text-AAsecondary">${m}</span>`);
  }
  return html;
};

export default function WhereIHaveWorked() {
  const [activeId, setActiveId] = React.useState(EXPERIENCES[0].id);
  const prefersReducedMotion = useReducedMotion();
  const active = EXPERIENCES.find((e) => e.id === activeId) ?? EXPERIENCES[0];

  return (
    <div
      id="WhereIhaveWorkedSection"
      className="flex flex-col items-center justify-center py-20 sm:py-28 space-y-12 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-1/4 left-1/4 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={55} />
      <ParallaxBlob className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={-40} />

      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="Where I've Worked"
        className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8"
      />

      {/* Content */}
      <section className="relative flex flex-col md:flex-row space-y-8 md:space-y-0 items-start w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Company tabs */}
        <div
          className="w-full md:w-56 md:mr-12 flex-shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide gap-1 pb-2 md:pb-0 md:border-l md:border-white/[0.08]"
          role="tablist"
          aria-label="Companies"
          aria-orientation="vertical"
        >
          {EXPERIENCES.map((exp) => {
            const isActive = exp.id === activeId;
            return (
              <button
                key={exp.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`experience-panel-${exp.id}`}
                onClick={() => setActiveId(exp.id)}
                className={`relative flex-none md:w-full text-left text-xs sm:text-sm font-medium py-3 px-5 whitespace-nowrap rounded-xl md:rounded-l-none md:rounded-r-xl transition-colors duration-200 cursor-pointer min-w-[140px] sm:min-w-[160px] md:min-w-0
                  ${
                    isActive
                      ? "text-AAsecondary bg-AAsecondary/[0.08]"
                      : "text-AAsubtext hover:text-AAtext hover:bg-white/[0.04]"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCompanyIndicator"
                    className="absolute left-0 bottom-0 md:bottom-auto md:top-0 h-0.5 w-full md:h-full md:w-0.5 bg-gradient-to-r md:bg-gradient-to-b from-AAsecondary to-AAaccent rounded-full"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                )}
                {exp.company}
              </button>
            );
          })}
        </div>

        {/* Active experience panel */}
        <motion.div
          key={active.id}
          id={`experience-panel-${active.id}`}
          role="tabpanel"
          className="flex-1 w-full min-w-0 min-h-[280px]"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-AAtext text-lg sm:text-xl md:text-2xl font-bold">
                {active.role}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                <span className="text-AAsecondary font-semibold text-base sm:text-lg">
                  @ {active.company}
                </span>
                <span className="hidden sm:block w-1.5 h-1.5 bg-AAaccent rounded-full" />
                <span className="font-mono text-xs sm:text-sm text-AAsubtext">{active.date}</span>
                <span className="hidden sm:block w-1.5 h-1.5 bg-AAaccent rounded-full" />
                <span className="font-mono text-xs sm:text-sm text-AAsubtext">
                  {active.location}
                </span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-2 sm:space-y-3 list-none">
              {active.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  className="flex flex-row space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:border-AAsecondary/30 hover:bg-white/[0.05] transition-colors duration-200"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : idx * 0.04 }}
                >
                  <ArrowIcon className="h-3.5 w-3.5 mt-1.5 flex-none text-AAsecondary" />
                  <span
                    className="text-AAtext text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: highlightBullet(bullet.text, bullet.keywords),
                    }}
                  />
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
