import type { Locale } from "@/lib/content";

export type PrivacySection = {
  title: string;
  paragraphs: string[];
};

export type PrivacyPageContent = {
  altLangHref: string;
  altLangLabel: string;
  homeHref: string;
  homeLabel: string;
  kicker: string;
  title: string;
  lead: string;
  updated: string;
  sections: PrivacySection[];
  contactLabel: string;
  contactHref: string;
};

export const privacyPageContent: Record<Locale, PrivacyPageContent> = {
  sq: {
    altLangHref: "/en/privacy",
    altLangLabel: "English",
    homeHref: "/",
    homeLabel: "Kthehu te faqja kryesore",
    kicker: "Privatësia",
    title: "Si i trajtojmë të dhënat e tua",
    lead:
      "Diaspora marshon është një faqe vullnetare dhe jo-fitimprurëse. Mbledhim vetëm të dhënat që na jep vetë, i përdorim vetëm për qëllimin për të cilin na i dhe dhe nuk i shesim kurrë.",
    updated: "Përditësuar më 20 tetor 2026",
    sections: [
      {
        title: "Formulari i kontaktit",
        paragraphs: [
          "Kur na shkruan, ruajmë emrin, email-in, organizatën (nëse e shkruan) dhe mesazhin tënd, për t'u përgjigjur. Duke dërguar mesazhin, pranon që t'i trajtojmë këto të dhëna për këtë qëllim.",
          "Mesazhet i mbajmë vetëm për aq kohë sa duhet për bisedën me ty. Mund të kërkosh fshirjen e tyre në çdo kohë.",
        ],
      },
      {
        title: "Premtimi për marshim",
        paragraphs: [
          "Nëse plotëson premtimin për marshim, ruajmë emrin, email-in, shtetin, qytetin, mënyrën si do të bashkohesh dhe, nëse e zgjedh, numrin e WhatsApp-it dhe interesin për vullnetarizëm.",
          "Këto të dhëna i përdorim vetëm me pëlqimin tënd të shprehur (kutia e pëlqimit në formular), për të konfirmuar premtimin dhe për koordinimin e marshimit. I shohin vetëm organizatorët e besuar të marshimit. Meqë një premtim i tillë mund të tregojë qëndrimin tënd politik, e trajtojmë me kujdes të veçantë. Pëlqimin mund ta tërheqësh në çdo kohë.",
        ],
      },
      {
        title: "Mbrojtja nga spami",
        paragraphs: [
          "Formularët përdorin Cloudflare Turnstile për të dalluar njerëzit nga robotët. Për të kufizuar dërgimet e shumta, ruajmë për pak kohë adresën IP dhe email-in vetëm në formë të koduar njëkahëshe (hash), jo në formë të lexueshme.",
        ],
      },
      {
        title: "Statistikat e vizitave",
        paragraphs: [
          "Përdorim Vercel Web Analytics për të numëruar vizitat në mënyrë të përmbledhur. Nuk përdor cookies dhe nuk na tregon kush je.",
        ],
      },
      {
        title: "Chatbot-i “Pyet Flamingon”",
        paragraphs: [
          "Pyetjet që i bën chatbot-it dërgohen te shërbimi ynë i chatbot-it (i vendosur në Google Cloud, Frankfurt) për të krijuar përgjigjen. Mos shkruaj të dhëna personale në të.",
        ],
      },
      {
        title: "Ku ruhen të dhënat",
        paragraphs: [
          "Faqja mbahet në Vercel. Të dhënat e formularëve ruhen në Google Firebase (Google Cloud). Email-et e konfirmimit të premtimit dërgohen përmes Resend. Lidhjet drejt YouTube, WhatsApp apo Instagram çojnë në shërbime që kanë rregullat e tyre të privatësisë.",
        ],
      },
      {
        title: "Të drejtat e tua",
        paragraphs: [
          "Mund të kërkosh të shohësh, të korrigjosh ose të fshish të dhënat e tua, si dhe të tërheqësh pëlqimin, duke na shkruar përmes faqes së kontaktit.",
          "Nëse mendon se të dhënat e tua nuk janë trajtuar si duhet, mund t'i drejtohesh Komisionerit për të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale në Shqipëri, ose autoritetit për mbrojtjen e të dhënave në vendin ku jeton.",
        ],
      },
    ],
    contactLabel: "Na shkruaj",
    contactHref: "/contact",
  },
  en: {
    altLangHref: "/privacy",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    kicker: "Privacy",
    title: "How we handle your data",
    lead:
      "Diaspora marshon is a volunteer, non-commercial site. We only collect the data you give us, use it only for the purpose you gave it for, and never sell it.",
    updated: "Updated 20 October 2026",
    sections: [
      {
        title: "Contact form",
        paragraphs: [
          "When you write to us, we store your name, email, organisation (if you give one) and message so we can reply. By sending a message, you agree to us handling this data for that purpose.",
          "We keep messages only as long as the conversation needs them. You can ask us to delete them at any time.",
        ],
      },
      {
        title: "March pledge",
        paragraphs: [
          "If you fill in the march pledge, we store your first name, email, country, city, how you plan to join and, if you choose to give them, your WhatsApp number and volunteering interest.",
          "We use this data only with your explicit consent (the consent box on the form), to confirm your pledge and coordinate the march. Only the march's trusted organizers see it. Because a pledge like this can reveal your political views, we treat it with extra care. You can withdraw your consent at any time.",
        ],
      },
      {
        title: "Spam protection",
        paragraphs: [
          "The forms use Cloudflare Turnstile to tell people from bots. To limit repeated submissions, we briefly store your IP address and email only as a one-way hash, never in readable form.",
        ],
      },
      {
        title: "Visit statistics",
        paragraphs: [
          "We use Vercel Web Analytics to count visits in aggregate. It uses no cookies and does not tell us who you are.",
        ],
      },
      {
        title: "The “Ask Flamingo” chatbot",
        paragraphs: [
          "Questions you ask the chatbot are sent to our chatbot service (hosted on Google Cloud in Frankfurt) to generate an answer. Please don't type personal details into it.",
        ],
      },
      {
        title: "Where data is stored",
        paragraphs: [
          "The site is hosted on Vercel. Form data is stored in Google Firebase (Google Cloud). Pledge confirmation emails are sent through Resend. Links to YouTube, WhatsApp or Instagram lead to services with their own privacy rules.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete your data, or withdraw your consent, by writing to us through the contact page.",
          "If you think your data has not been handled properly, you can complain to Albania's Commissioner for the Right to Information and Personal Data Protection, or to the data protection authority where you live.",
        ],
      },
    ],
    contactLabel: "Write to us",
    contactHref: "/en/contact",
  },
};

export const privacyFooterLabel: Record<Locale, { label: string; href: string }> = {
  sq: { label: "Privatësia", href: "/privacy" },
  en: { label: "Privacy", href: "/en/privacy" },
};
