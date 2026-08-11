"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOKING_URL, navigation } from "../_data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}>
      <Link className="brand-link" href="/" aria-label="Lymph and Wellness home" onClick={() => setOpen(false)}>
        <Image src="/images/mark.webp" alt="" width={72} height={72} priority />
        <span>LYMPH &amp;<br />WELLNESS</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="header-book" href={BOOKING_URL}>Book a treatment</Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!open} inert={!open}>
        <div className="mobile-menu-inner">
          <p className="eyebrow">Melbourne, Australia</p>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}><span>{String(navigation.length + 1).padStart(2, "0")}</span>Contact</Link>
          </nav>
          <Link className="mobile-menu-book" href={BOOKING_URL} onClick={() => setOpen(false)}>Book a treatment <span aria-hidden="true">↗</span></Link>
          <div className="mobile-menu-meta"><span>@LYMPH.WELLNESSCO</span><span>TRUGANINA, VIC</span></div>
        </div>
      </div>
    </header>
  );
}
