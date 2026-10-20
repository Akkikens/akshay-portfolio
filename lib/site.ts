export const site = {
  name: "Akshay Kalapgar",
  /** Homepage <title> and share-card title: name plus the role people search for. */
  title: "Akshay Kalapgar · AI Agent Engineer",
  headline: "Akshay Kalapgar · AI Agent Engineer",
  role: "AI Agent Engineer",
  url: "https://akshaykalapgar.com",
  domain: "akshaykalapgar.com",
  /** Meta description, ~155 characters. */
  description:
    "Akshay Kalapgar is an AI agent engineer in San Francisco building multi-agent systems, MCP servers and Claude agents in production at Goldi (100K+ users).",
  /** Longer summary for structured data and llms.txt. */
  longDescription:
    "AI Agent Engineer with 4+ years shipping production agentic systems: multi-agent orchestration, agent harnesses, MCP servers, evals and tool-use pipelines, plus the platform, observability, and infra that runs them. Claude/LLM tooling, Next.js, TypeScript, Python, Kubernetes, Terraform, AWS/GCP.",
  email: "akshaykalapgar23@gmail.com",
  location: { city: "San Francisco", region: "CA", country: "US" },
  github: "https://github.com/Akkikens",
  linkedin: "https://www.linkedin.com/in/akshaykalapgar/",
  twitterHandle: "@akshaykalapgar",
  x: "https://x.com/akshaykalapgar",
  repo: "https://github.com/Akkikens/akshay-portfolio",
  portrait: "/Portfolio-portrait-5.jpg",
  /** Random IndexNow key; the matching file is public/<key>.txt. */
  indexNowKey: "0c929924cfbeb3ef9338c2ae3dadce00",
  resume: "/resume.pdf",
  themeColor: "#f3f4f8",
  themeColorDark: "#0a0d14",
} as const;

/**
 * Share images for pages that set their own openGraph/twitter blocks (a
 * child block replaces the root one, file-based images included).
 */
export const shareImages = {
  og: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Akshay Kalapgar, AI Agent Engineer" }],
  twitter: [{ url: "/twitter-image", width: 1200, height: 630, alt: "Akshay Kalapgar, AI Agent Engineer" }],
};
