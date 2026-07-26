import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { site } from "@/lib/site";

/** Static export-compatible web app manifest. Icons reuse the existing public/ pngs. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "AK",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
