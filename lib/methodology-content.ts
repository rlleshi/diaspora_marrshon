import type { Locale } from "@/lib/content";

/** The crowd-analysis code and its full method notes. */
export const PULSI_CODE_URL = "https://github.com/rlleshi/diaspora_marrshon/tree/main/crowd-analysis";

/** The whole published series; one file for both languages. */
export const PULSI_CSV_PATH = "/pulsi/protest_days.csv";

export type MethodologySection = {
  title: string;
  paragraphs: string[];
};

export type MethodologyResource = {
  label: string;
  href: string;
  detail: string;
};

export type MethodologyPageContent = {
  altLangHref: string;
  trackerHref: string;
  trackerLabel: string;
  kicker: string;
  title: string;
  lead: string;
  updated: string;
  sections: MethodologySection[];
  resourcesTitle: string;
  resources: MethodologyResource[];
  citation: string;
  corrections: { before: string; link: string; href: string; after: string };
};

export const methodologyPageContent: Record<Locale, MethodologyPageContent> = {
  sq: {
    altLangHref: "/en/pulsi/metodologjia",
    trackerHref: "/pulsi",
    trackerLabel: "Kthehu te Pulsi",
    kicker: "Pulsi i protestës · Metodologjia",
    title: "Si i numëron Pulsi protestat",
    lead:
      "Pulsi është një indeks i përditshëm i pjesëmarrjes në protestat e Tiranës që nga 31 maji 2026. Ai mat sa turmë shfaq çdo natë transmetimi live i News24, në të njëjtën mënyrë çdo natë. Nuk është numër i saktë i pjesëmarrësve.",
    updated: "Përditësuar më 22 tetor 2026",
    sections: [
      {
        title: "Burimi",
        paragraphs: [
          "Çdo ditë proteste lidhet me një transmetim live të News24 në YouTube; kronika ditore në faqen e Pulsit jep lidhjen për secilin. Kur një ditë ka pasur më shumë se një aksion ose transmetim, zgjidhet njëri si seria e ditës dhe zgjedhja shënohet pranë të dhënave. Kur nuk ka transmetim të përdorshëm, dita e ruan shënimin, por nuk ka shifër.",
        ],
      },
      {
        title: "Nga videoja te kuadrot",
        paragraphs: [
          "Numërimi nis 20 minuta pas fillimit të transmetimit, që njerëzit të kenë kohë të mblidhen. Videoja ndahet në plane kamere dhe brenda planeve që duken si pamje turme merret një kuadër me rezolucion të plotë çdo 10 sekonda.",
        ],
      },
      {
        title: "Numërimi i çdo kuadri",
        paragraphs: [
          "Çdo kuadër kalon nëpër CLIP-EBC, një model i hapur numërimi turmash, me dy versionet e publikuara që janë trajnuar në të dhënat NWPU-Crowd; dy vlerësimet mesatarizohen. Kuadrot me më pak se 100 njerëz të dukshëm hidhen poshtë si plane të afërta, grafika ose pamje bosh.",
        ],
      },
      {
        title: "Kontrolli me sy",
        paragraphs: [
          "Transmetimi shpesh e vendos turmën pranë një folësi ose studioje në ekran të ndarë, ose e shfaq turmën në murin me ekrane të studios. Këto kuadro mund t'i fryjnë shifrat e natës, prandaj një fletë me kuadrin më të fortë të çdo plani kontrollohet me sy dhe kuadrot e tilla hiqen. Që nga fundi i shtatorit hiqen nga të tria shifrat; për ditët më të hershme janë hequr nga piku, aty ku i gjeti rishikimi. Vendimet e çdo dite shënohen pranë të dhënave në GitHub.",
        ],
      },
      {
        title: "Tri shifra për çdo natë",
        paragraphs: [
          "Piku është mesatarja e 10 kuadrove më të larta. Dhjetë kuadro në vend të një e pengojnë një kuadër të vetëm të çuditshëm të vendosë për gjithë natën.",
          "Mesatarja dhe mediana llogariten mbi të gjithë kuadrot e mbajtur dhe e përshkruajnë natën në tërësi.",
        ],
      },
      {
        title: "Indeksi",
        paragraphs: [
          "Shifrat e papërpunuara janë njerëz të dukshëm në një kuadër dhe varen nga vendi ku drejtohen kamerat. Për t'i krahasuar netët, ato kthehen në indeks: piku i 6 qershorit (dita 7), më i larti në muajin e parë të rezultateve të modelit, merr vlerën 50 dhe çdo natë tjetër shkallëzohet me të njëjtin faktor (indeksi = vlera × 50 / 2 582,5).",
          "Tri tubimet më të mëdha, ato të 6 qershorit, 20 qershorit dhe 4 korrikut, ankorohen veçmas me vlerësime të sipërfaqes dhe dendësisë së turmës në terren, në 50, 100 dhe 60. Pra 100 është dita më e madhe, 20 qershori; vlerat e këtyre tri ditëve janë vlerësime editoriale, jo rezultat i modelit.",
        ],
      },
      {
        title: "Çfarë nuk tregon",
        paragraphs: [
          "Pulsi sheh vetëm atë që sheh kamera: njerëzit jashtë kuadrit dhe ata që erdhën e ikën nuk numërohen, ndërsa i njëjti person mund të dalë në shumë kuadro. Pozicionet e kamerave dhe zgjedhjet e transmetuesit ndryshojnë nga nata në natë, prandaj dallimet e vogla mes netëve kanë pak kuptim; më e besueshme është forma e serisë përgjatë javëve.",
          "Modeli gabon, sidomos me turma të dendura ose të largëta dhe në errësirë. Indeksi nuk është numër pjesëmarrësish dhe nuk duhet kthyer në të tillë.",
        ],
      },
      {
        title: "Shënimet ditore",
        paragraphs: [
          "Shënimi i çdo nate përmbledh ç'ndodhi, sipas transmetimit dhe mbulimit në media. Shifrat e policisë, të qeverisë ose të organizatorëve u atribuohen atyre.",
        ],
      },
    ],
    resourcesTitle: "Të dhënat, kodi dhe korrigjimet",
    resources: [
      {
        label: "Të dhënat (CSV)",
        href: PULSI_CSV_PATH,
        detail: "Çdo ditë me vlerat e indeksit, burimin dhe shënimet në të dyja gjuhët.",
      },
      {
        label: "Kodi dhe metodologjia e plotë (GitHub)",
        href: PULSI_CODE_URL,
        detail: "Skriptet e analizës, formulat dhe vendimet e rishikimit për çdo ditë.",
      },
      {
        label: "RSS",
        href: "/pulsi/feed.xml",
        detail: "Një njoftim për çdo ditë të re, për lexuesit e lajmeve.",
      },
    ],
    citation:
      "Si ta citoni: Flamingo Revolution Diaspora, “Pulsi: indeksi ditor i pjesëmarrjes në protestat e Tiranës”, diaspora-zbarkon.com/pulsi (parë më [data]).",
    corrections: {
      before: "Keni gjetur një gabim? ",
      link: "Na shkruani",
      href: "/contact",
      after: " dhe e korrigjojmë.",
    },
  },
  en: {
    altLangHref: "/pulsi/metodologjia",
    trackerHref: "/en/pulsi",
    trackerLabel: "Back to Pulsi",
    kicker: "Protest Pulse · Method",
    title: "How Pulsi counts the protests",
    lead:
      "Pulsi is a nightly participation index for the protests in Tirana since 31 May 2026. It measures how much crowd the News24 livestream shows each night, the same way every night. It is not a head count.",
    updated: "Updated 22 October 2026",
    sections: [
      {
        title: "The source",
        paragraphs: [
          "Each protest day is matched to one News24 livestream on YouTube; the day-by-day log on the Pulsi page links every stream. When a day had more than one action or stream, one is chosen as the day's series and the choice is recorded with the data. When there is no usable stream, the day keeps its note but has no figure.",
        ],
      },
      {
        title: "From video to frames",
        paragraphs: [
          "Counting starts 20 minutes into the stream, to give people time to gather. The video is split into camera shots, and within shots that look like crowd views a full-resolution frame is taken every 10 seconds.",
        ],
      },
      {
        title: "Counting each frame",
        paragraphs: [
          "Each frame goes through CLIP-EBC, an open crowd-counting model, using its two published checkpoints trained on the NWPU-Crowd dataset; the two estimates are averaged. Frames with fewer than 100 visible people are dropped as close-ups, graphics or empty views.",
        ],
      },
      {
        title: "Checking by eye",
        paragraphs: [
          "The broadcast often puts the crowd in a split screen beside a speaker or a studio, or shows it on a studio video wall. Those frames can inflate a night's figures, so a sheet of each shot's strongest frame is checked by eye and such frames are removed. Since late September they are removed from all three figures; for earlier days they were removed from the peak where the review found them. Each day's decisions are recorded with the data on GitHub.",
        ],
      },
      {
        title: "Three figures per night",
        paragraphs: [
          "The peak is the average of the 10 highest frames. Using ten frames instead of one keeps a single odd frame from deciding the whole night.",
          "The mean and median are taken over all retained frames and describe the night as a whole.",
        ],
      },
      {
        title: "The index",
        paragraphs: [
          "The raw figures are people visible in a frame, and they depend on where the cameras point. To compare nights, they are turned into an index: the peak of 6 June (Day 7), the highest in the first month of model results, is set to 50, and every other night is scaled by the same factor (index = raw × 50 / 2,582.5).",
          "The three largest gatherings, 6 June, 20 June and 4 July, are anchored separately to on-the-ground estimates of the crowd's area and density, at 50, 100 and 60. So 100 is the largest day, 20 June; the values for those three days are editorial estimates, not model output.",
        ],
      },
      {
        title: "What it can't tell you",
        paragraphs: [
          "Pulsi sees only what the camera sees: people outside the frame and people who came and went are not counted, while the same person can appear in many frames. Camera positions and the broadcaster's choices change from night to night, so small differences between nights mean little; the shape of the series over weeks is more reliable.",
          "The model makes mistakes, especially with dense or distant crowds and in the dark. The index is not an attendance figure and shouldn't be converted into one.",
        ],
      },
      {
        title: "The daily notes",
        paragraphs: [
          "Each night's note summarizes what happened, from the broadcast and news coverage. Figures from the police, the government or the organizers are attributed to them.",
        ],
      },
    ],
    resourcesTitle: "Data, code and corrections",
    resources: [
      {
        label: "The data (CSV)",
        href: PULSI_CSV_PATH,
        detail: "Every day with its index values, source and notes in both languages.",
      },
      {
        label: "Code and full method (GitHub)",
        href: PULSI_CODE_URL,
        detail: "The analysis scripts, the formulas and the review decisions for each day.",
      },
      {
        label: "RSS",
        href: "/en/pulsi/feed.xml",
        detail: "One item for every new day, for feed readers.",
      },
    ],
    citation:
      "How to cite: Flamingo Revolution Diaspora, “Pulsi: daily participation index of the Tirana protests”, diaspora-zbarkon.com/en/pulsi (accessed [date]).",
    corrections: {
      before: "Found a mistake? ",
      link: "Write to us",
      href: "/en/contact",
      after: " and we'll correct it.",
    },
  },
};

/** The links under the tracker's method note. */
export const methodologyLinks: Record<Locale, { label: string; href: string }[]> = {
  sq: [
    { label: "Metodologjia e plotë", href: "/pulsi/metodologjia" },
    { label: "Të dhënat (CSV)", href: PULSI_CSV_PATH },
    { label: "RSS", href: "/pulsi/feed.xml" },
  ],
  en: [
    { label: "Full method", href: "/en/pulsi/metodologjia" },
    { label: "Data (CSV)", href: PULSI_CSV_PATH },
    { label: "RSS", href: "/en/pulsi/feed.xml" },
  ],
};
