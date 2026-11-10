"use client";

import { useSyncExternalStore } from "react";
import { openingHours } from "../_data/site";

/** Regular clinic hours, read in Melbourne time whatever the visitor's own clock says. */
const ZONE = "Australia/Melbourne";
const DAYS = openingHours.map(([day]) => day) as readonly string[];

const toMinutes = (label: string) => {
  const match = label.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  const hour = (Number(match[1]) % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0);
  return hour * 60 + Number(match[2]);
};
const friendly = (label: string) =>
  label.replace(":00", "").replace(" AM", "am").replace(" PM", "pm");

const schedule = openingHours.map(([day, hours]) => {
  const [opens, closes] = hours.split("–").map((part) => part.trim());
  return closes
    ? { day, opens, closes, from: toMinutes(opens), to: toMinutes(closes) }
    : { day, opens: "", closes: "", from: -1, to: -1 };
});

function melbourneNow() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: ZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: get("weekday"),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function describeStatus(day: string, minutes: number) {
  const index = DAYS.indexOf(day);
  if (index < 0) return { open: false, label: "", day };
  const today = schedule[index];
  if (today.from >= 0 && minutes >= today.from && minutes < today.to)
    return { open: true, label: `Open today until ${friendly(today.closes)}`, day };
  if (today.from >= 0 && minutes < today.from)
    return { open: false, label: `Opens today at ${friendly(today.opens)}`, day };
  for (let offset = 1; offset <= 7; offset++) {
    const next = schedule[(index + offset) % 7];
    if (next.from >= 0)
      return {
        open: false,
        label: `Opens ${offset === 1 ? "tomorrow" : next.day} at ${friendly(next.opens)}`,
        day,
      };
  }
  return { open: false, label: "", day };
}

const subscribe = (notify: () => void) => {
  const timer = window.setInterval(notify, 60_000);
  return () => window.clearInterval(timer);
};
const snapshot = () => {
  const now = melbourneNow();
  const status = describeStatus(now.day, now.minutes);
  return `${status.open ? "1" : "0"}|${status.label}|${status.day}`;
};
const serverSnapshot = () => "||";

function useClinicStatus() {
  const [open, label, day] = useSyncExternalStore(
    subscribe,
    snapshot,
    serverSnapshot,
  ).split("|");
  return { open: open === "1", label, day };
}

/** A small, honest signal: is the clinic open right now, and if not, when next. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const { open, label } = useClinicStatus();
  return (
    <span
      className={`lw-status ${className}`}
      data-open={label ? String(open) : undefined}
    >
      <span className="lw-status-dot" aria-hidden="true" />
      {label || "Monday to Saturday"}
    </span>
  );
}

/** Weekly hours with today's row marked once the visitor's browser knows the day. */
export function HoursList({ short = false }: { short?: boolean }) {
  const { day: today } = useClinicStatus();
  return (
    <dl className="lw-hours-list">
      {openingHours.map(([day, time]) => (
        <div key={day} data-today={day === today ? "true" : undefined}>
          <dt>
            {short ? day.slice(0, 3) : day}
            {day === today && <span className="sr-only"> (today)</span>}
          </dt>
          <dd>{time}</dd>
        </div>
      ))}
    </dl>
  );
}
