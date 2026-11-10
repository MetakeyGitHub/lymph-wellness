# Lymph & Wellness

Premium editorial website for a Melbourne boutique wellness and body-care clinic, designed from the official Lymph & Wellness brand guidelines.

## Preview

```bash
npm install
npm run dev
```

## Production

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Optimised local imagery and self-hosted fonts
- Vercel-ready metadata, sitemap, structured data and responsive layouts

Run `npm ci`, `npm run lint`, `npm run build`, then `npm test` before deployment. Tests inspect the production HTML, so build before testing.

## Booking and content

`app/_data/catalogue.json` is the verified public Zenoti catalogue (10 November 2026). Named offers must retain their exact item URL; do not substitute a generic booking homepage. Packs and memberships are purchases, while services and one-visit experiences are appointments. No completed booking or payment is recorded by this website.

The site search runs in the browser. Search terms, finder choices and enquiry values are not sent to analytics. FAQ prices are derived from the same catalogue. Recheck Zenoti whenever prices, availability, names or inclusions change.

## Optional analytics — activation requires account verification

Analytics stays disabled unless `NEXT_PUBLIC_GA_ENABLED=true` is set at build time. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the clinic-owned GA4 web stream ID. The legacy ID is `G-CVCY63HT5Q`; ownership and stream settings must be checked before activating it. Preview and localhost hosts never load Google Analytics.

Before enabling: verify the production web stream; disable Enhanced Measurement (including browser-history pageviews, outbound clicks, site search and form interactions), connected advertising/personalisation destinations and user-provided data collection; review data retention and access; then rebuild. Automatic event settings can expose full URLs or form context and bypass the deliberately limited manual event payloads.

The visitor must allow analytics before the Google script loads. Cookie settings in the footer allow withdrawal. Manual events are `page_view`, `booking_outbound`, `phone_click`, `email_click`, `directions_click`, `instagram_click`, `reviews_click` and `enquiry_draft_prepared`. Page views use a fixed homepage URL and a broad `page_section`; no treatment slug, search query, link URL, item ID, form value or identity is sent. Booking events only distinguish appointment, session pack, membership or gift card and header/footer/content placement.

After activation, verify accepted/refused consent and withdrawal in the browser and confirm receipt in GA4 Realtime/DebugView. Register `page_section`, `destination_type` and `link_placement` as event-scoped dimensions if useful. Booking clicks and email drafts are intent signals, **not completed bookings, submitted leads or revenue**. Completed conversion reporting requires a separately verified Zenoti-side integration.

## Search and release checks

The canonical production host is `https://www.lymphandwellness.com.au`. The sitemap is `/sitemap.xml`, robots is `/robots.txt` and the 1200×630 branded social image is `/share-image`. Search and legal pages are intentionally excluded from indexing. Existing location URLs are retained; review their real Search Console traffic before merging or redirecting overlapping pages.

Google Search Console and Business Profile require clinic-owned account access. Verify ownership, submit the sitemap, inspect core URLs and review indexing and performance. Keep Business Profile hours, category, website, appointment link and address aligned with the website. Structured data and content improvements do not guarantee a ranking or rich result.

Production uses the Vercel `lymph-wellness` project in the `meta-key` team. Stage a production build with `vercel deploy --prod --skip-domain`, verify it, then promote that exact deployment. Deploy from a clean tracked checkout to exclude unrelated local files and audit evidence. Record the previous production URL for rollback.

`minimatch` is overridden only under `@typescript-eslint/typescript-estree` to 11.0.5 to address the npm-reported glob amplification advisory. Re-evaluate this override when upgrading typescript-eslint; lint and production builds are checked with it.

The legacy minimatch 3 branch also pins brace-expansion 1.1.21 through an override to address its published denial-of-service advisories. Neither override affects the visitor runtime.

## Browser regression tests

Run `npx playwright install chromium webkit` once, then `npm run build && npm run test:e2e`. The suite covers new and returning visitors, every finder combination, post-operative guidance, whole-row offer clicks, packs, memberships, gifting, search, navigation, keyboard controls, reduced motion, form validation and automated accessibility scans. It runs desktop Chromium, desktop WebKit and an iPhone 13 WebKit profile. These are simulated visitor scenarios, not independent human participants or a physical iPhone test.

Booking tests intercept the outbound request and assert the exact verified catalogue URL without creating an appointment or payment. They verify the website handoff, not Zenoti checkout completion. Run against production with `PLAYWRIGHT_BASE_URL=https://www.lymphandwellness.com.au npm run test:e2e`. Live tests preserve all security headers. The local HTTP fixture removes only CSP upgrade-insecure-requests so WebKit can load localhost assets; production CSP is unchanged. Safari keyboard tests use Option-Tab, its default all-controls navigation shortcut.

The HTML report is `playwright-report/index.html`; machine-readable results are `test-results/results.json`. Neither generated directory is committed or linted. Automated axe checks supplement visual and keyboard review; passing them does not certify full WCAG conformance.
