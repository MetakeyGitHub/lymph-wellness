import Image from "next/image";
import { BOOKING_URL } from "../_data/site";
import { Button } from "./Button";

export function BookingCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`booking-cta ${compact ? "compact" : ""}`} data-reveal>
      <Image src="/images/flow-editorial.webp" alt="Soft ivory fabric folds" fill sizes="100vw" />
      <div className="booking-cta-overlay" />
      <div className="booking-cta-content">
        <p className="eyebrow">Your body. Your reset.</p>
        <h2>Book your<br /><em>treatment.</em></h2>
        <Button href={BOOKING_URL} variant="light">Book a treatment</Button>
      </div>
    </section>
  );
}

