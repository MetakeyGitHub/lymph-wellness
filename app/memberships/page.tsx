import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "../_components/Button";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { MEMBERSHIP_URL, memberships } from "../_data/site";

export const metadata: Metadata = {
  title: "Wellness Memberships Melbourne",
  description: "Explore weekly, bi-weekly and monthly Lymph & Wellness memberships for sauna, recovery boots, body roller and LED bed access.",
};

export default function MembershipsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Memberships"
        title={<>A rhythm of<br /><em>regular care.</em></>}
        intro="Considered membership options for women who want to make lymphatic wellness, recovery and restoration part of a regular routine."
        image="/images/cream-texture.jpg"
        imageAlt="Sculptural cream texture in warm neutral tones"
      />

      <section className="membership-intro section-space" data-reveal>
        <div><SectionLabel number="01">Choose your rhythm</SectionLabel><h2>Care that fits<br /><em>your routine.</em></h2></div>
        <div><p className="lead">Choose from weekly, bi-weekly and monthly passes with selected access to sauna, recovery boots, body roller and LED bed services.</p><p>Each option is designed around a different pace of care. Review the current inclusions and purchase through the secure membership portal.</p><Button href={MEMBERSHIP_URL} external>View memberships</Button></div>
      </section>

      <section className="membership-list section-space" data-reveal>
        <div className="membership-list-heading"><SectionLabel number="02">Current options</SectionLabel><p>Membership prices and inclusions shown below reflect the current portal listing.</p></div>
        <div className="membership-rows">
          {memberships.map((membership, index) => (
            <article key={`${membership.name}-${membership.price}`}>
              <span className="membership-number">{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{membership.name}</h2><p>{membership.cadence}</p></div>
              <p className="membership-inclusions">{membership.inclusions}</p>
              <strong>{membership.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="membership-note section-space" data-reveal>
        <div className="membership-note-image"><Image src="/images/architectural-curve.jpg" alt="Soft architectural curves" fill sizes="(max-width: 780px) 100vw, 42vw" /></div>
        <div><SectionLabel number="03">Before you purchase</SectionLabel><h2>Clear, considered<br /><em>membership care.</em></h2><p>Membership availability, inclusions and purchase conditions are confirmed in the external portal. Review all current terms before purchasing.</p><p>Treatment and service suitability varies. Membership access does not replace medical advice or guarantee a particular outcome.</p><Button href={MEMBERSHIP_URL} external>Purchase a membership</Button></div>
      </section>
    </main>
  );
}
