import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { CookieSettingsButton } from "./GoogleAnalytics";
import { HoursList, OpenStatus } from "./OpenStatus";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_DISPLAY,
  PHONE_URL,
  EMAIL_DISPLAY,
  EMAIL_URL,
  INSTAGRAM_URL,
  MAPS_URL,
} from "../_data/site";

export function Footer() {
  return (
    <footer className="lw-footer">
      <div className="lw-footer-top">
        <p>
          A little time.
          <br />
          <em>Entirely for you.</em>
        </p>
        <div>
          <Link className="lw-button light" href="/services">
            Find your next visit <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
          <Link className="lw-text-link" href="/#treatment-finder">
            Not sure? Let us guide you <ArrowIcon />
          </Link>
        </div>
      </div>
      <div className="lw-footer-grid">
        <div className="lw-footer-brand">
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
            {ADDRESS_LINE_2} <ArrowIcon />
          </a>
        </div>
        <div>
          <h2>Care</h2>
          <Link href="/services">Treatments</Link>
          <Link href="/compare-treatments">Compare appointments</Link>
          <Link href="/packages">Experiences & packs</Link>
          <Link href="/memberships">Memberships</Link>
          <Link href="/gift-cards">Gift cards</Link>
          <Link href="/post-op">Post-operative care</Link>
        </div>
        <div>
          <h2>Clinic</h2>
          <Link href="/about">About the clinic</Link>
          <Link href="/your-first-visit">Your first visit</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/faq">Questions</Link>
          <Link href="/contact">Visit & contact</Link>
          <Link href="/search">Search the site</Link>
        </div>
        <div>
          <h2>Come say hello</h2>
          <a href={PHONE_URL}>{PHONE_DISPLAY}</a>
          <a href={EMAIL_URL}>{EMAIL_DISPLAY}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            @lymph.andwellness <ArrowIcon />
          </a>
        </div>
        <div className="lw-footer-hours">
          <h2>Clinic hours</h2>
          <OpenStatus />
          <HoursList short />
          <small>Appointment times vary by treatment.</small>
        </div>
      </div>
      <div className="lw-footer-bottom">
        <span>© {new Date().getFullYear()} Lymph & Wellness</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <CookieSettingsButton />
        <span>Wellness care does not replace medical care.</span>
      </div>
    </footer>
  );
}
