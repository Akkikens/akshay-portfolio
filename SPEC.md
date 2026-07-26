# SPEC — Akshay Kalapgar Portfolio v2 "Mission Control"

> Authored by Fable (design lead + architect). Implementation agents (Sonnet): read this file fully,
> then implement ONLY the files assigned to you. Content/data comes from `lib/content.ts` — never
> hardcode content strings in components. Design tokens come from `app/globals.css` — never invent
> hex values in components.

## 0. Concept

Akshay Kalapgar is an AI Agent Engineer (multi-agent orchestration, MCP servers, evals, agent
harnesses). The page's single job: make a hiring manager at an AI company think "this person ships
production agent systems" within 5 seconds, then get them to the proof (work, projects) and to
contact/resume.

The design concept is **mission control for agents**: the portfolio presents itself as a calm,
premium operations console observing a live multi-agent system. The signature element is the hero's
WebGL **agent constellation** — a living orchestration graph. Sections are structured as **trace
spans** (an agent trace is a temporal sequence; so is a career).

Aesthetic: deep-space blue-black, **amber phosphor** signal color (pre-GUI terminals used amber
phosphor for precision night work — warm, human, technical), indigo-violet atmospheric depth in the
3D scene only. NOT: slate+green dev-template, acid-green hacker, cyan AI-slop.

## 1. Stack

- Next.js 16 (App Router, `output: 'export'` — static export, NO server functions, NO next/image optimization: `images.unoptimized: true`)
- React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css` — there is NO tailwind.config file)
- three + @react-three/fiber v9 + @react-three/drei v10 (hero only, lazy-loaded)
- framer-motion v12 (`import { motion } from "framer-motion"`)
- lenis (smooth scroll, root-level)
- Fonts via `next/font/google` in `app/layout.tsx` exposing CSS vars: `--font-display` (Bricolage Grotesque), `--font-body` (Instrument Sans), `--font-mono` (JetBrains Mono)

Client components: mark `"use client"` where hooks/motion are used. Sections receive no props; they
import their data from `lib/content.ts` directly.

## 2. Design tokens (defined in app/globals.css — reference, do not redefine)

Colors (Tailwind v4 `@theme` gives utilities like `bg-void`, `text-signal`, `border-line`):

| Token | Value | Usage |
|---|---|---|
| `--color-void` | `#060810` | page background (deep space blue-black) |
| `--color-raised` | `#0B101E` | elevated surfaces, cards base |
| `--color-panel` | `#101729` | glass panel fill (use with alpha) |
| `--color-ink` | `#EDEAE2` | primary text (warm paper white) |
| `--color-ink-dim` | `#A8ADBD` | secondary text (AA on void) |
| `--color-ink-faint` | `#6B7285` | tertiary/metadata text (use ≥ 16px only) |
| `--color-signal` | `#FFB224` | THE accent. amber phosphor. CTAs, active states, span labels, node glow |
| `--color-signal-bright` | `#FFC95C` | hover state of signal |
| `--color-signal-dim` | `rgba(255,178,36,0.13)` | signal wash backgrounds, borders of active elements |
| `--color-depth` | `#6D5EF0` | indigo-violet. 3D scene atmosphere, rare gradient partner. NEVER for text |
| `--color-line` | `rgba(237,234,226,0.09)` | hairline borders, dividers |
| `--color-line-bright` | `rgba(237,234,226,0.18)` | hover borders |

Type scale (utilities defined in globals.css):
- Display (Bricolage Grotesque): hero name `clamp(3.5rem, 10vw, 8.5rem)`, weight 800, tracking `-0.03em`, leading 0.95
- H2 section titles: `clamp(2rem, 4.5vw, 3.5rem)`, weight 700, tracking `-0.02em`
- H3: 1.375rem, weight 600
- Body (Instrument Sans): 1rem/1.0625rem, leading 1.65
- Mono labels (JetBrains Mono): 0.8125rem, weight 500, uppercase, tracking `+0.12em`

Spacing: sections `py-28 md:py-40`; container `max-w-6xl mx-auto px-6 md:px-10`.
Radii: cards `rounded-2xl`, chips `rounded-full`, buttons `rounded-lg`.
Motion tokens: micro 150–250ms ease-out; reveals 500–600ms cubic-bezier(0.22,1,0.36,1); stagger 40–60ms.

