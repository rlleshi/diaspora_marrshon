import { WHATSAPP_INVITE_URL, type Locale } from "@/lib/content";

export type SafetyTopicId =
  | "pergatitja"
  | "siguria"
  | "ndalimi"
  | "ndihma"
  | "kontaktet"
  | "dokumentimi";

/**
 * Step text carries two bits of inline markup, rendered by the safety page:
 * **bold** for the words to catch at a glance, and [label](href) for a link.
 */
export type SafetySubsection = { title: string; steps: string[] };

export type SafetyContact = {
  tag: string;
  name: string;
  body: string;
  phone: string;
  link?: { label: string; href: string };
};

export type SafetyContactGroup = {
  title: string;
  contacts: SafetyContact[];
  /** a box under the group's cards, for help that has no number */
  note?: { title: string; body: string };
};

export type SafetyTopic = {
  id: SafetyTopicId;
  kicker: string;
  title: string;
  /** one line under the topic title */
  lead: string;
  /** one line on the quick-pick card */
  summary: string;
  /** text stays in Albanian (it is said to Albanian police); English adds a translation */
  phrase?: { label: string; text: string; translation?: string };
  subsections?: SafetySubsection[];
  /** confirmed lines first (the state line, offers reported by the press), then the community list */
  contacts?: {
    confirmed: SafetyContact[];
    unverified: { title: string; body: string };
    groups: SafetyContactGroup[];
  };
  alert?: string;
};

type SafetyPageContent = {
  altLangHref: string;
  altLangLabel: string;
  homeHref: string;
  homeLabel: string;
  hero: {
    kicker: string;
    title: string;
    lead: string;
    emergencyTitle: string;
    emergencyBody: string;
    emergencyCall: string;
    note: string;
  };
  quick: { kicker: string; title: string; body: string };
  topics: SafetyTopic[];
  footer: string;
};

/** Free primary legal aid (Drejtoria e Ndihmës Juridike Falas): green line and online service. */
export const LEGAL_AID_PHONE = "0800 10 10";
export const LEGAL_AID_URL = "https://ndihmajuridike.gov.al/index.php/online/";

