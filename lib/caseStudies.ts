/**
 * Case studies for /work/[slug]. Every claim here is sourced from the
 * experience, apps and contributions in lib/content.ts or from résumé.pdf.
 * Where those sources stop, the copy stays high level rather than adding
 * numbers or detail that aren't on record.
 */

export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  /** Short name for cards and breadcrumbs. */
  name: string;
  /** The page's H1. */
  title: string;
  /** <title>, without the site suffix. */
  metaTitle: string;
  /** Meta description, ~150 characters. */
  description: string;
  role: string;
  org: string;
  period: string;
  stack: string[];
  /** One paragraph shown under the H1 and on the cards. */
  summary: string;
  /** Headline numbers, only ones already on record. */
  stats: { value: string; label: string }[];
  sections: CaseStudySection[];
  links: { label: string; href: string }[];
  image?: { src: string; width: number; height: number; alt: string };
  /** ISO date for the sitemap and Article schema. */
  updated: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "goldi",
    name: "Goldi",
    title: "Goldi: a production AI career coach for 100K+ users",
    metaTitle: "Goldi case study: production AI career agent",
    description:
      "How Akshay Kalapgar built Goldi at Climb Together: a Claude-powered career coaching agent with tool calling, voice and SMS that reached 100K+ users.",
    role: "Full Stack Developer & AI Engineer",
    org: "Climb Together",
    period: "May 2025 to present",
    stack: ["Anthropic Claude", "OpenAI", "LangChain", "Hume AI", "Next.js", "TypeScript", "Twilio", "AWS Lambda", "PostgreSQL"],
    summary:
      "Goldi is an AI career assistant that teaches students a better way to land internships and jobs. I built the agent itself and much of the platform around it, from the conversation layer to onboarding, messaging and infrastructure. Goldi is supported by Google.org and Walmart.org.",
    stats: [
      { value: "100K+", label: "users reached" },
      { value: "35%", label: "lift in verified opt-ins" },
      { value: "28%", label: "more re-engagement" },
      { value: "50%", label: "lower cold-start latency" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Students looking for internships and first jobs need coaching that is personal and available whenever they are, at a scale no human team can staff. The coaching also has to meet students where they already are: on the web, on their phones and inside the tools they use to job hunt.",
        ],
      },
      {
        heading: "Approach",
        bullets: [
          "Built Goldi as a production career-coaching agent on Anthropic Claude, OpenAI and LangChain, with custom tool calling and multi-turn conversation handling.",
          "Added a voice mode with Hume AI, with natural interruption handling and tone-adaptive pacing.",
          "Built a WhatsApp and SMS consent and onboarding flow, plus real-time data pipelines for SMS nudges and behavior analytics.",
          "Built a Chrome extension (MV3 side panel, content script and auth bridge) that brings the agent into LinkedIn.",
          "Goldi is also available inside Claude as MCP connectors, so students can work with it from their own assistant.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "Next.js and TypeScript app with Clerk for auth and Twilio for messaging, built as a distributed onboarding system.",
          "Serverless backend on AWS Lambda with PostgreSQL and Drizzle ORM.",
          "Multi-playlist navigation with URL state, race-condition fixes and caching so the experience holds up at scale.",
          "CI/CD with automated testing, linting and environment-specific deploys to Vercel; Sentry for errors and PostHog for product analytics.",
        ],
      },
      {
        heading: "Results",
        bullets: [
          "Voice mode shipped to 100K+ users through a Walmart partnership.",
          "The onboarding system scaled to 100K+ users with a 35% lift in verified opt-ins.",
          "SMS nudges and the WhatsApp and SMS flow drove a 28% increase in re-engagement.",
          "The move to serverless cut cold-start latency by 50%.",
        ],
      },
    ],
    links: [{ label: "Visit Goldi", href: "https://goldi.climbtogether.co/" }],
    image: { src: "/goldi-preview.webp", width: 1200, height: 651, alt: "Goldi AI career assistant interface" },
    updated: "2026-10-20",
  },
  {
    slug: "mcp-servers",
    name: "MCP servers and Claude tooling",
    title: "MCP servers, Claude Code plugins and agent tooling",
    metaTitle: "MCP servers and Claude Code tooling case study",
    description:
      "Akshay Kalapgar's MCP tool harnesses and Claude Code plugins: 86 skills across 6 plugins for agent workflows, plus the platform that runs the agents.",
    role: "AI Platform Engineer (Contract)",
    org: "Softmax",
    period: "Nov 2025 to Apr 2026",
    stack: ["Claude Code", "Model Context Protocol", "Python", "Kubernetes", "Datadog", "OpenTelemetry", "Terraform", "PostgreSQL"],
    summary:
      "At Softmax I built the Claude Code plugins and MCP tool harnesses that let engineers hand real work to agents, and the platform pieces that keep agent workloads observable and reliable. It all fed into Metta AI, an open-source multi-agent reinforcement-learning platform.",
    stats: [
      { value: "86", label: "skills across 6 plugins" },
      { value: "1,180+", label: "commits to Metta AI" },
      { value: "21", label: "table PostgreSQL data layer" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Agents are only as useful as the tools they can call and the guardrails around them. The team needed agents that could do real engineering work (reviewing PRs, generating code, editing many files at once) and a platform that showed what those agents and training jobs were actually doing.",
        ],
      },
      {
        heading: "Approach",
        bullets: [
          "Built and maintained Claude Code plugins, 86 skills across 6 plugins, for the engineering team.",
          "Built MCP tool harnesses that power AI-assisted workflows: autonomous PR review, code generation and multi-file editing across the org.",
          "Built a tournament system with daily reporting cronjobs, error-log surfacing and diagnostic scoring to evaluate multi-agent RL policies.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "Observability pipeline on Datadog and OpenTelemetry (OTLP receivers, structured collectors) that replaced legacy monitoring.",
          "A Kubernetes watcher service for AI job lifecycle orchestration, with automated failure classification (timeout, OOM, policy error), stuck-job reconciliation and keep-main-green CI.",
          "Terraform for AWS (Lambda, Secrets Manager, IAM) behind the GitHub webhook integrations and deploy pipelines.",
          "A 21-table PostgreSQL schema with Alembic migrations and pre-deploy Helm jobs for zero-downtime releases.",
        ],
      },
      {
        heading: "Results",
        bullets: [
          "Agents took on PR review, code generation and multi-file edits for the engineering team.",
          "Job failures were classified automatically and stuck jobs reconciled without manual work.",
          "1,180+ commits shipped to the open-source Metta AI platform.",
        ],
      },
    ],
    links: [{ label: "Metta AI on GitHub", href: "https://github.com/Metta-AI/metta" }],
    updated: "2026-10-20",
  },
  {
    slug: "wingline",
    name: "Wingline",
    title: "Wingline: an AI texting assistant in the iPhone keyboard",
    metaTitle: "Wingline case study: on-device AI keyboard for iPhone",
    description:
      "Wingline, built by Akshay Kalapgar: an iPhone keyboard that writes replies, polishes drafts and drafts dating openers with on-device Apple Intelligence.",
    role: "Built and shipped on my own",
    org: "Wingline",
    period: "In public beta",
    stack: ["iOS keyboard extension", "Apple Intelligence", "App Attest"],
    summary:
      "Wingline is an AI texting assistant that lives in the iPhone keyboard. Copy a message and tap Reply for three options in your own texting style, tap Polish to clean up a draft without sounding like a robot, or get dating openers written from the other person's actual profile.",
    stats: [
      { value: "Beta", label: "free public beta on TestFlight" },
      { value: "On-device", label: "Apple Intelligence by default" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Most AI writing help lives in a separate app, which means copying, switching and pasting in the middle of a conversation. And people are rightly wary of anything that reads what they type.",
        ],
      },
      {
        heading: "Approach",
        bullets: [
          "Put the assistant where people already type: a full custom keyboard with autocorrect, predictions and an Apple-style emoji panel.",
          "Run on-device with Apple Intelligence; use the cloud only after the user opts in.",
          "Three modes: Reply, Polish and dating openers.",
        ],
      },
      {
        heading: "Architecture",
        bullets: [
          "iOS keyboard extension with on-device generation through Apple Intelligence.",
          "A backend used only for opted-in cloud requests, protected with App Attest and rate limits.",
          "Never logs keystrokes.",
        ],
      },
      {
        heading: "Status",
        bullets: ["Free public beta on TestFlight; the App Store version is in review."],
      },
    ],
    links: [
      { label: "getwingline.com", href: "https://getwingline.com" },
      { label: "Join the TestFlight beta", href: "https://testflight.apple.com/join/PKarSM94" },
    ],
    image: {
      src: "/apps/wingline-screen.webp",
      width: 540,
      height: 1173,
      alt: "Wingline keyboard showing three reply suggestions (casual, warm and direct) under a chat",
    },
    updated: "2026-10-20",
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
