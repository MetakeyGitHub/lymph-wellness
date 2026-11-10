import { ArrowIcon } from "../_components/ArrowIcon";
import Link from "next/link";
import { Accordion } from "../_components/Accordion";
import { BookingCTA } from "../_components/BookingCTA";
import { PageHero } from "../_components/PageHero";
import { JsonLd } from "../_components/JsonLd";
import { faqGroups } from "../_data/faqs";
import { pageMetadata } from "../_data/metadata";
import { SITE_URL } from "../_data/seo";
export const metadata = pageMetadata({
  title: "Treatment, Booking & Membership FAQs | Altona",
  description:
    "Find answers about prices, lymphatic massage, facials, sauna, post-operative appointments, memberships, session packs and visiting our Altona clinic.",
  path: "/faq",
});
export default function FaqPage() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE_URL}/faq#questions`,
          mainEntity: faqGroups.flatMap((group) =>
            group.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        }}
      />
      <PageHero
        eyebrow="Before you visit"
        title={
          <>
            A little clarity.
            <br />A calmer first visit.
          </>
        }
        intro="Practical answers about choosing, booking and making the most of your time with us. Explore a topic below, or speak with our team."
        image="/images/clinic/lounge.jpg"
        imageAlt="The Lymph & Wellness lounge in Altona"
        action={{ href: "#booking", label: "Explore the answers" }}
      />
      <nav className="lw-faq-nav" aria-label="Question topics">
        {faqGroups.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            {group.title} <ArrowIcon direction="down" />
          </a>
        ))}
      </nav>
      <div className="lw-section lw-faq-groups">
        {faqGroups.map((group, index) => (
          <section key={group.id} id={group.id} className="lw-faq-group">
            <div>
              <p className="lw-overline">0{index + 1} / Good to know</p>
              <h2>{group.title}</h2>
            </div>
            <Accordion items={group.items} />
          </section>
        ))}
      </div>
      <section className="lw-section lw-suitability">
        <p className="lw-overline">Still wondering?</p>
        <h2>Let’s talk it through.</h2>
        <p>
          For help choosing, contact our team. For medical advice or a question
          about recovery after a procedure, speak with your treating
          practitioner.
        </p>
        <Link className="lw-button" href="/contact">
          Ask the clinic <ArrowIcon />
        </Link>
        <p className="lw-small">
          Health information:{" "}
          <a href="https://www.healthdirect.gov.au/conditions/vascular-diseases/lymphoedema">
            Healthdirect Australia
          </a>{" "}
          and{" "}
          <a href="https://www.nhs.uk/conditions/lymphoedema/treatment/">
            NHS lymphoedema guidance
          </a>
          .
        </p>
      </section>
      <BookingCTA compact />
    </main>
  );
}
