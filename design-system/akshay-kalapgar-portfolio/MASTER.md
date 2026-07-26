# Design System Master File — "Mission Control" (v2)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> The authoritative, more detailed spec for the v2 rebuild lives at `/SPEC.md` (repo root).
> Tokens are implemented in `app/globals.css` (Tailwind v4 `@theme`) — that file is the
> source of truth for values; this file is the source of truth for intent.

---

**Project:** Akshay Kalapgar Portfolio
**Updated:** 2026-07-26
**Concept:** Mission control for agents — a calm, premium operations console observing a live
multi-agent system. Signature element: the WebGL agent-constellation hero. Structural device:
sections labeled as trace spans (`TRACE 003 — experience`).

---

## Global Rules

### Color Palette (amber phosphor on deep space)

| Role | Hex | Token |
|------|-----|-------|
| Background (deep space blue-black) | `#060810` | `--color-void` |
| Elevated surface | `#0B101E` | `--color-raised` |
| Glass panel fill (use w/ alpha) | `#101729` | `--color-panel` |
| Primary text (warm paper white) | `#EDEAE2` | `--color-ink` |
| Secondary text | `#A8ADBD` | `--color-ink-dim` |
| Tertiary/metadata (≥16px only) | `#6B7285` | `--color-ink-faint` |
| **Signal accent (amber phosphor)** | `#FFB224` | `--color-signal` |
| Signal hover | `#FFC95C` | `--color-signal-bright` |
| Signal wash | `rgba(255,178,36,0.13)` | `--color-signal-dim` |
| Depth (indigo-violet; 3D scene/gradients only, never text) | `#6D5EF0` | `--color-depth` |
| Hairline border | `rgba(237,234,226,0.09)` | `--color-line` |
| Hover border | `rgba(237,234,226,0.18)` | `--color-line-bright` |

**Why amber:** pre-GUI terminals used amber phosphor for precision night work — warm, human,
technical. Deliberately NOT slate+green dev-template, acid-green hacker, or cyan AI-gradient.

### Typography

- **Display:** Bricolage Grotesque (700/800, tracking −0.02…−0.03em) — hero name, H2s, big numbers
- **Body:** Instrument Sans (400/500/600) — paragraphs, UI
- **Mono:** JetBrains Mono (400/500) — trace labels, eyebrows, metadata, chips (uppercase, +0.12em)
- Loaded via `next/font/google` (self-hosted at build; zero external font requests)

### Motion

- House ease `cubic-bezier(0.22,1,0.36,1)`; micro 150–250ms; reveals 500–600ms; stagger 40–60ms
- Springs: scrub `{120, 24}`, hover `{300, 20, 0.5}` (see `lib/motion.ts`)
- Lenis window-mode smooth scroll (`lerp 0.09`, touch native); `overflow-x: clip` (never `hidden` — kills sticky)
- Every effect has a `prefers-reduced-motion` branch. CSS transitions never include `transform`
  (framer owns transforms — double-easing causes jitter)

### Structure

- Sections = trace spans: mono eyebrow `TRACE 00N — label` + hairline + right annotation, then display H2
- Container `max-w-6xl px-6 md:px-10`; sections `py-28 md:py-40`
- Radii: cards 1rem (`rounded-2xl`), chips full, buttons `rounded-lg`

---

## Anti-Patterns (Do NOT Use)

- ❌ Light mode / theme toggle
- ❌ Emojis as icons — inline SVG only (consistent 1.75 stroke)
- ❌ Gradient-clipped hero text, purple-cyan AI gradients
- ❌ Scroll-jacking; layout-shifting hovers; instant state changes
- ❌ Low contrast: `ink-faint` below 16px, `signal` as body text color
- ❌ Numbered markers outside the trace-span system
- ❌ New hex values in components — tokens only

## Pre-Delivery Checklist

- [ ] One `<h1>` per page; sections h2, cards h3
- [ ] Focus visible (amber ring), 44×44 touch targets, aria-labels on icon buttons
- [ ] `prefers-reduced-motion` respected (static variants, no canvas loop)
- [ ] Images have width/height (no CLS); hovers use transform/opacity/color only
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll
- [ ] 3D/heavy layers lazy-loaded client-side; SSR HTML carries all text content
