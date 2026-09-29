"use client";

import { CrtBackground, type CrtVariant } from "@/components/threeui/crt/CrtBackground";
import { AgentCrtBackground } from "@/components/threeui/crt/AgentCrtBackground";
import { useCanRender3D } from "@/hooks/useCanRender3D";

type CrtStageProps = {
  variant?: CrtVariant;
  /** Static frame for reduced-motion / no-WebGL visitors and the SSR paint. */
  poster: string;
  className?: string;
};

/**
 * ThreeUI's CRT inside a full-bleed `.shader-frame`. The `terminal` variant
 * renders through AgentCrtBackground (this site's agent boot log); every other
 * variant uses the verbatim CrtBackground. The poster is what the
 * server renders; the live tube (its own WebGL context, self-pausing when
 * hidden or offscreen) mounts on top once the client confirms motion is
 * welcome and WebGL exists.
 */
export default function CrtStage({ variant = "terminal", poster, className = "" }: CrtStageProps) {
  const canRender3D = useCanRender3D();
  const Tube = variant === "terminal" ? AgentCrtBackground : CrtBackground;

  return (
    <div aria-hidden className={`shader-frame ${className}`}>
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {canRender3D ? (
        <Tube
          variant={variant}
          speed={1}
          typeSpeed={1}
          motion={1}
          hue={0}
          saturation={1}
          brightness={1}
          opacity={1}
        />
      ) : null}
    </div>
  );
}
