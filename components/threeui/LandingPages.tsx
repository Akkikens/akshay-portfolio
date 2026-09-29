/*
 * Trimmed from ThreeUI's src/shaders/landing-pages/LandingPages.tsx
 * (bundle sha256 4d379461ad00eb4de7900df312878035383de7e1ed4e13283b8143a2eea9d30a).
 *
 * The original module exports every packaged landing page and imports many
 * sibling scenes (tidecrest, meridian, ascii-field, betawise, axonis, nocturne,
 * sylva-living-world, sandboxedPageDocument, `?raw` sources) that are not part
 * of the three bundles licensed here, so it cannot compile as-is. This file
 * keeps only the two components this site uses — `KageLandingPage` and the
 * living-green path of `SylvaHero` (which loads the byte-exact packaged
 * document through `sourceUrl`, never a derived `srcDoc`) — and adds the
 * `presentation` prop the way ThreeUI's own Betawise/Axonis/Mira components
 * expose it, so both pages can be reused as scene-only backgrounds through
 * LandingPageFrame's `backgroundCanvasSelector` / `backgroundVisualSelector`.
 * Everything else (typography recipes, frame, presentation CSS) is the
 * verbatim ThreeUI source next to this file.
 */

import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
export { LandingPageFrame, applyBackgroundPresentation } from "./LandingPageFrame";
export type { LandingPageFrameProps, LandingPageProps } from "./LandingPageFrame";
import { KAGE_TYPOGRAPHY, SYLVA_TYPOGRAPHY } from "./pageRecipes";

export type LandingPagePresentation = "page" | "background";

/* ── Kage ─────────────────────────────────────────────────────────────── */

export type KageLandingPageProps = LandingPageProps &
  PageTypographyProps & {
    presentation?: LandingPagePresentation;
    /**
     * Authored atmosphere layers retained in background presentation. The
     * WebGL canvas is `#gl`; `#vignette` and `#grain` are its fixed film
     * layers and `#fg-sky` hosts the active chapter's foreground cut-outs.
     */
    backgroundVisualSelector?: string;
  };

export const KAGE_BACKGROUND_CANVAS = "#gl";
export const KAGE_BACKGROUND_VISUALS = "#vignette, #grain, #fg-sky";

export function KageLandingPage({
  presentation = "page",
  backgroundVisualSelector = KAGE_BACKGROUND_VISUALS,
  ...props
}: KageLandingPageProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  const background = presentation === "background";
  return (
    <LandingPageFrame
      {...frame}
      backgroundCanvasSelector={background ? KAGE_BACKGROUND_CANVAS : undefined}
      backgroundVisualSelector={background ? backgroundVisualSelector : undefined}
      customization={customization}
      title={background ? "Kage — temple night background" : "Kage — Where stillness reveals the unseen"}
      sourceUrl="/landing-pages/kage.html"
    />
  );
}

/* ── Sylva ────────────────────────────────────────────────────────────── */

export const SYLVA_HERO_VARIANTS = ["living-green"] as const;
export type SylvaHeroVariant = (typeof SYLVA_HERO_VARIANTS)[number];

export type SylvaHeroProps = LandingPageProps &
  PageTypographyProps & {
    variant?: SylvaHeroVariant;
    presentation?: LandingPagePresentation;
  };

const SYLVA_HERO_BASE_URL = "/landing-pages/inner-green-3d.html";
export const SYLVA_BACKGROUND_CANVAS = "#scene";

/**
 * The authored page is served byte-for-byte for Living Green. (The derived
 * Sakura Sunset / Maple Autumn / Sequoia Mist variants of the original module
 * depend on sylva-living-world, which is not bundled, and are omitted.)
 */
export function SylvaHero({ variant = "living-green", presentation = "page", ...props }: SylvaHeroProps) {
  const safeVariant: SylvaHeroVariant = SYLVA_HERO_VARIANTS.includes(variant) ? variant : "living-green";
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(SYLVA_TYPOGRAPHY, type);
  const background = presentation === "background";

  return (
    <LandingPageFrame
      {...frame}
      key={safeVariant}
      backgroundCanvasSelector={background ? SYLVA_BACKGROUND_CANVAS : undefined}
      customization={customization}
      title={background ? "Sylva — living forest background" : "Sylva — Into the living world"}
      sourceUrl={SYLVA_HERO_BASE_URL}
    />
  );
}
