import Link from "next/link";
import { findOffer, formatPrice } from "../_data/offerings";
import type { ComparisonGroup } from "../_data/comparisons";
import { ArrowIcon } from "./ArrowIcon";

export function TreatmentComparison({
  group,
  showGuide = true,
}: {
  group: ComparisonGroup;
  showGuide?: boolean;
}) {
  return (
    <section
      className="lw-comparison"
      id={`compare-${group.id}`}
      aria-label={`${group.label} comparison`}
    >
      <div className="lw-section-heading">
        <div>
          <p className="lw-overline">Compare your options</p>
          <h2>{group.title}</h2>
        </div>
        <p>{group.intro}</p>
      </div>
      <div className="lw-comparison-grid">
        {group.options.map((option) => {
          const offer = findOffer(option.code);
          return (
            <article
              className="lw-compare-card"
              key={option.code}
              data-offer-code={option.code}
            >
              <p className="lw-overline">{option.label}</p>
              <h3>{offer.name}</h3>
              <dl>
                <div className="lw-compare-price">
                  <dt>Price · AUD</dt>
                  <dd>{formatPrice(offer.price)}</dd>
                </div>
                <div>
                  <dt>Appointment length</dt>
                  <dd>{offer.minutes} minutes</dd>
                </div>
                <div>
                  <dt>Named inclusions</dt>
                  <dd>{option.inclusion}</dd>
                </div>
              </dl>
              <p className="lw-compare-detail">{option.detail}</p>
              <a href={offer.url} className="lw-button" data-booking-cta="true">
                Choose a time <ArrowIcon />
                <span className="sr-only"> for {offer.name}</span>
              </a>
            </article>
          );
        })}
      </div>
      <p className="lw-comparison-note">{group.note}</p>
      <p className="lw-small">
        Appointment lengths are as listed in booking and may include
        preparation. Review your selection before confirming.
      </p>
      {showGuide && (
        <Link className="lw-text-link" href={`/treatments/${group.slug}`}>
          Explore {group.label.toLowerCase()} <ArrowIcon />
        </Link>
      )}
    </section>
  );
}
