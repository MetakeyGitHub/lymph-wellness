"use client";
import { ArrowIcon } from "./ArrowIcon";

import { useState } from "react";
import Link from "next/link";
import { offerings } from "../_data/offerings";
import { OfferCard } from "./OfferCard";
const items = offerings.filter((o) => o.kind === "service");
const groups = [...new Set(items.map((o) => o.category))];
export function ServiceCatalogue({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState("All treatments");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const filtered = items.filter(
    (o) =>
      (category === "All treatments" || o.category === category) &&
      `${o.name} ${o.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const visible = compact && !expanded ? filtered.slice(0, 4) : filtered;
  return (
    <section
      className={`lw-section lw-catalogue${compact ? " lw-catalogue-preview" : ""}`}
      data-suppress-sticky="true"
      id="service-prices"
    >
      <div className="lw-section-heading">
        <div>
          <p className="lw-overline">The treatment menu</p>
          <h2>
            {compact ? (
              <>
                Everything, simply
                <br />
                laid out.
              </>
            ) : (
              "Choose your moment."
            )}
          </h2>
        </div>
        <p>
          Select your treatment here. Your choice carries into booking, where
          you can choose an available time and complete checkout.
        </p>
      </div>
      <div className="lw-menu-resources"><Link className="lw-text-link" href="/compare-treatments">Compare appointment options <ArrowIcon /></Link><Link className="lw-text-link" href="/your-first-visit">Your first visit <ArrowIcon /></Link></div>
      <div className="lw-filters lw-menu-search">
        <label>
          Find a treatment
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try sauna, lymphatic or facial"
          />
        </label>
        <div className="lw-menu-assist">
          <span>Need a little guidance?</span>
          <Link className="lw-text-link" href="/#treatment-finder">
            Find your treatment <ArrowIcon />
          </Link>
        </div>
      </div>
      <div
        className="lw-category-tabs"
        role="group"
        aria-label="Filter treatments by category"
      >
        {["All treatments", ...groups].map((group) => (
          <button
            key={group}
            aria-pressed={category === group}
            aria-controls="treatment-results"
            onClick={() => {
              setCategory(group);
              setExpanded(false);
            }}
          >
            {group}
            <span>
              {group === "All treatments"
                ? items.length
                : items.filter((item) => item.category === group).length}
            </span>
          </button>
        ))}
      </div>
      <p className="lw-small" aria-live="polite">
        {compact && visible.length < filtered.length
          ? `Showing ${visible.length} of `
          : ""}
        {filtered.length} {filtered.length === 1 ? "treatment" : "treatments"} ·
        Prices in AUD
      </p>
      <div className="lw-offer-list" id="treatment-results">
        {visible.map((item) => (
          <OfferCard key={item.code} item={item} />
        ))}
      </div>
      {compact && filtered.length > 4 && (
        <button
          className="lw-menu-expand lw-text-link"
          aria-expanded={expanded}
          aria-controls="treatment-results"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show fewer treatments −"
            : `See all ${filtered.length} treatments +`}
        </button>
      )}
      {!filtered.length && (
        <p>
          No treatments match that search.{" "}
          <button
            className="lw-reset"
            onClick={() => {
              setSearch("");
              setCategory("All treatments");
              setExpanded(false);
            }}
          >
            Clear filters
          </button>
        </p>
      )}
      {!compact && (
        <div className="lw-note">
          <p>Looking for a combined visit or a series of sessions?</p>
          <Link className="lw-text-link" href="/packages">
            Explore experiences & packs <ArrowIcon />
          </Link>
        </div>
      )}
      <p className="lw-small">
        Appointment lengths are those shown in booking. Some include preparation
        time. Add-ons and suitability are confirmed with your practitioner.
      </p>
    </section>
  );
}
