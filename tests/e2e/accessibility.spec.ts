import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
for (const path of [
  "/",
  "/services",
  "/packages",
  "/memberships",
  "/search",
  "/faq",
  "/contact",
  "/compare-treatments",
  "/your-first-visit",
  "/treatments/lymphatic-drainage-melbourne",
  "/treatments/facial-sculpting-melbourne",
  "/treatments/ems-body-sculpting-melbourne",
]) {
  test(`accessibility checks for ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}
