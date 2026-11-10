import { ArrowIcon } from "./ArrowIcon";
import { formatPrice, type Offering } from "../_data/offerings";
export function OfferCard({ item }: { item: Offering }) {
  const purchase = item.kind === "series_package";
  return (
    <article className="lw-offer" id={`offer-${item.code.replace(/\s/g, "-")}`}>
      <div className="lw-offer-copy">
        <span className="lw-overline">
          {item.kind === "service"
            ? item.category
            : purchase
              ? "Buy now · book later"
              : "One visit"}
        </span>
        <h3>{item.name}</h3>
        {item.description && <p>{item.description}</p>}
        {item.expiry && (
          <p className="lw-small">Valid {item.expiry.toLowerCase()}.</p>
        )}
      </div>
      <div className="lw-offer-action">
        <p>
          <strong>{formatPrice(item.price)}</strong>
          {item.minutes && <span>{item.minutes} min appointment</span>}
        </p>
        {item.available ? (
          <a className="lw-text-link" data-booking-cta="true" href={item.url}>
            {purchase ? "Select pack" : "Choose a time"}{" "}
            <span aria-hidden="true"><ArrowIcon /></span>
            <span className="sr-only"> — {item.name}</span>
          </a>
        ) : (
          <a className="lw-text-link" href="/contact">
            Contact us to book <ArrowIcon /><span className="sr-only"> — {item.name}</span>
          </a>
        )}
      </div>
    </article>
  );
}
