import { CATALOGUE_VERIFIED, SERVICES_URL, formatPrice, serviceGroups } from "../_data/offerings";
import { OfferingLinks } from "./OfferingLinks";

export function ServiceCatalogue() {
  return <section className="catalogue section-space" id="service-prices" aria-labelledby="catalogue-heading">
    <p className="eyebrow">The complete service menu</p><h2 id="catalogue-heading">Every offering.<br /><em>Clearly priced.</em></h2>
    <p className="catalogue-intro">Explore all ten service categories currently listed in Zenoti. Prices are in AUD; durations are as displayed in the portal. Choose a service there to view availability and complete your booking.</p>
    <OfferingLinks />
    {serviceGroups.map(group => <details className="catalogue-group" key={group.name} open={group.name === "Lymphatic Massage"}>
      <summary>{group.name}<span>{group.items.length} {group.items.length === 1 ? "option" : "options"}</span></summary>
      <div className="catalogue-table-wrap"><table className="catalogue-table"><caption className="sr-only">{group.name} service prices in AUD</caption>
        <thead><tr><th scope="col">Service</th><th scope="col">Duration</th><th scope="col">Price (AUD)</th><th scope="col">Book</th></tr></thead>
        <tbody>{group.items.map(([name, minutes, price]) => <tr key={name}><th scope="row">{name}</th><td data-label="Duration">{minutes} min</td><td data-label="Price (AUD)">{formatPrice(price)}</td><td data-label="Booking"><a href={SERVICES_URL} target="_blank" rel="noreferrer" aria-label={`Book ${name} in Zenoti`}>Book ↗</a></td></tr>)}</tbody>
      </table></div>
      {group.name === "Day Packages" && <p className="catalogue-note">Day packages are booked through Services. The post-op + LED option is listed here at $248.00; the separate Lymphatic Massage service with the same name is $240.00. Select the intended listing in Zenoti. Intro and launch offers are subject to the portal’s availability and conditions.</p>}
    </details>)}
    <p className="catalogue-note">Checked against Zenoti: {CATALOGUE_VERIFIED}. The portal confirms current availability, eligibility and final booking terms.</p>
  </section>;
}
