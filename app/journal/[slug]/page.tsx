import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "../../_components/JsonLd";
import { articles, getArticle } from "../../_data/articles";
import { SITE_URL } from "../../_data/seo";
import { pageMetadata } from "../../_data/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    path: `/journal/${article.slug}`,
    image: "/images/social-journal.jpg",
    imageAlt: `${article.title}, written by Seda Yener for Lymph & Wellness`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.modified,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const related = [articles[(currentIndex + 1) % articles.length], articles[(currentIndex + 3) % articles.length]];
  const canonical = `${SITE_URL}/journal/${article.slug}`;
  const treatmentPath = article.slug.includes("facial-")
    ? { href: "/treatments/facial-sculpting-melbourne", label: "Explore facial treatments" }
    : article.slug.includes("post-operative")
      ? { href: "/post-op", label: "Explore post-operative care" }
      : { href: "/treatments/lymphatic-drainage-melbourne", label: "Explore lymphatic drainage" };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      image: `${SITE_URL}${article.image}`,
      datePublished: article.published,
      dateModified: article.modified,
      mainEntityOfPage: canonical,
      author: { "@type": "Person", name: "Seda Yener", url: `${SITE_URL}/about#seda-yener` },
      publisher: { "@type": "Organization", name: "Lymph & Wellness", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/mark.webp` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
        { "@type": "ListItem", position: 3, name: article.title, item: canonical },
      ],
    },
  ];

  return (
    <main id="main">
      <JsonLd data={jsonLd} />
      <article className="article-page">
        <header className="article-hero">
          <div className="article-hero-copy">
            <nav className="article-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/journal">Journal</Link><span>/</span><span>{article.category}</span></nav>
            <p className="eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="lead">{article.excerpt}</p>
            <div className="article-meta"><span>By <Link href="/about#seda-yener">Seda Yener</Link></span><span>Published {new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${article.published}T00:00:00+10:00`))}</span><span>{article.readingTime}</span><span>General wellness information</span></div>
          </div>
          <div className="article-hero-image"><Image src={article.image} alt={article.imageAlt} fill loading="eager" fetchPriority="high" sizes="(max-width: 780px) 100vw, 48vw" /></div>
        </header>

        <div className="article-layout section-space">
          <aside className="article-aside">
            <p className="eyebrow">In this guide</p>
            <ol>{article.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}><span>0{index + 1}</span>{section.heading}</a></li>)}</ol>
            <div className="article-safety"><strong>Important</strong><p>New, unexplained or concerning symptoms need medical assessment. Wellness treatment does not replace medical care.</p></div>
          </aside>
          <div className="article-body">
            {article.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <p className="eyebrow">0{index + 1}</p>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </section>
            ))}

            <aside className="article-next-step">
              <p className="eyebrow">Considering treatment?</p><h2>Choose with<br /><em>clarity.</em></h2><p>Review the treatment pathway, suitability guidance and appointment details before booking.</p><div><Link className="text-link" href={treatmentPath.href}>{treatmentPath.label} <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/contact">Contact the clinic <span aria-hidden="true">↗</span></Link></div>
            </aside>

            <section className="article-faq" aria-labelledby="article-faq-heading">
              <p className="eyebrow">Common questions</p><h2 id="article-faq-heading">Questions, answered.</h2>
              {article.faqs.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
            </section>

            <section className="article-sources" aria-labelledby="article-sources-heading">
              <p className="eyebrow">Sources and further reading</p><h2 id="article-sources-heading">Trusted health guidance.</h2>
              <p>Sources are provided for general education. They do not establish individual treatment suitability.</p>
              <ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul>
            </section>
          </div>
        </div>
      </article>

      <section className="related-articles section-space">
        <p className="eyebrow">Continue reading</p><h2>More considered<br /><em>guidance.</em></h2>
        <div>{related.map((item) => <article key={item.slug}><p>{item.category}</p><h3><Link href={`/journal/${item.slug}`}>{item.title}</Link></h3><Link className="text-link" href={`/journal/${item.slug}`}>Read article <span aria-hidden="true">↗</span></Link></article>)}</div>
      </section>
    </main>
  );
}
