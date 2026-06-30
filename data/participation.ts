// 30-day participation index for the June 2026 "Revolucioni i Flamingove" protests.
//
// Source: News24 live broadcasts of each day's protest in Tirana, analyzed with a
// crowd-counting model. The headline series is `peak` (top-10 peak frame average),
// normalized so 100 = the single largest day (Day 7, 6 June 2026 / 2026-06-06).
// `mean` and `median` are the same crowd model averaged across the whole broadcast.
//
// Data: outputs/protesta_summary/crowd_visibility_index_1_30.csv
// Story: outputs/protesta_summary/protest_story_notes_1_30.md

export type ParticipationDay = {
  day: number;
  /** ISO date of the protest day. Day 1 = 2026-05-31. */
  date: string;
  /** Saturday flag: Saturdays drove the biggest turnouts (days 7, 14, 21, 28). */
  saturday: boolean;
  /** Headline index, normalized 0–100 (100 = Day 7). */
  peak: number;
  /** Whole-broadcast mean index. */
  mean: number;
  /** Whole-broadcast median index. */
  median: number;
  /** News24 livestream for this day. */
  source: string;
  /** Short story note. */
  note: { sq: string; en: string };
};

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const participation: ParticipationDay[] = [
  { day: 1, date: "2026-05-31", saturday: false, peak: 4.78, mean: 3.89, median: 4.22, source: yt("7iWYPS0VnmM"),
    note: { sq: "Dita e parë. Protestë kundër ndërtimeve në zonat e mbrojtura.", en: "Day one. A protest against construction in protected areas." } },
  { day: 2, date: "2026-06-01", saturday: false, peak: 14.90, mean: 6.77, median: 6.66, source: yt("HgwJQHTpqbA"),
    note: { sq: "Zgjerimi i parë i fortë: “Shqipëria nuk është në shitje”.", en: "First strong expansion: “Albania is not for sale”." } },
  { day: 3, date: "2026-06-02", saturday: false, peak: 19.62, mean: 9.90, median: 9.57, source: yt("B4BUo7TGDKg"),
    note: { sq: "Protesta ankorohet te Kryeministria; refuzohet ftesa e mjekrrës për dialog.", en: "The protest anchors at the PM's office; Rama's invitation to dialogue is refused." } },
  { day: 4, date: "2026-06-03", saturday: false, peak: 16.73, mean: 7.94, median: 7.41, source: yt("6rhPy-NtHCI"),
    note: { sq: "Toni politik ashpërsohet, thirrje të drejtpërdrejta për dorëheqjen e mjekërroshit bardhërosh.", en: "The political tone hardens, with direct calls to resign." } },
  { day: 5, date: "2026-06-04", saturday: false, peak: 9.48, mean: 5.50, median: 5.44, source: yt("IARahhOcEW0"),
    note: { sq: "Dhjetra-mijëra para Kryeministrisë; qëndresa për Zvërnecin vazhdon.", en: "Tens of thousands before the PM's office; the stand for Zvërnec continues." } },
  { day: 6, date: "2026-06-05", saturday: false, peak: 11.58, mean: 4.28, median: 3.80, source: yt("RbL8QeQgC64"),
    note: { sq: "Ndërtimi para kulmit, dita e gjashtë e protestës qytetare; fillojnë protestat kudo në diasporë.", en: "The build-up before the peak, day six of civic protest; protests begin across the diaspora." } },
  { day: 7, date: "2026-06-06", saturday: true, peak: 50.0, mean: 16.25, median: 8.79, source: yt("eH4ASg9Cj-w"),
    note: { sq: "Kulmi i javës së parë: shesh plot, marshim drejt Kryeministrisë.", en: "The first-week climax: a full square marching toward the PM's office." } },
  { day: 8, date: "2026-06-07", saturday: false, peak: 15.39, mean: 6.51, median: 6.17, source: yt("OEqXXc7wUws"),
    note: { sq: "Vazhdimësi pas kulmit të së shtunës.", en: "Continuation after the Saturday peak." } },
  { day: 9, date: "2026-06-08", saturday: false, peak: 38.57, mean: 8.68, median: 4.50, source: yt("zKsG2o2PtEs"),
    note: { sq: "Vala e dytë e madhe: “O sot, o kurrë”, dhjetra-mijëra drejt Kryeministrisë.", en: "The second big wave: “Now or never”, tens of thousands toward the PM's office." } },
  { day: 10, date: "2026-06-09", saturday: false, peak: 14.34, mean: 5.44, median: 4.32, source: yt("o8xp54iwbz8"),
    note: { sq: "Ende fazë me intensitet të lartë; protestë e madhe kundër organizatës me një urrejtje ndaj të bukurës.", en: "Still a high-intensity phase; a major protest against an organization with a hatred for beauty." } },
  { day: 11, date: "2026-06-10", saturday: false, peak: 28.54, mean: 7.98, median: 5.51, source: yt("rpm0vMWn1Aw"),
    note: { sq: "Korniza kombëtare forcohet, tubim mbarëkombëtar në Tiranë.", en: "The national framing strengthens, a nationwide gathering in Tirana." } },
  { day: 12, date: "2026-06-11", saturday: false, peak: 26.89, mean: 6.44, median: 4.38, source: yt("sUsIy-gGcI0"),
    note: { sq: "Protesta kombëtare vazhdon, vëmendje edhe nga jashtë.", en: "The national protest continues, drawing attention from abroad." } },
  { day: 13, date: "2026-06-12", saturday: false, peak: 28.75, mean: 6.96, median: 4.35, source: yt("tKIm67wi4RM"),
    note: { sq: "Dhjetra-mijëra kërkojnë dorëheqjen e mjekrrës; “Shqipëria nuk shitet”.", en: "Tens of thousands demand Rama's resignation; “Albania is not for sale”." } },
  { day: 14, date: "2026-06-13", saturday: true, peak: 17.33, mean: 5.28, median: 4.76, source: yt("Zw_MkCa2UiY"),
    note: { sq: "Protesta kombëtare e së shtunës, me prani të dukshme të diasporës.", en: "The Saturday national protest, with a visible diaspora presence." } },
  { day: 15, date: "2026-06-14", saturday: false, peak: 22.38, mean: 4.94, median: 4.20, source: yt("aEeytnfjc-k"),
    note: { sq: "Marshimi drejt aeroportit të Rinasit: përshkallëzim i njëhershëm i rrugës.", en: "The march toward Rinas airport: a one-time route escalation." } },
  { day: 16, date: "2026-06-15", saturday: false, peak: 12.25, mean: 3.85, median: 3.46, source: yt("Ad8-oEU4B-k"),
    note: { sq: "Pas Rinasit: sheshe plot dhe thirrje për dorëheqje.", en: "After Rinas: full squares and continued calls to resign." } },
  { day: 17, date: "2026-06-16", saturday: false, peak: 9.88, mean: 4.66, median: 4.21, source: yt("u0W2FifJEhI"),
    note: { sq: "Këmbëngulje qytetare ditë pas dite.", en: "Civic persistence, day after day." } },
  { day: 18, date: "2026-06-17", saturday: false, peak: 10.82, mean: 4.05, median: 3.83, source: yt("iK8Q6_ylPPk"),
    note: { sq: "Rrugë plot qytetarë, edhe pse jo të gjithë duken në kamera.", en: "Streets full of citizens, even if the cameras don't catch them all." } },
  { day: 19, date: "2026-06-18", saturday: false, peak: 9.04, mean: 4.00, median: 3.72, source: yt("7qY8tX7_VpM"),
    note: { sq: "Ditë vazhdimësie: shqiptarët nuk dorëzohen ndaj tarafit kanceroz.", en: "A day of continuity: Albanians do not surrender to the cancerous clique." } },
  { day: 20, date: "2026-06-19", saturday: false, peak: 8.09, mean: 4.28, median: 4.16, source: yt("KNX_sy-1GD0"),
    note: { sq: "Marshim i gjatë nëpër Tiranë drejt Sheshit Skënderbej.", en: "A long march through Tirana toward Skanderbeg Square." } },
  { day: 21, date: "2026-06-20", saturday: true, peak: 100.0, mean: 19.43, median: 15.76, source: yt("LDYTp4i8PEY"),
    note: { sq: "Dita më e madhe: diaspora zbret. Mjekrrës i merret pakëz fryma në mëngjes. Mbi 100 mijë në shesh sipas vlerësimit gjeometrik.", en: "The biggest day: the diaspora turns out. Rama is left a little breathless in the morning. An estimated 100,000+ in the square by ground geometry." } },
  { day: 22, date: "2026-06-21", saturday: false, peak: 7.50, mean: 4.24, median: 4.15, source: yt("vfPgNSgL054"),
    note: { sq: "Shenja e tre javëve; prani ende masive.", en: "The three-week marker; still a massive presence." } },
  { day: 23, date: "2026-06-22", saturday: false, peak: 7.76, mean: 3.93, median: 3.76, source: yt("92EfnnD9MHo"),
    note: { sq: "Kërkohet dorëheqja pa kushte e el kancerios.", en: "A demand for the unconditional resignation of the cancerous one." } },
  { day: 24, date: "2026-06-23", saturday: false, peak: 6.75, mean: 3.80, median: 3.83, source: yt("cRHVNDIJuq0"),
    note: { sq: "Kërkesa konkretizohen në 5 pika gjithëpërfshirëse, thirrje drejtuar SPAK-ut.", en: "Demands are distilled into 5 comprehensive points, with calls on the anti-corruption body." } },
  { day: 25, date: "2026-06-24", saturday: false, peak: 5.51, mean: 3.41, median: 3.37, source: yt("KYS-Ln89w-c"),
    note: { sq: "Dita me shi: pika më e ulët e indeksit, por sheshi mbetet aktiv.", en: "The rainy day: the lowest index point, yet the square stays active." } },
  { day: 26, date: "2026-06-25", saturday: false, peak: 7.38, mean: 4.03, median: 3.83, source: yt("okiM_gxThDk"),
    note: { sq: "Rikuperim pas shiut; vazhdojnë thirrjet për dorëheqje.", en: "Recovery after the rain; the calls to resign continue." } },
  { day: 27, date: "2026-06-26", saturday: false, peak: 6.37, mean: 3.74, median: 3.74, source: yt("JaJsOgGSLXY"),
    note: { sq: "Protesta vazhdon çdo ditë para Kryeministrisë.", en: "The protest continues every day before the PM's office." } },
  { day: 28, date: "2026-06-27", saturday: true, peak: 8.49, mean: 3.92, median: 3.77, source: yt("1keRQvt05cQ"),
    note: { sq: "Thirrje kombëtare e së shtunës, nga Shqipëria dhe diaspora.", en: "A Saturday national call, from Albania and the diaspora." } },
  { day: 29, date: "2026-06-28", saturday: false, peak: 6.96, mean: 3.51, median: 3.46, source: yt("M9s2hDUHyMk"),
    note: { sq: "Prag i shenjës njëmujore: “s’dalim nga sheshi pa rënë mjekrra”.", en: "On the eve of the one-month mark: “we won't leave the square until Rama falls”." } },
  { day: 30, date: "2026-06-29", saturday: false, peak: 9.47, mean: 3.81, median: 3.61, source: yt("Hi8GIraUxSo"),
    note: { sq: "Një muaj protestë: qytetarët “pushtojnë” rrugët e Tiranës.", en: "One month of protest: citizens “occupy” the streets of Tirana." } },
];

