import { findOffer, formatPrice } from "./offerings";
const price = (code: string) => formatPrice(findOffer(code).price);
export const faqGroups = [
  {
    id: "booking",
    title: "Choosing & booking",
    items: [
      {
        q: "How do I choose a treatment if this is my first visit?",
        a: "Start with our treatment finder: choose the type of visit you are interested in and how much time you have. It suggests appointments from our current menu with prices and lengths. You can also browse every treatment by category. The finder helps you explore; your practitioner confirms whether a treatment is suitable.",
      },
      {
        q: "Does my selected treatment carry through to booking?",
        a: "Yes. Clicking a treatment row or its booking button opens that specific option in our Zenoti portal. For an appointment, choose an available date and time, then follow the sign-in and checkout steps. A website click alone does not reserve a time; look for confirmation from the booking portal.",
      },
      {
        q: "Where can I see current prices and appointment lengths?",
        a: "The treatment menu displays prices in Australian dollars and appointment lengths from the booking catalogue. Experiences, packs and memberships are listed separately so you can compare like for like. Review the selected option and any additional choices in the booking portal before completing your booking.",
      },
      {
        q: "What is the difference between an experience and a session pack?",
        a: "An experience combines treatments in one scheduled visit. A session pack is purchased first, with appointments booked later against the pack. Buying a pack does not reserve future appointment times. Each pack’s listed expiry applies from purchase.",
      },
      {
        q: "How do I change or cancel an appointment?",
        a: "Check your confirmation and the policies displayed in the booking portal, or contact the clinic for help. Cancellation, rescheduling and refund conditions should be reviewed before payment; do not assume every service or purchase has the same conditions.",
      },
    ],
  },
  {
    id: "body-facial",
    title: "Lymphatic & facial care",
    items: [
      {
        q: "What is lymphatic drainage massage?",
        a: "It is a rhythmic, hands-on massage approach. Our wellness appointments focus on considered body care and relaxation. Clinical manual lymphatic drainage can also be part of specialist lymphoedema management, which is a separate medical care pathway. New or unexplained swelling should be assessed by a healthcare professional before booking.",
      },
      {
        q: "How much is lymphatic drainage at the Altona clinic?",
        a: `The 60-minute lymphatic drainage appointment is ${price("LWC001")}, and the 90-minute appointment is ${price("LWC002")}. Combined treatments and post-operative appointments have their own prices. Choose the exact service in our treatment menu to see its booking details.`,
      },
      {
        q: "Is facial massage the same as a body lymphatic appointment?",
        a: "No. Facial appointments focus on the face and eye area, while body lymphatic appointments have a different treatment focus and length. Our facial menu includes Ultra Sculpt facial massage, facial cupping with LED, and Qi facial and eye therapies. Read the named option before booking rather than assuming every facial includes the same techniques.",
      },
      {
        q: "Can I book a facial after injectables or a skin procedure?",
        a: "Ask the clinician who performed your procedure when facial massage, cupping or light therapy can resume. Contact our team before booking and share the instructions you were given. Timing depends on the procedure and your individual recovery.",
      },
      {
        q: "How often should I book, and are results guaranteed?",
        a: "There is no single schedule or guaranteed result for everyone. Your treatment choice, comfort, goals and any medical advice should guide frequency. A wellness appointment is not a guaranteed weight-loss treatment or a replacement for assessment of persistent swelling.",
      },
    ],
  },
  {
    id: "machines",
    title: "Wellness machines & rituals",
    items: [
      {
        q: "What is the difference between a sauna session and a red light bed session?",
        a: `They are different experiences. Our private infrared sauna appointment is ${findOffer("LWC019").minutes} minutes at ${price("LWC019")}; the LED red light bed appointment is ${findOffer("LWC017").minutes} minutes at ${price("LWC017")}. One is a heat-based visit and the other a light-based session. Ask the clinic about preparation and suitability for the equipment you choose.`,
      },
      {
        q: "How long are body roller and recovery boots sessions?",
        a: `Body rollers can be booked for 30 minutes at ${price("LWC018")} or 45 minutes at ${price("LWC025")}. Recovery boots are a 15-minute appointment at ${price("LWC020")}. Roll + Recover combines body rollers and boots in a ${findOffer("RR").minutes}-minute visit at ${price("RR")}.`,
      },
      {
        q: "Can I visit the sauna with a friend?",
        a: `Yes, the menu includes Private Sauna Social for two at ${price("PSS")} and Private Sauna Group for up to five at ${price("PSG")}. Both are 45-minute appointments. Choose the group option you need rather than booking a single-person session for multiple guests.`,
      },
      {
        q: "Are all wellness machines included in membership?",
        a: "No. The listed machine-session allowance covers the Vacuactiv StairMaster, Vacuactiv treadmill, body rollers and red light bed. Boots and lymphatic massage inclusions depend on your plan. Private sauna is not included in that standard machine list. Compare the individual plan before purchasing.",
      },
      {
        q: "What should I wear for a machine session?",
        a: "Preparation depends on the equipment. Wear comfortable clothing and ask the team about suitable clothing, footwear and changing arrangements for your selected session. Follow the clinic’s instructions before using a machine, and tell the team if you feel uncomfortable during a session.",
      },
    ],
  },
  {
    id: "recovery",
    title: "Post-operative care & suitability",
    items: [
      {
        q: "Can I book lymphatic massage after surgery?",
        a: "Contact the clinic before selecting a post-operative appointment. The appropriate timing and approach depend on your procedure, recovery and treating team’s instructions. Obtain surgeon or practitioner clearance where required. A fixed number of days after surgery is not enough to determine suitability.",
      },
      {
        q: "Which post-operative appointment lengths are available?",
        a: `The menu includes 60-minute post-operative lymphatic massage at ${price("LWC004")} and 90-minute massage at ${price("LWC005")}, plus separately priced options with whole-body LED/infrared light therapy. Discuss the options with the clinic before choosing a combined treatment.`,
      },
      {
        q: "What if I am pregnant, unwell or receiving medical treatment?",
        a: "Contact the clinic before booking so suitability can be discussed, and follow your treating practitioner’s advice. Do not use a wellness session to investigate new or concerning symptoms. You do not need to share detailed medical information in the website’s general enquiry form.",
      },
    ],
  },
  {
    id: "packs-gifts",
    title: "Packs, memberships & gifts",
    items: [
      {
        q: "Do memberships renew monthly?",
        a: "The plans shown on this website are recurring monthly memberships. Each card lists the monthly price and included sessions. Confirm minimum term, cancellation, pause, rollover and unused-session rules in the purchase terms or with the clinic before joining.",
      },
      {
        q: "When do session packs expire?",
        a: "Expiry is shown on each pack and measured from purchase. Many current packs are valid for six months; the five-session private sauna pack is listed for one year. Check the exact pack you are buying and allow time to book your sessions within its validity period.",
      },
      {
        q: "Can I buy a gift card for someone else?",
        a: "Yes. The gift-card link opens the booking provider’s gift-card flow, where you choose an amount and enter the recipient’s details. Review delivery details and the gift-card terms before paying. Gift-card purchases do not book an appointment for the recipient.",
      },
      {
        q: "Does buying a pack guarantee availability?",
        a: "No. A pack purchase and an appointment reservation are separate steps. Available times depend on the service, practitioner and clinic schedule. Review availability and ask the team about your preferred routine before committing to a series of visits.",
      },
    ],
  },
  {
    id: "visiting",
    title: "Visiting the clinic",
    items: [
      {
        q: "Where is Lymph & Wellness?",
        a: "Our women’s wellness clinic is at Level 1/22 Pier Street, Altona VIC 3018. All appointments take place at this Altona address. We welcome visitors from Hobsons Bay and Melbourne’s western suburbs, including Williamstown, Newport, Altona North, Yarraville and Point Cook.",
      },
      {
        q: "What are your opening hours?",
        a: "Monday 10:30 am–7:30 pm; Tuesday 9:30 am–7:30 pm; Wednesday 9 am–7:30 pm; Thursday and Friday 10 am–9 pm; Saturday 11 am–5 pm. Sunday is closed. Appointment availability varies by treatment and is shown in booking.",
      },
      {
        q: "How should I prepare for my first appointment?",
        a: "Allow enough travel time, wear comfortable clothing and review the instructions for your chosen treatment. Tell the clinic in advance about any relevant medical advice or recent procedure that may affect your appointment. You can ask about changing, draping and comfort arrangements before the visit.",
      },
      {
        q: "Does the website enquiry form send my message automatically?",
        a: "No. It prepares a draft in your email application so you can review and send it yourself. If your email app does not open, email info@lymphandwellnessco.com.au or call 0452 599 300. The website does not confirm that an email was sent or received.",
      },
    ],
  },
];
