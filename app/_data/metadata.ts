import type { Metadata } from "next";
import { SITE_URL } from "./seo";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path = "",
  image = "/images/social-home.jpg",
  imageAlt = "Lymph & Wellness women-only wellness sanctuary in Truganina",
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const socialImage = { url: image, width: 1200, height: 630, alt: imageAlt };

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    authors: [{ name: "Seda Yener", url: `${SITE_URL}/about#seda-yener` }],
    alternates: { canonical },
    openGraph: {
      type,
      siteName: "Lymph & Wellness",
      locale: "en_AU",
      title,
      description,
      url: canonical,
      images: [socialImage],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: ["Seda Yener"] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
