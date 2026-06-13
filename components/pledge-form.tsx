"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import type { SiteContent, Locale } from "@/lib/content";
import { TurnstileWidget } from "@/components/turnstile-widget";

type FormText = SiteContent["form"];

type FormState = {
  firstName: string;
  email: string;
  country: string;
  city: string;
  joiningPoint: string;
  participationType: string;
  wantsWhatsAppFollowup: boolean;
  whatsAppNumber: string;
  wantsVolunteerFollowup: boolean;
  volunteerInterest: string;
  acceptedDataUse: boolean;
};

type FieldErrors = Partial<Record<keyof FormState | "form" | "turnstile", string>>;

const initialState: FormState = {
  firstName: "",
  email: "",
  country: "",
  city: "",
  joiningPoint: "",
  participationType: "",
  wantsWhatsAppFollowup: false,
  whatsAppNumber: "",
  wantsVolunteerFollowup: false,
  volunteerInterest: "",
  acceptedDataUse: false,
};

export function PledgeForm({
  locale,
  content,
  turnstileSiteKey,
}: {
  locale: Locale;
  content: FormText;
  turnstileSiteKey: string;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  const emailLooksValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = content.required;
    if (!form.email.trim()) nextErrors.email = content.required;
    if (form.email.trim() && !emailLooksValid) {
      nextErrors.email = content.invalidEmail;
    }
    if (!form.country.trim()) nextErrors.country = content.required;
    if (!form.city.trim()) nextErrors.city = content.required;
    if (!form.joiningPoint) nextErrors.joiningPoint = content.required;
    if (!form.participationType) nextErrors.participationType = content.required;
    if (form.wantsWhatsAppFollowup && !form.whatsAppNumber.trim()) {
      nextErrors.whatsAppNumber = content.required;
    }
    if (!form.acceptedDataUse) nextErrors.acceptedDataUse = content.required;
    if (turnstileSiteKey && !turnstileToken) nextErrors.turnstile = content.botError;

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const payload = {
      ...form,
      firstName: form.firstName.trim(),
      email: form.email.trim(),
      country: form.country.trim(),
      city: form.city.trim(),
      whatsAppNumber: form.whatsAppNumber.trim(),
      volunteerInterest: form.volunteerInterest.trim(),
      sourceLanguage: locale,
      sourcePage: window.location.pathname,
      turnstileToken,
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/pledges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        setTurnstileToken("");
        setTurnstileKey((current) => current + 1);
        return;
      }

      setIsSubmitted(true);
      setForm(initialState);
    } catch {
      setErrors({ form: content.genericError });
      setTurnstileToken("");
      setTurnstileKey((current) => current + 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-panel form-success" aria-live="polite">
        <ShieldCheck aria-hidden="true" size={34} />
        <h2>{content.successTitle}</h2>
        <p>{content.successBody}</p>
      </div>
    );
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h2>{content.title}</h2>
        <p>{content.body}</p>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <Field label={content.firstName} error={errors.firstName}>
          <input
            value={form.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            autoComplete="given-name"
            maxLength={80}
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

        <Field label={content.country} error={errors.country}>
          <input
            value={form.country}
            onChange={(event) => update("country", event.target.value)}
            autoComplete="country-name"
            maxLength={80}
          />
        </Field>

        <Field label={content.city} error={errors.city}>
          <input
            value={form.city}
            onChange={(event) => update("city", event.target.value)}
            autoComplete="address-level2"
            maxLength={100}
          />
        </Field>
      </div>

      <Field label={content.joiningPoint} error={errors.joiningPoint}>
        <select
          value={form.joiningPoint}
          onChange={(event) => update("joiningPoint", event.target.value)}
        >
          <option value="" />
          {content.joiningPointOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={content.participationType} error={errors.participationType}>
        <select
          value={form.participationType}
          onChange={(event) => update("participationType", event.target.value)}
        >
          <option value="" />
          {content.participationTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <label className="check-row">
        <input
          type="checkbox"
          checked={form.wantsWhatsAppFollowup}
          onChange={(event) =>
            update("wantsWhatsAppFollowup", event.target.checked)
          }
        />
        <span>{content.whatsappOptIn}</span>
      </label>

      {form.wantsWhatsAppFollowup ? (
        <Field label={content.whatsappNumber} error={errors.whatsAppNumber}>
          <input
            value={form.whatsAppNumber}
            onChange={(event) => update("whatsAppNumber", event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
          />
        </Field>
      ) : null}

      <label className="check-row">
        <input
          type="checkbox"
          checked={form.wantsVolunteerFollowup}
          onChange={(event) =>
            update("wantsVolunteerFollowup", event.target.checked)
          }
        />
        <span>{content.volunteerOptIn}</span>
      </label>

      {form.wantsVolunteerFollowup ? (
        <Field label={content.volunteerInterest} error={errors.volunteerInterest}>
          <textarea
            value={form.volunteerInterest}
            onChange={(event) => update("volunteerInterest", event.target.value)}
            placeholder={content.volunteerPlaceholder}
            maxLength={240}
            rows={3}
          />
        </Field>
      ) : null}

      <label className="check-row consent-row">
        <input
          type="checkbox"
          checked={form.acceptedDataUse}
          onChange={(event) => update("acceptedDataUse", event.target.checked)}
        />
        <span>
          {content.consent}
          <small>{content.consentVersion}</small>
        </span>
      </label>
      {errors.acceptedDataUse ? (
        <p className="field-error">{errors.acceptedDataUse}</p>
      ) : null}

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
