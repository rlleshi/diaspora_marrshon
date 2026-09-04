export const sourceLanguageValues = ["sq", "en"] as const;

export type SourceLanguage = (typeof sourceLanguageValues)[number];

// "airport" and "new-boulevard" were start points of earlier marches. They stay in the
// enum so pledges stored against them remain valid, but only the current start point is
// offered in the form.
export const joiningPointValues = [
  "airport",
  "new-boulevard",
  "mother-teresa-square",
  "skanderbeg-square",
  "coordinate-later",
] as const;

export type JoiningPoint = (typeof joiningPointValues)[number];

export const participationTypeValues = [
  "full-airport-march",
  "join-in-tirana",
  "volunteer-steward",
  "coordination-support",
] as const;

export type ParticipationType = (typeof participationTypeValues)[number];
