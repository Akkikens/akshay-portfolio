<h1 align="center">akshaykalapgar.com — v2 "Mission Control"</h1>

<p align="center">
  <a href="https://akshaykalapgar.com" target="_blank">akshaykalapgar.com</a> — the portfolio of an AI Agent Engineer,
  presented as a live agent-orchestration console. Built with <a href="https://nextjs.org/" target="_blank">Next.js 16</a>,
  deployed on <a href="https://vercel.com/" target="_blank">Vercel</a> as a fully static export.
</p>

## The concept

The site's signature is a WebGL **agent constellation** (React Three Fiber): glowing agent nodes
around an orchestrator core, with light pulses traveling the edges like tool calls. Sections are
structured as **trace spans** (`TRACE 003 — experience`) — a career, like an agent run, is a
temporal sequence. Palette: amber phosphor signal on deep-space blue-black.

Full design + engineering spec: [SPEC.md](./SPEC.md) · Design tokens: [app/globals.css](./app/globals.css) ·
Design-system intent: [design-system/akshay-kalapgar-portfolio/MASTER.md](./design-system/akshay-kalapgar-portfolio/MASTER.md)

## Stack

- **Next.js 16** (App Router, `output: "export"` — pure static files, no server)
- **React 19** + TypeScript strict
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no config file)
- **three / @react-three/fiber / drei** — the 3D hero, lazy-loaded off the critical path
- **framer-motion 12** — reveals, the scroll-scrubbed film section, micro-interactions
- **Lenis** — window-mode inertia scrolling (touch stays native)

## Highlights

- **3D hero** with ignition cascade, mouse parallax, offscreen/hidden-tab pausing, an SVG
  poster fallback for reduced-motion/no-WebGL visitors, and zero per-frame React state
- **Scroll-scrubbed cinematic film** (`components/sections/Film.tsx`) — CSS-sticky pin,
  spring-smoothed `currentTime` seeking against keyframe-dense video, IO-deferred loading
- **SEO suite**: schema.org `@graph` (Person/WebSite/ProfilePage + credentials), build-time
  OG/Twitter cards (`ImageResponse`), `sitemap.ts` / `robots.ts` / `manifest.ts`, `llms.txt`
- **Accessibility floor**: single h1, landmarks + skip link, focus-visible everywhere,
  44px targets, every animation has a `prefers-reduced-motion` branch
- All copy lives in [`lib/content.ts`](./lib/content.ts) — components render, content is data

## Development

```bash
npm install
npm run dev      # dev server on :3000
npm run build    # static export → out/
```

The previous site (v1) is preserved under [`legacy/`](./legacy/) for reference and is excluded
from the build.

## License

Open source — you're welcome to learn from the code. If you reuse substantial parts,
a credit link back is appreciated.

## Author

**Akshay Kalapgar** — [GitHub](https://github.com/Akkikens) · [LinkedIn](https://www.linkedin.com/in/akshaykalapgar/)
