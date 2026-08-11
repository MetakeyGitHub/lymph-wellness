import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingCTA } from "../_components/BookingCTA";
import { PageHero } from "../_components/PageHero";
import { SectionLabel } from "../_components/SectionLabel";
import { articles } from "../_data/articles";
import { SITE_URL } from "../_data/seo";

export const metadata: Metadata = {
  title: "Lymphatic Wellness Journal",
  description: "Clear, evidence-aware guides to lymphatic drainage massage, post-operative care, facial treatments and choosing treatment in Melbourne.",
  alternates: { canonical: `${SITE_URL}/journal` },
  openGraph: {
    title: "Lymphatic Wellness Journal | Lymph & Wellness",
    description: "Practical lymphatic care guides written with realistic expectations and careful medical language.",
    url: `${SITE_URL}/journal`,
    images: ["/og.png"],
  },
};

export default function JournalPage() {
  return (
    <main id="main" className="journal-page">
      <PageHero
        eyebrow="Journal / Guidance / Melbourne"
        title={<>Lymphatic care,<br /><em>clearly explained.</em></>}
        intro="Practical guidance for choosing, preparing for and understanding lymphatic wellness treatments without exaggerated promises."
        image="/images/flow-editorial.webp"
        imageAlt="Layered ivory fabric suggesting gentle lymphatic flow"
      />
      <section className="journal-intro section-space" data-reveal>
        <div><SectionLabel number="01">The journal</SectionLabel><h2>Useful before<br /><em>you book.</em></h2></div>
        <div><p className="lead">Clear guidance, grounded in care.</p><p>Explore practical information about lymphatic treatments, preparation and recovery. These articles offer general wellness education and do not replace advice from your GP, surgeon or treating practitioner.</p></div>
      </section>
      <section className="journal-grid section-space" aria-label="Lymphatic wellness articles">
        {articles.map((article, index) => (
          <article className={index === 0 || index === 5 ? "journal-card journal-card-featured" : "journal-card"} key={article.slug} data-reveal>
            <Link className="journal-card-image" href={`/journal/${article.slug}`} aria-label={`Read ${article.title}`}>
              <Image src={article.image} alt={article.imageAlt} fill sizes={index === 0 || index === 5 ? "(max-width: 780px) 100vw, 62vw" : "(max-width: 780px) 100vw, 31vw"} />
            </Link>
            <div className="journal-card-copy">
              <p className="eyebrow">{String(index + 1).padStart(2, "0")} / {article.category}</p>
              <h2><Link href={`/journal/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.excerpt}</p>
              <div><span>{article.readingTime}</span><Link className="text-link" href={`/journal/${article.slug}`}>Read guide <span aria-hidden="true">↗</span></Link></div>
            </div>
          </article>
        ))}
      </section>
      <BookingCTA compact />
    </main>
  );
}