Shared utility classes available (defined in globals.css): `.glass-panel` (panel bg + blur + line
border), `.span-label` (mono eyebrow style), `.focus-ring` (visible amber focus), `.text-balance`.

## 3. Shared primitives (components/ui/ — pre-built, import them, do not modify)

- `Section` — `components/ui/Section.tsx`. Props: `{ id: string; index: number; label: string; annotation?: string; title: string; children }`. Renders `<section id>` with container, trace-span header block: mono `TRACE 00N — label` eyebrow + hairline rule + optional right-aligned mono annotation (e.g. "4+ YEARS"), then H2 title, then children. Handles whileInView reveal of the header.
- `Reveal` — `components/ui/Reveal.tsx`. Props: `{ children; delay?: number; y?: number; className?: string }`. framer-motion whileInView fade+rise, `once: true`, respects reduced motion (renders static).
- `MagneticButton` — `components/ui/MagneticButton.tsx`. Props: `{ href; children; variant: "solid" | "ghost"; download?: boolean; external?: boolean }`. Solid = signal bg, void text; ghost = line border, ink text, signal border on hover. Magnetic translate ≤ 8px toward cursor on desktop pointer:fine only; scale 0.98 on press. Renders `<a>`.
- `TiltCard` — `components/ui/TiltCard.tsx`. Props: `{ children; className? }`. Pointer-tracked 3D perspective tilt (max 6deg), glass panel, signal-tinted specular highlight following cursor. Disabled for touch + reduced motion.

## 4. Page assembly (app/page.tsx — pre-built by architect)

Order: `<Nav/> <Hero/> <StatusStrip/> <About/> <Film/> <Experience/> <Projects/> <OpenSource/> <Certifications/> <Testimonials/> <Contact/> <Footer/>` plus `<TraceRail/>` (fixed left rail, desktop only).

Section registry (ids, labels, indices) lives in `lib/content.ts` as `sections`.

