import Link from "next/link";
import { ArrowIcon } from "../_components/ArrowIcon";
import { CareMark } from "../_components/CareMark";
import { Accordion } from "../_components/Accordion";
import { pageMetadata } from "../_data/metadata";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_DISPLAY,
  PHONE_URL,
  MAPS_URL,
  openingHours,
} from "../_data/site";

export const metadata = pageMetadata({
  title: "Your First Visit to Our Altona Wellness Clinic",
  description:
    "Plan your first Lymph & Wellness visit: choosing an appointment, preparation, directions to Pier Street, comfort during your treatment and what happens next.",
  path: "/your-first-visit",
});

const stages = [
  {
    id: "before",
    label: "Before you arrive",
    title: "A little preparation. A clearer start.",
    intro:
      "Choose your appointment, then check the confirmation from our booking portal. It is the place to find your selected treatment, date, time and any instructions for your visit.",
    details: [
      [
        "Choose with confidence",
        "Use the treatment finder to explore the menu, or compare appointment lengths and prices. If you are unsure which option to reserve, speak with the team before booking.",
      ],
      [
        "Clothing & preparation",
        "Wear something comfortable and review the instructions for your selected treatment. For machine sessions, ask about suitable clothing, footwear and changing arrangements.",
      ],
      [
        "Something we should know?",
        "Let the clinic know if you have relevant medical advice or a recent procedure that may affect your appointment. For post-operative care, speak with the team before selecting a service. You do not need to put detailed health information in a general website enquiry.",
      ],
    ],
  },
  {
    id: "arrival",
    label: "Finding us",
    title: "Your pause, on Pier Street.",
    intro:
      "All appointments take place at our Altona clinic: Level 1/22 Pier Street, Altona VIC 3018. Allow enough time for your journey and use the appointment time in your confirmation.",
    details: [
      [
        "Plan the journey",
        "Open the directions below to locate the clinic. If you need help finding the entrance, call the team.",
      ],
      [
        "Access & parking questions",
        "Contact us before your visit to confirm the access or parking arrangements you need. We can help you plan around your individual requirements.",
      ],
      [
        "If your plans change",
        "Check the rescheduling and cancellation information in your booking confirmation. Contact the clinic if you need help or are running late.",
      ],
    ],
  },
  {
    id: "conversation",
    label: "Your conversation",
    title: "Start with what matters to you.",
    intro:
      "Your appointment is an opportunity to ask questions about the treatment you have chosen. Share what you would like to discuss and anything that may affect your comfort.",
    details: [
      [
        "Understand the appointment",
        "Ask what is included, how the session is arranged and what preparation is needed. Listed appointment lengths may include preparation time.",
      ],
      [
        "Get to know your practitioner",
        "Ask the team who will provide your treatment and about the training relevant to your appointment. Practitioner availability is confirmed through the clinic and booking portal.",
      ],
    ],
  },
  {
    id: "treatment",
    label: "Your treatment",
    title: "Comfort belongs in the conversation.",
    intro:
      "Our women-only clinic brings hands-on treatments and wellness equipment into one calm space. The experience will depend on the appointment you select.",
    details: [
      [
        "Privacy & changing",
        "You can ask about changing, draping and privacy arrangements before your appointment. Let your practitioner know what would help you feel comfortable.",
      ],
      [
        "Keep the conversation open",
        "Tell the practitioner if you feel uncomfortable or would like to pause. For equipment sessions, follow the clinic’s instructions and ask for help with the setup.",
      ],
    ],
  },
  {
    id: "afterwards",
    label: "After your visit",
    title: "Leave with your next step clear.",
    intro:
      "Before you leave, ask about any instructions for your selected treatment and anything you would like clarified. Follow the guidance given for your individual appointment.",
    details: [
      [
        "If you would like to return",
        "You can book another individual visit, explore a session pack or compare memberships. Ask which options fit the services you use and the routine you have in mind.",
      ],
      [
        "A purchase and a booking are different",
        "Buying a pack or membership does not itself reserve an appointment. Check the included services, validity and purchase terms, then book the visits separately.",
      ],
    ],
  },
] as const;

