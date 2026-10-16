import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage contains the core brand and booking journey", async () => {
  const homepage = await read("app/page.tsx");
  assert.match(homepage, /Restore\./);
  assert.match(homepage, /Book a treatment/i);
  assert.match(homepage, /Brazilian manual/i);
});

test("women-only sanctuary and studio equipment are visible", async () => {
  const [homepage, siteData, memberships] = await Promise.all([
    read("app/page.tsx"),
    read("app/_data/site.ts"),
    read("app/memberships/page.tsx"),
  ]);
  assert.match(homepage, /Women’s only/);
  assert.match(homepage, /Women’s wellness sanctuary/);
  for (const equipment of ["Lymphatic Body Roller Therapy", "LED Red Light Therapy Bed", "Full Spectrum Infrared Sauna", "Vacuactiv Bodyshape V3 Treadmill", "Vacuactiv Infrastep StairMaster", "Recovery Boots"]) {
    assert.match(siteData, new RegExp(equipment, "i"));
  }
  assert.match(memberships, /memberships.map/);
});

test("all core App Router pages exist", async () => {
  for (const route of ["services", "memberships", "about", "post-op", "faq", "contact"]) {
    const page = await read(`app/${route}/page.tsx`);
    assert.match(page, /export default function/);
  }
});

test("journal contains ten distinct article entries", async () => {
  const articleData = await read("app/_data/articles.ts");
  const slugs = [...articleData.matchAll(/^\s{4}slug: "([^"]+)",$/gm)].map((match) => match[1]);
  assert.equal(slugs.length, 10);
  assert.equal(new Set(slugs).size, 10);
});

test("SEO growth routes use the preferred custom-domain canonical source", async () => {
  const [seo, sitemap, robots, navigation, config] = await Promise.all([
    read("app/_data/seo.ts"),
    read("app/sitemap.ts"),
    read("app/robots.ts"),
    read("app/_data/site.ts"),
    read("next.config.ts"),
  ]);
  assert.match(seo, /https:\/\/www\.lymphandwellness\.com\.au/);
  assert.doesNotMatch(seo, /lymph-wellness\.vercel\.app/);
  assert.match(sitemap, /articles\.map/);
  assert.match(sitemap, /treatmentPages\.map/);
  assert.match(robots, /SITE_URL/);
  assert.match(config, /lymph-wellness\.vercel\.app/);
  assert.match(config, /https:\/\/www\.lymphandwellness\.com\.au/);
  assert.match(navigation, /\/journal/);
});

test("Vercel Web Analytics and Speed Insights load once in the root layout", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /@vercel\/analytics\/next/);
  assert.match(layout, /@vercel\/speed-insights\/next/);
  assert.equal((layout.match(/<Analytics \/>/g) ?? []).length, 1);
  assert.equal((layout.match(/<SpeedInsights \/>/g) ?? []).length, 1);
});

test("medical claims remain qualified", async () => {
  const articleData = await read("app/_data/articles.ts");
  assert.match(articleData, /does not replace medical care|replace medical care/i);
  assert.match(articleData, /responses vary|outcomes vary|individual experiences vary/i);
  assert.doesNotMatch(articleData, /guarantees faster healing/i);
});

test("conversion links use the current Zenoti services portal", async () => {
  const [siteData, contact] = await Promise.all([
    read("app/_data/offerings.ts"),
    read("app/contact/page.tsx"),
  ]);
  assert.match(siteData, /lymphwell\.ap\.zenoti\.com/);
  assert.match(siteData, /webstoreNew\/services\/ab0f43de-2383-47ca-b282-967daa002f72/);
  assert.doesNotMatch(siteData, /simplybook/);
  assert.match(contact, /ContactForm/);
  assert.match(contact, /bookingOptions/);
});

test("GA4 tracks the conversion journey without form personal data", async () => {
  const [layout, analytics] = await Promise.all([
    read("app/layout.tsx"),
    read("app/_components/GoogleAnalytics.tsx"),
  ]);
  assert.match(layout, /<GoogleAnalytics \/>/);
  assert.match(analytics, /G-CVCY63HT5Q/);
  for (const event of ["page_view", "booking_click", "membership_select", "generate_lead", "phone_click", "email_click", "directions_click", "reviews_click", "scroll_depth"]) {
    assert.match(analytics, new RegExp(event));
  }
  assert.doesNotMatch(analytics, /form\.get\("(?:name|email|phone|message)"\)/);
});

test("all booking destinations are the four client-approved Zenoti URLs", async () => {
  const source = await read("app/_data/offerings.ts");
  const urls = [...source.matchAll(/export const \w+_URL = "([^"]+)"/g)].map(m => m[1]);
  const root = "https://lymphwell.ap.zenoti.com/webstoreNew/";
  const center = "ab0f43de-2383-47ca-b282-967daa002f72";
  assert.deepEqual(urls, ["services/", "sales/membership/", "giftcards/", "sales/seriespackage/"].map(path => `${root}${path}${center}`));
  const site = await read("app/_data/site.ts");
  const seo = await read("app/_data/seo.ts");
  assert.doesNotMatch(site + seo, /simplybook\.me/);
  assert.match(site, /BOOKING_URL = SERVICES_URL/);
});
