import { SiteSearch } from "../_components/SiteSearch";
import { PageHero } from "../_components/PageHero";
import { pageMetadata } from "../_data/metadata";
import { offerings, formatPrice } from "../_data/offerings";
import { faqGroups } from "../_data/faqs";
import { articles } from "../_data/articles";
import type { SearchEntry } from "../_data/search";
export const metadata = {
  ...pageMetadata({
    title: "Search Treatments & Guides",
    description:
      "Search the Lymph & Wellness treatment menu, experiences, memberships and practical wellness guides.",
    path: "/search",
  }),
  robots: { index: false, follow: true },
};
export default function SearchPage() {
  const entries: SearchEntry[] = [
    { title: "Your first visit", description: "Preparation, arrival, directions, clothing, accessibility, consultation, privacy and what to expect at our Altona clinic.", href: "/your-first-visit", category: "Guides", action: "Plan your visit" },
    { title: "Compare treatment appointments", description: "Compare 60 and 90 minute lymphatic massage, facial massage, cupping, Qi and EMS prices, lengths and named inclusions.", href: "/compare-treatments", category: "Guides", action: "Compare options" },
    ...offerings
      .filter((o) => o.available)
      .map((o) => ({
        title: o.name,
        description: o.description,
        href: o.url,
        category:
          o.kind === "service"
            ? "Treatments"
            : o.kind === "day_package"
              ? "Experiences"
              : o.kind === "series_package"
                ? "Session packs"
                : "Memberships",
        detail: `${formatPrice(o.price)}${o.kind === "membership" ? " / month" : o.minutes ? ` · ${o.minutes} min` : ""}`,
        action: ["service", "day_package"].includes(o.kind)
          ? "Choose a time"
          : o.kind === "membership"
            ? "View membership"
            : "Choose pack",
      })),
    ...faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        title: item.q,
        description: item.a,
        href: `/faq#${group.id}`,
        category: "FAQs",
        action: "Read answer",
      })),
    ),
    ...articles.map((a) => ({
      title: a.title,
      description: a.excerpt,
      href: `/journal/${a.slug}`,
      category: "Guides",
      action: "Read guide",
    })),
    ...[
      {
        title: "Gift cards",
        description:
          "Give a moment of wellness. Choose an amount and recipient in our secure gift-card portal.",
        href: "/gift-cards",
      },
      {
        title: "Frequently asked questions",
        description:
          "Booking, prices, preparation, memberships, session packs and visiting Altona.",
        href: "/faq",
      },
      {
        title: "Visit & contact",
        description: "Clinic hours, address, directions, phone and email.",
        href: "/contact",
      },
      {
        title: "Our clinic",
        description: "Meet Lymph & Wellness on Pier Street, Altona.",
        href: "/about",
      },
      {
        title: "Post-operative care",
        description:
          "Guidance before choosing a post-operative lymphatic massage appointment.",
        href: "/post-op",
      },
    ].map((p) => ({ ...p, category: "Clinic information", action: "Explore" })),
  ];
  return (
    <main id="main">
      <PageHero
        eyebrow="Find your way"
        title={
          <>
            A little easier
            <br />
            to find.
          </>
        }
        intro="Explore treatments, experiences and helpful answers in one place."
      />
      <SiteSearch entries={entries} />
    </main>
  );
}
