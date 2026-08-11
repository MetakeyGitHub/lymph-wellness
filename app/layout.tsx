import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { MotionEnhancer } from "./_components/MotionEnhancer";
import { BOOKING_URL } from "./_data/site";
import { serviceAreas, SITE_URL } from "./_data/seo";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F2F0E9" };

const description = "Women-only lymphatic drainage, facial treatments, body sculpting and post-operative lymphatic care at a private Truganina clinic in Melbourne's west.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Lymph & Wellness | Lymphatic Drainage Melbourne", template: "%s | Lymph & Wellness" },
  description,
  applicationName: "Lymph & Wellness",
  creator: "Lymph & Wellness",
  publisher: "Lymph & Wellness",
  category: "Health and beauty",
  keywords: ["lymphatic drainage Melbourne", "lymphatic massage Melbourne", "manual lymphatic drainage Melbourne", "post op lymphatic drainage Melbourne", "lymphatic drainage Truganina", "facial sculpting Melbourne", "body sculpting Melbourne"],
  icons: { icon: "/images/mark.webp", apple: "/images/mark.webp" },
  openGraph: { siteName: "Lymph & Wellness", title: "Lymph & Wellness", description, type: "website", locale: "en_AU", url: SITE_URL, images: [{ url: "/og.png", width: 1536, height: 909, alt: "Lymph & Wellness: Restore. Sculpt. Rebalance." }] },
  twitter: { card: "summary_large_image", title: "Lymph & Wellness", description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lymph & Wellness",
    alternateName: "Lymph and Wellness",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Lymph & Wellness",
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    description,
    areaServed: serviceAreas.map((area) => ({ "@type": "Place", name: `${area}, Victoria` })),
    telephone: "+61452599300",
    address: { "@type": "PostalAddress", streetAddress: "6 Bellevue Drive", addressLocality: "Truganina", postalCode: "3029", addressRegion: "VIC", addressCountry: "AU" },
    openingHoursSpecification: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: day, opens: "10:30", closes: "17:00" })),
    sameAs: ["https://www.instagram.com/lymph.wellnessco/", "https://share.google/PfSn7CcBq24fN0Uwy"],
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: "Treatments", itemListElement: [
        "Brazilian Manual Lymphatic Drainage", "Facial Treatments", "EMS Body Sculpting", "Post-Operative Lymphatic Drainage", "Wellness Memberships",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <MotionEnhancer />
        {children}
        <Footer />
        <Link className="mobile-sticky-book" href={BOOKING_URL}>Book a treatment <span aria-hidden="true">↗</span></Link>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
