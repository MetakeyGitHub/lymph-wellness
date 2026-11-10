import { SERVICES_URL, formatPrice, findOffer } from "./offerings";
export { MEMBERSHIP_URL, memberships } from "./offerings";
export const BOOKING_URL = SERVICES_URL;
/** Named clinic lead. Add qualifications here only once verified by the clinic. */
export const FOUNDER = {
  name: "Seda Yener",
  role: "Founder & Director",
  path: "/about#seda-yener",
} as const;
export const INSTAGRAM_URL = "https://www.instagram.com/lymph.andwellness/";
export const GOOGLE_REVIEWS_URL = "https://share.google/PfSn7CcBq24fN0Uwy";
export const PHONE_DISPLAY = "0452 599 300";
export const PHONE_URL = "tel:+61452599300";
export const ADDRESS_LINE_1 = "Level 1/22 Pier Street";
export const ADDRESS_LINE_2 = "Altona VIC 3018";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Level+1%2F22+Pier+Street+Altona+VIC+3018";
export const EMAIL_DISPLAY = "info@lymphandwellnessco.com.au";
export const EMAIL_URL = `mailto:${EMAIL_DISPLAY}`;

export const bookingOptions = [
  "LWC001",
  "LWC002",
  "LWC008",
  "LWC011",
  "LWC004",
  "LWC005",
].map((code) => {
  const item = findOffer(code);
  return { label: item.name, price: formatPrice(item.price), href: item.url };
});

export const openingHours = [
  ["Monday", "10:30 AM – 7:30 PM"],
  ["Tuesday", "9:30 AM – 7:30 PM"],
  ["Wednesday", "9:00 AM – 7:30 PM"],
  ["Thursday", "10:00 AM – 9:00 PM"],
  ["Friday", "10:00 AM – 9:00 PM"],
  ["Saturday", "11:00 AM – 5:00 PM"],
  ["Sunday", "Closed"],
] as const;
export const navigation = [
  { href: "/services", label: "Treatments" },
  { href: "/packages", label: "Experiences & packs" },
  { href: "/memberships", label: "Memberships" },
  { href: "/gift-cards", label: "Gifting" },
  { href: "/about", label: "The clinic" },
  { href: "/search", label: "Search" },
];

