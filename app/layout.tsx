import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Lymph & Wellness | Lymphatic Specialist Melbourne";
  const description = "Women-only lymphatic drainage, post-op recovery, facial sculpting and body wellness treatments in Melbourne.";

  return {
    metadataBase: new URL(origin),
    title,
    description,
    icons: {
      icon: "/images/brand-mark.jpg",
      shortcut: "/images/brand-mark.jpg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1730, height: 909, alt: "Lymph & Wellness - restoration, sculpting and renewal" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
