import Link from "next/link";
import { BOOKING_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_URL, navigation, openingHours } from "../_data/site";
import { Button } from "./Button";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="footer-statement">Care tailored to the way your body feels.</p>
        <Button href={BOOKING_URL} variant="light">Book a treatment</Button>
      </div>
      <div className="footer-grid">
        <div className="footer-brand"><span>LYMPH &amp;</span><span>WELLNESS</span></div>
        <div><p className="footer-label">Navigation</p>{navigation.slice(1).map(i => <Link key={i.href} href={i.href}>{i.label}</Link>)}<Link href="/contact">Contact</Link></div>
        <div><p className="footer-label">Connect</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram ↗</a><a href={PHONE_URL}>{PHONE_DISPLAY}</a></div>
        <div className="footer-hours"><p className="footer-label">Opening hours</p>{openingHours.map(([day, hours]) => <p key={day}><span>{day.slice(0, 3)}</span>{hours}</p>)}</div>
      </div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Lymph &amp; Wellness</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></div><span>Wellness treatments do not replace medical care.</span></div>
    </footer>
  );
}
