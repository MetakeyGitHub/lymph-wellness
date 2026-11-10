# Deferred project to-do

Updated 10 November 2026. Google account work is explicitly deferred at the owner's request until access is available; do not block website releases on these items.

- [ ] Verify the clinic-owned GA4 property and measurement ID; review automatic measurement settings, activate consent-based events and confirm receipt in Realtime. Analytics remains disabled until then.
- [ ] Verify Search Console ownership, submit the sitemap, inspect indexing and establish a search-performance / Core Web Vitals baseline.
- [ ] Review the owner-managed Google Business Profile: category, hours, website, appointment link, services and photos.
- [ ] Verify Zenoti-side completed-booking and revenue attribution. Website booking clicks are not confirmed sales.
- [ ] Replace the email-draft enquiry form with a hosted backend when requested, including spam protection, delivery monitoring and a genuine success state.
- [ ] Review overlapping suburb pages using Search Console performance before merging or redirecting them.
- [ ] Opening hours: the owner has asked for the website to follow Google Business Profile. Google shows Wednesday opening at 10:30 am (website says 9:00 am); the full weekly hours from Google are still needed before `openingHours` in `app/_data/site.ts` and the schema in `app/layout.tsx` can be updated.
- [ ] In Search Console: verify both `www.lymphandwellness.com.au` and `lymph-wellness.vercel.app`, then use Removals / Change of Address signals so the old vercel.app results drop out faster. The vercel.app host already 308-redirects to the branded domain.
- [ ] Google still credits an old Instagram handle (`lymph.wellnessco`) in results; confirm the current handle and update the old profile's bio/link if it still exists.
- [ ] Add Seda Yener's verified qualifications to `FOUNDER` in `app/_data/site.ts` and the clinic page.
- [ ] Confirm the display typeface and clay accent against the brand guidelines; both are single tokens in `app/design.css`.
- [ ] Decide whether to show a founder portrait on the clinic page (existing portraits are low resolution).
- [ ] Add public-holiday and closure dates if the live open/closed status should reflect them.
- [ ] Commission original practitioner/treatment photography and short editorial film for a more distinctive visual identity; retain the verified clinic images meanwhile.

Completed: branded domain and redirects, redesigned production site, verified offer deep links, SEO metadata and sitemap, site search, expanded FAQ content, dependency security updates.
