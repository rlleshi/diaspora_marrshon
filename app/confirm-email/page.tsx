import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { content, type Locale } from "@/lib/content";
import {
  confirmEmailToken,
  type ConfirmEmailStatus,
} from "@/lib/confirm-email";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const locale: Locale = params.lang === "en" ? "en" : "sq";
  const token = typeof params.token === "string" ? params.token : "";
  const status = await confirmEmailToken(token);
  const copy = confirmationCopy(status, locale);
  const homeHref = locale === "en" ? "/en" : "/";
  const Icon = status === "confirmed" || status === "already-used"
    ? CheckCircle2
    : AlertCircle;

  return (
    <main className="confirm-page">
      <section className="confirm-panel">
        <Icon aria-hidden="true" size={38} />
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <Link className="button button-primary" href={homeHref}>
          {content[locale].confirm.home}
        </Link>
      </section>
    </main>
  );
}

function confirmationCopy(status: ConfirmEmailStatus, locale: Locale) {
  const t = content[locale].confirm;

  if (status === "confirmed") {
    return { title: t.confirmedTitle, body: t.confirmedBody };
  }

  if (status === "already-used") {
    return { title: t.usedTitle, body: t.usedBody };
  }

  if (status === "expired") {
    return { title: t.expiredTitle, body: t.expiredBody };
  }

  return { title: t.invalidTitle, body: t.invalidBody };
}
