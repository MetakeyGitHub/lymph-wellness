import { findOffer, formatPrice } from "./offerings";
const describe = (code: string) => {
  const o = findOffer(code);
  return `${o.minutes} minutes at ${formatPrice(o.price)}`;
};
export const equipmentGuides: Record<string, { q: string; a: string }[]> = {
  "lymphatic-drainage-body-roller": [
    {
      q: "Which body roller session should I book?",
      a: `Choose the 30-minute body roller session at ${formatPrice(findOffer("LWC018").price)} or the 45-minute option at ${formatPrice(findOffer("LWC025").price)}. These are separate appointments in the treatment menu. Ask the team which length suits your first visit.`,
    },
    {
      q: "Can I combine rollers with recovery boots?",
      a: `Yes. Roll + Recover combines the two in one appointment: ${describe("RR")}. Select that named experience in the packages menu to book the combined visit.`,
    },
    {
      q: "Is the body roller the same as hands-on lymphatic massage?",
      a: "No. The roller is an equipment-based session. Hands-on lymphatic drainage is a separate practitioner appointment with its own treatment approach, length and price. Read each description before choosing.",
    },
  ],
  "full-body-red-light-therapy-bed": [
    {
      q: "How much is a red light bed appointment?",
      a: `The individual full-body LED red light bed appointment is ${describe("LWC017")}. Combined experiences and session packs have their own prices and inclusions.`,
    },
    {
      q: "Is this the same as LED facial light therapy?",
      a: "No. The full-body bed and LED face light therapy are separate services. Choose the exact named option in the treatment menu; an individual bed booking does not include a facial massage.",
    },
    {
      q: "What should I check before my first session?",
      a: "Ask the team about preparation, eye protection and suitability for the equipment. Tell them about relevant medication, skin sensitivity, recent procedures or advice from your treating practitioner before booking.",
    },
  ],
  "full-spectrum-infrared-sauna": [
    {
      q: "How long is a private sauna appointment?",
      a: `The individual sauna appointment is ${describe("LWC019")}. Check the booking details and ask about arrival, preparation and changing arrangements before your first visit.`,
    },
    {
      q: "Can two or more people book together?",
      a: `Private Sauna Social is a 45-minute appointment for two at ${formatPrice(findOffer("PSS").price)}. Private Sauna Group is a 45-minute appointment for up to five at ${formatPrice(findOffer("PSG").price)}. Book the correct group option from our experiences menu.`,
    },
    {
      q: "Is private sauna included in a machine membership?",
      a: "Private sauna is not included in the standard membership machine choices. Individual sauna appointments and the five-session sauna pack are available separately. The five-session pack is listed as valid for one year from purchase.",
    },
  ],
  "vacu-activ-treadmill-v3": [
    {
      q: "How long is the Vacuactiv treadmill session?",
      a: `The individual treadmill appointment is ${describe("LWC021")}. The team can explain the machine and discuss appropriate settings before use.`,
    },
    {
      q: "Is the treadmill included in membership?",
      a: "The Vacuactiv treadmill is one of the eligible machine choices in the current monthly plans. Check your selected plan’s session allowance and terms; purchasing a membership does not reserve appointment times.",
    },
    {
      q: "Is this the same as the stair-climbing machine?",
      a: "No. The treadmill is a walking session, while the Infrastep is a stair-climbing session. They have separate booking options. Ask the team about the experience and suitability before choosing.",
    },
  ],
  "vacu-activ-infrastep-stairmill": [
    {
      q: "How long is an Infrastep appointment?",
      a: `The individual Vacuactiv StairMaster appointment is ${describe("LWC022")}. The team can explain the machine and help you understand the settings before use.`,
    },
    {
      q: "Can I use a membership session for the StairMaster?",
      a: "The Vacuactiv StairMaster is included in the listed machine choices for the current monthly plans. Your selected plan determines the allowance. Review the membership terms and available appointment times before joining.",
    },
    {
      q: "Does a machine session guarantee weight loss?",
      a: "No. A session does not guarantee weight loss or a particular body-composition change. Choose it for an experience that suits your comfort and goals, and follow any medical advice about activity.",
    },
  ],
  "recovery-boots": [
    {
      q: "How much is a recovery boots appointment?",
      a: `The individual recovery boots appointment is ${describe("LWC020")}. It can be selected directly from the wellness machine category in the treatment menu.`,
    },
    {
      q: "Can I add body rollers to my visit?",
      a: `Roll + Recover combines body rollers and recovery boots in one ${findOffer("RR").minutes}-minute appointment at ${formatPrice(findOffer("RR").price)}. Choose that experience to book both together.`,
    },
    {
      q: "Can I book boots after surgery?",
      a: "Do not assume that a recovery boots appointment is suitable after surgery. Speak with your treating team and the clinic before booking, and share any restrictions you have been given.",
    },
  ],
};
