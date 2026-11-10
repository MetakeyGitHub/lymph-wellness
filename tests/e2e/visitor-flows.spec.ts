import { type Page } from "@playwright/test";
import { test, expect } from "./fixtures";
import catalogue from "../../app/_data/catalogue.json" with { type: "json" };
import {
  visitGoals,
  timeOptions,
  findTreatments,
} from "../../app/_data/treatment-finder";
const offer = (code: string) => catalogue.find((o) => o.code === code)!;
async function finder(page: Page) {
  await page.goto("/");
  await page
    .locator(".lw-hero")
    .getByRole("link", { name: "Find your treatment", exact: true })
    .click();
  return page.getByRole("region", { name: "Treatment finder", exact: true });
}
async function captureBooking(
  page: Page,
  action: () => Promise<void>,
  expected: string,
) {
  let destination = "";
  await page.route(
    "https://booking.lymphandwellness.com.au/**",
    async (route) => {
      destination = route.request().url();
      await route.fulfill({
        contentType: "text/html",
        body: "<title>Booking handoff test</title><h1>Booking handoff received</h1>",
      });
    },
  );
  await action();
  await expect(
    page.getByRole("heading", { name: "Booking handoff received" }),
  ).toBeVisible();
  expect(destination).toBe(expected);
}
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
}

test("new visitor finds a one-hour rest visit and the exact booking destination", async ({
  page,
}) => {
  const f = await finder(page);
  await f.getByRole("button", { name: /A moment to unwind/ }).click();
  await expect(
    f.getByRole("heading", { name: "How much time is yours today?" }),
  ).toBeFocused();
  await expect.poll(async () => {
    const heading = await f.getByRole("heading", { name: "How much time is yours today?" }).boundingBox();
    const header = await page.locator(".lw-header").boundingBox();
    return heading!.y >= header!.y + header!.height;
  }).toBe(true);
  await f.getByRole("button", { name: /An hour for me/ }).click();
  await expect(f.locator(".lw-finder-result")).toContainText(
    offer("LWC019").name,
  );
  await expect(f.locator(".lw-finder-result")).toContainText("$55");
  for (const button of await f
    .locator(".lw-finder-footer button,.lw-finder-footer a")
    .all()) {
    const box = await button.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }
  await noOverflow(page);
  await captureBooking(
    page,
    () => f.getByRole("link", { name: /Choose a time/ }).click(),
    offer("LWC019").url,
  );
});
for (const goal of visitGoals.filter((g) => g.id !== "postop"))
  for (const time of timeOptions) {
    test(`finder explores ${goal.id} within ${time.minutes} minutes`, async ({
      page,
    }) => {
      const f = await finder(page);
      await f.getByRole("button", { name: new RegExp(goal.label) }).click();
      await f.getByRole("button", { name: new RegExp(time.label) }).click();
      const matches = findTreatments(catalogue, goal.id, time.minutes);
      if (matches.length) {
        await expect(f.locator(".lw-finder-result h4")).toHaveText(
          matches[0].name,
        );
        await expect(f.locator(".lw-finder-result a")).toHaveAttribute(
          "href",
          matches[0].url,
        );
        if (matches.length > 1) {
          await f
            .getByRole("button", { name: /Explore (another|two other) option/ })
            .click();
          await expect(f.locator("#finder-alternatives a")).toHaveCount(
            matches.length - 1,
          );
          await f
            .getByRole("button", { name: /Hide (another|two other) option/ })
            .click();
          await expect(f.locator("#finder-alternatives")).toBeHidden();
        }
      } else {
        await expect(
          f.getByRole("button", { name: "Choose more time" }),
        ).toBeVisible();
        await expect(f.locator("[data-booking-cta]")).toHaveCount(0);
      }
      await f.getByRole("button", { name: "Back", exact: true }).click();
      await expect(
        f.getByRole("heading", { name: "How much time is yours today?" }),
      ).toBeVisible();
      await f.getByRole("button", { name: "Start again", exact: true }).click();
      await expect(
        f.getByRole("button", { name: /A moment to unwind/ }),
      ).toBeVisible();
      await noOverflow(page);
    });
  }
