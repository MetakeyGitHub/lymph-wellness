import { test, expect } from "./fixtures";
import catalogue from "../../app/_data/catalogue.json" with { type: "json" };

test("home gives lymphatic care a clear route into treatment comparison", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".lw-hero-intro")).toContainText(
    "Lymphatic massage",
  );
  expect(
    await page
      .locator(".lw-signature")
      .evaluate((el) =>
        Boolean(
          el.compareDocumentPosition(
            document.querySelector("#curated-experiences")!,
          ) & Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
  ).toBe(true);
  await page
    .getByRole("link", { name: "Compare treatment options", exact: true })
    .click();
  await expect(page).toHaveURL(/\/compare-treatments$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The right visit.For your time.",
  );
});

test("comparison exposes all ten verified choices and category anchors", async ({
  page,
}) => {
  await page.goto("/compare-treatments");
  const cards = page.locator(".lw-compare-card");
  await expect(cards).toHaveCount(10);
  for (const card of await cards.all()) {
    const code = await card.getAttribute("data-offer-code");
    const offer = catalogue.find((o) => o.code === code)!;
    await expect(card.locator("h3")).toHaveText(offer.name);
    await expect(card.locator("dl")).toContainText(`$${offer.price}`);
    await expect(card.locator("dl")).toContainText(`${offer.minutes} minutes`);
    await expect(card.getByRole("link")).toHaveAttribute("href", offer.url);
  }
  await page
    .getByRole("navigation", { name: "Treatment comparisons" })
    .getByRole("link", { name: /EMS sessions/ })
    .click();
  await expect(page).toHaveURL(/#compare-ems$/);
  await expect(page.locator("#compare-ems h2")).toBeInViewport();
  await expect(page.locator("#compare-ems")).toContainText(
    "does not define treatment-area coverage",
  );
});

test("comparison card price clicks carry the exact 90-minute option into booking", async ({
  page,
}) => {
  const offer = catalogue.find((o) => o.code === "LWC002")!;
  let destination = "";
  await page.route(
    "https://booking.lymphandwellness.com.au/**",
    async (route) => {
      destination = route.request().url();
      await route.fulfill({
        contentType: "text/html",
        body: "<h1>Selected booking received</h1>",
      });
    },
  );
  await page.goto("/compare-treatments");
  const price = page.locator('[data-offer-code="LWC002"] .lw-compare-price dd');
  await price.scrollIntoViewIfNeeded();
  const box = await price.boundingBox();
  await page.mouse.click(box!.x + 20, box!.y + box!.height / 2);
  await expect(
    page.getByRole("heading", { name: "Selected booking received" }),
  ).toBeVisible();
  expect(destination).toBe(offer.url);
});

test("first-time visitor can follow every stage, get directions and compare appointments", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Plan your first visit", exact: true })
    .click();
  await expect(page).toHaveURL(/\/your-first-visit$/);
  const nav = page.getByRole("navigation", { name: "First visit stages" });
  for (const id of [
    "before",
    "arrival",
    "conversation",
    "treatment",
    "afterwards",
  ]) {
    await nav.locator(`a[href="#${id}"]`).click();
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  }
  await expect(
    page.getByRole("region", { name: "Clinic address and hours" }),
  ).toContainText("Level 1/22 Pier Street");
  await expect(
    page
      .getByRole("region", { name: "Clinic address and hours" })
      .getByRole("link", { name: "Get directions" }),
  ).toHaveAttribute("href", /google\.com\/maps\/search/);
  await page
    .getByText("Can I ask about accessibility before booking?", { exact: true })
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "access requirements",
  );
  await page
    .locator("#before")
    .getByRole("link", { name: "Compare appointments" })
    .click();
  await expect(page).toHaveURL(/\/compare-treatments$/);
});

test("new guides are discoverable through search and embedded treatment comparisons", async ({
  page,
}) => {
  await page.goto("/search");
  await page.getByRole("searchbox").fill("first visit");
  await page
    .locator(".lw-search-result")
    .filter({ hasText: "Your first visit" })
    .click();
  await expect(page).toHaveURL(/\/your-first-visit$/);
  await page.goto("/treatments/lymphatic-drainage-melbourne");
  await expect(page.locator(".lw-compare-card")).toHaveCount(3);
  await expect(page.locator(".lw-comparison")).toContainText(
    "does not imply a different technique",
  );
});

test("editorial pages fit small screens and retain vector artwork", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/compare-treatments",
    "/your-first-visit",
    "/treatments/facial-sculpting-melbourne",
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    if (!path.startsWith("/treatments/"))
      await expect(page.locator("svg.lw-care-mark").first()).toHaveAttribute(
        "aria-hidden",
        "true",
      );
  }
});
