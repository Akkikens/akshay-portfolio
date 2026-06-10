import React from "react";
import SectionIndex from "./SectionIndex";
import Reveal from "./Reveal";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
};

/**
 * Unified section header: mono kicker (number + eyebrow + hairline) over a
 * large tight-tracked title. One look across all sections.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  className,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <Reveal className={className}>
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <SectionIndex className="font-mono text-AAsecondary text-sm font-semibold">
          {index}
        </SectionIndex>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-AAsubtext/60">
          {eyebrow}
        </span>
        {!centered && (
          <span
            aria-hidden="true"
            className="h-px w-24 bg-gradient-to-r from-AAsecondary/50 to-transparent"
          />
        )}
      </div>
      <h2
        className={`mt-3 text-3xl md:text-4xl font-bold tracking-tight text-AAtext ${
          centered ? "text-center" : ""
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
