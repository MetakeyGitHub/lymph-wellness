export const BOOKING_URL = "https://lymphandwellnessco.simplybook.me/v2/";
export const INSTAGRAM_URL = "https://www.instagram.com/lymph.wellnessco/";
export const MEMBERSHIP_URL = "https://lymphwell.ap.zenoti.com/webstoreNew/giftcards/ab0f43de-2383-47ca-b282-967daa002f72";
export const GOOGLE_REVIEWS_URL = "https://share.google/PfSn7CcBq24fN0Uwy";
export const PHONE_DISPLAY = "0452 599 300";
export const PHONE_URL = "tel:+61452599300";

export const openingHours = [
  ["Monday", "10:30 AM to 5:00 PM"],
  ["Tuesday", "10:30 AM to 5:00 PM"],
  ["Wednesday", "10:30 AM to 5:00 PM"],
  ["Thursday", "10:30 AM to 5:00 PM"],
  ["Friday", "10:30 AM to 5:00 PM"],
  ["Saturday", "10:30 AM to 5:00 PM"],
  ["Sunday", "Closed"],
] as const;

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/memberships", label: "Memberships" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/post-op", label: "Post-Op" },
  { href: "/faq", label: "FAQ" },
];

export const services = [
  {
    number: "01",
    slug: "lymphatic-drainage",
    title: "Brazilian Manual Lymphatic Drainage",
    shortTitle: "Lymphatic Drainage",
    duration: "60 or 90 minutes",
    copy: "A rhythmic, hands-on treatment designed to support lymphatic flow, ease the feeling of heaviness and encourage a restored sense of balance.",
    suitable: "Often chosen by clients seeking considered support for fluid retention, circulation, relaxation or general wellbeing.",
    addOns: ["Whole Body LED Therapy", "Wood Therapy", "Dry Cupping"],
    image: "/images/cream-texture.jpg",
    href: "/treatments/lymphatic-drainage-melbourne",
  },
  {
    number: "02",
    slug: "facial-treatments",
    title: "Facial Treatments",
    shortTitle: "Facial Treatments",
    duration: "Treatment dependent",
    copy: "Targeted facial treatments that combine touch, sculpting techniques and optional light therapy in support of fresh, rested-looking skin.",
    suitable: "For clients seeking a non-invasive facial ritual focused on puffiness, relaxation and skin wellbeing.",
    addOns: ["Facial Sculpting", "Facial Cupping", "LED Face Light Therapy"],
    image: "/images/skin-closeup.jpg",
    href: "/treatments/facial-sculpting-melbourne",
  },
  {
    number: "03",
    slug: "body-sculpting",
    title: "EMS Body Sculpting",
    shortTitle: "Body Sculpting",
    duration: "Plan tailored to your goals",
    copy: "A body-contouring wellness treatment using electrical muscle stimulation to engage targeted muscle groups.",
    suitable: "Treatment plans may include a series of sessions depending on individual goals and suitability.",
    addOns: [],
    image: "/images/architectural-curve.jpg",
    href: "/treatments/ems-body-sculpting-melbourne",
  },
  {
    number: "04",
    slug: "post-op-lymphatic-drainage",
    title: "Post-Operative Lymphatic Drainage",
    shortTitle: "Post-Op Lymphatic Drainage",
    duration: "Treatment plan tailored individually",
    copy: "A gentle treatment designed to support comfort after surgery and help manage swelling, inflammation and fluid build-up as part of a considered recovery plan.",
    suitable: "For eligible clients who have received appropriate guidance or clearance from their surgeon or treating practitioner.",
    addOns: ["LED Whole Body", "Recovery Boots", "Dry Cupping"],
    image: "/images/layered-interior.jpg",
    href: "/post-op",
  },
];

