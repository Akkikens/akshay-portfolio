import { ogAlt, ogSize, renderOgImage } from "@/lib/ogImage";

/** Build-time share card (1200x630); the design lives in lib/ogImage.tsx. */
export const dynamic = "force-static";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
