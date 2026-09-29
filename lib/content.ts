import { site } from "./site";

/**
 * Single source of content truth. Components import from here — no content
 * strings live in components. Edit this file to update the site's copy.
 */

export type SectionDef = {
  id: string;
  index: number;
  label: string;
  title: string;
  annotation?: string;
  nav?: string; // present = shows in nav, value = nav display name
};

export const sections: SectionDef[] = [
  { id: "experience", index: 1, label: "experience", title: "Where I've worked", annotation: "2020 — PRESENT", nav: "Experience" },
  { id: "projects", index: 2, label: "projects", title: "Things I've built", annotation: "SELECTED WORK", nav: "Projects" },
  { id: "opensource", index: 3, label: "open-source", title: "Contributions in production", annotation: "1,180+ COMMITS" },
  { id: "certifications", index: 4, label: "credentials", title: "Certifications", annotation: "VERIFIED" },
  { id: "film", index: 5, label: "showreel", title: "How I work" },
  { id: "about", index: 6, label: "profile", title: "Engineer, forward-deployed", annotation: "EST. 2020", nav: "About" },
  { id: "testimonials", index: 7, label: "signals", title: "What people say", annotation: "PEER REVIEW" },
  { id: "contact", index: 8, label: "handoff", title: "Get in touch", nav: "Contact" },
];

