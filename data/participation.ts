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
  { day: 1, date: "2026-05-31", saturday: false, peak: 9.55, mean: 7.77, median: 8.44, source: yt("7iWYPS0VnmM"),
    note: { sq: "Dita e parë. Protestë kundër ndërtimeve në zonat e mbrojtura.", en: "Day one. A protest against construction in protected areas." } },
  { day: 2, date: "2026-06-01", saturday: false, peak: 29.79, mean: 13.53, median: 13.32, source: yt("HgwJQHTpqbA"),
    note: { sq: "Zgjerimi i parë i fortë: “Shqipëria nuk është në shitje”.", en: "First strong expansion: “Albania is not for sale”." } },
  { day: 3, date: "2026-06-02", saturday: false, peak: 39.23, mean: 19.79, median: 19.14, source: yt("B4BUo7TGDKg"),
    note: { sq: "Protesta ankorohet te Kryeministria; refuzohet ftesa e mjekrrës për dialog.", en: "The protest anchors at the PM's office; Rama's invitation to dialogue is refused." } },
  { day: 4, date: "2026-06-03", saturday: false, peak: 33.45, mean: 15.88, median: 14.82, source: yt("6rhPy-NtHCI"),
    note: { sq: "Toni politik ashpërsohet, thirrje të drejtpërdrejta për dorëheqjen e mjekërroshit bardhërosh.", en: "The political tone hardens, with direct calls to resign." } },
  { day: 5, date: "2026-06-04", saturday: false, peak: 18.96, mean: 10.99, median: 10.88, source: yt("IARahhOcEW0"),
    note: { sq: "Dhjetra-mijëra para Kryeministrisë; qëndresa për Zvërnecin vazhdon.", en: "Tens of thousands before the PM's office; the stand for Zvërnec continues." } },
  { day: 6, date: "2026-06-05", saturday: false, peak: 23.16, mean: 8.56, median: 7.60, source: yt("RbL8QeQgC64"),
    note: { sq: "Ndërtimi para kulmit, dita e gjashtë e protestës qytetare.", en: "The build-up before the peak, day six of civic protest." } },
  { day: 7, date: "2026-06-06", saturday: true, peak: 100.0, mean: 32.5, median: 17.58, source: yt("eH4ASg9Cj-w"),
    note: { sq: "Kulmi i javës së parë dhe maksimumi i 30 ditëve: shesh plot, marshim drejt Kryeministrisë.", en: "First-week peak and the 30-day maximum: a full square marching toward the PM's office." } },
  { day: 8, date: "2026-06-07", saturday: false, peak: 30.78, mean: 13.01, median: 12.33, source: yt("OEqXXc7wUws"),
    note: { sq: "Vazhdimësi pas kulmit të së shtunës.", en: "Continuation after the Saturday peak." } },
  { day: 9, date: "2026-06-08", saturday: false, peak: 77.14, mean: 17.36, median: 8.99, source: yt("zKsG2o2PtEs"),
    note: { sq: "Vala e dytë e madhe: “O sot, o kurrë”, dhjetra-mijëra drejt Kryeministrisë.", en: "The second big wave: “Now or never”, tens of thousands toward the PM's office." } },
  { day: 10, date: "2026-06-09", saturday: false, peak: 28.68, mean: 10.87, median: 8.64, source: yt("o8xp54iwbz8"),
    note: { sq: "Ende fazë me intensitet të lartë; protestë e madhe kundër qeverisë.", en: "Still a high-intensity phase; a major protest against the government." } },
  { day: 11, date: "2026-06-10", saturday: false, peak: 57.07, mean: 15.95, median: 11.02, source: yt("rpm0vMWn1Aw"),
    note: { sq: "Korniza kombëtare forcohet, tubim mbarëkombëtar në Tiranë.", en: "The national framing strengthens, a nationwide gathering in Tirana." } },
  { day: 12, date: "2026-06-11", saturday: false, peak: 53.77, mean: 12.87, median: 8.76, source: yt("sUsIy-gGcI0"),
    note: { sq: "Protesta kombëtare vazhdon, vëmendje edhe nga jashtë.", en: "The national protest continues, drawing attention from abroad." } },
  { day: 13, date: "2026-06-12", saturday: false, peak: 57.50, mean: 13.91, median: 8.69, source: yt("tKIm67wi4RM"),
    note: { sq: "Dhjetra-mijëra kërkojnë dorëheqjen; “Shqipëria nuk shitet”.", en: "Tens of thousands demand resignation; “Albania is not for sale”." } },
  { day: 14, date: "2026-06-13", saturday: true, peak: 34.66, mean: 10.56, median: 9.51, source: yt("Zw_MkCa2UiY"),
    note: { sq: "Protesta kombëtare e së shtunës, me prani të dukshme të diasporës.", en: "The Saturday national protest, with a visible diaspora presence." } },
  { day: 15, date: "2026-06-14", saturday: false, peak: 44.75, mean: 9.87, median: 8.39, source: yt("aEeytnfjc-k"),
    note: { sq: "Marshimi drejt aeroportit të Rinasit: përshkallëzim i njëhershëm i rrugës.", en: "The march toward Rinas airport: a one-time route escalation." } },
  { day: 16, date: "2026-06-15", saturday: false, peak: 24.49, mean: 7.70, median: 6.92, source: yt("Ad8-oEU4B-k"),
    note: { sq: "Pas Rinasit: sheshe plot dhe thirrje për dorëheqje.", en: "After Rinas: full squares and continued calls to resign." } },
  { day: 17, date: "2026-06-16", saturday: false, peak: 19.75, mean: 9.32, median: 8.41, source: yt("u0W2FifJEhI"),
    note: { sq: "Këmbëngulje qytetare ditë pas dite.", en: "Civic persistence, day after day." } },
  { day: 18, date: "2026-06-17", saturday: false, peak: 21.63, mean: 8.10, median: 7.66, source: yt("iK8Q6_ylPPk"),
    note: { sq: "Rrugë plot qytetarë, edhe pse jo të gjithë duken në kamera.", en: "Streets full of citizens, even if the cameras don't catch them all." } },
  { day: 19, date: "2026-06-18", saturday: false, peak: 18.07, mean: 7.99, median: 7.43, source: yt("7qY8tX7_VpM"),
    note: { sq: "Ditë vazhdimësie: shqiptarët nuk dorëzohen.", en: "A day of continuity: Albanians do not give up." } },
  { day: 20, date: "2026-06-19", saturday: false, peak: 16.18, mean: 8.55, median: 8.31, source: yt("KNX_sy-1GD0"),
    note: { sq: "Marshim i gjatë nëpër Tiranë drejt Sheshit Skënderbej.", en: "A long march through Tirana toward Skanderbeg Square." } },
  { day: 21, date: "2026-06-20", saturday: true, peak: 42.57, mean: 8.27, median: 6.71, source: yt("LDYTp4i8PEY"),
    note: { sq: "Momenti i diasporës: News24 raporton mbi 250 mijë; diaspora marshon drejt Shqipërisë.", en: "The diaspora moment: News24 reports 250,000+; the diaspora marches toward Albania." } },
  { day: 22, date: "2026-06-21", saturday: false, peak: 14.99, mean: 8.48, median: 8.29, source: yt("vfPgNSgL054"),
    note: { sq: "Shenja e tre javëve; prani ende masive.", en: "The three-week marker; still a massive presence." } },
  { day: 23, date: "2026-06-22", saturday: false, peak: 15.51, mean: 7.85, median: 7.51, source: yt("92EfnnD9MHo"),
    note: { sq: "Kërkohet dorëheqja pa kushte.", en: "A demand for unconditional resignation." } },
  { day: 24, date: "2026-06-23", saturday: false, peak: 13.49, mean: 7.60, median: 7.65, source: yt("cRHVNDIJuq0"),
    note: { sq: "Kërkesa konkretizohen, thirrje drejtuar SPAK-ut.", en: "Demands become specific, with calls on the anti-corruption body." } },
  { day: 25, date: "2026-06-24", saturday: false, peak: 11.02, mean: 6.82, median: 6.73, source: yt("KYS-Ln89w-c"),
    note: { sq: "Dita me shi: pika më e ulët e indeksit, por sheshi mbetet aktiv.", en: "The rainy day: the lowest index point, yet the square stays active." } },
  { day: 26, date: "2026-06-25", saturday: false, peak: 14.75, mean: 8.06, median: 7.66, source: yt("okiM_gxThDk"),
    note: { sq: "Rikuperim pas shiut; vazhdojnë thirrjet për dorëheqje.", en: "Recovery after the rain; the calls to resign continue." } },
  { day: 27, date: "2026-06-26", saturday: false, peak: 12.74, mean: 7.48, median: 7.47, source: yt("JaJsOgGSLXY"),
    note: { sq: "Protesta vazhdon çdo ditë para Kryeministrisë.", en: "The protest continues every day before the PM's office." } },
  { day: 28, date: "2026-06-27", saturday: true, peak: 16.98, mean: 7.83, median: 7.54, source: yt("1keRQvt05cQ"),
    note: { sq: "Thirrje kombëtare e së shtunës, nga Shqipëria dhe diaspora.", en: "A Saturday national call, from Albania and the diaspora." } },
  { day: 29, date: "2026-06-28", saturday: false, peak: 13.92, mean: 7.02, median: 6.92, source: yt("M9s2hDUHyMk"),
    note: { sq: "Prag i shenjës njëmujore: “s’dalim nga sheshi pa rënë mjekrra”.", en: "On the eve of the one-month mark: “we won't leave the square until Rama falls”." } },
  { day: 30, date: "2026-06-29", saturday: false, peak: 18.93, mean: 7.61, median: 7.21, source: yt("Hi8GIraUxSo"),
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
  { day: 7, tier: "peak", icon: "peak", mobile: true,
    label: { sq: "Kulmi", en: "The peak" },
    sub: { sq: "6 qershor · e shtunë", en: "6 June · Saturday" } },
  { day: 9, tier: "secondary", icon: "spark", mobile: false,
    label: { sq: "Vala e dytë", en: "Second wave" },
    sub: { sq: "“O sot, o kurrë”", en: "“Now or never”" } },
  { day: 15, tier: "primary", icon: "plane", mobile: true,
    label: { sq: "Marshimi drejt Rinasit", en: "March to Rinas airport" },
    sub: { sq: "Përshkallëzim i rrugës", en: "Route escalation" } },
  { day: 21, tier: "primary", icon: "people", mobile: true,
    label: { sq: "Diaspora bashkohet", en: "The diaspora joins" },
    sub: { sq: "News24: 250 mijë+", en: "News24: 250,000+" } },
  { day: 25, tier: "secondary", icon: "rain", mobile: false,
    label: { sq: "Dita me shi", en: "The rainy day" },
    sub: { sq: "Pika më e ulët", en: "Lowest point" } },
  { day: 30, tier: "primary", icon: "flag", mobile: true,
    label: { sq: "1 muaj protestë", en: "One month" },
    sub: { sq: "29 qershor", en: "29 June" } },
];

/** Normalization reference shown in the methodology note. */
export const NORMALIZATION = { index100Day: 7, index100Date: "2026-06-06" };
