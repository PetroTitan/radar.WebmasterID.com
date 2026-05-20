import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";

/**
 * Default Open Graph image.
 *
 * Generated server-side with Next.js's `ImageResponse` (Satori under
 * the hood) on the platform's editorial light theme. Rendered once
 * at build time and cached at the CDN.
 *
 * Satori does not parse arbitrary inline SVG, so the radar mark is
 * approximated with stacked circular `<div>`s. The result reads as
 * a brand card rather than a precise reproduction of the logo —
 * acceptable for a 1200×630 social preview.
 */

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

function Ring({
  diameter,
  borderColor,
  borderWidth = 2,
  opacity = 1,
}: {
  readonly diameter: number;
  readonly borderColor: string;
  readonly borderWidth?: number;
  readonly opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: diameter,
        height: diameter,
        borderRadius: diameter,
        border: `${borderWidth}px solid ${borderColor}`,
        opacity,
      }}
    />
  );
}

function Mark() {
  return (
    <div
      style={{
        position: "relative",
        width: 380,
        height: 380,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ring diameter={380} borderColor="#3B82F6" borderWidth={3} />
      <Ring diameter={290} borderColor="#3B82F6" borderWidth={2} opacity={0.85} />
      <Ring diameter={200} borderColor="#3B82F6" borderWidth={2} opacity={0.65} />
      <Ring diameter={110} borderColor="#3B82F6" borderWidth={1.5} opacity={0.45} />
      {/* Centre pip */}
      <div
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          borderRadius: 26,
          backgroundColor: "#2563EB",
        }}
      />
      {/* Amber tip — outlined */}
      <div
        style={{
          position: "absolute",
          top: 56,
          right: 60,
          width: 36,
          height: 36,
          borderRadius: 36,
          border: "5px solid #F59E0B",
          backgroundColor: "#FFFFFF",
        }}
      />
      {/* Amber filled bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 80,
          width: 28,
          height: 28,
          borderRadius: 28,
          backgroundColor: "#F59E0B",
        }}
      />
    </div>
  );
}

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#FFFFFF",
          color: "#0F172A",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "72px 88px",
          alignItems: "center",
          gap: 72,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#2563EB",
            }}
          >
            Radar · WebmasterID
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#0F172A",
            }}
          >
            Verified digital infrastructure intelligence.
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              lineHeight: 1.55,
              color: "#475569",
              maxWidth: 720,
            }}
          >
            Source-governed knowledge graph of the internet&apos;s physical
            layer — cloud regions, IXPs, datacenters, subsea cables, and
            the institutions that operate them.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mark />
        </div>
      </div>
    ),
    { ...size },
  );
}
