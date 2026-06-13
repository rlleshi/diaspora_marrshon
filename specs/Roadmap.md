# Roadmap

## Implementation Order

Build in very small pieces. Each step should leave the project in a usable or easily reviewable state.

## Phase 1: Constitution And Content Skeleton

1. Create the `specs/` constitution files.
2. Draft Albanian-first core messages around "Diaspora marshon ne Tirane" and "marshoj per Shqiperine," then add English secondary translations.
3. Define the primary pledge call to action.
4. Define the airport-to-Tirana route and first joining points.
5. Draft peaceful participation rules from `website_text.txt`.
6. Draft consent text for data use and private follow-up.

## Phase 2: App Foundation

1. Scaffold the full web app.
2. Add locale structure with Albanian as the default language and English as the secondary language.
3. Add shared layout and navigation.
4. Add the homepage with the primary pledge CTA.
5. Add the airport-to-Prime-Minister's-Office itinerary section.
6. Add a rules section.
7. Add campaign context and civic demands section.

## Phase 3: Pledge Form MVP

1. Build the pledge form UI.
2. Add fields for first name, email, country, city, joining point or participation choice, optional WhatsApp, optional volunteer interest, and required data-use consent.
3. Add client-side validation for obvious input mistakes.
4. Add server-side validation as the source of truth.
5. Create Firestore collections for `pledges`, `email_confirmations`, `consent_versions`, and `rate_limit_events`.
6. Store submissions in Firestore as unconfirmed by default.
7. Show a neutral success message that asks the user to confirm by email.

## Phase 4: Anti-Spam And Verification

1. Add honeypot protection.
2. Add Cloudflare Turnstile to the pledge form.
3. Add per-IP submission rate limits.
4. Add per-email submission limits.
5. Verify Turnstile tokens server-side before any Firestore write.
6. Add custom email confirmation tokens.
7. Store only hashed confirmation tokens with expiry and `usedAt`.
8. Send confirmation emails through Resend or equivalent transactional email provider.
9. Mark pledges verified only after email confirmation.
10. Keep private coordination links hidden from all unconfirmed users.
11. Use neutral error messages that avoid account or email enumeration.

## Phase 5: Organizer Review

1. Configure Firebase project access for trusted organizers only.
2. Require individual Google accounts and MFA for organizer access.
3. Review confirmed pledges in Firebase.
4. Use route, joining point, country, city, and volunteer interest fields for filtering.
5. Add review status fields only if needed for coordination.
6. Add organizer notes only if needed for coordination.
7. Keep all participant data out of public pages.

## Phase 6: Coordinator Handoff

1. Add scoped exports for trusted coordinators.
2. Export only fields needed for the coordinator's role.
3. Separate email-only participants from participants who opted into WhatsApp.
4. Send private coordination links only after confirmation and review.
5. Document coordinator handling rules for participant data.

## Phase 7: Launch MVP

1. Review Albanian primary copy and English secondary copy.
2. Test pledge submission.
3. Test spam controls.
4. Test email confirmation.
5. Test organizer review and export workflow.
6. Confirm no private group links are public.
7. Launch with the pledge flow as the main conversion path.

## Phase 8: Post-MVP Expansion

1. Add city pages based on real pledge concentration.
2. Add route-specific and joining-point-specific follow-up emails.
3. Add volunteer role workflows.
4. Add press kit and media resources.
5. Add richer logistics only when coordinators need it.
6. Add more languages only after Albanian primary copy and English secondary copy are stable.

## Build Discipline

- Keep every implementation step small enough to review.
- Prefer verified pledges over raw signup counts.
- Do not add public coordination links.
- Do not collect extra data before there is a clear operational need.
- Add security controls before public launch, not after.
