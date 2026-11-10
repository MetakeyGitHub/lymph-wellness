import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
const read = (p) => readFile(new URL(p, root), "utf8");
const catalogue = JSON.parse(await read("app/_data/catalogue.json"));
const byCode = (code) => catalogue.find((o) => o.code === code);
const centre = "ab0f43de-2383-47ca-b282-967daa002f72";
const allowed = new Set(catalogue.filter((o) => o.available).map((o) => o.url));
allowed.add(
  `https://booking.lymphandwellness.com.au/webstoreNew/giftcards/${centre}`,
);
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map((e) =>
      e.isDirectory()
        ? htmlFiles(path.join(dir, e.name))
        : e.name.endsWith(".html")
          ? [path.join(dir, e.name)]
          : [],
    ),
  );
  return paths.flat();
}
test("public catalogue contains only approved service, experience, pack and membership records", () => {
  const counts = Object.fromEntries(
    ["service", "day_package", "series_package", "membership"].map((kind) => [
      kind,
      catalogue.filter((o) => o.kind === kind).length,
    ]),
  );
  assert.deepEqual(counts, {
    service: 34,
    day_package: 13,
    series_package: 18,
    membership: 4,
  });
  assert.equal(new Set(catalogue.map((o) => o.code)).size, catalogue.length);
  for (const code of [
    "EMSINTRO6",
    "PRINTRO",
    "PSSINTRO",
    "VAIntro",
    "GOM1",
    "LMEM006",
  ])
    assert.equal(
      byCode(code),
      undefined,
      `Retired ${code} must not be promoted`,
    );
});
test("every deep link selects the correct item type, centre and identifier", () => {
  for (const item of catalogue) {
    const url = new URL(item.url);
    assert.equal(url.hostname, "booking.lymphandwellness.com.au");
    assert.ok(url.pathname.endsWith(centre));
    const param = {
      service: "serviceid",
      day_package: "daypackageid",
      series_package: "seriespackageid",
      membership: "membershipid",
    }[item.kind];
    assert.equal(url.searchParams.size, 1);
    assert.equal(
      url.searchParams.get(param),
      ["service", "day_package"].includes(item.kind) ? item.id : item.versionId,
    );
    assert.ok(item.price > 0);
  }
});
test("corrected prices and treatment lengths are retained", () => {
  for (const [code, price] of Object.entries({
    LWC001: 210,
    LWC003: 310,
    LWC004: 220,
    LWMET01: 125,
    LWMET03: 90,
    LWNP01: 195,
    EMS4P: 599,
    PR: 129,
    "3PR": 382,
    MEM005: 236,
  }))
    assert.equal(byCode(code).price, price, code);
  assert.equal(byCode("LWC017").minutes, 30);
  assert.equal(byCode("LWC020").minutes, 15);
  assert.equal(byCode("PrivateSauna5").expiry, "1 Year from purchase");
});
test("all rendered booking links are exact approved destinations", async () => {
  const files = await htmlFiles(
    fileURLToPath(new URL(".next/server/app/", root)),
  );
  assert.ok(files.length >= 35, "Run npm run build before tests");
  let bookingLinks = 0;
  for (const file of files) {
    const html = await readFile(file, "utf8");
    for (const [, raw] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = raw.replaceAll("&amp;", "&");
      assert.ok(
        !href.includes("lymphwell.ap.zenoti.com"),
        `Old host in ${file}`,
      );
      if (href.includes("/webstoreNew/")) {
        bookingLinks++;
        assert.ok(
          allowed.has(href),
          `Unmatched booking link ${href} in ${file}`,
        );
      }
    }
  }
  assert.ok(
    bookingLinks >= 70,
    "Rendered pages should expose selected-offer links",
  );
});
test("all internal rendered links resolve to retained pages or real anchors", async () => {
  const dir = fileURLToPath(new URL(".next/server/app/", root));
  const files = await htmlFiles(dir);
  const pages = new Map(
    await Promise.all(
      files.map(async (f) => [
        ("/" + path.relative(dir, f).replace(/\.html$/, "")).replace(
          "/index",
          "/",
        ),
        await readFile(f, "utf8"),
      ]),
    ),
  );
  let checked = 0;
  for (const [route, html] of pages) {
    for (const [, raw] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      if (
        !raw.startsWith("/") ||
        raw.startsWith("//") ||
        raw.includes("/webstoreNew/")
      )
        continue;
      const [pathname, anchor] = raw.split("#");
      const target = pages.get(pathname === "/" ? "/" : pathname);
      assert.ok(target, `Missing internal route ${raw} on ${route}`);
      if (anchor)
        assert.ok(
          target.includes(`id="${anchor}"`),
          `Missing anchor ${raw} on ${route}`,
        );
      checked++;
    }
  }
  assert.ok(checked > 100);
});
test("privacy, brand identity and hours remain consistent in rendered output", async () => {
  const home = await read(".next/server/app/index.html");
  assert.match(home, /lymph\.andwellness/);
  assert.doesNotMatch(
    home,
    /lymph\.wellnessco|googletagmanager|google-analytics|va\.vercel|speed-insights/i,
  );
  assert.match(home, /19:30/);
  assert.match(home, /21:00/);
  assert.doesNotMatch(home, /53 reviews|5\.0 rating/);
});