export const sectionById = (id: string): SectionDef => {
  const s = sections.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown section: ${id}`);
  return s;
};

export const hero = {
  status: "OPEN TO AI AGENT & FORWARD-DEPLOYED ROLES",
  eyebrow: "Hi, my name is",
  firstName: "Akshay",
  lastName: "Kalapgar",
  role: "AI Agent Engineer",
  tagline:
    "I build multi-agent systems, agent harnesses, and MCP servers — plus the evals, observability, and infrastructure that make agents reliable in production.",
  ctaPrimary: { label: "View the work", href: "#projects" },
  ctaSecondary: { label: "Résumé", href: site.resume },
  scrollCue: "SCROLL TO INSPECT TRACE",
};

export const status = [
  { key: "LOCATION", value: "San Francisco, CA" },
  { key: "FOCUS", value: "Multi-agent systems · MCP · Evals" },
  { key: "CURRENT", value: "AI Engineer @ Climb Together" },
  { key: "SCALE", value: "100K+ users in production" },
  { key: "UPTIME", value: "99.9%" },
  { key: "STATUS", value: "Open to agent & forward-deployed roles" },
];

export const about = {
  paragraphs: [
    "Hello! I'm Akshay, an AI agent engineer with 4+ years of full-stack & platform experience building scalable, real-time, production AI systems. I hold an M.S. in Computer Science from Clark University (GPA 3.8, May 2025) and a B.E. in Information Technology from the University of Mumbai (GPA 3.6).",
    "Most recently I worked as an AI Platform Engineer at Softmax — building Claude Code plugins, MCP tool harnesses, and the observability and Kubernetes infrastructure behind a multi-agent RL training platform — while at Climb Together I drive architecture for an AI-powered onboarding platform serving 100K+ users.",
    "I thrive forward-deployed: embedded with customers in fast-paced environments, owning problems from infrastructure to UI and shipping production systems on the ground.",
  ],
  mission:
    "Looking for AI agent, platform, and forward-deployed engineering roles where I can build multi-agent systems, harnesses, evals, and observability that ship production AI — embedded with customers, with high ownership.",
  metrics: [
    { value: "100K+", label: "users scaled" },
    { value: "1,180+", label: "OSS commits" },
    { value: "86", label: "Claude Code skills" },
    { value: "500+", label: "tests written" },
    { value: "99.9%", label: "production uptime" },
    { value: "−50%", label: "cold-start latency" },
  ],
  image: { src: site.portrait, width: 597, height: 938, alt: "Akshay Kalapgar portrait" },
  skillGroups: [
    {
      label: "AGENTS & LLM",
      skills: [
        "Claude Code & MCP",
        "Multi-Agent Orchestration",
        "Evals & Tool Use",
        "Anthropic / OpenAI APIs",
        "LangChain",
        "Hume AI",
        "Multi-Agent RL",
        "Prompt & Context Engineering",
      ],
    },
    {
      label: "LANGUAGES",
      skills: ["TypeScript / JavaScript", "Python", "Java", "C#", "SQL", "C++"],
    },
    {
      label: "PRODUCT & BACKEND",
      skills: [
        "Next.js / React",
        "Node.js",
        "Django",
        "Spring Boot",
        "GraphQL / REST",
        "PostgreSQL (Drizzle ORM)",
      ],
    },
    {
      label: "PLATFORM & INFRA",
      skills: [
        "AWS (Lambda, S3, EC2)",
        "GCP",
        "Kubernetes & Helm",
        "Terraform",
        "Docker",
        "GitHub Actions CI/CD",
        "Datadog",
        "OpenTelemetry",
      ],
    },
  ],
};

export type Job = {
  company: string;
  url?: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
};

export const jobs: Job[] = [
  {
    company: "Climb Together",
    url: "https://goldi.climbtogether.co/",
    title: "Full Stack Developer & AI Engineer",
    period: "May 2025 — Present",
    location: "San Francisco, CA",
    bullets: [
      "Built an AI-powered chatbot with LangChain, OpenAI, and Anthropic Claude; added voice via Hume AI for natural conversations.",
      "Drove architecture for a distributed onboarding system (Next.js, Clerk, Twilio) scaling to 100K+ users with a 35% lift in verified opt-ins.",
      "Built real-time data pipelines powering SMS nudges and behavior analytics, driving a 28% increase in feature re-engagement.",
      "Drove migration to serverless (AWS Lambda) and PostgreSQL with Drizzle ORM, cutting cold-start latency by 50%.",
      "Set up CI/CD with automated testing, linting, and environment-specific deploys to Vercel; instrumented Sentry error tracking and PostHog product analytics.",
      "Led architectural reviews enforcing modular design, code ownership, and performance benchmarks.",
    ],
  },
  {
    company: "Softmax",
    url: "https://github.com/Metta-AI/metta",
    title: "AI Platform Engineer (Contract)",
    period: "Nov 2025 — Apr 2026",
    location: "San Francisco, CA",
    bullets: [
      "Built and maintained Claude Code plugins (86 skills across 6 plugins) and MCP tool harnesses powering AI-assisted dev workflows — autonomous PR review, code generation, and multi-file editing across the org.",
      "Designed a production observability pipeline (Datadog + OpenTelemetry: OTLP receivers, structured collectors), replacing legacy monitoring for a multi-agent RL training platform.",
      "Built a Kubernetes watcher service for AI job lifecycle orchestration — automated failure classification (timeout/OOM/policy_error), stuck-job reconciliation, and keep-main-green CI.",
      "Engineered Terraform IaC for AWS (Lambda, Secrets Manager, IAM) powering GitHub webhook integrations and deploy pipelines.",
      "Built a tournament system with daily reporting cronjobs, error-log surfacing, and diagnostic scoring to evaluate multi-agent RL policy performance.",
      "Owned the data layer: 21-table PostgreSQL schema with Alembic migrations and SQLModel ORM; pre-deploy Helm migration jobs for zero-downtime releases.",
      "Shipped 1,180+ commits to the Metta AI open-source multi-agent RL platform.",
    ],
  },
  {
    company: "UMass Chan",
    url: "https://factorbook2-0.vercel.app/",
    title: "Software Engineer Intern",
    period: "May 2024 — Jan 2025",
    location: "Boston, MA",
    bullets: [
      "Led implementation of Factorbook 2.0 (React, Next.js, GraphQL), improving First Contentful Paint by 40%.",
      "Integrated real-time dashboards with Prometheus to monitor distributed job queues and system health.",
      "Wrote 500+ unit and integration tests with Jest and Playwright, maintaining 98%+ coverage.",
      "Ran sprints, standups, and retros for a 6-person agile pod; built data-heavy genomic visualizations.",
    ],
  },
  {
    company: "Capgemini",
    title: "Full Stack Engineer",
    period: "Aug 2021 — Aug 2023",
    location: "Mumbai, India",
    bullets: [
      "Built 10+ microservices (Java, Spring Boot) for BMW's global platform — 200K+ users, 99.9% uptime, and a 55% performance gain.",
      "Built e-commerce modules with React, Redux, and Webpack, cutting page load times by 50%.",
      "Migrated a legacy monolith to Vue.js, improving performance by 40%.",
      "Owned CI/CD with Jenkins and Docker, reducing manual deploy effort by 70%; mentored 4 junior developers.",
    ],
  },
  {
    company: "tag8",
    title: "Software Engineer",
    period: "Aug 2020 — Aug 2021",
    location: "Mumbai, India",
    bullets: [
      "Integrated Redis caching and Elasticsearch with a Django backend, cutting database query latency by 60% and powering real-time dashboards.",
      "Lifted customer satisfaction by 25% through a UI/UX redesign of high-traffic flows.",
    ],
  },
  {
    company: "KPMG",
    title: "Software Engineer Intern",
    period: "Jul 2020 — Dec 2020",
    location: "Mumbai, India",
    bullets: [
      "Shipped 30+ CRM feature enhancements in Java; contributed to distributed application architecture and data-handling compliance.",
    ],
  },
];

export type Project = {
  name: string;
  featured?: boolean;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: { src: string; width: number; height: number };
};

export const projects: Project[] = [
  {
    name: "DevDiagrams — Interactive Learning Platform",
    featured: true,
    description:
      "Interactive learning platform built with Next.js 15 and React, featuring comprehensive UI components from Radix UI. Integrated Supabase for authentication and real-time data management, with Stripe and Razorpay for payment processing. Includes PDF processing, AI-powered features using OpenAI, and real-time notifications — optimized with Vercel Speed Insights.",
    tech: ["Next.js", "TypeScript", "Supabase", "Radix UI", "OpenAI", "Stripe", "Tailwind CSS"],
    github: "https://github.com/Akkikens/devdiagrams",
    live: "https://devdiagrams.app",
    image: { src: "/devdiagrams.webp", width: 1200, height: 675 },
  },
  {
    name: "AI Chatbot Platform",
    featured: true,
    description:
      "Advanced AI chat application built with Next.js, React, and Supabase. LangChain conversational AI, Hugging Face models for specialized NLP tasks, and OpenAI integration for intelligent responses — with real-time analytics, conversation memory, and multi-agent orchestration.",
    tech: ["Next.js", "React", "Supabase", "LangChain", "Hugging Face", "OpenAI", "Docker"],
    github: "https://github.com/akkikens/ui-chatbot",
    image: { src: "/screenshot.webp", width: 1200, height: 675 },
  },
  {
    name: "Advanced ML Pipeline & Agent System",
    description:
      "End-to-end ML pipeline with multi-agent orchestration: data preprocessing, PyTorch/TensorFlow training, evaluation pipelines, and deployment automation. Agent-based systems for automated data processing, model validation, and intelligent decision-making.",
    tech: ["Python", "LangChain", "Hugging Face", "PyTorch", "MLflow", "Kubernetes"],
  },
  {
    name: "AI-Powered Career Platform",
    description:
      "Intelligent web application connecting Clark University students with alumni for career guidance — LangChain matching, Hugging Face resume analysis, and OpenAI-personalized recommendations. Reduced manual effort by 80%.",
    tech: ["Python", "Django", "PostgreSQL", "LangChain", "OpenAI", "Docker"],
  },
  {
    name: "Clark Marketplace",
    description:
      "React Native app for Clark University students to buy, sell, and trade within a secure campus ecosystem — authentication, listings, search filters, and real-time messaging on AWS.",
    tech: ["React Native", "AWS", "Node.js", "Express", "Amazon RDS"],
    github: "https://github.com/Akkikens/marketplace",
  },
  {
    name: "AWS Serverless Architecture",
    description:
      "Scalable, cost-effective cloud-native applications built for the AWS Developer Associate certification — Lambda, DynamoDB, and API Gateway patterns run the same way in my production work.",
    tech: ["AWS Lambda", "DynamoDB", "API Gateway"],
    live: "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
  },
];

export type Contribution = {
  name: string;
  org: string;
  description: string;
  tech: string[];
  url: string;
  github?: string;
};

export const contributions: Contribution[] = [
  {
    name: "Metta AI — Multi-Agent RL Platform",
    org: "Softmax",
    description:
      "1,180+ commits to an open-source multi-agent reinforcement-learning platform: Claude Code plugins (86 skills across 6 plugins), MCP tool harnesses, a Kubernetes job-lifecycle watcher with automated failure classification, a Datadog + OpenTelemetry observability pipeline, and the 21-table PostgreSQL data layer with zero-downtime Helm migrations.",
    tech: ["Python", "Claude Code", "MCP", "Kubernetes", "Datadog", "PostgreSQL"],
    url: "https://github.com/Metta-AI/metta",
    github: "https://github.com/Metta-AI/metta",
  },
  {
    name: "Goldi — AI Career Assistant",
    org: "Climb Together",
    description:
      "Core engineer on an AI career assistant that teaches students a better way to land internships and jobs. Conversational AI with LangChain, OpenAI, and Anthropic Claude; natural voice via Hume AI; distributed onboarding architecture that scaled to 100K+ users. Supported by Google.org and Walmart.org.",
    tech: ["Next.js", "TypeScript", "LangChain", "Anthropic Claude", "Hume AI", "Twilio"],
    url: "https://goldi.climbtogether.co/",
  },
  {
    name: "Factorbook 2.0 — Genomic Research Platform",
    org: "UMass Chan Medical School",
    description:
      "Led implementation of a genomic research platform (React, Next.js, GraphQL) — 40% faster First Contentful Paint, data-heavy genomic visualizations, Prometheus dashboards for distributed job queues, and 500+ tests at 98%+ coverage.",
    tech: ["Next.js", "React", "GraphQL", "VISX", "Prometheus", "Playwright"],
    url: "https://factorbook2-0.vercel.app/",
    github: "https://github.com/weng-lab/Factorbook2.0",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date?: string;
  pdf?: string;
  verify?: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    pdf: "/CloudDev.pdf",
    verify: "https://cp.certmetrics.com/amazon/en/public/verify/credential/7ed5cd682f894cbb93b854b148f4da49",
  },
  {
    name: "IBM AI Developer",
    issuer: "IBM · Coursera",
    pdf: "/AI.pdf",
    verify: "https://coursera.org/verify/professional-cert/2UU4UYDG6R6V",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    pdf: "/CloudPrac.pdf",
    verify: "https://cp.certmetrics.com/amazon/en/public/verify/credential/B2NDSG6JF114115G",
  },
  {
    name: "IBM Data Science",
    issuer: "IBM · Coursera",
    pdf: "/DataSci.pdf",
    verify: "https://www.coursera.org/account/accomplishments/professional-cert/EW88XURE6LLM",
  },
  {
    name: "Open Source Software Development, Linux & Git",
    issuer: "Coursera Specialization",
    pdf: "/Git.pdf",
    verify: "https://www.coursera.org/account/accomplishments/specialization/UZCVHP8ETK29",
  },
  {
    name: "Google Cloud Fundamentals",
    issuer: "Google Cloud",
    pdf: "/GoogleGO.pdf",
  },
  {
    name: "Game Development in Unity (C#)",
    issuer: "Unity",
  },
];

export type Testimonial = { quote: string; author: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "As the main UI developer on the project, Akshay undertook a very comprehensive overhaul of one of our resources, Factorbook, and modernized it using Next.js and MUI. He completed the redesign of Factorbook fully from the ground up, and was responsible for all parts of the frontend of the application. Very impressive and complex project. He was a team player and was always very receptive to feedback and looking for ways to improve the site and his own skills.",
    author: "Jonathan Fisher",
    role: "Software Engineer, UMass Chan Medical School",
  },
  {
    quote:
      "Having worked with Akshay for 2 years, I must say he is an excellent professional. I am impressed by his work ethics, communication skills, coding skills, exceptional problem-solving skills. He truly has the skills to interact with business clients. But what makes him stand out is his willingness to help others. I have no hesitation recommending him to potential employers.",
    author: "Nisha Indapure",
    role: "Lead Software Engineer",
  },
  {
    quote:
      "Great colleague who is very open minded when it comes to both personal and professional development in the software engineering industry. Akshay is always going above and beyond, ready to tackle new and difficult tasks, and ready to take responsibility. Very fast onboarding to the team, great attention to detail and a critical eye to improve things make him a great addition to any team!",
    author: "Leon Wöhrl",
    role: "Tech Lead, Capgemini",
  },
  {
    quote:
      "I studied with Akshay at the University of Mumbai, and he was always someone you could count on — smart, focused, and a great team player. He's technically strong and quick to pick up new concepts, and I'm confident he'll be a great asset wherever he works next.",
    author: "Amey Waghmode",
    role: "Data Scientist, Children's Mercy",
  },
];

export const contact = {
  headline: "Ready to ship agents that work?",
  blurb:
    "I'm open to AI agent, platform, and forward-deployed engineering roles — or a conversation about multi-agent systems, MCP servers, evals, and shipping production AI. Reach out and I'll get back to you quickly.",
  email: site.email,
};

export const socials = [
  { name: "GitHub", url: site.github },
  { name: "LinkedIn", url: site.linkedin },
];

export const footer = {
  sourceLabel: "Designed & engineered by Akshay — source on GitHub",
  repo: site.repo,
};

/** Cinematic film section (ported from v1 CinematicScrub — see legacy/components/Home/CinematicScrub). */
export const film = {
  desktopSrc: "/cinematic-scrub.mp4",
  mobileSrc: "/cinematic-scrub-720.mp4",
  poster: "/cinematic-poster.jpg",
  phases: [
    { title: "Agents that think.", sub: "MULTI-AGENT ORCHESTRATION · TOOL USE" },
    { title: "Shipped to production.", sub: "HARNESSES · MCP SERVERS · EVALS" },
    { title: "Reliable at scale.", sub: "OBSERVABILITY · KUBERNETES · 99.9% UPTIME" },
  ],
};
