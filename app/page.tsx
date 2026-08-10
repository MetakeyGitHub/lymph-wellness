const bookingUrl = "https://lymphandwellnessco.simplybook.me/v2/";

const treatments = [
  {
    number: "01",
    title: "Brazilian Manual Lymphatic",
    eyebrow: "60 or 90 minutes",
    description:
      "A full-body, hands-on treatment designed to encourage lymphatic flow, ease fluid retention and leave the body feeling lighter and more defined.",
    price: "From $180",
    notes: "Optional LED, wood therapy and dry cupping add-ons",
  },
  {
    number: "02",
    title: "Post-Op Recovery",
    eyebrow: "60 or 90 minutes",
    description:
      "Gentle, considered lymphatic support for clients four weeks or more after surgery, with a focus on swelling, comfort and a smoother recovery experience.",
    price: "From $200",
    notes: "Whole-body LED and infrared options available",
  },
  {
    number: "03",
    title: "Facial Sculpting",
    eyebrow: "45 minutes and packages",
    description:
      "A non-invasive facial workout using massage and optional facial cupping to support circulation, ease puffiness and reveal a fresh, naturally lifted glow.",
    price: "From $110",
    notes: "Ultra Sculpt, facial cupping and LED options",
  },
  {
    number: "04",
    title: "EMS Body Sculpting",
    eyebrow: "30 or 60 minutes",
    description:
      "Targeted electro muscle stimulation sessions created to complement body-contouring goals by engaging and toning treated muscle groups.",
    price: "From $200",
    notes: "Single, double and lymphatic-combination sessions",
  },
];

const memberships = [
  "The Beachside Essential",
  "The Lymph Ritual",
  "The Glow & Detox",
  "The VIP Experience",
];

