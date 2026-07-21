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
      noLedgerNote: string;
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
      title: "13 vjet, 33 dosje: çfarë i ka bërë Shqipërisë kjo qeverisje.",
      intro:
        "Çdo dosje këtu është hulumtuar dhe kontrolluar veç e veç kundrejt gazetarisë investigative shqiptare (kryesisht Citizens.al dhe Reporter.al), plus BIRN, SPAK, KLSH dhe burime ndërkombëtare. Teksti është marrë ashtu siç është nga hulumtimi origjinal — jo i ripërmbledhur — që të mos humbasë saktësia.",
      methodology:
        "Çdo pretendim është shënuar si i konfirmuar, pjesërisht i konfirmuar, i paverifikuar, ose i kundërshtuar nga burimet. Emrat e personave trajtohen sipas statusit real ligjor: \"i akuzuar\"/\"nën hetim\" për çështje aktive, \"i dënuar\" vetëm kur ka vendim gjyqësor.",
    },
    dashboard: {
      totalLabel: "Dosje të dokumentuara",
      totalSuffix: "2013–2026",
      yearsLabel: "Vjet, i njëjti kryeministër",
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
      noLedgerNote:
        "Kjo dosje nuk përfshin një listë pretendimesh të verifikuara veç e veç — përmbledhja më sipër është vetë gjetja kryesore e hulumtimit.",
    },
    footerNote:
      "Ky dokumentim është hulumtuar me kërkim të pavarur, shumë prej burimeve me qasje të kufizuar teknike gjatë kërkimit — besueshmëria e shënuar te çdo dosje pasqyron këtë. Dosja e plotë e hulumtimit, me metodologjinë e detajuar, është publike si dokument i brendshëm i projektit.",
  },
  en: {
    langLabel: "English",
    altLangHref: "/liste_vuajtjesh",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    hero: {
      kicker: "Government track record",
      title: "13 years, 33 case files: what this government has done.",
      intro:
        "Each case file here was researched and independently checked against Albanian investigative journalism (mainly Citizens.al and Reporter.al), plus BIRN, SPAK, KLSH, and international sources. The text is kept as researched — not re-summarized — so accuracy isn't lost in translation.",
      methodology:
        "Each claim is marked confirmed, partially confirmed, unverified, or contradicted by sources. Named individuals are described by their real legal status: \"charged\"/\"under investigation\" for active cases, \"convicted\" only where a court has actually ruled.",
      enOnlyNote:
        "This report is currently written in Albanian only — it's sourced from Albanian investigative journalism, and every figure is checked against Albanian-language reporting. An English translation may follow later.",
    },
    dashboard: {
      totalLabel: "Documented case files",
      totalSuffix: "2013–2026",
      yearsLabel: "Years, the same prime minister",
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
      noLedgerNote:
        "This case file doesn't include a separately verified claim list — the summary above is itself the main research finding.",
    },
    footerNote:
      "This record was compiled through independent research; many sources had limited automated access during research, which the confidence rating on each case reflects. The full research document, with detailed methodology, is public as an internal project document.",
  },
};
