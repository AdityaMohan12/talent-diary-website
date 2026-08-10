import { ImageResponse } from "next/og";

export const alt = "Talent Diary. Startup hiring done right.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Until now every link to this site posted into LinkedIn,
 * WhatsApp or Slack rendered with no preview at all, which for a recruiting
 * brand whose main channel is LinkedIn is a bigger visible loss than the
 * favicon. Type and the mark only, no stock photography, matching the site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f8fb",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              background: "#1d18e6",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 64 64">
              <path
                d="M20 24 a8 8 0 0 1 8 -8 h8 a8 8 0 0 1 8 8 v24 l-12 -7 l-12 7 z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: 3,
              color: "#1b1d26",
            }}
          >
            TALENT DIARY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#1b1d26",
            }}
          >
            Startup hiring
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#1d18e6",
            }}
          >
            done right.
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.4,
              color: "#5b6070",
              maxWidth: 820,
            }}
          >
            A deeply vetted shortlist in under 30 days, for niche tech and
            non-tech roles at high-growth startups.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 4, background: "#1d18e6" }} />
          <div style={{ fontSize: 23, color: "#5b6070" }}>talentdiary.in</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
