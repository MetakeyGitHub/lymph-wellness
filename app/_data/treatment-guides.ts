export const treatmentGuides: Record<
  string,
  {
    codes: string[];
    sections: { title: string; copy: string }[];
    faqs: { q: string; a: string }[];
  }
> = {
  "lymphatic-drainage-melbourne": {
    codes: ["LWC001", "LWC002", "LWC003"],
    sections: [
      {
        title: "Choose the time that fits your visit",
        copy: "Our core lymphatic massage appointments are 60 or 90 minutes. The longer appointment gives you a different amount of time with your practitioner; it does not promise a particular result. A separate combined option includes abdominal EMS. Compare the named services below so you know which appointment you are reserving.",
      },
      {
        title: "Know the care you are booking",
        copy: "This page describes our wellness massage appointments. If your enquiry relates to diagnosed lymphoedema, unexplained swelling or a recent operation, speak with your treating professional and contact the clinic before booking. Our post-operative page explains that separate booking pathway.",
      },
    ],
    faqs: [
      {
        q: "Can I choose a 60- or 90-minute appointment online?",
        a: "Yes. Each option below links directly to its own service in the booking portal. Choose an available date and time there and check the final appointment details before confirming.",
      },
      {
        q: "Is the massage and EMS combination the same service?",
        a: "No. It is a separately named 60-minute combined appointment with its own price. Book it only if that combination is what you want and suitability has been discussed.",
      },
      {
        q: "Where can I read about preparation?",
        a: "Our preparation guide covers practical questions about clothing, what to share with the clinic and what to ask before your appointment. The clinic’s instructions and your treating practitioner’s advice take priority for your individual visit.",
      },
    ],
  },
  "facial-sculpting-melbourne": {
    codes: ["LWC008", "LWC009", "LWC010", "LWC023", "LWC024"],
    sections: [
      {
        title: "Five different ways to make time for facial care",
        copy: "Ultra Sculpt facial massage, the deluxe massage with facial cupping, facial cupping with LED, Signature Qi Facial Therapy and Signature Qi Eye Therapy are separate menu choices. Their prices and appointment lengths differ. The shortest listed visit is the 20-minute Qi eye appointment; the full facial appointments are 40 or 45 minutes.",
      },
      {
        title: "Choose by the experience, then confirm suitability",
        copy: "Read the full treatment name rather than assuming each facial includes cupping or light therapy. Let the clinic know about recent skin procedures, injectables or sensitivity before reserving a visit. Your practitioner can help clarify what is included in the option you are considering.",
      },
    ],
    faqs: [
      {
        q: "Does every facial include LED?",
        a: "No. The menu has a specifically named facial cupping and LED combination. Other facial appointments should not be assumed to include LED unless the clinic confirms it.",
      },
      {
        q: "Can I book just an eye treatment?",
        a: "Yes. Signature Qi Eye Therapy is a separate 20-minute appointment. Its link below selects that option directly.",
      },
      {
        q: "Is facial sculpting a permanent reshaping treatment?",
        a: "No permanent reshaping should be expected from a wellness facial massage. Choose it for the treatment experience with realistic expectations, and discuss any specific concerns with your practitioner.",
      },
    ],
  },
  "ems-body-sculpting-melbourne": {
    codes: ["LWC011", "LWC012"],
    sections: [
      {
        title: "Single visits and a planned series",
        copy: "The online menu offers a 35-minute single EMS session and a 65-minute double session. These are separate appointment choices. Session packs for one area are listed on our experiences and packs page; purchasing a pack is separate from booking each appointment.",
      },
      {
        title: "Make an informed start",
        copy: "Discuss the intended treatment area, what a session involves and whether EMS is suitable for you before committing to a series. Let the clinic know about relevant health information or implanted devices. A session length or pack size does not guarantee a particular body change.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a single and double session?",
        a: "The catalogue lists them as separate 35- and 65-minute appointments at different prices. Ask the clinic which appointment matches your intended treatment area and plan before booking.",
      },
      {
        q: "Do EMS packs reserve my appointments?",
        a: "No. A pack is purchased first and appointments are booked separately. Review the pack’s inclusions and expiry and check availability for the schedule you want.",
      },
      {
        q: "Can I book an introductory offer?",
        a: "Only the current public options shown in our treatment and pack menus are offered here. Earlier launch promotions may have finished, so use the price shown for the exact option you choose.",
      },
    ],
  },
};
