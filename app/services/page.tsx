import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "../_components/BookingCTA";
import { Button } from "../_components/Button";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { services } from "../_data/site";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({ title: "Women's Wellness Treatments Melbourne", description: "Explore lymphatic drainage, facial sculpting, EMS body sculpting and post-operative care at a women-only wellness sanctuary in Altona.", path: "/services", image: "/images/social-treatments.jpg", imageAlt: "Premium lymphatic and body-care treatments in Melbourne" });

export default function ServicesPage() {
  return <main id="main">
    <PageHero eyebrow="Women’s only / Treatments / Melbourne" title={<>Treatments for<br />restoration,<br /><em>recovery &amp; wellbeing.</em></>} intro="Four considered treatment pathways within a private women’s wellness sanctuary, shaped around how your body feels and what you want support with." image="/images/cream-texture.jpg" imageAlt="Sculptural cream treatment texture" />
    <section className="service-overview section-space" id="treatment-index" data-reveal><SectionLabel number="01">Choose a treatment</SectionLabel><div className="service-overview-list">{services.map(s => <a href={`#${s.slug}`} key={s.slug}><span>{s.number}</span><strong>{s.shortTitle}</strong><small>{s.duration} · {s.price}</small><i aria-hidden="true">↓</i></a>)}</div></section>
    <section className="service-mobile-cards section-space" aria-label="Treatment choices">{services.map((service) => <article key={service.slug}><p className="eyebrow">{service.number} / Treatment</p><h2>{service.title}</h2><p>{service.copy}</p><dl><div><dt>Duration</dt><dd>{service.duration}</dd></div><div><dt>Price</dt><dd>{service.price}</dd></div></dl><div><Button href={service.bookingUrl} external>{service.bookingCta}</Button><Link className="text-link" href={service.href}>Full guide <span aria-hidden="true">↗</span></Link></div></article>)}</section>
    <div className="treatment-sections">
      {services.map((service, index) => <section className={`treatment-detail ${index % 2 ? "reverse" : ""}`} id={service.slug} key={service.slug} data-reveal>
        <div className="treatment-detail-image"><Image src={service.image} alt={`${service.shortTitle} visual`} fill sizes="(max-width: 760px) 100vw, 49vw" /><span>{service.number} / 04</span></div>
        <div className="treatment-detail-copy"><SectionLabel number={service.number}>Treatment</SectionLabel><h2>{service.title}</h2><p className="lead">{service.copy}</p><div className="treatment-facts"><div><span>Duration</span><p>{service.duration}</p></div><div><span>Price</span><p>{service.price}</p></div><div><span>Who it may suit</span><p>{service.suitable}</p></div>{service.addOns.length > 0 && <div><span>{service.slug === "facial-treatments" ? "Treatments" : "Optional additions"}</span><ul>{service.addOns.map(a => <li key={a}>{a}</li>)}</ul></div>}</div><div className="treatment-actions"><Button href={service.bookingUrl} external>{service.bookingCta}</Button><Link className="text-link" href={service.href}>Treatment guide <span aria-hidden="true">↗</span></Link></div></div>
      </section>)}
    </div>
    <section className="medical-note section-space"><p className="eyebrow">A considered note</p><h2>Wellness care works best<br /><em>with clear expectations.</em></h2><p>Our treatments are designed to support wellbeing and do not diagnose, cure or replace medical care. Suitability and individual experiences vary. If you are receiving medical treatment, are pregnant, have a health condition or have recently had surgery, seek advice from your treating practitioner where appropriate.</p></section>
    <BookingCTA compact />
  </main>;
}
