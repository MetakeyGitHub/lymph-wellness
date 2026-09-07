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
  for (const equipment of ["Lymphatic drainage body rollers", "Full-body red light therapy bed", "Full-spectrum infrared sauna", "Vacu Activ vacuum treadmill V3", "Vacu Activ Infrastep StairMill"]) {
    assert.match(siteData, new RegExp(equipment, "i"));
  }
  assert.match(memberships, /Full-Spectrum Infrared Sauna/);
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

test("SEO growth routes and production canonical source exist", async () => {
  const [seo, sitemap, navigation] = await Promise.all([
    read("app/_data/seo.ts"),
    read("app/sitemap.ts"),
    read("app/_data/site.ts"),
  ]);
  assert.match(seo, /https:\/\/lymph-wellness\.vercel\.app/);
  assert.match(sitemap, /articles\.map/);
  assert.match(sitemap, /treatmentPages\.map/);
  assert.match(navigation, /\/journal/);
});

test("medical claims remain qualified", async () => {
  const articleData = await read("app/_data/articles.ts");
  assert.match(articleData, /does not replace medical care|replace medical care/i);
  assert.match(articleData, /responses vary|outcomes vary|individual experiences vary/i);
  assert.doesNotMatch(articleData, /guarantees faster healing/i);
});

test("conversion links avoid broken checkout and open direct booking times", async () => {
  const [siteData, contact] = await Promise.all([
    read("app/_data/site.ts"),
    read("app/contact/page.tsx"),
  ]);
  assert.match(siteData, /lymphwell\.ap\.zenoti\.com/);
  assert.match(siteData, /service\/2\/count\/1\/addons\/no/);
  assert.match(siteData, /info@lymphandwellnessco\.com\.au/);
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
