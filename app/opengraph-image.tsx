import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Premium Cleaning Services in Nigeria`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card: the sparkle mark over navy, set like the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0F172A 0%, #1C2A4A 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 480,
            height: 480,
            borderRadius: 480,
            background:
              "radial-gradient(circle at center, rgba(245,158,11,0.28) 0%, rgba(245,158,11,0) 70%)",
            display: "flex",
          }}
        />
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1.5c.9 5.6 4.9 9.6 10.5 10.5C16.9 12.9 12.9 16.9 12 22.5 11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5z"
            fill="#F59E0B"
          />
        </svg>
        <div
          style={{
            marginTop: 44,
            fontSize: 30,
            letterSpacing: 10,
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          O&F Pristine Solution
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 72,
            lineHeight: 1.08,
            color: "#FAFAF8",
            maxWidth: 900,
            display: "flex",
          }}
        >
          Premium cleaning that gives you back your time.
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: "#F59E0B",
            display: "flex",
          }}
        >
          Homes · Offices · Executive Housekeeping — across Nigeria
        </div>
      </div>
    ),
    { ...size }
  );
}
