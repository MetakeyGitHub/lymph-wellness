import { ArrowIcon } from "./ArrowIcon";
import Image from "next/image";
import { SectionLabel } from "./SectionLabel";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  action,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image?: string;
  imageAlt?: string;
  action?: { href: string; label: string };
  dark?: boolean;
}) {
  return (
    <section className={`page-hero ${dark ? "dark" : ""}`}>
      <div className="page-hero-copy">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1>{title}</h1>
        <p>{intro}</p>
        {action && (
          <a className="lw-text-link" href={action.href}>
            {action.label} <ArrowIcon direction="down" />
          </a>
        )}
      </div>
      {image && (
        <div className="page-hero-image">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 780px) 100vw, 48vw"
          />
        </div>
      )}
    </section>
  );
}
