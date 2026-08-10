import type { MetadataRoute } from "next";
import { headers } from "next/headers";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return ["", "/services", "/memberships", "/about", "/post-op", "/faq", "/contact", "/privacy", "/terms"].map(path => ({ url: `${origin}${path || "/"}`, changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : path === "/services" || path === "/memberships" || path === "/contact" ? .9 : .7 }));
}
