import Image from "next/image";
import { SectionLabel } from "./SectionLabel";

export function PageHero({ eyebrow, title, intro, image, imageAlt, dark = false }: { eyebrow: string; title: React.ReactNode; intro: string; image?: string; imageAlt?: string; dark?: boolean }) {
  return (
    <section className={`page-hero ${dark ? "dark" : ""}`}>
      <div className="page-hero-copy" data-reveal>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {image && <div className="page-hero-image"><Image src={image} alt={imageAlt ?? ""} fill priority sizes="(max-width: 780px) 100vw, 48vw" /></div>}
    </section>
  );
}

