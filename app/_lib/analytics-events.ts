export const REPORTING_ORIGIN = "https://www.lymphandwellness.com.au";
export type SafeEvent = {
  name:
    | "booking_outbound"
    | "phone_click"
    | "email_click"
    | "directions_click"
    | "instagram_click"
    | "reviews_click";
  parameters: Record<string, string>;
};
/** Never return an actual URL, treatment name, item ID, query, form value or user identifier. */
export function classifyLink(href: string): SafeEvent | null {
  let url: URL;
  try {
    url = new URL(href, REPORTING_ORIGIN);
  } catch {
    return null;
  }
  if (url.protocol === "tel:") return { name: "phone_click", parameters: {} };
  if (url.protocol === "mailto:")
    return { name: "email_click", parameters: {} };
  if (url.protocol !== "https:") return null;
  if (
    url.hostname === "booking.lymphandwellness.com.au" &&
    url.pathname.startsWith("/webstoreNew/")
  ) {
    const destination = url.pathname.includes("/seriespackage/")
      ? "session_pack"
      : url.pathname.includes("/membership/")
        ? "membership"
        : url.pathname.includes("/giftcards/")
          ? "gift_card"
          : "appointment";
    return {
      name: "booking_outbound",
      parameters: { destination_type: destination },
    };
  }
  if (
    ["www.google.com", "google.com"].includes(url.hostname) &&
    url.pathname.startsWith("/maps")
  )
    return { name: "directions_click", parameters: {} };
  if (["www.instagram.com", "instagram.com"].includes(url.hostname))
    return { name: "instagram_click", parameters: {} };
  if (url.hostname === "share.google")
    return { name: "reviews_click", parameters: {} };
  return null;
}
export function safePageSection(pathname: string) {
  const root = pathname.split("/")[1];
  const sections: Record<string, string> = {
    "": "home",
    about: "clinic",
    contact: "contact",
    services: "menu",
    packages: "experiences",
    memberships: "memberships",
    "gift-cards": "gifting",
    faq: "help",
    journal: "guides",
    search: "search",
    equipment: "menu",
    treatments: "menu",
    "post-op": "menu",
    locations: "visit",
    "areas-we-serve": "visit",
    privacy: "privacy",
    terms: "terms",
  };
  return sections[root] ?? "other";
}
export const SAFE_PAGE_CONTEXT = {
  page_location: `${REPORTING_ORIGIN}/`,
  page_referrer: "",
  page_title: "Lymph & Wellness",
};
