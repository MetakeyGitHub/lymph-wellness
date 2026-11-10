import { PageHero } from "../_components/PageHero";
import { memberships, formatPrice } from "../_data/offerings";
import { pageMetadata } from "../_data/metadata";
export const metadata = pageMetadata({
  title: "Monthly Wellness Memberships",
  description:
    "Compare Beachside Essential, Lymph Ritual, Glow and Detox and VIP Reset monthly memberships at our Altona clinic.",
  path: "/memberships",
});
export default function Memberships() {
  return (
    <main id="main">
      <PageHero
        action={{ href: "#membership-plans", label: "Compare memberships" }}
        eyebrow="Your monthly ritual"
        title={
          <>
            A little more
            <br />
            time for yourself.
          </>
        }
        intro="Choose a monthly rhythm for your wellness routine. From four machine sessions to a fuller combination of machine and hands-on care."
        image="/images/clinic/recovery-lounge.jpg"
        imageAlt="Private recovery lounge at Lymph & Wellness"
      />
      <section className="lw-section" id="membership-plans">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">Find your rhythm</p>
            <h2>Room for regular care.</h2>
          </div>
          <p>
            All plans include access to the StairMaster, treadmill, body rollers
            and red light bed within your monthly session allowance. Review your
            membership agreement and payment terms before joining.
          </p>
        </div>
        <div className="lw-membership-grid">
          {memberships.map((m, i) => (
            <article key={m.code} className="lw-plan">
              <span className="lw-overline">0{i + 1} / Monthly membership</span>
              <h3>{m.name.replace(/\s*- Monthly/, "").trim()}</h3>
              <p className="lw-plan-price">
                {formatPrice(m.price)}
                <span>/ month</span>
              </p>
              <ul>
                {m.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a className="lw-button" data-booking-cta="true" href={m.url}>
                Select this membership ↗
                <span className="sr-only"> — {m.name}</span>
              </a>
            </article>
          ))}
        </div>
        <div className="lw-note">
          <div>
            <h3>Before you join</h3>
            <p>
              Check the minimum commitment, cancellation notice, pause options
              and unused-session rules in your membership agreement. Speak with
              the clinic if you need these explained before purchase.
            </p>
          </div>
          <a className="lw-text-link" href="/contact">
            Ask about memberships ↗
          </a>
        </div>
        <p>
          Prefer to visit at your own pace?{" "}
          <a className="lw-text-link" href="/packages#packs">
            Explore session packs ↗
          </a>
        </p>
      </section>
    </main>
  );
}
