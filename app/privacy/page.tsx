import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";
import { EMAIL_URL, EMAIL_DISPLAY } from "../_data/site";
export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Your information"
        title={
          <>
            Privacy,
            <br />
            with care.
          </>
        }
        intro="How information is handled when you use this website, contact the clinic or book an appointment."
      />
      <article className="lw-section lw-privacy-note">
        <p className="lw-overline">
          Website information · Updated 10 November 2026
        </p>
        <h2>Your privacy matters.</h2>
        <h3>Browsing this website</h3>
        <p>
          This version of the website does not load advertising pixels, session
          replay or third-party visitor analytics. Our hosting provider may
          process routine technical request information to deliver and protect
          the website.
        </p>
        <h3>Contacting the clinic</h3>
        <p>
          The enquiry form prepares an email in your own email application. It
          does not submit your message to a website database. You can review the
          email before sending it. Please avoid including medical records or
          detailed health information in a general enquiry; contact the clinic
          to arrange an appropriate way to share it.
        </p>
        <h3>Booking and purchases</h3>
        <p>
          Appointment bookings, memberships, packages and gift cards are handled
          through our Zenoti booking portal. Details entered there are processed
          by the clinic and booking provider under the policies displayed in
          that service. Review those policies before entering personal or health
          information.
        </p>
        <h3>External links</h3>
        <p>
          Instagram, Google Maps and other external services have their own
          privacy practices. Opening a link takes you to that service.
        </p>
        <h3>Questions and access requests</h3>
        <p>
          For questions about information held by the clinic, access or
          correction requests, or a privacy concern, email{" "}
          <a className="lw-text-link" href={EMAIL_URL}>
            {EMAIL_DISPLAY}
          </a>
          .
        </p>
      </article>
    </main>
  );
}
