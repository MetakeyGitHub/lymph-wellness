"use client";

import { useEffect } from "react";

export function MotionEnhancer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6%" });
    const observeWithin = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches("[data-reveal]")) observer.observe(root);
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(item => observer.observe(item));
    };
    observeWithin(document);
    const mutations = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node instanceof HTMLElement) observeWithin(node);
    })));
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, []);
  return null;
}
