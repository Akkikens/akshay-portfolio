# SPEC — Akshay Kalapgar Portfolio v3 "Liquid glass"

> v3 (2026-10) replaces v2 "Mission Control" and the v2.1 ThreeUI worlds. The CRT, Sylva and Kage
> scenes, the scroll-scrubbed film, the trace rail, their posters and the vendored ThreeUI code are
> all gone; see git history for the v2 spec. No WebGL, no video.

Content comes from `lib/content.ts` — never hardcode copy in components. Colors come from the
tokens in `app/globals.css` — never put raw hex in components.

## 0. Concept

Akshay is an AI agent engineer, and the page is aimed at AI agent engineering roles. In five seconds a
hiring manager should see his face, know he builds production agent systems, and reach the proof
(about, experience, projects, open source) and the résumé or contact. His own apps come last, as a
bonus.

The look is **Apple-style liquid glass**: calm, premium, iOS-native. A soft luminous ground with
slowly drifting color fields, layered translucent glass panels on top, and real depth from the
layering rather than flat cards everywhere. One confident accent. Light first, with a matching dark
version that follows the visitor's system setting.

## 1. Stack

- Next.js 16 App Router, `output: 'export'` (static, `images.unoptimized`), React 19, TypeScript strict
- Tailwind CSS v4, CSS-first (`@theme` in `app/globals.css`, no tailwind.config)
- framer-motion v12, lenis smooth scroll
- Fonts via `next/font/google`: **Geist** (display + body, `--font-geist`) and **Geist Mono**
  (small labels, `--font-geist-mono`)

## 2. Design tokens (`app/globals.css`)

Raw values live in `:root` (light) and `@media (prefers-color-scheme: dark)`; `@theme inline` maps
them to the semantic utilities components use, so both themes stay in lockstep.

| Token | Light | Dark | Use |
|---|---|---|---|
| `void` | `#f3f4f8` porcelain | `#0a0d14` deep blue-black | page ground |
| `raised` / `panel` | `#ffffff` | `#121725` / `#161c2b` | opaque surfaces, glass fallback |
| `ink` / `ink-dim` / `ink-faint` | `#0b0d12` / `#4a5060` / `#676d7c` | `#eef1f7` / `#aeb4c2` / `#8b92a3` | text (all ≥ 4.5:1 on ground) |
| `signal` | `#c3402a` coral | `#ff7a60` coral | the one accent: CTAs, eyebrows, active nav |
| `on-signal` | white | `#170a06` | text on a coral fill |
| `blue` / `ochre` / `live` | iOS-style blue / ochre / green | lighter tints | status chips and the "open to work" dot only |
| `line` / `line-bright` | ink at 8% / 14% | white at 8% / 14% | hairlines |

The accent is Wingline's coral, darkened in light mode so it passes AA as text and as a button fill.

**Glass** (`.glass-panel`, `.glass-strong` for dense text, `.glass-nav`, `.glass-overlay`):
translucent fill (white 58–78% light, `rgba(26,32,48,.55)` dark), `backdrop-filter: blur(22–28px)
saturate(180%)`, a hairline edge, an inset top highlight and a soft two-layer shadow. Under
`@supports not (backdrop-filter)` every glass class goes opaque (`raised`) so text never sits on raw
color fields.

**Backdrop** (`components/layout/Backdrop.tsx` + `.backdrop` CSS): three blurred radial color fields
(coral, sky, lavender) drifting over 38–52s, plus faint grain against banding. Fixed, CSS only,
transform-only animation; static under reduced motion.

**Type**: Geist 600 for display with tight tracking (−0.035 to −0.045em), Geist 400/500 body at
16–17px, line-height 1.6. Geist Mono 11–12px uppercase for section eyebrows and annotations.

**Motion**: house ease `cubic-bezier(.22,1,.36,1)`; reveals 0.55–0.7s rise + fade; hover 200ms.
`prefers-reduced-motion` stops the backdrop drift, tile float, parallax, tilt and magnetic pull.

## 3. Primitives (`components/ui/`)

