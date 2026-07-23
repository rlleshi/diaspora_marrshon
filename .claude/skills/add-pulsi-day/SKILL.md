---
name: add-pulsi-day
description: Add a new day entry to the /pulsi protest participation tracker in this repo (diaspora_zbarkon), pulling raw crowd-model numbers and the narrative summary from the sibling research repo. Use this whenever the user says a new protest day's data/analysis is available and asks to add it to pulsi — phrasing like "add day N to pulsi", "day N is available now, add it", "the ML results for day N are ready". Covers both the numeric normalization and writing the bilingual (sq/en) story note in house style, plus bumping every hardcoded day-count on the site.
---

# Add a day to the pulsi tracker

This is a recurring task: a sibling project produces per-day crowd-model
statistics and a research writeup for the ongoing protest series, and that
data needs to land in this site's `/pulsi` participation index — as a new
normalized data point *and* as a short bilingual story note, plus every
hardcoded "N days" reference on the site kept in sync.

Don't skip straight to guessing numbers or inventing prose. Read the actual
source file first; every number and every claim in the note must trace back
to it.

## 1. Find and read the source file

The source lives in a **different repo**, not this one:

```
/home/rejnald/projects/miscellaneous/albanian/demos/outputs/protesta_summary/protest_story_notes_1_N.md
```

where `N` is the new day number. It's an incremental extension file — it
only documents day `N`, referencing the previous file for earlier days. If
that exact file doesn't exist yet, check `ls` on that directory for the
highest available `protest_story_notes_1_*.md` and confirm the day number
with the user before proceeding — don't assume data exists that hasn't been
produced yet.

Read the whole file. It has four sections that matter here:

- **`## Day N Snapshot`** — raw stats: calendar date (with weekday
  abbreviation), the News24 YouTube stream link (`?v=VIDEO_ID`), and
  `Median visible estimate` / `Mean visible estimate`.
- **`## Story Note`** — several paragraphs of narrative analysis: what
  changed vs. recent days, what the footage actually shows, the core
  demands/slogans, day-specific developments (speeches, government
  responses, mobilization calls), and how the evening closed.
- **`## Graph Relevance`** (at the very end) — the **top-10 highest-frame
  average** (this is the raw `peak` input, distinct from the single-frame
  "Peak visible estimate" in the Snapshot — always use the top-10 average,
  not the single-frame max) and a suggested short annotation line.

## 2. Normalize the three numbers

The tracker stores everything as an index where Day 7's top-10 peak average
(2582.5) equals 50 index points (Day 21 and 35 are separately anchored to
on-the-ground geometry estimates and aren't part of this formula — every
other day, including the new one, is).

```
stored = round(raw * 50 / 2582.5, 2)
```

Apply it to all three raw inputs independently:
- `peak` ← top-10 highest-frame average (from Graph Relevance)
- `mean` ← Mean visible estimate (from Snapshot)
- `median` ← Median visible estimate (from Snapshot)

**Verify before trusting it**: recompute the formula against the most
recent existing day already in `data/participation.ts` (its raw inputs are
recorded in that day's header comment, see step 3) and confirm you reproduce
its stored `peak`/`mean`/`median` exactly. Only then apply it to the new
day's raw numbers.

Also work out `saturday` from the calendar date (Saturdays: days 7, 14, 21,
28, 35, 42, 49, 56, ...).

## 3. Write the story note (sq + en)

Open `data/participation.ts` and read the last 5-10 entries in the
`participation` array to recalibrate on house style before writing anything.
Established conventions:

- One sentence, occasionally two clauses joined by `;` — not a paragraph.
  Existing notes run roughly 15-40 words in Albanian.
- Dry, factual, present tense. No hedging language, no "it seems" — state
  what happened.
- Weekday-flavored openers are common for non-Saturday days ("E mërkura...",
  "E enjtja...", "Të dielën...") but not mandatory — plenty of notes just
  state the fact.
- Informal PM nickname convention: Albanian text may use **"mjekrra"** /
  "mjekrrës" / "mjekërroshi bardhërosh" (references his grey beard) when the
  note is being informal/pointed about Rama personally. In **English, this
  always renders as plain "Rama"** — it is never translated as a nickname.
  Check the last few entries for live examples before choosing whether a
  given note calls for the nickname or the plain name.
- Numbers/dates/times mentioned in the note should be verbatim-accurate
  against the source file (e.g. an explicit mobilization call with a date
  and time is exactly the kind of detail that belongs in the note).

Draft the Albanian note first, pulling the single most newsworthy thread out
of the Story Note section — usually one of: a notable rebound/dip and why,
a new mobilization call/date, a government response or policy clash, a
notable route or symbolic moment. The Graph Relevance suggested annotation
is a useful compass for *what's graph-worthy* but is written in a more
clinical register than the site's notes — don't paste it verbatim, use it to
confirm you've picked the right thread. Then translate to English following
the mjekrra→Rama rule above and the existing en notes' phrasing register.

If the user gives you an explicit trim/edit instruction for the note (e.g.
"just keep this part..."), apply it to both locales in parallel even if
they only wrote the instruction in one language — the sq/en notes are a
synchronized pair throughout this file, never let them drift out of sync.

## 4. Edit `data/participation.ts`

Two edits, both near the end of the file:

1. Append one comment line/block above the `participation` array (it's a
   running log — match the exact phrasing pattern of the immediately
   preceding day):
   ```
   // Day N computed from the protesta_N timeline, retained frames only (top-10 peak
   // avg <raw peak>, mean <raw mean>, median <raw median>), normalized on the same Day-7 reference.
   ```
2. Append the new entry as the last element of the `participation` array,
   before the closing `];`:
   ```ts
   { day: N, date: "YYYY-MM-DD", saturday: <bool>, peak: <stored>, mean: <stored>, median: <stored>, source: yt("VIDEO_ID"),
     note: { sq: "...", en: "..." } },
   ```

## 5. Bump every hardcoded day count

Adding a day means the site's day-count strings go stale in **three
files, four spots** — grep for the old number (`N-1`) to be sure you catch
every instance before editing:

- `app/pulsi/page.tsx` — metadata `description`: `"N ditë"`
- `app/en/pulsi/page.tsx` — metadata `description`: `"N days"`
- `components/live-tracker-page.tsx`:
  - `COPY.sq.title` (e.g. `"N ditë në shesh për një mjekërrosh bardhërosh"`)
  - `COPY.en.title` (e.g. `"N days in the square for a grey-bearded Rama"`)
  - `COPY.sq.labels.ariaSummary` (`"...përgjatë N ditëve..."`)
  - `COPY.en.labels.ariaSummary` (`"...across N days..."`)

## 6. Optional: check for a new local extreme

If the new day is a new high or new low relative to recent days (the Story
Note's comparison paragraphs usually say this explicitly — "lowest since
Day X", "strongest since Day Y"), consider whether it's worth a marker in
the `participationEvents` array further down `data/participation.ts`
(secondary tier, `spark` icon is the usual choice — see the Day 50 "Dita më
e dobët" / "The weakest day" entry as precedent). This is an editorial
judgment call, not a required step — only add one when the extreme is
genuinely notable, not for routine day-to-day fluctuation.

## 7. Verify

Run `npm run typecheck` and confirm it's clean. Don't run a full build or
restart the dev server unless something looks off or the user asks — a
clean typecheck has been sufficient for this recurring task.

Don't commit or push — this repo's standing rule is to only do that when
the user explicitly asks.
