import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const source = await readFile(new URL("../app/_data/offerings.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const data = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
const allowed = new Set([data.SERVICES_URL, data.MEMBERSHIP_URL, data.GIFT_CARDS_URL, data.SERIES_PACKAGES_URL]);
const decode = s => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<!--.*?-->/gs, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
async function fetchText(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${path} HTTP status`);
  return response.text();
}
const sitemap = await fetchText("/sitemap.xml");
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
for (const path of ["/packages", "/gift-cards", "/services", "/memberships"]) assert(paths.includes(path), `Missing sitemap route ${path}`);
const pages = new Map();
let linkCount = 0;
for (const path of [...paths, "/terms", "/privacy"]) {
  const html = await fetchText(path); pages.set(path, html);
  assert(!html.includes("simplybook.me"), `${path} contains obsolete provider`);
  assert(!html.includes("Beachside Essential"), `${path} contains retired membership`);
  for (const [, attrs, body] of html.matchAll(/<a\b([^>]*)>(.*?)<\/a>/gs)) {
    const href = attrs.match(/\bhref="([^"]+)"/)?.[1];
    if (!href?.includes("zenoti.com")) continue;
    linkCount++;
    assert(allowed.has(href), `${path} unexpected booking URL ${href}`);
    const label = decode(body).toLowerCase();
    if (/membership/.test(label)) assert.equal(href, data.MEMBERSHIP_URL, `${path} membership CTA`);
    if (/gift/.test(label)) assert.equal(href, data.GIFT_CARDS_URL, `${path} gift card CTA`);
    if (/series package/.test(label)) assert.equal(href, data.SERIES_PACKAGES_URL, `${path} package CTA`);
    if (/book.*(?:treatment|session|services)|^book ↗$/.test(label)) assert.equal(href, data.SERVICES_URL, `${path} service CTA`);
  }
}
function verifyRows(path, expected) {
  const html = pages.get(path);
  const rows = [...html.matchAll(/<tr\b[^>]*>(.*?)<\/tr>/gs)].map(m => decode(m[1]));
  for (const tokens of expected) assert(rows.some(row => tokens.every(token => row.includes(String(token)))), `${path} missing or incorrect row: ${tokens.join(" | ")}`);
  assert.equal(rows.length - (path === "/services" ? data.serviceGroups.length : path === "/packages" ? data.packageGroups.length : 1), expected.length, `${path} row count`);
}
verifyRows("/services", data.serviceGroups.flatMap(g => g.items.map(([name, minutes, price]) => [name, `${minutes} min`, data.formatPrice(price)])));
verifyRows("/packages", data.packageGroups.flatMap(g => g.items.map(([name, price, expiry, includes]) => [name, includes, expiry, data.formatPrice(price)])));
verifyRows("/memberships", data.memberships.map(p => [p.name, p.period, data.formatPrice(p.price)]));
for (const amount of data.giftCardAmounts) assert(decode(pages.get("/gift-cards")).includes(data.formatPrice(amount)));
const result = { base, checkedAt: new Date().toISOString(), pages: pages.size, zenotiLinks: linkCount, services: data.serviceGroups.reduce((n,g)=>n+g.items.length,0), packages: data.packageGroups.reduce((n,g)=>n+g.items.length,0), memberships: data.memberships.length, result: "PASS" };
console.log(JSON.stringify(result, null, 2));
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(result, null, 2) + "\n");
