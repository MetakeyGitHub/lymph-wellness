import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "./_components/BookingCTA";
import { Button } from "./_components/Button";
import { SectionLabel } from "./_components/SectionLabel";
import { TestimonialCarousel } from "./_components/TestimonialCarousel";
import { BOOKING_URL, GOOGLE_REVIEWS_URL, services, studioEquipment, testimonials } from "./_data/site";
import { SITE_URL } from "./_data/seo";

export const metadata: Metadata = {
  title: "Women's Wellness Sanctuary & Lymphatic Drainage Melbourne",
  description: "A women-only wellness sanctuary in Truganina for lymphatic drainage, recovery, red light therapy, infrared sauna and considered body care.",
  alternates: { canonical: SITE_URL },
  openGraph: { url: SITE_URL },
};

export default function Home() {
  return (
    <main id="main">
      <section className="home-hero">
        <Image className="home-hero-image" src="/images/flow-editorial.webp" alt="Layered ivory fabric in soft natural light" fill priority loading="eager" sizes="100vw" />
        <div className="home-hero-wash" />
        <div className="home-hero-copy">
          <div className="hero-kicker"><span>Women’s only</span><span>Truganina / Melbourne west</span></div>
          <h1><span>Restore.</span><span>Sculpt.</span><span><em>Rebalance.</em></span></h1>
          <p className="hero-intro">Melbourne’s women-only wellness sanctuary for specialised lymphatic drainage, recovery, body care and considered wellness technology.</p>
          <div className="hero-actions"><Button href={BOOKING_URL} variant="light">Book a treatment</Button><Link className="text-link light" href="/services">Explore services <span aria-hidden="true">↘</span></Link><a className="hero-reviews" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" aria-label="Read 53 Google reviews, rated 5 out of 5"><span className="review-stars" aria-hidden="true">★★★★★</span><strong>5.0</strong><span>53 Google reviews</span></a></div>
        </div>
        <div className="hero-side-note"><span>01</span><span>Lymphatic care<br />from within</span></div>
        <div className="hero-scroll">Scroll to explore <span aria-hidden="true">↓</span></div>
      </section>

      <section className="service-index section-space" data-reveal>
        <div className="index-heading"><SectionLabel number="01">Treatments</SectionLabel><h2>Care, considered<br />from every angle.</h2><p>Four treatment pathways in a private women-only setting, shaped around how your body feels today.</p></div>
        <div className="index-list">
          {services.map(service => (
            <Link className="index-row" href={service.href} key={service.slug}>
              <span className="index-number">{service.number}</span><span className="index-title">{service.shortTitle}</span><span className="index-arrow" aria-hidden="true">↗</span>
              <span className="index-preview"><Image src={service.image} alt="" fill sizes="240px" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="testimonials testimonials-early section-space" data-reveal>
        <div className="testimonial-heading"><div><SectionLabel number="02">Google reviews</SectionLabel><h2>What care<br /><em>feels like.</em></h2></div><div className="google-score"><strong>5.0</strong><span className="review-stars" aria-hidden="true">★★★★★</span><p>Based on 53 Google reviews</p></div></div>
        <TestimonialCarousel testimonials={testimonials} />
        <div className="testimonial-footer"><p>Verified Google review excerpts. Individual experiences and treatment outcomes vary.</p><a className="text-link" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Read all Google reviews <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="featured-service section-space" data-reveal>
        <div className="featured-image"><Image src="/images/cream-texture.jpg" alt="Sculptural cream texture" fill sizes="(max-width: 760px) 100vw, 48vw" /><span>Body / Rhythm / Flow</span></div>
        <div className="featured-copy">
          <SectionLabel number="03">Featured treatment</SectionLabel>
          <h2>Brazilian manual<br /><em>lymphatic drainage.</em></h2>
          <p>A rhythmic, full-body treatment with a refined, focused approach to lymphatic wellbeing.</p>
          <div className="duration-grid"><div><span>Duration</span><strong>60</strong><small>Minutes</small></div><div><span>Duration</span><strong>90</strong><small>Minutes</small></div></div>
          <div className="add-ons"><p className="eyebrow">Optional additions</p><span>Whole Body LED Therapy</span><span>Wood Therapy</span><span>Dry Cupping</span></div>
          <Button href={services[0].bookingUrl} external>Book this treatment</Button>
        </div>
      </section>

      <section className="sanctuary-equipment section-space" data-reveal>
        <div className="sanctuary-equipment-intro"><SectionLabel number="04">Women’s wellness sanctuary</SectionLabel><h2>Technology,<br /><em>chosen with intention.</em></h2><p>Five specialised studio experiences bring together touch, light, warmth and guided movement in one private women-only environment.</p><p className="equipment-note">The body roller, red light bed and sauna appear in selected memberships. Treadmill and StairMill availability is confirmed by enquiry.</p><Button href="/contact#enquiry" variant="line">Ask about equipment</Button></div>
        <div className="sanctuary-equipment-list">{studioEquipment.map((item) => <article key={item.title}><span>{item.number}</span><div><p>{item.detail}</p><h3>{item.title}</h3><small>{item.copy}</small><b>{item.access}</b></div></article>)}</div>
      </section>

      <section className="postop-feature section-space" data-reveal>
        <div className="postop-copy"><SectionLabel number="06">Recovery care</SectionLabel><h2>Post-operative<br /><em>lymphatic drainage.</em></h2><p className="lead">A gentle treatment designed to support healing after surgery, helping manage swelling, inflammation and fluid build-up while supporting a smoother recovery experience.</p><div className="inline-list"><span>LED Whole Body</span><span>Recovery Boots</span><span>Dry Cupping</span></div><Button href="/post-op">Explore post-op care</Button><small>Treatment suitability varies. Please seek guidance from your surgeon or medical practitioner where appropriate.</small></div>
        <div className="postop-visual"><Image src="/images/layered-interior.jpg" alt="Layered architectural interior with soft shadows" fill sizes="(max-width: 760px) 100vw, 42vw" /><div className="postop-note"><span>Gentle</span><span>Considered</span><span>Individual</span></div></div>
      </section>

      <section className="facials section-space" data-reveal>
        <div className="facials-heading"><SectionLabel number="07">Facial rituals</SectionLabel><h2>Touch, light<br />&amp; <em>definition.</em></h2></div>
        <div className="facial-grid">
          <article className="facial-main"><Image src="/images/skin-closeup.jpg" alt="Natural skin texture close-up" fill sizes="(max-width: 760px) 100vw, 52vw" /><div><span>01</span><h3>Facial Sculpting</h3></div></article>
          <article><Image src="/images/facial-profile.jpg" alt="Low-saturation facial profile" fill sizes="(max-width: 760px) 100vw, 30vw" /><div><span>02</span><h3>Facial Cupping</h3></div></article>
          <article className="facial-texture"><Image src="/images/cream-texture.jpg" alt="Cream treatment texture" fill sizes="(max-width: 760px) 100vw, 30vw" /><div><span>03</span><h3>LED Face Light Therapy</h3></div></article>
        </div>
      </section>

      <section className="body-sculpt section-space" data-reveal>
        <div className="body-sculpt-number">08</div><div className="body-sculpt-copy"><SectionLabel>Body contouring</SectionLabel><h2>EMS body<br /><em>sculpting.</em></h2><p>Controlled electrical muscle stimulation designed to engage targeted muscle groups as part of a considered body-contouring wellness plan.</p><p>Treatment plans may include a series of sessions depending on individual goals and suitability. Outcomes vary.</p><Button href="/treatments/ems-body-sculpting-melbourne" variant="line">Learn more</Button></div><div className="body-sculpt-art"><Image src="/images/architectural-curve.jpg" alt="Sculptural architectural curves" fill sizes="(max-width: 760px) 100vw, 36vw" /></div>
      </section>

      <BookingCTA />

      <section className="home-journal section-space" data-reveal>
        <div><SectionLabel number="11">The journal</SectionLabel><h2>Know more.<br /><em>Choose clearly.</em></h2><p>Evidence-aware guidance about lymphatic drainage, post-operative care and treatment suitability.</p><Link className="text-link" href="/journal">Explore all guides <span aria-hidden="true">↗</span></Link></div>
        <div>{[
          ["What is lymphatic drainage massage?", "/journal/what-is-lymphatic-drainage-massage"],
          ["A careful guide to post-operative lymphatic drainage", "/journal/post-operative-lymphatic-drainage-guide"],
          ["How to choose a lymphatic drainage clinic in Melbourne", "/journal/choosing-a-lymphatic-drainage-clinic-melbourne"],
        ].map(([title, href], index) => <Link href={href} key={href}><span>0{index + 1}</span><strong>{title}</strong><i aria-hidden="true">↗</i></Link>)}</div>
      </section>

    </main>
  );
}
