import type { Metadata } from "next";
import { Accordion } from "../_components/Accordion";
import { BookingCTA } from "../_components/BookingCTA";
import { PageHero } from "../_components/PageHero";
import { faqs } from "../_data/site";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about lymphatic drainage, post-operative treatment, facial cupping, EMS body sculpting and preparing for your appointment." };

export default function FaqPage() {
  return <main id="main"><PageHero eyebrow="Before you book" title={<>Questions,<br /><em>considered.</em></>} intro="Practical guidance about treatments, preparation and suitability. If your question is medical or specific to a procedure, speak with your treating practitioner." image="/images/architectural-curve.jpg" imageAlt="Calm architectural curves" /><section className="faq-page-section section-space"><div className="faq-page-intro"><p className="eyebrow">Good to know</p><h2>Everything you need<br /><em>before treatment.</em></h2><p>These answers are general in nature and do not replace personalised medical advice.</p></div><Accordion items={faqs} /></section><BookingCTA compact /></main>;
}

