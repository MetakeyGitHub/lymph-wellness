"use client";
import { useState } from "react";
import Link from "next/link";
import { offerings } from "../_data/offerings";
import { OfferCard } from "./OfferCard";
const items = offerings.filter((o) => o.kind === "service");
const groups = [...new Set(items.map((o) => o.category))];
export function ServiceCatalogue() {
  const [category, setCategory] = useState("All treatments");
  const [search, setSearch] = useState("");
  const filtered = items.filter(
    (o) =>
      (category === "All treatments" || o.category === category) &&
      `${o.name} ${o.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="lw-section lw-catalogue" id="service-prices">
      <div className="lw-section-heading">
        <div>
          <p className="lw-overline">The treatment menu</p>
          <h2>Choose your moment.</h2>
        </div>
        <p>
          Select your treatment here. Your choice carries into booking, where
          you can choose an available time and complete checkout.
        </p>
      </div>
      <div className="lw-filters">
        <label>
          Find a treatment
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try sauna, lymphatic or facial"
          />
        </label>
        <label>
          Explore by category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["All treatments", ...groups].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="lw-small" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "treatment" : "treatments"} ·
        Prices in AUD
      </p>
      <div className="lw-offer-list">
        {filtered.map((item) => (
          <OfferCard key={item.code} item={item} />
        ))}
      </div>
      {!filtered.length && (
        <p>
          No treatments match that search.{" "}
          <button
            className="lw-reset"
            onClick={() => {
              setSearch("");
              setCategory("All treatments");
            }}
          >
            Clear filters
          </button>
        </p>
      )}
      <div className="lw-note">
        <p>Looking for a combined visit or a series of sessions?</p>
        <Link className="lw-text-link" href="/packages">
          Explore experiences & packs ↗
        </Link>
      </div>
      <p className="lw-small">
        Appointment lengths are those shown in booking. Some include preparation
        time. Add-ons and suitability are confirmed with your practitioner.
      </p>
    </section>
  );
}
