import type { Metadata, Viewport } from "next";


import localFont from "next/font/local";
import "./site.css";
import "./design.css";
import { Header } from "./_components/Header";
import { GoogleAnalytics } from "./_components/GoogleAnalytics";
import { Footer } from "./_components/Footer";

import { MobileStickyBook } from "./_components/MobileStickyBook";

import { serviceAreas, SITE_URL } from "./_data/seo";

const display = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/cormorant-garamond-italic-latin.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F2F0E9" };

const description = "A women-only wellness sanctuary in Altona for lymphatic drainage, facial treatments, body sculpting, recovery care and specialised wellness equipment.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Lymph & Wellness | Lymphatic Drainage Melbourne", template: "%s | Lymph & Wellness" },
  description,
  applicationName: "Lymph & Wellness",
  creator: "Lymph & Wellness",
  publisher: "Lymph & Wellness",
  authors: [{ name: "Lymph & Wellness", url: `${SITE_URL}/about` }],
  category: "Health and beauty",
  keywords: ["women's wellness sanctuary Melbourne", "women only wellness clinic Melbourne", "lymphatic drainage Melbourne", "lymphatic massage Melbourne", "manual lymphatic drainage Melbourne", "post op lymphatic drainage Melbourne", "lymphatic drainage Altona", "facial sculpting Melbourne", "body sculpting Melbourne", "infrared sauna Altona", "red light therapy Melbourne west"],
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/app-icon-192.png", sizes: "192x192", type: "image/png" }], shortcut: "/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: { siteName: "Lymph & Wellness", title: "Lymph & Wellness", description, type: "website", locale: "en_AU", url: SITE_URL, images: [{ url: "/share-image", width: 1200, height: 630, alt: "The Lymph & Wellness clinic in Altona" }] },
  twitter: { card: "summary_large_image", title: "Lymph & Wellness", description, images: ["/share-image"] },
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
    image: `${SITE_URL}/images/clinic/lounge.jpg`,
    description,
    areaServed: serviceAreas.map((area) => ({ "@type": "Place", name: `${area}, Victoria` })),
    telephone: "+61452599300",
    email: "info@lymphandwellnessco.com.au",
    address: { "@type": "PostalAddress", streetAddress: "1/22 Pier Street", addressLocality: "Altona", postalCode: "3018", addressRegion: "VIC", addressCountry: "AU" },
    openingHoursSpecification: [
      ["Monday","10:30","19:30"], ["Tuesday","09:30","19:30"], ["Wednesday","09:00","19:30"],
      ["Thursday","10:00","21:00"], ["Friday","10:00","21:00"], ["Saturday","11:00","17:00"],
    ].map(([day,opens,closes])=>({"@type":"OpeningHoursSpecification",dayOfWeek:day,opens,closes})),
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/lymph.andwellness/", "https://share.google/PfSn7CcBq24fN0Uwy"],
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: "Treatments", itemListElement: [
        "Brazilian Manual Lymphatic Drainage", "Facial Treatments", "EMS Body Sculpting", "Post-Operative Lymphatic Drainage", "Wellness Memberships", "Lymphatic Drainage Body Rollers", "Full-Body Red Light Therapy", "Full-Spectrum Infrared Sauna", "Vacu Activ Vacuum Treadmill", "Vacu Activ Infrastep StairMill",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={display.variable}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <MobileStickyBook />
        <GoogleAnalytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
