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

**Recent research files no longer carry the top-10 average**: it stops
appearing around day 94, and from day 115 the Graph Relevance section is gone
altogether (days 108 to 120 were already computed from the run, as their
header comments say). Their Snapshot gives a single-frame raw peak, a "strongest 10-sample window"
(contiguous, not the top-10 average) and whole-run retained mean/median. None
of those is the published input. Compute all three from the run itself,
`/home/rejnald/projects/miscellaneous/albanian/demos/outputs/protesta_N/*_scenes/timeline.json`:
keep frames with `ensemble_count >= 100`, then build a contact sheet of each
scene's highest kept frame and look at it. Drop every blue-framed split
(crowd beside a speaker, studio or press conference) and every studio shot in
front of a crowd video wall, from the peak *and* the mean/median (the day
118/120 treatment). A mean of the frame's outer ring, blue minus red, flags
blue-framed splits well (they score about +75 to +100, single street views
under +30), but blue street lighting can push a clean view to +50 and a
studio video wall scores about +10, so the sheet decides. Then `peak` = mean
of the 10 highest clean frames, `mean`/`median` = over all clean frames,
rounded to 0.1 before normalizing. Also check the run finished after the
research file was written: day 121's note called its run incomplete, but the
run completed twelve minutes later. Record the retained count, what was
dropped and what keeping it would have read in the header comment, and say so
when retention is unusually thin (day 124 kept 19 of 1562).

## 2. Normalize the three numbers

The tracker stores everything as an index where Day 7's top-10 peak average
(2582.5) equals 50 index points (Day 21 and 35 are separately anchored to
on-the-ground geometry estimates and aren't part of this formula — every
other day, including the new one, is).

```
stored = round(raw * 50 / 2582.5, 2)
```

Apply it to all three raw inputs independently:
- `peak` ← top-10 highest-frame average (from Graph Relevance, or computed
  from the run when the research file lacks it, see step 1)
- `mean` ← Mean visible estimate (from Snapshot, or the clean-frame mean)
- `median` ← Median visible estimate (from Snapshot, or the clean-frame median)

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

Three standing rules the user has corrected notes for more than once. Apply
them while drafting rather than waiting to be told:

- **No singular activist names.** The source file names individuals freely;
  the site refers to participants collectively — "aktivistë", "protestuesit",
  "qytetarë", "disa aktivistë të ndaluar për pak kohë". Public figures acting
  publicly in their own right (a foreign journalist's question to Rama, a
  politician's statement) are fine — the rule is about protesters.
- **No em-dashes.** Use a comma, a colon, or `;`.
- **No closing times.** The source almost always records when the march ended
  ("mbyllet në 22:36") — leave it out. Times that are part of a *call to
  action* ("mbledhja para Kuvendit nesër në orën 08:30") do belong.

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

The homepage tracker teaser needs **no** edit: `lib/content.ts` derives
`protestDays` from `participation.length`, so its title and stat tile follow
automatically. Its body copy deliberately states no duration, to keep it from
drifting out of step with that number — don't reintroduce one.

Separately, `COPY.*.intro` on the tracker page carries a hardcoded *duration*
("një lëvizje tremujore" / "a three-month movement") rather than a day count,
so grepping for `N-1` won't surface it. Check it whenever the movement crosses
a month boundary.

## 6. Optional: check for a new local extreme

If the new day is a new high or new low relative to recent days (the Story
Note's comparison paragraphs usually say this explicitly — "lowest since
Day X", "strongest since Day Y"), consider whether it's worth a marker in
the `participationEvents` array further down `data/participation.ts`
(secondary tier, `spark` icon is the usual choice — see the Day 50 "Dita më
e dobët" / "The weakest day" entry as precedent). This is an editorial
judgment call, not a required step — only add one when the extreme is
genuinely notable, not for routine day-to-day fluctuation.

**You no longer place the marker by hand.** `ParticipationChart.tsx` used to
carry a `LABEL_Y` table with a hand-tuned y for every marker, which had to be
re-tuned every time a day shifted the x-positions. It is gone. `placeChips()`
lays labels out automatically and drops any that can't find a clear slot. Two
consequences when writing a marker:

- **Keep `label` and `sub` short.** Chip width is *estimated* from character
  count (~6.4px/char on narrow screens, ~7.1 wide), never measured — the same
  numbers have to come out on the server and the client. A long label makes a
  wide chip, and wide chips get dropped from crowded views. Existing labels run
  ~15-28 characters.
- **A marker is not guaranteed a label on the chart.** Only a few fit any given
  view. Across the full range that is the peak plus the non-secondary days that
  stand out: on the default log view, days at least twice the median of the
  seven days either side (`LOG_CHIP_PROMINENCE` in `ParticipationChart.tsx`); on
  the linear view, days clearing 30% of the axis. A recent day sitting at the
  level of its neighbours will show its dot but no wording. That's by design. Every marker always appears in the
  "Momentet kyçe" rail below the chart, which is the reliable surface, and its
  label does show once the reader zooms into a week or month containing it.

## 7. Verify

Run `npm run typecheck` and confirm it's clean. Don't run a full build or
restart the dev server unless something looks off or the user asks — a
clean typecheck has been sufficient for this recurring task.

Don't commit or push — this repo's standing rule is to only do that when
the user explicitly asks.

## Background: how the chart absorbs new days

Most of the chart follows `participation` on its own — the week strip
(`WEEKS`) and the month range chips (`CALENDAR_MONTHS`) are both derived from
it, so new days extend them with no edit. A new calendar month joins the
range chips once it has 4 days in it (`MIN_MONTH_DAYS`).

The chart has three views behind the switcher above it: **log** (the default),
**linear**, and **calendar** (`CalendarView.tsx`). All three are derived from
`participation` too, so a new day needs no edit to any of them: the calendar
grows a square (and a new week column every seven days), its legend counts
("{below} of {total} nights sit below 10") fill themselves in, and the log axis
picks its own floor from the lowest peak or mean. The calendar's colour steps
(`BREAKS` = 4 / 5 / 6.5 / 11 / 30) are fixed by hand for today's distribution;
revisit them only if most new nights start landing in a single step.

If you ever do need to touch label placement, the one trap that has already
caused two bugs: **chip geometry is in CSS pixels, not viewBox units.** Chips
are HTML positioned over the SVG, so their text does not scale with the
viewBox — at phone width the box compresses ~2.8x while the text does not.
`placeChips()` converts through `unitsPerCss`, derived from a `ResizeObserver`
on the chart element; treating the two units as interchangeable silently
under-counts overlap by that factor. Relatedly, the peak chip is *top*-anchored
below 720px and centre-anchored above it, which is why `PlacedChip` carries
both `y` (the value handed to CSS) and `cy` (the true centre used for
collision). Verify any change at several widths, not just desktop —
`google-chrome --headless=new --window-size=390,1000 --screenshot=out.png`
against the dev server is enough.