export const faqs = [
  { q: "What is lymphatic drainage massage?", a: "It is a gentle, rhythmic manual treatment designed to support the movement of lymphatic fluid. Many clients seek it for relaxation, the feeling of heaviness, fluid retention or as part of a broader wellbeing routine. Experiences and outcomes vary." },
  { q: "What should I wear?", a: "Wear something comfortable and easy to change out of. Your privacy and comfort are prioritised throughout the appointment, and draping is used appropriately during treatment." },
  { q: "How should I prepare?", a: "Arrive hydrated, avoid a heavy meal immediately beforehand and share any relevant health information before treatment. If you are unsure whether a treatment is suitable, speak with your medical practitioner first." },
  { q: "How long is a treatment?", a: "Brazilian manual lymphatic drainage is available in 60- and 90-minute appointments. Other treatment lengths vary and will be confirmed at booking." },
  { q: "How often should I book?", a: "Frequency depends on your goals, how your body responds and the treatment selected. A considered plan can be discussed at your appointment without pressure to commit to a fixed program." },
  { q: "Can I book after surgery?", a: "Post-operative treatment may be appropriate for some clients, but timing and suitability depend on the procedure, your recovery and your treating practitioner’s advice." },
  { q: "Do I need clearance from my surgeon?", a: "Where required, yes. If you have recently undergone surgery, obtain clearance from your surgeon or treating practitioner before booking." },
  { q: "What should I expect after treatment?", a: "Responses vary. Some clients report feeling relaxed or lighter, while others notice little immediate change. Follow the aftercare guidance provided and contact a healthcare professional if you feel unwell." },
  { q: "What is facial cupping?", a: "Facial cupping uses small, gentle cups moved across the skin as part of a non-invasive facial treatment. It is delivered with care and adjusted to your comfort and skin needs." },
  { q: "What is EMS body sculpting?", a: "EMS uses controlled electrical impulses to stimulate targeted muscle contractions. It is positioned here as a body-contouring wellness treatment, not as a guaranteed fat-loss or weight-loss solution." },
  { q: "How do I choose the right treatment?", a: "Start with what you want support with, such as relaxation, lymphatic care, facial treatment, body contouring or post-operative comfort. If you are still unsure, contact the studio before booking." },
];

export const memberships = [
  { name: "VIP Reset", cadence: "Weekly members pass", inclusions: "Sauna + Boots", price: "$139" },
  { name: "Beachside Essential", cadence: "Monthly members pass", inclusions: "Body Roller or LED Bed", price: "$196" },
  { name: "Glow and Detox", cadence: "Bi-weekly members pass", inclusions: "Sauna + Boots", price: "$198" },
  { name: "Lymph Ritual", cadence: "Monthly members pass", inclusions: "Roller + Boots", price: "$316" },
  { name: "Glow and Detox", cadence: "Monthly members pass", inclusions: "Sauna + Boots", price: "$396" },
] as const;

export const testimonials = [
  {
    name: "Mia Smith",
    treatment: "Lymphatic massage",
    quote: "My first lymphatic massage was beyond relaxing. I walked out feeling lighter, refreshed, and so calm. The whole experience from start to finish was 10/10. You can truly tell Seda cares about making you feel comfortable and looked after.",
  },
  {
    name: "jayde jek",
    treatment: "Lymphatic wellness",
    quote: "A luxurious, safe and clean space. What truly sets her apart is her technique. She is focused on the lymphatic system and also creates a sense of calm within the nervous system. Each session is tailored to what you need most.",
  },
  {
    name: "Michelle",
    treatment: "Lymphatic drainage facial",
    quote: "Seda has the most positive, calming energy. My first lymphatic drainage facial felt so relaxing and welcoming. In addition to feeling lighter and refreshed, the whole experience was both healing and restorative.",
  },
  {
    name: "Angela G",
    treatment: "Personalised treatment",
    quote: "Seda’s kindness, patience, compassion and professionalism are evident from the moment you meet her. She listened attentively and offered her expertise and knowledge, which made me feel heard and cared for.",
  },
  {
    name: "Tobina Hurdoyal",
    treatment: "Red light therapy and facial massage",
    quote: "The red light therapy was relaxing and left me feeling refreshed. I also loved the gentle massage and facial oil massage, which were soothing and professionally delivered. The clinic has a calm and welcoming atmosphere.",
  },
] as const;
