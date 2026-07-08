# Tech Stack

## Product Shape

This is a Next.js web app for an Albanian-first civic campaign.

The current public product is:

- A bilingual public homepage at `/` and `/en`.
- A bilingual protest participation tracker at `/pulsi` and `/en/pulsi`.
- A bilingual suggested clothing/download page at `/veshja` and `/en/veshja`.
- A hidden legacy pledge form and API that can be re-enabled if needed.
- A WhatsApp-first coordination flow on the homepage.

The stack should remain simple enough to update quickly during the campaign, while treating participant safety, privacy, spam resistance, and source-linked public claims as first-class requirements.

## Runtime And Framework

- Next.js App Router.
- React server components by default, client components only where interactivity is needed.
- TypeScript.
- Global CSS in `app/globals.css`.
- Vercel Analytics for page and custom-event tracking.
- Static assets under `public/` and campaign source assets under `docs/`.

## Public Routes

- `/`: Albanian homepage.
- `/en`: English homepage.
- `/pulsi`: Albanian protest pulse / participation index.
- `/en/pulsi`: English protest pulse / participation index.
- `/veshja`: Albanian suggested clothing/downloads page.
- `/en/veshja`: English suggested clothing/downloads page.
- `/confirm-email`: legacy pledge email-confirmation route.
- `/api/pledges`: legacy pledge submission API.

## Content Model

Primary public copy lives in `lib/content.ts`.

The content model includes:

- Navigation labels.
- Homepage hero date and route checkpoints.
- WhatsApp QR panel copy and intro template.
- Protest pulse teaser copy.
- Civic demands and context.
- Past marches/history.
- March itinerary, rules, and practical advice.
- Hidden pledge form copy.
- Email-confirmation messages.

Shirt page copy lives in `lib/shirts-content.ts`.

Participation tracker data lives in `data/participation.ts`.

## Protest Pulse Data Model

The protest pulse is driven by `data/participation.ts`.

Each day stores:

- `day`
- `date`
- `saturday`
- `peak`
- `mean`
- `median`
- `source`
- localized `note`
- optional `noteLink`

`peak`, `mean`, and `median` are normalized index values, not exact official attendance counts. `100` is the largest indexed day. The current method uses geometry-anchored estimates for key days and camera-visible model output for other days.

Event annotations are stored as `participationEvents` with:

- `day`
- `tier`
- `icon`
- localized `label`
- localized `sub`
- `mobile`

The chart geometry is pure TypeScript in `components/participation/geometry.ts` so SVG output stays deterministic across server render and hydration.

## Frontend Components

Key components:

- `components/home-page.tsx`: homepage, route, WhatsApp, pulse teaser, demands, history, shirts teaser.
- `components/live-tracker-page.tsx`: wrapper and localized copy for `/pulsi`.
- `components/participation/ParticipationChart.tsx`: interactive SVG chart, animation, hover/tap detail cards, mobile event list.
- `components/shirts-page.tsx`: suggested clothing page with downloads.
- `components/analytics-events.tsx`: Vercel custom event helpers.
- `components/pledge-form.tsx`: hidden legacy pledge form.

The participation chart is a first-class public feature. It must remain mobile-readable, keyboard-accessible, source-linked, and honest about uncertainty.

## Analytics

Vercel Analytics is installed in `app/layout.tsx`.

Tracked events currently include:

- WhatsApp opens.
- Google Maps opens.
- Shirt page opens.
- Shirt downloads.
- Language switches.
- Section views.
- Tracker page opens.

When adding a new major call to action, add a custom event so campaign decisions can be based on actual behavior rather than only page views.

## WhatsApp Coordination Flow

The visible coordination flow is WhatsApp-first:

1. User lands on the homepage.
2. User scans the QR code or opens WhatsApp.
3. WhatsApp group entry uses admin approval.
4. User posts a short intro template with name, origin, joining point, and optional help.

This avoids a heavy public form for users who are unlikely to complete it, while still using admin approval as a first spam filter.

Do not expose sensitive organizer details or private logistics publicly.

## Legacy Pledge Infrastructure

The codebase still contains a secure pledge infrastructure:

- `app/api/pledges/route.ts`
- `components/pledge-form.tsx`
- Firebase Admin SDK writes.
- Firestore collections.
- Turnstile verification.
- Honeypot field.
- IP and email rate limits.
- Resend email confirmation.
- `/confirm-email`.

The visible homepage currently hides the form. If re-enabled, it must stay behind:

- Server-side validation.
- Origin checks.
- Turnstile.
- Honeypot.
- Per-IP and per-email rate limits.
- Email confirmation.
- Neutral error messages.

## Firestore Data Model

The legacy pledge flow uses:

- `pledges`
- `email_confirmations`
- `consent_versions`
- `rate_limit_events`

`pledges` stores:

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
- `emailStatus`
- `reviewStatus`
- `coordinationStatus`
- `sourceLanguage`
- `sourcePage`
- `createdAt`
- `updatedAt`

`email_confirmations` stores hashed confirmation tokens only. Raw confirmation tokens must never be stored.

Firestore rules deny public client reads and writes. Public submissions go through server routes with Firebase Admin.

## Environment Variables

Core runtime variables:

- `APP_BASE_URL`
- `ALLOWED_FORM_ORIGINS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `RATE_LIMIT_SALT`
- `EMAIL_CONFIRMATION_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Optional collection override variables:

- `FIREBASE_PLEDGES_COLLECTION`
- `FIREBASE_EMAIL_CONFIRMATIONS_COLLECTION`
- `FIREBASE_CONSENT_VERSIONS_COLLECTION`
- `FIREBASE_RATE_LIMIT_COLLECTION`

For local development, missing Turnstile and Resend credentials are tolerated by the code path. Production pledge form usage requires them.

## Security And Privacy Defaults

- Keep public Firestore access denied.
- Do not publish participant lists.
- Do not publish phone numbers.
- Do not collect unnecessary personal data.
- Keep WhatsApp admin approval enabled.
- Keep route/logistics information public only when it is safe to publish.
- Keep exact crowd-size claims framed as estimates or normalized index values unless independently verified.
- Avoid adding public comments, open uploads, or user-generated content.

## Later Enhancements

Consider only when there is a concrete need:

- CMS or structured editorial workflow for daily protest updates.
- Admin dashboard replacing direct Firebase Console usage.
- Export tooling for coordinators.
- More languages beyond Albanian and English.
- Deeper press kit.
- Automated social-share images for each protest-pulse update.
