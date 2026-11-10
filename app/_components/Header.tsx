"use client";
import { ArrowIcon } from "./ArrowIcon";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../_data/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="lw-header">
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
        {navigation.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>
      <Link href="/services" className="lw-book">
        Book a visit <span aria-hidden="true"><ArrowIcon /></span>
      </Link>
      <button
        ref={toggle}
        className="lw-menu-toggle"
        aria-expanded={open}
        aria-controls="lw-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="lw-menu"
        className="lw-mobile-nav"
        aria-label="Mobile"
        hidden={!open}
      >
        {navigation.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
            <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)}>
          Visit & contact <ArrowIcon />
        </Link>
        <Link href="/services" onClick={() => setOpen(false)}>
          Book a visit <ArrowIcon />
        </Link>
      </nav>
    </header>
  );
}
