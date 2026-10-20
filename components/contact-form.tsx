"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { MailCheck, Send } from "lucide-react";
import type { Locale } from "@/lib/content";
import type { ContactFormText } from "@/lib/contact-content";
import { TurnstileWidget } from "@/components/turnstile-widget";

type FormState = {
  name: string;
  email: string;
  organisation: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState | "form" | "turnstile", string>>;

const initialState: FormState = {
  name: "",
  email: "",
  organisation: "",
  message: "",
};

export function ContactForm({
  locale,
  content,
  turnstileSiteKey,
}: {
  locale: Locale;
  content: ContactFormText;
  turnstileSiteKey: string;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (!form.name.trim()) nextErrors.name = content.required;
    if (!form.email.trim()) nextErrors.email = content.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = content.invalidEmail;
    }
    if (!form.message.trim()) nextErrors.message = content.required;
    if (turnstileSiteKey && !turnstileToken) nextErrors.turnstile = content.botError;

    return nextErrors;
  }

  function resetTurnstile() {
    setTurnstileToken("");
    setTurnstileKey((current) => current + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      organisation: form.organisation.trim(),
      message: form.message.trim(),
      sourceLanguage: locale,
      sourcePage: window.location.pathname,
      turnstileToken,
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors({
          ...(result.fieldErrors ?? {}),
          form: result.message ?? content.genericError,
        });
        resetTurnstile();
        return;
      }

      setIsSubmitted(true);
      setForm(initialState);
    } catch {
      setErrors({ form: content.genericError });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-panel form-success" aria-live="polite">
        <MailCheck aria-hidden="true" size={34} />
        <h2>{content.successTitle}</h2>
        <p>{content.successBody}</p>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <Field label={content.name} error={errors.name}>
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            maxLength={120}
          />
        </Field>

        <Field label={content.email} error={errors.email}>
          <input
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            inputMode="email"
            maxLength={254}
          />
        </Field>
      </div>

      <Field label={content.organisation} error={errors.organisation}>
        <input
          value={form.organisation}
          onChange={(event) => update("organisation", event.target.value)}
          autoComplete="organization"
          maxLength={160}
        />
      </Field>

      <Field label={content.message} error={errors.message}>
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={content.messagePlaceholder}
          maxLength={5000}
          rows={7}
        />
      </Field>

      <TurnstileWidget
        key={turnstileKey}
        siteKey={turnstileSiteKey}
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
      />
      {errors.turnstile ? <p className="field-error">{errors.turnstile}</p> : null}

      {errors.form ? <p className="form-error">{errors.form}</p> : null}

      <button className="button button-submit" type="submit" disabled={isSubmitting}>
        <Send aria-hidden="true" size={19} />
        {isSubmitting ? content.submitting : content.submit}
      </button>
      <p className="contact-privacy">
        {content.privacy} <Link href={content.privacyHref}>{content.privacyLink}</Link>
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
