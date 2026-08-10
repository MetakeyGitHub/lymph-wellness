import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MotionEnhancer } from "./_components/MotionEnhancer";
import { BOOKING_URL } from "./_data/site";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F2F0E9" };

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "Considered lymphatic drainage, facial treatments, body sculpting and post-operative lymphatic care in Melbourne.";
  return {
    metadataBase: new URL(origin),
    title: { default: "Lymph & Wellness | Lymphatic Drainage Melbourne", template: "%s | Lymph & Wellness" },
    description,
    keywords: ["lymphatic drainage Melbourne", "lymphatic massage Melbourne", "manual lymphatic drainage Melbourne", "post op lymphatic drainage Melbourne", "facial sculpting Melbourne", "body sculpting Melbourne"],
    alternates: { canonical: "/" },
    icons: { icon: "/images/mark.webp", apple: "/images/mark.webp" },
    openGraph: { title: "Lymph & Wellness", description, type: "website", locale: "en_AU", images: [{ url: "/og.png", width: 1536, height: 909, alt: "Lymph & Wellness — Restore. Sculpt. Rebalance." }] },
    twitter: { card: "summary_large_image", title: "Lymph & Wellness", description, images: ["/og.png"] },
    robots: { index: true, follow: true },
  };
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Lymph & Wellness",
  description: "Boutique Melbourne wellness clinic specialising in lymphatic drainage, facial treatments, body sculpting and post-operative lymphatic care.",
  areaServed: { "@type": "City", name: "Melbourne" },
  address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
  sameAs: ["https://www.instagram.com/lymph.wellnessco/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Treatments", itemListElement: [
      "Brazilian Manual Lymphatic Drainage", "Facial Treatments", "EMS Body Sculpting", "Post-Operative Lymphatic Drainage",
    ].map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <MotionEnhancer />
        {children}
        <Footer />
        <Link className="mobile-sticky-book" href={BOOKING_URL}>Book a treatment <span aria-hidden="true">↗</span></Link>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
