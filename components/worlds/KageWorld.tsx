"use client";

import { KAGE_BACKGROUND_CANVAS, KageLandingPage } from "@/components/threeui/LandingPages";
import WorldStage, { type ApplyScene } from "./WorldStage";

function Scene({ applyScene }: { applyScene: ApplyScene }) {
  return (
    <KageLandingPage
      presentation="background"
      headingFont="onest"
      bodyFont="onest"
      headingWeight="400"
      bodyWeight="300"
      primaryColor="#e0231c"
      headingSize={46}
      bodySize={17}
      headingLetterSpacing={-0.012}
      applyScene={applyScene}
      className="world-frame"
      style={{ position: "absolute", inset: 0, background: "transparent" }}
    />
  );
}

type KageSceneApi = {
  fallback?: boolean;
  WORD?: { group?: { visible: boolean } | null };
};

/**
 * Kage exposes its scene on `window.__kage` once its boot jobs finish. The
 * giant "KAGE" wordmark is WebGL geometry (not DOM), so the background
 * presentation cannot hide it — it is switched off here through that API.
 */
function hideKageWordmark(frameWindow: Window): boolean {
  const api = (frameWindow as Window & { __kage?: KageSceneApi }).__kage;
  if (!api) return false;
  if (api.fallback) return true;
  if (!api.WORD?.group) return false;
  api.WORD.group.visible = false;
  return true;
}

/**
 * The temple-night world behind the closing sections: ThreeUI's Kage landing
 * page in background presentation. Only the WebGL canvas (`#gl`), its film
 * layers (`#vignette`, `#grain`) and the active chapter's foreground cut-outs
 * (`#fg-sky`) stay visible; the page's own copy never shows. The world is
 * scroll-driven: the parent page's progress through this wrapper is written
 * into the frame's own scroll position, so Kage's five camera chapters play
 * out as the visitor scrolls the profile, testimonials and contact sections.
 */
export default function KageWorld({ children }: { children: React.ReactNode }) {
  return (
    <WorldStage
      id="world-kage"
      className="world-kage"
      poster="/posters/kage.jpg"
      scrollDriven
      expect={{ canvas: KAGE_BACKGROUND_CANVAS, pathname: "/landing-pages/kage.html", titleIncludes: "Kage" }}
      onFrameReady={hideKageWordmark}
      scene={Scene}
    >
      {children}
    </WorldStage>
  );
}
