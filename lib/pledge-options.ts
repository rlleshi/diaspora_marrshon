export const sourceLanguageValues = ["sq", "en"] as const;

export type SourceLanguage = (typeof sourceLanguageValues)[number];

export const joiningPointValues = [
  "airport",
  "new-boulevard",
  "train-station",
  "prime-minister-office",
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
