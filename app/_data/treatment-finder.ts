/** Browsing preferences only: no symptoms, diagnosis, storage or tracking. */
export const visitGoals = [
  {
    id: "rest",
    label: "A moment to unwind",
    detail: "Warmth, stillness & a slower pace",
    symbol: "sun",
  },
  {
    id: "body",
    label: "Lymphatic body care",
    detail: "Hands-on time with a practitioner",
    symbol: "wave",
  },
  {
    id: "recovery",
    label: "A recovery ritual",
    detail: "Body rollers & recovery boots",
    symbol: "arc",
  },
  {
    id: "face",
    label: "Some care for my face",
    detail: "Facial massage & sculpting",
    symbol: "leaf",
  },
  {
    id: "postop",
    label: "Care after surgery",
    detail: "Let’s start with the right guidance",
    symbol: "heart",
  },
] as const;
export type VisitGoal = (typeof visitGoals)[number]["id"];
export const timeOptions = [
  { minutes: 30, label: "A little pause", detail: "Up to 30 minutes" },
  { minutes: 60, label: "An hour for me", detail: "Up to 60 minutes" },
  { minutes: 120, label: "Time to linger", detail: "Up to two hours" },
] as const;
export type TimeBudget = (typeof timeOptions)[number]["minutes"];
// Ordered editorial shortlist. All prices, durations and destinations come from the audited catalogue.
const shortlists: Record<VisitGoal, readonly string[]> = {
  rest: ["PRB1", "PR", "LWC019", "LWC017"],
  body: ["LWC002", "LWC001", "LWC003"],
  recovery: ["PRB1", "RR", "LWC018", "LWC020"],
  face: ["LWC008", "LWC009", "LWC010", "LWC024"],
  postop: [],
};
export const finderNotes: Record<string, string> = {
  PRB1: "A longer visit combining the Pier Reset experience with recovery boots.",
  PR: "A coordinated sauna and body roller visit, with a little more time to yourself.",
  LWC019: "A private infrared sauna session for a quiet pause in your week.",
  LWC017: "A whole-body red light session in our dedicated LED bed.",
  LWC002: "The longer, 90-minute hands-on lymphatic massage appointment.",
  LWC001:
    "A 60-minute hands-on lymphatic massage appointment with your practitioner.",
  LWC003: "A combined appointment for lymphatic massage and abdominal EMS.",
  RR: "Body roller therapy followed by recovery boots, together in one visit.",
  LWC018: "A 30-minute body roller session in our wellness space.",
  LWC020:
    "A short recovery boots session when you have a little time to spare.",
  LWC008:
    "A 45-minute facial massage appointment for dedicated, hands-on care.",
  LWC009:
    "A deluxe facial massage appointment, with 45 minutes set aside for you.",
  LWC010: "Facial cupping and LED together in a 40-minute appointment.",
  LWC024: "A focused 20-minute Qi eye treatment for a shorter visit.",
};
type FinderItem = {
  code: string;
  kind: string;
  available: boolean;
  minutes: number | null;
};
export function findTreatments<T extends FinderItem>(
  items: readonly T[],
  goal: VisitGoal,
  minutes: TimeBudget,
): T[] {
  if (!timeOptions.some((option) => option.minutes === minutes)) return [];
  return (shortlists[goal] ?? [])
    .flatMap((code) => {
      const item = items.find((offer) => offer.code === code);
      return item?.available &&
        ["service", "day_package"].includes(item.kind) &&
        item.minutes !== null &&
        item.minutes > 0 &&
        item.minutes <= minutes
        ? [item]
        : [];
    })
    .slice(0, 3);
}
