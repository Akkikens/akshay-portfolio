import { site } from "./site";
import { certifications, jobs } from "./content";
import type { CaseStudy } from "./caseStudies";

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

/**
 * schema.org @graph for the homepage. Nodes are cross-referenced with @id
 * anchors so crawlers see one connected identity graph, not floating islands.
 */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: "Akshay",
        url: `${site.url}/`,
        image: `${site.url}${site.portrait}`,
        jobTitle: "AI Agent Engineer",
        description: site.longDescription,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        sameAs: [site.linkedin, site.github, site.x],
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
          "AI agents",
          "Multi-agent systems",
          "Model Context Protocol",
          "Claude",
          "LLM evals",
          "TypeScript",
          "Python",
          "Kubernetes",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${site.url}/`,
        name: site.name,
        description: site.description,
        publisher: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profilepage`,
        url: `${site.url}/`,
        name: site.title,
        dateModified: "2026-10-20",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };
}

/** Article + breadcrumb graph for one /work/<slug>/ case study. */
export function buildCaseStudyJsonLd(study: CaseStudy) {
  const url = `${site.url}/work/${study.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: study.title,
        description: study.description,
        url,
        mainEntityOfPage: url,
        dateModified: study.updated,
        author: { "@id": personId },
        publisher: { "@id": personId },
        isPartOf: { "@id": websiteId },
        about: study.stack,
        inLanguage: "en",
        ...(study.image ? { image: `${site.url}${study.image.src}` } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work/` },
          { "@type": "ListItem", position: 3, name: study.name, item: url },
        ],
      },
      { "@type": "Person", "@id": personId, name: site.name, url: `${site.url}/` },
      { "@type": "WebSite", "@id": websiteId, url: `${site.url}/`, name: site.name },
    ],
  };
}
