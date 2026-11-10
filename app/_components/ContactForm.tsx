"use client";

import { FormEvent, useState } from "react";
import { EMAIL_DISPLAY } from "../_data/site";

const interests = [
  "Help choosing a treatment",
  "Lymphatic drainage",
  "Facial treatment",
  "EMS body sculpting",
  "Post-operative care",
  "Membership",
  "Studio equipment",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const interest = String(form.get("interest") || "General enquiry");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Website enquiry: ${interest}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`,
    );
    setStatus(
      `Your email app is opening. If it does not open, email ${EMAIL_DISPLAY}.`,
    );
    document.dispatchEvent(new Event("lw:enquiry-prepared"));
    window.location.href = `mailto:${EMAIL_DISPLAY}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="field-grid">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>I’m interested in</span>
          <select name="interest" defaultValue="Help choosing a treatment">
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
        <label className="full">
          <span>How can we help?</span>
          <textarea name="message" rows={5} required />
        </label>
      </div>
      <button className="button button-dark" type="submit">
        <span>Prepare enquiry</span>
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-status" role="status">
        {status ||
          "Submitting prepares a private email in your preferred email app."}
      </p>
    </form>
  );
}
