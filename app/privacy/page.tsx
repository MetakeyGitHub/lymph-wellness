import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";
import { EMAIL_URL, EMAIL_DISPLAY } from "../_data/site";
export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Lymph & Wellness handles website enquiries, optional analytics choices and booking information, with contact details for privacy questions.",
  alternates: { canonical: "https://www.lymphandwellness.com.au/privacy" },
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
          This website does not use advertising pixels or session replay. Where
          optional Google Analytics is enabled, it loads only after you choose
          “Allow analytics”. You can keep it off or change your choice using
          Cookie settings in the footer. Our hosting provider may process
          routine technical request information to deliver and protect the
          website.
        </p>
        <h3>Optional analytics</h3>
        <p>
          When enabled and allowed, Google Analytics measures visits and general
          actions such as opening booking, phone, email or directions links. We
          use a general website address and broad page sections in reports,
          rather than treatment-specific URLs. We do not include treatment names
          or IDs, finder answers, search terms, or enquiry content in our
          analytics events. A booking-link click is not recorded as a completed
          appointment or purchase.
        </p>
        <p>
          Your cookie preference is saved in your browser. If you allow
          analytics, Google may use analytics cookies and process technical
          information such as device and browser details. You can withdraw your
          choice in Cookie settings; future analytics collection is then
          disabled and this site’s Google Analytics cookies are cleared. See{" "}
          <a href="https://policies.google.com/privacy">
            Google’s privacy policy
          </a>{" "}
          for information about its processing.
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
