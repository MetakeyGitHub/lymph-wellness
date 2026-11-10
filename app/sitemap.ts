import type { MetadataRoute } from "next";
import { articles } from "./_data/articles";
import { SITE_URL, treatmentPages } from "./_data/seo";
import { equipmentPages, locationPages } from "./_data/growth";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = new Date("2026-11-10T00:00:00+11:00");
  const core = [
    "",
    "/services",
    "/memberships",
    "/packages",
    "/gift-cards",
    "/about",
    "/post-op",
    "/faq",
    "/contact",
    "/journal",
    "/areas-we-serve",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: siteUpdated,
    changeFrequency: (path === "" || path === "/journal"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority:
      path === ""
        ? 1
        : path === "/services" ||
            path === "/journal" ||
            path === "/areas-we-serve"
          ? 0.9
          : 0.7,
  }));
  const journal = articles.map((article) => ({
    url: `${SITE_URL}/journal/${article.slug}`,
    lastModified: new Date(`${article.modified}T00:00:00+10:00`),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  const treatments = treatmentPages.map((treatment) => ({
    url: `${SITE_URL}/treatments/${treatment.slug}`,
    lastModified: siteUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  const equipment = equipmentPages.map((item) => ({
    url: `${SITE_URL}/equipment/${item.slug}`,
    lastModified: siteUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const locations = locationPages.map((location) => ({
    url: `${SITE_URL}/locations/${location.slug}`,
    lastModified: siteUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...core, ...treatments, ...equipment, ...locations, ...journal];
}
