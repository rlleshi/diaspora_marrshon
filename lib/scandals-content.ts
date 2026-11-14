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
    hero: {
      kicker: string;
      title: string;
      intro: string;
      methodology: string;
      /** English only: says the case files are a translation */
      translationNote?: string;
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
    hero: {
      kicker: "Historiku i qeverisjes",
      title: "14 vjet, 33 dosje: çfarë i ka bërë Shqipërisë kjo organizatë.",
      intro:
        "Çdo dosje këtu është hulumtuar dhe kontrolluar veç e veç kundrejt gazetarisë investigative shqiptare (kryesisht portalet investigative Citizens.al dhe Reporter.al), plus BIRN, SPAK, KLSH dhe burime ndërkombëtare. Teksti ndjek hulumtimin origjinal, pa u ripërmbledhur.",
      methodology:
        "Çdo pretendim është shënuar si i konfirmuar, pjesërisht i konfirmuar, i paverifikuar ose i kundërshtuar nga burimet. Emrat e personave trajtohen sipas statusit real ligjor: \"i akuzuar\"/\"nën hetim\" për çështje aktive, \"i dënuar\" vetëm kur ka vendim gjyqësor.",
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
    hero: {
      kicker: "Government track record",
      title: "14 years, 33 case files: what this organisation has done to Albania.",
      intro:
        "Each case file here was researched and checked one by one against Albanian investigative journalism (mainly the investigative news sites Citizens.al and Reporter.al), as well as the Balkan Investigative Reporting Network, the Special Prosecution Office against Corruption and Organised Crime, the Albanian Supreme Audit Institution and international sources. The text follows the original research and has not been re-summarised.",
      methodology:
        "Each claim is marked as confirmed, partially confirmed, unverified or contradicted by the sources. Named individuals are described by their actual legal status: \"charged\"/\"under investigation\" for active cases, and \"convicted\" only where there is a court ruling.",
      translationNote:
        "These case files are an English translation of the original Albanian research.",
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