- `Section` — eyebrow `01 · Apps` + hairline + optional mono annotation, then the H2.
- `TiltCard` — glass panel with a 6° pointer tilt and an accent-tinted highlight (mouse only).
- `MagneticButton` — pill CTA: `solid` is the coral fill, `ghost` is a glass pill.
- `Reveal` — rise + fade on enter.

## 4. Page (`app/page.tsx`)

`Backdrop` → `Nav` → Hero → StatusStrip → About (01) → Experience (02) → Projects (03) →
Open source (04) → Credentials (05) → Testimonials (06) → Apps (07) → Contact (08) → Footer. The section registry (`sections` in
`lib/content.ts`) drives the numbering and the nav scroll-spy.

## 5. Sections

- **Hero** — leads with the agent-engineer pitch. A `glass-strong` card holds the status line, the
  name (the only h1), the role "AI agent engineer. I build agent systems and the apps people use.",
  the tagline and the CTAs: *See my agent work* (solid, to Experience), *Résumé* (ghost, download),
  then *Contact* and *Apps* as text links. Beside it on desktop, the portrait in a glass mat
  (`public/portrait-hero.webp`, a 4:5 crop) with three glass proof chips ("100K+ users · Goldi",
  "MCP servers", "Claude agents in production") resting on its lower-left edge; it drifts slightly
  with the pointer and the scroll. Under `lg` the portrait becomes a round avatar inside the card
  (`public/portrait-avatar.webp`) and the chips sit under the CTAs.
- **Nav** — transparent at the top, `glass-nav` once scrolled; name on the left, five links, a glass
  Résumé pill. Mobile: full-screen `glass-overlay` menu with focus trap and `inert` page.
- **StatusStrip** — one glass readout of key/value pairs (1/2/3 columns).
- **Apps** — each shipped or in-progress app is a glass **device card**: its real screenshot in a
  phone bezel on a tinted stage, the icon and name, **status chips** (Beta / In review /
  In development / Concept — words plus a dot, never color alone) with the literal detail in small
  type, the pitch, 2–3 check-marked features, platforms, credit where owed, and links. Concepts get
  one quiet glass row with no screenshot, so nothing is oversold. Status copy is deliberately
  literal; nothing claims a launch that has not happened.
- **Experience** — glass cards on a timeline rail; each node's accent ring fades in on view.
- **About** — first section: bio and mission (7/12) beside the skill cloud (5/12), metrics below.
  The portrait lives in the hero only.
- **Contact** — a blurb, then one glass mail card (icon, the address, a coral "Write to me" pill;
  the whole card is the link), then glass social buttons.
- **Projects / Open source / Credentials / Testimonials / Footer** — unchanged content, restyled to
  the tokens above.
- **404** — the backdrop with one `glass-strong` card and a way home.
- **OG / Twitter images** — dark ground, coral accent.

## 6. Accessibility & performance floor

- One h1. Sections h2, cards h3. Visible coral focus ring everywhere; touch targets ≥ 44px.
- Text contrast ≥ 4.5:1 in both themes, including on glass (glass fills are dense enough that the
  fields behind never drop contrast).
- All images: WebP where we control them, width/height set, `loading="lazy"` below the fold,
  descriptive alt. External links: `target="_blank" rel="noopener noreferrer"`.
- No WebGL, no video, no third-party UI libs. Target Lighthouse mobile ≥ 90.

## 7. Copy rules

- No em dashes, and no spaced en dashes or hyphens used as dashes, anywhere a visitor or crawler
  reads (content, metadata, OG images, `public/llms.txt`). Use periods, commas or colons. Date
  ranges read "May 2025 to present"; metadata may use an unspaced en dash for a range.
- Goldi's scale is "100K+ users" everywhere.

## 8. What not to do

- No raw hex in components (exceptions: OG image generators, which can't read CSS).
- No gradient text, no purple-to-cyan AI gradients, no emoji icons.
- No theme toggle — the system setting decides.
- A higher-quality film or scene can come back later, but only as an optional layer on top of
  this system, never as a replacement for the glass.
