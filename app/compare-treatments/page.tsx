import Link from "next/link";
import { ArrowIcon } from "../_components/ArrowIcon";
import { CareMark } from "../_components/CareMark";
import { TreatmentComparison } from "../_components/TreatmentComparison";
import { comparisonGroups } from "../_data/comparisons";
import { pageMetadata } from "../_data/metadata";

export const metadata = pageMetadata({
  title: "Compare Lymphatic Massage, Facial & EMS Appointments",
  description:
    "Compare appointment lengths, prices and named inclusions for lymphatic massage, facial care and EMS at Lymph & Wellness in Altona. Book your exact option.",
  path: "/compare-treatments",
});

export default function CompareTreatments() {
  return (
    <main id="main">
      <section className="lw-editorial-hero">
        <div>
          <p className="lw-overline">A little clarity, before you book</p>
          <h1>
            The right visit.
            <br />
            <span>For your time.</span>
          </h1>
          <p>
            See the differences side by side. Appointment lengths, prices and
            named inclusions, with a direct path to the option you choose.
          </p>
          <Link className="lw-text-link" href="/#treatment-finder">
            Start with the treatment finder <ArrowIcon />
          </Link>
        </div>
        <div className="lw-editorial-art">
          <CareMark variant="flow" />
          <span>Lymphatic care / Facial care / EMS</span>
        </div>
      </section>
      <nav className="lw-guide-nav" aria-label="Treatment comparisons">
        {comparisonGroups.map((group, i) => (
          <a href={`#compare-${group.id}`} key={group.id}>
            <span>0{i + 1}</span>
            {group.label}
            <ArrowIcon direction="down" />
          </a>
        ))}
      </nav>
      <div className="lw-section lw-comparisons-page">
        {comparisonGroups.map((group) => (
          <TreatmentComparison key={group.id} group={group} />
        ))}
      </div>
      <section className="lw-next-visit lw-section">
        <div>
          <p className="lw-overline">A different kind of care</p>
          <h2>
            Planning a visit
            <br />
            after surgery?
          </h2>
          <p>
            Start with a conversation. Our post-operative appointments follow a
            separate guidance and booking pathway.
          </p>
        </div>
        <Link className="lw-button" href="/post-op">
          Explore post-operative care <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
