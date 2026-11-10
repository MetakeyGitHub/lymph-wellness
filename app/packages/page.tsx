import Link from "next/link";
import { PageHero } from "../_components/PageHero";
import { OfferCard } from "../_components/OfferCard";
import { offerings } from "../_data/offerings";
import { pageMetadata } from "../_data/metadata";
export const metadata = pageMetadata({
  title: "Wellness Experiences & Session Packs",
  description:
    "Explore combined wellness visits and session packs. Clear prices, expiry periods and direct booking at Lymph & Wellness, Altona.",
  path: "/packages",
});
export default function Packages() {
  return (
    <main id="main">
      <PageHero
        action={{ href: "#experiences", label: "Explore experiences" }}
        eyebrow="Experiences & session packs"
        title={
          <>
            A moment today.
            <br />A ritual to return to.
          </>
        }
        intro="Combine your favourite wellness experiences in one visit, or buy a pack and plan your sessions later."
        image="/images/clinic/infrared-sauna.jpg"
        imageAlt="Private infrared sauna at Lymph & Wellness"
      />
      <nav className="lw-subnav" aria-label="Package options">
        <a href="#experiences">Book an experience ↓</a>
        <a href="#packs">Buy a session pack ↓</a>
        <Link href="/memberships">Compare memberships ↗</Link>
      </nav>
      <section className="lw-section" id="experiences">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">One considered visit</p>
            <h2>More time for you.</h2>
          </div>
          <p>
            Choose a combined experience and book an available appointment.
            Prices are per package in AUD.
          </p>
        </div>
        <div className="lw-offer-list">
          {offerings
            .filter((o) => o.kind === "day_package")
            .map((item) => (
              <OfferCard key={item.code} item={item} />
            ))}
        </div>
      </section>
      <section className="lw-section lw-tinted" id="packs">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">Buy now · book later</p>
            <h2>Make it a regular thing.</h2>
          </div>
          <p>
            Purchase your selected pack through secure checkout. Then book
            sessions against your package. Check inclusions and purchase terms
            before paying.
          </p>
        </div>
        <div className="lw-offer-list">
          {offerings
            .filter((o) => o.kind === "series_package")
            .map((item) => (
              <OfferCard key={item.code} item={item} />
            ))}
        </div>
        <p className="lw-small">
          Expiry is measured from purchase. A pack purchase does not reserve
          appointment times.
        </p>
      </section>
    </main>
  );
}
