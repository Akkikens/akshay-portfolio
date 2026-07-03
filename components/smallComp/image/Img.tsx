import React from "react";

type ImgProps = {
  src: string;
  alt?: string;
  className?: string;
  /** Defaults to lazy; pass "eager" for above-the-fold images (e.g. the portrait) */
  loading?: "lazy" | "eager";
  /** Intrinsic dimensions — set them to reserve layout space (prevents CLS) */
  width?: number;
  height?: number;
  /** "high" for the LCP image, together with loading="eager" */
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Plain <img> wrapper (static export — next/image optimization unavailable).
 * Lazy + async decode by default so offscreen images never block the main
 * thread; call sites opt into eager/high-priority for the LCP image.
 */
export default function Img({
  src,
  alt,
  className,
  loading,
  width,
  height,
  fetchPriority,
}: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading ?? "lazy"}
      decoding="async"
      width={width}
      height={height}
      fetchPriority={fetchPriority}
    />
  );
}
