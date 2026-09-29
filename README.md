<h1 align="center">akshaykalapgar.com — v2 "Mission Control"</h1>

<p align="center">
  <a href="https://akshaykalapgar.com" target="_blank">akshaykalapgar.com</a> — the portfolio of an AI Agent Engineer,
  presented as a live agent-orchestration console. Built with <a href="https://nextjs.org/" target="_blank">Next.js 16</a>,
  deployed on <a href="https://vercel.com/" target="_blank">Vercel</a> as a fully static export.
</p>

## The concept

One long scroll through three licensed [ThreeUI](https://threeui.com) worlds: a green-phosphor
**CRT boot log** behind the name, a **living forest** (Sylva) behind the work, and a scroll-driven
**temple night** (Kage) behind the profile and contact. Sections are structured as **trace spans**
(`TRACE 001 — experience`) — a career, like an agent run, is a temporal sequence. Palette: amber
phosphor signal on deep-space blue-black, shifting to ember in the night world.

Full design + engineering spec: [SPEC.md](./SPEC.md) · Design tokens: [app/globals.css](./app/globals.css) ·
Design-system intent: [design-system/akshay-kalapgar-portfolio/MASTER.md](./design-system/akshay-kalapgar-portfolio/MASTER.md)

## Stack

- **Next.js 16** (App Router, `output: "export"` — pure static files, no server)
- **React 19** + TypeScript strict
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no config file)
- **ThreeUI** (`components/threeui/`, vendored byte-exact and hash-verified) — the CRT shader and the Sylva / Kage scenes, loaded as same-origin frames in scene-only "background" presentation
- **framer-motion 12** — reveals, the scroll-scrubbed film section, micro-interactions
- **Lenis** — window-mode inertia scrolling (touch stays native)

## Highlights

- **Three WebGL worlds on one page** (`components/worlds/`) — sticky scene layers that
  cross-dissolve through the void, lazy-mounted near the viewport, with their
  requestAnimationFrame loops parked while offscreen and static posters for
  reduced-motion / no-WebGL visitors
- **Scroll-scrubbed cinematic film** (`components/sections/Film.tsx`) — CSS-sticky pin,
  spring-smoothed `currentTime` seeking against keyframe-dense video, IO-deferred loading;
  it sits on the void seam between the two worlds
- **Scroll-driven Kage** — the parent page's scroll is written into the frame's own scroll
  position (`components/worlds/sceneBridge.ts`), so the temple's five camera chapters and
  foreground cut-outs play as you read
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
