# Roadmap

## Working Principle

Keep changes small enough to review quickly. The campaign moves fast, so every update should either improve public clarity, increase real coordination, document the protest more credibly, or reduce operational risk.

## Current State

The app currently has:

- Albanian and English public homepage.
- WhatsApp-first coordination panel.
- July 4 march hero and route information.
- Past march history for June 20.
- Civic demands/context section.
- Route, principles, and practical advice.
- Suggested clothing/download pages.
- Vercel Analytics custom events.
- A bilingual protest participation tracker through day 38.
- Hidden legacy pledge form with Firebase, Turnstile, rate limits, and Resend support.

## Phase 1: Keep Public Campaign Copy Current

1. Update homepage date, route, and call-to-action copy as public campaign needs change.
2. Keep Albanian copy primary and English secondary.
3. Keep route map, Google Maps link, and itinerary text aligned.
4. Keep WhatsApp intro template short and operational.
5. Keep past marches/history accurate as events pass.
6. Remove or reframe outdated future-tense language after an event date passes.

## Phase 2: Maintain The Protest Pulse

1. Add each new protest day to `data/participation.ts`.
2. Add the News24 or source livestream link for each day.
3. Add short Albanian and English notes for each day.
4. Update methodology comments when normalization or source assumptions change.
5. Add or adjust `participationEvents` only for moments that help explain the movement.
6. Check mobile chart readability after major event-label changes.
7. Keep metadata descriptions in `/pulsi` and `/en/pulsi` aligned with the current day count.

## Phase 3: Improve Credibility And Methodology

1. Keep the tracker framed as an index, not exact official attendance.
2. Document anchor-day assumptions and geometry estimates in a public or internal note.
3. Add source links for major press mentions when they become part of the story.
4. Consider adding a concise methodology section/page if the pulse page gets wider circulation.
5. Avoid overclaiming precision from camera feeds or machine-learning counts.

## Phase 4: Strengthen Conversion And Sharing

1. Track important actions with Vercel custom events.
2. Keep WhatsApp open, Google Maps open, tracker open, shirt downloads, and language switches tracked.
3. Add a native mobile share/copy CTA if distribution becomes the bottleneck.
4. Add UTM-aware links for outreach through admins/pages/groups.
5. Keep posters and QR assets in `docs/` organized by language and channel.
6. Optimize the first mobile viewport before adding more content.

## Phase 5: Coordination Safety

1. Keep WhatsApp admin approval enabled.
2. Reset public invite links if spam increases.
3. Keep sensitive logistics out of public copy.
4. Do not publish participant lists or organizer private details.
5. Use public pages for broad coordination and private channels for sensitive execution.
6. Keep Firebase rules denying direct public reads/writes.

## Phase 6: Legacy Pledge Flow

The secure pledge form exists but is currently hidden. Re-enable only if there is a clear operational need for structured participant data.

If re-enabled:

1. Test Turnstile locally and in production.
2. Test email confirmation with Resend.
3. Test Firebase writes and confirmation status.
4. Confirm `ALLOWED_FORM_ORIGINS` is correct.
5. Confirm rate limits behave correctly.
6. Review consent text and deletion policy.
7. Keep private coordination links out of the confirmation page.

## Phase 7: Design And Mobile QA

1. Check mobile hero after any date/route copy change.
2. Check route map legibility on mobile and desktop.
3. Check `/pulsi` on mobile after chart data or label changes.
4. Check shirt cards and downloads after asset changes.
5. Run `npm run typecheck` before committing.
6. Run `npm run build` before release when page structure or assets change.

## Phase 8: Potential Later Features

Only add these if the campaign needs them:

1. Public methodology page for the participation index.
2. Press kit with downloadable images, posters, and source links.
3. Automated daily pulse social image.
4. Admin dashboard for pledge review/export.
5. Structured archive of past marches and major protest days.
6. Additional languages beyond Albanian and English.

## Build Discipline

- Prefer simple, direct copy updates over new abstractions.
- Keep the public site fast and mobile-first.
- Treat claims about crowd size as estimates unless independently verified.
- Keep data and visible copy synchronized.
- Add major new features to `specs/Features.md` when they change the product surface.
- Do not expose private coordination details in public routes.
- Preserve the codebase's existing component and CSS style unless a focused refactor is justified.
