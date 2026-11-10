import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { CareMark } from "./CareMark";
import { findOffer, formatPrice } from "../_data/offerings";

export function SignatureCare() {
  return (
    <section
      className="lw-signature lw-section"
      aria-labelledby="signature-heading"
    >
      <div className="lw-signature-heading">
        <div>
          <p className="lw-overline">
            <span>01 /</span> At the heart of our clinic
          </p>
          <h2 id="signature-heading">
            A considered touch.
            <br />
            <span>A little more care.</span>
          </h2>
        </div>
        <p>
          Lymphatic massage is at the heart of Lymph & Wellness. Explore
          hands-on body care, time for your face, or a conversation about care
          after surgery.
        </p>
      </div>
      <div className="lw-care-paths">
        <article className="lw-care-path lw-care-path-primary">
          <div className="lw-care-path-art">
            <CareMark variant="flow" />
            <span>Body / 01</span>
          </div>
          <div>
            <p className="lw-overline">Lymphatic body care</p>
            <h3>Time, in good hands.</h3>
            <p>
              Compare our 60- and 90-minute lymphatic massage appointments, or
              explore the separately named massage and EMS combination.
            </p>
            <p className="lw-care-price">
              From {formatPrice(findOffer("LWC001").price)}{" "}
              <span>· 60 or 90 min massage appointments</span>
            </p>
            <Link
              className="lw-text-link"
              href="/treatments/lymphatic-drainage-melbourne"
            >
              Explore lymphatic massage <ArrowIcon />
            </Link>
          </div>
        </article>
        <article className="lw-care-path">
          <div className="lw-care-path-art">
            <CareMark variant="face" />
            <span>Face / 02</span>
          </div>
          <div>
            <p className="lw-overline">Facial care</p>
            <h3>A moment for your face.</h3>
            <p>
              Facial massage, cupping, LED combinations and Signature Qi
              therapies. Find the experience you have in mind.
            </p>
            <Link
              className="lw-text-link"
              href="/treatments/facial-sculpting-melbourne"
            >
              Explore facial care <ArrowIcon />
            </Link>
          </div>
        </article>
        <article className="lw-care-path">
          <div className="lw-care-path-art">
            <CareMark />
            <span>Care / 03</span>
          </div>
          <div>
            <p className="lw-overline">After surgery</p>
            <h3>Begin with a conversation.</h3>
            <p>
              Explore our post-operative guidance and speak with the team before
              choosing an appointment.
            </p>
            <Link className="lw-text-link" href="/post-op">
              Explore post-operative care <ArrowIcon />
            </Link>
          </div>
        </article>
      </div>
      <div className="lw-care-footer">
        <p>A little clarity makes choosing easier.</p>
        <Link className="lw-button" href="/compare-treatments">
          Compare treatment options <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

export function CarePrinciples() {
  return (
    <section
      className="lw-principles lw-section"
      aria-labelledby="principles-heading"
    >
      <div>
        <p className="lw-overline">02 / The way we care</p>
        <h2 id="principles-heading">
          Thoughtful,
          <br />
          <span>from the beginning.</span>
        </h2>
        <Link className="lw-text-link" href="/about">
          Get to know the clinic <ArrowIcon />
        </Link>
      </div>
      <div className="lw-principle-list">
        <article>
          <span>01</span>
          <div>
            <h3>A space for women.</h3>
            <p>
              A women-only clinic on Pier Street, Altona, bringing hands-on care
              and wellness experiences together.
            </p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <h3>Room for your questions.</h3>
            <p>
              Ask about the appointment, your practitioner and what would help
              you feel comfortable before you book.
            </p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <h3>Clear choices, at your pace.</h3>
            <p>
              See the price, appointment length and named inclusions. Choose a
              single visit or explore ways to return.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function FirstVisitPreview() {
  return (
    <section
      className="lw-first-visit-preview lw-section"
      aria-labelledby="first-visit-heading"
    >
      <div className="lw-first-visit-art">
        <CareMark />
        <p className="lw-overline">Your pause, on Pier Street.</p>
      </div>
      <div>
        <p className="lw-overline">Your first visit</p>
        <h2 id="first-visit-heading">
          A familiar feeling.
          <br />
          <span>Even the first time.</span>
        </h2>
        <p>
          Know where to go, what to ask and what comes next. Walk through your
          first visit before you arrive.
        </p>
        <ol>
          {[
            "Before you arrive",
            "Finding us",
            "Your conversation",
            "Your treatment",
            "After your visit",
          ].map((label, i) => (
            <li key={label}>
              <span>0{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <Link className="lw-button" href="/your-first-visit">
          Plan your first visit <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
