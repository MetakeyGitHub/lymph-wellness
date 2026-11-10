import Image from "next/image";
import {OfferCard} from "../_components/OfferCard";
import {findOffer} from "../_data/offerings";
import { Accordion } from "../_components/Accordion";
import { BookingCTA } from "../_components/BookingCTA";
import { Button } from "../_components/Button";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { bookingOptions } from "../_data/site";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({ title: "Post-Op Lymphatic Drainage Melbourne", description: "Gentle post-operative lymphatic drainage at a women-only Altona clinic, with surgeon-clearance guidance and realistic expectations.", path: "/post-op", image: "/share-image", imageAlt: "Gentle, private post-operative lymphatic care" });

const postFaqs = [
  { q: "When can I begin post-operative treatment?", a: "Timing depends on your procedure, recovery and your surgeon’s advice. Obtain clearance where required before booking." },
  { q: "Will treatment prevent fibrosis?", a: "No treatment can be presented as guaranteed to prevent fibrosis. Post-operative lymphatic care is designed to support comfort and help manage swelling or fluid build-up as part of a broader recovery plan." },
  { q: "How many sessions will I need?", a: "There is no single schedule that suits everyone. Session frequency is discussed individually and should align with your treating practitioner’s guidance." },
  { q: "What if I feel unwell after surgery?", a: "Contact your surgeon or medical practitioner. Seek urgent medical help for symptoms such as shortness of breath, chest pain, fever, worsening redness or unexpected severe pain." },
];

export default function PostOpPage() {
  return <main id="main">
    <PageHero eyebrow="Recovery / Support / Care" title={<>Post-operative<br /><em>lymphatic care.</em></>} intro="Gentle, individualised treatment designed to support comfort and fluid management as one part of your broader recovery plan." image="/images/clinic/recovery-lounge.jpg" imageAlt="Soft layered interior suggesting privacy and recovery" dark />
    <section className="postop-intro section-space" data-reveal><div><SectionLabel number="01">What it is</SectionLabel><h2>A gentle approach<br /><em>to recovery.</em></h2></div><div><p className="lead">Post-operative lymphatic drainage uses light, rhythmic manual techniques designed to support lymphatic movement and help manage swelling, inflammation and fluid build-up after surgery.</p><p>It is not a replacement for medical care. Treatment is adapted to the procedure, your stage of recovery, comfort and any guidance provided by your surgeon or treating practitioner.</p><div className="clearance-note"><span>Important</span><p>If you have recently undergone surgery, obtain clearance from your surgeon or treating practitioner before booking where required.</p></div><Button href="/contact#enquiry" variant="line">Ask about suitability</Button></div></section>
    <section className="when-used section-space" data-reveal><div className="when-image"><Image src="/images/skin-closeup.jpg" alt="Natural skin detail in soft light" fill sizes="(max-width: 760px) 100vw, 42vw" /></div><div className="when-copy"><SectionLabel number="02">When it is used</SectionLabel><h2>Support, at the<br /><em>appropriate time.</em></h2><p>Many clients seek post-operative care when they are experiencing swelling, tenderness, heaviness or fluid build-up. Suitability depends on the type of surgery, current symptoms and medical guidance.</p><ul><li>After appropriate post-surgical clearance</li><li>When gentle manual care is considered suitable</li><li>As one part of a broader recovery plan, not a replacement for medical care</li><li>With treatment adapted to comfort and healing stage</li></ul></div></section>
    <section className="expectation section-space" data-reveal><SectionLabel number="03">What to expect</SectionLabel><div className="expectation-grid">{[["01","Consult","We begin with your procedure, timing, symptoms, comfort and any instructions from your treating team."],["02","Treat","Gentle techniques are adapted to your body and avoided where treatment is not appropriate."],["03","Review","Your comfort and response guide future sessions. No fixed course is assumed."],["04","Aftercare","You receive simple, relevant guidance and are referred back to medical care when needed."]].map(([n,t,c])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section className="appointment-guidance section-space" data-reveal><div><SectionLabel number="04">Before your appointment</SectionLabel><h2>Arrive informed.</h2><ul><li>Confirm treatment timing with your surgeon where required.</li><li>Bring relevant post-operative instructions.</li><li>Tell us about medications, complications or changes in symptoms.</li><li>Wear comfortable, easy-to-change clothing.</li></ul></div><div><SectionLabel number="05">After your appointment</SectionLabel><h2>Continue gently.</h2><ul><li>Follow the advice of your surgeon and treating team.</li><li>Rest, hydrate and notice how your body responds.</li><li>Do not ignore unexpected or worsening symptoms.</li><li>Seek medical guidance if you have any recovery concerns.</li></ul></div></section>
    <section className="postop-addon section-space"><div><p className="eyebrow">Optional additions, where suitable</p><h2>LED Whole Body<br />Recovery Boots<br />Dry Cupping</h2></div><div><p>Add-ons are not appropriate for every client or every stage of recovery. Suitability is considered individually.</p><Button href={bookingOptions[4].href} external variant="light">View post-op times</Button></div></section>
    <section className="faq-page-section section-space"><div className="faq-page-intro"><SectionLabel number="06">Frequently asked</SectionLabel><h2>Clear answers.<br /><em>Considered care.</em></h2></div><Accordion items={postFaqs} /></section>
    <section className="lw-section"><p className="lw-overline">When you are ready</p><h2>Your appointment options.</h2><p>After confirming suitability with your treating team, select the appointment you need.</p>{["LWC004","LWC005","LWC006","LWC007"].map(code=><OfferCard key={code} item={findOffer(code)}/>)}</section>
    <BookingCTA compact />
  </main>;
}
