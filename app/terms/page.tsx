import type { Metadata } from "next";
import { PageHero } from "../_components/PageHero";

export const metadata: Metadata = { title: "Terms" };
export default function TermsPage() { return <main id="main"><PageHero eyebrow="Legal" title={<>Terms &amp;<br /><em>conditions.</em></>} intro="A launch-ready structure for the clinic’s approved booking and treatment terms." /><article className="legal-page section-space"><p className="eyebrow">Content required before launch</p><h2>Approved terms to be inserted.</h2><p>This page is intentionally not populated with invented policies. Add the approved booking, cancellation, payment, suitability and treatment terms before public launch.</p></article></main>; }

