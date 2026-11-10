import { ArrowIcon } from "../../_components/ArrowIcon";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCTA } from "../../_components/BookingCTA";
import { Button } from "../../_components/Button";
import { JsonLd } from "../../_components/JsonLd";
import { SectionLabel } from "../../_components/SectionLabel";
import { articles } from "../../_data/articles";
import { getTreatmentPage, SITE_URL, treatmentPages } from "../../_data/seo";
import { pageMetadata } from "../../_data/metadata";

import { treatmentGuides } from "../../_data/treatment-guides";
import { comparisonGroups } from "../../_data/comparisons";
import { TreatmentComparison } from "../../_components/TreatmentComparison";
import { Accordion } from "../../_components/Accordion";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return treatmentPages.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentPage(slug);
  if (!treatment) return {};
  return pageMetadata({
    title: treatment.seoTitle,
    description: treatment.description,
    keywords: treatment.keywords,
    path: `/treatments/${treatment.slug}`,
    image: "/share-image",
    imageAlt: `${treatment.title} at Lymph & Wellness`,
  });
}

export default async function TreatmentLandingPage({ params }: Props) {
  const { slug } = await params;
  const treatment = getTreatmentPage(slug);
  if (!treatment) notFound();
  const guide = treatmentGuides[slug];
  const comparison = comparisonGroups.find(group => group.slug === slug)!;
  const related = treatment.articleSlugs
    .map((articleSlug) =>
      articles.find((article) => article.slug === articleSlug),
    )
    .filter(Boolean);
  const canonical = `${SITE_URL}/treatments/${treatment.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: treatment.title,
      description: treatment.description,
      url: canonical,
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Melbourne western suburbs",
      },
      provider: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Treatments",
          item: `${SITE_URL}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: treatment.title,
          item: canonical,
        },
      ],
    },
  ];

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <section className="treatment-landing-hero">
        <div className="treatment-landing-copy">
          <p className="eyebrow">{treatment.eyebrow}</p>
          <h1>{treatment.title}</h1>
          <p className="lead">{treatment.intro}</p>
          <div>
            <Button href={treatment.bookingUrl} external>
              {treatment.bookingLabel}
            </Button>
            <Link className="text-link" href="/services">
              All treatments <span aria-hidden="true"><ArrowIcon /></span>
            </Link>
          </div>
        </div>
        <div className="treatment-landing-image">
          <Image
            src={treatment.image}
            alt={treatment.imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 780px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="treatment-landing-overview section-space" data-reveal>
        <div>
          <SectionLabel number="01">Treatment overview</SectionLabel>
          <h2>
            Care with
            <br />
            <em>clear expectations.</em>
          </h2>
        </div>
        <div className="treatment-landing-facts">
          <div>
            <span>Duration</span>
            <p>{treatment.duration}</p>
          </div>
          <div>
            <span>Price</span>
            <p>{treatment.price}</p>
          </div>
          <div>
            <span>Who it may suit</span>
            <p>{treatment.suitable}</p>
          </div>
          {treatment.additions.length > 0 && (
            <div>
              <span>
                {treatment.slug === "facial-sculpting-melbourne"
                  ? "Treatment options"
                  : "Optional additions"}
              </span>
              <ul>
                {treatment.additions.map((addition) => (
                  <li key={addition}>{addition}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="treatment-expectations section-space" data-reveal>
        <div>
          <SectionLabel number="02" light>
            What to expect
          </SectionLabel>
          <h2>
            A considered
            <br />
            <em>appointment.</em>
          </h2>
        </div>
        <ol>
          {treatment.expectations.map((expectation, index) => (
            <li key={expectation}>
              <span>0{index + 1}</span>
              <p>{expectation}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="lw-section lw-treatment-guide">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">A clearer choice</p>
            <h2>Find your appointment.</h2>
          </div>
        </div>
        <div className="lw-guide-columns">
          {guide.sections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </div>
          ))}
        </div>
        <TreatmentComparison group={comparison} showGuide={false} />
        <Link className="lw-text-link" href="/your-first-visit">Plan your first visit <ArrowIcon /></Link>
      </section>
      <section className="lw-section lw-tinted">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">Before you book</p>
            <h2>A few useful answers.</h2>
          </div>
          <Link className="lw-text-link" href="/faq">
            All questions & answers <ArrowIcon />
          </Link>
        </div>
        <Accordion items={guide.faqs} />
      </section>
      <section className="treatment-local section-space" data-reveal>
        <div>
          <SectionLabel number="03">Melbourne west</SectionLabel>
          <h2>
            Private care in
            <br />
            <em>Altona.</em>
          </h2>
        </div>
        <div>
          <p className="lead">
            A women-only clinic serving Altona, Williamstown, Newport, Altona
            North, Yarraville, Point Cook and surrounding western suburbs.
          </p>
          <p>
            Visit us at Level 1/22 Pier Street, Altona VIC 3018. Appointment
            availability varies by treatment; choose a time in booking.
          </p>
          <Link className="text-link" href="/areas-we-serve">
            View areas we serve <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
        </div>
      </section>

      <section className="treatment-reading section-space">
        <div>
          <SectionLabel number="04">Before you book</SectionLabel>
          <h2>
            Read with
            <br />
            <em>clarity.</em>
          </h2>
        </div>
        <div className="treatment-reading-list">
          {related.slice(0, 2).map(
            (article) =>
              article && (
                <article key={article.slug}>
                  <p>{article.category}</p>
                  <h3>
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <Link className="text-link" href={`/journal/${article.slug}`}>
                    Read guide <span aria-hidden="true"><ArrowIcon /></span>
                  </Link>
                </article>
              ),
          )}
        </div>
      </section>
      <BookingCTA compact />
    </main>
  );
}