ALREADY BUILT by the architect (import, never rewrite): `lib/site.ts`, `lib/content.ts`,
`lib/motion.ts` (EASE_OUT, SPRING_SCRUB, SPRING_HOVER, reveal()), `lib/jsonld.ts`,
`app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `hooks/useLenis.ts` (+`scrollToTarget`),
`hooks/useSmoothScroll.ts`, `components/providers/SmoothScroll.tsx`, and all four
`components/ui/*` primitives. The v1 codebase lives under `legacy/` for reference only.

## 5. Component specs (one Sonnet agent each)

### 5.1 `components/three/AgentConstellation.tsx` (+ `ConstellationFallback.tsx`)
The signature. A living multi-agent orchestration graph rendered in R3F. Requirements:

- Default export `AgentConstellation({ className })`: renders `<Canvas>` filling absolute inset-0, `dpr={[1, 1.75]}`, `gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}`, camera `{ position: [0, 0, 11], fov: 42 }`.
- **Graph**: ~56 agent nodes (mobile ≤ 768px: 32) placed on a slightly-flattened fibonacci sphere (radius ~4, y squashed ×0.72) with per-node jitter. One **orchestrator core** at origin: icosahedron, signal-amber emissive, slow breathing scale (1 ± 0.04, period ~4s).
- **Nodes**: THREE.InstancedMesh of small spheres (r 0.045–0.09 varied). Material: emissive amber `#FFB224`, emissiveIntensity varied 0.55–1.1; ~20% of nodes are indigo `#6D5EF0` (sub-agents). Each node drifts on a tiny individual orbit (sin/cos offsets, amplitude ~0.08) so the graph feels alive.
- **Edges**: connect each node to its 2 nearest neighbors + ~12 random node→core edges. Single `lineSegments` with additive ShaderMaterial or LineBasicMaterial `transparent opacity 0.16` color `#8B93B8`.
- **Pulses** (tool calls): 14 concurrent sprites (additive blending, radial-gradient CanvasTexture, amber) that travel node→node along randomly chosen edges over 1.2–2.4s, ease-in-out, then respawn on a new edge after 0.2–1s. This is the "live traffic" — it must read clearly.
- **Starfield**: 1400 background points (Points, size ~0.02, additive, colors mixed #4A5578/#6D5EF0/#EDEAE2 at low opacity), radius 30 sphere.
- **Camera behavior**: gentle autonomous drift (rotation.y += 0.0125/s). Mouse parallax: lerp camera position toward `(pointer.x * 0.9, pointer.y * 0.55, 11)` with 0.05 lerp — subtle, "observing" not "controlled". No OrbitControls.
- **Ignition choreography**: on mount, nodes scale from 0 with 900ms stagger cascade outward from core (distance-based delay), edges fade in after 400ms, pulses start at 1.2s. Track with a `useRef<number>` clock, not React state.
- **Perf**: `<AdaptiveDpr pixelated={false} />` from drei; pause frameloop when `document.hidden` and when canvas scrolls fully offscreen (IntersectionObserver → `invalidate`-based demand loop or set a paused ref checked in useFrame). Everything in refs, zero per-frame React state. No postprocessing package — glow via additive sprites + emissive only.
- `ConstellationFallback` (same folder): pure-CSS/SVG static rendering (absolutely-positioned dots + lines snapshot with radial-gradient glow) shown when: `prefers-reduced-motion: reduce`, WebGL unavailable, or while the 3D chunk loads. Visually consistent with the live scene.
- Export also `useCanRender3D()` hook: returns false for reduced-motion / no WebGL.

### 5.2 `components/sections/Hero.tsx`
- Full viewport (`min-h-[100dvh]`) stage. AgentConstellation absolute background (dynamic import ssr:false inside Hero, poster fallback while loading). Content layered above with a subtle bottom-left vignette for text contrast.
- Content (server-renderable text — this is the LCP, keep it in initial HTML): mono status line `● SYSTEMS NOMINAL — {content.hero.status}` (amber dot pulses), then the name in display type (two lines: first/last), then role line, then one-sentence value prop from `content.hero.tagline`, then CTA row: MagneticButton solid "View the work" → `#projects`, ghost "Résumé" → `/resume.pdf` (external/download).
- Load choreography (framer-motion, runs once): status line 0ms → name lines rise+fade (60ms stagger between lines, 600ms) → tagline 250ms later → CTAs 350ms later. Reduced motion: everything static visible.
- Bottom edge: scroll cue — mono `SCROLL TO INSPECT TRACE` + thin vertical line that scales; fades out after first scroll.
- Absolutely no layout shift: reserve all text space; canvas behind everything.

### 5.3 `components/layout/Nav.tsx`
- Fixed top, z-50. Glass panel appears only after scrollY > 40 (transparent at top). Contents: wordmark `AK—02` (mono, signal on hover, links `#top`), desktop: links from `sections` registry (About, Experience, Projects, Contact subset — `nav: true` entries), each with mono index prefix (`01`, `02`…) and animated underline sweep on hover; active section highlighted (IntersectionObserver scroll-spy, amber text + dot). Right: "Résumé" ghost button.
- Mobile: hamburger (44×44 target) → full-screen overlay menu (void bg, staggered link entrance, big display type links), focus-trapped, Esc + backdrop closes, body scroll locked. aria-expanded, aria-label correct.
- Skip link: first focusable "Skip to content" targeting `#main`.

### 5.4 `components/sections/StatusStrip.tsx` + `components/sections/About.tsx`
- StatusStrip: thin full-width strip under hero, hairline top/bottom borders, horizontally scrolling on overflow (no marquee animation — static, `overflow-x-auto`): mono key-value pairs from `content.status` (e.g. `LOCATION: SF · CA`, `FOCUS: MULTI-AGENT SYSTEMS`, `STATUS: OPEN TO STAFF/SENIOR ROLES`). Amber keys, ink values.
- About (`Section index/label from registry`): two-column ≥ md (7/5). Left: paragraphs from `content.about.paragraphs` (first paragraph 1.25rem lead style), then skills as a mono chip cloud grouped by `content.about.skillGroups` (group label mono-faint, chips: line border, signal border on hover). Right: portrait `content.about.image` in a glass frame — duotone treatment (CSS: grayscale + amber-tinted gradient multiply overlay + subtle scanlines via repeating-linear-gradient), corner brackets (mission-control fiducials) drawn with ::before/::after or SVG. Reveal on scroll.

### 5.5 `components/sections/Experience.tsx`
- The trace timeline. Vertical line (hairline, amber gradient head tracking scroll progress via framer-motion `useScroll` scoped to the section). Each job from `content.jobs` = a span row: left rail node (amber ring, fills when in view), right card: company + link, role, mono period badge, bullets. First job expanded by default; others collapsed to company/role/period, expand on click (accordion, `<button aria-expanded>`, height animate via framer-motion, chevron rotate). Company name gets subtle signal underline sweep on hover.
- Timeline nodes connect visually to the trace-span motif (this section IS the literal trace).

### 5.6 `components/sections/Projects.tsx`
- From `content.projects`. First 2 = featured: full-width alternating TiltCard rows (image side + text side): screenshot in glass frame with amber corner fiducials, mono tech chips, name (H3 display), description, GitHub/live icon links (SVG, aria-labels). Remaining projects: 3-col grid (1-col mobile) of compact TiltCards: folder-glyph SVG top-left, name, 2-line description, tech chips bottom, links top-right.
- Images: plain `<img>` with explicit width/height + `loading="lazy"` (static export; no next/image optimizer). Alt text = project name + "screenshot".

### 5.7 `components/sections/OpenSource.tsx` + `components/sections/Certifications.tsx`
- OpenSource: `content.contributions` as ledger rows (table-like list): mono index, repo/name (link, underline sweep), description, tech chips right. Hover: row bg signal-dim wash. Border hairlines between rows.
- Certifications: `content.certifications` as a responsive grid of credential chips/cards: issuer mono eyebrow, cert name, arrow-out icon linking to PDF (`target="_blank" rel="noopener"`, aria-label "open certificate PDF"). Subtle hover lift (translateY(-2px), no layout shift).

### 5.8 `components/sections/Testimonials.tsx` + `components/sections/Contact.tsx`
- Testimonials: `content.testimonials`. Layout: one large rotating? NO — static editorial: 2-col masonry (1-col mobile) of glass quote cards: oversized amber `"` glyph (display font), quote (1.125rem), author + role mono. Reveal stagger.
- Contact: the closer. Centered, generous whitespace. Mono eyebrow `TRACE 00N — handoff`, display headline from `content.contact.headline` (e.g. "Ready to ship agents that work?"), one-paragraph blurb, then a terminal-styled card: `$ open mailto:{email}` line with blinking cursor block (CSS animation, paused under reduced motion) — entire card is the mailto link, plus ghost buttons for LinkedIn/GitHub. Email also shown as selectable text.

### 5.9 `components/layout/Footer.tsx` + `components/layout/TraceRail.tsx`
- Footer: hairline top border. Left: `© {year} Akshay Kalapgar`. Center: mono "Designed & engineered by Akshay — source on GitHub" (repo link). Right: social icon row (GitHub, LinkedIn — SVG, 44px targets, aria-labels). Sub-line: privacy policy link + `humans: /llms.txt` mono easter egg link.
- TraceRail: fixed left edge (hidden < lg), vertical: thin track with a span marker (dot + mono index) per section from registry; active section's marker amber + label visible; click = smooth scroll (respect Lenis via normal anchor href). ARIA: `nav aria-label="Section trace"`. Also thin scroll-progress fill along the track (framer-motion `useScroll` + scaleY, transform-origin top).

### 5.10 `app/privacy-policy/page.tsx` + `app/not-found.tsx`
- Privacy: port existing copy (see `lib/content.ts → privacyPolicy`), styled minimal: mono eyebrow, display H1, prose sections, back link. Static metadata export (title "Privacy Policy — Akshay Kalapgar", robots index).
- not-found: full-viewport: mono `TRACE NOT FOUND`, display `404`, one-liner ("This span emitted no output."), MagneticButton "Return to mission control" → `/`. Reuses ConstellationFallback as background art.

### 5.12 `components/sections/Film.tsx`
Port of v1's CinematicScrub — the scroll-driven film. READ the original first:
`legacy/components/Home/CinematicScrub/CinematicScrub.tsx` (its comments encode real fixed bugs —
preserve the mechanics exactly, restyle the chrome). Data from `lib/content.ts → film`.

- Three render paths chosen at top level: reduced-motion → static stacked headings + poster (no video); mobile ≤768px (live `matchMedia` + change listener) → normal-height section with autoplaying muted/loop/playsInline 720p video, phases statically stacked; desktop → the scrub.
- Desktop scrub: `<section>` h-[280vh] with sticky top-0 h-screen stage (CSS sticky pin, no JS pinning). `useScroll({ target: sectionRef, offset: ["start start", "end end"] })` → `useSpring(scrollYProgress, SPRING_SCRUB)`. Video seek via `useMotionValueEvent`: `video.currentTime = clamp(p) * (duration - 0.05)` guarded by inView (IntersectionObserver), `readyState >= 1`, and a 1/30s delta threshold. Keep `useScroll` INSIDE the desktop-only child component (refs must exist when the hook mounts).
- Loading: `preload="none"`; IntersectionObserver with rootMargin `100% 0px` flips `preload="auto"` + `video.load()` once — the 7.9MB fetch stays off LCP but beats the scroll.
- 3D film-screen entrance: stage `perspective: 1200`; screen maps scrollYProgress [0→0.22] → scale 0.7→1, rotateX 13°→0, y 56→0, borderRadius 28→0, transformOrigin "center 62%"; glow value ([0, 0.18, 0.24] → [1, 1, 0]) driving boxShadow — RESTYLE the glow amber: `0 60px 140px rgba(2,4,10,.75)` + `0 0 110px rgba(255,178,36,0.35)` + 1px rgba(237,234,226,.25) ring, with an amber radial "stage light" behind fading on the same value. Exit: stageOpacity [0.94,1]→[1,0.75].
- Phases (3, from content.film.phases) with windows [0,0.001,0.26,0.34], [0.36,0.44,0.6,0.68], [0.7,0.78,0.94,1.0]: opacity 0→1→1→0, y 48→0→0→-48 off the same spring; phase 1 pre-shown at p=0. Titles in display font; subs in span-label mono. Legibility scrim gradient rgba(4,6,12,.5)→.12→.6. Playhead hairline at bottom: 160px line, amber fill scaleX = progress.
- Fallback on video error: amber-tinted radial + void gradient div.

### 5.11 SEO/discovery files (one agent)
- `app/sitemap.ts` (routes: `/`, `/privacy-policy` with lastModified), `app/robots.ts` (allow all, sitemap URL), `app/manifest.ts` (name, short_name "AK", theme `#060810`, background `#060810`, icons from existing public/ pngs).
- `app/opengraph-image.tsx` + `app/twitter-image.tsx`: build-time ImageResponse 1200×630 — void bg, faint constellation dots motif (absolute-positioned divs), name in bold, role line, amber accent bar, domain mono footer. `export const dynamic = "force-static"`. Also `alt` exports.
- `public/llms.txt`: markdown profile for AI crawlers (who, what, links, key skills, projects) per llmstxt convention.
- (`lib/jsonld.ts` is already built by the architect — do not create it.)

## 6. Accessibility & performance floor (every agent)

- Only ONE `<h1>` on the page (hero name). Sections use h2, cards h3.
- All interactive elements: `.focus-ring` visible focus, `cursor-pointer`, ≥ 44×44px touch targets, aria-labels on icon-only controls.
- `prefers-reduced-motion`: no parallax, no tilt, no magnetic, no autoplay canvas loop, reveals render static. Use the shared `useReducedMotion` from framer-motion.
- Contrast: body text only `ink`/`ink-dim` on void/raised. `ink-faint` only ≥ 16px metadata. Signal-on-void for text ≥ 14px bold or 18px regular only.
- No emojis as icons — inline SVG (Lucide-style paths, stroke 1.75, consistent).
- No layout shift: all images width/height; hover states use transform/opacity/color only.
- Client-only visual layers (canvas, tilt, magnetic) must not affect SSR HTML structure (hydration-safe: no `window` at module scope; gate with useEffect/useState mounted patterns).
- Keep per-frame work tiny; never setState inside useFrame; use refs.

## 7. What NOT to do

- No light mode. No theme toggle.
- No scroll-jacking (Lenis smooths, never hijacks). CinematicScrub video section from v1 is RETIRED.
- No gradient-text hero, no glassmorphism-everywhere, no purple-to-cyan AI gradients, no emoji, no "01 / 02 / 03" markers outside the trace-span system.
- No new npm deps beyond §1 stack.
- Never touch files owned by other agents; never modify globals.css / content.ts / page.tsx / layout.tsx.
