// Refreshes the protest-map counts in lib/map-content.ts from the live Flamingo Map.
// Run whenever the homepage and /harta should show newer numbers:
//   node scripts/refresh-map-snapshot.mjs
//
// The map (github.com/pomodoren/flamingo-map) publishes data/locations.json: one entry
// per city, each with its protests. Outside Albania every protest is a single day, so
// the count is the number of records; a multi-day record counts once per day it has
// already reached. Only the numbers and the two dates in `mapSnapshot` are rewritten.
import { readFileSync, writeFileSync } from "node:fs";

const DATA_URL = "https://pomodoren.github.io/flamingo-map/data/locations.json";
const target = new URL("../lib/map-content.ts", import.meta.url);

const response = await fetch(DATA_URL);
if (!response.ok) throw new Error(`${DATA_URL}: HTTP ${response.status}`);
const cities = await response.json();
if (!Array.isArray(cities)) throw new Error("locations.json is not a list of cities");

const today = new Date().toISOString().slice(0, 10);
const DAY = 86_400_000;
const isIsoDate = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
let protests = 0;
let lastRecord = "";
const abroad = new Set();
const countries = new Set();

for (const city of cities) {
  if (city.country === "Albania") continue;
  let held = 0;
  for (const protest of city.protests ?? []) {
    const start = protest.startDate;
    if (!isIsoDate(start) || start > today) continue; // not held yet
    const end = isIsoDate(protest.endDate) ? protest.endDate : start;
    const last = end > today ? today : end;
    held += Math.round((Date.parse(last) - Date.parse(start)) / DAY) + 1;
    if (last > lastRecord) lastRecord = last;
  }
  if (held > 0) {
    protests += held;
    abroad.add(city.id ?? `${city.city}|${city.country}`);
    countries.add(city.country);
  }
}

const counts = {
  asOf: today,
  lastRecord,
  protestsAbroad: protests,
  citiesAbroad: abroad.size,
  countriesAbroad: countries.size,
};

let source = readFileSync(target, "utf8");
for (const [key, value] of Object.entries(counts)) {
  const pattern = new RegExp(`(\\n  ${key}: )[^,\\n]+,`);
  if (!pattern.test(source)) throw new Error(`mapSnapshot.${key} not found in lib/map-content.ts`);
  source = source.replace(pattern, `$1${typeof value === "string" ? `"${value}"` : value},`);
}
writeFileSync(target, source);

console.log(counts);
console.log("Updated lib/map-content.ts");
