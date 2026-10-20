import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * The 1200x630 share card, in the site's light liquid-glass style: soft color
 * fields on porcelain, a frosted card with the name and role, and the
 * portrait in a white glass mat. Baked to a PNG at build time (static
 * export). Shared by opengraph-image.tsx and twitter-image.tsx.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Akshay Kalapgar, AI Agent Engineer";

const INK = "#0B0D12";
const INK_DIM = "#4A5060";
const CORAL = "#C3402A";

export async function renderOgImage() {
  const photo = await readFile(join(process.cwd(), "public/og-portrait.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 72px",
          backgroundColor: "#F3F4F8",
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(255,132,102,0.55), transparent 45%), radial-gradient(circle at 4% 96%, rgba(110,160,255,0.5), transparent 45%), radial-gradient(circle at 55% 60%, rgba(186,156,255,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 640,
            padding: "52px 56px",
            borderRadius: 36,
            background: "rgba(255,255,255,0.72)",
            border: "1.5px solid rgba(255,255,255,0.9)",
            boxShadow: "0 24px 60px -20px rgba(16,24,40,0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: INK_DIM }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#248A3D" }} />
            Open to AI agent roles · San Francisco
          </div>
          <div style={{ marginTop: 24, fontSize: 82, fontWeight: 700, letterSpacing: -3, lineHeight: 1, color: INK }}>
            Akshay Kalapgar
          </div>
          <div style={{ marginTop: 20, fontSize: 44, fontWeight: 600, letterSpacing: -1, color: CORAL }}>
            AI Agent Engineer
          </div>
          <div style={{ marginTop: 22, fontSize: 25, lineHeight: 1.45, color: INK_DIM }}>
            Multi-agent systems · MCP servers · Claude agents in production for 100K+ users
          </div>
          <div style={{ marginTop: 30, fontSize: 22, fontWeight: 600, color: INK }}>akshaykalapgar.com</div>
        </div>

        <div
          style={{
            display: "flex",
            padding: 12,
            borderRadius: 40,
            background: "rgba(255,255,255,0.7)",
            border: "1.5px solid rgba(255,255,255,0.95)",
            boxShadow: "0 24px 60px -20px rgba(16,24,40,0.3)",
          }}
        >
          <img src={photoSrc} width={352} height={440} alt="" style={{ borderRadius: 30, objectFit: "cover" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
