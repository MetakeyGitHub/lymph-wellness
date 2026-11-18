// Client-supplied media, visually reviewed 19 November 2026.
// These films show the actual spaces and equipment, without added audio.
export const clinicFilms = {
  lounge: {
    file: "lounge-walkthrough",
    title: "Step inside the lounge",
    description: "A slow look around the lounge: soft seating, curtains and daylight from the skylight.",
    seconds: 13,
  },
  roller: {
    file: "body-roller",
    title: "A moment on the body rollers",
    description: "Visitors using the body rollers in the clinic’s curtained spaces. Your setup and guidance are provided at your visit.",
    seconds: 3,
  },
  sauna: {
    file: "infrared-sauna",
    title: "Inside the private sauna",
    description: "A look inside the timber-lined infrared sauna, with bench seating, towels and coloured lighting.",
    seconds: 14,
  },
  stairs: {
    file: "infrastep",
    title: "See the Infrastep in motion",
    description: "A visitor using the Infrastep stair-climbing machine beside the clinic windows. Pace and settings are individual.",
    seconds: 10,
  },
  boots: {
    file: "recovery-boots",
    title: "Your recovery space",
    description: "Recovery boots laid out on the lounge chairs, ready for a seated compression session.",
    seconds: 23,
  },
  led: {
    file: "red-light-bed",
    title: "A look at the red light bed",
    description: "The whole-body red light bed illuminated during a session in its dedicated room.",
    seconds: 9,
  },
} as const;

export type ClinicFilmKey = keyof typeof clinicFilms;

export const equipmentFilms: Record<string, ClinicFilmKey> = {
  "lymphatic-drainage-body-roller": "roller",
  "full-body-red-light-therapy-bed": "led",
  "full-spectrum-infrared-sauna": "sauna",
  "vacu-activ-infrastep-stairmill": "stairs",
  "recovery-boots": "boots",
};
