"use client";
import { ArrowIcon } from "./ArrowIcon";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOKING_URL } from "../_data/site";

export function MobileStickyBook() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visibleInline = new Set<Element>();
    const visibleFooter = new Set<Element>();
    const update = () =>
      setVisible(
        window.scrollY > window.innerHeight * 0.72 &&
          visibleInline.size === 0 &&
          visibleFooter.size === 0,
      );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const set = entry.target.matches("footer")
            ? visibleFooter
            : visibleInline;
          if (entry.isIntersecting) set.add(entry.target);
          else set.delete(entry.target);
        }
        update();
      },
      { threshold: 0 },
    );

    document
      .querySelectorAll("[data-booking-cta], [data-suppress-sticky], footer")
      .forEach((element) => observer.observe(element));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <Link
      className={`mobile-sticky-book ${visible ? "is-visible" : ""}`}
      href={BOOKING_URL}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Choose a treatment <span aria-hidden="true"><ArrowIcon /></span>
    </Link>
  );
}
