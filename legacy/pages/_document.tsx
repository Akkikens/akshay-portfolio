import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom document: font loading moved here from CSS @import so the browser
 * discovers the stylesheet in the initial HTML (no CSS-parse waterfall).
 * Weights are pruned to what the site actually uses:
 * - Inter 400/500/600/700/800 (300 verified unused)
 * - JetBrains Mono 400/500/600 (600 used by SectionIndex font-semibold)
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        {/* Likely mobile LCP element — start fetching before hydration */}
        <link rel="preload" as="image" href="/Portfolio-portrait-5.jpg" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
