import { Resend } from "resend";
import type { Locale } from "@/lib/content";
import { getAppBaseUrl, isProduction } from "@/lib/env";

export async function sendConfirmationEmail({
  to,
  firstName,
  token,
  locale,
}: {
  to: string;
  firstName: string;
  token: string;
  locale: Locale;
}) {
  const confirmationUrl = new URL("/confirm-email", getAppBaseUrl());
  confirmationUrl.searchParams.set("token", token);
  confirmationUrl.searchParams.set("lang", locale);

  const subject =
    locale === "sq"
      ? "Konfirmo premtimin për marshimin"
      : "Confirm your march pledge";
  const greeting = locale === "sq" ? `Përshëndetje ${firstName},` : `Hi ${firstName},`;
  const intro =
    locale === "sq"
      ? "Për të verifikuar premtimin për marshimin për Shqipërinë, hap lidhjen më poshtë:"
      : "To verify your pledge to march for Albania, open the link below:";
  const note =
    locale === "sq"
      ? "Lidhja skadon pas 48 orësh. Lidhjet private të koordinimit nuk dërgohen publikisht."
      : "The link expires after 48 hours. Private coordination links are not sent publicly.";

  const text = `${greeting}\n\n${intro}\n${confirmationUrl.toString()}\n\n${note}`;
  const html = `
    <p>${escapeHtml(greeting)}</p>
    <p>${escapeHtml(intro)}</p>
    <p><a href="${confirmationUrl.toString()}">${confirmationUrl.toString()}</a></p>
    <p>${escapeHtml(note)}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (isProduction()) {
      throw new Error("RESEND_API_KEY and EMAIL_FROM must be configured.");
    }

    console.warn(
      `Email provider is not configured. Confirmation link for ${to}: ${confirmationUrl.toString()}`,
    );
    return;
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

export async function sendContactNotification({
  to,
  name,
  email,
  organisation,
  message,
  locale,
}: {
  to: string;
  name: string;
  email: string;
  organisation?: string;
  message: string;
  locale: Locale;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(`Email provider is not configured. Contact message from ${email} was stored only.`);
    return;
  }

  const sender = organisation ? `${name} (${organisation})` : name;
  const subject = `Diaspora marshon: message from ${sender}`;
  const header = `From: ${name} <${email}>${organisation ? `\nOrganisation: ${organisation}` : ""}\nPage language: ${locale}`;
  const text = `${header}\n\n${message}`;
  const html = `
    <p>${escapeHtml(header).replaceAll("\n", "<br>")}</p>
    <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
  `;

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
