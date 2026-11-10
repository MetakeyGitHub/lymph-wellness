"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  classifyLink,
  safePageSection,
  SAFE_PAGE_CONTEXT,
} from "../_lib/analytics-events";
const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
// Enable only after the clinic's web stream and disabled automatic measurement have been verified.
const configured =
  process.env.NEXT_PUBLIC_GA_ENABLED === "true" &&
  /^G-[A-Z0-9]+$/.test(measurementId);
const consentKey = "lw-analytics-consent-v1";
type Consent = "granted" | "denied" | "unknown";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
let fallbackConsent: Consent = "unknown";
function readConsent(): Consent {
  try {
    const value = localStorage.getItem(consentKey);
    return value === "granted" || value === "denied" ? value : fallbackConsent;
  } catch {
    return fallbackConsent;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("lw:consent", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("lw:consent", callback);
  };
}
function saveConsent(value: Consent) {
  try {
    localStorage.setItem(consentKey, value);
    fallbackConsent = "unknown";
  } catch {
    fallbackConsent = value;
    /* Consent still applies for this page if browser storage is unavailable. */
  }
  window.dispatchEvent(new Event("lw:consent"));
}
function disableAnalytics() {
  (window as unknown as Record<string, unknown>)[
    `ga-disable-${measurementId}`
  ] = true;
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of ["", location.hostname, ".lymphandwellness.com.au"])
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
  }
}
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="lw-cookie-settings"
      onClick={() => window.dispatchEvent(new Event("lw:privacy-settings"))}
    >
      Cookie settings
    </button>
  );
}
export function GoogleAnalytics() {
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    () => "unknown" as Consent,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const productionHost =
    typeof window !== "undefined" &&
    ["www.lymphandwellness.com.au", "lymphandwellness.com.au"].includes(
      location.hostname,
    );
  const active = configured && productionHost && consent === "granted";
  const showPanel = settingsOpen || (configured && consent === "unknown");
  useEffect(() => {
    const open = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setSettingsOpen(true);
    };
    window.addEventListener("lw:privacy-settings", open);
    return () => window.removeEventListener("lw:privacy-settings", open);
  }, []);
  useEffect(() => {
    if (settingsOpen) panel.current?.focus();
  }, [settingsOpen]);
  useEffect(() => {
    if (!active) {
      if (initialized.current) disableAnalytics();
      lastPage.current = null;
      return;
    }
    (window as unknown as Record<string, unknown>)[
      `ga-disable-${measurementId}`
    ] = false;
    window.dataLayer = window.dataLayer || [];
    // gtag requires an Arguments object in the dataLayer command queue.
    window.gtag =
      window.gtag ||
      function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
    if (!initialized.current) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag("set", {
        ...SAFE_PAGE_CONTEXT,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        ...SAFE_PAGE_CONTEXT,
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_flags: "SameSite=Lax;Secure",
        cookie_domain: "none",
      });
      initialized.current = true;
    }
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }, [active]);
  useEffect(() => {
    if (!active || !scriptReady || lastPage.current === pathname) return;
    window.gtag?.("event", "page_view", {
      ...SAFE_PAGE_CONTEXT,
      page_section: safePageSection(pathname),
      send_to: measurementId,
    });
    lastPage.current = pathname;
  }, [active, scriptReady, pathname]);
  useEffect(() => {
    if (!active) return;
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const classified = classifyLink(link.href);
      if (!classified) return;
      const placement = link.closest("header")
        ? "header"
        : link.closest("footer")
          ? "footer"
          : "content";
      window.gtag?.("event", classified.name, {
        ...SAFE_PAGE_CONTEXT,
        ...classified.parameters,
        link_placement: placement,
        send_to: measurementId,
      });
    };
    const prepared = () =>
      window.gtag?.("event", "enquiry_draft_prepared", {
        ...SAFE_PAGE_CONTEXT,
        send_to: measurementId,
      });
    document.addEventListener("click", click, true);
    document.addEventListener("lw:enquiry-prepared", prepared);
    return () => {
      document.removeEventListener("click", click, true);
      document.removeEventListener("lw:enquiry-prepared", prepared);
    };
  }, [active]);
  function choose(value: Consent) {
    if (value === "denied") disableAnalytics();
    saveConsent(value);
    setSettingsOpen(false);
    returnFocus.current?.focus();
  }
  return (
    <>
      {active && (
        <Script
          id="lw-ga4"
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="afterInteractive"
          referrerPolicy="origin"
          onReady={() => setScriptReady(true)}
        />
      )}
      {showPanel && (
        <div
          className="lw-cookie-panel"
          ref={panel}
          tabIndex={-1}
          role="region"
          aria-label="Analytics cookie preferences"
        >
          <div>
            <p className="lw-overline">Your privacy, your choice</p>
            <h2>
              {configured
                ? "Help us improve your visit."
                : "Your cookie settings."}
            </h2>
            <p>
              {configured
                ? "With your permission, Google Analytics helps us count visits and booking-link clicks. We do not send treatment choices, search terms or enquiry details. Optional analytics is off until you choose to allow it."
                : "Optional analytics is currently switched off. This website does not load Google Analytics or advertising tags."}{" "}
              <Link href="/privacy">Read our privacy information.</Link>
            </p>
          </div>
          <div className="lw-cookie-actions">
            {configured ? (
              <>
                <button onClick={() => choose("denied")}>
                  Keep analytics off
                </button>
                <button onClick={() => choose("granted")}>
                  Allow analytics
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setSettingsOpen(false);
                  returnFocus.current?.focus();
                }}
              >
                Close settings
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
