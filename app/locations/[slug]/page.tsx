import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCTA } from "../../_components/BookingCTA";
import { Button } from "../../_components/Button";
import { JsonLd } from "../../_components/JsonLd";
import { PageHero } from "../../_components/PageHero";
import { SectionLabel } from "../../_components/SectionLabel";
import { locationPages } from "../../_data/growth";
import { pageMetadata } from "../../_data/metadata";
import { MAPS_URL, services } from "../../_data/site";
import { SITE_URL } from "../../_data/seo";

export function generateStaticParams() {
  return locationPages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const location = locationPages.find((entry) => entry.slug === slug);
    if (!location) return {};
    return pageMetadata({
      title: location.title,
      description: `Women-only lymphatic drainage near ${location.name}. Visit our private Altona studio for treatment, recovery care and body wellness.`,
      path: `/locations/${location.slug}`,
      image: "/share-image",
      imageAlt: `Women-only lymphatic drainage for ${location.name}`,
      keywords: [`lymphatic drainage ${location.name}`, `lymphatic massage ${location.name}`, `women's wellness ${location.name}`, "lymphatic drainage Melbourne west"],
    });
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationPages.find((entry) => entry.slug === slug);
  if (!location) notFound();
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebPage", name: location.title, url: `${SITE_URL}/locations/${location.slug}`, about: { "@id": `${SITE_URL}/#business` }, spatialCoverage: { "@type": "Place", name: `${location.name}, Victoria` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${SITE_URL}/areas-we-serve` },
      { "@type": "ListItem", position: 3, name: location.name, item: `${SITE_URL}/locations/${location.slug}` },
    ] },
  ];
  return <main id="main">
    <JsonLd data={jsonLd} />
    <PageHero eyebrow={`${location.name} / Melbourne west`} title={<>{location.title.split(" ").slice(0, 2).join(" ")}<br /><em>{location.name}.</em></>} intro={location.intro} image="/images/clinic/lounge.jpg" imageAlt="Lymph & Wellness clinic lounge in Altona" />
    <section className="location-intro section-space" data-reveal><div><SectionLabel number="01">Your local studio</SectionLabel><h2>Care worth<br /><em>travelling for.</em></h2></div><div><p className="lead">{location.localCopy}</p><p>Our treatment approach is calm, private and centred on women. Compare appointment lengths and prices, then choose the service that suits your visit. Contact our team first if you need help deciding.</p><Button href="/contact#book">View appointment options</Button></div></section>
    <section className="location-services section-space" data-reveal><div><SectionLabel number="02" light>Treatments</SectionLabel><h2>Four considered<br /><em>pathways.</em></h2></div><div>{services.map((service) => <Link href={service.href} key={service.slug}><span>{service.number}</span><h3>{service.shortTitle}</h3><p>{service.copy}</p><small>Explore treatment ↗</small></Link>)}</div></section>
    <section className="location-address section-space"><p className="eyebrow">All appointments</p><h2>1/22 Pier Street,<br /><em>Altona VIC 3018.</em></h2><p>Travel time varies with route and traffic. Check your journey before booking and arrive with enough time to settle in.</p><a className="text-link" href={MAPS_URL} target="_blank" rel="noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a></section>
    <BookingCTA compact />
  </main>;
}
