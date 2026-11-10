import { ArrowIcon, SparkIcon } from "./_components/ArrowIcon";
import Image from "next/image";
import Link from "next/link";
import { findOffer, formatPrice } from "./_data/offerings";
import { INSTAGRAM_URL, MAPS_URL } from "./_data/site";
import { TreatmentFinder } from "./_components/TreatmentFinder";
import { FeaturedOffers } from "./_components/FeaturedOffers";
import { SignatureCare, CarePrinciples, FirstVisitPreview } from "./_components/SignatureCare";
import { pageMetadata } from "./_data/metadata";
export const metadata = pageMetadata({title: "Women’s Wellness & Lymphatic Massage in Altona", description: "Find lymphatic massage, facial care, post-operative support, sauna and wellness experiences at Lymph & Wellness in Altona. View prices and book your visit.", path: "/"});
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
            Lymphatic massage, facial care and considered recovery support
            in our women-only Altona clinic.
          </p>
          <div className="lw-actions">
            <Link className="lw-button" href="#treatment-finder">
              Find your treatment <span aria-hidden="true"><ArrowIcon /></span>
            </Link>
            <Link className="lw-text-link" href="/services#service-prices">
              Browse treatments & prices <ArrowIcon />
            </Link>
          </div>
          <div className="lw-hero-bottom">
            <span>
              Lymphatic care &nbsp; / &nbsp; Recovery &nbsp; / &nbsp; Rest
            </span>
            <span aria-hidden="true"><ArrowIcon direction="down" /></span>
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
        <span aria-hidden="true"><SparkIcon /></span>
        <span>Care that feels personal</span>
        <span aria-hidden="true"><SparkIcon /></span>
        <span>Time to reconnect</span>
        <span aria-hidden="true"><SparkIcon /></span>
        <span>Here in Altona</span>
      </div>
      <TreatmentFinder />
      <SignatureCare />
      <CarePrinciples />
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
                    Book this session <ArrowIcon />
                    <span className="sr-only"> — {r.sub}</span>
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
            Find your membership <ArrowIcon />
          </Link>
          <Link className="lw-text-link" href="/packages#packs">
            Prefer a session pack? <ArrowIcon />
          </Link>
        </div>
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
            Plan your visit <ArrowIcon />
          </a>
          <Link href="/contact" className="lw-text-link">
            Hours & contact <ArrowIcon />
          </Link>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="lw-instagram"
        >
          <span className="lw-overline">Life inside the clinic</span>
          <span>@lymph.andwellness <ArrowIcon /></span>
          <p>
            Meet the team, see our spaces, and discover what’s happening this
            week.
          </p>
        </a>
      </section>
      <section className="lw-gift-strip">
        <p>For someone who gives so much.</p>
        <Link className="lw-text-link" href="/gift-cards">
          Give a moment of wellness <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
