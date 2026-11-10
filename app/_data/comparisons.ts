export const comparisonGroups = [
  {
    id: "lymphatic",
    label: "Lymphatic massage",
    slug: "lymphatic-drainage-melbourne",
    title: "Your time for lymphatic care.",
    intro:
      "Compare our two massage appointment lengths and the separately named EMS combination. Each choice opens its exact service in booking.",
    note: "The 90-minute option provides a longer appointment. Specific treatment areas and the balance of consultation and treatment time are discussed with the clinic; a longer visit does not imply a different technique or guaranteed result.",
    options: [
      {
        code: "LWC001",
        label: "60-minute visit",
        inclusion: "Lymphatic drainage massage",
        detail: "Our shorter standalone body lymphatic massage appointment.",
      },
      {
        code: "LWC002",
        label: "90-minute visit",
        inclusion: "Lymphatic drainage massage",
        detail: "A longer appointment within the same treatment family.",
      },
      {
        code: "LWC003",
        label: "Massage + EMS",
        inclusion: "Lymphatic drainage massage + abdominal EMS",
        detail:
          "A separately bookable combination. Confirm suitability with the team.",
      },
    ],
  },
  {
    id: "facial",
    label: "Facial care",
    slug: "facial-sculpting-melbourne",
    title: "Find your kind of facial care.",
    intro:
      "Facial massage, cupping, light therapy and Qi treatments are distinct appointments. Compare what is named in each option.",
    note: "Cupping and LED are included only where named. Ask the team about the techniques and preparation for your selected facial, especially if you have recently had a skin procedure.",
    options: [
      {
        code: "LWC008",
        label: "Facial massage",
        inclusion: "Ultra Sculpt facial massage",
        detail: "The standalone Ultra Sculpt facial massage appointment.",
      },
      {
        code: "LWC009",
        label: "Massage + cupping",
        inclusion: "Facial massage + facial cupping",
        detail: "The deluxe option combines these two named treatments.",
      },
      {
        code: "LWC010",
        label: "Cupping + LED",
        inclusion: "Facial cupping + 20-minute LED red light therapy",
        detail: "The named light-therapy combination in the facial menu.",
      },
      {
        code: "LWC023",
        label: "Qi facial",
        inclusion: "Signature Qi Facial Therapy",
        detail:
          "A separate Qi facial appointment; ask the team about the treatment experience.",
      },
      {
        code: "LWC024",
        label: "Qi eye",
        inclusion: "Signature Qi Eye Therapy",
        detail: "The shorter, eye-focused Qi appointment.",
      },
    ],
  },
  {
    id: "ems",
    label: "EMS sessions",
    slug: "ems-body-sculpting-melbourne",
    title: "Choose your EMS appointment.",
    intro:
      "Single and double sessions have different appointment lengths and prices. Compare the visits before choosing a time.",
    note: "The catalogue does not define treatment-area coverage for these labels. Confirm the intended area and plan with the clinic. Session packs are separate purchases and do not reserve appointment times.",
    options: [
      {
        code: "LWC011",
        label: "Single session",
        inclusion: "EMS — single session",
        detail: "The shorter EMS appointment listed in the menu.",
      },
      {
        code: "LWC012",
        label: "Double session",
        inclusion: "EMS — double session",
        detail: "The longer EMS appointment listed in the menu.",
      },
    ],
  },
] as const;

export type ComparisonGroup = (typeof comparisonGroups)[number];
