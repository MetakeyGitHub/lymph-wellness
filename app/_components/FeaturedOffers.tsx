import { ArrowIcon } from "./ArrowIcon";
import Image from "next/image";
import Link from "next/link";
import { findOffer, formatPrice } from "../_data/offerings";

const featured = [
  {
    code: "RR",
    image: "body-rollers.jpg",
    title: "Roll + Recover",
    note: "Body roller therapy, followed by recovery boots.",
    label: "A little reset",
  },
  {
    code: "PR",
    image: "infrared-sauna.jpg",
    title: "Pier Reset",
    note: "Sauna and body roller therapy, brought together in one visit.",
    label: "Make a moment of it",
  },
  {
    code: "PrivateSauna5",
    image: "recovery-lounge.jpg",
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
            <span>A lovely ritual.</span>
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
              <div className="lw-feature-image">
                <Image
                  src={`/images/clinic/${entry.image}`}
                  alt={
                    index === 0
                      ? "Body roller equipment inside the clinic"
                      : index === 1
                        ? "Our private infrared sauna"
                        : "The clinic’s quiet recovery lounge"
                  }
                  fill
                  sizes="(max-width:760px) 100vw, 33vw"
                />
                <span>{entry.label}</span>
              </div>
              <div className="lw-feature-copy">
                <p className="lw-overline">
                  {pack ? "Buy now · book later" : "Book one visit"}
                </p>
                <h3>{entry.title}</h3>
                <p>{entry.note}</p>
                <div className="lw-feature-price">
                  <strong>{formatPrice(offer.price)}</strong>
                  <span>
                    {pack ? "5 sessions" : `${offer.minutes} min appointment`}
                  </span>
                </div>
                {offer.expiry && (
                  <p className="lw-feature-expiry">
                    Valid {offer.expiry.toLowerCase()}.
                  </p>
                )}
                <a
                  className="lw-button"
                  data-booking-cta="true"
                  href={offer.url}
                >
                  {pack ? "Choose this pack" : "Choose a time"}
                  <span aria-hidden="true"><ArrowIcon /></span>
                  <span className="sr-only"> — {offer.name}</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
