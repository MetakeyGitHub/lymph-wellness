"use client";
import { useState } from "react";
import { searchEntries, type SearchEntry } from "../_data/search";
export function SiteSearch({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = searchEntries(entries, query, category);
  const showResults = query.trim().length > 0 || category !== "All";
  return (
    <section className="lw-section lw-site-search" data-suppress-sticky="true">
      <label className="lw-search-label" htmlFor="site-search">
        Search treatments, prices & guides
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try sauna, gift cards or lymphatic massage"
        autoComplete="off"
      />
      <div
        className="lw-category-tabs"
        role="group"
        aria-label="Search categories"
      >
        {["All", ...new Set(entries.map((entry) => entry.category))].map(
          (group) => (
            <button
              key={group}
              aria-pressed={category === group}
              onClick={() => setCategory(group)}
            >
              {group}
            </button>
          ),
        )}
      </div>
      {showResults ? (
        <>
          <p role="status" className="lw-small">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <div className="lw-search-results">
            {results.map((entry) => (
              <a
                className="lw-search-result"
                key={`${entry.href}-${entry.title}`}
                href={entry.href}
                data-booking-cta={
                  entry.href.includes("/webstoreNew/") ? "true" : undefined
                }
              >
                <span className="lw-overline">{entry.category}</span>
                <h2>{entry.title}</h2>
                {entry.description && <p>{entry.description}</p>}
                <div>
                  <span>{entry.detail}</span>
                  <span className="lw-text-link">{entry.action} ↗</span>
                </div>
              </a>
            ))}
          </div>
          {!results.length && (
            <div className="lw-note">
              <p>
                Try a shorter phrase or a different category. Our team can help
                if you are unsure what to choose.
              </p>
              <button
                className="lw-reset"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="lw-search-suggestions">
          <p className="lw-overline">A few places to start</p>
          {["Lymphatic", "Sauna", "Facial", "Recovery", "Gift"].map((term) => (
            <button
              key={term}
              className="lw-text-link"
              onClick={() => setQuery(term)}
            >
              {term} ↗
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
