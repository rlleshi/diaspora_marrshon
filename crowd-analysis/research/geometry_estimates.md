# Protest Density Estimation Task

Purpose: keep a recurring checklist and status log for geometric crowd-size estimates based on map distance, occupied footprint, and plausible density bands.

This is separate from the CLIP-EBC visible-frame counts. The geometry estimates are total-footprint capacity scenarios; the CLIP-EBC counts are instantaneous visible people in the camera frame.

## Current Status

| Day | Date | Calculation points | Distance | Footprint assumption | Density band | Estimate | Status |
| ---: | --- | --- | ---: | --- | --- | ---: | --- |
| 21 | 2026-06-20 | [PM side](https://maps.app.goo.gl/fjxLaV6SZWgaL8cx9) to [Skanderbeg side](https://maps.app.goo.gl/CVVyn84XhkECbbEVA) | 663.9 m | Full Skanderbeg Square, about 40,000 m2, plus 35-60 m occupied boulevard corridor | 2.0-3.0 people/m2 | 126k-240k; central working range 175k-210k | Rebuilt |
| 35 | 2026-07-04 | [PM side](https://maps.app.goo.gl/aMoT8XY5P6FfoT469) to [upper corridor point](https://maps.app.goo.gl/cwf7RqT2aF172MSc8); alternative analyst claim: Komisariati Nr. 3 head to Partizani i Panjohur tail | 428.9 m primary; 2.5 km alternative procession | Primary: endpoint-defined corridor only, 35-60 m wide; alternative: 2.5 km moving line with 8-12 m effective width; OSM route-width check suggests about 11-15 m physical corridor average | 1.0-2.0 people/m2 for moving line; 2.5 as upper sensitivity | Primary 30k-50k; 2.5 km line plausible 30k-60k, high sensitivity 75k | Done |

## Method

1. Resolve Google Maps short links to coordinates.
2. Compute straight-line distance between the two points using the haversine formula.
3. Convert distance to occupied area:
   - Corridor-only: `area_m2 = distance_m * occupied_width_m`.
   - Full-square plus corridor: `area_m2 = 40000 + distance_m * occupied_width_m`.
4. Multiply by a plausible average density:
   - Conservative loose crowd: `1.5-2.0 people/m2`.
   - Moderate protest density: `2.0-3.0 people/m2`.
   - Avoid using `4.0 people/m2` as a whole-footprint average unless the visual evidence shows very dense packing across nearly the full area.
5. Compare the result with the CLIP-EBC visible-frame model, but keep the two methods separate.

Skanderbeg Square area reference: about `40,000 m2`, using the public area figure listed for [Skanderbeg Square](https://en.wikipedia.org/wiki/Skanderbeg_Square).

## June 20 Baseline

Resolved points:

- PM side: `41.321204, 19.820378`
- Skanderbeg side: `41.327040, 19.818700`
- Distance: `663.9 m`

The previous full-footprint assumption was: full Skanderbeg Square plus the boulevard corridor from the square to the Prime Minister's office.

| Occupied boulevard width | Area incl. full square | @2.0 people/m2 | @2.5 people/m2 | @3.0 people/m2 |
| ---: | ---: | ---: | ---: | ---: |
| 35 m | 63,236 m2 | 126k | 158k | 190k |
| 45 m | 69,876 m2 | 140k | 175k | 210k |
| 60 m | 79,834 m2 | 160k | 200k | 240k |

Interpretation: with the corrected `2-3 people/m2` density band, the June 20 estimate is roughly `126k-240k`, with `175k-210k` as the central working range. A `250k` claim requires either density a little above `3 people/m2`, a wider occupied footprint, or meaningful spillover into side streets and surrounding areas.

Local model comparison for June 20:

- News24 visible-frame peak: `1247.1`
- Top-10 visible-frame average: `1099.5`
- Mean / median retained visible frame: `213.7 / 173.4`
- TikTok drone clip peak: `847.5`
- TikTok drone clip top-10 average: `777.9`

These frame counts do not verify total attendance; they only show what the camera saw at a given instant.

## July 4 Calculation

Dedicated day note: [day_35_density_estimate.md](day_35_density_estimate.md)

Resolved points:

- PM side: `41.321205, 19.820367`
- Upper corridor point: `41.324987, 19.819356`
- Distance: `428.9 m`

Because the supplied July 4 endpoints stop well short of the earlier Skanderbeg-side point, the primary calculation uses corridor-only area. The density band is also lower than June 20: `1.5-2.5 people/m2`.

### Primary Corridor-Only Scenario

| Occupied corridor width | Corridor area | @1.5 people/m2 | @2.0 people/m2 | @2.5 people/m2 |
| ---: | ---: | ---: | ---: | ---: |
| 35 m | 15,012 m2 | 23k | 30k | 38k |
| 45 m | 19,300 m2 | 29k | 39k | 48k |
| 60 m | 25,734 m2 | 39k | 51k | 64k |

Working interpretation: using only the supplied July 4 corridor and a lower average density, the estimate is about `30k-50k`, with `64k` as a wide/high-density edge case.

### Alternative 2.5 km Procession Claim

Another analyst's description: "Te shtunen vargu i protestes 2.5km; Komisariati Nr. 3 koka, bishti tek Partizani i Panjohur." This is a procession-line claim rather than a full-square capacity claim. Because the streets along that route are not uniformly wide and the density was not consistently high, this scenario should use effective occupied width rather than nominal road width.

Open map data check:

- OSM/Nominatim location for Komisariati Nr. 3: `41.3320946, 19.8114590`.
- OSM/Nominatim location for Ushtari i Panjohur / Partizani i Panjohur: `41.3282030, 19.8219052`.
- OSRM route between those two points is about `1.79 km`, not `2.5 km`. Treat the `2.5 km` statement as an observed procession/crowd-line claim, not the shortest map route.
- Representative OSM tags on the route show mixed street types: `Rruga e Bogdaneve` as 1 lane with sidewalks, parts of `Rruga e Durresit` as 1-2 lanes with sidewalks, and `Rruga Dede Gjo Luli` as 3-4 lanes with sidewalks.
- A segment-weighted physical corridor estimate from those route classes is about `11-15 m`, midpoint about `13 m`. Because not every street was full curb-to-curb, the working estimate should still use a lower effective occupied width: `8-12 m`, with `15 m` only as a sensitivity case.

Formula: `people = 2500 m * effective_width_m * average_density`.

| Effective occupied width | Procession area | @1.0 people/m2 | @1.5 people/m2 | @2.0 people/m2 | @2.5 people/m2 |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 8 m | 20,000 m2 | 20k | 30k | 40k | 50k |
| 10 m | 25,000 m2 | 25k | 38k | 50k | 63k |
| 12 m | 30,000 m2 | 30k | 45k | 60k | 75k |
| 15 m | 37,500 m2 | 38k | 56k | 75k | 94k |
| 20 m | 50,000 m2 | 50k | 75k | 100k | 125k |

Working interpretation: if the `2.5 km` procession-line claim is correct, the plausible range is still close to `30k-50k` when using `8-10 m` effective width and `1.5-2.0 people/m2`. A slightly higher but still defensible band is `45k-60k` if the average effective width was closer to `12 m`. The OSM-derived physical corridor midpoint around `13 m` would imply roughly `49k-66k` at `1.5-2.0 people/m2`, but that assumes almost the whole physical corridor was occupied. Estimates above `75k` require either a broad average occupied width around `15 m+`, a density near `2.0+ people/m2` for the whole line, or both.

### Optional Full-Square Scenario

This is not the primary July 4 estimate unless the footage supports the full Skanderbeg Square being occupied at the same time. It is included only to show sensitivity to the old June 20 assumption.

| Occupied corridor width | Area incl. full square | @1.5 people/m2 | @2.0 people/m2 | @2.5 people/m2 |
| ---: | ---: | ---: | ---: | ---: |
| 35 m | 55,012 m2 | 83k | 110k | 138k |
| 45 m | 59,300 m2 | 89k | 119k | 148k |
| 60 m | 65,734 m2 | 99k | 131k | 164k |

Working interpretation: if a full-square assumption is added, July 4 becomes roughly `90k-130k` under lower density assumptions, with `164k` as the high edge. This overlaps the low end of the June 20 range but does not exceed the June 20 central working range under the same conservative logic.

## June 20 vs July 4

Local model comparison:

| Day | Peak | Top-10 avg | Mean | Median |
| ---: | ---: | ---: | ---: | ---: |
| 21, 2026-06-20 | 1247.1 | 1099.5 | 213.7 | 173.4 |
| 35, 2026-07-04 | 1435.6 | 1132.9 | 242.5 | 199.2 |

The CLIP-EBC visible-frame model makes July 4 higher than June 20, but not massively higher: about `+15%` on raw peak, `+3%` on top-10 average, and about `+14-15%` on mean/median retained frames.

The geometric method depends much more on the footprint. With the supplied July 4 endpoints and lower density, July 4 is not larger than the rebuilt June 20 geometric estimate. The alternative `2.5 km` procession-line claim supports the `30k-50k` working range and can stretch toward `60k` under a wider effective-width assumption. To argue that July 4 was much larger by total attendance, we would need evidence that the occupied footprint extended substantially beyond a narrow procession line, included the full square, or had major side-street spillover.

## Recurring Task

For every new geometric estimate:

1. Record the day number, date, and source links for the map points.
2. Resolve each map link to coordinates.
3. Compute the point-to-point distance.
4. State whether the estimate is corridor-only, full-square plus corridor, or includes additional spillover areas.
5. Record occupied-width scenarios.
6. Record density scenarios and justify why they are lower, moderate, or high.
7. Save the calculation table and final working range in this file.
8. Compare briefly with the local CLIP-EBC visible-frame statistics.

## Notes

- Do not treat portal attendance claims as verified counts.
- Do not treat CLIP-EBC visible-frame counts as unique attendee totals.
- Avoid `4 people/m2` unless the full footprint is visibly packed at that density.
- Always label whether Skanderbeg Square is included. Adding the full square changes the estimate by tens of thousands of people.
