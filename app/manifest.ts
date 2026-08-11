import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lymph & Wellness",
    short_name: "Lymph & Wellness",
    description: "Women-only lymphatic care and wellness in Altona, Melbourne.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F0E9",
    theme_color: "#443730",
    icons: [
      { src: "/app-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/app-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