export const services = [
  {
    number: "01",
    slug: "lymphatic-drainage",
    title: "Brazilian Manual Lymphatic Drainage",
    shortTitle: "Lymphatic Drainage",
    duration: "60 or 90 minutes",
    price: `From ${bookingOptions[0].price}`,
    bookingUrl: bookingOptions[0].href,
    bookingCta: "Book lymphatic massage",
    copy: "A rhythmic, hands-on treatment designed to support lymphatic flow, ease the feeling of heaviness and encourage a restored sense of balance.",
    suitable:
      "Often chosen by clients seeking considered support for fluid retention, circulation, relaxation or general wellbeing.",
    addOns: ["60-Min Lymphatic Drainage Massage + Abdominal EMS Session"],
    image: "/images/cream-texture.jpg",
    href: "/treatments/lymphatic-drainage-melbourne",
  },
  {
    number: "02",
    slug: "facial-treatments",
    title: "Facial Treatments",
    shortTitle: "Facial Treatments",
    duration: "20 to 45 minutes",
    price: "From $100",
    bookingUrl: bookingOptions[2].href,
    bookingCta: "Book facial treatments",
    copy: "Targeted facial treatments that combine touch, sculpting techniques and optional light therapy in support of fresh, rested-looking skin.",
    suitable:
      "For clients seeking a non-invasive facial ritual focused on puffiness, relaxation and skin wellbeing.",
    addOns: [
      "45-Min Ultra Sculpt Facial Massage",
      "DELUXE Ultra Sculpting - Facial Massage + Facial Cupping",
      "Facial Cupping Massage + 20-Min LED Red Light Therapy",
      "Signature Qi Eye Therapy",
      "Signature Qi Facial Therapy",
    ],
    image: "/images/skin-closeup.jpg",
    href: "/treatments/facial-sculpting-melbourne",
  },
  {
    number: "03",
    slug: "body-sculpting",
    title: "EMS Body Sculpting",
    shortTitle: "Body Sculpting",
    duration: "35 or 65 minutes",
    price: `From ${bookingOptions[3].price}`,
    bookingUrl: bookingOptions[3].href,
    bookingCta: "Book EMS",
    copy: "A body-contouring wellness treatment using electrical muscle stimulation to engage targeted muscle groups.",
    suitable:
      "Treatment plans may include a series of sessions depending on individual goals and suitability.",
    addOns: [],
    image: "/images/clinic/lounge.jpg",
    href: "/treatments/ems-body-sculpting-melbourne",
  },
  {
    number: "04",
    slug: "post-op-lymphatic-drainage",
    title: "Post-Operative Lymphatic Drainage",
    shortTitle: "Post-Op Lymphatic Drainage",
    duration: "60 or 90 minutes",
    price: `From ${bookingOptions[4].price}`,
    bookingUrl: bookingOptions[4].href,
    bookingCta: "Book post-op care",
    copy: "A gentle treatment designed to support comfort after surgery and help manage swelling, inflammation and fluid build-up as part of a considered recovery plan.",
    suitable:
      "For eligible clients who have received appropriate guidance or clearance from their surgeon or treating practitioner.",
    addOns: [
      "60-Min Post-Op Lymphatic Massage + Whole Body LED/Infrared Light Therapy",
      "90-Min Post-Op Lymphatic Massage + Whole Body LED/Infrared Light Therapy",
    ],
    image: "/images/clinic/recovery-lounge.jpg",
    href: "/post-op",
  },
];

export const studioEquipment = [
  {
    number: "01",
    slug: "lymphatic-drainage-body-roller",
    href: "/equipment/lymphatic-drainage-body-roller",
    title: "Lymphatic Body Roller Therapy",
    detail: "Roller massage",
    copy: "Self-guided roller sessions available to book individually or through premium credit packages.",
    access: "Book online",
  },
  {
    number: "02",
    slug: "full-body-red-light-therapy-bed",
    href: "/equipment/full-body-red-light-therapy-bed",
    title: "LED Red Light Therapy Bed",
    detail: "Whole-body light",
    copy: "A quiet, non-invasive light-based wellness session available to book through the services portal.",
    access: "Book online",
  },
  {
    number: "03",
    slug: "full-spectrum-infrared-sauna",
    href: "/equipment/full-spectrum-infrared-sauna",
    title: "Full Spectrum Infrared Sauna",
    detail: "Private heat ritual",
    copy: "A private sauna experience designed for warmth, rest and an unhurried wellness ritual.",
    access: "Book online",
  },
  {
    number: "04",
    slug: "vacu-activ-treadmill-v3",
    href: "/equipment/vacu-activ-treadmill-v3",
    title: "Vacuactiv Bodyshape V3 Treadmill",
    detail: "Guided movement",
    copy: "A technology-led walking experience combining controlled movement with adjustable vacuum and infrared functions.",
    access: "Book online",
  },
  {
    number: "05",
    slug: "vacu-activ-infrastep-stairmill",
    href: "/equipment/vacu-activ-infrastep-stairmill",
    title: "Vacuactiv Infrastep StairMaster",
    detail: "Stair climbing",
    copy: "A guided stair-climbing machine with adjustable settings and integrated infrared and red-light functions.",
    access: "Book online",
  },
  {
    number: "06",
    slug: "recovery-boots",
    href: "/equipment/recovery-boots",
    title: "Recovery Boots",
    detail: "Compression session",
    copy: "15-minute recovery boot sessions available individually or through series packages.",
    access: "Book online",
  },
] as const;

