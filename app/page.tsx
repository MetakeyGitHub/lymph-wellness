import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, SparkIcon } from "./_components/ArrowIcon";
import { FeaturedOffers } from "./_components/FeaturedOffers";
import { HoursList, OpenStatus } from "./_components/OpenStatus";
import {
  CarePrinciples,
  FirstVisitPreview,
  SignatureCare,
} from "./_components/SignatureCare";
import { TreatmentFinder } from "./_components/TreatmentFinder";
import { pageMetadata } from "./_data/metadata";
import { findOffer, formatPrice, memberships } from "./_data/offerings";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_URL,
} from "./_data/site";

export const metadata = pageMetadata({
  title: "Women’s Wellness & Lymphatic Massage in Altona",
  description:
    "Find lymphatic massage, facial care, post-operative support, sauna and wellness experiences at Lymph & Wellness in Altona. View prices and book your visit.",
  path: "/",
});

const approach = [
  "A space for women",
  "Care that feels personal",
  "Time to reconnect",
  "Here in Altona",
];

const rituals = [
  {
    code: "LWC019",
    title: "A softer pace.",
    sub: "Private infrared sauna",
    image: "infrared-sauna.jpg",
    position: "50% 30%",
  },
  {
    code: "LWC018",
    title: "Time to unwind.",
    sub: "Lymphatic body roller",
    image: "body-rollers.jpg",
    position: "50% 50%",
  },
  {
    code: "LWC017",
    title: "Your quiet moment.",
    sub: "Whole-body red light therapy",
    image: "led-bed.jpg",
    position: "50% 60%",
    tone: "saturate(0.82)",
  },
];

const membershipFrom = Math.min(...memberships.map((plan) => plan.price));

