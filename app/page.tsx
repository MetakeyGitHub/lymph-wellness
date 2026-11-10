import Image from "next/image";
import Link from "next/link";
import { findOffer, formatPrice } from "./_data/offerings";
import { INSTAGRAM_URL, MAPS_URL } from "./_data/site";
import { TreatmentFinder } from "./_components/TreatmentFinder";
import { FeaturedOffers } from "./_components/FeaturedOffers";
import { ServiceCatalogue } from "./_components/ServiceCatalogue";
const rituals = [
  {
    code: "LWC019",
    title: "A softer pace.",
    sub: "Private infrared sauna",
    image: "infrared-sauna.jpg",
  },
  {
    code: "LWC018",
    title: "Time to unwind.",
    sub: "Lymphatic body roller",
    image: "body-rollers.jpg",
  },
  {
    code: "LWC017",
    title: "Your quiet moment.",
    sub: "Whole-body red light therapy",
    image: "led-bed.jpg",
  },
];
export default function Home() {
  return (
    <main id="main" className="lw-home">
      <section className="lw-hero">
        <div className="lw-hero-copy">
          <p className="lw-overline">Women’s wellness · Altona, Melbourne</p>
          <h1>
            Come back
            <br />
            to <span>yourself.</span>
          </h1>
          <p className="lw-hero-intro">
            Thoughtful body care. A slower moment.
            <br />A space that feels like it’s yours.
          </p>
          <div className="lw-actions">
            <Link className="lw-button" href="#treatment-finder">
              Find your treatment <span aria-hidden="true">↗</span>
            </Link>
            <Link className="lw-text-link" href="/services#service-prices">
              Browse treatments & prices ↗
            </Link>
          </div>
          <div className="lw-hero-bottom">
            <span>
              Lymphatic care &nbsp; / &nbsp; Recovery &nbsp; / &nbsp; Rest
            </span>
            <span aria-hidden="true">↓</span>
          </div>
        </div>
        <div className="lw-hero-image">
          <Image
            src="/images/clinic/lounge.jpg"
            alt="Sunlight falling through the skylight into the Lymph & Wellness lounge in Altona"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 51vw"
          />
          <span className="lw-image-caption">Your pause, on Pier Street.</span>
        </div>
      </section>
      <div className="lw-marquee" aria-label="Our approach">
        <span>A space for women</span>
        <span aria-hidden="true">✳</span>
        <span>Care that feels personal</span>
        <span aria-hidden="true">✳</span>
        <span>Time to reconnect</span>
        <span aria-hidden="true">✳</span>
        <span>Here in Altona</span>
      </div>
      <TreatmentFinder />
      <section className="lw-section lw-intro">
        <p className="lw-overline">Welcome to Lymph & Wellness</p>
        <h2>
          Feel cared for.
          <br />
          <span>In every sense.</span>
        </h2>
        <div>
          <p>
            From hands-on lymphatic massage to restorative machine sessions, our
            women’s wellness clinic brings considered care into a beautifully
            calm space.
          </p>
          <p>
            Come for a single moment of rest, support through recovery, or a
            ritual you return to. We’ll help you find your place.
          </p>
          <Link className="lw-text-link" href="/about">
            Get to know us ↗
          </Link>
        </div>
      </section>
      <FeaturedOffers />
      <section className="lw-section lw-rituals" id="equipment">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">Make room for a ritual</p>
            <h2>
              Small moments.
              <br />A little more you.
            </h2>
          </div>
          <p>
            Discover the wellness spaces inside our clinic. Book a single
            session, or find a pack that fits your routine.
          </p>
        </div>
        <div className="lw-ritual-grid">
          {rituals.map((r) => {
            const item = findOffer(r.code);
            return (
              <article className="lw-ritual" key={r.code}>
                <a
                  className="lw-ritual-image"
                  href={item.url}
                  aria-label={`Book ${r.sub}`}
                >
                  <Image
                    src={`/images/clinic/${r.image}`}
                    alt={`${r.sub} at Lymph & Wellness`}
                    fill
                    sizes="(max-width:760px) 100vw, 32vw"
                  />
                </a>
                <p className="lw-overline">{r.sub}</p>
                <h3>{r.title}</h3>
                <div>
                  <span>
                    {item.minutes} min · {formatPrice(item.price)}
                  </span>
                  <a
                    className="lw-text-link"
                    data-booking-cta="true"
                    href={item.url}
                  >
                    Book this session ↗
                    <span className="sr-only"> — {r.sub}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <ServiceCatalogue compact />
      <section className="lw-postop-band">
        <p className="lw-overline">A little extra care</p>
        <h2>
          Your recovery.
          <br />
          <span>Your own pace.</span>
        </h2>
        <div>
          <p>
            Thoughtful post-operative care starts with understanding where you
            are in your recovery. We’ll help you plan your next step alongside
            your treating team’s advice.
          </p>
          <Link className="lw-text-link" href="/post-op">
            Explore post-operative care ↗
          </Link>
        </div>
      </section>
      <section className="lw-membership-story">
        <div className="lw-story-image">
          <Image
            src="/images/clinic/recovery-lounge.jpg"
            alt="Soft seating and private recovery spaces at the Altona clinic"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
          />
        </div>
        <div className="lw-story-copy">
          <p className="lw-overline">A rhythm to return to</p>
          <h2>
            Wellness,
            <br />
            woven into
            <br />
            <span>your month.</span>
          </h2>
          <p>
            Make time for yourself with monthly machine sessions, from Beachside
            Essential to VIP Reset.
          </p>
          <p className="lw-membership-price">
            From $236 <span>/ month</span>
          </p>
          <Link className="lw-button" href="/memberships">
            Find your membership ↗
          </Link>
          <Link className="lw-text-link" href="/packages#packs">
            Prefer a session pack? ↗
          </Link>
        </div>
      </section>
      <section className="lw-section lw-first-visit">
        <p className="lw-overline">Your first visit</p>
        <h2>
          Easy to choose.
          <br />
          <span>Lovely to come back to.</span>
        </h2>
        <div className="lw-steps">
          {[
            [
              "01",
              "Find your moment",
              "Explore treatments with clear prices and appointment lengths.",
            ],
            [
              "02",
              "Choose your time",
              "Your selected treatment opens in our secure booking portal.",
            ],
            [
              "03",
              "Arrive as you are",
              "Come to our women’s clinic on Pier Street. We’ll guide you from there.",
            ],
          ].map(([n, t, p]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <Link className="lw-text-link" href="/faq">
          A few things you might be wondering ↗
        </Link>
      </section>
      <section className="lw-visit">
        <div>
          <p className="lw-overline">Find us by the bay</p>
          <h2>
            A little sanctuary.
            <br />
            Right here in Altona.
          </h2>
          <p>1/22 Pier Street, Altona VIC 3018</p>
          <a className="lw-button light" href={MAPS_URL}>
            Plan your visit ↗
          </a>
          <Link href="/contact" className="lw-text-link">
            Hours & contact ↗
          </Link>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="lw-instagram"
        >
          <span className="lw-overline">Life inside the clinic</span>
          <span>@lymph.andwellness ↗</span>
          <p>
            Meet the team, see our spaces, and discover what’s happening this
            week.
          </p>
        </a>
      </section>
      <section className="lw-gift-strip">
        <p>For someone who gives so much.</p>
        <Link className="lw-text-link" href="/gift-cards">
          Give a moment of wellness ↗
        </Link>
      </section>
    </main>
  );
}