export const faqs = [
  {
    q: "What is lymphatic drainage massage?",
    a: "It is a gentle, rhythmic manual treatment designed to support the movement of lymphatic fluid. Many clients seek it for relaxation, the feeling of heaviness, fluid retention or as part of a broader wellbeing routine. Experiences and outcomes vary.",
  },
  {
    q: "What should I wear?",
    a: "Wear something comfortable and easy to change out of. Your privacy and comfort are prioritised throughout the appointment, and draping is used appropriately during treatment.",
  },
  {
    q: "How should I prepare?",
    a: "Arrive hydrated, avoid a heavy meal immediately beforehand and share any relevant health information before treatment. If you are unsure whether a treatment is suitable, speak with your medical practitioner first.",
  },
  {
    q: "How long is a treatment?",
    a: "Brazilian manual lymphatic drainage is available in 60- and 90-minute appointments. Other treatment lengths vary and will be confirmed at booking.",
  },
  {
    q: "How often should I book?",
    a: "Frequency depends on your goals, how your body responds and the treatment selected. A considered plan can be discussed at your appointment without pressure to commit to a fixed program.",
  },
  {
    q: "Can I book after surgery?",
    a: "Post-operative treatment may be appropriate for some clients, but timing and suitability depend on the procedure, your recovery and your treating practitioner’s advice.",
  },
  {
    q: "Do I need clearance from my surgeon?",
    a: "Where required, yes. If you have recently undergone surgery, obtain clearance from your surgeon or treating practitioner before booking.",
  },
  {
    q: "What should I expect after treatment?",
    a: "Responses vary. Some clients report feeling relaxed or lighter, while others notice little immediate change. Follow the aftercare guidance provided and contact a healthcare professional if you feel unwell.",
  },
  {
    q: "What is facial cupping?",
    a: "Facial cupping uses small, gentle cups moved across the skin as part of a non-invasive facial treatment. It is delivered with care and adjusted to your comfort and skin needs.",
  },
  {
    q: "What is EMS body sculpting?",
    a: "EMS uses controlled electrical impulses to stimulate targeted muscle contractions. It is positioned here as a body-contouring wellness treatment, not as a guaranteed fat-loss or weight-loss solution.",
  },
  {
    q: "How do I choose the right treatment?",
    a: "Start with what you want support with, such as relaxation, lymphatic care, facial treatment, body contouring or post-operative comfort. If you are still unsure, contact the studio before booking.",
  },
];

export const testimonials = [
  {
    name: "Mia Smith",
    treatment: "Lymphatic massage",
    quote:
      "My first lymphatic massage was beyond relaxing. I walked out feeling lighter, refreshed, and so calm. The whole experience from start to finish was 10/10. You can truly tell Seda cares about making you feel comfortable and looked after.",
  },
  {
    name: "jayde jek",
    treatment: "Lymphatic wellness",
    quote:
      "A luxurious, safe and clean space. What truly sets her apart is her technique. She is focused on the lymphatic system and also creates a sense of calm within the nervous system. Each session is tailored to what you need most.",
  },
  {
    name: "Michelle",
    treatment: "Lymphatic drainage facial",
    quote:
      "Seda has the most positive, calming energy. My first lymphatic drainage facial felt so relaxing and welcoming. In addition to feeling lighter and refreshed, the whole experience was both healing and restorative.",
  },
  {
    name: "Angela G",
    treatment: "Personalised treatment",
    quote:
      "Seda’s kindness, patience, compassion and professionalism are evident from the moment you meet her. She listened attentively and offered her expertise and knowledge, which made me feel heard and cared for.",
  },
  {
    name: "Tobina Hurdoyal",
    treatment: "Red light therapy and facial massage",
    quote:
      "The red light therapy was relaxing and left me feeling refreshed. I also loved the gentle massage and facial oil massage, which were soothing and professionally delivered. The clinic has a calm and welcoming atmosphere.",
  },
] as const;