test("post-operative visitor gets guidance and a clinic contact path", async ({
  page,
}) => {
  const f = await finder(page);
  await f.getByRole("button", { name: /Care after surgery/ }).click();
  await expect(f).toContainText("treating team");
  await expect(f.locator("[data-booking-cta]")).toHaveCount(0);
  await f.getByRole("link", { name: "Talk to our team" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(
    page.getByRole("button", { name: "Prepare enquiry" }),
  ).toBeVisible();
});
test("returning visitor filters services, resets an empty result and books by price", async ({
  page,
}) => {
  await page.goto("/services");
  await page.getByRole("button", { name: /Wellness machines/ }).click();
  await page.getByRole("searchbox", { name: "Find a treatment" }).fill("sauna");
  await expect(page.locator("#treatment-results article")).toHaveCount(1);
  await expect(page.locator("#treatment-results")).toContainText("$55");
  await page
    .getByRole("searchbox", { name: "Find a treatment" })
    .fill("no matching treatment");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.locator("#treatment-results article")).toHaveCount(34);
  const row = page.locator("#offer-LWC019");
  await row.scrollIntoViewIfNeeded();
  const price = row.locator("strong");
  await captureBooking(
    page,
    () => price.click({ force: true }),
    offer("LWC019").url,
  );
});
for (const surface of ["name", "price", "blank space"]) {
  test(`experience buyer can click the ${surface} of the whole offer row`, async ({
    page,
  }) => {
    await page.goto("/packages");
    const row = page.locator("#offer-Day-P2");
    await row.scrollIntoViewIfNeeded();
    await captureBooking(
      page,
      async () => {
        const box = await (
          surface === "name"
            ? row.locator("h3")
            : surface === "price"
              ? row.locator("strong")
              : row
        ).boundingBox();
        await page.mouse.click(
          box!.x + (surface === "blank space" ? box!.width / 2 : 20),
          box!.y +
            (surface === "blank space" ? box!.height - 12 : box!.height / 2),
        );
      },
      offer("Day P2").url,
    );
  });
}
test("pack buyer sees expiry and reaches the selected purchase", async ({
  page,
}) => {
  await page.goto("/packages");
  await page
    .getByRole("navigation", { name: "Package options" })
    .getByRole("link", { name: "Buy a session pack" })
    .click();
  const row = page.locator("#offer-PrivateSauna5");
  await expect(row).toContainText("1 year from purchase");
  await captureBooking(
    page,
    () => row.getByRole("link", { name: /Select pack/ }).click(),
    offer("PrivateSauna5").url,
  );
});
test("membership shopper can compare all four exact monthly plans", async ({
  page,
}) => {
  await page.goto("/memberships");
  await page
    .getByRole("link", { name: "Compare memberships", exact: true })
    .click();
  await expect(page.locator(".lw-plan")).toHaveCount(4);
  for (const item of catalogue.filter((o) => o.kind === "membership")) {
    const link = page.getByRole("link", {
      name: `Select this membership — ${item.name}`,
      exact: true,
    });
    await expect(link).toHaveAttribute("href", item.url);
  }
  await noOverflow(page);
});
test("gift buyer reaches the gift-card flow without an implied appointment", async ({
  page,
}) => {
  await page.goto("/gift-cards");
  await page
    .getByRole("link", { name: "Choose your gift", exact: true })
    .click();
  await expect(page.locator(".lw-gift-panel")).toContainText(
    "Select your amount in the next step",
  );
  await captureBooking(
    page,
    () =>
      page
        .getByRole("link", { name: "Create your gift card", exact: true })
        .click(),
    "https://booking.lymphandwellness.com.au/webstoreNew/giftcards/ab0f43de-2383-47ca-b282-967daa002f72",
  );
});
test("visitor searches FAQ answers and opens the relevant topic", async ({
  page,
}) => {
  await page.goto("/search");
  await page.getByRole("searchbox").fill("sauna");
  await page.getByRole("button", { name: "FAQs", exact: true }).click();
  await page
    .getByRole("link", { name: /Can I visit the sauna with a friend/ })
    .click();
  await expect(page).toHaveURL(/\/faq#machines$/);
  await page
    .getByText("Can I visit the sauna with a friend?", { exact: true })
    .click();
  await expect(page.locator("details[open]")).toContainText("$80");
  await noOverflow(page);
});
test("keyboard visitor can select, go back and restart the finder", async ({
  page, browserName,
}) => {
  const f = await finder(page);
  const choice = f.getByRole("button", { name: /Lymphatic body care/ });
  await choice.focus();
  await page.keyboard.press("Enter");
  await expect(
    f.getByRole("heading", { name: "How much time is yours today?" }),
  ).toBeFocused();
  // Safari uses Option-Tab for all clickable controls by default.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(f.getByRole("button", { name: /A little pause/ })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(
    f.getByRole("button", { name: "Choose more time" }),
  ).toBeVisible();
  await f.getByRole("button", { name: "Back", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    f.getByRole("heading", { name: "How much time is yours today?" }),
  ).toBeFocused();
});
test("mobile navigation opens, closes on Escape and follows a destination", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile navigation only");
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile", exact: true })
    .getByRole("link", { name: "Experiences & packs", exact: true })
    .click();
  await expect(page).toHaveURL(/\/packages$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile", exact: true }),
  ).toBeHidden();
});
test("reduced-motion preference removes finder entrance animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const f = await finder(page);
  await f.getByRole("button", { name: /A moment to unwind/ }).click();
  expect(
    await f
      .locator(".lw-finder-stage")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
test("main pages have vector arrows, loaded imagery, no overflow or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of [
    "/",
    "/services",
    "/packages",
    "/memberships",
    "/gift-cards",
    "/search",
    "/faq",
    "/contact",
    "/about",
    "/post-op",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await noOverflow(page);
    await page.waitForLoadState("networkidle");
    expect(await page.locator("body").innerText()).not.toMatch(/[↗↖↘↙→←↓↑✳◔◑]/u);
    expect(await page.locator("svg.lw-icon").count()).toBeGreaterThan(0);
    const hero = page.locator("main img").first();
    if (await hero.count())
      await expect
        .poll(() =>
          hero.evaluate(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
  }
  expect(errors).toEqual([]);
});


test("enquiry form identifies missing and invalid fields before opening an email", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  await expect(page.getByRole("textbox", { name: "Name", exact: true })).toBeFocused();
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test visitor");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("invalid-email");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  expect(await page.getByRole("textbox", { name: "Email", exact: true }).evaluate(el => (el as HTMLInputElement).validity.typeMismatch)).toBe(true);
  await expect(page.locator(".form-status")).toContainText("Submitting prepares a private email");
});

test("cookie settings explain deferred analytics and close with focus restored", async ({ page }) => {
  const googleRequests: string[] = [];
  page.on("request", request => { if (/google-analytics\.com|googletagmanager\.com/.test(request.url())) googleRequests.push(request.url()); });
  await page.goto("/");
  const settings = page.getByRole("button", { name: "Cookie settings" });
  await settings.click();
  await expect(page.locator(".lw-cookie-panel")).toBeVisible();
  await page.getByRole("button", { name: "Close settings" }).click();
  await expect(page.locator(".lw-cookie-panel")).toHaveCount(0);
  await expect(settings).toBeFocused();
  expect(googleRequests).toEqual([]);
});
