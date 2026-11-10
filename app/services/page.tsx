import { ServiceCatalogue } from "../_components/ServiceCatalogue";
import { PageHero } from "../_components/PageHero";
import { pageMetadata } from "../_data/metadata";
export const metadata = pageMetadata({
  title: "Treatments & Prices in Altona",
  description:
    "Explore lymphatic massage, facials, EMS, post-operative care, wellness machines, acupuncture and naturopathy. Choose your exact appointment online.",
  path: "/services",
});
export default function Services() {
  return (
    <main id="main">
      <PageHero
        action={{ href: "#service-prices", label: "See treatments & prices" }}
        eyebrow="The treatment collection"
        title={
          <>
            Care that meets
            <br />
            you where you are.
          </>
        }
        intro="Hands-on treatments, quiet wellness rituals and considered recovery care. Find your treatment, see the price, and choose your time."
        image="/images/clinic/lounge.jpg"
        imageAlt="The light-filled lounge at our Altona clinic"
      />
      <ServiceCatalogue />
      <section className="lw-section lw-suitability">
        <p className="lw-overline">Here to guide you</p>
        <h2>Not sure where to begin?</h2>
        <p>
          Our team can help you choose an appointment. If you are pregnant,
          recovering from surgery or receiving medical care, contact us to
          discuss suitability before booking.
        </p>
        <a className="lw-button" href="/contact">
          Talk to the clinic ↗
        </a>
      </section>
    </main>
  );
}
