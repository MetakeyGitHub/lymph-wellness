import Image from "next/image";
import { Accordion } from "../../_components/Accordion";
import { equipmentGuides } from "../../_data/equipment-guides";
import { notFound } from "next/navigation";
import { BookingCTA } from "../../_components/BookingCTA";
import { Button } from "../../_components/Button";
import { JsonLd } from "../../_components/JsonLd";
import { SectionLabel } from "../../_components/SectionLabel";
import { equipmentPages } from "../../_data/growth";
import { pageMetadata } from "../../_data/metadata";
import { findOffer, formatPrice } from "../../_data/offerings";
import { SITE_URL } from "../../_data/seo";

export function generateStaticParams() {
  return equipmentPages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const item = equipmentPages.find((entry) => entry.slug === slug);
    if (!item) return {};
    return pageMetadata({
      title: `${item.name} Melbourne`,
      description: `${item.name} at our women-only Altona studio. Learn what to expect, how access works and how to enquire.`,
      path: `/equipment/${item.slug}`,
      image: "/share-image",
      imageAlt: `${item.name} at Lymph & Wellness`,
      keywords: [
        item.name,
        `${item.name} Melbourne`,
        `${item.name} Altona`,
        "women's wellness sanctuary Melbourne",
      ],
    });
  });
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = equipmentPages.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const codes: Record<string, string> = {
    "lymphatic-drainage-body-roller": "LWC018",
    "full-body-red-light-therapy-bed": "LWC017",
    "full-spectrum-infrared-sauna": "LWC019",
    "vacu-activ-treadmill-v3": "LWC021",
    "vacu-activ-infrastep-stairmill": "LWC022",
    "recovery-boots": "LWC020",
  };
  const offer = findOffer(codes[item.slug]);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: item.name,
      description: item.description,
      url: `${SITE_URL}/equipment/${item.slug}`,
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "City", name: "Melbourne" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Studio equipment",
          item: `${SITE_URL}/#equipment`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: item.name,
          item: `${SITE_URL}/equipment/${item.slug}`,
        },
      ],
    },
  ];

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <section className="equipment-hero">
        <div className="equipment-hero-copy">
          <p className="eyebrow">{item.eyebrow} / Women’s only</p>
          <h1>
            {item.name}
            <em>.</em>
          </h1>
          <p>{item.intro}</p>
          <p>
            {offer.minutes} minutes · {formatPrice(offer.price)}
          </p>
          <Button href={offer.url}>Book this session</Button>
        </div>
        <div className="equipment-hero-image">
          <Image
            src={item.image}
            alt="Inside the Lymph & Wellness clinic"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 780px) 100vw, 50vw"
          />
        </div>
      </section>
      <section className="equipment-explainer section-space" data-reveal>
        <div>
          <SectionLabel number="01">The experience</SectionLabel>
          <h2>
            Clear guidance.
            <br />
            <em>Considered access.</em>
          </h2>
        </div>
        <div>
          <p className="lead">{item.description}</p>
          <p>
            Machine sessions are wellness experiences and do not replace medical
            advice or care. Individual comfort, suitability and outcomes vary.
          </p>
        </div>
      </section>
      <section className="equipment-expectations section-space" data-reveal>
        <SectionLabel number="02" light>
          What to expect
        </SectionLabel>
        <div>
          {item.expectations.map((expectation, index) => (
            <article key={expectation}>
              <span>0{index + 1}</span>
              <h2>{expectation}</h2>
            </article>
          ))}
        </div>
      </section>
      <section className="lw-section lw-treatment-faq" data-reveal>
        <div className="lw-section-intro">
          <p className="lw-overline">Before your visit</p>
          <h2>A little more to know.</h2>
        </div>
        <Accordion items={equipmentGuides[item.slug]} />
        <div className="lw-section-footer">
          <Button href="/services#service-prices">
            Compare machine sessions
          </Button>
        </div>
      </section>
      <BookingCTA compact />
    </main>
  );
}
