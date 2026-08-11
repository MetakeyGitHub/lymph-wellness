import Link from "next/link";
import { Button } from "./_components/Button";

export default function NotFound() {
  return <main id="main" className="not-found">
    <p className="eyebrow">404 / Page not found</p>
    <h1>This page has<br /><em>moved on.</em></h1>
    <p>The treatment or guide you were looking for may have a new address. Return home or explore the current treatment menu.</p>
    <div><Button href="/">Return home</Button><Link className="text-link" href="/services">Explore treatments <span aria-hidden="true">↗</span></Link></div>
  </main>;
}
