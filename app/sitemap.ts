import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { site } from "@/lib/site";

/**
 * Static export-compatible sitemap. Plain function returning MetadataRoute.Sitemap —
 * no dynamic params, no request-time data. Trailing slashes match next.config's
 * `trailingSlash: true`.
 */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/privacy-policy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