export default function Home() {
  return (
    <main id="main" className="lw-home">
      <section className="lw-hero">
        <div className="lw-hero-copy">
          <p className="lw-overline">Women’s wellness · Altona, Melbourne</p>
          <h1>
            Come back
            <br />
            to <em>yourself.</em>
          </h1>
          <p className="lw-hero-intro">
            Lymphatic massage, facial care and considered recovery support in
            our women-only Altona clinic.
          </p>
          <div className="lw-actions">
            <Link className="lw-button" href="#treatment-finder">
              Find your treatment <span aria-hidden="true"><ArrowIcon direction="down" /></span>
            </Link>
            <Link className="lw-text-link" href="/services#service-prices">
              Browse treatments & prices <ArrowIcon />
            </Link>
          </div>
          <ul className="lw-hero-facts">
            <li>
              <strong>Women only</strong>
              <span>A private clinic, made for women.</span>
            </li>
            <li>
              <strong>Clear prices</strong>
              <span>Every price shown before you book.</span>
            </li>
            <li>
              <strong>Book online</strong>
              <span>Choose the time that suits you.</span>
            </li>
          </ul>
        </div>
        <div className="lw-hero-visual">
          <div className="lw-hero-image">
            <Image
              src="/images/clinic/lounge.jpg"
              alt="Sunlight falling through the skylight into the Lymph & Wellness lounge in Altona"
              fill
              priority
              sizes="(max-width: 760px) 88vw, 40vw"
            />
          </div>
          <svg className="lw-seal" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <defs>
              <path id="lw-seal-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
            </defs>
            <text>
              <textPath href="#lw-seal-path" textLength="484">
                Lymph &amp; Wellness · Pier Street, Altona · Women’s wellness ·
              </textPath>
            </text>
            <path className="lw-seal-arch" d="M82 122V94a18 18 0 0 1 36 0v28M90 122V95a10 10 0 0 1 20 0v27M76 122h48" />
          </svg>
          <p className="lw-image-caption">
            <span>Your pause, on Pier Street.</span>
            <OpenStatus />
          </p>
        </div>
      </section>

      <div className="lw-marquee">
        <ul className="sr-only">
          {approach.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="lw-marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy}>
              {approach.map((line) => (
                <span key={line}>
                  {line}
                  <SparkIcon />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <SignatureCare />
      <TreatmentFinder />
      <CarePrinciples />
      <FeaturedOffers />

      <section className="lw-section lw-rituals" id="equipment">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">Make room for a ritual</p>
            <h2>
              Small moments.
              <br />
              <em>A little more you.</em>
            </h2>
          </div>
          <p>
            Discover the wellness spaces inside our clinic. Book a single
            session, or find a pack that fits your routine.
          </p>
        </div>
        <div className="lw-ritual-grid">
          {rituals.map((ritual, index) => {
            const item = findOffer(ritual.code);
            return (
              <article className="lw-ritual" key={ritual.code}>
                <a
                  className="lw-ritual-image"
                  href={item.url}
                  aria-label={`Book ${ritual.sub}`}
                >
                  <Image
                    src={`/images/clinic/${ritual.image}`}
                    alt={`${ritual.sub} at Lymph & Wellness`}
                    fill
                    sizes="(max-width: 760px) 78vw, 30vw"
                    style={{ objectPosition: ritual.position, filter: "tone" in ritual ? ritual.tone : undefined }}
                  />
                </a>
                <p className="lw-overline">
                  <span>0{index + 1}</span> {ritual.sub}
                </p>
                <h3>{ritual.title}</h3>
                <div>
                  <span>
                    {item.minutes} min · {formatPrice(item.price)}
                  </span>
                  <a
                    className="lw-text-link"
                    data-booking-cta="true"
                    href={item.url}
                  >
                    Book this session <ArrowIcon />
                    <span className="sr-only"> — {ritual.sub}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <FirstVisitPreview />

      <section className="lw-membership-story">
        <div className="lw-story-image">
          <Image
            src="/images/flow-editorial.webp"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="lw-story-copy">
          <p className="lw-overline">A rhythm to return to</p>
          <h2>
            Wellness, woven
            <br />
            into <em>your month.</em>
          </h2>
          <p>
            Make time for yourself with monthly machine sessions, from Beachside
            Essential to VIP Reset.
          </p>
          <p className="lw-membership-price">
            From {formatPrice(membershipFrom)} <span>/ month</span>
          </p>
          <div className="lw-actions">
            <Link className="lw-button" href="/memberships">
              Find your membership <span aria-hidden="true"><ArrowIcon /></span>
            </Link>
            <Link className="lw-text-link" href="/packages#packs">
              Prefer a session pack? <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="lw-visit" aria-labelledby="visit-heading">
        <div className="lw-visit-copy">
          <p className="lw-overline">Find us by the bay</p>
          <h2 id="visit-heading">
            A little sanctuary.
            <br />
            <em>Right here in Altona.</em>
          </h2>
          <address>
            {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
            <a href={PHONE_URL}>{PHONE_DISPLAY}</a>
          </address>
          <div className="lw-actions">
            <a className="lw-button light" href={MAPS_URL}>
              Plan your visit <span aria-hidden="true"><ArrowIcon /></span>
            </a>
            <Link href="/contact" className="lw-text-link">
              Hours & contact <ArrowIcon />
            </Link>
          </div>
        </div>
        <div className="lw-visit-hours">
          <p className="lw-overline">Clinic hours</p>
          <OpenStatus />
          <HoursList />
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="lw-instagram"
        >
          <span className="lw-overline">Life inside the clinic</span>
          <span>
            @lymph.andwellness <ArrowIcon />
          </span>
          <p>
            Meet the team, see our spaces, and discover what’s happening this
            week.
          </p>
        </a>
      </section>

      <section className="lw-gift-strip">
        <p>
          For someone who <em>gives so much.</em>
        </p>
        <Link className="lw-button" href="/gift-cards">
          Give a moment of wellness <span aria-hidden="true"><ArrowIcon /></span>
        </Link>
      </section>
    </main>
  );
}
