# Diaspora Zbarkon

Albanian-first civic campaign site for **Diaspora marshon**.

The app currently combines:

- A bilingual public campaign homepage.
- WhatsApp-first coordination for diaspora marches.
- A source-linked protest participation tracker.
- Suggested clothing/download resources.
- A hidden legacy pledge form backed by Firebase, Turnstile, rate limits, and email confirmation.

## Routes

- `/` - Albanian homepage.
- `/en` - English homepage.
- `/pulsi` - Albanian protest participation tracker.
- `/en/pulsi` - English protest participation tracker.
- `/veshja` - Albanian suggested clothing/downloads.
- `/en/veshja` - English suggested clothing/downloads.
- `/liste_vuajtjesh` - Albanian government scandal dossier (33 case files, 2013–2026).
- `/en/liste_vuajtjesh` - English page chrome for the scandal dossier; the report text itself is Albanian-only.
- `/confirm-email` - legacy pledge confirmation route.
- `/api/pledges` - legacy pledge submission API.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` if you need the pledge API locally.

3. For the visible public pages and tracker, no Firebase credentials are needed.

4. For the legacy pledge flow, configure:

   ```bash
   APP_BASE_URL=http://localhost:3000
   ALLOWED_FORM_ORIGINS=http://localhost:3000
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=
   TURNSTILE_SECRET_KEY=
   RESEND_API_KEY=
   EMAIL_FROM=
   RATE_LIMIT_SALT=replace-with-long-random-value
   EMAIL_CONFIRMATION_SECRET=replace-with-long-random-value
   FIREBASE_PROJECT_ID=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_PRIVATE_KEY=
   ```

   Optional collection overrides:

   ```bash
   FIREBASE_PLEDGES_COLLECTION=pledges
   FIREBASE_EMAIL_CONFIRMATIONS_COLLECTION=email_confirmations
   FIREBASE_CONSENT_VERSIONS_COLLECTION=consent_versions
   FIREBASE_RATE_LIMIT_COLLECTION=rate_limit_events
   ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

In local development, the API skips Turnstile if `TURNSTILE_SECRET_KEY` is empty and logs confirmation links if Resend is not configured. Production pledge-form usage requires real Turnstile, Resend, Firebase, rate-limit, and email-confirmation secrets.

## Useful Commands

```bash
npm run typecheck
npm run build
```

Run `npm run typecheck` before committing. Run `npm run build` before release when route structure, assets, or tracker rendering changes.

## Content Structure

- `lib/content.ts` - homepage, route, WhatsApp, demands, history, hidden form, and confirmation copy.
- `lib/shirts-content.ts` - shirt page copy and country/version metadata.
- `lib/scandals-content.ts` - scandal dossier page chrome (bilingual) and category/status ordering.
- `data/participation.ts` - protest participation index data, daily notes, sources, and chart events.
- `data/scandals.ts` - the 33-record scandal dossier (Albanian-only, verbatim from `docs/skandalet-e-qeverisjes-rama.md`; see that doc for methodology).
- `components/home-page.tsx` - public campaign homepage.
- `components/live-tracker-page.tsx` - `/pulsi` wrapper and localized tracker page copy.
- `components/participation/ParticipationChart.tsx` - interactive SVG chart.
- `components/shirts-page.tsx` - clothing/download resources.
- `components/scandals-page.tsx` - `/liste_vuajtjesh` wrapper: hero, stats dashboard, status composition bar.
- `components/scandals-explorer.tsx` - client-side category filters, chronology ruler, and expandable case-file cards.
- `docs/` - campaign source assets, posters, maps, metrics, and organizer notes.
- `public/` - deployable public images, QR code, and shirt previews.
- `specs/Features.md` - feature ledger for major product changes over time.

## Updating The Protest Pulse

To add a new protest day:

1. Add a new entry to `participation` in `data/participation.ts`.
2. Include `day`, `date`, `saturday`, `peak`, `mean`, `median`, `source`, and localized `note`.
3. Add `noteLink` only when one word or phrase in the note should link to supporting material.
4. Add or adjust `participationEvents` only for major explanatory moments.
5. Update `/pulsi` and `/en/pulsi` metadata if the day count changes.
6. Run `npm run typecheck`.
7. Run `npm run build` before deploying.

The tracker is a normalized participation index, not an exact official crowd count. Keep methodology and disclaimer language honest about camera and model limitations.

## Coordination Model

The visible site is WhatsApp-first:

1. Users scan the QR or open WhatsApp.
2. Group entry is protected by admin approval.
3. New members post the short intro template.
4. Sensitive logistics stay in private organizer channels.

The older form is still present in the codebase but hidden on the homepage. Re-enable it only if structured participant data becomes operationally useful again.

## Firebase Access Model

Public users never write directly to Firestore. The app writes through server routes using Firebase Admin SDK.

`firestore.rules` denies public client reads and writes:

```txt
allow read, write: if false;
```

Trusted organizers should use individual Google/Firebase IAM access if Firebase Console review is needed. Do not share service-account keys between organizers.

## Security Notes

- Keep WhatsApp admin approval enabled.
- Do not publish participant lists, private phone numbers, or sensitive organizer data.
- Keep private logistics out of public copy unless safe.
- Keep Turnstile, rate limits, origin checks, and email confirmation active if the pledge form is re-enabled.
- Treat participation numbers as estimates/index values unless independently verified.