export const safetyPageContent: Record<Locale, SafetyPageContent> = {
  sq: {
    altLangHref: "/en/siguria",
    altLangLabel: "English",
    homeHref: "/",
    homeLabel: "Kthehu te faqja kryesore",
    hero: {
      kicker: "Udhëzues praktik",
      title: "Siguria në protestë. Të drejtat e tua.",
      lead: "Udhëzime të shkurtra. Çfarë të marrësh me vete. Ku të drejtohesh në rast rreziku.",
      emergencyTitle: "Urgjencë mjekësore · 127",
      emergencyBody: "Vështirësi në frymëmarrje. Gjakderdhje e rëndë. Pa ndjenja. Djegie apo trauma.",
      emergencyCall: "Telefono 127",
      note: "Ky material është përgatitur për orientim praktik. Për këshilla ligjore kërko avokat; për urgjenca mjekësore telefono 127.",
    },
    quick: {
      kicker: "Gjeje shpejt",
      title: "Çfarë të duhet tani?",
      body: "Zgjidh situatën. Lexo hapat. Vepro.",
    },
    topics: [
      {
        id: "pergatitja",
        kicker: "Para protestës",
        title: "Përgatitu para se të dalësh",
        lead: "Duhet të kesh një plan për çdo situatë.",
        summary: "Çfarë të marrësh me vete dhe si të përgatitesh sa më mirë.",
        subsections: [
          {
            title: "Shko i përgatitur",
            steps: [
              `**Mos qëndro vetëm.** Shko me njerëz që njeh ose bashkohu me një grup në protestë. Nëse s’ke me kë të shkosh, [shkruaj në WhatsApp](${WHATSAPP_INVITE_URL}) për të gjetur një grup.`,
              "Njofto një familjar se ku do të jesh dhe mbaje të informuar nëse ndryshon vendndodhje.",
              "Cakto një pikë takimi me shokët në rast se ndaheni.",
              "**Shkruaj në letër** numrin e një familjari dhe të një avokati. Policia mund të ta marrë telefonin ose mund të të mbarojë bateria.",
            ],
          },
          {
            title: "Vishu për mbrojtje",
            steps: [
              "**Mbulo sa më shumë lëkurë**: mëngë të gjata, doreza, kokore. Mbulo tatuazhet dhe hiq bizhuteritë.",
              "**Mos përdor makijazh**, kremra me bazë vaji apo vazelinë mbi lëkurën që mund të ekspozohet: e mbajnë gazin mbi lëkurë.",
              "**Mos vendos lente kontakti.** Lidh flokët dhe shmang aksesorët që mund të tërhiqen.",
              "**Maska N95 nuk mbron nga gazi lotsjellës**, por është më mirë se asgjë; maska kundërgaz mbron më shumë. Çdo maskë kufizon edhe identifikimin nga kamerat.",
            ],
          },
          {
            title: "Merri me vete",
            steps: [
              "Ujë të pijshëm dhe **solucion fiziologjik steril** për shpëlarjen e syve, diku ku i arrin lehtë.",
              "Doreza pa lateks, garza sterile, fasha dhe leukoplast.",
              "Telefon të karikuar dhe power bank, një dokument identifikimi, ilaçet që të duhen, pak para dhe rroba rezervë në një qese.",
            ],
          },
          {
            title: "Siguro telefonin",
            steps: [
              "Vendos një kod të fortë dhe **çaktivizo Face ID dhe gjurmën e gishtit** përpara protestës.",
              "Kufizo njoftimet që shfaqen në ekranin e kyçur.",
              "Mos e shpërnda vendndodhjen publikisht, vetëm me njerëz të besuar.",
            ],
          },
        ],
        alert:
          "Kujdes: pajisjet mbrojtëse nuk e bëjnë të sigurt ekspozimin ndaj gazit. Zgjedhja më e sigurt është të largohesh nga burimi.",
      },
      {
        id: "siguria",
        kicker: "Gjatë protestës",
        title: "Largohu nga rreziku",
        lead: "Qëndro me grupin. Mos lejo të mbetesh i bllokuar.",
        summary: "Si të veprosh kur situata bëhet e rrezikshme.",
        subsections: [
          {
            title: "Në turmë",
            steps: [
              "Mbaj hapësirë për të lëvizur dhe **mos u fut në vende pa dalje**. Di paraprakisht nga mund të largohesh.",
              "**Mbaj të paktën 3 metra distancë** nga radhët e policisë. Nëse afrohen, largohu.",
              "Nëse ndahesh nga të tjerët, shko te pika e takimit vetëm kur është e sigurt.",
              "Mos u bëj pjesë e përshkallëzimit të dhunës. Ndihmo të tjerët pa vënë veten në rrezik.",
            ],
          },
          {
            title: "Nëse sheh dhunë ose një të lënduar",
            steps: [
              "**Shiko së pari rrezikun për veten.** Mos hyr në gaz, flakë apo përleshje pa mbrojtje.",
              "**Mos prek bombolat e gazit** apo objekte të dyshimta.",
              "Për gjakderdhje të rëndë, shtyp fort mbi plagë dhe **telefono 127**. Për të tjerat, shiko [ndihmën e parë](#ndihma).",
              "Dokumento dhunën vetëm kur je i sigurt.",
            ],
          },
        ],
        alert:
          "Kujdes: nëse policia të ka ndaluar ose arrestuar, mos provo të largohesh me forcë dhe mos bëj rezistencë fizike. Kërko avokat.",
      },
      {
        id: "ndalimi",
        kicker: "Nëse të ndalon policia",
        title: "Mos bëj deklarata pa avokat",
        lead: "Kërko arsyen e ndalimit. Kërko avokatin. Kërko të njoftohet familja.",
        summary: "Të drejtat ligjore dhe veprimet e para.",
        phrase: {
          label: "Thuaje qartë",
          text: "“Dua të di arsyen e ndalimit. Kërkoj të njoftoj familjen dhe të komunikoj me avokatin tim. Nuk bëj deklarata pa praninë e avokatit.”",
        },
        subsections: [
          {
            title: "Çfarë të bësh",
            steps: [
              "Ruaj qetësinë dhe **mos bëj rezistencë fizike**.",
              "**Kërko të telefonosh avokatin ose një familjar.** Nëse nuk të lejojnë ta bësh vetë, kërko që policia të njoftojë familjen.",
              "**Mos jep deklarata** për ngjarjen pa u këshilluar me avokatin. Jep vetëm të dhënat e identitetit që kërkohen me ligj.",
              "**Mos nënshkruaj** asgjë që nuk e kupton. Kërko ta lexosh dhe të këshillohesh me avokatin.",
              "Nëse je lënduar, thuaj: “**Kam nevojë për ndihmë mjekësore**” dhe kërko që lëndimet të shënohen.",
              "Kërko identifikimin e punonjësit dhe mbaj mend kohën, vendin dhe numrat identifikues, nëse është e sigurt.",
              "Nëse nuk ke avokat, shiko [listën e avokatëve dhe linjën falas](#kontaktet).",
            ],
          },
          {
            title: "Çfarë thotë ligji",
            steps: [
              "**Kushtetuta, neni 28:** të njoftohesh menjëherë, në një gjuhë që e kupton, për arsyen dhe akuzën, të mos bësh deklarata dhe të komunikosh menjëherë me avokatin.",
              "**Kushtetuta, neni 31:** nëse nuk ke mjete për avokat, ke të drejtë për mbrojtje falas në procesin penal.",
              "**Kodi i Procedurës Penale, neni 255:** policia duhet të njoftojë pa vonesë familjen, me pëlqimin tënd.",
              "**Nën 18 vjeç:** policia duhet të njoftojë familjen dhe nuk duhet të të pyesë pa praninë e avokatit dhe të psikologut.",
            ],
          },
        ],
        alert:
          "Kujdes: shoqërimi, ndalimi dhe arrestimi kanë statuse juridike të ndryshme. Ruaj një numër avokati në letër përpara se të dalësh.",
      },
      {
        id: "ndihma",
        kicker: "Ndihma e parë",
        title: "Vepro menjëherë",
        lead: "Mbro veten. Ndal dëmtimin. Kërko ndihmë sipas rëndesës.",
        summary: "Si të ndihmosh dikë që ka nevojë për ndihmë mjekësore.",
        subsections: [
          {
            title: "Gaz lotsjellës · sytë dhe frymëmarrja",
            steps: [
              "**Largohu menjëherë** drejt ajrit të pastër dhe, nëse mundesh, drejt një vendi më të lartë: gazi qëndron afër tokës.",
              "**Mos i fërko sytë.** Shpëlaji me ujë të pastër ose solucion fiziologjik për 10 deri në 15 minuta.",
              "Hiq lentet e kontaktit dhe mos i vendos përsëri.",
              "Kur je i sigurt, **hiq rrobat e ndotura pa i kaluar mbi kokë**, mbylli në një qese dhe laj lëkurën me ujë dhe sapun.",
              "**Mos hidh qumësht, vajra apo përzierje shtëpiake** në sy.",
              "Për vështirësi në frymëmarrje, dhimbje të fortë të syrit ose shikim të turbullt që nuk kalon, **kërko ndihmë mjekësore**.",
            ],
          },
          {
            title: "Djegie nga zjarri",
            steps: [
              "Nëse rrobat marrin flakë: **ndalo, shtrihu, mbulo fytyrën dhe rrotullohu**.",
              "Ftoje djegien me ujë të rrjedhshëm të freskët **për 20 minuta**. Mos përdor akull, vaj, gjalpë ose kremra.",
              "Hiq bizhuteritë dhe rrobat pranë djegies, por **mos tërhiq asgjë që është ngjitur në lëkurë** dhe mos çaj flluskat. Mbuloje lirshëm me film plastik të pastër.",
              "**Kërko trajtim urgjent** për djegie të mëdha ose të thella, në fytyrë, duar, qafë ose zona intime.",
            ],
          },
          {
            title: "Djegie kimike",
            steps: [
              "Me doreza nëse mundesh, hiq rrobat e ndotura. Pluhurin e thatë fshije me kujdes përpara se ta shpëlash.",
              "Shpëlaj me shumë ujë **për të paktën 20 minuta**. Në sy: mbaj qepallat hapur dhe shpëlaj 15 deri në 20 minuta.",
              "Mos vendos asnjë substancë mbi lëkurë dhe **kërko vlerësim në spital**.",
            ],
          },
          {
            title: "Tym",
            steps: [
              "Largohu menjëherë në ajër të pastër.",
              "Kërko vlerësim mjekësor për zë të ngjirur, vështirësi në frymëmarrje, djegie në fytyrë ose blozë në gojë e hundë. **Simptomat mund të vijnë më vonë**, sidomos me astmë.",
            ],
          },
          {
            title: "Goditje në kokë ose qafë",
            steps: [
              "**Mbro kokën dhe qafën** me krahë ndërsa largohesh nga rreziku.",
              "Nëse dyshon për dëmtim të qafës ose shtyllës kurrizore, **mos e lëviz personin**, përveçse kur rrezikohet jeta.",
              "Humbje e vetëdijes, të vjella, konfuzion, kriza ose vështirësi në të folur: kërko urgjencë mjekësore.",
            ],
          },
          {
            title: "Personi nuk reagon ose nuk merr frymë normalisht",
            steps: [
              "Kontrollo nëse reagon dhe shiko frymëmarrjen për jo më shumë se 10 sekonda.",
              "Nëse nuk merr frymë normalisht ose vetëm gulçon, **telefono 127**, kërko një defibrilator dhe **fillo shtypjet e kraharorit**: në mes të kraharorit, 100 deri në 120 në minutë.",
              "Nëse merr frymë normalisht dhe nuk dyshon për traumë, vendose në **pozicionin anësor të sigurisë** dhe ndiqe.",
            ],
          },
          {
            title: "Gjakderdhje dhe plagë",
            steps: [
              "**Shtyp fort dhe pa ndërprerje** drejtpërdrejt mbi plagë me garzë ose leckë të pastër.",
              "Gjakderdhje e rëndë ose që nuk ndalet: **telefono 127**.",
              "**Mos hiq objektet e ngulura** në plagë; shtyp rreth tyre.",
              "Plagët e vogla shpëlaji me ujë të pastër dhe mbuloji me garzë sterile.",
            ],
          },
        ],
        alert:
          "Kujdes: telefono 127 për vështirësi në frymëmarrje, gjakderdhje të rëndë, humbje të vetëdijes, djegie të rënda ose trauma serioze. Mos e vono ndihmën nga frika e autoriteteve.",
      },
      {
        id: "kontaktet",
        kicker: "Kontakte falas",
        title: "Avokatë · Mjekë · Pajisje",
        lead: "Ruaji numrat përpara protestës. Pyet nëse shërbimi është ende aktiv.",
        summary: "Ndihmë juridike, mjekësore dhe psikologjike falas.",
        contacts: {
          confirmed: [
            {
              tag: "Shtetërore · falas",
              name: "Drejtoria e Ndihmës Juridike Falas",
              body: "Informim dhe këshillim ligjor falas. Kush nuk ka të ardhura të mjaftueshme përfiton edhe avokat falas, që e cakton shteti. Nuk është linjë emergjence për arrestime.",
              phone: LEGAL_AID_PHONE,
              link: { label: "Juristi Online", href: LEGAL_AID_URL },
            },
            {
              tag: "Partia Demokratike · 24/7",
              name: "Grupi i avokatëve të PD-së",
              body: "Ndihmë juridike në polici, prokurori dhe gjykatë për protestues të shoqëruar, ndaluar ose arrestuar. Është shërbim i një partie politike. Avokatët: Marash Logu, Eda Grimci, Adriana Kalaja, Franc Nuri, Shaqir Manjani, Besart Logu dhe Ledio Nuraj.",
              phone: "067 482 5149",
            },
          ],
          unverified: {
            title: "Listë e pakonfirmuar",
            body: "Numrat më poshtë janë ndarë në rrjete sociale. Nuk i kemi verifikuar.",
          },
          groups: [
            {
              title: "Avokatë",
              contacts: [
                {
                  tag: "Avokate · falas",
                  name: "Enida Kaziu",
                  body: "Ndihmë juridike falas gjatë marrjes në pyetje dhe përfaqësim në prokurori.",
                  phone: "069 47 99 436",
                },
              ],
            },
            {
              title: "Ndihmë mjekësore",
              contacts: [
                {
                  tag: "Mjekësi · 24/7",
                  name: "Albanian Medical Clinic",
                  body: "Trajtim mjekësor falas për protestuesit e lënduar: mjekime, qepje plagësh, serume dhe mundësi transporti.",
                  phone: "068 24 77 367",
                },
              ],
              note: {
                title: "Vullnetare me shami të kuqe",
                body: "Në protestë ka vajza me shami të kuqe që shpërndajnë ujë e solucion fiziologjik dhe japin ndihmë të parë pa pagesë. Lidhja e tyre me Kryqin e Kuq nuk është verifikuar. Pyet për identifikim dhe mos e zëvendëso 127 në raste të rënda.",
              },
            },
            {
              title: "Mbështetje psikologjike",
              contacts: [
                {
                  tag: "Psikologji · falas",
                  name: "Elida Kërçyku",
                  body: "Mbështetje psikologjike falas, edhe në emergjenca.",
                  phone: "067 57 47 365",
                },
              ],
            },
            {
              title: "Solucion fiziologjik dhe maska",
              contacts: [
                {
                  tag: "Furnizime falas",
                  name: "Rrjeti ASAN",
                  body: "Solucion fiziologjik dhe maska mjekësore falas.",
                  phone: "069 36 34 332",
                },
                {
                  tag: "Farmaci",
                  name: "Dante Pharma",
                  body: "Solucion fiziologjik, maska dhe pika sysh me acid hialuronik. Pikat nuk janë për shpëlarjen e gazit nga sytë.",
                  phone: "068 31 37 804",
                },
              ],
            },
          ],
        },
        alert:
          "Kujdes: këto numra nuk janë shërbime emergjente. Për rrezik për jetën, telefono 127.",
      },
      {
        id: "dokumentimi",
        kicker: "Pas protestës",
        title: "Dokumento. Mbro privatësinë.",
        lead: "Ruaj faktet pa ekspozuar protestuesit e tjerë.",
        summary: "Si të dokumentosh shkeljet dhe të mbrosh sigurinë digjitale.",
        subsections: [
          {
            title: "Nëse ke parë ose përjetuar dhunë",
            steps: [
              "Shëno orën, vendin, çfarë ndodhi, dëshmitarët dhe çdo shenjë identifikuese.",
              "Ruaj fotot, videot origjinale dhe dokumentet mjekësore pa i redaktuar, me një **kopje rezervë** në vend të sigurt.",
              "**Mos publiko fytyra, emra apo vendndodhje** të të tjerëve pa pëlqimin e tyre, sidomos të të miturve.",
              "Këshillohu me avokat për ankimin. Mos u mbështet vetëm te postimet në rrjete sociale.",
            ],
          },
        ],
      },
    ],
    footer: "Për sigurinë e protestuesve.",
  },
  en: {
    altLangHref: "/siguria",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    hero: {
      kicker: "Practical guide",
      title: "Safety at the protest. Your rights.",
      lead: "Short guidance. What to bring. Where to turn when things get dangerous.",
      emergencyTitle: "Medical emergency · 127",
      emergencyBody: "Trouble breathing. Heavy bleeding. Unconscious. Burns or trauma.",
      emergencyCall: "Call 127",
      note: "This material is for practical orientation. For legal advice, ask a lawyer; for medical emergencies, call 127.",
    },
    quick: {
      kicker: "Find it fast",
      title: "What do you need right now?",
      body: "Pick your situation. Read the steps. Act.",
    },
    topics: [
      {
        id: "pergatitja",
        kicker: "Before the protest",
        title: "Get ready before you go",
        lead: "Have a plan for every situation.",
        summary: "What to bring and how to prepare as well as you can.",
        subsections: [
          {
            title: "Go prepared",
            steps: [
              `**Don't go alone.** Go with people you know or join a group at the protest. If you have no one to go with, [write to us on WhatsApp](${WHATSAPP_INVITE_URL}) to find a group.`,
              "Tell a family member where you will be and keep them updated if you move.",
              "Agree on a meeting point with your friends in case you get separated.",
              "**Write on paper** a family member's and a lawyer's number. The police may take your phone, or its battery may die.",
            ],
          },
          {
            title: "Dress for protection",
            steps: [
              "**Cover as much skin as you can**: long sleeves, gloves, a hood. Cover tattoos and take off jewellery.",
              "**No make-up**, oil-based creams or Vaseline on skin that may be exposed: they hold the gas on your skin.",
              "**Don't wear contact lenses.** Tie your hair back and avoid accessories that can be grabbed.",
              "**An N95 mask does not protect against tear gas**, but it is better than nothing; a gas mask protects more. Any mask also limits identification by cameras.",
            ],
          },
          {
            title: "Bring with you",
            steps: [
              "Drinking water and **sterile saline** for rinsing your eyes, somewhere easy to reach.",
              "Non-latex gloves, sterile gauze, bandages and plasters.",
              "A charged phone and a power bank, an ID, any medicines you need, a little cash and spare clothes in a bag.",
            ],
          },
          {
            title: "Secure your phone",
            steps: [
              "Set a strong passcode and **turn off Face ID and fingerprint unlock** before the protest.",
              "Limit the notifications shown on your lock screen.",
              "Don't share your location publicly, only with people you trust.",
            ],
          },
        ],
        alert:
          "Careful: protective gear does not make gas exposure safe. The safest choice is to get away from the source.",
      },
      {
        id: "siguria",
        kicker: "During the protest",
        title: "Get away from danger",
        lead: "Stay with your group. Don't let yourself get trapped.",
        summary: "What to do when things turn dangerous.",
        subsections: [
          {
            title: "In the crowd",
            steps: [
              "Keep room to move and **don't go into places with no way out**. Know your ways out in advance.",
              "**Keep at least 3 metres** from police lines. If they come closer, move away.",
              "If you get separated, go to the meeting point only when it is safe.",
              "Don't become part of an escalation of violence. Help others without putting yourself at risk.",
            ],
          },
          {
            title: "If you see violence or someone hurt",
            steps: [
              "**Check the danger to yourself first.** Don't walk into gas, fire or a fight without protection.",
              "**Don't touch gas canisters** or suspicious objects.",
              "For heavy bleeding, press hard on the wound and **call 127**. For anything else, see [first aid](#ndihma).",
              "Document violence only when you are safe.",
            ],
          },
        ],
        alert:
          "Careful: if the police have detained or arrested you, don't try to get away by force and don't resist physically. Ask for a lawyer.",
      },
      {
        id: "ndalimi",
        kicker: "If the police stop you",
        title: "No statements without a lawyer",
        lead: "Ask for the reason. Ask for your lawyer. Ask for your family to be told.",
        summary: "Your legal rights and the first steps.",
        phrase: {
          label: "Say it clearly",
          text: "“Dua të di arsyen e ndalimit. Kërkoj të njoftoj familjen dhe të komunikoj me avokatin tim. Nuk bëj deklarata pa praninë e avokatit.”",
          translation:
            "I want to know why I am being held. I ask to notify my family and to speak to my lawyer. I will not make any statement without my lawyer present.",
        },
        subsections: [
          {
            title: "What to do",
            steps: [
              "Stay calm and **don't resist physically**.",
              "**Ask to call your lawyer or a family member.** If they won't let you do it yourself, ask the police to notify your family.",
              "**Don't give a statement** about what happened without speaking to your lawyer. Give only the identity details the law requires.",
              "**Don't sign** anything you don't understand. Ask to read it and to speak to your lawyer.",
              "If you are hurt, say: “**Kam nevojë për ndihmë mjekësore**” (I need medical help) and ask for your injuries to be recorded.",
              "Ask for the officer's identification and remember the time, the place and any ID numbers, if it is safe.",
              "If you don't have a lawyer, see [the lawyers and the free line](#kontaktet).",
            ],
          },
          {
            title: "What the law says",
            steps: [
              "**Constitution, Article 28:** you must be told at once, in a language you understand, why you are held and what you are accused of; you do not have to make any statement, and you can contact a lawyer immediately.",
              "**Constitution, Article 31:** if you cannot afford a lawyer, you are entitled to free defence in criminal proceedings.",
              "**Code of Criminal Procedure, Article 255:** the police must notify your family without delay, with your consent.",
              "**Under 18:** the police must notify your family and must not question you without a lawyer and a psychologist present.",
            ],
          },
        ],
        alert:
          "Careful: being taken in, detained and arrested are different legal situations. Keep a lawyer's number on paper before you go out.",
      },
      {
        id: "ndihma",
        kicker: "First aid",
        title: "Act at once",
        lead: "Protect yourself. Stop the harm. Get help as serious as the injury.",
        summary: "How to help someone who needs medical help.",
        subsections: [
          {
            title: "Tear gas · eyes and breathing",
            steps: [
              "**Get away at once** to fresh air and, if you can, to higher ground: the gas stays close to the ground.",
              "**Don't rub your eyes.** Rinse them with clean water or saline for 10 to 15 minutes.",
              "Take out contact lenses and don't put them back in.",
              "Once you are safe, **take off contaminated clothes without pulling them over your head**, seal them in a bag and wash your skin with soap and water.",
              "**No milk, oils or home remedies** in your eyes.",
              "For trouble breathing, severe eye pain or blurred vision that doesn't clear, **get medical help**.",
            ],
          },
          {
            title: "Burns from fire",
            steps: [
              "If clothes catch fire: **stop, drop, cover your face and roll**.",
              "Cool the burn under cool running water **for 20 minutes**. No ice, oil, butter or creams.",
              "Take off jewellery and clothing near the burn, but **don't pull off anything stuck to the skin** and don't burst blisters. Cover it loosely with clean cling film.",
              "**Get urgent treatment** for large or deep burns, or burns on the face, hands, neck or genitals.",
            ],
          },
          {
            title: "Chemical burns",
            steps: [
              "With gloves if you can, take off contaminated clothing. Brush dry powder off gently before rinsing.",
              "Rinse with plenty of water **for at least 20 minutes**. Eyes: hold the eyelids open and rinse for 15 to 20 minutes.",
              "Don't put anything on the skin and **get it checked at a hospital**.",
            ],
          },
          {
            title: "Smoke",
            steps: [
              "Get to fresh air at once.",
              "Get a medical check for a hoarse voice, trouble breathing, burns on the face or soot in the mouth or nose. **Symptoms can come later**, especially with asthma.",
            ],
          },
          {
            title: "Blows to the head or neck",
            steps: [
              "**Protect your head and neck** with your arms as you get away from the danger.",
              "If you suspect a neck or spine injury, **don't move the person** unless their life is at risk.",
              "Loss of consciousness, vomiting, confusion, seizures or trouble speaking: get emergency medical help.",
            ],
          },
          {
            title: "Unresponsive or not breathing normally",
            steps: [
              "Check whether they respond and look for breathing for no more than 10 seconds.",
              "If they are not breathing normally or only gasping, **call 127**, ask for a defibrillator and **start chest compressions**: centre of the chest, 100 to 120 a minute.",
              "If they breathe normally and you don't suspect trauma, put them in the **recovery position** and keep watching them.",
            ],
          },
          {
            title: "Bleeding and wounds",
            steps: [
              "**Press hard and without letting go** directly on the wound with gauze or a clean cloth.",
              "Heavy bleeding, or bleeding that won't stop: **call 127**.",
              "**Don't pull out objects stuck** in a wound; press around them.",
              "Rinse small wounds with clean water and cover them with sterile gauze.",
            ],
          },
        ],
        alert:
          "Careful: call 127 for trouble breathing, heavy bleeding, loss of consciousness, severe burns or serious trauma. Don't delay help out of fear of the authorities.",
      },
      {
        id: "kontaktet",
        kicker: "Free contacts",
        title: "Lawyers · Doctors · Supplies",
        lead: "Save the numbers before the protest. Ask whether the service is still running.",
        summary: "Free legal, medical and psychological help.",
        contacts: {
          confirmed: [
            {
              tag: "State · free",
              name: "Free Legal Aid Directorate",
              body: "Free legal information and advice. People without sufficient income can also get a free lawyer, assigned by the state. Not an emergency line for arrests.",
              phone: LEGAL_AID_PHONE,
              link: { label: "Juristi Online", href: LEGAL_AID_URL },
            },
            {
              tag: "Democratic Party · 24/7",
              name: "PD lawyers' group",
              body: "Legal help at the police, the prosecutor's office and court for protesters taken in, detained or arrested. It is a service of a political party. The lawyers: Marash Logu, Eda Grimci, Adriana Kalaja, Franc Nuri, Shaqir Manjani, Besart Logu and Ledio Nuraj.",
              phone: "067 482 5149",
            },
          ],
          unverified: {
            title: "Unconfirmed list",
            body: "The numbers below were shared on social media. We have not verified them.",
          },
          groups: [
            {
              title: "Lawyers",
              contacts: [
                {
                  tag: "Lawyer · free",
                  name: "Enida Kaziu",
                  body: "Free legal help during questioning and representation at the prosecutor's office.",
                  phone: "069 47 99 436",
                },
              ],
            },
            {
              title: "Medical help",
              contacts: [
                {
                  tag: "Medical · 24/7",
                  name: "Albanian Medical Clinic",
                  body: "Free treatment for injured protesters: medication, stitches, IV fluids and possible transport.",
                  phone: "068 24 77 367",
                },
              ],
              note: {
                title: "Volunteers in red scarves",
                body: "Young women in red scarves hand out water and saline and give free first aid at the protest. Their link to the Red Cross has not been verified. Ask for identification, and don't let them replace 127 in serious cases.",
              },
            },
            {
              title: "Psychological support",
              contacts: [
                {
                  tag: "Psychology · free",
                  name: "Elida Kërçyku",
                  body: "Free psychological support, including in emergencies.",
                  phone: "067 57 47 365",
                },
              ],
            },
            {
              title: "Saline and masks",
              contacts: [
                {
                  tag: "Free supplies",
                  name: "Rrjeti ASAN",
                  body: "Free saline and medical masks.",
                  phone: "069 36 34 332",
                },
                {
                  tag: "Pharmacy",
                  name: "Dante Pharma",
                  body: "Saline, masks and hyaluronic acid eye drops. The drops are not for rinsing gas out of the eyes.",
                  phone: "068 31 37 804",
                },
              ],
            },
          ],
        },
        alert: "Careful: these numbers are not emergency services. If a life is at risk, call 127.",
      },
      {
        id: "dokumentimi",
        kicker: "After the protest",
        title: "Document. Protect privacy.",
        lead: "Keep the facts without exposing other protesters.",
        summary: "How to document abuses and protect your digital safety.",
        subsections: [
          {
            title: "If you saw or went through violence",
            steps: [
              "Write down the time and place, what happened, the witnesses and any identifying marks.",
              "Keep original photos, videos and medical records unedited, with a **backup** somewhere safe.",
              "**Don't publish other people's faces, names or locations** without their consent, especially minors'.",
              "Talk to a lawyer about filing a complaint. Don't rely only on social media posts.",
            ],
          },
        ],
      },
    ],
    footer: "For the safety of protesters.",
  },
};
