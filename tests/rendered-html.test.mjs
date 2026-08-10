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
