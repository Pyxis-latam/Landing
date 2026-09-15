import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          color: "#F2F1EE",
          fontSize: 32,
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#F2F1EE",
            letterSpacing: 4,
          }}
        >
          PYXIS
        </div>
        <div style={{ marginTop: 24, color: "#D9A54D" }}>
          Recomponemos empresas y construimos las que operan sin personas
        </div>
      </div>
    ),
    { ...size }
  );
}
