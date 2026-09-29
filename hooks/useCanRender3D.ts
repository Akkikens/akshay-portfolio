"use client";

import { useEffect, useState } from "react";

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (gl && "getExtension" in gl) {
      (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    }
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Whether a live WebGL scene should be mounted: `false` for
 * `prefers-reduced-motion: reduce`, `false` when WebGL context creation
 * fails, and `false` on the very first render (server + initial client
 * paint) so the static poster is always what SSR emits — it flips to `true`
 * once client-side feature detection actually passes.
 */
export function useCanRender3D(): boolean {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      if (mql.matches) {
        setCanRender(false);
        return;
      }
      setCanRender(detectWebgl());
    };

    evaluate();
    mql.addEventListener("change", evaluate);
    return () => mql.removeEventListener("change", evaluate);
  }, []);

  return canRender;
}
