import Image from "next/image";
import { ArrowIcon } from "./ArrowIcon";
import { INSTAGRAM_URL } from "../_data/site";

const moments = [
  {
    image: "body-roller-session",
    alt: "Women using body rollers in the clinic’s curtained wellness spaces",
    label: "A little movement.",
  },
  {
    image: "clinic-gathering",
    alt: "Guests sharing a table and conversation at a clinic gathering",
    label: "A little connection.",
  },
  {
    image: "quiet-moment",
    alt: "A visitor reading in the lounge during a facial light session",
    label: "A moment of your own.",
  },
];

export function ClinicGallery() {
  return (
    <section className="lw-section lw-clinic-gallery" aria-labelledby="clinic-moments-title">
      <div className="lw-section-heading">
        <div>
          <p className="lw-overline">Life inside the clinic</p>
          <h2 id="clinic-moments-title">Room for rest.<br /><span>And connection.</span></h2>
        </div>
        <p>Quiet sessions, shared conversations and occasional gatherings. A few moments from life at Lymph & Wellness.</p>
      </div>
      <div className="lw-moments-grid">
        {moments.map((moment) => (
          <figure key={moment.image}>
            <div className="lw-moment-image">
              <Image src={`/images/clinic/${moment.image}.webp`} alt={moment.alt} fill sizes="(max-width:760px) 86vw, 30vw" />
            </div>
            <figcaption>{moment.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="lw-care-footer">
        <p>Follow along for clinic news and upcoming gatherings.</p>
        <a className="lw-text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Life on Instagram <ArrowIcon /></a>
      </div>
    </section>
  );
}
