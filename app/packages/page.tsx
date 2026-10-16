import { PageHero } from "../_components/PageHero";
import { Button } from "../_components/Button";
import { OfferingLinks } from "../_components/OfferingLinks";
import { CATALOGUE_VERIFIED, SERIES_PACKAGES_URL, formatPrice, packageGroups } from "../_data/offerings";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({ title: "Wellness Series Packages", description: "Compare current EMS, sauna, Pier Reset, premium machine, recovery boots and VacuActive series packages, prices and expiry periods.", path: "/packages" });
export default function PackagesPage() {
  return <main id="main"><PageHero eyebrow="Wellness / Series packages" title={<>Your sessions,<br /><em>your rhythm.</em></>} intro="Compare prepaid series packages and launch bonuses, then select the matching package in Zenoti. All prices are in AUD; expiry runs from purchase." image="/images/membership-suite.webp" imageAlt="Private wellness suite" />
    <section className="catalogue section-space" aria-label="Series package prices"><OfferingLinks />
      {packageGroups.map(group => <details className="catalogue-group" key={group.name} open>
        <summary>{group.name}<span>{group.items.length} options</span></summary>
        <div className="catalogue-table-wrap"><table className="catalogue-table"><caption className="sr-only">{group.name} series package prices and expiry</caption><thead><tr><th scope="col">Package</th><th scope="col">Includes</th><th scope="col">Expiry from purchase</th><th scope="col">Price (AUD)</th><th scope="col">Purchase</th></tr></thead>
          <tbody>{group.items.map(([name, price, expiry, includes]) => <tr key={name}><th scope="row">{name}</th><td data-label="Includes">{includes}</td><td data-label="Expiry from purchase">{expiry}</td><td data-label="Price (AUD)">{formatPrice(price)}</td><td data-label="Purchase"><a href={SERIES_PACKAGES_URL} target="_blank" rel="noreferrer" aria-label={`View ${name} in Zenoti`}>View ↗</a></td></tr>)}</tbody>
        </table></div>
      </details>)}
      <p className="catalogue-note">Checked against Zenoti: {CATALOGUE_VERIFIED}. Package names match the portal, including its spelling. Launch bonuses are subject to availability. Review package benefits and conditions in Zenoti before purchasing.</p>
      <Button href={SERIES_PACKAGES_URL} external>View series packages</Button>
    </section>
  </main>;
}
