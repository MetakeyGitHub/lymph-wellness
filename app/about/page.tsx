import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA } from "../_components/BookingCTA";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { SITE_URL } from "../_data/seo";

export const metadata: Metadata = { title: "Women's Wellness Sanctuary Truganina", description: "Discover Lymph & Wellness, a private women-only wellness sanctuary for lymphatic care, restoration and body treatments in Truganina.", alternates: { canonical: `${SITE_URL}/about` }, openGraph: { url: `${SITE_URL}/about` } };

export default function AboutPage() {
  return <main id="main">
    <PageHero eyebrow="Women’s only / The sanctuary" title={<>Wellness,<br /><em>with intention.</em></>} intro="A private women’s wellness sanctuary where specialised care, body awareness and quiet precision come together." image="/images/arched-studio.jpg" imageAlt="Calm arched wellness interior" />
    <section className="about-philosophy section-space" data-reveal><div><SectionLabel number="01">Our philosophy</SectionLabel><h2>Care that listens<br /><em>before it begins.</em></h2></div><div className="about-copy"><p className="lead">Lymph &amp; Wellness was created as a women’s wellness sanctuary where body care feels considered, private and entirely personal.</p><p>Our women-only Melbourne clinic offers a calm, supportive setting for lymphatic care, body restoration and considered self-care.</p><p>Every appointment begins with where you are today. Your goals, comfort and relevant history inform a treatment experience delivered with precision and without rush.</p><p>The studio brings together specialised lymphatic wellness, restoration and body awareness in an environment designed to feel warm, calm and discreet.</p></div></section>
    <section className="values-editorial" data-reveal><div className="values-image"><Image src="/images/layered-interior.jpg" alt="Layered interior and soft shadow" fill sizes="(max-width: 760px) 100vw, 44vw" /></div><div className="values-list"><SectionLabel number="02">What guides us</SectionLabel>{[["Personalised","Care shaped around your body, comfort and goals."],["Precise","Thoughtful technique delivered with quiet attention."],["Restorative","An unhurried space for recovery, rest and reconnection."],["Private","A discreet environment where you can feel at ease."]].map(([t,c],i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section className="practitioner section-space" data-reveal><div className="practitioner-intro"><SectionLabel number="03">Your practitioner</SectionLabel><h2>Considered care.<br /><em>A human approach.</em></h2><p>Seda is known by clients for her calm presence, attentive technique and commitment to making every treatment feel comfortable, personal and unhurried.</p></div><div className="practitioner-image"><Image src="/images/seda-practitioner.jpg" alt="Seda, practitioner at Lymph and Wellness" fill sizes="(max-width: 760px) 100vw, 35vw" /></div><div className="practitioner-details"><p className="eyebrow">Your practitioner</p><h3>Seda</h3><dl><div><dt>Approach</dt><dd>Attentive, calm and tailored to the individual.</dd></div><div><dt>Environment</dt><dd>A private women-only clinic designed around comfort and confidentiality.</dd></div><div><dt>Care</dt><dd>Each appointment begins with listening to your needs, goals and relevant history.</dd></div></dl></div></section>
    <section className="studio-strip section-space"><div><Image src="/images/studio.webp" alt="Warm neutral reception studio" fill sizes="50vw" /></div><div><Image src="/images/robe.webp" alt="Branded robe detail" fill sizes="50vw" /></div></section>
    <BookingCTA compact />
  </main>;
}
