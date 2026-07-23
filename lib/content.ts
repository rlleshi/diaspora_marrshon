import type {
  JoiningPoint,
  ParticipationType,
  SourceLanguage,
} from "@/lib/pledge-options";
import { participation } from "@/data/participation";
import { scandals } from "@/data/scandals";

export type Locale = SourceLanguage;

// Derived from the tracker data so the homepage teaser never lags behind /pulsi.
const protestDays = String(participation.length);

// Derived from the scandal dossier so the homepage teaser never lags behind /liste_vuajtjesh.
const scandalCount = String(scandals.length);

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
    context: string;
    history: string;
    scandals: string;
    march: string;
    pledge: string;
  };
  hero: {
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
    title: string;
    subtitle: string;
    subtitleEmphasis: string;
    badges: string[];
    primaryCta: string;
    secondaryCta: string;
    statLabel: string;
    statValue: string;
  };
  pledgeIntro: {
    title: string;
    body: string;
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
    stats: Array<{ value: string; label: string }>;
  };
  scandalsTeaser: {
    kicker: string;
    title: string;
    body: string;
    href: string;
    cta: string;
    stats: Array<{ value: string; label: string }>;
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
    approvalNote: string;
    templateTitle: string;
    templateIntro: string;
    template: string;
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
  pastMarches: {
    kicker: string;
    title: string;
    body: string;
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
  footer: {
    privacy: string;
    noLinks: string;
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

export const content: Record<Locale, SiteContent> = {
  sq: {
    langLabel: "Shqip",
    altLangHref: "/en",
    altLangLabel: "English",
    nav: {
      tracker: "Pulsi i protestës",
      context: "Pse marshojmë",
      history: "Historiku",
      scandals: "Skandalet",
      march: "Marshimi",
      pledge: "Marshoj për Shqipërinë",
    },
    hero: {
      eyebrow: "Marshimi i tretë i diasporës në Tiranë",
      dateLabel: "Data e marshimit",
      dateDay: "14-16",
      dateMonth: "GUSHT",
      dateMeta: "E premte-e diel · 2026",
      dateText: "14-16 gusht 2026",
      dateRows: [
        { time: "18:30", location: "Bulevardi i Ri" },
        { time: "19:00", location: "Sheshi Skënderbej" },
      ],
      title: "Kur dheu jep zë, diaspora zbret.",
      subtitle:
        "Marshim qytetar, simbolik dhe paqësor drejt protestës kryesore. Ecim të organizuar, vetëm nën flamurin shqiptar.",
      subtitleEmphasis: "Pa qëllim bllokimin e rrugëve.",
      badges: ["Paqësor", "Simbolik", "Katharsis"],
      primaryCta: "Bashkohu në WhatsApp",
      secondaryCta: "Shiko itinerarin",
      statLabel: "Qëllimi i faqes",
      statValue:
        "Ta bashkojmë diasporën në protestë për Shqipërinë, në numër sa më të madh.",
    },
    pledgeIntro: {
      title: "Bashkohu në WhatsApp për koordinim.",
      body:
        "Skano QR-in, kërko të hysh në grup dhe pas miratimit nga administratorët shkruaj mesazhin e shkurtër më poshtë.",
    },
    shirtsTeaser: {
      kicker: "Veshja e përbashkët",
      title: "Veshje sugjeruese për pamje të përbashkët.",
      body:
        "Nëse dëshiron, mund të përdorësh këto versione që diaspora të duket më e bashkuar në shesh.",
      href: "/veshja",
      cta: "Shiko sugjerimet",
      previewAlt:
        "Sugjerim për bluza të diasporës në version të zi dhe të bardhë",
    },
    trackerTeaser: {
      kicker: "Indeksi i pjesëmarrjes",
      title: `${protestDays} ditë në shesh, ditë pas dite.`,
      body:
        "Ndiq pulsin e protestës: pjesëmarrje e dokumentuar qartësisht në kamera, përgjatë dy muajsh, me momentet kyçe: nga vala e parë e 6 qershorit te kulmi i diasporës më 20 qershor.",
      href: "/pulsi",
      cta: "Shiko pulsin e protestës",
      stats: [
        { value: protestDays, label: "ditë protestë" },
        { value: "20.06", label: "dita më e madhe" },
        { value: "100K+", label: "vlerësim në shesh" },
      ],
    },
    scandalsTeaser: {
      kicker: "Historiku i qeverisjes",
      title: `${scandalCount} dosje, 13 vjet: çfarë i ka bërë Shqipërisë kjo organizatë.`,
      body:
        "Çdo skandal i kontrolluar veç e veç kundrejt gazetarisë investigative shqiptare: statusi ligjor real, pretendimet e verifikuara, dhe burimet.",
      href: "/liste_vuajtjesh",
      cta: "Shiko dosjen",
      stats: [
        { value: scandalCount, label: "dosje" },
        { value: "13", label: "vjet, e njëjta mjekërr" },
      ],
    },
    march: {
      kicker: "Marshimi",
      title: "Marshimi i tretë i diasporës",
      body:
        "Pas dy marshimeve të para, diaspora kthehet për herë të tretë. Gjithçka për ditën e marshimit: itinerari dhe parimet.",
    },
    whatsapp: {
      title: "Skano QR-in",
      body:
        "Ky është grupi i hyrjes për diasporën. Anëtarët miratohen nga administratorët para se të hyjnë.",
      qrAlt: "QR për grupin WhatsApp të diasporës",
      openLabel: "Hap WhatsApp",
      approvalNote:
        "Për arsye sigurie, grupi përdor miratim nga administratorët.",
      templateTitle: "Mesazhi që mund të shkruash pas hyrjes",
      templateIntro:
        "Kopjoje mesazhin, plotëso emrin dhe lër vetëm opsionin që vlen për ty.",
      template: `Përshëndetje, jam [Emri] nga [Shteti / qyteti].

Zgjedh njërën nga këto:

A) Bashkohem në marshim te:
[Data: 14 / 15 / 16 gusht]
[Bulevardi i Ri - 18:30 / Sheshi Skënderbej - 19:00]

B) Nuk marshoj, por mund të ndihmoj me:
[opsionale]`,
    },
    itinerary: {
      kicker: "Itinerari",
      title: "Nga Bulevardi i Ri drejt Sheshit Skënderbej",
      dateLine: "Data: 14-16 gusht 2026",
      body:
        "Marshimi nis te Bulevardi i Ri në 18:30 dhe bashkohet me protestën kryesore në Sheshin Skënderbej në 19:00.",
      showMap: false,
      mapAlt:
        "Harta e marshimit nga Bulevardi i Ri drejt Sheshit Skënderbej",
      mapOpenLabel: "Hap hartën e marshimit në madhësi të plotë",
      mapExternalLabel: "Hap itinerarin në Google Maps",
      points: [
        {
          time: "18:30",
          title: "Bulevardi i Ri",
          body: "Nisja e marshimit nga Bulevardi i Ri.",
        },
        {
          time: "19:00",
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
            "Rruga nga Bulevardi i Ri deri në shesh është më e shkurtër, por ritmi duhet të mbetet i qetë që grupi të qëndrojë i bashkuar.",
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
      kicker: "Pse marshojmë",
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
          text: "Krijimin e një qeverie teknike tranzitore, jopartiake, me mandat 12-mujor.",
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
    pastMarches: {
      kicker: "Marshimet e kaluara",
      title: "Çfarë kemi bërë deri tani",
      body:
        "Një histori e shkurtër e marshimeve të mëparshme të diasporës.",
      items: [
        {
          dateLabel: "4 korrik 2026",
          title: "Marshimi i dytë i diasporës",
          route: "Bulevardi i Ri → Sheshi Skënderbej",
          summary:
            "Marshimi i dytë qytetar dhe paqësor i diasporës, nga Bulevardi i Ri drejt Sheshit Skënderbej, me rreth 1 mijë pjesëmarrës, në mbështetje të protestës kryesore.",
        },
        {
          dateLabel: "20 qershor 2026",
          title: "Marshimi i parë i diasporës",
          route: "Bulevardi i Ri → Sheshi Skënderbej",
          summary:
            "Marshimi i parë qytetar dhe paqësor i diasporës, nga Bulevardi i Ri drejt Sheshit Skënderbej, me rreth 3 mijë pjesëmarrës, në mbështetje të protestës kryesore.",
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
        { value: "new-boulevard", label: "Bulevardi i Ri" },
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
    footer: {
      privacy:
        "Të dhënat ruhen vetëm për koordinim të marshimit dhe nuk publikohen.",
      noLinks:
        "Lidhjet private të grupeve jepen vetëm pas konfirmimit dhe shqyrtimit nga organizatorët.",
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
      context: "Why we march",
      history: "History",
      scandals: "Scandals",
      march: "The march",
      pledge: "I march for Albania",
    },
    hero: {
      eyebrow: "The diaspora's third march in Tirana",
      dateLabel: "March date",
      dateDay: "14-16",
      dateMonth: "AUGUST",
      dateMeta: "Friday-Sunday · 2026",
      dateText: "August 14-16, 2026",
      dateRows: [
        { time: "18:30", location: "Bulevardi i Ri" },
        { time: "19:00", location: "Skanderbeg Square" },
      ],
      title: "When the land speaks, the diaspora descends.",
      subtitle:
        "A civic, symbolic, peaceful march toward the main protest. We walk in an organized way, only under the Albanian flag.",
      subtitleEmphasis: "No intention to block roads.",
      badges: ["Peaceful", "Symbolic", "Catharsis"],
      primaryCta: "Join WhatsApp",
      secondaryCta: "View the route",
      statLabel: "Site purpose",
      statValue:
        "Bring the diaspora together to protest for Albania, in the largest numbers possible.",
    },
    pledgeIntro: {
      title: "Join WhatsApp for coordination.",
      body:
        "Scan the QR, request to join the group, and after admin approval post the short template below.",
    },
    shirtsTeaser: {
      kicker: "Shared clothing",
      title: "Suggested clothing for a shared look.",
      body:
        "If you want, you can use these versions to help the diaspora look more united in the square.",
      href: "/en/veshja",
      cta: "View suggestions",
      previewAlt:
        "Suggested black and white diaspora shirt versions",
    },
    trackerTeaser: {
      kicker: "Participation index",
      title: `${protestDays} days in the square, day by day.`,
      body:
        "Follow the pulse of the protest: participation clearly documented on camera, across two months, with the key moments: from the 6 June surge to the 20 June diaspora peak.",
      href: "/en/pulsi",
      cta: "See the protest pulse",
      stats: [
        { value: protestDays, label: "days of protest" },
        { value: "20.06", label: "the biggest day" },
        { value: "100K+", label: "estimated in the square" },
      ],
    },
    scandalsTeaser: {
      kicker: "Government track record",
      title: `${scandalCount} case files, 13 years: what this organization has done.`,
      body:
        "Every scandal independently checked against Albanian investigative journalism: real legal status, verified claims, and sources.",
      href: "/en/liste_vuajtjesh",
      cta: "See the dossier",
      stats: [
        { value: scandalCount, label: "case files" },
        { value: "13", label: "years, same beard" },
      ],
    },
    march: {
      kicker: "The march",
      title: "The diaspora's third march",
      body:
        "After two earlier marches, the diaspora returns for a third time. Everything for march day: the route and the principles.",
    },
    whatsapp: {
      title: "Scan the QR",
      body:
        "This is the diaspora intake group. Members are approved by admins before joining.",
      qrAlt: "QR for the diaspora WhatsApp group",
      openLabel: "Open WhatsApp",
      approvalNote:
        "For safety, the group uses admin approval.",
      templateTitle: "Message you can post after joining",
      templateIntro:
        "Copy the message, add your name, and keep only the option that applies to you.",
      template: `Hi, I am [Name] from [Country / city].

Choose one:

A) I will join the march at:
[Date: August 14 / 15 / 16]
[Bulevardi i Ri - 18:30 / Skanderbeg Square - 19:00]

B) I will not march, but I can help with:
[optional]`,
    },
    itinerary: {
      kicker: "Route",
      title: "From Bulevardi i Ri toward Skanderbeg Square",
      dateLine: "Date: August 14-16, 2026",
      body:
        "The march starts at Bulevardi i Ri at 18:30 and joins the main protest at Skanderbeg Square at 19:00.",
      showMap: false,
      mapAlt:
        "Map of the march from Bulevardi i Ri toward Skanderbeg Square",
      mapOpenLabel: "Open the march map full size",
      mapExternalLabel: "Open route in Google Maps",
      points: [
        {
          time: "18:30",
          title: "Bulevardi i Ri",
          body: "The march starts from Bulevardi i Ri.",
        },
        {
          time: "19:00",
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
            "The route from Bulevardi i Ri to the square is shorter, but the pace should remain calm so the group stays together.",
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
      kicker: "Why we march",
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
          text: "The creation of a non-partisan, transitional technical government with a 12-month mandate.",
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
    pastMarches: {
      kicker: "Past marches",
      title: "What we have done so far",
      body:
        "A short history of the diaspora's previous marches.",
      items: [
        {
          dateLabel: "July 4, 2026",
          title: "The second diaspora march",
          route: "Bulevardi i Ri → Skanderbeg Square",
          summary:
            "The diaspora's second civic, peaceful march, from Bulevardi i Ri toward Skanderbeg Square, with around 1,000 participants, in support of the main protest.",
        },
        {
          dateLabel: "June 20, 2026",
          title: "The first diaspora march",
          route: "Bulevardi i Ri → Skanderbeg Square",
          summary:
            "The diaspora's first civic, peaceful march, from Bulevardi i Ri toward Skanderbeg Square, with around 3,000 participants, in support of the main protest.",
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
        { value: "new-boulevard", label: "Bulevardi i Ri" },
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
    footer: {
      privacy:
        "Participant data is kept only for march coordination and is not published.",
      noLinks:
        "Private group links are sent only after confirmation and organizer review.",
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
