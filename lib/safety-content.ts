import type { Locale } from "@/lib/content";

export type SafetyTopicId =
  | "ndalimi"
  | "avokatet"
  | "gazi"
  | "lendimet"
  | "siguria"
  | "dokumentimi";

export type SafetyTopic = {
  id: SafetyTopicId;
  kicker: string;
  title: string;
  /** one line, shown on the quick-pick card and under the topic title */
  summary: string;
  /** text stays in Albanian (it is said to Albanian police); English adds a translation */
  phrase?: { label: string; text: string; translation?: string };
  steps: string[];
  alert?: string;
  /** the free legal-aid line, shown as a call card under the steps */
  aid?: { title: string; body: string; linkLabel: string; call: string };
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
      kicker: "Udhëzues praktik · Protesta paqësore",
      title: "Siguria & të drejtat e tua",
      lead: "Informacion i shkurtër për rastet e ndalimit, gazit lotsjellës, lëndimeve dhe përgatitjes së sigurt për protestë.",
      emergencyTitle: "Urgjenca mjekësore · Shqipëri",
      emergencyBody:
        "Për gjakderdhje të rëndë, vështirësi në frymëmarrje, humbje të vetëdijes ose dëmtime serioze.",
      emergencyCall: "Telefono 127",
      note: "Ky është një udhëzues informues, jo këshillë juridike apo mjekësore individuale. Në rrezik të menjëhershëm, largohu drejt një vendi të sigurt dhe kërko ndihmë.",
    },
    quick: {
      kicker: "Udhëzues i shpejtë",
      title: "Çfarë të duhet tani?",
      body: "Zgjidh situatën për të shkuar drejtpërdrejt te hapat praktikë.",
    },
    topics: [
      {
        id: "ndalimi",
        kicker: "Ndalim nga policia",
        title: "Nëse të shoqërojnë, të ndalojnë ose të arrestojnë",
        summary: "Kërko arsyen, avokatin dhe njoftimin e familjes.",
        phrase: {
          label: "Fjali e dobishme kur të hiqet liria",
          text: "“Dua të di arsyen e ndalimit. Kërkoj të komunikoj me avokatin tim. Nuk dëshiroj të bëj deklarata pa u këshilluar me të.”",
        },
        steps: [
          "Kushtetuta (neni 28) të garanton të njoftohesh menjëherë, në një gjuhë që e kupton, për arsyen dhe për akuzën, të mos bësh asnjë deklaratë dhe të komunikosh menjëherë me avokatin.",
          "Pyet qartë pse po të kufizohet liria dhe thuaj se do të flasësh me avokatin përpara se të japësh deklarime.",
          "Kërko që të njoftohet një familjar ose një person i besuar për vendndodhjen tënde.",
          "Nëse nuk ke mjete për të paguar avokat, Kushtetuta (neni 31) të garanton mbrojtje falas në procesin penal.",
          "Nëse je nën 18 vjeç, policia duhet të njoftojë familjen dhe nuk duhet të të pyesë pa praninë e avokatit dhe të psikologut.",
          "Mos bëj rezistencë fizike. Nëse je lënduar ose nuk ndihesh mirë, kërko menjëherë kontroll mjekësor dhe që lëndimet të shënohen.",
          "Nëse është e sigurt, mbaj mend kohën, vendin dhe emrat ose numrat identifikues të punonjësve të përfshirë.",
        ],
        alert:
          "Shoqërimi, ndalimi dhe arrestimi kanë statuse juridike të ndryshme. Për hapa konkretë procedurale, pyet një avokat.",
      },
      {
        id: "avokatet",
        kicker: "Ndihmë juridike",
        title: "Ku të kërkosh ndihmë juridike",
        summary: "Linja falas e shtetit për informim dhe këshillim ligjor.",
        steps: [
          `Drejtoria e Ndihmës Juridike Falas jep informim dhe këshillim ligjor falas në numrin e gjelbër ${LEGAL_AID_PHONE} dhe në platformën Juristi Online.`,
          "Kush nuk ka të ardhura të mjaftueshme mund të përfitojë edhe avokat falas. Këtë avokat e cakton shteti, nuk e zgjedh vetë.",
          "Ky numër nuk është linjë emergjence për arrestime. Nëse je i ndaluar, kërko shprehimisht të flasësh me avokatin tënd ose që të të caktohet një.",
        ],
        aid: {
          title: "Drejtoria e Ndihmës Juridike Falas",
          body: "Numër i gjelbër, pa pagesë, për informim dhe këshillim ligjor.",
          linkLabel: "Juristi Online",
          call: `Telefono ${LEGAL_AID_PHONE}`,
        },
      },
      {
        id: "gazi",
        kicker: "Gaz lotsjellës",
        title: "Nëse ekspozohesh ndaj gazit lotsjellës",
        summary: "Largohu nga gazi dhe shpëlaj sytë me ujë të pastër.",
        steps: [
          "Largohu sa më shpejt drejt ajrit të pastër dhe, nëse mundesh, drejt një vendi më të lartë: gazi qëndron afër tokës.",
          "Mos i fërko sytë. Nëse të djegin ose shikimi është i turbullt, shpëlaji me ujë të pastër për 10 deri në 15 minuta.",
          "Nëse mban lente kontakti, hiqi dhe mos i vendos përsëri, edhe nëse nuk janë njëpërdorimshe.",
          "Kur të jesh në vend të sigurt, hiq rrobat e ndotura pa i kaluar mbi kokë, mbylli në një qese plastike dhe laje lëkurën me shumë ujë dhe sapun.",
          "Nëse ke vështirësi në frymëmarrje, dhimbje të forta të syve ose simptoma që nuk kalojnë, kërko ndihmë mjekësore ose telefono 127.",
        ],
        alert:
          "Mos hidh në sy përzierje shtëpiake, vajra apo substanca të tjera. Uji i pastër është zgjedhja e sigurt për shpëlarje.",
      },
      {
        id: "lendimet",
        kicker: "Goditje & gjakderdhje",
        title: "Nëse lëndohesh ose sheh dikë të lënduar",
        summary: "Mbrohu, ndal gjakderdhjen dhe thirr ndihmë.",
        steps: [
          "Largohu nga rreziku nëse mundesh. Mbro kokën dhe qafën me krahë dhe mos u përfshi në përleshje.",
          "Për gjakderdhje të rëndë, shtyp fort dhe pa ndërprerje drejtpërdrejt mbi plagë me garzë ose me një copë të pastër, dhe telefono 127.",
          "Pas një goditjeje në kokë, humbja e vetëdijes, konfuzioni, të vjellat ose vështirësia në të folur a në ekuilibër kërkojnë vlerësim urgjent mjekësor.",
          "Nëse dyshon për dëmtim të qafës ose të shtyllës kurrizore, mos e lëviz personin, përveçse kur rreziku e kërkon, dhe kërkoji të mos lëvizë.",
        ],
        alert:
          "Për gjakderdhje që nuk ndalet, vështirësi në frymëmarrje ose dëmtime serioze: 127.",
      },
      {
        id: "siguria",
        kicker: "Para & gjatë protestës",
        title: "Përgatitja dhe qëndrimi i sigurt",
        summary: "Shko me dikë të besuar dhe di nga mund të largohesh.",
        steps: [
          "Shko, nëse mundesh, me një person të besuar dhe caktoni një pikë takimi në rast se ndaheni.",
          "Merr ujë (shërben edhe për të shpëlarë sytë), ilaçet që të duhen, një dokument identifikimi, telefonin të karikuar dhe një komplet të vogël të ndihmës së parë.",
          "Shkruaj në letër disa numra të rëndësishëm, si të një familjari dhe të një avokati, në rast se të humbet ose të merret telefoni.",
          "Shiko paraprakisht rrugët nga mund të largohesh. Shmang rrugicat pa dalje dhe vendet ku turma shtyhet ose ngjeshet.",
          "Nëse situata bëhet e rrezikshme, largohu qetësisht drejt një zone më të sigurt. Ndihmo të tjerët pa vënë veten në rrezik.",
          "Ruaj sigurinë e protestuesve të tjerë dhe mos u bëj pjesë e përshkallëzimit të dhunës.",
        ],
      },
      {
        id: "dokumentimi",
        kicker: "Dokumento shkeljet",
        title: "Si të dokumentosh një incident",
        summary: "Shëno faktet dhe mbro privatësinë e të tjerëve.",
        steps: [
          "Vetëm nëse është e sigurt, shëno orën, vendin, si ndodhi ngjarja dhe dëshmitarët e mundshëm.",
          "Ruaj fotot dhe videot origjinale pa i redaktuar, përpara se të bësh versione për publikim.",
          "Mos publiko pa leje fytyrat apo identitetin e të lënduarve, të miturve ose të dëshmitarëve.",
          "Nëse je dëmtuar, kërko trajtim mjekësor dhe dokumentim të lëndimit, dhe fol me avokatin për mënyrën e ankimit.",
        ],
      },
    ],
    footer:
      "Për sigurinë e protestuesve paqësorë · Material informues, jo këshillë profesionale individuale.",
  },
  en: {
    altLangHref: "/siguria",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    hero: {
      kicker: "Practical guide · Peaceful protest",
      title: "Your safety & your rights",
      lead: "Short, practical information on detention, tear gas, injuries and getting ready to protest safely.",
      emergencyTitle: "Medical emergency · Albania",
      emergencyBody:
        "For heavy bleeding, trouble breathing, loss of consciousness or serious injuries.",
      emergencyCall: "Call 127",
      note: "This guide is general information, not individual legal or medical advice. If you are in immediate danger, move somewhere safe and get help.",
    },
    quick: {
      kicker: "Quick guide",
      title: "What do you need right now?",
      body: "Pick your situation to jump straight to the practical steps.",
    },
    topics: [
      {
        id: "ndalimi",
        kicker: "Police detention",
        title: "If you are taken in, detained or arrested",
        summary: "Ask for the reason, a lawyer and for your family to be told.",
        phrase: {
          label: "A sentence to use when you are held",
          text: "“Dua të di arsyen e ndalimit. Kërkoj të komunikoj me avokatin tim. Nuk dëshiroj të bëj deklarata pa u këshilluar me të.”",
          translation:
            "I want to know why I am being held. I want to speak to my lawyer. I do not wish to make any statement without consulting them.",
        },
        steps: [
          "The Constitution (Article 28) guarantees that you are told at once, in a language you understand, why you are held and what you are accused of, that you do not have to make any statement, and that you can contact a lawyer immediately.",
          "Ask clearly why your liberty is being restricted, and say you will speak to a lawyer before giving any statement.",
          "Ask for a family member or someone you trust to be told where you are.",
          "If you cannot afford a lawyer, the Constitution (Article 31) guarantees you free defence in criminal proceedings.",
          "If you are under 18, the police must notify your family and must not question you without a lawyer and a psychologist present.",
          "Do not resist physically. If you are hurt or feel unwell, ask for a medical check at once and for your injuries to be recorded.",
          "If it is safe, remember the time, the place and the names or ID numbers of the officers involved.",
        ],
        alert:
          "Being taken in for questioning, detained and arrested are different legal situations. For specific procedural steps, ask a lawyer.",
      },
      {
        id: "avokatet",
        kicker: "Legal aid",
        title: "Where to get legal help",
        summary: "The state's free line for legal information and advice.",
        steps: [
          `The Free Legal Aid Directorate gives free legal information and advice on the free line ${LEGAL_AID_PHONE} and through its Juristi Online service.`,
          "People without sufficient income can also get a free lawyer. That lawyer is assigned by the state; you cannot choose them yourself.",
          "This line is not an emergency line for arrests. If you are detained, ask explicitly to speak to your own lawyer or to have one assigned.",
        ],
        aid: {
          title: "Free Legal Aid Directorate",
          body: "Free green line for legal information and advice.",
          linkLabel: "Juristi Online",
          call: `Call ${LEGAL_AID_PHONE}`,
        },
      },
      {
        id: "gazi",
        kicker: "Tear gas",
        title: "If you are exposed to tear gas",
        summary: "Get away from the gas and rinse your eyes with clean water.",
        steps: [
          "Move to fresh air as fast as you can and, if possible, to higher ground: the gas stays close to the ground.",
          "Do not rub your eyes. If they burn or your vision is blurred, rinse them with clean water for 10 to 15 minutes.",
          "If you wear contact lenses, take them out and do not put them back in, even if they are not disposables.",
          "Once you are somewhere safe, take off contaminated clothes without pulling them over your head, seal them in a plastic bag and wash your skin with plenty of soap and water.",
          "If you have trouble breathing, severe eye pain or symptoms that do not go away, get medical help or call 127.",
        ],
        alert:
          "Do not put home remedies, oils or anything else in your eyes. Clean water is the safe choice for rinsing.",
      },
      {
        id: "lendimet",
        kicker: "Blows & bleeding",
        title: "If you are hurt or see someone hurt",
        summary: "Protect yourself, stop the bleeding and call for help.",
        steps: [
          "Get away from the danger if you can. Protect your head and neck with your arms and stay out of fights.",
          "For heavy bleeding, press firmly and without letting go directly on the wound with gauze or a clean cloth, and call 127.",
          "After a blow to the head, loss of consciousness, confusion, vomiting or trouble speaking or keeping balance need urgent medical attention.",
          "If you suspect a neck or spine injury, do not move the person unless danger forces you to, and ask them to keep still.",
        ],
        alert: "For bleeding that will not stop, trouble breathing or serious injuries: 127.",
      },
      {
        id: "siguria",
        kicker: "Before & during the protest",
        title: "Getting ready and staying safe",
        summary: "Go with someone you trust and know how to get out.",
        steps: [
          "If you can, go with someone you trust and agree on a meeting point in case you get separated.",
          "Bring water (it also works for rinsing your eyes), any medicines you need, an ID, a charged phone and a small first-aid kit.",
          "Write a few important numbers on paper, such as a family member's and a lawyer's, in case your phone is lost or taken.",
          "Check your ways out in advance. Avoid dead-end side streets and places where the crowd is pushing or packed tight.",
          "If things turn dangerous, leave calmly for a safer area. Help others without putting yourself at risk.",
          "Look out for the safety of other protesters and do not become part of an escalation of violence.",
        ],
      },
      {
        id: "dokumentimi",
        kicker: "Document abuses",
        title: "How to document an incident",
        summary: "Write down the facts and protect other people's privacy.",
        steps: [
          "Only if it is safe, note the time, the place, how it happened and any possible witnesses.",
          "Keep the original photos and videos unedited before you make any versions to publish.",
          "Do not publish the faces or identities of injured people, minors or witnesses without their consent.",
          "If you were hurt, get medical treatment and your injuries documented, and talk to a lawyer about how to file a complaint.",
        ],
      },
    ],
    footer:
      "For the safety of peaceful protesters · General information, not individual professional advice.",
  },
};
