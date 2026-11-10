import { findOffer } from "./offerings";
import { services } from "./site";

export const SITE_URL = "https://www.lymphandwellness.com.au";

export const serviceAreas = [
  "Altona",
  "Altona North",
  "Altona Meadows",
  "Seaholme",
  "Williamstown",
  "Williamstown North",
  "Newport",
  "Spotswood",
  "Yarraville",
  "Seddon",
  "Footscray",
  "Kingsville",
  "Brooklyn",
  "Laverton",
  "Seabrook",
  "Point Cook",
] as const;

export const treatmentPages = [
  {
    slug: "lymphatic-drainage-melbourne",
    eyebrow: "Lymphatic drainage / Melbourne",
    title: "Manual lymphatic drainage in Melbourne",
    seoTitle: "Lymphatic Drainage Melbourne",
    description: "Brazilian manual lymphatic drainage in Altona, Melbourne. Choose a 60 or 90 minute women-only treatment with current service options and pricing in our booking portal.",
    intro: "A rhythmic full-body treatment designed to support lymphatic movement, ease the feeling of heaviness and create space for deep relaxation.",
    image: "/images/cream-texture.jpg",
    imageAlt: "Sculptural cream texture suggesting gentle lymphatic movement",
    duration: "60 or 90 minutes",
    price: services[0].price,
    bookingUrl: findOffer("LWC001").url,
    bookingLabel: "Book lymphatic massage",
    suitable: "Often chosen by clients seeking a gentle wellness treatment for puffiness, the feeling of heaviness, relaxation or regular body care.",
    expectations: [
      "A private consultation about your goals and relevant health history.",
      "Light to moderate rhythmic movements adapted to your comfort.",
      "Appropriate draping in a private women-only treatment room.",
      "Realistic guidance without detox, weight-loss or guaranteed-result claims.",
    ],
    additions: ["60-Min Lymphatic Drainage Massage + Abdominal EMS Session"],
    keywords: ["lymphatic drainage Melbourne", "lymphatic massage Melbourne", "manual lymphatic drainage Melbourne", "lymphatic drainage Altona"],
    articleSlugs: ["what-is-lymphatic-drainage-massage", "brazilian-vs-manual-lymphatic-drainage", "how-to-prepare-for-lymphatic-drainage"],
  },
  {
    slug: "facial-sculpting-melbourne",
    eyebrow: "Facial treatments / Melbourne",
    title: "Facial sculpting and lymphatic care in Melbourne",
    seoTitle: "Facial Sculpting Melbourne",
    description: "Facial sculpting, facial cupping and LED face light therapy at a private women-only clinic in Altona, Melbourne west.",
    intro: "Gentle touch, considered sculpting techniques and optional light therapy for clients seeking a rested, refreshed facial ritual.",
    image: "/images/skin-closeup.jpg",
    imageAlt: "Natural skin close-up in diffused light",
    duration: "20 to 45 minutes",
    price: services[1].price,
    bookingUrl: findOffer("LWC008").url,
    bookingLabel: "Book facial treatments",
    suitable: "For clients seeking non-invasive facial care focused on relaxation, the feeling of puffiness and fresh-looking skin.",
    expectations: [
      "A conversation about skin sensitivity and recent procedures.",
      "Facial massage and sculpting adapted to your comfort.",
      "Optional facial cupping or LED where suitable.",
      "No promise of permanent facial reshaping or medical treatment outcomes.",
    ],
    additions: ["45-Min Ultra Sculpt Facial Massage", "Signature Qi Eye Therapy", "Signature Qi Facial Therapy"],
    keywords: ["facial sculpting Melbourne", "facial lymphatic drainage Melbourne", "facial cupping Melbourne", "facial treatment Altona"],
    articleSlugs: ["facial-lymphatic-drainage-and-puffiness", "choosing-a-lymphatic-drainage-clinic-melbourne", "when-not-to-book-lymphatic-drainage"],
  },
  {
    slug: "ems-body-sculpting-melbourne",
    eyebrow: "Body contouring / Melbourne",
    title: "EMS body sculpting in Melbourne",
    seoTitle: "EMS Body Sculpting Melbourne | Altona",
    description: "Explore EMS body sculpting at Lymph & Wellness in Altona, Melbourne. A conservative body-contouring wellness treatment tailored to individual goals.",
    intro: "Controlled electrical muscle stimulation designed to engage targeted muscle groups as part of a considered body-contouring wellness plan.",
    image: "/images/clinic/lounge.jpg",
    imageAlt: "Sculptural architectural curve representing considered body contouring",
    duration: "35 or 65 minutes",
    price: services[2].price,
    bookingUrl: findOffer("LWC011").url,
    bookingLabel: "Book EMS",
    suitable: "For suitable clients exploring a non-invasive body-contouring wellness treatment with realistic expectations.",
    expectations: [
      "A suitability conversation before treatment begins.",
      "Targeted electrical muscle stimulation adjusted to comfort.",
      "A plan that may include a series of sessions depending on individual goals.",
      "No guarantee of fat loss, weight loss or permanent body change.",
    ],
    additions: [],
    keywords: ["EMS body sculpting Melbourne", "body sculpting Melbourne", "body contouring Altona"],
    articleSlugs: ["choosing-a-lymphatic-drainage-clinic-melbourne", "how-often-to-book-lymphatic-drainage", "what-to-expect-after-lymphatic-drainage"],
  },
] as const;

export function getTreatmentPage(slug: string) {
  return treatmentPages.find((treatment) => treatment.slug === slug);
}
