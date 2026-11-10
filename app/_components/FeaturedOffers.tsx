import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { findOffer, formatPrice } from "../_data/offerings";

const featured = [
  {
    code: "RR",
    title: "Roll + Recover",
    note: "Body roller therapy, followed by recovery boots.",
    label: "A little reset",
  },
  {
    code: "PR",
    title: "Pier Reset",
    note: "Sauna and body roller therapy, brought together in one visit.",
    label: "Make a moment of it",
  },
  {
    code: "PrivateSauna5",
    title: "Your sauna ritual",
    note: "Five private infrared sauna sessions for one person. Buy your pack, then book each visit.",
    label: "Something to return to",
  },
];

export function FeaturedOffers() {
  return (
    <section className="lw-section lw-featured" id="curated-experiences">
      <div className="lw-section-heading">
        <div>
          <p className="lw-overline">Thoughtfully brought together</p>
          <h2>
            A little time.
            <br />
            <em>A lovely ritual.</em>
          </h2>
        </div>
        <div className="lw-featured-intro">
          <p>
            One visit to look forward to, or a reason to return. Explore a few
            ways to make time for yourself.
          </p>
          <Link className="lw-text-link" href="/packages">
            All experiences & session packs <ArrowIcon />
          </Link>
        </div>
      </div>
      <div className="lw-featured-grid">
        {featured.map((entry, index) => {
          const offer = findOffer(entry.code);
          const pack = offer.kind === "series_package";
          return (
            <article className="lw-feature-card" key={offer.code}>
              <header>
                <span aria-hidden="true">0{index + 1}</span>
                <p className="lw-overline">
                  {pack ? "Buy now · book later" : "Book one visit"}
                </p>
              </header>
              <p className="lw-feature-label">{entry.label}</p>
              <h3>{entry.title}</h3>
              <p className="lw-feature-note">{entry.note}</p>
              <div className="lw-feature-price">
                <strong>{formatPrice(offer.price)}</strong>
                <span>
                  {pack ? "5 sessions" : `${offer.minutes} min appointment`}
                  {offer.expiry && (
                    <small>Valid {offer.expiry.toLowerCase()}.</small>
                  )}
                </span>
              </div>
              <a
                className="lw-button light"
                data-booking-cta="true"
                href={offer.url}
              >
                {pack ? "Choose this pack" : "Choose a time"}
                <span aria-hidden="true"><ArrowIcon /></span>
                <span className="sr-only"> — {offer.name}</span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
