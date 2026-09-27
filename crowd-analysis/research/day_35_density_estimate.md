# Day 35 Density Estimate, July 4

Purpose: preserve the geometric crowd-size estimate for the July 4 / Day 35 protest. This is a footprint-and-density estimate, not a CLIP-EBC visible-frame count.

## Inputs

- Protest day: 35
- Calendar date: 2026-07-04
- News24 stream: https://www.youtube.com/watch?v=LPBjPPJiU6w
- Local visible-frame report (generated; not committed): `outputs/protesta_35/LPBjPPJiU6w_protesta-e-35-qytetar-t-k-rkojn-dor-heqjen-e-edi-ram-s-ju-erdhi-fundi_00h20m00s-06h02m06s_cand1000_min100p0_scenes/scene_report.md`
- Geometry tracker: [geometry_estimates.md](geometry_estimates.md)

## Primary Map-Point Calculation

Supplied points:

- PM-side point: https://maps.app.goo.gl/aMoT8XY5P6FfoT469
- Upper corridor point: https://maps.app.goo.gl/cwf7RqT2aF172MSc8

Resolved coordinates:

- PM-side point: `41.321205, 19.820367`
- Upper corridor point: `41.324987, 19.819356`
- Straight-line distance: `428.9 m`

Because these endpoints stop short of the older Skanderbeg-to-PM footprint used for June 20, this calculation is treated as corridor-only.

| Occupied corridor width | Corridor area | @1.5 people/m2 | @2.0 people/m2 | @2.5 people/m2 |
| ---: | ---: | ---: | ---: | ---: |
| 35 m | 15,012 m2 | 23k | 30k | 38k |
| 45 m | 19,300 m2 | 29k | 39k | 48k |
| 60 m | 25,734 m2 | 39k | 51k | 64k |

Primary working range: `30k-50k`.

## Alternative 2.5 km Procession Claim

External analyst claim: "Te shtunen vargu i protestes 2.5km; Komisariati Nr. 3 koka, bishti tek Partizani i Panjohur."

Open map check:

- OSM/Nominatim location for Komisariati Nr. 3: `41.3320946, 19.8114590`
- OSM/Nominatim location for Ushtari i Panjohur / Partizani i Panjohur: `41.3282030, 19.8219052`
- OSRM shortest mapped route between those points: about `1.79 km`

So the `2.5 km` value should be treated as an observed procession-line claim, not the shortest map route. OSM route tags show mixed streets: 1-lane residential near Komisariati Nr. 3, 1-2 lane segments on Rruga e Durresit, wider 3-4 lane segments on Rruga Dede Gjo Luli, plus central pedestrian/boulevard sections. A segment-weighted physical corridor estimate is about `11-15 m`, midpoint about `13 m`, but the crowd likely did not occupy the full physical corridor everywhere.

Use effective occupied width rather than nominal road width:

| Effective occupied width | Procession area | @1.0 people/m2 | @1.5 people/m2 | @2.0 people/m2 | @2.5 people/m2 |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 8 m | 20,000 m2 | 20k | 30k | 40k | 50k |
| 10 m | 25,000 m2 | 25k | 38k | 50k | 63k |
| 12 m | 30,000 m2 | 30k | 45k | 60k | 75k |
| 15 m | 37,500 m2 | 38k | 56k | 75k | 94k |

Interpretation: `30k-50k` remains the clean working range if the effective width was around `8-10 m` and density averaged `1.5-2.0 people/m2`. A stretch range toward `60k` is defensible if the effective width was closer to `12 m`. Estimates above `75k` require broad curb-to-curb occupation or higher density across nearly the whole line.

## Full-Square Sensitivity

This is not the primary estimate unless footage supports Skanderbeg Square being occupied at the same time.

| Occupied corridor width | Area incl. full square | @1.5 people/m2 | @2.0 people/m2 | @2.5 people/m2 |
| ---: | ---: | ---: | ---: | ---: |
| 35 m | 55,012 m2 | 83k | 110k | 138k |
| 45 m | 59,300 m2 | 89k | 119k | 148k |
| 60 m | 65,734 m2 | 99k | 131k | 164k |

If the full-square assumption is added, July 4 becomes roughly `90k-130k`, with `164k` as the high edge. This is a sensitivity case, not the current working estimate.

## Comparison With CLIP-EBC

Local visible-frame model:

- Day 35 / July 4 raw peak: `1435.6`
- Top-10 visible-frame average: `1132.9`
- Mean / median retained frame: `242.5 / 199.2`

Comparison baseline:

- Day 21 / June 20 raw peak: `1247.1`
- Top-10 visible-frame average: `1099.5`
- Mean / median retained frame: `213.7 / 173.4`

The visible-frame model makes July 4 higher than June 20, but not by a large margin: about `+15%` on raw peak, `+3%` on top-10 average, and `+14-15%` on mean/median. The geometric working estimate for July 4 remains `30k-50k`, stretchable toward `60k` if the `2.5 km` line and `12 m` effective width are accepted.

## Working Conclusion

Use `30k-50k` as the main July 4 total-attendance estimate from geometry. Mention `~60k` only as a reasonable upper extension under the 2.5 km procession-line scenario. Avoid higher claims unless there is visual evidence of full-square occupancy, wide curb-to-curb procession width, or substantial side-street spillover.
