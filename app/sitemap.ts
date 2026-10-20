import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { site } from "@/lib/site";
import { caseStudies } from "@/lib/caseStudies";

/**
 * Static export-compatible sitemap. Every indexable page, with trailing
 * slashes to match next.config's `trailingSlash: true`. lastmod is the date
 * the page's content last changed, not the build time.
 */
const SITE_UPDATED = "2026-10-20";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work/`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}/`,
      lastModified: study.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/privacy-policy/`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
