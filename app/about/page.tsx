import { ArrowIcon } from "../_components/ArrowIcon";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../_components/PageHero";
import { INSTAGRAM_URL } from "../_data/site";
import { pageMetadata } from "../_data/metadata";
export const metadata = pageMetadata({
  title: "Our Women’s Wellness Clinic in Altona",
  description:
    "Step inside Lymph & Wellness: a calm, women-only clinic on Pier Street, Altona, for lymphatic care, recovery and wellness rituals.",
  path: "/about",
});
export default function About() {
  return (
    <main id="main">
      <PageHero
        eyebrow="The clinic / Altona"
        title={
          <>
            A space to feel
            <br />
            like yourself.
          </>
        }
        intro="Warm surroundings. Personal attention. Time that belongs to you. Welcome to our women’s wellness clinic on Pier Street."
        image="/images/clinic/lounge.jpg"
        imageAlt="The real Lymph & Wellness clinic lounge"
      />
      <section className="lw-section lw-intro">
        <p className="lw-overline">Our approach</p>
        <h2>
          Care begins
          <br />
          with listening.
        </h2>
        <div>
          <p>
            Every visit starts with you: what brings you in, how you feel, and
            what would make you comfortable.
          </p>
          <p>
            We bring together lymphatic massage, body and facial treatments,
            complementary care and wellness machines in one calm, women-only
            space.
          </p>
          <p>
            Whether you are here for recovery support or a regular moment of
            rest, we’ll help you understand the options and what to expect.
          </p>
        </div>
      </section>
      <section className="lw-membership-story" id="seda-yener">
        <div className="lw-story-image">
          <Image
            src="/images/clinic/recovery-lounge.jpg"
            alt="The clinic’s soft seating and private recovery spaces"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
          />
        </div>
        <div className="lw-story-copy">
          <p className="lw-overline">Meet your care team</p>
          <h2>
            Personal care.
            <br />A human connection.
          </h2>
          <p>
            Seda Yener and the clinic team welcome you to Lymph & Wellness. Ask
            us about your appointment, practitioner availability, or the
            training relevant to your treatment.
          </p>
          <a
            className="lw-text-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Meet us on Instagram <ArrowIcon />
          </a>
          <Link className="lw-button" href="/contact">
            Get in touch <ArrowIcon />
          </Link>
        </div>
      </section>
      <section className="lw-section lw-first-visit">
        <p className="lw-overline">Considered from the beginning</p>
        <h2>Your comfort comes first.</h2>
        <div className="lw-steps">
          {[
            [
              "01",
              "A women-only space",
              "A private setting designed to help you feel at ease.",
            ],
            [
              "02",
              "Clear choices",
              "Understand your treatment, price and appointment length before booking.",
            ],
            [
              "03",
              "Individual guidance",
              "Suitability and comfort guide the experience. Outcomes vary from person to person.",
            ],
          ].map(([n, t, p]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <Link className="lw-button" href="/services">
          Explore your next visit <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
