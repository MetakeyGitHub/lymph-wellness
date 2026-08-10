import type { Metadata } from "next";
import { Button } from "../_components/Button";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { BOOKING_URL, CONTACT_EMAIL, INSTAGRAM_URL, services } from "../_data/site";

export const metadata: Metadata = { title: "Contact & Book", description: "Book a Lymph & Wellness treatment or contact the Melbourne studio." };

export default function ContactPage() {
  return <main id="main"><PageHero eyebrow="Contact / Book" title={<>Book your<br /><em>treatment.</em></>} intro="Choose a treatment through the booking portal or send a considered enquiry if you need help deciding." image="/images/soft-blur.jpg" imageAlt="Atmospheric neutral clinic interior" />
    <section className="contact-layout section-space" id="book" data-reveal>
      <div className="contact-book"><SectionLabel number="01">Appointments</SectionLabel><h2>Ready when<br /><em>you are.</em></h2><p>View treatment availability and choose the time that suits you.</p><Button href={BOOKING_URL}>Book a treatment</Button><small>BOOKING_URL placeholder — connect the live booking portal before launch.</small></div>
      <form className="contact-form" action={`mailto:${CONTACT_EMAIL}`} method="post" encType="text/plain"><SectionLabel number="02">Enquiries</SectionLabel><div className="field-grid"><label><span>Name</span><input type="text" name="name" autoComplete="name" required /></label><label><span>Email</span><input type="email" name="email" autoComplete="email" required /></label><label><span>Phone</span><input type="tel" name="phone" autoComplete="tel" /></label><label><span>Treatment</span><select name="treatment" defaultValue=""><option value="" disabled>Select a treatment</option>{services.map(s=><option key={s.slug} value={s.shortTitle}>{s.shortTitle}</option>)}</select></label><label className="full"><span>Message</span><textarea name="message" rows={5} required /></label></div><button className="form-submit" type="submit">Send enquiry <span aria-hidden="true">↗</span></button><p className="form-note">Contact delivery uses the CONTACT_EMAIL placeholder and must be connected before launch.</p></form>
    </section>
    <section className="contact-details section-space"><div><SectionLabel number="03">Studio details</SectionLabel><h2>Melbourne,<br /><em>Victoria.</em></h2></div><div className="detail-columns"><div><span>Location</span><p>Melbourne, Victoria<br />Exact address to be supplied</p></div><div><span>Opening hours</span><p>Hours to be supplied</p></div><div><span>Email</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div><div><span>Instagram</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@lymph.wellnessco ↗</a></div></div><div className="map-placeholder"><span>Map / Studio location</span><p>Insert approved location or map before launch.</p></div></section>
  </main>;
}
