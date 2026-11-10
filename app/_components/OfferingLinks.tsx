import { ArrowIcon } from "./ArrowIcon";
import { GIFT_CARDS_URL, MEMBERSHIP_URL, SERIES_PACKAGES_URL, SERVICES_URL } from "../_data/offerings";

export function OfferingLinks() {
  return <nav className="offering-links" aria-label="Book and shop with Zenoti">
    <a href={SERVICES_URL}>Book services <ArrowIcon /></a>
    <a href={MEMBERSHIP_URL}>View memberships <ArrowIcon /></a>
    <a href={GIFT_CARDS_URL}>Buy gift cards <ArrowIcon /></a>
    <a href={SERIES_PACKAGES_URL}>Buy series packages <ArrowIcon /></a>
  </nav>;
}
