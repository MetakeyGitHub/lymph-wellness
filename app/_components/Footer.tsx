import Image from "next/image";
import Link from "next/link";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_DISPLAY,
  PHONE_URL,
  EMAIL_DISPLAY,
  EMAIL_URL,
  INSTAGRAM_URL,
  MAPS_URL,
  openingHours,
} from "../_data/site";
export function Footer() {
  return (
    <footer className="lw-footer">
      <div className="lw-footer-top">
        <p>
          A little time.
          <br />
          Entirely for you.
        </p>
        <Link className="lw-button light" href="/services">
          Find your next visit <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="lw-footer-grid">
        <div>
          <Image
            src="/brand/logo-light.svg"
            alt="Lymph & Wellness"
            width={249}
            height={67}
          />
          <p>Women’s wellness, Altona.</p>
          <a href={MAPS_URL}>
            {ADDRESS_LINE_1}
            <br />
            {ADDRESS_LINE_2} ↗
          </a>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/services">Treatments</Link>
          <Link href="/packages">Experiences & packs</Link>
          <Link href="/memberships">Memberships</Link>
          <Link href="/gift-cards">Gift cards</Link>
          <Link href="/post-op">Post-operative care</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/faq">Questions</Link>
        </div>
        <div>
          <h2>Come say hello</h2>
          <a href={PHONE_URL}>{PHONE_DISPLAY}</a>
          <a href={EMAIL_URL}>{EMAIL_DISPLAY}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            @lymph.andwellness ↗
          </a>
          <Link href="/contact">Visit & contact</Link>
        </div>
        <div>
          <h2>Clinic hours</h2>
          {openingHours.map(([day, time]) => (
            <p className="lw-hours" key={day}>
              <span>{day.slice(0, 3)}</span>
              <span>{time}</span>
            </p>
          ))}
          <small>Appointment times vary by treatment.</small>
        </div>
      </div>
      <div className="lw-footer-bottom">
        <span>© {new Date().getFullYear()} Lymph & Wellness</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <span>Wellness care does not replace medical care.</span>
      </div>
    </footer>
  );
}
