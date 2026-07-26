import { site } from "./site";
import { certifications, jobs } from "./content";

/**
 * schema.org @graph for the homepage. Nodes are cross-referenced with @id
 * anchors so crawlers see one connected identity graph, not floating islands.
 */
export function buildJsonLd() {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        image: `${site.url}${site.portrait}`,
        jobTitle: site.role,
        description: site.description,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        sameAs: [site.github, site.linkedin],
        worksFor: {
          "@type": "Organization",
          name: jobs[0].company,
          url: jobs[0].url,
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Clark University",
            sameAs: "https://www.clarku.edu/",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "University of Mumbai",
            sameAs: "https://mu.ac.in/",
          },
        ],
        hasCredential: certifications
          .filter((c) => c.verify)
          .map((c) => ({
            "@type": "EducationalOccupationalCredential",
            name: c.name,
            url: c.verify,
            credentialCategory: "Professional Certification",
            recognizedBy: { "@type": "Organization", name: c.issuer },
          })),
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
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: `${site.name} Portfolio`,
        description: site.description,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profilepage`,
        url: site.url,
        name: site.title,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };
}
