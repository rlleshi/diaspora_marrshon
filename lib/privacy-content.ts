import type { Locale } from "@/lib/content";

export type PrivacySection = {
  title: string;
  paragraphs: string[];
};

export type PrivacyPageContent = {
  altLangHref: string;
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
    kicker: "Privatësia",
    title: "Si i trajtojmë të dhënat e tua",
    lead:
      "Diaspora marshon është një faqe vullnetare dhe jo-fitimprurëse. Mbledhim vetëm të dhënat që na jep vetë, i përdorim vetëm për qëllimin për të cilin na i dhe dhe nuk i shesim kurrë.",
    updated: "Përditësuar më 20 tetor 2026",
    sections: [
      {
        title: "Formulari i kontaktit",
        paragraphs: [
          "Kur na shkruan, ruajmë emrin, email-in, organizatën (nëse e shkruan) dhe mesazhin tënd, për t'u përgjigjur. Duke dërguar mesazhin, pranon që t'i trajtojmë këto të dhëna për këtë qëllim. I mbajmë vetëm për aq kohë sa duhet për bisedën me ty.",
        ],
      },
      {
        title: "Shërbimet që përdorim",
        paragraphs: [
          "Përdorim ofrues të besuar shërbimesh për të mbajtur faqen, për të ruajtur të dhënat e formularëve, për të ndaluar spamin dhe për të numëruar vizitat. Statistikat e vizitave nuk përdorin cookies dhe nuk na tregojnë kush je. Të dhënat e tua nuk i shesim dhe nuk i përdorim për reklama.",
        ],
      },
      {
        title: "Chatbot-i “Pyet Flamingon”",
        paragraphs: [
          "Pyetjet që i bën chatbot-it përpunohen për të krijuar përgjigjen. Mos shkruaj të dhëna personale në të.",
        ],
      },
      {
        title: "Të drejtat e tua",
        paragraphs: [
          "Mund të kërkosh të shohësh, të korrigjosh ose të fshish të dhënat e tua, ose të tërheqësh pëlqimin, duke na shkruar përmes faqes së kontaktit. Ke gjithashtu të drejtë të ankohesh te një autoritet për mbrojtjen e të dhënave.",
        ],
      },
    ],
    contactLabel: "Na shkruaj",
    contactHref: "/contact",
  },
  en: {
    altLangHref: "/privacy",
    kicker: "Privacy",
    title: "How we handle your data",
    lead:
      "Diaspora marshon is a volunteer, non-commercial site. We only collect the data you give us, use it only for the purpose you gave it for, and never sell it.",
    updated: "Updated 20 October 2026",
    sections: [
      {
        title: "Contact form",
        paragraphs: [
          "When you write to us, we store your name, email, organisation (if you give one) and message so we can reply. By sending a message, you agree to us handling this data for that purpose. We keep it only as long as the conversation needs it.",
        ],
      },
      {
        title: "Services we use",
        paragraphs: [
          "We use trusted service providers to host the site, store form data, block spam and count visits. Visit statistics use no cookies and don't tell us who you are. We never sell your data or use it for ads.",
        ],
      },
      {
        title: "The “Ask Flamingo” chatbot",
        paragraphs: [
          "Questions you ask the chatbot are processed to generate an answer. Please don't type personal details into it.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You can ask to see, correct or delete your data, or withdraw your consent, by writing to us through the contact page. You also have the right to complain to a data protection authority.",
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
