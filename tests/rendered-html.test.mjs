import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const environment = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const context = { waitUntil() {}, passThroughOnException() {} };

test("server-renders the branded homepage", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), environment, context);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Lymphatic Drainage &amp; Wellness Clinic Melbourne/);
  assert.match(html, /Restore\./);
  assert.match(html, /Book a treatment/i);
  assert.doesNotMatch(html, /codex-preview|Building your site/i);
});

test("all core routes return branded pages", async () => {
  const worker = await getWorker();
  for (const route of ["/services", "/about", "/post-op", "/faq", "/contact"]) {
    const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), environment, context);
    assert.equal(response.status, 200, route);
    assert.match(await response.text(), /Lymph &amp; Wellness/);
  }
});
