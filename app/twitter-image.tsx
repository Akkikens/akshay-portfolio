import { ImageResponse } from "next/og";

/**
 * Build-time Twitter card image (1200x630). Same design as opengraph-image.tsx,
 * duplicated per SPEC.md §5.11 rather than shared — these two files are
 * intentionally independent, simple, static-export-baked images.
 */
export const dynamic = "force-static";
export const alt = "Akshay Kalapgar — AI Agent Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#060810";
const AMBER = "#FFB224";
const INDIGO = "#6D5EF0";
const INK_DIM = "#A8ADBD";

type Dot = { x: number; y: number; r: number; color: string; o: number };
type Edge = [number, number]; // indices into `dots`

// Fixed (not randomized) scatter so the baked image is stable across builds.
// Kept out of the text zone (roughly x:64-1000, y:190-460) so legibility never
// depends on paint order.
const dots: Dot[] = [
  // top strip
  { x: 70, y: 60, r: 3, color: AMBER, o: 0.6 },
  { x: 160, y: 110, r: 2, color: INDIGO, o: 0.35 },
  { x: 260, y: 50, r: 2, color: AMBER, o: 0.45 },
  { x: 340, y: 130, r: 3, color: INDIGO, o: 0.3 },
  { x: 430, y: 70, r: 2, color: AMBER, o: 0.5 },
  { x: 520, y: 120, r: 2, color: INDIGO, o: 0.3 },
  { x: 610, y: 55, r: 3, color: AMBER, o: 0.55 },
  { x: 700, y: 115, r: 2, color: INDIGO, o: 0.35 },
  { x: 800, y: 65, r: 2, color: AMBER, o: 0.4 },
  { x: 900, y: 100, r: 3, color: AMBER, o: 0.6 },
  { x: 980, y: 50, r: 2, color: INDIGO, o: 0.3 },
  { x: 1060, y: 90, r: 2, color: AMBER, o: 0.45 },
  { x: 1130, y: 60, r: 3, color: AMBER, o: 0.55 },
  // right column
  { x: 1050, y: 200, r: 2, color: INDIGO, o: 0.3 },
  { x: 1120, y: 260, r: 3, color: AMBER, o: 0.5 },
  { x: 1080, y: 340, r: 2, color: INDIGO, o: 0.35 },
  { x: 1140, y: 420, r: 2, color: AMBER, o: 0.4 },
  { x: 1030, y: 480, r: 3, color: AMBER, o: 0.5 },
  { x: 1100, y: 540, r: 2, color: INDIGO, o: 0.3 },
  // bottom strip
  { x: 950, y: 560, r: 2, color: AMBER, o: 0.45 },
  { x: 850, y: 590, r: 2, color: INDIGO, o: 0.3 },
  { x: 700, y: 570, r: 3, color: AMBER, o: 0.5 },
  { x: 550, y: 595, r: 2, color: INDIGO, o: 0.3 },
  { x: 400, y: 580, r: 2, color: AMBER, o: 0.4 },
  { x: 250, y: 560, r: 2, color: INDIGO, o: 0.3 },
  { x: 120, y: 590, r: 3, color: AMBER, o: 0.5 },
  { x: 40, y: 520, r: 2, color: INDIGO, o: 0.3 },
];

const edges: Edge[] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], [24, 25], [25, 26],
  [12, 13], [18, 19],
];

function ConstellationLine({ a, b }: { a: Dot; b: Dot }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <div
      style={{
        position: "absolute",
        left: a.x,
        top: a.y,
        width: length,
        height: 1,
        background: "#8B93B8",
        opacity: 0.22,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0",
      }}
    />
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: VOID,
          fontFamily: '"system-ui", "Segoe UI", sans-serif',
        }}
      >
        {/* constellation motif layer */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {edges.map(([ai, bi], i) => (
            <ConstellationLine key={`e${i}`} a={dots[ai]} b={dots[bi]} />
          ))}
          {dots.map((d, i) => (
            <div
              key={`d${i}`}
              style={{
                position: "absolute",
                left: d.x - d.r,
                top: d.y - d.r,
                width: d.r * 2,
                height: d.r * 2,
                borderRadius: 999,
                background: d.color,
                opacity: d.o,
              }}
            />
          ))}
        </div>

        {/* content layer */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "72px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#EDEAE2",
              lineHeight: 1,
            }}
          >
            Akshay Kalapgar
          </div>

          <div
            style={{
              display: "flex",
              width: 120,
              height: 6,
              background: AMBER,
              borderRadius: 3,
              margin: "32px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 500,
              color: INK_DIM,
              letterSpacing: "-0.01em",
            }}
          >
            AI Agent Engineer — Multi-Agent Systems · MCP · Evals
          </div>

          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 80,
              bottom: 64,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: AMBER,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            }}
          >
            akshaykalapgar.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
