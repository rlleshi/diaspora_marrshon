import type { Locale } from "@/lib/content";

export type ContactFormText = {
  name: string;
  email: string;
  organisation: string;
  message: string;
  messagePlaceholder: string;
  privacy: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  required: string;
  invalidEmail: string;
  validationError: string;
  botError: string;
  rateLimited: string;
  genericError: string;
};

export type ContactPageContent = {
  altLangHref: string;
  altLangLabel: string;
  homeHref: string;
  homeLabel: string;
  kicker: string;
  title: string;
  lead: string;
  form: ContactFormText;
};

export const contactPageContent: Record<Locale, ContactPageContent> = {
  sq: {
    altLangHref: "/en/contact",
    altLangLabel: "English",
    homeHref: "/",
    homeLabel: "Kthehu te faqja kryesore",
    kicker: "Kontakt",
    title: "Na shkruaj",
    lead:
      "Dëshiron të ndihmosh Flamingo Revolution apo ke ndonjë pyetje rreth saj? Na dërgo një mesazh dhe do të të përgjigjemi me email.",
    form: {
      name: "Emri",
      email: "Email",
      organisation: "Organizata (opsionale)",
      message: "Mesazhi",
      messagePlaceholder: "Si dëshiron të ndihmosh, ose çfarë do të dish?",
      privacy: "Të dhënat e tua përdoren vetëm për të të kthyer përgjigje.",
      submit: "Dërgo mesazhin",
      submitting: "Duke dërguar...",
      successTitle: "Mesazhi u dërgua",
      successBody: "Faleminderit. Do të të përgjigjemi në email-in që na dhe.",
      required: "Kjo fushë kërkohet.",
      invalidEmail: "Shkruaj një email të vlefshëm.",
      validationError: "Kontrollo fushat dhe provo përsëri.",
      botError: "Verifikimi nuk u krye. Rifresko faqen dhe provo përsëri.",
      rateLimited: "Shumë mesazhe për momentin. Provo përsëri më vonë.",
      genericError: "Mesazhi nuk u dërgua. Provo përsëri më vonë.",
    },
  },
  en: {
    altLangHref: "/contact",
    altLangLabel: "Shqip",
    homeHref: "/en",
    homeLabel: "Back to homepage",
    kicker: "Contact",
    title: "Write to us",
    lead:
      "Want to help the Flamingo Revolution, or have a question about it? Send us a message and we'll get back to you by email.",
    form: {
      name: "Name",
      email: "Email",
      organisation: "Organisation (optional)",
      message: "Message",
      messagePlaceholder: "How would you like to help, or what would you like to know?",
      privacy: "We only use your details to reply to you.",
      submit: "Send message",
      submitting: "Sending...",
      successTitle: "Message sent",
      successBody: "Thank you. We'll reply to the email address you gave us.",
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      validationError: "Check the fields and try again.",
      botError: "Verification did not complete. Refresh the page and try again.",
      rateLimited: "Too many messages right now. Please try again later.",
      genericError: "The message could not be sent. Please try again later.",
    },
  },
};

export const contactFooterLabel: Record<Locale, { label: string; href: string }> = {
  sq: { label: "Kontakt", href: "/contact" },
  en: { label: "Contact", href: "/en/contact" },
};
