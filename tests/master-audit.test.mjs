import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  classifyLink,
  safePageSection,
  SAFE_PAGE_CONTEXT,
} from "../app/_lib/analytics-events.ts";
import { searchEntries } from "../app/_data/search.ts";
const origin = "https://www.lymphandwellness.com.au";
const root = new URL("../", import.meta.url);
const read = (p) => readFile(new URL(p, root), "utf8");
async function walk(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory()
          ? walk(path.join(dir, e.name))
          : e.name.endsWith(".html")
            ? [path.join(dir, e.name)]
            : [],
      ),
    )
  ).flat();
}
const decode = (s) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const files = await walk(fileURLToPath(new URL(".next/server/app/", root)));
const pages = await Promise.all(
  files
    .filter((f) => !/(?:_not-found|_global-error)\.html$/.test(f))
    .map(async (file) => ({
      route:
        "/" +
        path
          .relative(fileURLToPath(new URL(".next/server/app/", root)), file)
          .replace(/\.html$/, "")
          .replace(/^index$/, ""),
      html: await readFile(file, "utf8"),
    })),
);
test("analytics events omit URLs, queries, treatment names, IDs and contact details", async () => {
  const catalogue = JSON.parse(await read("app/_data/catalogue.json"));
  for (const offer of catalogue) {
    const event = classifyLink(offer.url + "&email=person@example.com");
    assert.equal(event.name, "booking_outbound");
    assert.deepEqual(Object.keys(event.parameters), ["destination_type"]);
    assert.equal(
      event.parameters.destination_type,
      offer.kind === "membership"
        ? "membership"
        : offer.kind === "series_package"
          ? "session_pack"
          : "appointment",
    );
    assert.doesNotMatch(
      JSON.stringify(event),
      /example|serviceid|membershipid|lymphatic/i,
    );
  }
  assert.deepEqual(
    classifyLink("mailto:person@example.com?body=private-medical-detail"),
    { name: "email_click", parameters: {} },
  );
  assert.deepEqual(classifyLink("tel:+61412345678"), {
    name: "phone_click",
    parameters: {},
  });
  assert.equal(
    classifyLink(
      "https://booking.lymphandwellness.com.au.evil.example/webstoreNew/services/id",
    ),
    null,
  );
  assert.equal(classifyLink("javascript:alert(1)"), null);
  assert.equal(classifyLink("/search?q=sensitive-health-query"), null);
  assert.equal(safePageSection("/journal/private-health-topic"), "guides");
  assert.equal(safePageSection("/post-op"), "menu");
  assert.deepEqual(SAFE_PAGE_CONTEXT, {
    page_location: origin + "/",
    page_referrer: "",
    page_title: "Lymph & Wellness",
  });
});
test("site search handles multiword, case, category and no-result queries", () => {
  const entries = [
    {
      title: "Private Sauna",
      description: "45 minute session",
      category: "Treatments",
      href: "/a",
      action: "Book",
    },
    {
      title: "Sauna packs",
      description: "Five private visits",
      category: "Session packs",
      href: "/b",
      action: "Choose",
    },
  ];
  assert.equal(searchEntries(entries, "  PRIVATE   sauna ").length, 2);
  assert.equal(searchEntries(entries, "sauna", "Session packs")[0].href, "/b");
  assert.equal(searchEntries(entries, "45")[0].href, "/a");
  assert.equal(searchEntries(entries, "unavailable").length, 0);
  assert.equal(searchEntries(entries, "").length, 2);
});
test("all real pages have a unique title, description, canonical, social preview and one H1", () => {
  const titles = new Set(),
    descriptions = new Set();
  for (const { route, html } of pages) {
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(
      /<meta name="description" content="([^"]+)"/,
    )?.[1];
    assert.ok(title && description, route);
    assert.ok(!titles.has(title), `Duplicate title ${route}`);
    titles.add(title);
    assert.ok(!descriptions.has(description), `Duplicate description ${route}`);
    descriptions.add(description);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    const canonical = [
      ...html.matchAll(/<link rel="canonical" href="([^"]+)"/g),
    ];
    assert.equal(canonical.length, 1, route);
    assert.equal(
      new URL(decode(canonical[0][1])).href,
      new URL(origin + route).href,
      route,
    );
    assert.match(
      html,
      /<meta property="og:image" content="https:\/\/www\.lymphandwellness\.com\.au\/share-image"/,
      route,
    );
    assert.match(html, /<meta property="og:image:width" content="1200"/, route);
    assert.match(html, /<meta property="og:image:height" content="630"/, route);
    assert.match(
      html,
      /<meta name="twitter:card" content="summary_large_image"/,
      route,
    );
  }
  assert.ok(pages.length >= 38);
});
test("visible FAQs match valid structured data, and all structured data parses", async () => {
  for (const { route, html } of pages)
    for (const [, json] of html.matchAll(
      /<script type="application\/ld\+json">(.*?)<\/script>/g,
    )) {
      assert.doesNotThrow(() => JSON.parse(json), route);
    }
  const faq = pages.find((p) => p.route === "/faq").html;
  const schemas = [
    ...faq.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
  ].flatMap(([, json]) => JSON.parse(json));
  const schema = schemas.find((s) => s["@type"] === "FAQPage");
  assert.equal(schema.mainEntity.length, 26);
  assert.equal((faq.match(/<summary>/g) || []).length, 26);
  for (const question of schema.mainEntity) {
    assert.ok(decode(faq).includes(question.name), question.name);
    assert.ok(
      decode(faq).includes(question.acceptedAnswer.text),
      question.name,
    );
  }
});
test("local images exist and same-page anchors resolve", async () => {
  let assets = 0;
  for (const { route, html } of pages) {
    for (const [, raw] of html.matchAll(/<a\b[^>]*href="#([^"]+)"/g))
      assert.ok(html.includes(`id="${raw}"`), `Missing ${route}#${raw}`);
    for (const [, raw] of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
      const url = new URL(decode(raw), origin);
      const imagePath =
        url.pathname === "/_next/image"
          ? url.searchParams.get("url")
          : url.pathname;
      if (!imagePath?.startsWith("/") || imagePath.startsWith("/_next/"))
        continue;
      await assert.doesNotReject(
        () => access(new URL("public" + imagePath, root)),
        `Missing image ${imagePath} on ${route}`,
      );
      assets++;
    }
  }
  assert.ok(assets > 30);
});
test("sitemap contains canonical indexable pages and excludes search and legal pages", async () => {
  const sitemap = await read(".next/server/app/sitemap.xml.body");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, url]) => url,
  );
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) {
    const page = pages.find((p) => origin + p.route === url);
    assert.ok(page, `Missing sitemap route ${url}`);
    assert.doesNotMatch(page.html, /<meta name="robots" content="[^"]*noindex/);
  }
  for (const route of ["/search", "/privacy", "/terms"]) {
    assert.ok(!urls.includes(origin + route));
    assert.match(
      pages.find((p) => p.route === route).html,
      /<meta name="robots" content="noindex, follow"/,
    );
  }
  assert.match(sitemap, /2026-11/);
});
