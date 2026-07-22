// 50-day participation index for the June 2026 "Revolucioni i Flamingove" protests.
//
// Source: News24 live broadcasts of each day's protest in Tirana, analyzed with a
// crowd-counting model. The headline series is `peak` (top-10 peak frame average).
// The anchor days (7, 21 and 35 / 6, 20 June and 4 July) are tied to on-the-ground
// geometry estimates so 100 = the largest day (Day 21, 20 June 2026); every other day
// scales the model output on the same Day-7 reference (top-10 avg 2582.5 -> index 50).
// `mean` and `median` are the same crowd model over the retained broadcast frames.
//
// Data: outputs/protesta_summary/crowd_visibility_index_1_30.csv (days 1-30)
// Story: outputs/protesta_summary/protest_story_notes_1_50.md
// Day 31 computed from the protesta_31 timeline (top-10 peak avg 697.6, mean 229.9,
// median 212.5), normalized on the same Day-7 reference as days 1-30.
// Day 32 computed from the protesta_32 timeline, retained frames only (top-10 peak
// avg 327.6, mean 190.6, median 176.5), normalized on the same Day-7 reference.
// Day 33 computed from the protesta_33 timeline, retained frames only (top-10 peak
// avg 389.3, mean 216.1, median 215.0), normalized on the same Day-7 reference.
// Days 34-37 computed from the protesta_34..37 timelines, retained frames only
// (top-10 peak avgs 299.8 / 1132.9 / 365.3 / 267.6; means 174.2 / 242.5 / 191.3 / 156.5;
// medians 174.4 / 199.2 / 186.5 / 154.8), normalized on the same Day-7 reference.
// Day 35 (4 July) is geometry-anchored like days 7 and 21: the ground estimate of
// ~60k (upper extension of the 30k-50k working range, 2.5 km procession scenario,
// research/day_35_density_estimate.md) sets peak = 60.0 (index 100 = ~100k); its
// mean/median are scaled by the same anchor factor (2.736), matching Day 21's method.
// Day 38 computed from the protesta_38 timeline, retained frames only (top-10 peak
// avg 245.9, mean 150.7, median 145.8), normalized on the same Day-7 reference.
// Day 39 computed from the protesta_39 timeline, retained frames only (top-10 peak
// avg 401.9, mean 182.5, median 171.3), normalized on the same Day-7 reference.
// Day 40 computed from the protesta_40 timeline, retained frames only (top-10 peak
// avg 475.2, mean 169.3, median 161.8), normalized on the same Day-7 reference.
// Day 41 computed from the protesta_41 timeline, retained frames only (top-10 peak
// avg 363.7, mean 168.4, median 151.1), normalized on the same Day-7 reference.
// Day 42 computed from the protesta_42 timeline, retained frames only (top-10 peak
// avg 548.3, mean 202.9, median 185.7), normalized on the same Day-7 reference.
// Day 43 computed from the protesta_43 timeline, retained frames only (top-10 peak
// avg 302.8, mean 156.9, median 145.7), normalized on the same Day-7 reference.
// Day 44 computed from the protesta_44 timeline, retained frames only (top-10 peak
// avg 316.2, mean 170.6, median 160.8), normalized on the same Day-7 reference.
// Day 45 computed from the protesta_45 timeline, retained frames only (top-10 peak
// avg 322.2, mean 151.3, median 137.6), normalized on the same Day-7 reference.
// Day 46 computed from the protesta_46 timeline, retained frames only (top-10 peak
// avg 271.6, mean 141.5, median 126.4), normalized on the same Day-7 reference.
// Day 47 computed from the protesta_47 timeline, retained frames only (top-10 peak
// avg 322.7, mean 176.1, median 174.0), normalized on the same Day-7 reference.
// Day 48 computed from the protesta_48 timeline, retained frames only (top-10 peak
// avg 334.2, mean 151.6, median 146.3), normalized on the same Day-7 reference.
// Day 49 computed from the protesta_49 timeline, retained frames only (top-10 peak
// avg 475.4, mean 152.1, median 142.9), normalized on the same Day-7 reference.
// Day 50 computed from the protesta_50 timeline, retained frames only (top-10 peak
// avg 218.5, mean 139.5, median 137.4), normalized on the same Day-7 reference.
// Day 51 computed from the protesta_51 timeline, retained frames only (top-10 peak
// avg 272.0, mean 154.2, median 145.1), normalized on the same Day-7 reference.
// Day 52 computed from the protesta_52 timeline, retained frames only (top-10 peak
// avg 258.5, mean 144.3, median 137.8), normalized on the same Day-7 reference.
// Day 53 computed from the protesta_53 timeline, retained frames only (top-10 peak
// avg 292.4, mean 160.7, median 155.4), normalized on the same Day-7 reference.

