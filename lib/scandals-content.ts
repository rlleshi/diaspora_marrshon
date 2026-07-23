import type { Locale } from "@/lib/content";
import type { ScandalCategory, ScandalStatusBucket, ClaimVerdict } from "@/data/scandals";

export const categoryOrder: ScandalCategory[] = [
  "infrastructure-land",
  "public-funds-health",
  "justice-crime",
  "cyber-data",
  "life-safety-state",
];

export const statusBucketOrder: ScandalStatusBucket[] = [
  "no-process",
  "investigation",
  "convicted",
];

export const scandalsPageContent: Record<
  Locale,
  {
    langLabel: string;
    altLangHref: string;
    altLangLabel: string;
    homeHref: string;
    homeLabel: string;
    hero: {
      kicker: string;
      title: string;
      intro: string;
      methodology: string;
      enOnlyNote?: string;
    };
    dashboard: {
      totalLabel: string;
      totalSuffix: string;
      yearsLabel: string;
      statusBarCaption: string;
    };
    categories: Record<ScandalCategory, string>;
    filterAllLabel: string;
    statusBucketLabels: Record<ScandalStatusBucket, string>;
    verdictLabels: Record<ClaimVerdict, string>;
    chrono: {
      caption: string;
    };
    card: {
      openLabel: string;
      closeLabel: string;
      statusLabel: string;
      ledgerHeading: string;
      verificationHeading: string;
      confidenceLabel: string;
      sourcesHeading: string;
    };
    footerNote: string;
  }
> = {
  sq: {
    langLabel: "Shqip",
    altLangHref: "/en/liste_vuajtjesh",
    altLangLabel: "English",
    homeHref: "/",
    homeLabel: "Kthehu te faqja kryesore",
    hero: {
      kicker: "Historiku i qeverisjes",
      title: "14 vjet, 33 dosje: çfarë i ka bërë Shqipërisë kjo organizatë.",
      intro:
        "Çdo dosje këtu është hulumtuar dhe kontrolluar veç e veç kundrejt gazetarisë investigative shqiptare (kryesisht Citizens.al dhe Reporter.al), plus BIRN, SPAK, KLSH dhe burime ndërkombëtare. Teksti ndjek hulumtimin origjinal, pa u ripërmbledhur.",
      methodology:
        "Çdo pretendim është shënuar si i konfirmuar, pjesërisht i konfirmuar, i paverifikuar, ose i kundërshtuar nga burimet. Emrat e personave trajtohen sipas statusit real ligjor: \"i akuzuar\"/\"nën hetim\" për çështje aktive, \"i dënuar\" vetëm kur ka vendim gjyqësor.",
    },
    dashboard: {
      totalLabel: "Dosje të dokumentuara",
      totalSuffix: "2013–2026",
      yearsLabel: "Vjet, e njëjta mjekërr",
      statusBarCaption: "Statusi ligjor i të 33 dosjeve",
    },
    categories: {
      "infrastructure-land": "Infrastrukturë & tokë",
      "public-funds-health": "Fonde publike & shëndetësi",
      "justice-crime": "Drejtësi & krim",
      "cyber-data": "Kibernetikë & të dhëna",
      "life-safety-state": "Siguria e jetës & shteti",
    },
    filterAllLabel: "Të gjitha",
    statusBucketLabels: {
      "no-process": "Pa proces penal",
      investigation: "Nën hetim aktiv",
      convicted: "Dënim final",
    },
    verdictLabels: {
      confirmed: "I konfirmuar",
      partial: "Pjesërisht i konfirmuar",
      unverified: "I paverifikuar",
      contradicted: "I kundërshtuar nga burimet",
    },
    chrono: {
      caption: "Kronologjia · kliko një pikë",
    },
    card: {
      openLabel: "Hap dosjen",
      closeLabel: "Mbyll dosjen",
      statusLabel: "Statusi",
      ledgerHeading: "Verifikimi i pretendimeve",
      verificationHeading: "Verifikim i pavarur shtesë",
      confidenceLabel: "Besueshmëria e hulumtimit",
      sourcesHeading: "Burimet",
    },
    footerNote:
      "Besueshmëria e shënuar te çdo dosje pasqyron sasinë dhe cilësinë e burimeve publike të gjetura për atë rast specifik — disa skandale janë dokumentuar gjerësisht nga media dhe institucione, të tjera më pak.",
  },
  en: {
    langLabel: "English",
    altLangHref: "/liste_vuajtjesh",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    hero: {
      kicker: "Government track record",
      title: "14 years, 33 case files: what this organization has done.",
      intro:
        "Each case file here was researched and independently checked against Albanian investigative journalism (mainly Citizens.al and Reporter.al), plus BIRN, SPAK, KLSH, and international sources. The text follows the original research, not re-summarized.",
      methodology:
        "Each claim is marked confirmed, partially confirmed, unverified, or contradicted by sources. Named individuals are described by their real legal status: \"charged\"/\"under investigation\" for active cases, \"convicted\" only where a court has actually ruled.",
      enOnlyNote:
        "This report is currently written in Albanian only — it's sourced from Albanian investigative journalism, and every figure is checked against Albanian-language reporting. An English translation may follow later.",
    },
    dashboard: {
      totalLabel: "Documented case files",
      totalSuffix: "2013–2026",
      yearsLabel: "Years, the same beard",
      statusBarCaption: "Legal status across all 33 case files",
    },
    categories: {
      "infrastructure-land": "Infrastructure & land",
      "public-funds-health": "Public funds & health",
      "justice-crime": "Justice & crime",
      "cyber-data": "Cyber & data",
      "life-safety-state": "Life, safety & the state",
    },
    filterAllLabel: "All",
    statusBucketLabels: {
      "no-process": "No criminal process",
      investigation: "Active investigation",
      convicted: "Final conviction",
    },
    verdictLabels: {
      confirmed: "Confirmed",
      partial: "Partially confirmed",
      unverified: "Unverified",
      contradicted: "Contradicted by sources",
    },
    chrono: {
      caption: "Timeline · click a dot",
    },
    card: {
      openLabel: "Open case file",
      closeLabel: "Close case file",
      statusLabel: "Status",
      ledgerHeading: "Claim verification",
      verificationHeading: "Additional independent verification",
      confidenceLabel: "Research confidence",
      sourcesHeading: "Sources",
    },
    footerNote:
      "The confidence rating on each case reflects the amount and quality of public sourcing found for that specific case — some scandals are extensively covered by media and institutions, others less so.",
  },
};
