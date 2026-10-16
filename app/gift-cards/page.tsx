import { PageHero } from "../_components/PageHero";
import { Button } from "../_components/Button";
import { OfferingLinks } from "../_components/OfferingLinks";
import { CATALOGUE_VERIFIED, GIFT_CARDS_URL, formatPrice, giftCardAmounts } from "../_data/offerings";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({ title: "Wellness Gift Cards", description: "Gift Lymph & Wellness care with $20, $50, $100 or a custom amount through our secure Zenoti gift card portal.", path: "/gift-cards" });
export default function GiftCardsPage() {
  return <main id="main"><PageHero eyebrow="A gift of care" title={<>Give a moment<br /><em>of wellbeing.</em></>} intro="Choose a gift card amount in Zenoti and follow the portal to personalise your gift. All amounts are in AUD." image="/images/flow-editorial.webp" imageAlt="Soft ivory fabric folds" />
    <section className="catalogue section-space"><p className="eyebrow">Gift card options</p><h2>A thoughtful<br /><em>gesture.</em></h2><div className="gift-card-options">{giftCardAmounts.map(amount => <a href={GIFT_CARDS_URL} target="_blank" rel="noreferrer" key={amount} aria-label={`Choose a ${formatPrice(amount)} AUD gift card in Zenoti`}>{formatPrice(amount)} <span aria-hidden="true">↗</span></a>)}<a href={GIFT_CARDS_URL} target="_blank" rel="noreferrer">Custom amount <span aria-hidden="true">↗</span></a></div>
      <p>Each option opens the gift card portal. Select your amount there to continue. You can also check an existing card’s balance or resend a gift card through the same portal.</p>
      <p className="catalogue-note">Checked against Zenoti: {CATALOGUE_VERIFIED}. Review current gift card conditions in the portal before purchasing.</p><Button href={GIFT_CARDS_URL} external>Buy a gift card</Button><OfferingLinks />
    </section>
  </main>;
}
