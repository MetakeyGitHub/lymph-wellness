import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "../_components/BookingCTA";
import { Button } from "../_components/Button";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { BOOKING_URL, services } from "../_data/site";
import { SITE_URL } from "../_data/seo";

export const metadata: Metadata = { title: "Lymphatic & Body Treatments Melbourne", description: "Explore manual lymphatic drainage, facial sculpting, EMS body sculpting and post-operative lymphatic treatments at a women-only Truganina clinic.", alternates: { canonical: `${SITE_URL}/services` }, openGraph: { url: `${SITE_URL}/services` } };

export default function ServicesPage() {
  return <main id="main">
    <PageHero eyebrow="Treatments / Melbourne" title={<>Treatments for<br />restoration,<br /><em>recovery &amp; wellbeing.</em></>} intro="Four considered treatment pathways, shaped around how your body feels and what you want support with." image="/images/cream-texture.jpg" imageAlt="Sculptural cream treatment texture" />
    <section className="service-overview section-space" data-reveal><SectionLabel number="01">Treatment index</SectionLabel><div className="service-overview-list">{services.map(s => <a href={`#${s.slug}`} key={s.slug}><span>{s.number}</span><strong>{s.shortTitle}</strong><small>{s.duration}</small><i aria-hidden="true">↓</i></a>)}</div></section>
    <div className="treatment-sections">
      {services.map((service, index) => <section className={`treatment-detail ${index % 2 ? "reverse" : ""}`} id={service.slug} key={service.slug} data-reveal>
        <div className="treatment-detail-image"><Image src={service.image} alt={`${service.shortTitle} visual`} fill sizes="(max-width: 760px) 100vw, 49vw" /><span>{service.number} / 04</span></div>
        <div className="treatment-detail-copy"><SectionLabel number={service.number}>Treatment</SectionLabel><h2>{service.title}</h2><p className="lead">{service.copy}</p><div className="treatment-facts"><div><span>Duration</span><p>{service.duration}</p></div><div><span>Who it may suit</span><p>{service.suitable}</p></div>{service.addOns.length > 0 && <div><span>{service.slug === "facial-treatments" ? "Treatments" : "Optional additions"}</span><ul>{service.addOns.map(a => <li key={a}>{a}</li>)}</ul></div>}</div><div className="treatment-actions"><Button href={BOOKING_URL}>Book treatment</Button><Link className="text-link" href={service.href}>Treatment guide <span aria-hidden="true">↗</span></Link></div></div>
      </section>)}
    </div>
    <section className="medical-note section-space"><p className="eyebrow">A considered note</p><h2>Wellness care works best<br /><em>with clear expectations.</em></h2><p>Our treatments are designed to support wellbeing and do not diagnose, cure or replace medical care. Suitability and individual experiences vary. If you are receiving medical treatment, are pregnant, have a health condition or have recently had surgery, seek advice from your treating practitioner where appropriate.</p></section>
    <BookingCTA compact />
  </main>;
}
