import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "../_components/BookingCTA";
import { Button } from "../_components/Button";
import { JsonLd } from "../_components/JsonLd";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { BOOKING_URL } from "../_data/site";
import { serviceAreas, SITE_URL } from "../_data/seo";

export const metadata: Metadata = {
  title: "Lymphatic Drainage Melbourne West | Areas We Serve",
  description: "Women-only lymphatic drainage in Truganina, serving Tarneit, Williams Landing, Point Cook, Hoppers Crossing, Werribee and Melbourne's west.",
  keywords: ["lymphatic drainage Melbourne west", "lymphatic drainage Truganina", "lymphatic massage Tarneit", "lymphatic massage Point Cook", "lymphatic massage Werribee"],
  alternates: { canonical: `${SITE_URL}/areas-we-serve` },
  openGraph: { title: "Lymphatic Drainage Across Melbourne's West", description: "Private women-only lymphatic and body-care treatments in Truganina.", url: `${SITE_URL}/areas-we-serve`, images: ["/og.png"] },
};

export default function AreasWeServePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Areas served by Lymph & Wellness",
      url: `${SITE_URL}/areas-we-serve`,
      about: { "@id": `${SITE_URL}/#business` },
      spatialCoverage: serviceAreas.map((area) => ({ "@type": "Place", name: `${area}, Victoria` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${SITE_URL}/areas-we-serve` },
      ],
    },
  ];

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="Truganina / Wyndham / Melbourne west" title={<>Lymphatic care,<br /><em>close to home.</em></>} intro="Private women-only lymphatic drainage, facial treatments, body sculpting and post-operative care in Truganina." image="/images/studio.webp" imageAlt="Warm neutral Lymph and Wellness studio in Truganina" />

      <section className="areas-intro section-space" data-reveal>
        <div><SectionLabel number="01">Our location</SectionLabel><h2>6 Bellevue Drive,<br /><em>Truganina.</em></h2></div>
        <div><p className="lead">A calm treatment space for clients across Wyndham and Melbourne’s western suburbs.</p><p>The studio is open Monday to Saturday from 10:30 am to 5:00 pm. Live appointment availability is shown in the booking portal.</p><div><Button href={BOOKING_URL}>Book a treatment</Button><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=6+Bellevue+Drive+Truganina+VIC+3029" target="_blank" rel="noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a></div></div>
      </section>

      <section className="areas-list section-space" data-reveal>
        <div className="areas-list-heading"><SectionLabel number="02" light>Melbourne west</SectionLabel><h2>Areas we<br /><em>welcome.</em></h2><p>Travel time varies by route and traffic. Check your journey before booking.</p></div>
        <ol>{serviceAreas.map((area, index) => <li key={area}><span>{String(index + 1).padStart(2, "0")}</span><strong>{area}</strong><small>Appointments in Truganina</small></li>)}</ol>
      </section>

      <section className="areas-services section-space" data-reveal>
        <div><SectionLabel number="03">Treatment pathways</SectionLabel><h2>Choose the care<br /><em>that fits.</em></h2></div>
        <div>{[
          ["Lymphatic drainage", "60 or 90 minute Brazilian manual lymphatic drainage.", "/treatments/lymphatic-drainage-melbourne"],
          ["Facial treatments", "Facial sculpting, cupping and LED face light therapy.", "/treatments/facial-sculpting-melbourne"],
          ["Body sculpting", "EMS body-contouring wellness treatments.", "/treatments/ems-body-sculpting-melbourne"],
          ["Post-operative care", "Gentle support for suitable clients with appropriate clearance.", "/post-op"],
        ].map(([title, copy, href], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><Link className="text-link" href={href}>Explore <span aria-hidden="true">↗</span></Link></article>)}</div>
      </section>

      <section className="areas-note section-space"><p className="eyebrow">One clear destination</p><h2>All appointments<br /><em>in Truganina.</em></h2><p>The suburbs above describe the community we welcome. Every appointment takes place at 6 Bellevue Drive, Truganina. Check your route and allow enough travel time before your treatment.</p></section>
      <BookingCTA compact />
    </main>
  );
}
