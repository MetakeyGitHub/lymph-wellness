import Image from "next/image";
import { Button } from "../_components/Button";
import { SectionLabel } from "../_components/SectionLabel";
import { MEMBERSHIP_URL } from "../_data/site";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({
  title: "Wellness Memberships Melbourne",
  description:
    "Women-only wellness memberships in Altona with infrared sauna, recovery boots, lymphatic body rollers and full-body red light therapy access.",
  path: "/memberships",
  image: "/images/social-memberships.jpg",
  imageAlt: "Private sauna and recovery ritual at Lymph & Wellness",
});

const plans = [
  { name: "VIP Reset", rhythm: "Weekly", sauna: "Included", boots: "Included", roller: "Not included", led: "Not included", price: "$139" },
  { name: "Beachside Essential", rhythm: "Monthly", sauna: "Not included", boots: "Not included", roller: "Choose one", led: "Choose one", price: "$196" },
  { name: "Glow and Detox", rhythm: "Bi-weekly", sauna: "Included", boots: "Included", roller: "Not included", led: "Not included", price: "$198" },
  { name: "Lymph Ritual", rhythm: "Monthly", sauna: "Not included", boots: "Included", roller: "Included", led: "Not included", price: "$316" },
  { name: "Glow and Detox", rhythm: "Monthly", sauna: "Included", boots: "Included", roller: "Not included", led: "Not included", price: "$396" },
] as const;

const modalities = [
  ["01", "Full-Spectrum Infrared Sauna", "A private heat-based ritual designed to complement rest and recovery."],
  ["02", "Recovery Boots", "Compression-based sessions for a considered recovery routine."],
  ["03", "Lymphatic Drainage Body Roller", "A targeted roller-massage option available within selected memberships."],
  ["04", "Full-Body Red Light Therapy Bed", "Whole-body light therapy offered within selected membership access."],
] as const;

function Inclusion({ value }: { value: "Included" | "Not included" | "Choose one" }) {
  if (value === "Included") return <span className="membership-status included"><span aria-hidden="true">●</span><span>Included</span></span>;
  if (value === "Choose one") return <span className="membership-status choice">Choose one</span>;
  return <span className="membership-status excluded"><span aria-hidden="true">−</span><span className="sr-only">Not included</span></span>;
}

export default function MembershipsPage() {
  return (
    <main id="main">
      <section className="membership-hero">
        <div className="membership-hero-copy">
          <p className="eyebrow">Women’s only wellness sanctuary</p>
          <h1>Your ritual,<br /><em>on repeat.</em></h1>
          <p>Thoughtful weekly, bi-weekly and monthly options for women who want sauna, light therapy and restorative body care to become part of their regular rhythm.</p>
          <Button href={MEMBERSHIP_URL}>Enquire about membership</Button>
          <div className="membership-hero-meta" aria-label="Available membership rhythms">
            <span>Weekly</span><span>Bi-weekly</span><span>Monthly</span>
          </div>
        </div>
        <div className="membership-hero-image">
          <Image src="/images/membership-suite.webp" alt="Private wellness recovery suite with sauna and recovery boots" fill loading="eager" fetchPriority="high" sizes="(max-width: 780px) 100vw, 56vw" />
          <span>Regular care, considered around you</span>
        </div>
      </section>

      <section className="membership-comparison section-space" data-reveal>
        <div className="membership-comparison-heading">
          <div><SectionLabel number="01" light>Compare memberships</SectionLabel><h2>Find your<br /><em>rhythm.</em></h2></div>
          <p>Each price reflects the current membership portal listing. Beachside Essential includes a choice of Body Roller or LED Bed.</p>
        </div>

        <div className="membership-table-wrap">
          <table className="membership-table">
            <caption className="sr-only">Comparison of Lymph &amp; Wellness membership plans and inclusions</caption>
            <thead><tr><th scope="col">Membership</th><th scope="col">Rhythm</th><th scope="col">Sauna</th><th scope="col">Recovery boots</th><th scope="col">Body roller</th><th scope="col">LED bed</th><th scope="col">Price</th></tr></thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={`${plan.name}-${plan.rhythm}`}>
                  <th scope="row">{plan.name}</th>
                  <td data-label="Rhythm">{plan.rhythm}</td>
                  <td data-label="Sauna"><Inclusion value={plan.sauna} /></td>
                  <td data-label="Recovery boots"><Inclusion value={plan.boots} /></td>
                  <td data-label="Body roller"><Inclusion value={plan.roller} /></td>
                  <td data-label="LED bed"><Inclusion value={plan.led} /></td>
                  <td data-label="Price"><strong>{plan.price}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="membership-table-footer">
          <p><span aria-hidden="true">●</span> Included</p>
          <Button href={MEMBERSHIP_URL} variant="light">Enquire about a plan</Button>
        </div>
      </section>

      <section className="membership-modalities section-space" data-reveal>
        <div className="membership-modalities-heading">
          <SectionLabel number="02">Inside the ritual</SectionLabel>
          <h2>Four ways to<br /><em>restore.</em></h2>
          <p>Memberships combine selected access to four studio experiences. Your inclusions depend on the plan you choose.</p>
        </div>
        <div className="membership-modality-list">
          {modalities.map(([number, title, copy]) => (
            <article key={title}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="membership-editorial" data-reveal>
        <div className="membership-editorial-image">
          <Image src="/images/social-memberships.jpg" alt="Sculptural private wellness suite in warm neutral light" fill sizes="(max-width: 780px) 100vw, 58vw" />
        </div>
        <div className="membership-editorial-copy">
          <SectionLabel number="03">Before you purchase</SectionLabel>
          <h2>Choose the pace.<br /><em>Keep the ritual.</em></h2>
          <p className="lead">A membership is a simple way to make regular care part of your routine.</p>
          <p>The vacuum treadmill V3 and Infrastep StairMill are studio experiences, but they are not included in the plans shown above. Enquire for current availability and the most suitable way to book.</p>
          <p className="membership-disclaimer">Service suitability varies. Membership access does not replace medical advice or guarantee a particular outcome.</p>
          <Button href={MEMBERSHIP_URL}>Ask about membership</Button>
        </div>
      </section>
    </main>
  );
}
