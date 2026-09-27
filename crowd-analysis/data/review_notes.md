# Published-Series Review Notes

Copied from data/participation.ts on 2026-09-27. These notes record the model outputs, visual-audit decisions, source corrections, and geometry anchors used for the current published index.

Source-series methodology and per-day review notes (snapshot: 2026-09-27).

Source: News24 live broadcasts of each day's protest in Tirana, analyzed with a
crowd-counting model. The headline series is `peak` (top-10 peak frame average).
The anchor days (7, 21 and 35 / 6, 20 June and 4 July) are tied to on-the-ground
geometry estimates so 100 = the largest day (Day 21, 20 June 2026); every other day
scales the model output on the same Day-7 reference (top-10 avg 2582.5 -> index 50).
`mean` and `median` are the same crowd model over the retained broadcast frames.

Data: [crowd_visibility_index_1_30.csv](crowd_visibility_index_1_30.csv) (days 1-30; preliminary 100-point scale)
Story research: outputs/protesta_summary/protest_story_notes_1_50.md in the demo workspace (not required for the crowd calculations)
Day 31 computed from the protesta_31 timeline (top-10 peak avg 697.6, mean 229.9,
median 212.5), normalized on the same Day-7 reference as days 1-30.
Day 32 computed from the protesta_32 timeline, retained frames only (top-10 peak
avg 327.6, mean 190.6, median 176.5), normalized on the same Day-7 reference.
Day 33 computed from the protesta_33 timeline, retained frames only (top-10 peak
avg 389.3, mean 216.1, median 215.0), normalized on the same Day-7 reference.
Days 34-37 computed from the protesta_34..37 timelines, retained frames only
(top-10 peak avgs 299.8 / 1132.9 / 365.3 / 267.6; means 174.2 / 242.5 / 191.3 / 156.5;
medians 174.4 / 199.2 / 186.5 / 154.8), normalized on the same Day-7 reference.
Day 35 (4 July) is geometry-anchored like days 7 and 21: the ground estimate of
~60k (upper extension of the 30k-50k working range, 2.5 km procession scenario,
[July 4 geometry note](../research/day_35_density_estimate.md)) sets peak = 60.0. The original index
convention treated 100 as roughly 100k, but the later geometry tracker gives a
wider June 20 attendance range. Day 35's mean/median are scaled by the same
anchor factor (2.736), matching Day 21's method.
Day 38 computed from the protesta_38 timeline, retained frames only (top-10 peak
avg 245.9, mean 150.7, median 145.8), normalized on the same Day-7 reference.
Day 39 computed from the protesta_39 timeline, retained frames only (top-10 peak
avg 401.9, mean 182.5, median 171.3), normalized on the same Day-7 reference.
Day 40 computed from the protesta_40 timeline, retained frames only (top-10 peak
avg 475.2, mean 169.3, median 161.8), normalized on the same Day-7 reference.
Day 41 computed from the protesta_41 timeline, retained frames only (top-10 peak
avg 363.7, mean 168.4, median 151.1), normalized on the same Day-7 reference.
Day 42 computed from the protesta_42 timeline, retained frames only (top-10 peak
avg 548.3, mean 202.9, median 185.7), normalized on the same Day-7 reference.
Day 43 computed from the protesta_43 timeline, retained frames only (top-10 peak
avg 302.8, mean 156.9, median 145.7), normalized on the same Day-7 reference.
Day 44 computed from the protesta_44 timeline, retained frames only (top-10 peak
avg 316.2, mean 170.6, median 160.8), normalized on the same Day-7 reference.
Day 45 computed from the protesta_45 timeline, retained frames only (top-10 peak
avg 322.2, mean 151.3, median 137.6), normalized on the same Day-7 reference.
Day 46 computed from the protesta_46 timeline, retained frames only (top-10 peak
avg 271.6, mean 141.5, median 126.4), normalized on the same Day-7 reference.
Day 47 computed from the protesta_47 timeline, retained frames only (top-10 peak
avg 322.7, mean 176.1, median 174.0), normalized on the same Day-7 reference.
Day 48 computed from the protesta_48 timeline, retained frames only (top-10 peak
avg 334.2, mean 151.6, median 146.3), normalized on the same Day-7 reference.
Day 49 computed from the protesta_49 timeline, retained frames only (top-10 peak
avg 475.4, mean 152.1, median 142.9), normalized on the same Day-7 reference.
Day 50 computed from the protesta_50 timeline, retained frames only (top-10 peak
avg 218.5, mean 139.5, median 137.4), normalized on the same Day-7 reference.
Day 51 computed from the protesta_51 timeline, retained frames only (top-10 peak
avg 272.0, mean 154.2, median 145.1), normalized on the same Day-7 reference.
Day 52 computed from the protesta_52 timeline, retained frames only (top-10 peak
avg 258.5, mean 144.3, median 137.8), normalized on the same Day-7 reference.
Day 53 computed from the protesta_53 timeline, retained frames only (top-10 peak
avg 292.4, mean 160.7, median 155.4), normalized on the same Day-7 reference.
Day 54 was two separate actions: a morning Parliament clash (protesta_54.1) and the
regular evening march (protesta_54.2). Per the source research, they are not summed;
the evening run is the headline series (clean peak 311.8 — the audited single-view
estimate, replacing a 331.9 raw peak inflated by a split-screen frame — mean 163.7,
median 160.7), normalized on the same Day-7 reference. The morning clash (clean peak
316.8) appears only as a participationEvents marker, not in this day's peak/mean/median.
Day 55 computed from the protesta_55 timeline, retained frames only (peak input is the
audited clean single-view estimate 330.7, replacing a 354.9 raw peak inflated by a
picture-in-picture frame; mean 172.4, median 159.7), normalized on the same Day-7
reference.
Day 56 computed from the protesta_56 timeline, retained frames only (top-10 peak
avg 394.6, mean 173.1, median 164.1), normalized on the same Day-7 reference.
Day 57 computed from the protesta_57 timeline, retained frames only (top-10 peak
avg 268.8, mean 157.8, median 156.8), normalized on the same Day-7 reference.
Day 58 was two separate actions: a morning Parliament siege (protesta_58.1) and the
regular evening march (protesta_58.2). Per the source research, they are not summed;
the evening run is the headline series (clean peak 285.2, no split-screen or duplicate
panels; mean 135.1, median 122.7), normalized on the same Day-7 reference. The morning
action (audited clean peak 239.7, replacing a 286.4 raw peak inflated by a split-screen
frame) appears only as a participationEvents marker, not in this day's peak/mean/median.
Day 59 computed from the protesta_59 timeline, retained frames only (top-10 peak
avg 243.7, mean 149.0, median 147.8), normalized on the same Day-7 reference.
Day 60 computed from the protesta_60 timeline, retained frames only (top-10 peak
avg 318.2, mean 158.0, median 153.5), normalized on the same Day-7 reference.
Day 61 computed from the protesta_61 timeline, retained frames only (top-10 peak
avg 223.0, mean 126.0, median 119.0), normalized on the same Day-7 reference.
Day 62 computed from the protesta_62 timeline, retained frames only (top-10 peak
avg 289.5, mean 148.9, median 144.4), normalized on the same Day-7 reference.
Day 63 computed from the protesta_63 timeline, retained frames only (audited top-10
peak avg 314.9 — replacing a 564.3 raw maximum inflated by a split-screen interval;
mean 169.7, median 165.0), normalized on the same Day-7 reference.
Day 64 computed from the protesta_64 timeline, retained frames only (top-10 peak
avg 352.1, mean 147.6, median 133.9), normalized on the same Day-7 reference.
Day 65 computed from the protesta_65 timeline, retained frames only (top-10 peak
avg 363.6, mean 158.7, median 151.6), normalized on the same Day-7 reference.
Day 66 computed from the protesta_66 timeline, retained frames only (top-10 peak
avg 267.0, mean 126.4, median 113.2), normalized on the same Day-7 reference.
Day 67 computed from the protesta_67 timeline, retained frames only (top-10 peak
avg 267.0, mean 129.9, median 118.2), normalized on the same Day-7 reference.
Day 68 arrived as two separated livestreams covering one evening block; the segments are
never summed. Stored values come from segment 68.2 (top-10 peak avg 184.3, mean 144.7,
median 142.6, one split-screen frame at 00:25:54 excluded), normalized on the same Day-7
reference. Segment 68.1 was lower on every measure (top-10 peak avg 128.7, mean 108.6,
median 105.8). Retention was poor in both segments (68.2 kept 28 of 353 frames), so the
mean and median sit on a far smaller sample than neighbouring days.
Day 69 computed from the protesta_69 timeline, retained frames only (top-10 peak
avg 161.7, mean 114.1, median 110.1), normalized on the same Day-7 reference.
Day 70 computed from the protesta_70 timeline, retained frames only (top-10 peak
avg 190.9, mean 122.6, median 119.0), normalized on the same Day-7 reference.
Day 71 computed from the protesta_71 timeline, retained frames only (clean top-10 peak
avg 148.5, mean 120.2, median 113.1), normalized on the same Day-7 reference; 325 of the
373 retained frames were dropped as split-screen broadcast layout, so all three values
rest on scene 26 onward and the raw 164.3 maximum is audit-only.
Day 72 computed from the protesta_72 timeline, retained frames only (top-10 peak
avg 299.7, mean 143.7, median 137.9), normalized on the same Day-7 reference.
Day 73 computed from the protesta_73 timeline, retained frames only (top-10 peak
avg 220.1, mean 142.1, median 141.3), normalized on the same Day-7 reference.
Day 74 again arrived as two livestreams covering one continuous evening; the parts are
never summed. Stored values come from part 74.2 (top-10 peak avg 177.5, mean 123.6,
median 118.1), normalized on the same Day-7 reference. Part 74.1 switches repeatedly to a
two-panel broadcast layout, so its 130.2 raw maximum is audit-only and supplies no
published figure; the two parts are not synchronized, so no combined mean or median exists.
Day 75 computed from the protesta_75 timeline, retained frames only (top-10 peak
avg 288.5, mean 138.8, median 133.4), normalized on the same Day-7 reference.
Day 76 computed from the protesta_76 timeline, retained frames only (top-10 peak
avg 318.6, mean 153.5, median 130.0), normalized on the same Day-7 reference.
Day 77 computed from its own rerun livestream (gf-m36CU1_o, 1113 frames, 799 retained),
which replaced the Day-76 duplicate that previously sat in protesta_77. Unlike its
neighbours, all ten of its highest frames are two-panel broadcast layout, so the raw
top-10 avg of 375.8 is audit-only. The stored peak is the top-10 average over the 369
retained frames that are full-bleed single view (286.4), which is the same treatment
days 71 and 74 got. Mean 165.7 and median 138.2 are whole-broadcast over all retained
frames, as on every other day. Re-checking the batch this way moves no other day's peak
except Day 76 (6.17 published, 5.83 on clean frames only), left as the research layer
published it. Normalized on the same Day-7 reference.
Day 78 computed from the protesta_78 timeline, retained frames only (top-10 peak
avg 408.7, mean 166.9, median 148.1), normalized on the same Day-7 reference.
Day 79 computed from the protesta_79 timeline, retained frames only (top-10 peak
avg 232.2, mean 127.8, median 121.1), normalized on the same Day-7 reference.
Day 80 computed from the protesta_80 timeline, retained frames only (top-10 peak
avg 333.9, mean 147.0, median 137.3), normalized on the same Day-7 reference.
Day 81 computed from the protesta_81 timeline, retained frames only (top-10 peak
avg 286.9, mean 136.0, median 121.8), normalized on the same Day-7 reference.
Day 82 computed from the protesta_82 timeline, retained frames only (top-10 peak
avg 214.7, mean 131.2, median 121.4), normalized on the same Day-7 reference.
Day 83 computed from the protesta_83 timeline, retained frames only (top-10 peak
avg 209.6, mean 126.7, median 121.6), normalized on the same Day-7 reference; the top
window sits in scenes 93 and 94, both clean single-view boulevard footage.
Days 84 and 85 were rerun after the batch that first failed on them, and both now have
complete timelines, so their earlier null entries carry figures on the same Day-7
reference (day 84 top-10 peak avg 208.3, mean 119.8, median 113.3; day 85 top-10 peak
avg 188.2, mean 133.9, median 130.5). The stale protesta_85 directory left behind by the
failed attempt holds a raw source file but no report or timeline; the research layer
excludes it and the canonical rerun is what is used here.
Days 86 to 93 computed from their protesta_N timelines, retained frames only, on the same
Day-7 reference (top-10 peak avg / mean / median): 86 268.6 / 153.0 / 153.5; 87 217.1 /
133.2 / 132.4; 88 244.9 / 139.7 / 137.2; 89 206.9 / 124.8 / 119.6; 90 182.3 / 127.3 /
125.9; 91 217.6 / 128.1 / 117.3; 92 230.3 / 144.0 / 117.3; 93 177.2 / 125.1 / 113.6.
Days 91, 92 and 93 cleared unusually few frames against the fixed 100-person retention
threshold (201/952, 74/828 and 129/1001). Their peaks stay comparable, but their means and
medians summarize a much thinner slice of the broadcast than the days around them.
Days 94 to 107 computed from their protesta_N timelines, retained frames only, on the same
Day-7 reference (top-10 peak avg / mean / median): 94 226.8 / 152.7 / 137.4; 95 253.3 /
139.1 / 136.2; 96 242.2 / 139.3 / 129.5; 97 227.9 / 130.5 / 119.8; 98 222.1 / 137.3 / 123.0;
99 198.7 / 128.4 / 113.5; 100 245.2 / 143.4 / 135.1; 101 320.4 / 178.4 / 153.3; 102 184.2 /
124.0 / 119.0; 103 280.8 / 129.7 / 119.0; 104 237.1 / 136.3 / 123.1; 105 557.7 / 216.8 /
204.5; 106 210.5 / 143.0 / 139.8; 107 240.4 / 140.0 / 135.0.
The top frames of every day in the batch were checked by eye for broadcast composites. Four
days carried them, so their peaks are the top-10 average over single-view frames only, the
treatment days 71, 74 and 77 got (mean and median stay whole-broadcast, as on day 77). Day 94's
confrontation outside the PM's office ran as a four-panel grid, 25 of the frames above its
tenth clean one (raw top-10 236.6, audit-only); its first published peak of 4.58 used them
and is corrected here to 4.39. Day 100's highest frames mostly pair the crowd with a speaker
panel (raw 277.8), day 101's two highest are two-panel (raw 341.7), and day 105 has five
speaker splits in its top fifteen (raw 559.9).
Days 94 to 97 come from 640x360 sources; days 89 to 93 and 98 to 107 are 1920x1080. Day 105's
peak is an elevated wide view down the boulevard that takes in far more of the crowd than
street-level shots, so it marks a camera-visible high point, not a like-for-like ranking.
Day 99 kept only 94 of 795 frames above the retention threshold. The notes for days 94 to 97,
first written from stream headlines alone, are rewritten from their research files.
Days 108 to 113 computed from their protesta_N timelines, retained frames only, on the same
Day-7 reference (top-10 peak avg / mean / median): 108 252.8 / 139.1 / 127.1; 109 224.3 /
139.2 / 130.6; 110 254.9 / 151.2 / 150.1; 111 188.4 / 124.0 / 117.7; 112 237.2 / 133.0 /
122.1; 113 216.7 / 143.5 / 136.7. All six are 1920x1080 and none has a broadcast composite
among its top frames: days 110, 112 and 113 kept every frame and their twenty highest were
screened, while days 108, 109 and 111 kept only the peak frame and the frames behind each peak
sit in one clean single-view scene. Days 111 and 113 retained 347 of 939 and 362 of 907 frames,
a thinner slice of the broadcast than the days around them.
Day 110 is the evening march (73xeOPE5V6c). The morning action at Parliament was captured as a
separate stream (ktXurd84g70; raw top-10 147.6, mean 116.4, median 113.6, 74 of 1252 frames
retained) that ran mostly as a two or three panel grid, so it stays out of the series, the way
day 54's morning Parliament clash does. Day 113's run is stored as protesta_114; its stream
title and release date make it day 113. The notes for days 108 to 113 follow their research
files (protest_story_notes_1_108 to _113).
Days 115 to 117 computed the same way (top-10 peak avg / mean / median): 115 168.3 / 118.6 /
114.5; 116 146.7 / 119.1 / 116.9; 117 169.4 / 121.7 / 116.6. All three kept only their peak
frame, which is a clean single view, and the frames behind each peak sit in one scene; the
broadcast composites screened out of their probes fall in later scenes that hold no retained
top frame. Retention is thin on all three, 269 of 909 frames on day 115, 83 of 748 on day 116
and 218 of 898 on day 117, so they carry the same caveat as days 111 and 113.
Day 117 is the evening rally (qXPKhAjCJv8). The morning action at Parliament and the Interior
Ministry was a separate stream (cMZ9FWF_2Kg; raw top-10 216.6, mean 133.2, median 125.0, 322 of
1263 frames retained) and stays out of the series, like the day 54 and day 110 mornings.
Day 114 was analyzed after the rest, from its own stream (HTOcZWpqD84): top-10 peak avg 243.7,
mean 142.3, median 125.8, 307 of 875 frames retained. Every frame was saved and its twelve
highest sit in one clean single-view scene. Its folder also holds the mislabeled copy of day
113's broadcast (Os618Aq6Tmo), which is the run this file first recorded as day 114.
The notes for days 115 to 117 follow their research files (protest_story_notes_1_115 to _117);
day 114 has no research file yet, so its note follows the day's press coverage.
Days 118 and 119 computed the same way (top-10 peak avg / mean / median): 118 183.9 / 124.5 /
116.5; 119 182.5 / 119.6 / 112.2. Day 118 retained 209 of 971 frames and day 119 203 of 1108.
Day 118's nine highest frames are a studio interview in front of a video wall carrying crowd
footage, the raw peak among them reading 843.7, so they stay out of the top ten the way the
day 94, 100, 101 and 105 splits do. They also stay out of this day's mean and median, which
the earlier composite days kept whole-broadcast: a video wall is not the crowd in the street,
and those nine frames alone carry the whole-broadcast mean from 124.5 to 149.7, while the
median barely moves (116.5 to 116.9). Day 119's twenty-five highest frames are all single-view
street shots. The notes for both days follow their research files.
