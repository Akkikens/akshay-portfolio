import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { site } from "@/lib/site";

/** Static export-compatible robots file. Allow all crawlers, point at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
