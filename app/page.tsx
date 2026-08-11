import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "./_components/BookingCTA";
import { Button } from "./_components/Button";
import { SectionLabel } from "./_components/SectionLabel";
import { BOOKING_URL, GOOGLE_REVIEWS_URL, INSTAGRAM_URL, services, studioEquipment, testimonials } from "./_data/site";
import { SITE_URL } from "./_data/seo";

export const metadata: Metadata = {
  title: "Women's Wellness Sanctuary & Lymphatic Drainage Melbourne",
  description: "A women-only wellness sanctuary in Truganina for lymphatic drainage, recovery, red light therapy, infrared sauna and considered body care.",
  alternates: { canonical: SITE_URL },
  openGraph: { url: SITE_URL },
};

const principles = [
  ["Targeted", "Treatments are tailored around your body’s individual needs."],
  ["Restorative", "Designed to support circulation, recovery and wellbeing."],
  ["Considered", "Every treatment is delivered with care, precision and intention."],
  ["Personalised", "A thoughtful approach centred around your treatment goals."],
];

const education = [
  ["01", "Support circulation", "Gentle manual techniques are designed to support lymphatic movement and general wellbeing."],
  ["02", "Ease the feeling of heaviness", "Many clients seek treatment when their body feels puffy, tired or in need of considered care."],
  ["03", "Support recovery", "Post-operative care can form one part of a broader recovery plan when clinically appropriate."],
  ["04", "Encourage relaxation", "Rhythmic touch and an unhurried environment create space for the nervous system to settle."],
];

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

      <section className="brand-intro section-space" data-reveal>
        <div className="brand-intro-art"><div className="arch-frame"><Image src="/images/facial-profile.jpg" alt="Low-saturation close crop of natural skin" fill sizes="(max-width: 760px) 88vw, 36vw" /></div><span className="vertical-caption">TOUCH / CARE / RESTORATION</span></div>
        <div className="brand-intro-copy">
          <SectionLabel number="01">Our approach</SectionLabel>
          <h2>Lymphatic care,<br /><em>reimagined.</em></h2>
          <p className="lead">Our studio specialises in rejuvenating lymphatic massage and targeted wellness treatments designed to enhance your natural radiance and support wellbeing from the inside out.</p>
          <p>Precise technique. A private setting. Care shaped around how your body feels today.</p>
          <Link className="text-link" href="/about">Our philosophy <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="service-index section-space" data-reveal>
        <div className="index-heading"><SectionLabel number="02">Treatments</SectionLabel><h2>Care, considered<br />from every angle.</h2><p>Four treatment pathways. One deeply personal approach.</p></div>
        <div className="index-list">
          {services.map(service => (
            <Link className="index-row" href={service.href} key={service.slug}>
              <span className="index-number">{service.number}</span><span className="index-title">{service.shortTitle}</span><span className="index-arrow" aria-hidden="true">↗</span>
              <span className="index-preview"><Image src={service.image} alt="" fill sizes="240px" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-service section-space" data-reveal>
        <div className="featured-image"><Image src="/images/cream-texture.jpg" alt="Sculptural cream texture" fill sizes="(max-width: 760px) 100vw, 48vw" /><span>Body / Rhythm / Flow</span></div>
        <div className="featured-copy">
          <SectionLabel number="03">Featured treatment</SectionLabel>
          <h2>Brazilian manual<br /><em>lymphatic drainage.</em></h2>
          <p>A rhythmic, full-body treatment with a refined, focused approach to lymphatic wellbeing.</p>
          <div className="duration-grid"><div><span>Duration</span><strong>60</strong><small>Minutes</small></div><div><span>Duration</span><strong>90</strong><small>Minutes</small></div></div>
          <div className="add-ons"><p className="eyebrow">Optional additions</p><span>Whole Body LED Therapy</span><span>Wood Therapy</span><span>Dry Cupping</span></div>
          <Button href={BOOKING_URL}>Book this treatment</Button>
        </div>
      </section>

      <section className="sanctuary-equipment section-space" data-reveal>
        <div className="sanctuary-equipment-intro"><SectionLabel number="04">Women’s wellness sanctuary</SectionLabel><h2>Technology,<br /><em>chosen with intention.</em></h2><p>Five specialised studio experiences bring together touch, light, warmth and guided movement in one private women-only environment.</p><p className="equipment-note">Equipment access depends on the service or membership selected. Suitability and individual experience vary.</p><Button href="/memberships" variant="line">Explore memberships</Button></div>
        <div className="sanctuary-equipment-list">{studioEquipment.map((item) => <article key={item.title}><span>{item.number}</span><div><p>{item.detail}</p><h3>{item.title}</h3><small>{item.copy}</small></div></article>)}</div>
      </section>

      <section className="experience-dark section-space" data-reveal>
        <div className="experience-title"><SectionLabel number="05" light>The Lymph &amp; Wellness experience</SectionLabel><h2>Care that moves<br /><em>with your body.</em></h2></div>
        <div className="principle-grid">{principles.map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="image-break" data-reveal>
        <Image src="/images/arched-studio.jpg" alt="Sculptural arched wellness interior" fill sizes="100vw" />
        <div className="image-break-overlay" />
        <p>Feel lighter.<br />Move easier.<br /><em>Restore balance.</em></p>
        <span>Truganina / Melbourne west</span>
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

      <section className="education section-space" data-reveal>
        <div className="education-intro"><SectionLabel number="09">Why lymphatic wellness</SectionLabel><h2>Support that begins<br /><em>with listening.</em></h2><p>Our approach is grounded in careful treatment, realistic expectations and respect for the body’s individual response.</p></div>
        <div className="education-list">{education.map(([n,title,copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="testimonials section-space" data-reveal>
        <div className="testimonial-heading"><div><SectionLabel number="10">Google reviews</SectionLabel><h2>What care<br /><em>feels like.</em></h2></div><div className="google-score"><strong>5.0</strong><span className="review-stars" aria-hidden="true">★★★★★</span><p>Based on 53 Google reviews</p></div></div>
        <div className="testimonial-layout">{testimonials.map(({ name, treatment, quote }) => <article className="testimonial-card" key={name}><span aria-hidden="true">“</span><blockquote>{quote}</blockquote><p><strong>{name}</strong>{treatment}</p></article>)}</div>
        <div className="testimonial-footer"><p>Verified Google review excerpts. Individual experiences and treatment outcomes vary.</p><a className="text-link" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">Read all Google reviews <span aria-hidden="true">↗</span></a></div>
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

      <section className="instagram section-space" data-reveal>
        <div className="instagram-heading"><SectionLabel number="12">Follow the ritual</SectionLabel><h2>@LYMPH.WELLNESSCO</h2><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Visit Instagram ↗</a></div>
        <div className="instagram-grid">{["skin-closeup.jpg","cream-texture.jpg","robe.webp","arched-studio.jpg","facial-profile.jpg","studio.webp"].map((img,i) => <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" key={img}><Image src={`/images/${img}`} alt={["Natural skin detail","Cream treatment texture","Lymph and Wellness robe","Arched studio interior","Facial treatment mood","Lymph and Wellness studio"][i]} fill sizes="(max-width: 760px) 50vw, 17vw" /></a>)}</div>
      </section>
    </main>
  );
}
