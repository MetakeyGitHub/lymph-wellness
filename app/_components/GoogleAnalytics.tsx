"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const GA_MEASUREMENT_ID = "G-CVCY63HT5Q";

type AnalyticsValue = string | number | boolean;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, parameters: Record<string, AnalyticsValue> = {}) {
  window.dataLayer = window.dataLayer || [];
  const payload = ["event", name, parameters];
  if (window.gtag) window.gtag(...payload);
  else window.dataLayer.push(payload);
}

function cleanLabel(element: Element) {
  return (element.getAttribute("aria-label") || element.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

function placement(element: Element) {
  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";
  if (element.closest(".mobile-sticky-book")) return "mobile_sticky";
  if (element.closest(".membership-mobile-list")) return "membership_card";
  if (element.closest(".booking-option-list")) return "booking_list";
  if (element.closest("main")) return "page_content";
  return "other";
}

function AnalyticsEvents() {
  const pathname = usePathname();
  const initialPage = useRef(true);

  useEffect(() => {
    if (initialPage.current) {
      initialPage.current = false;
      return;
    }
    sendEvent("page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [pathname]);

  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();
    const reachedDepths = new Set<number>();

    const common = (element: Element) => ({
      link_text: cleanLabel(element),
      link_placement: placement(element),
      page_path: window.location.pathname,
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const menuButton = target.closest<HTMLButtonElement>(".menu-toggle");
      if (menuButton) {
        sendEvent(menuButton.getAttribute("aria-expanded") === "true" ? "menu_close" : "menu_open", {
          page_path: window.location.pathname,
        });
        return;
      }

      const reviewControl = target.closest<HTMLButtonElement>(".testimonial-controls button");
      if (reviewControl) {
        sendEvent("testimonial_interaction", {
          control: reviewControl.getAttribute("aria-label") || "review_control",
          page_path: window.location.pathname,
        });
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const rawHref = link.getAttribute("href") || "";
      const href = link.href;
      const details = common(link);

      if (href.includes("lymphwell.ap.zenoti.com")) {
        sendEvent("membership_select", { ...details, destination: "zenoti" });
      } else if (href.includes("simplybook.me") || rawHref.includes("/contact#book") || link.closest("[data-booking-cta]")) {
        sendEvent("booking_click", { ...details, destination: href.includes("simplybook.me") ? "simplybook" : "booking_page" });
      } else if (rawHref.startsWith("tel:")) {
        sendEvent("phone_click", details);
      } else if (rawHref.startsWith("mailto:")) {
        sendEvent("email_click", details);
      } else if (href.includes("google.com/maps")) {
        sendEvent("directions_click", details);
      } else if (href.includes("share.google") || link.classList.contains("hero-reviews")) {
        sendEvent("reviews_click", details);
      } else if (href.includes("instagram.com")) {
        sendEvent("instagram_click", details);
      } else if (link.closest("header, footer, nav")) {
        sendEvent("navigation_click", { ...details, link_path: rawHref.slice(0, 100) });
      } else if (link.origin !== window.location.origin) {
        sendEvent("outbound_click", { ...details, link_domain: link.hostname });
      } else {
        sendEvent("internal_link_click", { ...details, link_path: rawHref.slice(0, 100) });
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const form = target?.closest<HTMLFormElement>(".enquiry-form");
      if (!form || startedForms.has(form)) return;
      startedForms.add(form);
      sendEvent("form_start", { form_name: "contact_enquiry", page_path: window.location.pathname });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form?.classList.contains("enquiry-form")) return;
      const interest = form.querySelector<HTMLSelectElement>('select[name="interest"]')?.value || "General enquiry";
      sendEvent("generate_lead", {
        form_name: "contact_enquiry",
        enquiry_type: interest.slice(0, 80),
        page_path: window.location.pathname,
      });
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      for (const threshold of [25, 50, 75, 90]) {
        if (depth >= threshold && !reachedDepths.has(threshold)) {
          reachedDepths.add(threshold);
          sendEvent("scroll_depth", { percent_scrolled: threshold, page_path: window.location.pathname });
        }
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("submit", onSubmit, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
      <AnalyticsEvents />
    </>
  );
}