const reviews = [
  {
    quote:
      "Seda was welcoming, professional, knowledgeable and warm. I’ll recommend her anytime.",
    name: "Daliatu",
    treatment: "Lymphatic drainage massage",
  },
  {
    quote:
      "Seda’s warm, inviting nature and gentle touch made it even more special. It felt like I was on holidays.",
    name: "Nash",
    treatment: "Deluxe Ultra Sculpting",
  },
  {
    quote:
      "A genuinely beautiful experience. I felt comfortable and cared for the entire time and could already see a difference.",
    name: "Braejhan",
    treatment: "Facial sculpting and cupping",
  },
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span>Women&apos;s lymphatic & wellness clinic</span>
        <span className="announcement-dot">◆</span>
        <span>Melbourne&apos;s west</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Lymph and Wellness home">
          <span>LYMPH &</span>
          <span>WELLNESS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#treatments">Treatments</a>
          <a href="#about">Our approach</a>
          <a href="#memberships">Memberships</a>
          <a href="#contact">Visit</a>
        </nav>
        <a className="button button-small" href={bookingUrl} target="_blank" rel="noreferrer">
          Book a treatment
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">Restoration, sculpting & renewal</p>
          <h1>
            Feel lighter.
            <br />
            Move easier.
            <br />
            <em>Restore within.</em>
          </h1>
          <p className="hero-intro">
            Advanced lymphatic care, post-operative support and targeted wellness treatments in a calm, private space designed exclusively for women.
          </p>
          <div className="hero-actions">
            <a className="button" href={bookingUrl} target="_blank" rel="noreferrer">
              Book your treatment <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#treatments">
              Explore treatments <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="brand-monogram">LW</span>
            <span>Women-only care, tailored to your body&apos;s rhythm.</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Lymph and Wellness studio">
          <img src="/images/studio-preview.jpg" alt="The softly lit Lymph and Wellness treatment studio" />
          <div className="hero-arch" aria-hidden="true" />
          <div className="hero-caption">
            <span>Private studio</span>
            <span>Melbourne, VIC</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Clinic highlights">
        <div><strong>5.0</strong><span>Google rating</span></div>
        <div><strong>53</strong><span>client reviews</span></div>
        <div><strong>Women only</strong><span>private, considered care</span></div>
        <div><strong>Mon—Sat</strong><span>10:30am — 5:00pm</span></div>
      </section>

      <section className="intro-section section-pad" id="about">
        <div className="section-label"><span>01</span> Our philosophy</div>
        <div className="intro-heading">
          <p className="kicker">Where wellness meets intention</p>
          <h2>Care that works with your body, not against it.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Every session is a sanctuary—rooted in specialised technique, guided by compassion and tailored to honour your body&apos;s natural rhythm.
          </p>
          <p>
            Whether your focus is recovery, circulation, reduced puffiness or simply a deeper sense of wellbeing, the experience is unhurried, discreet and designed around you.
          </p>
          <a className="text-link" href="#meet-seda">Meet Seda <span aria-hidden="true">↘</span></a>
        </div>
      </section>

      <section className="treatments section-pad" id="treatments">
        <div className="section-topline">
          <div className="section-label section-label-light"><span>02</span> Treatments</div>
          <p>Thoughtful care. Refined technique. A lighter way to feel.</p>
        </div>
        <div className="treatment-heading">
          <h2>Choose the care your body is asking for.</h2>
          <a className="button button-light" href={bookingUrl} target="_blank" rel="noreferrer">View all appointments ↗</a>
        </div>
        <div className="treatment-list">
          {treatments.map((treatment) => (
            <article className="treatment-row" key={treatment.number}>
              <span className="treatment-number">{treatment.number}</span>
              <div>
                <p className="treatment-eyebrow">{treatment.eyebrow}</p>
                <h3>{treatment.title}</h3>
              </div>
              <p className="treatment-description">{treatment.description}</p>
              <div className="treatment-meta">
                <strong>{treatment.price}</strong>
                <span>{treatment.notes}</span>
              </div>
              <a className="circle-link" aria-label={`Book ${treatment.title}`} href={bookingUrl} target="_blank" rel="noreferrer">↗</a>
            </article>
          ))}
        </div>
        <p className="price-note">Current pricing is shown as a guide. Available times, packages and add-ons are confirmed in the booking portal.</p>
      </section>

      <section className="experience section-pad">
        <div className="experience-collage">
          <img className="experience-room" src="/images/treatment-room.jpg" alt="A serene Lymph and Wellness treatment room" />
          <img className="experience-detail" src="/images/robe-detail.jpg" alt="A Lymph and Wellness robe prepared for a client" />
          <span className="collage-stamp">A quiet ritual<br />of care</span>
        </div>
        <div className="experience-copy">
          <div className="section-label"><span>03</span> The experience</div>
          <p className="kicker">Arrive. Exhale. Let go.</p>
          <h2>Every detail is part of the treatment.</h2>
          <p>
            From a luxury robe, slippers and fresh towels to complimentary refreshments waiting on arrival, each touch is considered so you can settle in from the moment you enter.
          </p>
          <ol className="steps">
            <li><span>01</span><div><strong>Consult</strong><p>We begin with your goals, history and how your body feels today.</p></div></li>
            <li><span>02</span><div><strong>Tailor</strong><p>Your session is shaped to your needs, comfort and chosen treatment.</p></div></li>
            <li><span>03</span><div><strong>Restore</strong><p>Leave with thoughtful aftercare guidance and space to continue the ritual.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="founder section-pad" id="meet-seda">
        <div className="founder-copy">
          <div className="section-label section-label-light"><span>04</span> Meet the founder</div>
          <p className="kicker">A personal approach to wellbeing</p>
          <h2>Care, guided by Seda.</h2>
          <p>
            Lymph & Wellness was founded on a simple belief: women deserve a private, supportive space where specialised body care feels as restorative as it is considered.
          </p>
          <p>
            Seda brings a warm, intuitive presence to every appointment, taking time to understand what your body needs and creating a treatment experience that feels entirely your own.
          </p>
          <blockquote>“This is more than a treatment. It&apos;s an experience of renewal, balance and refined self-care.”</blockquote>
          <span className="signature">— Seda, Founder</span>
        </div>
        <div className="founder-image-wrap">
          <img src="/images/seda-founder.jpg" alt="Seda, founder of Lymph and Wellness" />
          <span>Founder / Lymphatic specialist</span>
        </div>
      </section>

      <section className="memberships section-pad" id="memberships">
        <div className="membership-copy">
          <div className="section-label"><span>05</span> Memberships</div>
          <p className="kicker">Wellness, made consistent</p>
          <h2>Turn self-care into a rhythm.</h2>
          <p>
            Created for women ready to make recovery, self-care and wellbeing part of their lifestyle—not simply something reserved for every now and then.
          </p>
          <a className="button" href={bookingUrl} target="_blank" rel="noreferrer">Enquire about membership ↗</a>
        </div>
        <div className="membership-list">
          {memberships.map((membership, index) => (
            <div className="membership-item" key={membership}>
              <span>0{index + 1}</span>
              <strong>{membership}</strong>
              <span aria-hidden="true">↗</span>
            </div>
          ))}
          <div className="membership-footnote">Founding membership availability may be limited. Contact the studio for current inclusions.</div>
        </div>
        <img className="membership-image" src="/images/membership-detail.jpg" alt="Lymph and Wellness membership welcome detail" />
      </section>

      <section className="reviews section-pad">
        <div className="section-topline">
          <div className="section-label"><span>06</span> Client words</div>
          <div className="rating"><strong>5.0</strong><span>★★★★★</span><small>53 Google reviews</small></div>
        </div>
        <h2>Felt in the body.<br /><em>Seen in the glow.</em></h2>
        <div className="review-grid">
          {reviews.map((review) => (
            <blockquote key={review.name}>
              <span className="quote-mark">“</span>
              <p>{review.quote}</p>
              <footer><strong>{review.name}</strong><span>{review.treatment}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="faq section-pad">
        <div>
          <div className="section-label"><span>07</span> Before you book</div>
          <p className="kicker">Good to know</p>
          <h2>Your questions, answered.</h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Who are treatments for?<span>＋</span></summary>
            <p>Our services are exclusively available to female clients, helping maintain a private, supportive and comfortable treatment environment.</p>
          </details>
          <details>
            <summary>When can I book post-op lymphatic massage?<span>＋</span></summary>
            <p>Post-operative appointments are offered from four weeks after surgery. Please follow the advice of your surgeon or healthcare professional before booking.</p>
          </details>
          <details>
            <summary>Do I need to pay a deposit?<span>＋</span></summary>
            <p>A $50 deposit is shown for current treatment bookings. The booking portal will confirm the amount and any applicable terms before you complete your appointment.</p>
          </details>
          <details>
            <summary>Where is the studio?<span>＋</span></summary>
            <p>The private studio is located at 6 Bellevue Drive, Melbourne VIC 3029. Use the map link below for directions.</p>
          </details>
        </div>
      </section>

      <section className="visit section-pad" id="contact">
        <div className="visit-heading">
          <div className="section-label section-label-light"><span>08</span> Visit the studio</div>
          <h2>Your next ritual<br />starts here.</h2>
          <a className="button button-light" href={bookingUrl} target="_blank" rel="noreferrer">Book your appointment ↗</a>
        </div>
        <div className="visit-details">
          <div><span>Address</span><a href="https://www.google.com/maps/search/?api=1&query=6%20Bellevue%20Drive%2C%20Melbourne%20VIC%203029" target="_blank" rel="noreferrer">6 Bellevue Drive<br />Melbourne VIC 3029 ↗</a></div>
          <div><span>Hours</span><p>Monday—Saturday<br />10:30am—5:00pm<br /><small>Sunday closed</small></p></div>
          <div><span>Contact</span><a href="tel:+61420273015">+61 420 273 015</a><a href="mailto:info@lymphandwellnessco.com.au">info@lymphandwellnessco.com.au</a></div>
          <div><span>Follow</span><a href="https://www.instagram.com/lymph.wellnessco/" target="_blank" rel="noreferrer">@lymph.wellnessco ↗</a></div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-wordmark"><span>LYMPH &</span><span>WELLNESS</span></div>
        <p>Specialised lymphatic and wellness treatments for women in Melbourne.</p>
        <div className="footer-bottom"><span>© 2026 Lymph & Wellness Co</span><span>Treatments are wellness services and are not a substitute for medical care.</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <a className="mobile-book" href={bookingUrl} target="_blank" rel="noreferrer">Book now <span>↗</span></a>
    </main>
  );
}
