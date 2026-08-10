import type { Metadata } from "next";
import { Button } from "../_components/Button";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { BOOKING_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_URL, openingHours } from "../_data/site";
import { SITE_URL } from "../_data/seo";

export const metadata: Metadata = { title: "Book Lymphatic Drainage Truganina", description: "Book lymphatic drainage, facial treatments, EMS body sculpting or post-operative care at 6 Bellevue Drive, Truganina VIC 3029.", alternates: { canonical: `${SITE_URL}/contact` }, openGraph: { url: `${SITE_URL}/contact` } };

export default function ContactPage() {
  return <main id="main"><PageHero eyebrow="Contact / Book" title={<>Book your<br /><em>treatment.</em></>} intro="Choose a treatment through the booking portal or send a considered enquiry if you need help deciding." image="/images/soft-blur.jpg" imageAlt="Atmospheric neutral clinic interior" />
    <section className="contact-layout section-space" id="book" data-reveal>
      <div className="contact-book"><SectionLabel number="01">Appointments</SectionLabel><h2>Ready when<br /><em>you are.</em></h2><p>View live treatment availability and choose the time that suits you.</p><Button href={BOOKING_URL} external>Book a treatment</Button></div>
      <div className="contact-form contact-enquiry"><SectionLabel number="02">Enquiries</SectionLabel><h3>Need help choosing?</h3><p>For treatment questions, booking support or accessibility needs, speak with the clinic directly. You can also send a private message through Instagram.</p><div className="contact-enquiry-actions"><a href={PHONE_URL}>{PHONE_DISPLAY}</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Message on Instagram ↗</a></div><p className="form-note">For recent surgery or a medical concern, seek guidance from your surgeon or treating practitioner before booking.</p></div>
    </section>
    <section className="contact-details section-space"><div><SectionLabel number="03">Studio details</SectionLabel><h2>Truganina,<br /><em>Victoria.</em></h2><p>Women-only appointments in a private, supportive clinic environment.</p></div><div className="detail-columns"><div><span>Location</span><p>6 Bellevue Drive<br />Truganina VIC 3029</p></div><div><span>Phone</span><a href={PHONE_URL}>{PHONE_DISPLAY}</a></div><div className="hours-detail"><span>Opening hours</span>{openingHours.map(([day, hours]) => <p key={day}><strong>{day}</strong>{hours}</p>)}</div><div><span>Instagram</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@lymph.wellnessco ↗</a></div></div><a className="map-placeholder" href="https://www.google.com/maps/search/?api=1&query=6+Bellevue+Drive+Truganina+VIC+3029" target="_blank" rel="noreferrer"><span>Open in Google Maps ↗</span><p>6 Bellevue Drive, Truganina VIC 3029</p></a></section>
  </main>;
}
