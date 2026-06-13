# Tech Stack

## Product Shape

Build the first version as a full web app, not only a static landing page.

The app should support an Albanian-first public website with English as a secondary language, secure pledge collection for the diaspora march, email confirmation, trusted organizer review, and coordinator exports. The stack should remain simple enough to launch quickly, but it must treat spam prevention and participant privacy as first-class requirements.

## Recommended Architecture

- Next-style web application with server-rendered public pages.
- Server-side form handling for all pledge submissions.
- Firebase Firestore-backed pledge records for the MVP.
- Firebase Admin SDK for all server-side writes to pledge data.
- Resend or equivalent transactional email provider for confirmation and follow-up messages.
- Cloudflare Turnstile for bot checks on public pledge submissions.
- Firebase Console access for trusted organizers in the MVP.
- Rate limiting and bot protection at the form/API boundary.
- Structured exports for coordinators after review.

Public participants should not create accounts. Trusted organizers may access Firebase directly through Google/Firebase IAM instead of a custom admin-user system.

## Public Experience

The MVP should include:

- Albanian-first public copy, with English translations as the secondary language.
- Clear "march for Albania" pledge call to action.
- Short route-aware pledge form for the airport-to-Tirana march and other joining points.
- Peaceful participation rules.
- March itinerary content, starting from Tirana International Airport "Nene Tereza" and continuing toward the Prime Minister's Office.
- Consent language for data use and private follow-up.
- No public WhatsApp or private coordination links.

## Minimal Pledge Data

Collect only what is needed for early coordination:

- First name.
- Email address.
- Country.
- City.
- Route, joining point, or participation choice.
- Optional WhatsApp number.
- Optional volunteer interest.
- Required consent to data use for campaign coordination.
- Email confirmation status.
- Review status for coordinator follow-up.

Avoid collecting sensitive personal data unless a later, explicit workflow justifies it.

## Firestore Data Model

Use a small collection set for the MVP:

- `pledges`
- `email_confirmations`
- `consent_versions`
- `rate_limit_events`

`pledges` is the core collection. A pledge means the person says they intend to come, join, or participate in the diaspora march for Albania.

Recommended `pledges` fields:

- `firstName`
- `email`
- `emailNormalized`
- `country`
- `city`
- `joiningPoint`
- `routeChoice`
- `participationType`
- `wantsWhatsAppFollowup`
- `whatsAppNumber` optional
- `wantsVolunteerFollowup`
- `volunteerInterest` optional
- `acceptedDataUse`
- `consentVersion`
- `consentedAt`
- `emailStatus`: `pending` or `confirmed`
- `emailConfirmedAt` optional
- `reviewStatus`: `unreviewed`, `reviewed`, `rejected`, or `withdrawn`
- `coordinationStatus`: `none`, `exported`, `contacted`, or `invited`
- `sourceLanguage`: `sq` or `en`
- `sourcePage` optional
- `createdAt`
- `updatedAt`

Do not store a separate peaceful-rules acceptance field. Peaceful conduct is a public premise of the march, not a separate data checkbox.

`email_confirmations` stores confirmation state:

- `pledgeId`
- `emailNormalized`
- `tokenHash`
- `expiresAt`
- `usedAt`
- `createdAt`

Store only the hash of the email confirmation token, never the raw token.

`consent_versions` stores the exact data-use consent text and version accepted by participants.

`rate_limit_events` stores short-lived anti-spam records such as IP hash, email hash, timestamp, and reason. Prefer hashed identifiers and automatic deletion/TTL.

## Security And Anti-Spam Defaults

The pledge flow must include:

- Cloudflare Turnstile token on form submission, verified server-side before any Firestore write.
- Honeypot field.
- Per-IP and per-email rate limits.
- Server-side validation.
- No direct public client writes to pledge collections.
- Custom email confirmation before a pledge is treated as verified.
- No public private-group invite links.
- Manual review before coordinator handoff.
- Basic audit trail for organizer review/export actions when actions happen through app code.
- Abuse-resistant error messages that do not reveal whether an email is already registered.

Spam resistance should not be treated as cleanup work after launch. It belongs in the first implementation pass.

## Submission And Email Confirmation Flow

1. User submits the pledge form with the Turnstile token.
2. Server checks honeypot, rate limits, Turnstile token, and server-side validation.
3. Server writes `pledges/{pledgeId}` with `emailStatus: "pending"`.
4. Server generates a long random confirmation token.
5. Server stores only the token hash in `email_confirmations`, with expiry and `usedAt: null`.
6. Server sends a confirmation email through Resend or equivalent.
7. User clicks `/confirm-email?token=...`.
8. Server hashes the token, finds a matching unused and unexpired confirmation record, then marks the pledge confirmed.
9. Server marks the confirmation token used.
10. User sees a neutral confirmation message.

Confirmation links should expire, for example after 24 or 48 hours. Repeated clicks should be harmless and should not expose private coordination links by default.

## Privacy Defaults

- Collect the minimum data needed for coordination.
- Store consent timestamps and consent text version.
- Restrict Firebase access to trusted organizers.
- Require individual Google accounts and MFA for organizer access.
- Do not share Firebase credentials or service account keys between organizers.
- Export only the fields needed by each coordinator.
- Do not expose participant lists publicly.
- Do not share phone numbers unless the participant opted into that channel.
- Delete or archive data when it is no longer needed for the campaign.

## Organizer And Coordinator Workflow

Trusted organizers using Firebase should be able to:

- View confirmed pledges.
- Filter by route, joining point, country, city, and volunteer interest.
- Mark pledges as reviewed.
- Export coordinator-ready lists.
- See basic submission and confirmation status.

Coordinators should receive only scoped lists relevant to their city, route, or role. Coordinator access should be least-privilege by default.

A custom admin dashboard is not required for the MVP. Add one only if Firebase Console access becomes too risky, too slow, or too easy to misuse.

## Later Enhancements

Only after the pledge and review flow is stable, consider:

- Rich city pages.
- Volunteer role workflows.
- Press kit management.
- Route-specific and joining-point-specific email campaigns.
- More detailed logistics collection.
- Multilingual expansion beyond Albanian primary copy and English secondary copy.
