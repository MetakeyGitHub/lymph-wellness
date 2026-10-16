import Image from "next/image";
import Link from "next/link";
import { Button } from "../_components/Button";
import { SectionLabel } from "../_components/SectionLabel";
import { CATALOGUE_VERIFIED, MEMBERSHIP_URL, SERIES_PACKAGES_URL, formatPrice, memberships } from "../_data/offerings";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({
  title: "Wellness Memberships Melbourne",
  description: "Compare current Lymph & Wellness memberships: Glow and Detox, Lymph Ritual, VIP Reset and VIP Reset Launch Day. View AUD pricing and billing periods.",
  path: "/memberships", image: "/images/social-memberships.jpg", imageAlt: "Private sauna and recovery ritual at Lymph & Wellness",
});

export default function MembershipsPage() {
  return <main id="main">
    <section className="membership-hero">
      <div className="membership-hero-copy">
        <p className="eyebrow">Women’s only wellness sanctuary</p>
        <h1>Your ritual,<br /><em>on repeat.</em></h1>
        <p>Explore monthly memberships and the VIP Reset Launch Day option billed every 14 days. Choose the rhythm that fits your regular wellness routine.</p>
        <Button href={MEMBERSHIP_URL} external>View memberships</Button>
        <div className="membership-hero-meta" aria-label="Available billing periods"><span>Monthly</span><span>Every 14 days</span></div>
      </div>
      <div className="membership-hero-image">
        <Image src="/images/membership-suite.webp" alt="Private wellness recovery suite with sauna and recovery boots" fill loading="eager" fetchPriority="high" sizes="(max-width: 780px) 100vw, 56vw" />
        <span>Regular care, considered around you</span>
      </div>
    </section>
    <section className="membership-comparison section-space" data-reveal>
      <div className="membership-comparison-heading">
        <div><SectionLabel number="01" light>Compare memberships</SectionLabel><h2>Find your<br /><em>rhythm.</em></h2></div>
        <p>These are the memberships currently listed in Zenoti. All prices are in AUD and charged per billing period shown. Review benefits and payment terms in the portal before purchasing.</p>
      </div>
      <div className="membership-table-wrap">
        <table className="membership-table">
          <caption className="sr-only">Current membership names, AUD prices and billing periods</caption>
          <thead><tr><th scope="col">Membership</th><th scope="col">Billing period</th><th scope="col">Price (AUD)</th><th scope="col">Explore</th></tr></thead>
          <tbody>{memberships.map(plan => <tr key={plan.name}><th scope="row">{plan.name}</th><td>{plan.period}</td><td><strong>{formatPrice(plan.price)}</strong></td><td><a className="text-link" href={MEMBERSHIP_URL} target="_blank" rel="noreferrer" aria-label={`View ${plan.name} in Zenoti`}>View membership ↗</a></td></tr>)}</tbody>
        </table>
      </div>
      <div className="membership-mobile-list" aria-label="Membership options">
        {memberships.map(plan => <article key={plan.name}>
          <div className="membership-mobile-top"><div><p>{plan.period}</p><h3>{plan.name}</h3></div><strong>{formatPrice(plan.price)}</strong></div>
          <p className="membership-mobile-includes">AUD {plan.period}. Select this membership in Zenoti to review its benefits and terms.</p>
          <a href={MEMBERSHIP_URL} target="_blank" rel="noreferrer" aria-label={`Choose ${plan.name} in Zenoti`}>Choose membership <span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
      <div className="membership-table-footer"><p>Checked against Zenoti: {CATALOGUE_VERIFIED}</p><Button href={MEMBERSHIP_URL} variant="light" external>View memberships</Button></div>
    </section>
    <section className="membership-editorial" data-reveal>
      <div className="membership-editorial-image"><Image src="/images/social-memberships.jpg" alt="Sculptural private wellness suite in warm neutral light" fill sizes="(max-width: 780px) 100vw, 58vw" /></div>
      <div className="membership-editorial-copy">
        <SectionLabel number="02">Before you purchase</SectionLabel><h2>Choose the pace.<br /><em>Keep the ritual.</em></h2>
        <p className="lead">A membership is a simple way to make regular care part of your routine.</p>
        <p>The public membership listing confirms prices and billing periods but does not display service allowances. Check the exact included services, visit limits, commitment and cancellation terms with the studio before you purchase. Zenoti may ask you to sign in to continue.</p>
        <p>Prefer a set of sessions? Series packages offer separate prepaid options for sauna, recovery boots, premium machines, EMS and VacuActive.</p>
        <Button href={SERIES_PACKAGES_URL} external>View series packages</Button>
        <p><Link className="text-link" href="/packages">Compare packages ↗</Link></p>
      </div>
    </section>
  </main>;
}
