import { test, expect } from "./fixtures";

const films = [
  ["/", "lounge-walkthrough"],
  ["/equipment/lymphatic-drainage-body-roller", "body-roller"],
  ["/equipment/full-spectrum-infrared-sauna", "infrared-sauna"],
  ["/equipment/vacu-activ-infrastep-stairmill", "infrastep"],
  ["/equipment/recovery-boots", "recovery-boots"],
  ["/equipment/full-body-red-light-therapy-bed", "red-light-bed"],
];

for (const [path, file] of films) {
  test(`reviewed ${file} film waits for playback and decodes successfully`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const mediaRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/videos/clinic/")) mediaRequests.push(request.url());
    });
    await page.goto(path);
    const video = page.locator("video");
    await video.scrollIntoViewIfNeeded();
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).toHaveAttribute("playsinline", "");
    expect(await video.evaluate((el: HTMLVideoElement) => ({
      paused: el.paused, autoplay: el.autoplay, controls: el.controls,
    }))).toEqual({ paused: true, autoplay: false, controls: true });
    expect(mediaRequests).toEqual([]);
    await expect(video.locator("source")).toHaveAttribute("src", `/videos/clinic/${file}.mp4`);
    const poster = await video.getAttribute("poster");
    expect(await page.evaluate(async (src) => {
      const image = new Image(); image.src = src!;
      await image.decode(); return image.naturalWidth > 0;
    }, poster)).toBe(true);
    // Decode the actual delivered file in Chromium and Safari, including iPhone emulation.
    await video.evaluate((el: HTMLVideoElement) => el.play());
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0.1);
    expect(await video.evaluate((el: HTMLVideoElement) => ({
      error: el.error, width: el.videoWidth, height: el.videoHeight,
    }))).toEqual({ error: null, width: 720, height: 1280 });
    await video.evaluate((el: HTMLVideoElement) => el.pause());
  });
}

test("client photography loads across the clinic, visit and equipment journeys", async ({ page }) => {
  test.setTimeout(60000);
  for (const path of ["/", "/about", "/your-first-visit", "/post-op", "/gift-cards", "/equipment/vacu-activ-treadmill-v3", "/treatments/facial-sculpting-melbourne"]) {
    await page.goto(path);
    const photos = page.locator('main img[src*=".webp"]');
    expect(await photos.count()).toBeGreaterThan(0);
    for (const photo of await photos.all()) {
      await photo.scrollIntoViewIfNeeded();
      await expect.poll(() => photo.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      expect((await photo.getAttribute("alt"))!.length).toBeGreaterThan(8);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
