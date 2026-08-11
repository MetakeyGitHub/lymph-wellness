"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  readonly name: string;
  readonly treatment: string;
  readonly quote: string;
};

export function TestimonialCarousel({ testimonials }: { testimonials: readonly Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion || testimonials.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion, testimonials.length]);

  const activeTestimonial = testimonials[activeIndex];
  const showPrevious = () => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % testimonials.length);

  return (
    <div
      className="testimonial-carousel"
      aria-label="Verified Google review excerpts"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <article className="testimonial-card" key={activeIndex}>
        <span aria-hidden="true">“</span>
        <blockquote>{activeTestimonial.quote}</blockquote>
        <p><strong>{activeTestimonial.name}</strong>{activeTestimonial.treatment}</p>
      </article>
      <div className="testimonial-controls">
        <p>Review {activeIndex + 1} of {testimonials.length}</p>
        <div className="testimonial-dots" aria-label="Choose a review">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Show review ${index + 1} from ${testimonial.name}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              key={testimonial.name}
            />
          ))}
        </div>
        <div className="testimonial-arrows">
          <button type="button" onClick={showPrevious} aria-label="Show previous review">←</button>
          <button type="button" onClick={showNext} aria-label="Show next review">→</button>
        </div>
      </div>
    </div>
  );
}
