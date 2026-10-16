// Public Zenoti catalogue audited on 17 October 2026 (Australia/Melbourne).
// Keep names, billing periods, prices and expiry periods aligned with the portal.
export const SERVICES_URL = "https://lymphwell.ap.zenoti.com/webstoreNew/services/ab0f43de-2383-47ca-b282-967daa002f72";
export const MEMBERSHIP_URL = "https://lymphwell.ap.zenoti.com/webstoreNew/sales/membership/ab0f43de-2383-47ca-b282-967daa002f72";
export const GIFT_CARDS_URL = "https://lymphwell.ap.zenoti.com/webstoreNew/giftcards/ab0f43de-2383-47ca-b282-967daa002f72";
export const SERIES_PACKAGES_URL = "https://lymphwell.ap.zenoti.com/webstoreNew/sales/seriespackage/ab0f43de-2383-47ca-b282-967daa002f72";
export const CATALOGUE_VERIFIED = "17 October 2026";
export const memberships = [
  { name: "Glow and Detox - Monthly", period: "per Month", price: 636 },
  { name: "Lymph Ritual - Monthly", period: "per Month", price: 436 },
  { name: "VIP Reset - Monthly", period: "per Month", price: 996 },
  { name: "VIP Reset Launch Day - Bi-Weekly", period: "per 14 Days", price: 458 },
] as const;
export const serviceGroups = [
  { name: "Lymphatic Massage", items: [
    ["60-Min Lymphatic Drainage Massage", 60, 190],
    ["60-Min Lymphatic Drainage Massage + Abdominal EMS Session", 60, 290],
    ["60-Min Post-Op Lymphatic Massage", 60, 200],
    ["60-Min Post-Op Lymphatic Massage + Whole Body LED/Infrared Light Therapy", 60, 240],
    ["90-Min Lymphatic Drainage Massage", 90, 275],
    ["90-Min Post-Op Lymphatic Massage", 90, 285],
    ["90-Min Post-Op Lymphatic Massage + Whole Body LED/Infrared Light Therapy", 90, 325],
  ] },
  { name: "Facial Treatments", items: [
    ["45-Min Ultra Sculpt Facial Massage", 45, 150],
    ["DELUXE Ultra Sculpting - Facial Massage + Facial Cupping", 45, 180],
    ["Facial Cupping Massage + 20-Min LED Red Light Therapy", 40, 100],
    ["Signature Qi Eye Therapy", 20, 110],
    ["Signature Qi Facial Therapy", 45, 280],
  ] },
  { name: "EMS", items: [
    ["EMS - Electro Muscle Stimulation (Double Session)", 65, 380],
    ["EMS - Electro Muscle Stimulation (Single Session)", 35, 200],
  ] },
  { name: "Day Packages", items: [
    ["60-Min Post-Op Lymphatic Massage + Whole Body LED/Infrared Light Therapy", 60, 248],
    ["Glow Recovery", 45, 139], ["Pier Reset", 90, 159], ["Pier Reset + Boots", 150, 179],
    ["Pier Reset Intro", 90, 99], ["Private Sauna for 2 Intro", 45, 65],
    ["Private Sauna Group", 45, 155], ["Private Sauna Social", 45, 80],
    ["Roll + Recover", 60, 99], ["Sweat + Roll", 90, 119], ["VacuActive Intro", 30, 49],
  ] },
  { name: "Hijama - Wet Cupping", items: [
    ["Hijama (Initial Consultation & Treatment)", 60, 130], ["Hijama (Return Treatment)", 45, 110],
    ["Hijama with Acupuncture (Initial Consultation & Treatment)", 60, 145], ["Hijama with Acupuncture (Return Treatment)", 45, 125],
  ] },
  { name: "Acupuncture", items: [
    ["Acupuncture – Long (Return Consultation)", 45, 100],
    ["Acupuncture (Initial Consultation & Treatment)", 60, 115], ["Acupuncture (Return Consultation)", 30, 70],
  ] },
  { name: "Naturopathy & Clinical Nutrition", items: [
    ["Naturopathic & Clinical Nutrition Follow-Up Consultation", 45, 145],
    ["Naturopathic & Clinical Nutrition Review Consultation", 30, 110],
  ] },
  { name: "Cupping Therapies", items: [
    ["Fire Cupping (Mobile or Stationary) – 30 min", 30, 65], ["Fire Cupping (Mobile or Stationary) – 45 min", 45, 85],
  ] },
  { name: "Auricular Therapy", items: [["Ear Seeds (Consultation and Treatment)", 30, 45]] },
  { name: "New Offerings", items: [
    ["Full Spectrum Infrared Sauna", 45, 55], ["LED Red Light Therapy Bed", 45, 89],
    ["Lymphatic Body Roller Therapy", 45, 79], ["Recovery Boots", 15, 35],
    ["Vacuactiv Bodyshape V3 Treadmill", 30, 79], ["Vacuactiv Infrastep StairMaster", 30, 59],
  ] },
] as const;
export const packageGroups = [
  { name: "Launch Bonuses", items: [
    ["10 Credit Launch Bonus", 649, "6 Months", "10 premium credits + 2 sauna sessions + 2 recovery boot sessions"],
    ["20 Credit Launch Bonus", 1199, "6 Months", "20 premium credits + 4 sauna sessions + 4 recovery boot sessions"],
  ] },
  { name: "EMS", items: [
    ["EMS Launch 4-Pack", 499, "6 Months", "EMS Sculpting 1 Area × 4 sessions"],
    ["EMS Sculpting - 1 Area 12 Pack", 1499, "6 Months", "12 sessions"],
    ["EMS Sculpting - 1 Area 8-Pack", 1099, "6 Months", "8 sessions"],
  ] },
  { name: "Infrared Sauna", items: [
    ["Private Infrared Sauna for 1 person 10 Session", 399, "6 Months", "10 private sauna sessions for 1 person"],
    ["Private Infrared Sauna for 1 person 5 Sessions", 225, "1 Year", "5 private sauna sessions for 1 person"],
  ] },
  { name: "Pier Reset", items: [
    ["3 x Pier Reset", 449, "6 Months", "3 Pier Reset sessions"], ["6 x Pier Reset", 849, "6 Months", "6 Pier Reset sessions"],
  ] },
  { name: "Premium", items: [
    ["Premium Machine 10 Credits", 649, "6 Months", "Body Roll or Full Body LED / Infrared Bed"],
    ["Premium Machine 20 Credits", 1199, "6 Months", "Body Roll or Full Body LED / Infrared Bed"],
    ["Premium Machine 5 Credits", 349, "6 Months", "Body Roll or Full Body LED / Infrared Bed"],
  ] },
  { name: "Recovery Boots", items: [
    ["15-Min Recovery Boots 10 Sessions", 250, "6 Months", "10 × 15-minute sessions"],
    ["15-Min Recovery Boots 20 Sessions", 440, "6 Months", "20 × 15-minute sessions"],
    ["15-Min Recovery Boots 5 Sessions", 145, "6 Months", "5 × 15-minute sessions"],
  ] },
  { name: "Vacu Active", items: [
    ["VacuActive 10-Pack Bonus Launh offer", 549, "6 Months", "10 VacuActive sessions + 2 recovery boot sessions"],
    ["VacuActive Pack 10 Sessions", 549, "6 Months", "Mix Between VacuActive Treadmill or VacuActive StairMaster"],
    ["VacuActive Pack 20 Sessions", 999, "6 Months", "Mix Between VacuActive Treadmill or VacuActive StairMaster"],
    ["VacuActive Pack 5 Sessions", 299, "6 Months", "Mix Between VacuActive Treadmill or VacuActive StairMaster"],
  ] },
] as const;
export const giftCardAmounts = [20, 50, 100] as const;
export const formatPrice = (amount: number) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(amount);
