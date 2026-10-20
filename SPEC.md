# SPEC — Akshay Kalapgar Portfolio v3 "Liquid glass"

> v3 (2026-10) replaces v2 "Mission Control" and the v2.1 ThreeUI worlds. The CRT, Sylva and Kage
> scenes, the scroll-scrubbed film, the trace rail, their posters and the vendored ThreeUI code are
> all gone; see git history for the v2 spec. No WebGL, no video.

Content comes from `lib/content.ts` — never hardcode copy in components. Colors come from the
tokens in `app/globals.css` — never put raw hex in components.

## 0. Concept

Akshay is an AI agent engineer who also ships his own apps. The page has one job: in five seconds a
hiring manager should know he builds agent systems *and* products people use, then reach the proof
(apps, work, projects) and the résumé or contact.

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

`Backdrop` → `Nav` → Hero → StatusStrip → Apps → Experience → Projects → Open source →
Credentials → About → Testimonials → Contact → Footer. The section registry (`sections` in
`lib/content.ts`) drives the numbering and the nav scroll-spy.

## 5. Sections

- **Hero** — a `glass-strong` panel with the status line, the name (the only h1), the role
  "AI agent engineer — I build agent systems and the apps people use.", the tagline and the CTAs:
  *See the apps* (solid), *Résumé* (ghost, download), *Work* and *Contact* (text links). Beside it on
  desktop, four floating glass app-icon tiles (Wingline, Liftspark, Spark Studio, Whosnear) that
  parallax with the pointer and the scroll at different depths and link to `#apps`. Under `lg` the
  tiles become a calm row of four under the panel. Whosnear has no icon yet, so its tile is an SVG
  place-pin glyph.
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
- **Projects / Open source / Credentials / About / Testimonials / Contact / Footer** — unchanged
  content, restyled to the tokens above. The About portrait sits in a glass mat with no filters.
- **404** — the backdrop with one `glass-strong` card and a way home.
- **OG / Twitter images** — dark ground, coral accent.

## 6. Accessibility & performance floor

- One h1. Sections h2, cards h3. Visible coral focus ring everywhere; touch targets ≥ 44px.
- Text contrast ≥ 4.5:1 in both themes, including on glass (glass fills are dense enough that the
  fields behind never drop contrast).
- All images: WebP where we control them, width/height set, `loading="lazy"` below the fold,
  descriptive alt. External links: `target="_blank" rel="noopener noreferrer"`.
- No WebGL, no video, no third-party UI libs. Target Lighthouse mobile ≥ 90.

## 7. What not to do

- No raw hex in components (exceptions: OG image generators, which can't read CSS).
- No gradient text, no purple-to-cyan AI gradients, no emoji icons.
- No theme toggle — the system setting decides.
- A higher-quality film or scene can come back later, but only as an optional layer on top of
  this system, never as a replacement for the glass.
