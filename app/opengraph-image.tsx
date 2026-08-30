import { ImageResponse } from "next/og";

import { config } from "@/lib/config";

export const alt = "MetaNames — your name on the Partisia Blockchain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Replaces the /og-image.png that metadata pointed at but that never shipped
// in public/. Generated here so the card always matches the site's palette.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background:
          "radial-gradient(circle at 50% 0%, #2a2260 0%, #06060a 60%)",
        color: "#f6f6fb",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#a9a3ff",
        }}
      >
        {config.siteName}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 24,
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        <span>Own your name on the&nbsp;</span>
        <span style={{ color: "#8f86ff" }}>Partisia&nbsp;</span>
        <span>Blockchain</span>
      </div>
      <div style={{ marginTop: 32, fontSize: 34, color: "#9d9db3" }}>
        Wallets, socials, sites — one .mpc name.
      </div>
    </div>,
    size,
  );
}
