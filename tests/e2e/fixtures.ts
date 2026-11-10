import { test as base, expect } from "@playwright/test";
export const test = base.extend({
  page: async ({ page, baseURL }, runWithPage) => {
    // Production is HTTPS. WebKit applies upgrade-insecure-requests even to
    // loopback HTTP, unlike Chromium. Remove only that directive for the local
    // test transport; live HTTPS tests exercise the unmodified security headers.
    if (baseURL?.startsWith("http://127.0.0.1:")) {
      await page.route(`${baseURL}/**`, async (route) => {
        if (route.request().resourceType() !== "document")
          return route.continue();
        const response = await route.fetch();
        const headers = response.headers();
        if (headers["content-security-policy"])
          headers["content-security-policy"] = headers[
            "content-security-policy"
          ].replace(/;?\s*upgrade-insecure-requests/g, "");
        await route.fulfill({ response, headers });
      });
    }
    await runWithPage(page);
  },
});
export { expect };