export default function FirstVisit() {
  return (
    <main id="main">
      <section className="lw-editorial-hero">
        <div>
          <p className="lw-overline">Your first visit · Altona</p>
          <h1>
            Feel at ease.
            <br />
            <span>Before you arrive.</span>
          </h1>
          <p>
            From choosing your appointment to finding the door, here is a little
            guidance for your first time at Lymph & Wellness.
          </p>
          <a className="lw-button" href="#before">
            Walk through your visit <ArrowIcon direction="down" />
          </a>
        </div>
        <div className="lw-editorial-art">
          <CareMark />
          <span>A place for you, on Pier Street.</span>
        </div>
      </section>
      <nav className="lw-guide-nav" aria-label="First visit stages">
        {stages.map((stage, i) => (
          <a href={`#${stage.id}`} key={stage.id}>
            <span>0{i + 1}</span>
            {stage.label}
            <ArrowIcon direction="down" />
          </a>
        ))}
      </nav>
      <div className="lw-section lw-visit-guide">
        {stages.map((stage, i) => (
          <section
            id={stage.id}
            className="lw-visit-stage"
            key={stage.id}
            aria-labelledby={`${stage.id}-title`}
          >
            <div className="lw-stage-title">
              <span className="lw-editorial-number">0{i + 1}</span>
              <p className="lw-overline">{stage.label}</p>
              <h2 id={`${stage.id}-title`}>{stage.title}</h2>
              <p>{stage.intro}</p>
              {stage.id === "before" && (
                <Link className="lw-text-link" href="/compare-treatments">
                  Compare appointments <ArrowIcon />
                </Link>
              )}
              {stage.id === "arrival" && (
                <a className="lw-text-link" href={MAPS_URL}>
                  Get directions <ArrowIcon />
                </a>
              )}
              {stage.id === "afterwards" && (
                <Link className="lw-text-link" href="/packages">
                  Explore experiences & packs <ArrowIcon />
                </Link>
              )}
            </div>
            <div className="lw-stage-details">
              {stage.details.map(([title, copy]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section
        className="lw-arrival-card lw-section"
        aria-label="Clinic address and hours"
      >
        <div>
          <p className="lw-overline">Keep these details close</p>
          <h2>
            We look forward
            <br />
            to seeing you.
          </h2>
          <address>
            {ADDRESS_LINE_1}
            <br />
            {ADDRESS_LINE_2}
          </address>
          <div className="lw-actions">
            <a className="lw-button" href={MAPS_URL}>
              Get directions <ArrowIcon />
            </a>
            <a className="lw-text-link" href={PHONE_URL}>
              {PHONE_DISPLAY} <ArrowIcon />
            </a>
          </div>
        </div>
        <div>
          <h3>Clinic hours</h3>
          <dl>
            {openingHours.map(([day, hours]) => (
              <div key={day}>
                <dt>{day}</dt>
                <dd>{hours}</dd>
              </div>
            ))}
          </dl>
          <p className="lw-small">
            Appointment availability varies by treatment. Check the booking
            portal for available times.
          </p>
        </div>
      </section>
      <section className="lw-section">
        <div className="lw-section-heading">
          <div>
            <p className="lw-overline">A few practical answers</p>
            <h2>Before you set out.</h2>
          </div>
          <Link className="lw-text-link" href="/faq">
            All questions & answers <ArrowIcon />
          </Link>
        </div>
        <Accordion
          items={[
            {
              q: "How do I know my appointment is confirmed?",
              a: "Look for confirmation from the booking portal after completing the required steps. Clicking a website booking link, purchasing a pack or preparing an email enquiry does not by itself reserve a time.",
            },
            {
              q: "Do I need to arrive a particular number of minutes early?",
              a: "Follow any arrival instructions in your confirmation. If no arrival guidance is provided and you are unsure, contact the clinic rather than assuming a particular early-arrival requirement.",
            },
            {
              q: "Can I ask about accessibility before booking?",
              a: "Yes. Call the team to discuss the entrance, changing arrangements or other access requirements you would like confirmed before your visit.",
            },
            {
              q: "What if I still need help choosing?",
              a: "Contact the clinic before reserving a time. Tell us which treatment you are considering and the practical questions you have. The team can clarify the options with you.",
            },
          ]}
        />
      </section>
      <section className="lw-next-visit lw-section">
        <div>
          <p className="lw-overline">Whenever you are ready</p>
          <h2>
            Find a little time
            <br />
            for yourself.
          </h2>
        </div>
        <Link className="lw-button" href="/services">
          Browse treatments & prices <ArrowIcon />
        </Link>
      </section>
    </main>
  );
}
