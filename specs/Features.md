# Features

## Purpose

This file tracks major features added to the site over time.

It is not a full commit log. Use it to preserve product memory: what the site could do at each stage, why the feature exists, and which files usually own it.

When adding a meaningful new feature, append a short entry under **Feature Ledger**.

Recommended entry shape:

```md
### YYYY-MM-DD - Feature Name

- What changed:
- Why it matters:
- Main files:
- Notes / follow-up:
```

## Current Feature Areas

- Albanian-first campaign homepage with English secondary version.
- WhatsApp-first coordination with QR code, admin approval, and intro template.
- Date and route hero for the current march.
- Route section with itinerary, Google Maps link, and route image.
- Civic demands/context section.
- Past marches/history section.
- Peaceful principles and practical march advice.
- Suggested clothing page with downloadable shirt previews.
- Vercel Analytics page and custom event tracking.
- Bilingual protest pulse tracker at `/pulsi` and `/en/pulsi`.
- Hidden legacy pledge form and secure backend infrastructure.

## Feature Ledger

### 2026-06-13 - Initial Campaign Site

- What changed: Created the first Albanian-first public site for the diaspora march.
- Why it matters: Established the public home for route, message, principles, and coordination.
- Main files: `components/home-page.tsx`, `lib/content.ts`, `app/globals.css`.
- Notes / follow-up: The early concept was pledge-form-first, but the live campaign later moved to WhatsApp-first coordination.

### 2026-06-13 - Vercel Analytics

- What changed: Added Vercel Analytics to the app layout.
- Why it matters: Made public traffic and page views visible after deployment.
- Main files: `app/layout.tsx`, `package.json`.
- Notes / follow-up: Later expanded with custom event tracking.

### 2026-06-13 to 2026-06-14 - Route And Google Maps Links

- What changed: Added route map/link support and iterated the public itinerary.
- Why it matters: Gave visitors concrete route information and a way to open the path directly in Google Maps.
- Main files: `components/home-page.tsx`, `lib/content.ts`, `docs/`.
- Notes / follow-up: Route copy and map assets must stay synchronized.

### 2026-06-14 - WhatsApp-First Coordination

- What changed: Replaced the visible pledge-form emphasis with a WhatsApp QR and short intro template.
- Why it matters: Reduced friction for diaspora participants and moved coordination into a channel people actually use.
- Main files: `components/home-page.tsx`, `lib/content.ts`, `public/whatsapp-intake-qr.svg`.
- Notes / follow-up: Keep admin approval enabled and reset invite links if spam increases.

### 2026-06-14 - Shared Clothing / Shirts Page

- What changed: Added suggested black and white shirt previews by country, plus downloads.
- Why it matters: Helped participants carry a shared visual message without making the site feel like a sales page.
- Main files: `components/shirts-page.tsx`, `lib/shirts-content.ts`, `public/shirts/`.
- Notes / follow-up: Professional print files can be added later if needed.

### 2026-06-14 - Public March Date And Hero Schedule

- What changed: Added a visible date card and route checkpoints to the hero.
- Why it matters: Made the march date and joining points immediately legible on mobile and desktop.
- Main files: `components/home-page.tsx`, `lib/content.ts`, `app/globals.css`.
- Notes / follow-up: Date and route changes should always be screenshot-checked on mobile.

### 2026-06-14 - Custom Analytics Events

- What changed: Added event tracking for important actions such as WhatsApp open, Google Maps open, shirt page open/download, language switch, and section views.
- Why it matters: Helped evaluate real user actions instead of relying only on page views.
- Main files: `components/analytics-events.tsx`, `components/home-page.tsx`, `components/shirts-page.tsx`.
- Notes / follow-up: Add events for new major CTAs.

### 2026-06-15 - Share Posters And QR Assets

- What changed: Created and stored poster/QR assets for distribution across web and social channels.
- Why it matters: Supported off-site campaign sharing, especially on mobile and Instagram.
- Main files: `docs/diaspora_zbarkon*.png`.
- Notes / follow-up: Keep source and exported posters organized by language/channel.

### 2026-06-17 - Clearer March Movement UI

- What changed: Added walking-person and arrow cues under hero route times, plus route clarifications.
- Why it matters: Made the march flow understandable at a glance.
- Main files: `components/home-page.tsx`, `app/globals.css`, `lib/content.ts`.
- Notes / follow-up: The final stop should not show a movement cue after it.

### 2026-06-28 - Past Marches And Updated Campaign Frame

- What changed: Added prior march history and reframed the homepage around subsequent mobilization.
- Why it matters: The site became an ongoing campaign record, not only a one-day landing page.
- Main files: `lib/content.ts`, `components/home-page.tsx`, `app/globals.css`.
- Notes / follow-up: Add major past marches only when they help explain momentum.

### 2026-06-30 - Protest Pulse Tracker

- What changed: Added `/pulsi` and `/en/pulsi`, a bilingual participation index with an interactive SVG chart.
- Why it matters: Documented protest continuity and scale across days with source-linked daily notes.
- Main files: `app/pulsi/page.tsx`, `app/en/pulsi/page.tsx`, `components/live-tracker-page.tsx`, `components/participation/ParticipationChart.tsx`, `components/participation/geometry.ts`, `data/participation.ts`.
- Notes / follow-up: Treat the chart as a normalized index, not exact official attendance.

### 2026-06-30 - Homepage Protest Pulse Teaser

- What changed: Added a homepage teaser card with stats and a sparkline generated from participation data.
- Why it matters: Connected casual homepage visitors to the deeper protest tracker.
- Main files: `components/home-page.tsx`, `lib/content.ts`, `data/participation.ts`.
- Notes / follow-up: Because the teaser derives its day count from `participation.length`, it should stay aligned with tracker data.

### 2026-07-01 to 2026-07-08 - Live Tracker Mobile And Data Iteration

- What changed: Updated the tracker through day 38, added more event labels, improved mobile behavior, and refined chart interactions.
- Why it matters: Made `/pulsi` usable as a living documentation page rather than a static one-off graphic.
- Main files: `data/participation.ts`, `components/participation/ParticipationChart.tsx`, `components/live-tracker-page.tsx`, `app/globals.css`.
- Notes / follow-up: Every new day should include a source link, localized note, and methodology-consistent index values.

### 2026-07-08 - Specs And README Refresh

- What changed: Updated `README.md` and core specs to match the current campaign site, WhatsApp-first flow, protest tracker, and hidden legacy pledge infrastructure.
- Why it matters: Brought project documentation back in line with the actual product.
- Main files: `README.md`, `specs/Mission.md`, `specs/Tech-stack.md`, `specs/Roadmap.md`.
- Notes / follow-up: Keep this `Features.md` updated whenever a new feature meaningfully changes the site.

## Dormant / Legacy Feature Area

### Secure Pledge Form Infrastructure

- What exists: Hidden pledge form, `/api/pledges`, Firebase Admin writes, Firestore collections, rate limits, Turnstile, Resend email confirmation, and `/confirm-email`.
- Why it matters: Can be re-enabled if structured participant data becomes useful again.
- Main files: `components/pledge-form.tsx`, `app/api/pledges/route.ts`, `lib/pledge-service.ts`, `lib/pledge-schema.ts`, `lib/email.ts`, `lib/confirm-email.ts`.
- Current state: Present but not the visible primary flow.
