"use client";

import { SYLVA_BACKGROUND_CANVAS, SylvaHero } from "@/components/threeui/LandingPages";
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

type ThreeLike = {
  Object3D?: { prototype: { updateMatrixWorld: (this: SceneObject, force?: boolean) => void } };
};
type SceneObject = {
  isGroup?: boolean;
  renderOrder: number;
  visible: boolean;
  children: Array<{ material?: { uniforms?: Record<string, unknown> } }>;
};

/**
 * The page builds a butterfly (`buildButterfly`) inside its own closure and
 * exposes no scene API, so it is hidden through the one seam that is
 * reachable: `THREE` is a global from the vendored three.min.js, and every
 * object in the scene passes through `Object3D.prototype.updateMatrixWorld`
 * on every rendered frame. The butterfly group is the only Group at
 * renderOrder 5 whose children carry the wing shader (`uHind` uniform); once
 * seen it is kept invisible for the rest of the scene's life — cruise,
 * approach and landing included — while its update loop runs untouched.
 */
function hideButterfly(frameWindow: Window): boolean {
  const three = (frameWindow as Window & { THREE?: ThreeLike }).THREE;
  const proto = three?.Object3D?.prototype;
  if (!proto) return false;
  const original = proto.updateMatrixWorld;
  const hidden = new WeakSet<SceneObject>();
  let found = false;
  const isButterfly = (object: SceneObject) =>
    Boolean(object.isGroup) &&
    object.renderOrder === 5 &&
    object.children.some((child) => Boolean(child.material?.uniforms?.uHind));
  proto.updateMatrixWorld = function patched(this: SceneObject, force?: boolean) {
    if (hidden.has(this) || (!found && isButterfly(this))) {
      found = true;
      hidden.add(this);
      this.visible = false;
      (frameWindow as Window & { __sylvaButterflyHidden?: boolean }).__sylvaButterflyHidden = true;
    }
    return original.call(this, force);
  };
  return true;
}

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
      onFrameReady={hideButterfly}
      expect={{ canvas: SYLVA_BACKGROUND_CANVAS, pathname: "/landing-pages/inner-green-3d.html", titleIncludes: "Sylva" }}
      scene={Scene}
    >
      {children}
    </WorldStage>
  );
}
