import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "lymph-wellness.vercel.app" }],
      destination: "https://www.lymphandwellness.com.au/:path*",
      permanent: true,
    }];
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        { key: "Content-Security-Policy", value: "base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto: https://lymphwell.ap.zenoti.com; upgrade-insecure-requests" },
      ],
    }];
  },
};

export default nextConfig;
