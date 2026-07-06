import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time — no design tool required. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0F172A 0%, #14213f 60%, #0F172A 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M16 4L29 28H3L16 4z" fill="none" stroke="#F8FAFC" strokeOpacity="0.4" strokeWidth="1" />
            <path d="M16 4l6.5 12H9.5L16 4z" fill="#F59E0B" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
            Apex Academy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              fontWeight: 500,
              letterSpacing: -3,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            <div style={{ display: "flex" }}>Master the skills</div>
            <div style={{ display: "flex", gap: 24 }}>
              <span>that</span>
              <span style={{ color: "#F59E0B", fontStyle: "italic" }}>pay.</span>
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(248,250,252,0.65)",
              maxWidth: 820,
            }}
          >
            Websites · Copywriting · Facebook Ads · WhatsApp · TikTok · Freelancing
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(248,250,252,0.15)",
            paddingTop: 28,
            fontSize: 22,
            color: "rgba(248,250,252,0.55)",
          }}
        >
          <div>4,200+ students trained</div>
          <div style={{ color: "#F59E0B" }}>apexacademy.co</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
