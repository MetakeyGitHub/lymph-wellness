"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, SearchIcon } from "./ArrowIcon";
import { OpenStatus } from "./OpenStatus";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_URL,
  navigation,
} from "../_data/site";

const primary = navigation.filter((item) => item.href !== "/search");
const isCurrent = (pathname: string, href: string) =>
  pathname === href ||
  (href === "/services" && pathname.startsWith("/treatments")) ||
  (href === "/about" && pathname === "/contact");

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    document.documentElement.classList.add("lw-menu-open");
    return () => {
      document.removeEventListener("keydown", close);
      document.documentElement.classList.remove("lw-menu-open");
    };
  }, [open]);

  return (
    <header
      className="lw-header"
      data-scrolled={scrolled ? "true" : undefined}
      data-open={open ? "true" : undefined}
    >
      <div className="lw-header-bar">
        <Link
          href="/"
          className="lw-logo"
          aria-label="Lymph & Wellness home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-dark.svg"
            alt=""
            width={251}
            height={67}
            priority
          />
        </Link>
        <nav className="lw-nav" aria-label="Primary">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="lw-header-actions">
          <Link href="/search" className="lw-header-search" aria-label="Search the site">
            <SearchIcon />
          </Link>
          <Link href="/services" className="lw-book">
            Book a visit <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
          <button
            ref={toggle}
            type="button"
            className="lw-menu-toggle"
            aria-expanded={open}
            aria-controls="lw-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
            <span className="lw-menu-mark" aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav
        id="lw-menu"
        className="lw-mobile-nav"
        aria-label="Mobile"
        hidden={!open}
      >
        <div className="lw-mobile-links">
          {primary.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="lw-mobile-more">
          <Link href="/your-first-visit" onClick={() => setOpen(false)}>
            Your first visit
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Visit & contact
          </Link>
          <Link href="/search" onClick={() => setOpen(false)}>
            Search
          </Link>
        </div>
        <div className="lw-mobile-foot">
          <OpenStatus />
          <p>
            <a href={MAPS_URL}>
              {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
            </a>
            <a href={PHONE_URL}>{PHONE_DISPLAY}</a>
          </p>
          <Link
            href="/services"
            className="lw-button"
            onClick={() => setOpen(false)}
          >
            Book a visit <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
