import { OfferingLinks } from "../_components/OfferingLinks";
import { ContactForm } from "../_components/ContactForm";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { ADDRESS_LINE_1, ADDRESS_LINE_2, EMAIL_DISPLAY, EMAIL_URL, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_URL, bookingOptions, openingHours } from "../_data/site";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({ title: "Book Lymphatic Drainage Altona", description: "Book lymphatic drainage, facial treatments, EMS body sculpting or post-operative care at 1/22 Pier Street, Altona VIC 3018.", path: "/contact", image: "/images/social-treatments.jpg", imageAlt: "Book a treatment at Lymph & Wellness in Altona" });

export default function ContactPage() {
  return <main id="main"><PageHero eyebrow="Contact / Book" title={<>Book your<br /><em>treatment.</em></>} intro="Choose a treatment through the booking portal or send a considered enquiry if you need help deciding." image="/images/architectural-curve.jpg" imageAlt="Warm, sculptural archway in a calm wellness interior" />
    <section className="booking-chooser section-space" id="book" data-reveal data-booking-cta>
      <div className="booking-chooser-intro"><SectionLabel number="01">Choose your appointment</SectionLabel><h2>Direct to the<br /><em>right treatment.</em></h2><p>These popular appointments open the Zenoti services portal. Select the matching service there to see live availability. All prices are in AUD.</p></div>
      <div className="booking-option-list">{bookingOptions.map((option, index) => <a href={option.href} target="_blank" rel="noreferrer" key={option.label}><span>0{index + 1}</span><strong>{option.label}</strong><small>{option.price}</small><i aria-hidden="true">↗</i></a>)}</div>
      <OfferingLinks />
    </section>
    <section className="contact-layout section-space" id="enquiry" data-reveal>
      <div className="contact-book"><SectionLabel number="02">Private enquiry</SectionLabel><h2>Need help<br /><em>choosing?</em></h2><p>Tell us what you would like support with. Your enquiry is prepared as a private email so you can review it before sending.</p><div className="contact-direct"><a href={PHONE_URL}>{PHONE_DISPLAY}</a><a href={EMAIL_URL}>{EMAIL_DISPLAY}</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram ↗</a></div><p className="form-note">For recent surgery or a medical concern, seek guidance from your surgeon or treating practitioner before booking.</p></div>
      <div className="contact-form"><ContactForm /></div>
    </section>
    <section className="contact-details section-space"><div><SectionLabel number="03">Studio details</SectionLabel><h2>Altona,<br /><em>Victoria.</em></h2><p>Women-only appointments in a private, supportive clinic environment.</p></div><div className="detail-columns"><div><span>Location</span><p>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</p></div><div><span>Contact</span><a href={PHONE_URL}>{PHONE_DISPLAY}</a><a href={EMAIL_URL}>{EMAIL_DISPLAY}</a></div><div className="hours-detail"><span>Opening hours</span>{openingHours.map(([day, hours]) => <p key={day}><strong>{day}</strong>{hours}</p>)}</div><div><span>Instagram</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@lymph.wellnessco ↗</a></div></div><a className="map-placeholder" href={MAPS_URL} target="_blank" rel="noreferrer"><span>Open in Google Maps ↗</span><p>{ADDRESS_LINE_1}, {ADDRESS_LINE_2}</p></a></section>
  </main>;
}