export type ParticipationDay = {
  day: number;
  /** ISO date of the protest day. Day 1 = 2026-05-31. */
  date: string;
  /** Saturday flag: Saturdays drove the biggest turnouts (days 7, 14, 21, 28, 35, 42). */
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
  /** Optional inline link inside the note, anchored on `word` (per locale). */
  noteLink?: { href: string; word: { sq: string; en: string } };
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
    note: { sq: "Dita me shi: pika më e ulët e qershorit, por sheshi mbetet aktiv.", en: "The rainy day: June's lowest index point, yet the square stays active." } },
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
  { day: 31, date: "2026-06-30", saturday: false, peak: 13.51, mean: 4.45, median: 4.11, source: yt("eXqGp85o7uk"),
    note: { sq: "Protesta galvanizohet pasi nëpunësit e regjimit ushtrojnë dhunë krejtësisht të paprovokuar tek protestuesit.", en: "The protest is galvanized after regime officials use completely unprovoked violence against protesters." },
    noteLink: { href: "https://youtu.be/Nye2pigb8fc", word: { sq: "të paprovokuar", en: "unprovoked" } } },
  { day: 32, date: "2026-07-01", saturday: false, peak: 6.34, mean: 3.69, median: 3.42, source: yt("CbddHOZPo3s"),
    note: { sq: "Presion institucional: dosja “Albanian Files” dorëzohet në SPAK, marshimi i mbrëmjes ndalon para Parlamentit.", en: "Institutional pressure: the “Albanian Files” dossier is submitted to SPAK, and the evening march stops before Parliament." } },
  { day: 33, date: "2026-07-02", saturday: false, peak: 7.54, mean: 4.18, median: 4.16, source: yt("Wq-5bgoNv8w"),
    note: { sq: "Dita e dytë e dhunës brutale nga policia dhe arrestime te Kuvendi në mëngjes; natën marshim drejt Komisariatit Nr. 3 për lirimin e të ndaluarve.", en: "Second day of brutal police violence and arrests at Parliament in the morning; at night a march to Police Station No. 3 demanding the detainees' release." } },
  { day: 34, date: "2026-07-03", saturday: false, peak: 5.80, mean: 3.37, median: 3.38, source: yt("lOz1SMino3Q"),
    note: { sq: "Ditë urë drejt 4 korrikut: nga sheshi bëhet thirrja për protestë mbarëkombëtare, “nga Konispoli në Vermosh”.", en: "A bridge day toward July 4: from the square comes the call for a nationwide protest, “from Konispol to Vermosh”." } },
  { day: 35, date: "2026-07-04", saturday: true, peak: 60.0, mean: 12.84, median: 10.55, source: yt("LPBjPPJiU6w"),
    note: { sq: "Protesta mbarëkombëtare e 4 korrikut: diaspora dhe qytetarët mbushin bulevardin. Rrëzohet busti simbolik i “diktatorit të fundit”; natën marshim për lirimin e të ndaluarve.", en: "The July 4 nationwide protest: the diaspora and citizens fill the boulevard. The symbolic bust of “the last dictator” is toppled; at night a march demanding the detainees' release." } },
  { day: 36, date: "2026-07-05", saturday: false, peak: 7.07, mean: 3.70, median: 3.61, source: yt("rTf-MJiVoBY"),
    note: { sq: "Dita pas kulmit: protestës i bashkohen protestuesit e liruar po atë ditë; në shesh flitet për organizim politik.", en: "The day after the peak: protesters released that same day join the protest; talk in the square turns to political organizing." } },
  { day: 37, date: "2026-07-06", saturday: false, peak: 5.18, mean: 3.03, median: 3.00, source: yt("I8u9NuBICTk"),
    note: { sq: "Pas fundjavës së protestës mbarëkombëtare pjesëmarrja bie ndjeshëm, por marshimi i përditshëm drejt Kryeministrisë vazhdon; revista franceze Paris Match shkruan për lëvizjen, nga Tirana në Paris.", en: "After the nationwide-protest weekend turnout dips noticeably, but the daily march toward the PM's office continues; the French magazine Paris Match covers the movement, from Tirana to Paris." } },
  { day: 38, date: "2026-07-07", saturday: false, peak: 4.76, mean: 2.92, median: 2.82, source: yt("lC9FOr2p6W4"),
    note: { sq: "Nata e 38-të: zinxhiri i protestave vazhdon me intensitet më të ulët pas kulmit; mesazhi zgjerohet drejt hallëve të përditshme: shëndetësia, emigrimi, arsimi, kostoja e jetesës.", en: "Night 38: the protest chain continues at lower intensity after the peak; the message widens into everyday grievances: health care, emigration, education, the cost of living." } },
  { day: 39, date: "2026-07-08", saturday: false, peak: 7.78, mean: 3.53, median: 3.32, source: yt("vlKZO72e2RE"),
    note: { sq: "Rikthim i dukshëm pas dy netëve më të qeta: fjalimet fokusohen te fondet publike, shëndetësia dhe pensionet; edhe Korça del sërish në shesh.", en: "A visible rebound after two quieter nights: speeches focus on public funds, health care and pensions; Korça takes to the square again as well." } },
  { day: 40, date: "2026-07-09", saturday: false, peak: 9.20, mean: 3.28, median: 3.13, source: yt("vkYnv02T3kc"),
    note: { sq: "40 ditë rezistencë, piku më i fortë pas 4 korrikut: protestuesit shpërndajnë hallvë si përkujtim ironik, “të 40-tat e vdekjes së frikës”; diaspora kudo vazhdon protestat çdo fundjavë.", en: "40 days of resistance and the strongest peak since July 4: protesters hand out halva as an ironic 40-day memorial, “the death of fear”; the diaspora everywhere keeps protesting every weekend." } },
  { day: 41, date: "2026-07-10", saturday: false, peak: 7.04, mean: 3.26, median: 2.93, source: yt("0FHgFaUsLWk"),
    note: { sq: "Marshim i qëndrueshëm nëpër Tiranë: piku më i ulët se një natë më parë, por vala e marshimit më e dendur dhe më e gjatë; të rinjtë në krye dhe diaspora zbret vetë në shesh.", en: "A sustained march through Tirana: a lower peak than the night before, but a denser and longer marching wave; young people at the front and the diaspora itself stepping into the square." } },
  { day: 42, date: "2026-07-11", saturday: true, peak: 10.62, mean: 3.93, median: 3.59, source: yt("6yp-zOIdO-E"),
    note: { sq: "Protestë kombëtare me diasporën në shesh: rikthimi më i gjerë pas 4 korrikut; marshimi ndalon para Kuvendit me thirrjen për mobilizim më 23 korrik, ndërsa pankartat vënë përballë fondet e koncertit me hallet e njerëzve.", en: "A national protest with the diaspora in the square: the broadest rebound since July 4; the march stops in front of Parliament with a call to mobilize on July 23, while placards set the concert's public funds against people's everyday needs." } },
  { day: 43, date: "2026-07-12", saturday: false, peak: 5.86, mean: 3.04, median: 2.82, source: yt("zAEyxwOQXhg"),
    note: { sq: "E diela ka ulje pas aksionit kombëtar, por marshimi mbetet i dendur: kolona ndalon para Kuvendit dhe selisë së PD-së; në shesh njoftohet kallëzim penal në SPAK për hetimin e vlerësimeve negative online.", en: "Sunday pulls back after the national action, but the march stays dense: the column stops at Parliament and the Democratic Party headquarters; a criminal complaint at SPAK is announced over the investigation of negative online reviews." } },
  { day: 44, date: "2026-07-13", saturday: false, peak: 6.12, mean: 3.30, median: 3.11, source: yt("oyzrkwHy93U"),
    note: { sq: "E hëna rikthehet pjesërisht brenda ritmit të zakonshëm të netëve: sheshi konsolidon platformën me pesë kërkesa; kallëzimi në SPAK depozitohet zyrtarisht dhe diaspora njofton protestë në Bruksel gjatë konferencës Shqipëri-BE.", en: "Monday rebounds partially within the usual nightly rhythm: the square consolidates its five-demand platform; the SPAK complaint is formally filed and the diaspora announces a protest in Brussels during the Albania-EU conference." } },
  { day: 45, date: "2026-07-14", saturday: false, peak: 6.24, mean: 2.93, median: 2.66, source: yt("B2BGh2Kiz0o"),
    note: { sq: "E marta ka sinjal më të ulët, por vala më e dendur e marshimit mbetet pothuajse e pandryshuar: kolona kalon pranë ambasadës amerikane dhe stadiumit; diaspora proteston në Bruksel para Këshillit Europian dhe qeveria njofton shfuqizimin e ligjit të investimeve strategjike, në përputhje me një nga pesë kërkesat.", en: "Tuesday shows a lower overall signal, but the densest stretch of the march holds almost unchanged: the column passes the US embassy and the stadium; the diaspora protests in Brussels outside the European Council and the government announces the repeal of the strategic investments law, in line with one of the five demands." } },
  { day: 46, date: "2026-07-15", saturday: false, peak: 5.26, mean: 2.74, median: 2.45, source: yt("S7m2IKaASO0"),
    note: { sq: "E mërkura e thellon rënien e netëve të javës, por marshimi ruan një valë të dendur nëpër qendër: kolona kalon Kuvendin dhe mbyllet para Kryeministrisë me thirrjen “Nesër më shumë”; nga podiumi përmendet mbështetja publike e Dua Lipës për protestat dhe mbrojtjen e mjedisit.", en: "Wednesday deepens the weekday decline, but the march keeps a dense wave through the center: the column passes Parliament and closes in front of the Prime Minister's office with the call “More tomorrow”; from the podium, Dua Lipa's public support for the protests and environmental protection is invoked." } },
  { day: 47, date: "2026-07-16", saturday: false, peak: 6.25, mean: 3.41, median: 3.37, source: yt("zKO6lCXuxCI"),
    note: { sq: "E enjtja e rikthen sinjalin pas dy netëve në rënie: të rinjtë dalin me pelerina diplomimi dhe hedhin kapelet në shesh si simbol i diplomave pa të ardhme; marshimi përshkon Shallvaret dhe ish-Bllokun, ndërsa asfalti para Kryeministrisë mban thirrjen drejtuar SPAK-ut.", en: "Thursday brings the signal back after two declining nights: young people appear in graduation gowns and throw their caps in the square as a symbol of diplomas without a future; the march sweeps through Shallvaret and the former Blloku, while the asphalt in front of the Prime Minister's office carries the call addressed to SPAK." } },
  { day: 48, date: "2026-07-17", saturday: false, peak: 6.47, mean: 2.94, median: 2.83, source: yt("aq0rEsb69hA"),
    note: { sq: "E premtja e mban pikun pothuajse të pandryshuar nga një ditë më parë: kolona marshon pas parullës “Shqipëri e re” drejt ambasadës amerikane dhe stadiumit; para nisjes policia ndalon një qytetar që protestoi pranë makinës së kryeministrit, ndërsa nga podiumi thirret mobilizimi para Kuvendit më 23 korrik.", en: "Friday holds the peak almost unchanged from the day before: the column marches behind the “Shqipëri e re” banner toward the US embassy and the stadium; before the start, police detain a citizen who protested near the prime minister's car, while the podium calls for a mobilization outside Parliament on July 23." } },
  { day: 49, date: "2026-07-18", saturday: true, peak: 9.20, mean: 2.94, median: 2.77, source: yt("7fLa42rpud8"),
    note: { sq: "Rritje e ndjeshme e pjesëmarrjes si çdo të shtunë. Gjatë ditës “kuvenduçit kombëtar” farsë i del boja. Kuvendi i vetëm ngelet një dhe vetëm në shesh.", en: "A marked rise in participation, as every Saturday. During the day, the farcical little “national assembly” shows its true colors. The one and only assembly remains in the square." } },
  { day: 50, date: "2026-07-19", saturday: false, peak: 4.23, mean: 2.70, median: 2.66, source: yt("qKOTTYDWadg"),
    note: { sq: "Të dielën, në ditën e 50-të, sinjali bie nga piku i së shtunës. Nga podiumi thirret protesta simbolike nesër para Kuvendit dhe mobilizimi i madh më 23 korrik, i paralajmëruar si seanca e fundit plenare para pushimeve verore.", en: "On Sunday, day 50, the signal drops from Saturday's peak. From the podium, a symbolic protest is called for tomorrow outside Parliament, and the larger mobilization for July 23, billed as the last plenary sitting before the summer recess." } },
  { day: 51, date: "2026-07-20", saturday: false, peak: 5.27, mean: 2.99, median: 2.81, source: yt("baivC05O5xs"),
    note: { sq: "Ditë me dy aksione: në mesditë protestë para Kuvendit me vezë e kthimi i PD nga bojkoti; në mbrëmje marshimi rimerr forcë, me thirrje të fortë për mobilizimin e 23 korrikut.", en: "A day with two actions: a midday egg-throwing protest outside Parliament and the opposition's return from its boycott; in the evening the march rebounds, with a strong call to mobilize on July 23." } },
  { day: 52, date: "2026-07-21", saturday: false, peak: 5.00, mean: 2.79, median: 2.67, source: yt("8MeBoqs3Yhk"),
    note: { sq: "Nga podiumi kritikohet Paketa e Maleve, në të njëjtën ditë kur mjekrra e mbron atë në Theth; thirrja për mobilizimin te Kuvendi më 23 korrik, në orën 08:00, bëhet eksplicite.", en: "From the podium the Mountain Package is criticized, the same day Rama defends it in Theth; the call to mobilize outside Parliament on July 23, at 08:00, becomes explicit." } },
  { day: 53, date: "2026-07-22", saturday: false, peak: 5.66, mean: 3.11, median: 3.01, source: yt("29710sUIVdU"),
    note: { sq: "Marshimi drejt Kuvendit pas një flamuri të gjatë kuq e zi; thirrja përfundimtare zgjidh orët kontradiktore të mëparshme, duke caktuar mbledhjen para Kuvendit nesër në orën 08:30.", en: "The march reaches Parliament behind a long red-and-black banner; the final call resolves the earlier conflicting times, settling on a gathering outside Parliament tomorrow at 08:30." } },
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
    sub: { sq: "Pika më e ulët e qershorit", en: "June's lowest point" } },
  { day: 30, tier: "primary", icon: "flag", mobile: true,
    label: { sq: "1 muaj protestë", en: "One month" },
    sub: { sq: "29 qershor", en: "29 June" } },
  { day: 31, tier: "primary", icon: "spark", mobile: true,
    label: { sq: "Dhuna brutale e regjimit", en: "The regime's brutal violence" },
    sub: { sq: "galvanizon protestën", en: "galvanizes the protest" } },
  { day: 33, tier: "primary", icon: "people", mobile: true,
    label: { sq: "Kuvendi + Komisariati Nr. 3", en: "Parliament + Police Station 3" },
    sub: { sq: "arrestime, marshim natën", en: "arrests, night march" } },
  { day: 35, tier: "primary", icon: "people", mobile: true,
    label: { sq: "Protesta mbarëkombëtare", en: "The nationwide protest" },
    sub: { sq: "4 korrik · diaspora", en: "4 July · diaspora" } },
  { day: 50, tier: "secondary", icon: "spark", mobile: false,
    label: { sq: "Dita më e dobët", en: "The weakest day" },
    sub: { sq: "Pika më e ulët e korrikut", en: "July's lowest point" } },
];

/** Normalization reference shown in the methodology note. */
export const NORMALIZATION = { index100Day: 21, index100Date: "2026-06-20" };
