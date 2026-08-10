import type { MetadataRoute } from "next";
import { articles } from "./_data/articles";
import { SITE_URL, treatmentPages } from "./_data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "/services", "/memberships", "/about", "/post-op", "/faq", "/contact", "/journal", "/areas-we-serve"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: new Date("2026-08-10T00:00:00+10:00"),
    changeFrequency: (path === "" || path === "/journal" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : path === "/services" || path === "/journal" || path === "/areas-we-serve" ? .9 : .7,
  }));
  const journal = articles.map((article) => ({ url: `${SITE_URL}/journal/${article.slug}`, lastModified: new Date(`${article.modified}T00:00:00+10:00`), changeFrequency: "monthly" as const, priority: .75 }));
  const treatments = treatmentPages.map((treatment) => ({ url: `${SITE_URL}/treatments/${treatment.slug}`, lastModified: new Date("2026-08-10T00:00:00+10:00"), changeFrequency: "monthly" as const, priority: .9 }));
  return [...core, ...treatments, ...journal];
}
