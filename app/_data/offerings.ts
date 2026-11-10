import catalogue from "./catalogue.json";
export type Offering = (typeof catalogue)[number];
export const offerings = catalogue;
export const CATALOGUE_VERIFIED = "10 November 2026";
export const ZENOTI_ROOT =
  "https://booking.lymphandwellness.com.au/webstoreNew/";
export const CENTER_ID = "ab0f43de-2383-47ca-b282-967daa002f72";
// General discovery stays on the website. Named offers always use their exact catalogue URL.
export const SERVICES_URL = "/services";
export const MEMBERSHIP_URL = "/memberships";
export const SERIES_PACKAGES_URL = "/packages#packs";
export const GIFT_CARDS_URL = `${ZENOTI_ROOT}giftcards/${CENTER_ID}`;
export const findOffer = (code: string): Offering => {
  const item = offerings.find((item) => item.code === code);
  if (!item) throw new Error(`Unknown public offering: ${code}`);
  return item;
};
export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount);
export const serviceGroups = [
  ...new Set(
    offerings.filter((o) => o.kind === "service").map((o) => o.category),
  ),
].map((name) => ({
  name,
  items: offerings
    .filter((o) => o.kind === "service" && o.category === name)
    .map((o) => [o.name, o.minutes ?? 0, o.price] as const),
}));
export const memberships = ["MEM005", "MEM002", "MEM003", "MEM004"].map(
  (code) => ({ ...findOffer(code), period: "per month" }),
);
export const packageGroups = [
  {
    name: "Session packs",
    items: offerings
      .filter((o) => o.kind === "series_package")
      .map((o) => [o.name, o.price, o.expiry ?? "", o.description] as const),
  },
];
export const giftCardAmounts = [20, 50, 100] as const;
