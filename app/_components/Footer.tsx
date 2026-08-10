import Link from "next/link";
import { BOOKING_URL, CONTACT_EMAIL, INSTAGRAM_URL, navigation } from "../_data/site";
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
        <div><p className="footer-label">Connect</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram ↗</a><a href={`mailto:${CONTACT_EMAIL}`}>Email</a></div>
        <div><p className="footer-label">Location</p><p>Melbourne, Victoria<br />Australia</p></div>
      </div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Lymph &amp; Wellness</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></div><span>Wellness treatments do not replace medical care.</span></div>
    </footer>
  );
}

