import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import {
  findTreatments,
  visitGoals,
  timeOptions,
  finderNotes,
} from "../app/_data/treatment-finder.ts";
const catalogue = JSON.parse(
  await readFile(
    new URL("../app/_data/catalogue.json", import.meta.url),
    "utf8",
  ),
);
test("every finder path stays within the selected time and approved bookable catalogue", () => {
  for (const goal of visitGoals)
    for (const time of timeOptions) {
      const results = findTreatments(catalogue, goal.id, time.minutes);
      assert.ok(results.length <= 3);
      assert.equal(new Set(results.map((x) => x.code)).size, results.length);
      for (const result of results) {
        assert.ok(
          result.available &&
            result.minutes <= time.minutes &&
            result.minutes > 0,
        );
        assert.ok(["service", "day_package"].includes(result.kind));
        assert.ok(
          catalogue.includes(result),
          "Keep the original price and exact booking URL",
        );
        assert.ok(finderNotes[result.code]);
      }
    }
});
test("short recovery visits and longer rituals select appropriate exact offers", () => {
  assert.equal(findTreatments(catalogue, "recovery", 60)[0].code, "RR");
  assert.equal(findTreatments(catalogue, "recovery", 30)[0].code, "LWC018");
  assert.equal(findTreatments(catalogue, "rest", 30)[0].code, "LWC017");
  assert.equal(findTreatments(catalogue, "rest", 60)[0].code, "LWC019");
  assert.equal(findTreatments(catalogue, "rest", 120)[0].code, "PRB1");
  assert.equal(findTreatments(catalogue, "body", 60)[0].code, "LWC001");
  assert.equal(findTreatments(catalogue, "face", 60)[0].code, "LWC008");
});
test("no unsuitable fallback for surgery or an insufficient time window", () => {
  for (const time of timeOptions)
    assert.deepEqual(findTreatments(catalogue, "postop", time.minutes), []);
  assert.deepEqual(findTreatments(catalogue, "body", 30), []);
  assert.deepEqual(findTreatments(catalogue, "unknown", 60), []);
  assert.deepEqual(findTreatments(catalogue, "rest", 0), []);
});
test("unavailable, unknown-duration and purchase-only offers are never suggested", () => {
  for (const patch of [
    { available: false },
    { minutes: null },
    { kind: "series_package" },
  ]) {
    const changed = catalogue.map((x) => ({ ...x, ...patch }));
    for (const goal of visitGoals)
      assert.deepEqual(findTreatments(changed, goal.id, 120), []);
  }
});
