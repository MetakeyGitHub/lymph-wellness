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
