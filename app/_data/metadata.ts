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
  author?: { name: string; url: string };
};

export function pageMetadata({
  title,
  description,
  path = "",
  image = "/share-image",
  imageAlt = "Lymph & Wellness — women’s wellness in Altona, Melbourne",
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: PageMetadataOptions): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const socialImage = {
    url: image,
    ...(image.includes("/clinic/")
      ? { width: 1050, height: 1400 }
      : { width: 1200, height: 630 }),
    alt: imageAlt,
  };

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    authors: [author ?? { name: "Lymph & Wellness", url: `${SITE_URL}/about` }],
    alternates: { canonical },
    openGraph: {
      type,
      siteName: "Lymph & Wellness",
      locale: "en_AU",
      title,
      description,
      url: canonical,
      images: [socialImage],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [author?.name ?? "Lymph & Wellness"] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
