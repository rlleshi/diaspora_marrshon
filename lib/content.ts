import type {
  JoiningPoint,
  ParticipationType,
  SourceLanguage,
} from "@/lib/pledge-options";
import { participation } from "@/data/participation";
import { scandals } from "@/data/scandals";
import { mapDate, mapSnapshot } from "@/lib/map-content";

export type Locale = SourceLanguage;

// Derived from the tracker data so the homepage teaser never lags behind /pulsi.
const protestDays = String(participation.length);

// Derived from the scandal dossier so the homepage teaser never lags behind /liste_vuajtjesh.
const scandalCount = String(scandals.length);

// The protest-map counts, outside Albania (see lib/map-content.ts for how to refresh them).
const { protestsAbroad, citiesAbroad, countriesAbroad } = mapSnapshot;

type Option<T extends string> = {
  value: T;
  label: string;
};

export type SiteContent = {
  langLabel: string;
  altLangHref: string;
  altLangLabel: string;
  nav: {
    tracker: string;
    map: string;
    scandals: string;
    safety: string;
    march: string;
    pledge: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    campaignTitle: {
      lead: string;
      accent: string;
    };
    eyebrow: string;
    dateLabel: string;
    dateDay: string;
    dateMonth: string;
    dateMeta: string;
    dateText: string;
    dateRows: Array<{
      time: string;
      location: string;
      note?: string;
    }>;
    /** while set, the hero shows this call to come home instead of the march date card */
    call?: {
      label: string;
      title: string;
      subtitle: string;
      /** the next national protest in Tirana, shown under the call; leave it out when none is announced */
      date?: {
        day: string;
        month: string;
        meta: string;
        note?: string;
      };
      steps: [string, string, string];
    };
    title: string;
    subtitle: string;
    subtitleEmphasis: string;
    badges: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  pledgeIntro: {
    title: string;
    body: string;
    /** the same line for phones, which hide the QR: you can't scan your own screen */
    bodyPhone: string;
    /** chips under the intro: the group is private, and the admins approve every member */
    assurances: [string, string, string];
  };
  shirtsTeaser: {
    kicker: string;
    title: string;
    body: string;
    href: string;
    cta: string;
    previewAlt: string;
  };
  trackerTeaser: {
    kicker: string;
    title: string;
    body: string;
    href: string;
    cta: string;
    /** chip in the home hero that leads into /pulsi */
    heroChip: string;
    stats: Array<{ value: string; label: string }>;
    community: {
      title: string;
      body: string;
      sisterLabel: string;
      sisterHref: string;
    };
  };
  scandalsTeaser: {
    href: string;
  };
  /**
   * The homepage's opening statement, right under the hero: what the Flamingo
   * Revolution is, who we are and what we want, then the principle we stand on.
   * Written for a visitor who knows nothing about Albania.
   */
  mission: {
    kicker: string;
    title: string;
    paragraphs: string[];
    links: {
      tracker: string;
      demands: string;
      history: string;
      map: string;
    };
    principle: {
      kicker: string;
      /** Hume's paragraph, verbatim, split into short paragraphs for reading; **text** is set in bold */
      quote: string[];
      author: string;
      work: string;
      /** the full text of the source */
      href: string;
      /** our reading of the quote; **text** (its last words) is set large and red */
      gloss: string;
    };
  };
  /** the homepage band that leads to the protest map on /harta */
  mapTeaser: {
    kicker: string;
    title: string;
    body: string;
    source: string;
    href: string;
    cta: string;
  };
  /** the homepage cards that lead to every page: Pulsi, the map, history, scandals and safety; titles come from nav, the history card reuses marchPage.body */
  overview: {
    title: string;
    tracker: string;
    map: string;
    scandals: string;
    safety: string;
  };
  /**
   * The top of /marshimi, now the diaspora's history page: how the site began,
   * the protests abroad, the marches in Tirana, the help beyond the square, the
   * demands and the summer shirts. The URL and section ids stay as they were.
   */
  marchPage: {
    href: string;
    kicker: string;
    title: string;
    body: string;
  };
  march: {
    kicker: string;
    title: string;
    body: string;
  };
  whatsapp: {
    title: string;
    body: string;
    qrAlt: string;
    openLabel: string;
    templateTitle: string;
    templateIntro: string;
    template: string;
    copyLabel: string;
    copiedLabel: string;
  };
  itinerary: {
    kicker: string;
    title: string;
    dateLine: string;
    body: string;
    showMap: boolean;
    mapAlt: string;
    mapOpenLabel: string;
    mapExternalLabel: string;
    points: Array<{
      time: string;
      title: string;
      body: string;
    }>;
  };
  practicalAdvice: {
    kicker: string;
    title: string;
    body: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  rules: {
    kicker: string;
    title: string;
    body: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  context: {
    kicker: string;
    title: string;
    body: {
      before: string;
      link: string;
      href: string;
      after: string;
    };
    demands: Array<{
      text: string;
      items?: string[];
    }>;
    closing: string;
  };
  /** the history page's own sections, around the marches carousel */
  history: {
    origin: {
      kicker: string;
      title: string;
      body: string;
    };
    abroad: {
      kicker: string;
      title: string;
      body: string;
      /** heading above the carousel, so the five moments read as a selection, not the whole record */
      highlightsTitle: string;
      /** shown in the same carousel as pastMarches, newest first */
      carousel: {
        regionLabel: string;
        prevLabel: string;
        nextLabel: string;
        goToLabel: string;
      };
      moments: Array<{
        dateLabel: string;
        title: string;
        route: string;
        summary: string;
      }>;
      mapCta: string;
    };
    beyond: {
      kicker: string;
      title: string;
      body: string;
      /** one dated moment shown above the cards, in the style of the carousel cards */
      highlight?: {
        dateLabel: string;
        title: string;
        route: string;
        summary: string;
      };
      items: Array<{
        title: string;
        body: string;
      }>;
    };
  };
  pastMarches: {
    kicker: string;
    title: string;
    body: string;
    carousel: {
      regionLabel: string;
      prevLabel: string;
      nextLabel: string;
      goToLabel: string;
    };
    items: Array<{
      dateLabel: string;
      title: string;
      route: string;
      summary: string;
    }>;
  };
  form: {
    title: string;
    body: string;
    firstName: string;
    email: string;
    country: string;
    city: string;
    joiningPoint: string;
    participationType: string;
    whatsappOptIn: string;
    whatsappNumber: string;
    volunteerOptIn: string;
    volunteerInterest: string;
    consent: string;
    consentVersion: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    genericError: string;
    validationError: string;
    botError: string;
    required: string;
    invalidEmail: string;
    joiningPointOptions: Option<JoiningPoint>[];
    participationTypeOptions: Option<ParticipationType>[];
    volunteerPlaceholder: string;
  };
  confirm: {
    confirmedTitle: string;
    confirmedBody: string;
    usedTitle: string;
    usedBody: string;
    expiredTitle: string;
    expiredBody: string;
    invalidTitle: string;
    invalidBody: string;
    home: string;
  };
};

/** Entry group for the diaspora on WhatsApp (homepage QR and the safety guide). */
export const WHATSAPP_INVITE_URL =
  "https://chat.whatsapp.com/L6oe4JyUi8k0h13oJSv7DP?s=cl&p=i&mlu=0&ilr=0&amv=2";

/**
 * Shows the "next march" section on /marshimi (itinerary and principles), the
 * hero button that links to it and the march wording in the WhatsApp message
 * template, the /marshimi intro and its search description. Off while no
 * march is planned; both versions of the text stay in place, so turning it
 * back on is this one line.
 */
export const SHOW_NEXT_MARCH = false;

export const content: Record<Locale, SiteContent> = {
  sq: {
    langLabel: "Shqip",
    altLangHref: "/en",
    altLangLabel: "English",
    nav: {
      tracker: "Pulsi i protestës",
      map: "Harta",
      scandals: "Skandalet",
      safety: "Siguria",
      march: "Historiku",
      pledge: "Bashkohu në WhatsApp",
      menuOpen: "Hap menynë",
      menuClose: "Mbyll menynë",
    },
    hero: {
      campaignTitle: {
        lead: "Flamingo Revolution",
        accent: "Diaspora",
      },
      eyebrow: "Me sheshin në Tiranë",
      dateLabel: "Data e marshimit",
      dateDay: "Do",
      dateMonth: "NJOFTOHET",
      dateMeta: "Marshimi i radhës",
      dateText: "Do të njoftohet",
      dateRows: [
        { time: "19:00", location: "Sheshi Nënë Tereza" },
        { time: "19:15", location: "Sheshi Skënderbej" },
      ],
      call: {
        label: "Thirrje për çdo shqiptar jashtë vendit",
        title: "Kthehu.",
        subtitle: "Sheshi të pret.",
        // take the date out after 29 November 2026
        date: {
          day: "28-29",
          month: "nëntor",
          meta: "Protesta kombëtare",
          note: "Një ditë e veçantë pavarësie dhe çlirimi",
        },
        steps: [
          "Na thuaj në WhatsApp kur vjen",
          "Merr me vete familjen dhe miqtë",
          "Bashkohu në protestë, çdo ditë",
        ],
      },
      title: "Kur dheu jep zë, diaspora zbret.",
      subtitle:
        "Qindra protesta në qytetet ku jetojmë dhe marshime në Tiranë, në mbështetje të sheshit.",
      subtitleEmphasis: "Paqësisht, vetëm nën flamurin shqiptar.",
      badges: ["Paqësor", "Jopartiak", "Kudo në botë"],
      primaryCta: "Bashkohu në WhatsApp",
      secondaryCta: "Shiko itinerarin",
    },
    pledgeIntro: {
      title: "Bashkohu në WhatsApp për koordinim.",
      body:
        "Kërko hyrjen me butonin ose me QR-in. Pasi të pranohesh në grup, shkruaj mesazhin e shkurtër më poshtë.",
      bodyPhone:
        "Kërko hyrjen me butonin. Pasi të pranohesh në grup, shkruaj mesazhin e shkurtër më poshtë.",
      assurances: [
        "Grup privat",
        "Çdo anëtar miratohet nga administratorët",
        "Paqësor: pa fyerje, kërcënime apo nxitje dhune",
      ],
    },
    shirtsTeaser: {
      kicker: "Bluzat e verës",
      title: "Diaspora në shesh, me të njëjtat bluza.",
      body:
        "Në marshimet e verës, bluzat me flamurin shqiptar pranë flamurit të vendit ku jetojmë u bënë shenja e diasporës në shesh. Tani janë pjesë e historisë sonë.",
      href: "/veshja",
      cta: "Shiko bluzat",
      previewAlt:
        "Sugjerim për bluza të diasporës në version të zi dhe të bardhë",
    },
    trackerTeaser: {
      kicker: "Indeksi i pjesëmarrjes",
      title: `${protestDays} ditë në shesh, ditë pas dite.`,
      body:
        "Ndiq pulsin e protestës: pjesëmarrje e dokumentuar qartësisht në kamera, nga vala e parë e 6 qershorit dhe marshimet e diasporës (20 qershor, 4 korrik, 14-16 gusht, 12 shtator), te protestat e studentëve që nga 13 tetori, deri te protesta kombëtare e 24 tetorit, nata më e madhe që nga 4 korriku.",
      href: "/pulsi",
      cta: "Shiko pulsin e protestës",
      heroChip: `Nata ${protestDays} · shiko pulsin e protestës`,
      stats: [
        { value: protestDays, label: "ditë proteste" },
        { value: "20.06", label: "dita më e madhe" },
        { value: "100K+", label: "në shesh më 20 qershor (vlerësim)" },
      ],
      community: {
        title: "Nga idetë te puna konkrete",
        body:
          "Dëshiron të kontribuosh edhe në projekte të tjera për Shqipërinë? Vizito faqen simotër, Flamingo Revolution, për të njohur nismat e tjera dhe për t'i kthyer idetë në punë konkrete.",
        sisterLabel: "FlamingoRevolution.eu",
        sisterHref: "https://www.flamingorevolution.eu/",
      },
    },
    scandalsTeaser: {
      href: "/liste_vuajtjesh",
    },
    mission: {
      kicker: "Misioni ynë",
      title: "Diaspora shqiptare në Revolucionin Flamingo.",
      paragraphs: [
        "Revolucioni Flamingo është protesta qytetare që del çdo ditë në rrugët e Tiranës që nga 31 maji 2026. Nisi për mbrojtjen e Zvërnecit pranë Vlorës nga një projekt turistik luksoz, por u bë shpejt një lëvizje që kërkon dorëheqjen e qeverisë, një qeveri teknike tranzitore dhe një kontratë të re sociale.",
        "Ne jemi shqiptarë që jetojmë jashtë vendit. Përtej kufijve të Shqipërisë, në çdo cep të rruzullit tokësor, janë mbajtur qindra protesta në dhjetëra qytete, nga Vankuveri te Melburni, ndërsa mërgata është kthyer vazhdimisht dhe fuqimisht në Tiranë për të marshuar me sheshin. Gjithçka që bën mërgata është në solidaritet me Shqipërinë.",
        "Qëllimi ynë është ai i sheshit dhe ai për të cilin [Migjeni](https://wikisource.org/wiki/T%C3%AB_Lindet_Njeriu) ngriti zërin me forcë gati një shekull më parë: një Shqipëri në rrugën e zhvillimit të përshpejtuar, me një qeveri që u përgjigjet qytetarëve të vet.",
      ],
      links: {
        tracker: "Pulsi i protestës",
        demands: "Kërkesat e protestës",
        history: "Çfarë ka bërë diaspora",
        map: "Harta e protestave",
      },
      principle: {
        kicker: "Parimi ynë",
        quote: [
          "Asgjë nuk duket më befasuese për ata që i vështrojnë punët e njerëzve me sy filozofik sesa lehtësia me të cilën shumica qeveriset nga pakica dhe nënshtrimi i pakushtëzuar me të cilin njerëzit heqin dorë nga ndjenjat dhe pasionet e veta për ato të sundimtarëve.",
          "Kur pyesim sesi arrihet kjo kryeçudi, shohim se, meqë forca është gjithmonë në anën e të qeverisurve, qeveritarët nuk kanë asgjë tjetër që t'i mbajë veç opinionit.",
          "**Prandaj qeverisja themelohet vetëm mbi opinionin;** dhe kjo maksimë vlen për qeveritë më despotike dhe më ushtarake, po aq sa për qeveritë më të lira dhe më popullore.",
        ],
        author: "David Hume",
        work: "“Mbi parimet e para të qeverisjes”, 1741",
        href: "https://davidhume.org/texts/empl1/fp",
        gloss:
          "Fuqia i përket popullit dhe jo elitave të korruptuara dhe kur ky i fundit e kupton këtë fakt të thjeshtë, **loja ka mbaruar.**",
      },
    },
    mapTeaser: {
      kicker: "Harta e protestave",
      title: `${protestsAbroad} protesta në ${citiesAbroad} qytete jashtë Shqipërisë.`,
      body: `Nga Vankuveri te Melburni, në ${countriesAbroad} shtete. Në Mynih, Londër, Milano, Berlin dhe Vjenë, diaspora protestoi pothuajse çdo javë gjatë gjithë verës.`,
      source: `Sipas hartës vullnetare Flamingo Map, gjendja më ${mapDate(mapSnapshot.asOf, "sq")}. Sfondi i hartës: © kontribuesit e OpenStreetMap.`,
      href: "/harta",
      cta: "Hap hartën",
    },
    overview: {
      title: "Çfarë gjen në këtë faqe",
      tracker:
        "Madhësia e turmës në shesh çdo natë që nga 31 maji: vlerësim me AI nga transmetimet live, me një shënim për çdo ditë.",
      map: "Protestat e Revolucionit Flamingo në Shqipëri dhe në botë, qytet pas qyteti.",
      scandals: `${scandalCount} dosje nga 14 vjet qeverisje, me statusin ligjor, pretendimet e verifikuara dhe burimet.`,
      safety:
        "Çfarë të marrësh me vete, si të kujdesesh për veten e të tjerët dhe cilat janë të drejtat e tua.",
    },
    marchPage: {
      href: "/marshimi",
      kicker: "Historiku",
      title: "Çfarë ka bërë diaspora për Revolucionin Flamingo.",
      body: SHOW_NEXT_MARCH
        ? "Protestat jashtë Shqipërisë, autokolonat dhe marshimet në Tiranë, marshimi i radhës dhe kërkesat e protestës."
        : "Protestat jashtë Shqipërisë, autokolonat dhe marshimet në Tiranë, ndihma për sheshin dhe kërkesat e protestës.",
    },
    march: {
      kicker: "Marshimi",
      title: "Marshimi i radhës",
      body:
        "Data e marshimit të radhës do të njoftohet. Gjithçka për ditën e marshimit: itinerari dhe parimet.",
    },
    whatsapp: {
      title: "Hyr në grupin e diasporës",
      body:
        "Ky është grupi privat i hyrjes për diasporën. Çdo kërkesë për hyrje shqyrtohet nga administratorët.",
      qrAlt: "QR për grupin WhatsApp të diasporës",
      openLabel: "Hap WhatsApp",
      templateTitle: "Mesazhi që mund të shkruash pas hyrjes",
      templateIntro: SHOW_NEXT_MARCH
        ? "Nëse dëshiron, kopjoje mesazhin, shkruaj emrin dhe zgjidh një ose më shumë nga mundësitë më poshtë."
        : "Nëse dëshiron, kopjoje mesazhin, shkruaj emrin dhe si mund ta ndihmosh protestën.",
      template: SHOW_NEXT_MARCH
        ? `Përshëndetje, jam [Emri] nga [Shteti / qyteti].

Zgjedh njërën nga këto:

A) Bashkohem në marshimin e radhës te:
[Sheshi Nënë Tereza - 19:00 / Sheshi Skënderbej - 19:15]

B) Dua të mbaj fjalim tek fonia

C) Nuk marshoj, por mund të ndihmoj me:
[opsionale]`
        : `Përshëndetje, jam [Emri] nga [Shteti / qyteti].

Mund ta ndihmoj protestën me: [si mund të ndihmosh]`,
      copyLabel: "Kopjo mesazhin",
      copiedLabel: "U kopjua",
    },
    itinerary: {
      kicker: "Itinerari",
      title: "Nga Sheshi Nënë Tereza drejt Sheshit Skënderbej",
      dateLine: "Data: do të njoftohet",
      body:
        "Marshimi nis te Sheshi Nënë Tereza, para Universitetit Politeknik të Tiranës, në 19:00 dhe bashkohet me protestën kryesore në Sheshin Skënderbej në 19:15.",
      showMap: false,
      mapAlt:
        "Harta e marshimit nga Sheshi Nënë Tereza drejt Sheshit Skënderbej",
      mapOpenLabel: "Hap hartën e marshimit në madhësi të plotë",
      mapExternalLabel: "Hap itinerarin në Google Maps",
      points: [
        {
          time: "19:00",
          title: "Sheshi Nënë Tereza",
          body:
            "Nisja e marshimit nga Sheshi Nënë Tereza, para Universitetit Politeknik të Tiranës.",
        },
        {
          time: "19:15",
          title: "Sheshi Skënderbej",
          body: "Bashkim me protestën kryesore në Sheshin Skënderbej.",
        },
      ],
    },
    practicalAdvice: {
      kicker: "Këshilla praktike",
      title: "Përgatitu për ecje të gjatë në asfalt",
      body:
        "Mbaji gjërat të thjeshta: ujë, ushqim i lehtë, ritëm i qetë dhe këpucë të provuara. Qëllimi është të arrijmë të gjithë të bashkuar dhe në gjendje të mirë.",
      items: [
        {
          title: "Ujë",
          body:
            "Pi ujë rregullisht gjatë ecjes. Merr një shishe të madhe me vete dhe mbushe sa herë të kesh mundësi, sidomos sepse dita do të jetë e nxehtë.",
        },
        {
          title: "Ushqim",
          body:
            "Merr banane, sanduiç, arra ose bar energjetik. Ha vakte të vogla rreth çdo 2 orë.",
        },
        {
          title: "Pauza",
          body:
            "Do të ndalojmë rreth 5 minuta çdo 1 orë. Çdo 2 orë do të bëjmë një pauzë më të gjatë, rreth 15 minuta.",
        },
        {
          title: "Këpucët",
          body:
            "Vish atlete ecjeje me taban të butë. Mos vish këpucë të reja pa i provuar më parë.",
        },
        {
          title: "Lodhja",
          body:
            "Rruga nga Sheshi Nënë Tereza deri te Sheshi Skënderbej është e shkurtër, rreth 15 minuta ecje, por ritmi duhet të mbetet i qetë që grupi të qëndrojë i bashkuar.",
        },
        {
          title: "Çanta",
          body:
            "Mbaje të lehtë, nën 3 kg nëse mundesh. Çanta me rrip beli e shpërndan peshën më mirë.",
        },
      ],
    },
    rules: {
      kicker: "Parimet tona",
      title: "Vetëm qytetari, disiplinë dhe flamuri shqiptar",
      body:
        "Këto parime janë premisa publike e marshimit. Ato nuk janë të negociueshme.",
      items: [
        {
          title: "Vetëm nën flamurin shqiptar",
          body:
            "Marshimi nuk përfaqëson parti politike, organizatë apo grup interesi.",
        },
        {
          title: "Protestë paqësore dhe qytetare",
          body:
            "E drejta demokratike ushtrohet me respekt për ligjin dhe për njerëzit përreth.",
        },
        {
          title: "Respekt për njëri-tjetrin",
          body:
            "Nuk pranohen fyerje, kërcënime, provokime, diskriminim apo nxitje dhune.",
        },
        {
          title: "Qetësi ndaj çdo provokimi",
          body:
            "Përgjigjja ndaj provokimit është qetësia, dinjiteti dhe përgjigjja në grup.",
        },
        {
          title: "Përgjegjësi personale",
          body:
            "Çdo pjesëmarrës mban përgjegjësi për veprimet dhe deklaratat e veta.",
        },
        {
          title: "Bashkim përtej bindjeve",
          body:
            "Ajo që na bashkon është interesi për të ardhmen e Shqipërisë.",
        },
      ],
    },
    context: {
      kicker: "Pse protestojmë",
      title: "Për të futur Shqipërinë në rrugën e zhvillimit të përshpejtuar",
      body: {
        before: "Zaten si ",
        link: "tigrat e Azisë",
        href: "https://www.youtube.com/watch?v=XF3nEmKziWU",
        after: " në shekullin e kaluar.",
      },
      demands: [
        { text: "Dorëheqjen e panegociueshme të Kryeministrit dhe të qeverisë." },
        {
          text: "Krijimin e një qeverie teknike tranzitore, jopartiake, me mandat 12‑mujor.",
        },
        {
          text:
            "Ndryshime kushtetuese, ku të gjithë shtetasit shqiptarë të jenë të barabartë para ligjit, të miratuara me referendum popullor, duke përfshirë ndër të tjera:",
          items: [
            "Ndryshimin e Kodit Zgjedhor.",
            "Ndryshimin e ligjit për financimin e partive politike dhe organizatave të ndryshme.",
            "Kufizimin e ushtrimit të detyrës së Kryeministrit në jo më shumë se dy mandate, të plota ose të pjesshme, gjatë gjithë jetës politike të një individi.",
          ],
        },
        {
          text: "Paralelisht, kërkojmë:",
          items: [
            "Anulimin e ndryshimeve të bëra në ligjin për \"Zonat e Mbrojtura\".",
            "Anulimin e ndryshimeve të bëra në ligjin për \"Trashëgiminë kulturore\".",
            "Shfuqizimin e paketës ligjore të njohur si \"Paketa e Maleve\".",
            "Shfuqizimin e statusit dhe të kuadrit ligjor për \"Investimet Strategjike\".",
          ],
        },
        {
          text:
            "Hartimin e një kontrate të re sociale mes qytetarëve dhe shtetit, pas konsultimit me intelektualë, ekspertë teknikë dhe qytetarë apartiakë të propozuar nga sheshi i protestës.",
        },
      ],
      closing:
        "Gjithë shqiptaria zbret kur mëmëdheu thërret.",
    },
    history: {
      origin: {
        kicker: "Si nisi",
        title: "Ideja e parë: nga aeroporti te Kryeministria.",
        body:
          "Kjo faqe nisi me një ide të thjeshtë: sapo të zbarkonim në aeroport, të marshonim në këmbë deri te Kryeministria. Prej saj lindën marshimet e diasporës, në forma të ndryshme. Sot faqja përfaqëson diasporën në Revolucionin Flamingo në tërësi: protestat në qytetet ku jetojmë, ndihmën për sheshin dhe zërin tonë jashtë vendit.",
      },
      abroad: {
        kicker: "Jashtë Shqipërisë",
        title: "Qindra protesta në qytetet ku jetojmë.",
        body: `Jashtë Shqipërisë janë mbajtur ${protestsAbroad} protesta në ${citiesAbroad} qytete të ${countriesAbroad} shteteve, sipas hartës vullnetare Flamingo Map (gjendja më ${mapDate(mapSnapshot.asOf, "sq")}). Në shumë qytete protestat u bënë të përjavshme: në Mynih, Londër, Milano, Berlin dhe Vjenë, diaspora doli pothuajse çdo javë gjatë gjithë verës.`,
        highlightsTitle: "Disa nga momentet kryesore",
        carousel: {
          regionLabel: "Disa nga momentet kryesore të protestave jashtë Shqipërisë",
          prevLabel: "Rrëshqit majtas",
          nextLabel: "Rrëshqit djathtas",
          goToLabel: "Shko te protesta",
        },
        moments: [
          {
            dateLabel: "11 nëntor 2026",
            title: "Rama në Dublin",
            route: "Dublin, Irlandë",
            summary:
              "Në Dublin, shqiptarët protestuan gjatë vizitës së Ramës, duke kërkuar dorëheqjen e tij dhe duke thënë se Shqipëria nuk është në shitje. Drejt kryeministrit u hodh edhe një vezë.",
          },
          {
            dateLabel: "3 tetor 2026",
            title: "Para Komisionit Evropian",
            route: "Bruksel, Belgjikë",
            summary:
              "Diaspora protestoi në Bruksel para Komisionit Evropian, me një flamur gjigant kuq e zi dhe pankarta “Albania is not for sale”.",
          },
          {
            dateLabel: "14 korrik 2026",
            title: "Para Këshillit Evropian",
            route: "Bruksel, Belgjikë",
            summary:
              "Diaspora protestoi në Bruksel para Këshillit Evropian, gjatë konferencës mes Shqipërisë dhe Bashkimit Evropian.",
          },
          {
            dateLabel: "16 qershor 2026",
            title: "Rama në Berlin",
            route: "Berlin, Gjermani",
            summary:
              "Në Berlin, shqiptarët protestuan kur Rama doli nga një konferencë gjatë vizitës së tij në Gjermani.",
          },
          {
            dateLabel: "5-6 qershor 2026",
            title: "Protestat e para të diasporës",
            route: "Berlin, Mynih, Londër, Vjenë, Frankfurt",
            summary:
              "Nisën protestat e diasporës, që do të vazhdonin javë pas jave, muaj pas muaji. Të parat u mbajtën më 5 qershor në Berlin dhe Mynih, pastaj më 6 qershor në Londër, Vjenë dhe Frankfurt, ditën kur java e parë e protestës arriti kulmin.",
          },
        ],
        mapCta: "Shiko hartën e protestave",
      },
      beyond: {
        kicker: "Përtej sheshit",
        title: "Ndihmë për sheshin, zë jashtë vendit.",
        body:
          "Përveç protestave, diaspora e ndihmon sheshin me fonde e materiale dhe e mban protestën para syve të politikës dhe të mediave jashtë vendit.",
        highlight: {
          dateLabel: "26 tetor 2026",
          title: "Me kancelarin austriak",
          route: "Vjenë, Austri",
          summary:
            "Në Vjenë, diaspora takoi kancelarin austriak, Christian Stocker, katër deputetë austriakë dhe sekretarin e presidentit të Austrisë. Foli për dhunën e policisë ndaj protestuesve dhe për paketën ligjore për tubimet që propozonte qeveria. I kërkoi Austrisë të bëhet zëri i protestuesve shqiptarë në Bashkimin Evropian.",
        },
        items: [
          {
            title: "Fonde dhe materiale për protestuesit",
            body:
              "Kemi mbledhur fonde dhe i kemi dërguar në Shqipëri. Kur shpërthyen protestat e studentëve, dërguam materiale të ndihmës së parë dhe pajisje mbrojtëse për protestuesit.",
          },
          {
            title: "Me politikanët evropianë",
            body:
              "Kemi kontaktuar shumë politikanë: deputetë të Parlamentit Evropian dhe politikanë gjermanë nga i gjithë spektri politik. Në Vjenë takuam kancelarin austriak, Christian Stocker. Në Mynih ftuam një nënkryetar të Parlamentit të Bavarisë.",
          },
          {
            title: "Me mediat",
            body:
              "Kemi kontaktuar shumë media ndërkombëtare për protestën. Pulsin (indeksin tonë ditor të pjesëmarrjes) e kanë cituar media në Itali dhe në Gjermani.",
          },
          {
            title: "Për të drejtat e njeriut",
            body:
              "U dërgojmë disa institucioneve të Bashkimit Evropian raporte të rregullta për shkeljet e të drejtave të njeriut gjatë protestave.",
          },
          {
            title: "Akademikët e diasporës",
            body:
              "Akademikët shqiptarë jashtë vendit (të mbledhur te Diaspora Akademike) e mbështetën protestën që në qershor, i shkruan Komisionit Evropian në korrik dhe në tetor kërkuan një hetim të pavarur për dhunën e policisë.",
          },
          {
            title: "Letër e hapur për Evropën",
            body:
              "Në qershor, një kolektiv qytetarësh të diasporës shqiptare në Evropë u dërgoi liderëve evropianë një letër të hapur, të botuar në Le Courrier des Balkans.",
          },
        ],
      },
    },
    pastMarches: {
      kicker: "Në Tiranë",
      title: "Autokolonat dhe marshimet e diasporës",
      body:
        "Që nga qershori, diaspora është kthyer disa herë në Tiranë për t'iu bashkuar sheshit.",
      carousel: {
        regionLabel: "Autokolonat dhe marshimet e diasporës",
        prevLabel: "Rrëshqit majtas",
        nextLabel: "Rrëshqit djathtas",
        goToLabel: "Shko te marshimi",
      },
      items: [
        {
          dateLabel: "16-19 tetor 2026",
          title: "Diaspora kthehet për studentët",
          route: "Tiranë, në protestën e studentëve",
          summary:
            "Pa marshim të organizuar: qindra shqiptarë të diasporës u kthyen vetë në Tiranë për t'u bashkuar me protestën e studentëve, në solidaritet me ta.",
        },
        {
          dateLabel: "12 shtator 2026",
          title: "Marshimi i katërt i diasporës",
          route: "Sheshi Nënë Tereza → Sheshi Skënderbej",
          summary:
            "Marshimi i katërt qytetar dhe paqësor i diasporës, nga Sheshi Nënë Tereza drejt Sheshit Skënderbej, me rreth 250 pjesëmarrës, në mbështetje të protestës kombëtare.",
        },
        {
          dateLabel: "14-16 gusht 2026",
          title: "Marshimi i tretë i diasporës",
          route: "Bulevardi i Ri → Sheshi Skënderbej",
          summary:
            "Marshimi i tretë qytetar dhe paqësor i diasporës, tri mbrëmje radhazi nga Bulevardi i Ri drejt Sheshit Skënderbej, me rreth 500 pjesëmarrës gjithsej, në mbështetje të protestës kryesore.",
        },
        {
          dateLabel: "4 korrik 2026",
          title: "Autokolonat dhe marshimi i dytë",
          route: "Bulevardi i Ri → Sheshi Skënderbej",
          summary:
            "Për protestën mbarëkombëtare të 4 korrikut, autokolonat e diasporës erdhën sërish në Tiranë. Diaspora marshoi nga Bulevardi i Ri drejt Sheshit Skënderbej, me rreth 1 mijë pjesëmarrës.",
        },
        {
          dateLabel: "20 qershor 2026",
          title: "Autokolonat dhe marshimi i parë",
          route: "Bulevardi i Ri → Sheshi Skënderbej",
          summary:
            "Në ditën më të madhe të protestës, autokolonat e diasporës mbërritën në Tiranë: ishin nisur nga Anglia disa ditë më parë dhe gjatë rrugës iu bashkuan shqiptarë nga Franca, Gjermania dhe Austria. Diaspora u mblodh te Bulevardi i Ri dhe marshoi drejt Sheshit Skënderbej, me rreth 3 mijë pjesëmarrës.",
        },
      ],
    },
    form: {
      title: "Premto pjesëmarrjen",
      body:
        "Pas dërgimit do të marrësh një email konfirmimi. Nuk shfaqen lidhje private koordinimi në faqe.",
      firstName: "Emri",
      email: "Email",
      country: "Shteti nga vjen",
      city: "Qyteti",
      joiningPoint: "Pika ku planifikon të bashkohesh",
      participationType: "Si do të marrësh pjesë",
      whatsappOptIn: "Dua koordinim privat në WhatsApp",
      whatsappNumber: "Numri WhatsApp",
      volunteerOptIn: "Dua të ndihmoj si vullnetar/e",
      volunteerInterest: "Si mund të ndihmosh",
      consent:
        "Pajtohem që të dhënat e mia të përdoren nga organizatorët e besuar për konfirmim, koordinim privat dhe njoftime rreth marshimit.",
      consentVersion:
        "Të dhënat fshihen automatikisht pas fushatës.",
      submit: "Dërgo premtimin",
      submitting: "Duke dërguar...",
      successTitle: "Kontrollo emailin",
      successBody:
        "Nëse të dhënat u pranuan, do të marrësh një lidhje konfirmimi. Premtimi llogaritet vetëm pasi emaili konfirmohet.",
      genericError:
        "Kërkesa nuk mund të përfundohej tani. Provo përsëri pas pak.",
      validationError: "Kontrollo fushat dhe provo përsëri.",
      botError: "Verifikimi nuk u krye. Rifresko faqen dhe provo përsëri.",
      required: "Kjo fushë kërkohet.",
      invalidEmail: "Shkruaj një email të vlefshëm.",
      joiningPointOptions: [
        { value: "mother-teresa-square", label: "Sheshi Nënë Tereza" },
        { value: "skanderbeg-square", label: "Sheshi Skënderbej" },
        { value: "coordinate-later", label: "Do ta koordinoj më vonë" },
      ],
      participationTypeOptions: [
        { value: "join-in-tirana", label: "Bashkohem në Tiranë" },
        { value: "volunteer-steward", label: "Ndihmoj me rend, përkthim ose logjistikë" },
        { value: "coordination-support", label: "Ndihmoj me koordinim privat" },
      ],
      volunteerPlaceholder:
        "P.sh. përkthim, logjistikë, media, ligjore, aksesueshmëri...",
    },
    confirm: {
      confirmedTitle: "Emaili u konfirmua",
      confirmedBody:
        "Premtimi yt tani është i verifikuar. Koordinimi privat bëhet vetëm nga organizatorët e besuar.",
      usedTitle: "Lidhja është përdorur",
      usedBody:
        "Ky konfirmim është përpunuar më parë. Nuk nevojitet veprim tjetër.",
      expiredTitle: "Lidhja ka skaduar",
      expiredBody:
        "Për siguri, lidhjet e konfirmimit skadojnë. Dërgo premtimin përsëri për një lidhje të re.",
      invalidTitle: "Lidhja nuk është e vlefshme",
      invalidBody:
        "Nuk mund ta konfirmonim këtë lidhje. Kontrollo emailin ose dërgo premtimin përsëri.",
      home: "Kthehu te faqja kryesore",
    },
  },
  en: {
    langLabel: "English",
    altLangHref: "/",
    altLangLabel: "Shqip",
    nav: {
      tracker: "Protest pulse",
      map: "Map",
      scandals: "Scandals",
      safety: "Safety",
      march: "History",
      pledge: "Join WhatsApp",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      campaignTitle: {
        lead: "Flamingo Revolution",
        accent: "Diaspora",
      },
      eyebrow: "With the square in Tirana",
      dateLabel: "March date",
      dateDay: "TBA",
      dateMonth: "NEXT DATE",
      dateMeta: "Next diaspora march",
      dateText: "TBA",
      dateRows: [
        { time: "19:00", location: "Mother Teresa Square" },
        { time: "19:15", location: "Skanderbeg Square" },
      ],
      call: {
        label: "A call to every Albanian abroad",
        title: "Come home.",
        subtitle: "The square is waiting.",
        // take the date out after 29 November 2026
        date: {
          day: "28-29",
          month: "November",
          meta: "National protest",
          note: "A special day of independence and liberation",
        },
        steps: [
          "Tell us on WhatsApp you're coming",
          "Bring your family and friends",
          "Join the protest, any day",
        ],
      },
      title: "When the land speaks, the diaspora descends.",
      subtitle:
        "Hundreds of protests in the cities where we live, and marches in Tirana, in support of the square.",
      subtitleEmphasis: "Peacefully, under the Albanian flag only.",
      badges: ["Peaceful", "Non-partisan", "Worldwide"],
      primaryCta: "Join WhatsApp",
      secondaryCta: "View the route",
    },
    pledgeIntro: {
      title: "Join WhatsApp for coordination.",
      body:
        "Request to join with the button or the QR. Once you're accepted into the group, post the short template below.",
      bodyPhone:
        "Request to join with the button. Once you're accepted into the group, post the short template below.",
      assurances: [
        "Private group",
        "Every member is approved by the admins",
        "Peaceful: no insults, threats or incitement to violence",
      ],
    },
    shirtsTeaser: {
      kicker: "The summer shirts",
      title: "The diaspora in the square, in the same shirts.",
      body:
        "At the summer marches, shirts with the Albanian flag beside the flag of the country where we live became the diaspora's sign in the square. Now they are part of our history.",
      href: "/en/veshja",
      cta: "See the shirts",
      previewAlt:
        "Suggested black and white diaspora shirt versions",
    },
    trackerTeaser: {
      kicker: "Participation index",
      title: `${protestDays} days in the square, day by day.`,
      body:
        "Follow the pulse of the protest: participation clearly documented on camera, from the 6 June surge and the diaspora marches (20 June, 4 July, 14-16 August, 12 September), through the student protests since 13 October, to the 24 October national protest, the biggest night since 4 July.",
      href: "/en/pulsi",
      cta: "See the protest pulse",
      heroChip: `Night ${protestDays} · see the protest pulse`,
      stats: [
        { value: protestDays, label: "days of protest" },
        { value: "20.06", label: "the biggest day" },
        { value: "100K+", label: "in the square on 20 June (estimate)" },
      ],
      community: {
        title: "From ideas to concrete work",
        body:
          "Want to contribute to other projects for Albania? Visit our sister site, Flamingo Revolution, to discover the other initiatives and help turn ideas into concrete work.",
        sisterLabel: "FlamingoRevolution.eu",
        sisterHref: "https://www.flamingorevolution.eu/",
      },
    },
    scandalsTeaser: {
      href: "/en/liste_vuajtjesh",
    },
    mission: {
      kicker: "Our mission",
      title: "The Albanian diaspora in the Flamingo Revolution.",
      paragraphs: [
        "The Flamingo Revolution is the civic protest movement that has been on the streets of Tirana every day since 31 May 2026. It began in defence of Zvërnec, near Vlorë, against a luxury resort project linked to Jared Kushner, but soon grew into a movement demanding the government's resignation, a transitional technical government and a new social contract.",
        "We are Albanians who live abroad. Beyond Albania's borders, in every corner of the globe, hundreds of protests have been held in dozens of cities, from Vancouver to Melbourne, while the diaspora has come back to Tirana again and again, in force, to march with the square. Everything the diaspora does is in solidarity with Albania.",
        "Our aim is the square's, and the one the poet [Migjeni](https://wikisource.org/wiki/T%C3%AB_Lindet_Njeriu) called for so forcefully nearly a century ago: an Albania on the path of accelerated development, with a government that answers to its citizens.",
      ],
      links: {
        tracker: "The protest pulse",
        demands: "The protest's demands",
        history: "What the diaspora has done",
        map: "The protest map",
      },
      principle: {
        kicker: "Our principle",
        quote: [
          "Nothing appears more surprizing to those, who consider human affairs with a philosophical eye, than the easiness with which the many are governed by the few; and the implicit submission, with which men resign their own sentiments and passions to those of their rulers.",
          "When we enquire by what means this wonder is effected, we shall find, that, as Force is always on the side of the governed, the governors have nothing to support them but opinion.",
          "**It is therefore, on opinion only that government is founded;** and this maxim extends to the most despotic and most military governments, as well as to the most free and most popular.",
        ],
        author: "David Hume",
        work: "“Of the First Principles of Government”, 1741",
        href: "https://davidhume.org/texts/empl1/fp",
        gloss:
          "Power belongs to the people, not to corrupt elites, and when the people grasp this simple fact, **the game is over.**",
      },
    },
    mapTeaser: {
      kicker: "The protest map",
      title: `${protestsAbroad} protests in ${citiesAbroad} cities outside Albania.`,
      body: `From Vancouver to Melbourne, in ${countriesAbroad} countries. In Munich, London, Milan, Berlin and Vienna, the diaspora protested almost every week all summer.`,
      source: `According to the volunteer Flamingo Map, as of ${mapDate(mapSnapshot.asOf, "en")}. Base map: © OpenStreetMap contributors.`,
      href: "/en/harta",
      cta: "Open the map",
    },
    overview: {
      title: "What you'll find here",
      tracker:
        "The size of the crowd in the square every night since 31 May: an AI estimate from the livestreams, with a note for each day.",
      map: "The Flamingo Revolution's protests in Albania and around the world, city by city.",
      scandals: `${scandalCount} case files from 14 years in government, with the legal status, the verified claims and the sources.`,
      safety:
        "What to bring, how to look after yourself and others, and what your rights are.",
    },
    marchPage: {
      href: "/en/marshimi",
      kicker: "History",
      title: "What the diaspora has done for the Flamingo Revolution.",
      body: SHOW_NEXT_MARCH
        ? "The protests outside Albania, the convoys and marches in Tirana, the next march and the protest's demands."
        : "The protests outside Albania, the convoys and marches in Tirana, the help for the square and the protest's demands.",
    },
    march: {
      kicker: "The march",
      title: "The next march",
      body:
        "The date of the next march will be announced. Everything for march day: the route and the principles.",
    },
    whatsapp: {
      title: "Join the diaspora group",
      body:
        "This is the diaspora's private intake group. The admins review every request to join.",
      qrAlt: "QR for the diaspora WhatsApp group",
      openLabel: "Open WhatsApp",
      templateTitle: "Message you can post after joining",
      templateIntro: SHOW_NEXT_MARCH
        ? "If you wish, copy the message, add your name, and choose one or more of the options below."
        : "If you wish, copy the message and add your name and how you can help the protest.",
      template: SHOW_NEXT_MARCH
        ? `Hi, I am [Name] from [Country / city].

Choose one:

A) I will join the next march at:
[Mother Teresa Square - 19:00 / Skanderbeg Square - 19:15]

B) I want to speak at the mic

C) I will not march, but I can help with:
[optional]`
        : `Hi, I am [Name] from [Country / city].

I can help the protest with: [how you can help]`,
      copyLabel: "Copy message",
      copiedLabel: "Copied",
    },
    itinerary: {
      kicker: "Route",
      title: "From Mother Teresa Square toward Skanderbeg Square",
      dateLine: "Date: TBA",
      body:
        "The march starts at Mother Teresa Square, in front of the Polytechnic University of Tirana, at 19:00 and joins the main protest at Skanderbeg Square at 19:15.",
      showMap: false,
      mapAlt:
        "Map of the march from Mother Teresa Square toward Skanderbeg Square",
      mapOpenLabel: "Open the march map full size",
      mapExternalLabel: "Open route in Google Maps",
      points: [
        {
          time: "19:00",
          title: "Mother Teresa Square",
          body:
            "The march starts from Mother Teresa Square, in front of the Polytechnic University of Tirana.",
        },
        {
          time: "19:15",
          title: "Skanderbeg Square",
          body: "The diaspora joins the main protest at Skanderbeg Square.",
        },
      ],
    },
    practicalAdvice: {
      kicker: "Practical tips",
      title: "Prepare for a long walk on asphalt",
      body:
        "Keep it simple: water, light food, a steady pace, and shoes you have already tested. The goal is to arrive together and in good condition.",
      items: [
        {
          title: "Water",
          body:
            "Drink water regularly during the walk. Bring a large bottle and refill whenever possible, especially because the day will be hot.",
        },
        {
          title: "Food",
          body:
            "Bring bananas, sandwiches, nuts, or an energy bar. Eat small portions about every 2 hours.",
        },
        {
          title: "Breaks",
          body:
            "We will stop for about 5 minutes every hour. Every 2 hours, we will take a longer break of about 15 minutes.",
        },
        {
          title: "Shoes",
          body:
            "Wear walking trainers with soft soles. Do not wear new shoes without testing them first.",
        },
        {
          title: "Fatigue",
          body:
            "The route from Mother Teresa Square to Skanderbeg Square is short, about a 15 minute walk, but the pace should remain calm so the group stays together.",
        },
        {
          title: "Bag",
          body:
            "Keep it light, under 3 kg if possible. A waist strap helps distribute the weight.",
        },
      ],
    },
    rules: {
      kicker: "Our principles",
      title: "Civic discipline and the Albanian flag only",
      body:
        "These principles are the public premise of the march. They are not negotiable.",
      items: [
        {
          title: "Only under the Albanian flag",
          body:
            "The march does not represent any political party, organization, or interest group.",
        },
        {
          title: "Peaceful civic protest",
          body:
            "Democratic rights are exercised with respect for the law and the people around us.",
        },
        {
          title: "Respect for each other",
          body:
            "Insults, threats, provocation, discrimination, and incitement to violence are rejected.",
        },
        {
          title: "Calm in the face of provocation",
          body:
            "The answer to provocation is calm, dignity, and a collective response.",
        },
        {
          title: "Personal responsibility",
          body:
            "Each participant is responsible for their own actions and statements.",
        },
        {
          title: "Unity beyond beliefs",
          body:
            "What unites us is the future of Albania.",
        },
      ],
    },
    context: {
      kicker: "Why we protest",
      title: "To put Albania on the path of accelerated development",
      body: {
        before: "Like the ",
        link: "Asian tigers",
        href: "https://www.youtube.com/watch?v=XF3nEmKziWU",
        after: " of the last century.",
      },
      demands: [
        { text: "The non-negotiable resignation of the Prime Minister and the government." },
        {
          text: "The creation of a non-partisan, transitional technical government with a 12‑month mandate.",
        },
        {
          text:
            "Constitutional amendments making all Albanian citizens equal before the law, approved by popular referendum, including among others:",
          items: [
            "Reform of the Electoral Code.",
            "Reform of the law on the financing of political parties and other organizations.",
            "Limiting the office of Prime Minister to no more than two terms, full or partial, over an individual's entire political life.",
          ],
        },
        {
          text: "In parallel, we demand:",
          items: [
            "Reversal of the changes made to the law on \"Protected Areas\".",
            "Reversal of the changes made to the law on \"Cultural Heritage\".",
            "Repeal of the legal package known as the \"Mountains Package\".",
            "Repeal of the status and legal framework for \"Strategic Investments\".",
          ],
        },
        {
          text:
            "A new social contract between citizens and the state, drafted after consultation with intellectuals, technical experts, and non-partisan citizens proposed by the protest square.",
        },
      ],
      closing:
        "All Albanians turn out when the motherland calls.",
    },
    history: {
      origin: {
        kicker: "How it began",
        title: "The first idea: from the airport to the Prime Minister's office.",
        body:
          "This site began with a simple idea: the moment we landed at the airport, we would march on foot to the Prime Minister's office. The diaspora marches grew out of it, in different forms. Today the site stands for the diaspora in the Flamingo Revolution as a whole: the protests in the cities where we live, the help for the square and our voice abroad.",
      },
      abroad: {
        kicker: "Outside Albania",
        title: "Hundreds of protests in the cities where we live.",
        body: `Outside Albania, ${protestsAbroad} protests have been held in ${citiesAbroad} cities in ${countriesAbroad} countries, according to the volunteer Flamingo Map (as of ${mapDate(mapSnapshot.asOf, "en")}). In many cities they became weekly: in Munich, London, Milan, Berlin and Vienna the diaspora came out almost every week all summer.`,
        highlightsTitle: "Some of the highlights",
        carousel: {
          regionLabel: "Some highlights of the protests outside Albania",
          prevLabel: "Scroll left",
          nextLabel: "Scroll right",
          goToLabel: "Go to protest",
        },
        moments: [
          {
            dateLabel: "11 November 2026",
            title: "Rama in Dublin",
            route: "Dublin, Ireland",
            summary:
              "In Dublin, Albanians protested during Rama's visit, demanding his resignation and saying that Albania is not for sale. An egg was also thrown at the prime minister.",
          },
          {
            dateLabel: "3 October 2026",
            title: "Outside the European Commission",
            route: "Brussels, Belgium",
            summary:
              "The diaspora protested in Brussels outside the European Commission, with a giant red-and-black flag and banners reading “Albania is not for sale”.",
          },
          {
            dateLabel: "14 July 2026",
            title: "Outside the European Council",
            route: "Brussels, Belgium",
            summary:
              "The diaspora protested in Brussels outside the European Council, during the conference between Albania and the European Union.",
          },
          {
            dateLabel: "16 June 2026",
            title: "Rama in Berlin",
            route: "Berlin, Germany",
            summary:
              "In Berlin, Albanians protested as Rama left a conference during his visit to Germany.",
          },
          {
            dateLabel: "5-6 June 2026",
            title: "The diaspora's first protests",
            route: "Berlin, Munich, London, Vienna, Frankfurt",
            summary:
              "The diaspora's protests began, and they would go on week after week, month after month. The first were held on 5 June in Berlin and Munich, then on 6 June in London, Vienna and Frankfurt, as the protest's first week reached its climax.",
          },
        ],
        mapCta: "See the protest map",
      },
      beyond: {
        kicker: "Beyond the square",
        title: "Help for the square, a voice abroad.",
        body:
          "Beyond the protests, the diaspora supports the square with funds and supplies and keeps the protest in front of politicians and the media abroad.",
        highlight: {
          dateLabel: "26 October 2026",
          title: "Meeting the Austrian chancellor",
          route: "Vienna, Austria",
          summary:
            "In Vienna, the diaspora met the Austrian chancellor, Christian Stocker, four Austrian members of parliament and the Austrian president's secretary. It raised police violence against protesters and the package on assemblies the government was proposing, and asked Austria to be the voice of Albanian protesters in the European Union.",
        },
        items: [
          {
            title: "Funds and supplies for the protesters",
            body:
              "We have raised funds and sent them to Albania. When the student protests broke out, we sent first-aid supplies and protective gear for the protesters.",
          },
          {
            title: "With European politicians",
            body:
              "We have reached out to many politicians: members of the European Parliament and German politicians from across the political spectrum. In Vienna we met the Austrian chancellor, Christian Stocker. In Munich we invited a vice-president of the Bavarian state parliament.",
          },
          {
            title: "With the media",
            body:
              "We have reached out to many international news organisations about the protest. Pulsi, our daily participation index, has been cited by outlets in Italy and Germany.",
          },
          {
            title: "For human rights",
            body:
              "We send regular reports of human rights violations during the protests to several institutions of the European Union.",
          },
          {
            title: "Diaspora academics",
            body:
              "Albanian academics abroad, through Diaspora Akademike, backed the protest in June, wrote to the European Commission in July and in October called for an independent inquiry into police violence.",
          },
          {
            title: "An open letter to Europe",
            body:
              "In June, a collective of Albanian diaspora citizens in Europe sent European leaders an open letter, published in Le Courrier des Balkans.",
          },
        ],
      },
    },
    pastMarches: {
      kicker: "In Tirana",
      title: "The diaspora's convoys and marches",
      body:
        "Since June, the diaspora has come back to Tirana several times to join the square.",
      carousel: {
        regionLabel: "The diaspora's convoys and marches",
        prevLabel: "Scroll left",
        nextLabel: "Scroll right",
        goToLabel: "Go to march",
      },
      items: [
        {
          dateLabel: "October 16-19, 2026",
          title: "The diaspora returns for the students",
          route: "Tirana, at the students' protest",
          summary:
            "Not an organized march: hundreds of Albanians from the diaspora came back to Tirana on their own to join the students' protest in solidarity.",
        },
        {
          dateLabel: "September 12, 2026",
          title: "The fourth diaspora march",
          route: "Mother Teresa Square → Skanderbeg Square",
          summary:
            "The diaspora's fourth civic, peaceful march, from Mother Teresa Square toward Skanderbeg Square, with around 250 participants, in support of the national protest.",
        },
        {
          dateLabel: "August 14-16, 2026",
          title: "The third diaspora march",
          route: "Bulevardi i Ri → Skanderbeg Square",
          summary:
            "The diaspora's third civic, peaceful march, three evenings in a row from Bulevardi i Ri toward Skanderbeg Square, with around 500 participants in total, in support of the main protest.",
        },
        {
          dateLabel: "July 4, 2026",
          title: "The convoys and the second march",
          route: "Bulevardi i Ri → Skanderbeg Square",
          summary:
            "For the 4 July nationwide protest, the diaspora's car convoys came to Tirana again. The diaspora marched from Bulevardi i Ri toward Skanderbeg Square, with around 1,000 participants.",
        },
        {
          dateLabel: "June 20, 2026",
          title: "The convoys and the first march",
          route: "Bulevardi i Ri → Skanderbeg Square",
          summary:
            "On the protest's biggest day, the diaspora's car convoys reached Tirana: they had set off from England days earlier and were joined along the way by Albanians from France, Germany and Austria. The diaspora gathered at Bulevardi i Ri and marched toward Skanderbeg Square, with around 3,000 participants.",
        },
      ],
    },
    form: {
      title: "Pledge your participation",
      body:
        "After submitting, you will receive a confirmation email. Private coordination links are not shown on the public site.",
      firstName: "First name",
      email: "Email",
      country: "Country you come from",
      city: "City",
      joiningPoint: "Where you plan to join",
      participationType: "How you will participate",
      whatsappOptIn: "I want private WhatsApp coordination",
      whatsappNumber: "WhatsApp number",
      volunteerOptIn: "I want to help as a volunteer",
      volunteerInterest: "How you can help",
      consent:
        "I agree that trusted organizers may use my data for confirmation, private coordination, and march-related updates.",
      consentVersion:
        "Data is deleted automatically after the campaign.",
      submit: "Send pledge",
      submitting: "Sending...",
      successTitle: "Check your email",
      successBody:
        "If the details were accepted, you will receive a confirmation link. The pledge counts only after email confirmation.",
      genericError:
        "The request could not be completed right now. Try again shortly.",
      validationError: "Check the fields and try again.",
      botError: "Verification did not complete. Refresh the page and try again.",
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      joiningPointOptions: [
        { value: "mother-teresa-square", label: "Mother Teresa Square" },
        { value: "skanderbeg-square", label: "Skanderbeg Square" },
        { value: "coordinate-later", label: "I will coordinate later" },
      ],
      participationTypeOptions: [
        { value: "join-in-tirana", label: "I join in Tirana" },
        { value: "volunteer-steward", label: "I help with stewardship, translation, or logistics" },
        { value: "coordination-support", label: "I help with private coordination" },
      ],
      volunteerPlaceholder:
        "For example translation, logistics, media, legal, accessibility...",
    },
    confirm: {
      confirmedTitle: "Email confirmed",
      confirmedBody:
        "Your pledge is now verified. Private coordination is handled only by trusted organizers.",
      usedTitle: "Link already used",
      usedBody:
        "This confirmation has already been processed. No further action is needed.",
      expiredTitle: "Link expired",
      expiredBody:
        "For security, confirmation links expire. Submit the pledge again to receive a new link.",
      invalidTitle: "Invalid link",
      invalidBody:
        "We could not confirm this link. Check your email or submit the pledge again.",
      home: "Back to the homepage",
    },
  },
};
