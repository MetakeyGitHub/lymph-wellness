import Link from "next/link";
export function BookingCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`lw-cta ${compact ? "compact" : ""}`}>
      <div>
        <p className="lw-overline">A moment for you</p>
        <h2>Find your next ritual.</h2>
      </div>
      <Link className="lw-button" href="/services">
        Explore treatments & times ↗
      </Link>
    </section>
  );
}
