/* ImageResponse renders raw images into a PNG; next/image is not supported here. */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const dynamic = "force-static";
export async function GET() {
  const [photo, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "public/images/clinic/lounge.jpg")),
    readFile(path.join(process.cwd(), "public/brand/logo-dark.svg")),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#F2F0E9",
        color: "#443730",
      }}
    >
      <div
        style={{
          width: 720,
          padding: "62px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
          alt="Lymph & Wellness"
          width={300}
          height={80}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, letterSpacing: -2, lineHeight: 1.1 }}>
            A little time.
          </div>
          <div
            style={{
              fontSize: 60,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#776B5D",
            }}
          >
            Entirely for you.
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.5, marginTop: 28 }}>
            Lymphatic care, recovery & wellness
          </div>
        </div>
        <div style={{ fontSize: 17, letterSpacing: 3 }}>
          WOMEN’S WELLNESS · ALTONA, MELBOURNE
        </div>
      </div>
      <img
        src={`data:image/jpeg;base64,${photo.toString("base64")}`}
        alt="Our Altona clinic"
        width={480}
        height={630}
        style={{ objectFit: "cover" }}
      />
    </div>,
    { width: 1200, height: 630 },
  );
}
