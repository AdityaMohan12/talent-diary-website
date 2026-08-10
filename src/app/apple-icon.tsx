import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon, drawn rather than shipped as a binary so it always matches
 * the mark. Apple does not round or pad these, so the artwork carries its own
 * radius and breathing room.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1d18e6",
          borderRadius: 40,
        }}
      >
        <svg width="104" height="104" viewBox="0 0 64 64">
          <path
            d="M20 24 a8 8 0 0 1 8 -8 h8 a8 8 0 0 1 8 8 v24 l-12 -7 l-12 7 z"
            fill="#ffffff"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
