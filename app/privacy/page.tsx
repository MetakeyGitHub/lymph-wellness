import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() { return <main id="main"><PageHero eyebrow="Legal" title={<>Privacy<br /><em>policy.</em></>} intro="A launch-ready structure for the clinic’s approved privacy policy." /><article className="legal-page section-space"><p className="eyebrow">Content required before launch</p><h2>Approved policy to be inserted.</h2><p>This page is intentionally not populated with invented legal terms. Add the business’s approved privacy policy, including how enquiries, booking data and health-related information are collected, stored and used.</p></article></main>; }

