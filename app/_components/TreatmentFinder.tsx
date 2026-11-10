"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { offerings, formatPrice } from "../_data/offerings";
import {
  finderNotes,
  findTreatments,
  timeOptions,
  visitGoals,
  type TimeBudget,
  type VisitGoal,
} from "../_data/treatment-finder";

function RitualMark({ symbol }: { symbol: string }) {
  const paths: Record<string, string> = {
    sun: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    wave: "M3 8c3-6 6 6 9 0s6 6 9 0M3 15c3-6 6 6 9 0s6 6 9 0",
    arc: "M4 19V12a8 8 0 0 1 16 0v7M8 19v-7a4 4 0 0 1 8 0v7M12 19v-7",
    leaf: "M5 20C3 10 7 3 20 4c0 12-5 16-15 16Zm0 0 11-11",
    heart: "M12 20 4 12C-2 5 8 1 12 7c4-6 14-2 8 5Z",
  };
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[symbol]} />
    </svg>
  );
}

export function TreatmentFinder() {
  const [goal, setGoal] = useState<VisitGoal | null>(null);
  const [time, setTime] = useState<TimeBudget | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const isPostop = goal === "postop";
  const step = !goal
    ? "goal"
    : isPostop
      ? "guidance"
      : !time
        ? "time"
        : "result";
  const selectedGoal = visitGoals.find((option) => option.id === goal);
  const matches = goal && time ? findTreatments(offerings, goal, time) : [];
  const [primary, ...alternatives] = matches;
  useEffect(() => {
    if (interacted.current && heading.current) {
      heading.current.focus({ preventScroll: true });
      const top = heading.current.getBoundingClientRect().top;
      // A choice near the bottom of a phone screen must not leave the next question off-screen.
      if (top < 110 || top > window.innerHeight - 160) {
        heading.current.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }
  }, [step]);
  function startAgain() {
    setGoal(null);
    setTime(null);
    setShowAlternatives(false);
  }
  const title =
    step === "goal"
      ? "What would you like to make time for?"
      : step === "time"
        ? "How much time is yours today?"
        : isPostop
          ? "Care that starts with a conversation."
          : primary
            ? "Your moment, made simple."
            : "Let’s give this a little more time.";
  return (
    <section
      data-suppress-sticky="true"
      id="treatment-finder"
      className="lw-finder"
      aria-label="Treatment finder"
    >
      <div className="lw-finder-aside">
        <Image
          src="/images/clinic/recovery-lounge.jpg"
          alt="A quiet corner of our Altona clinic"
          fill
          sizes="(max-width:760px) 100vw, 35vw"
        />
        <div className="lw-finder-aside-copy">
          <p className="lw-overline">Your treatment finder</p>
          <h2>
            A little guidance.
            <br />
            <span>A moment for you.</span>
          </h2>
          <p>
            Two simple choices.
            <br />A thoughtful place to begin.
          </p>
        </div>
        <span className="lw-finder-caption">
          Considered care, at your pace.
        </span>
      </div>
      <div className="lw-finder-panel">
        <ol className="lw-finder-progress" aria-label="Finder progress">
          <li aria-current={step === "goal" ? "step" : undefined}>
            <span>01</span> Your visit
          </li>
          <li aria-current={step === "time" ? "step" : undefined}>
            <span>02</span> Your time
          </li>
          <li aria-current={step === "result" || isPostop ? "step" : undefined}>
            <span>03</span> {isPostop ? "Your care" : "Your moment"}
          </li>
        </ol>
        <div key={step} className="lw-finder-stage">
          <h3 ref={heading} tabIndex={-1}>
            {title}
          </h3>
          {step === "goal" && (
            <>
              <p className="lw-finder-hint">
                Start with what you’re drawn to. We’ll help you explore.
              </p>
              <div className="lw-finder-choices">
                {visitGoals.map((option) => (
                  <button
                    key={option.id}
                    className="lw-finder-choice"
                    onClick={() => {
                      interacted.current = true;
                      setGoal(option.id);
                    }}
                  >
                    <RitualMark symbol={option.symbol} />
                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.detail}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === "time" && (
            <>
              <p className="lw-finder-hint">
                {selectedGoal?.label}. Choose the appointment length that fits.
              </p>
              <div className="lw-finder-choices time-choices">
                {timeOptions.map((option, index) => (
                  <button
                    className="lw-finder-choice"
                    key={option.minutes}
                    onClick={() => setTime(option.minutes)}
                  >
                    <span className="lw-time-mark" aria-hidden="true">
                      {["◔", "◑", "○"][index]}
                    </span>
                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.detail}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {isPostop && (
            <div className="lw-finder-guidance">
              <p>
                Your stage of recovery and your treating team’s advice come
                first. Speak with our clinic before choosing a post-operative
                appointment so we can discuss timing and suitability with you.
              </p>
              <div className="lw-actions">
                <Link href="/contact" className="lw-button">
                  Talk to our team ↗
                </Link>
                <Link href="/post-op" className="lw-text-link">
                  Explore post-operative care ↗
                </Link>
              </div>
            </div>
          )}
          {step === "result" &&
            (primary ? (
              <>
                <p className="lw-finder-hint">
                  {selectedGoal?.label} · Up to {time} minutes
                </p>
                <article className="lw-finder-result">
                  <p className="lw-overline">A place to begin</p>
                  <h4>{primary.name}</h4>
                  <p>{finderNotes[primary.code]}</p>
                  <div className="lw-finder-summary">
                    <span>{primary.minutes} min appointment</span>
                    <strong>
                      {formatPrice(primary.price)} <small>AUD</small>
                    </strong>
                  </div>
                  <a
                    className="lw-button"
                    href={primary.url}
                    data-booking-cta="true"
                  >
                    Choose a time <span aria-hidden="true">↗</span>
                    <span className="sr-only"> for {primary.name}</span>
                  </a>
                  <p className="lw-finder-booking-note">
                    Your treatment is selected. Choose your time and finish
                    booking in our secure portal.
                  </p>
                </article>
                {alternatives.length > 0 && (
                  <>
                    <button
                      className="lw-text-link lw-finder-more"
                      aria-expanded={showAlternatives}
                      aria-controls="finder-alternatives"
                      onClick={() => setShowAlternatives(!showAlternatives)}
                    >
                      {showAlternatives ? "Hide" : "Explore"}{" "}
                      {alternatives.length === 1
                        ? "another option"
                        : "two other options"}{" "}
                      <span aria-hidden="true">
                        {showAlternatives ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      id="finder-alternatives"
                      hidden={!showAlternatives}
                      className="lw-finder-alternatives"
                    >
                      {alternatives.map((offer) => (
                        <a
                          key={offer.code}
                          href={offer.url}
                          data-booking-cta="true"
                        >
                          <span>
                            {offer.name}
                            <small>
                              {offer.minutes} min · {formatPrice(offer.price)}
                            </small>
                          </span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="lw-finder-guidance">
                <p>
                  Our hands-on lymphatic body appointments start at 60 minutes.
                  We haven’t found an option for this visit within your {time}
                  -minute window.
                </p>
                <button className="lw-button" onClick={() => setTime(null)}>
                  Choose more time ↗
                </button>
                <Link href="/services#service-prices" className="lw-text-link">
                  Explore the full menu ↗
                </Link>
              </div>
            ))}
        </div>
        <div className="lw-finder-footer">
          {step !== "goal" && (
            <button
              className="lw-text-link"
              onClick={() => {
                if (step === "result") {
                  setTime(null);
                  setShowAlternatives(false);
                } else startAgain();
              }}
            >
              ← Back
            </button>
          )}
          {step !== "goal" && (
            <button className="lw-text-link" onClick={startAgain}>
              Start again
            </button>
          )}
          <Link className="lw-text-link" href="/services#service-prices">
            Browse all treatments ↗
          </Link>
        </div>
        <p className="lw-finder-disclaimer">
          A guide to exploring our menu. Your practitioner will confirm
          suitability.
        </p>
      </div>
    </section>
  );
}
