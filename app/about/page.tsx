import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA } from "../_components/BookingCTA";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";

export const metadata: Metadata = { title: "About", description: "Discover the considered philosophy behind Lymph & Wellness, a private Melbourne lymphatic and body-care studio." };

export default function AboutPage() {
  return <main id="main">
    <PageHero eyebrow="The studio" title={<>Wellness,<br /><em>with intention.</em></>} intro="A private treatment environment where specialised care, body awareness and quiet precision come together." image="/images/arched-studio.jpg" imageAlt="Calm arched wellness interior" />
    <section className="about-philosophy section-space" data-reveal><div><SectionLabel number="01">Our philosophy</SectionLabel><h2>Care that listens<br /><em>before it begins.</em></h2></div><div className="about-copy"><p className="lead">Lymph &amp; Wellness was created around a simple idea: body care should feel considered, private and entirely personal.</p><p>Every appointment begins with where you are today. Your goals, comfort and relevant history inform a treatment experience delivered with precision and without rush.</p><p>The studio’s approach brings together specialised lymphatic wellness, restoration and body awareness in an environment designed to feel warm, calm and discreet.</p></div></section>
    <section className="values-editorial" data-reveal><div className="values-image"><Image src="/images/layered-interior.jpg" alt="Layered interior and soft shadow" fill sizes="(max-width: 760px) 100vw, 44vw" /></div><div className="values-list"><SectionLabel number="02">What guides us</SectionLabel>{[["Personalised","Care shaped around your body, comfort and goals."],["Precise","Thoughtful technique delivered with quiet attention."],["Restorative","An unhurried space for recovery, rest and reconnection."],["Private","A discreet environment where you can feel at ease."]].map(([t,c],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section className="practitioner section-space" data-reveal><div className="practitioner-intro"><SectionLabel number="03">Your practitioner</SectionLabel><h2>Knowledgeable care.<br /><em>A human approach.</em></h2><p>This section is prepared for the practitioner’s approved biography and credentials.</p></div><div className="practitioner-image"><Image src="/images/seda.webp" alt="Practitioner portrait placeholder" fill sizes="(max-width: 760px) 100vw, 35vw" /></div><div className="practitioner-details"><p className="eyebrow">Practitioner details</p><h3>Name to be supplied</h3><dl><div><dt>Qualifications</dt><dd>To be supplied</dd></div><div><dt>Certifications</dt><dd>To be supplied</dd></div><div><dt>Biography</dt><dd>Approved practitioner biography to be inserted before launch.</dd></div></dl></div></section>
    <section className="studio-strip section-space"><div><Image src="/images/studio.webp" alt="Warm neutral reception studio" fill sizes="50vw" /></div><div><Image src="/images/robe.webp" alt="Branded robe detail" fill sizes="50vw" /></div></section>
    <BookingCTA compact />
  </main>;
}

