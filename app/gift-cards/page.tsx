import { ArrowIcon } from "../_components/ArrowIcon";
import { PageHero } from "../_components/PageHero";
import {
  GIFT_CARDS_URL,
  giftCardAmounts,
  formatPrice,
} from "../_data/offerings";
import { pageMetadata } from "../_data/metadata";
export const metadata = pageMetadata({
  title: "Wellness Gift Cards",
  description:
    "Give a moment of wellness at our Altona clinic. Choose $20, $50, $100 or a custom gift card amount.",
  path: "/gift-cards",
});
export default function GiftCards() {
  return (
    <main id="main">
      <PageHero
        action={{ href: "#gift-options", label: "Choose your gift" }}
        eyebrow="Give a little care"
        title={
          <>
            For someone
            <br />
            who gives so much.
          </>
        }
        intro="A thoughtful invitation to slow down. Let them choose the wellness experience that feels right for them."
        image="/images/clinic/recovery-lounge.jpg"
        imageAlt="Calm recovery lounge at Lymph & Wellness"
      />
      <section className="lw-section" id="gift-options">
        <div className="lw-gift-panel">
          <p className="lw-overline">A moment, beautifully given</p>
          <h2>The gift of time.</h2>
          <p>
            Choose an amount, personalise your message and enter your
            recipient’s details in our secure gift card portal.
          </p>
          <div
            className="lw-gift-amounts"
            aria-label="Available gift card amounts"
          >
            {giftCardAmounts.map((a) => (
              <span key={a}>{formatPrice(a)}</span>
            ))}
            <span>Your amount</span>
          </div>
          <a className="lw-button" href={GIFT_CARDS_URL}>
            Create your gift card <ArrowIcon />
          </a>
          <p className="lw-small">
            Select your amount in the next step. Review delivery, expiry and
            redemption conditions before purchase. All amounts are in AUD.
          </p>
        </div>
      </section>
    </main>
  );
}
