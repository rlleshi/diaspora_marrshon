# Mission

## Purpose

This website is the public digital home for **Diaspora marshon**: an Albanian-first civic campaign that connects diaspora participation, protest coordination, and public documentation of the ongoing movement in Albania.

The site has evolved from a simple pledge page into four connected surfaces:

- A public campaign homepage for diaspora marches in Tirana.
- A WhatsApp-first coordination entry point for people who want to join or help.
- A bilingual protest pulse that documents participation over time with a visible, source-linked index.
- A source-backed government-scandal dossier that turns long-form research into an explorable public record.

## Primary Goal

The current product optimizes for one clear action:

**Turn public attention into real civic participation and sustained pressure.**

The homepage should help people understand the march, join the coordination group, review the route and principles, and share the message. The protest pulse should help supporters, organizers, journalists, and diaspora members understand the scale and continuity of the protest beyond one event date. The scandal dossier should make documented government failures understandable without weakening source accuracy or legal-status distinctions.

## Current Campaign Frame

The site is Albanian-first, with English as a secondary language.

The current public frame is the third diaspora march in Tirana:

**14-16 August 2026, from Bulevardi i Ri at 18:30 to Skanderbeg Square / Sheshi Skenderbej at 19:00.**

The airport/Rinas march concept is retired from the visible route. The site records the 20 June and 4 July diaspora marches as campaign history and presents the August dates as the next mobilization frame.

## Audience

- Albanian diaspora members who may arrive in Albania and join peaceful civic action.
- Supporters already in Albania who need clear route and timing information.
- Local organizers who need practical coordination through trusted channels.
- Volunteers who can help with stewardship, translation, media, legal support, logistics, or accessibility.
- Journalists, civic groups, and international allies who need a concise explanation of the movement and its visible participation over time.
- Citizens and researchers who need a navigable, source-linked record of major government scandals and their real legal status.
- Supporters who cannot attend but can help distribute the call to action.

## Mission Principles

- Peaceful civic action only.
- The march happens under the Albanian national flag.
- The march does not represent any political party, organization, or interest group.
- Support public responsibility, Albania's future, protected nature, cultural heritage, rule of law, and a new social contract between citizens and the state.
- Respect every participant's political, religious, and social views.
- Reject insults, threats, provocation, discrimination, and incitement to violence.
- Use Albanian as the primary language; English exists to help diaspora members, international allies, and media.
- Keep participant safety and anti-spam controls as core product requirements.
- Avoid collecting personal data unless it is needed for coordination.
- Do not publish raw participant lists, private phone numbers, or sensitive organizer data.

Vjosa-Narta, Zvërnec, protected nature, and the "Revolucioni i Flamingove" remain part of the campaign context. Albania itself remains the pledge target.

## Public Message

The site should communicate that the diaspora is not only speaking from abroad. The diaspora is willing to take concrete, disciplined, peaceful action for the homeland.

Core messages:

- **Kur dheu jep zë, diaspora zbret.**
- **Gjithë shqiptaria zbret kur mëmëdheu thërret.**
- **All Albanians turn out when the motherland calls.**

The march is not against ordinary citizens or against different political beliefs. It is a call for public responsibility, protection of the national interest, protection of nature and cultural heritage, and the future of the country.

## Current Site Sections

- Homepage hero with the current march date and route checkpoints.
- WhatsApp coordination panel with QR code and direct group entry.
- Protest pulse teaser linked to `/pulsi`.
- Government-scandal teaser linked to `/liste_vuajtjesh`.
- Civic demands and campaign context.
- Past marches/history section.
- March section with itinerary, route map, Google Maps link, and principles.
- Suggested clothing page with downloadable shirt previews.
- Bilingual protest pulse at `/pulsi` and `/en/pulsi`.
- Government-scandal dossier at `/liste_vuajtjesh`, with English page chrome at `/en/liste_vuajtjesh` while case-file content remains Albanian.

Practical walking advice and the legacy pledge form remain in the codebase but are hidden from the current homepage.

## Civic Demands Context

The website may explain that the movement supports citizen demands including:

- The non-negotiable resignation of the Prime Minister and the government.
- The creation of a non-partisan transitional technical government.
- Constitutional and electoral reform approved through popular consultation/referendum.
- Reversal of changes to protected-areas and cultural-heritage law.
- Repeal of the Mountains Package.
- Repeal of strategic-investment status and related legal framework.
- A new social contract drafted with citizens, experts, intellectuals, and non-partisan voices proposed by the protest square.

These demands are campaign context. The primary user journey remains simple: understand, join coordination, share, and participate peacefully.

## Live Tracker Mission

The `/pulsi` page exists to show continuity and scale without pretending to produce exact crowd counts.

It should:

- Present a normalized participation index across protest days.
- Link each day to the underlying livestream source.
- Highlight important movement moments.
- Let readers inspect all days, recent ranges, calendar months, and individual weeks.
- Explain methodology and uncertainty clearly.
- Remain readable on mobile.
- Avoid overstating precision.

The current tracker covers 63 consecutive protest days from 31 May through 1 August 2026. Its daily records, day count, source links, event annotations, and route metadata must stay synchronized as new days are added.

## Public Record Mission

The `/liste_vuajtjesh` dossier exists to make documented government scandals easier to inspect without turning allegations into verdicts.

It should:

- Preserve the researched Albanian narrative and claim-by-claim verification notes.
- Distinguish final convictions, active investigations, and cases without a criminal process.
- Keep source links visible for every case.
- Support browsing by category and chronology.
- State clearly that the English route currently translates page chrome, not the underlying Albanian case files.
- Require a matching manual update to `data/scandals.ts` when the source research document changes.

## Coordination Model

The live public coordination layer is WhatsApp-first:

- Users scan the QR code or open WhatsApp.
- Users enter directly without admin approval.
- People introduce themselves with a short template after joining.
- Organizers moderate the group and can rotate the public invite link if spam increases.
- Sensitive logistics can be handled privately by trusted organizers.

The older pledge form, Firebase storage, email confirmation, rate limiting, and Turnstile flow remain in the codebase as infrastructure, but the visible homepage currently hides the form and prioritizes WhatsApp coordination.

## Success Criteria

The site is successful when it can help answer:

- Are people joining coordination channels?
- Are route, timing, and principles clear on mobile?
- Are supporters sharing the campaign and protest pulse?
- Can journalists and allies understand the scale and continuity of the protest?
- Can readers trace scandal claims to sources and understand the difference between an allegation, an investigation, and a conviction?
- Does the public page avoid exposing sensitive organizer or participant data?
- Can the protest participation data be updated day by day without changing the chart implementation?

Public traffic matters, but real participation, distribution through trusted channels, and credible documentation matter more.

## Out Of Scope

- Public social network features.
- Open comments or forums.
- Public participant maps with personal data.
- Publicly visible private phone numbers or organizer lists.
- A complex CMS before the content/data workflow proves necessary.
- Treating the participation index as an exact official crowd count.
