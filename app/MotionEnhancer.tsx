"use client";

import { useEffect } from "react";

export default function MotionEnhancer() {
  useEffect(() => {
    const root = document.documentElement;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", `${Math.min(progress, 1)}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="page-grain" aria-hidden="true" />
    </>
  );
}
