import { GIFT_CARDS_URL, MEMBERSHIP_URL, SERIES_PACKAGES_URL, SERVICES_URL } from "../_data/offerings";

export function OfferingLinks() {
  return <nav className="offering-links" aria-label="Book and shop with Zenoti">
    <a href={SERVICES_URL} target="_blank" rel="noreferrer">Book services ↗</a>
    <a href={MEMBERSHIP_URL} target="_blank" rel="noreferrer">View memberships ↗</a>
    <a href={GIFT_CARDS_URL} target="_blank" rel="noreferrer">Buy gift cards ↗</a>
    <a href={SERIES_PACKAGES_URL} target="_blank" rel="noreferrer">Buy series packages ↗</a>
  </nav>;
}
