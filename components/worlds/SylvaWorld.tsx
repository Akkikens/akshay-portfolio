"use client";

import { SylvaHero } from "@/components/threeui/LandingPages";
import WorldStage, { type ApplyScene } from "./WorldStage";

function Scene({ applyScene }: { applyScene: ApplyScene }) {
  return (
    <SylvaHero
      variant="living-green"
      presentation="background"
      headingFont="lexend"
      bodyFont="lexend"
      headingWeight="300"
      bodyWeight="300"
      primaryColor="#ffffff"
      headingSize={63}
      bodySize={16.5}
      headingLetterSpacing={-0.006}
      applyScene={applyScene}
      className="world-frame"
      style={{ position: "absolute", inset: 0, background: "transparent" }}
    />
  );
}

/**
 * In background presentation only `#scene` (a transparent WebGL canvas) is
 * visible; the authored page paints its moss-green ground and the "floor of
 * light" on the hidden `.hero` shell. Restating those two authored gradients
 * on the body gives the canvas the ground it was lit for.
 */
const SYLVA_BACKDROP_CSS = `
html[data-threeui-presentation="background"] body {
  background:
    radial-gradient(72% 44% at 50% 117%, rgba(238,243,231,.50) 0%, rgba(238,243,231,.21) 42%, rgba(238,243,231,.04) 72%, rgba(238,243,231,0) 88%),
    linear-gradient(180deg, rgba(238,243,231,0) 54%, rgba(238,243,231,.03) 78%, rgba(238,243,231,.085) 100%),
    radial-gradient(64% 52% at 27% 84%, rgba(232,238,222,.085) 0%, rgba(232,238,222,0) 72%),
    radial-gradient(70% 60% at 92% 8%, rgba(24,28,20,.10) 0%, rgba(24,28,20,0) 68%),
    #4a4d44 !important;
}
`;

/**
 * The living-forest world behind the work sections: ThreeUI's Sylva Hero
 * (living-green) in background presentation, so only its WebGL scene
 * (`#scene`) renders and none of the page's own copy is visible.
 */
export default function SylvaWorld({ children }: { children: React.ReactNode }) {
  return (
    <WorldStage
      id="world-sylva"
      className="world-sylva"
      poster="/posters/sylva.jpg"
      frameStyles={SYLVA_BACKDROP_CSS}
      scene={Scene}
    >
      {children}
    </WorldStage>
  );
}