export type ParticipationEvent = {
  day: number;
  /** primary events get a full flag; secondary events get a compact marker. */
  tier: "peak" | "primary" | "secondary";
  /** lucide-style icon key, resolved in the chart. */
  icon: "peak" | "plane" | "people" | "rain" | "spark" | "flag";
  label: { sq: string; en: string };
  /** small line under the label (e.g. the value or a date). */
  sub: { sq: string; en: string };
  /** keep this event when space is tight (mobile). */
  mobile: boolean;
};

export const participationEvents: ParticipationEvent[] = [
  { day: 7, tier: "primary", icon: "spark", mobile: true,
    label: { sq: "Kulmi i javës së parë", en: "First-week climax" },
    sub: { sq: "6 qershor · e shtunë", en: "6 June · Saturday" } },
  { day: 9, tier: "secondary", icon: "spark", mobile: false,
    label: { sq: "Vala e dytë", en: "Second wave" },
    sub: { sq: "“O sot, o kurrë”", en: "“Now or never”" } },
  { day: 15, tier: "primary", icon: "plane", mobile: true,
    label: { sq: "Marshimi drejt Rinasit", en: "March to Rinas airport" },
    sub: { sq: "Përshkallëzim i rrugës", en: "Route escalation" } },
  { day: 21, tier: "peak", icon: "peak", mobile: true,
    label: { sq: "Kulmi", en: "The peak" },
    sub: { sq: "Diaspora · 20 qershor", en: "Diaspora · 20 June" } },
  { day: 25, tier: "secondary", icon: "rain", mobile: false,
    label: { sq: "Dita me shi", en: "The rainy day" },
    sub: { sq: "Pika më e ulët", en: "Lowest point" } },
  { day: 30, tier: "primary", icon: "flag", mobile: true,
    label: { sq: "1 muaj protestë", en: "One month" },
    sub: { sq: "29 qershor", en: "29 June" } },
];

/** Normalization reference shown in the methodology note. */
export const NORMALIZATION = { index100Day: 21, index100Date: "2026-06-20" };
