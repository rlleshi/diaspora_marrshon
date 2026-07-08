# Mission

## Purpose

This website is the public digital home for **Diaspora marshon**: an Albanian-first civic campaign that connects diaspora participation, protest coordination, and public documentation of the ongoing movement in Albania.

The site has evolved from a simple pledge page into three connected surfaces:

- A public campaign homepage for diaspora marches in Tirana.
- A WhatsApp-first coordination entry point for people who want to join or help.
- A bilingual protest pulse page that documents participation over time with a visible, source-linked index.

## Primary Goal

The current product optimizes for one clear action:

**Turn public attention into real civic participation and sustained pressure.**

The homepage should help people understand the march, join the coordination group, review the route and principles, and share the message. The live tracker should help supporters, organizers, journalists, and diaspora members understand the scale and continuity of the protest beyond one event date.

## Current Campaign Frame

The site is Albanian-first, with English as a secondary language.

The current public frame is:

**Diaspora marshon ne Tirane: from Tirana International Airport "Nene Tereza" through Bulevardi i Ri toward Skanderbeg Square / Sheshi Skenderbej.**

The site also records the June 20 diaspora march as campaign history and presents the July 4 march as the latest public mobilization frame.

## Audience

- Albanian diaspora members who may arrive in Albania and join peaceful civic action.
- Supporters already in Albania who need clear route and timing information.
- Local organizers who need practical coordination through trusted channels.
- Volunteers who can help with stewardship, translation, media, legal support, logistics, or accessibility.
- Journalists, civic groups, and international allies who need a concise explanation of the movement and its visible participation over time.
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
- WhatsApp coordination panel with QR code and admin approval.
- Protest pulse teaser linked to `/pulsi`.
- Civic demands and campaign context.
- Past marches/history section.
- March section with itinerary, route map, principles, and practical advice.
- Suggested clothing page with downloadable shirt previews.
- Bilingual protest pulse page at `/pulsi` and `/en/pulsi`.

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
- Explain methodology and uncertainty clearly.
- Remain readable on mobile.
- Avoid overstating precision.

## Coordination Model

The live public coordination layer is WhatsApp-first:

- Users scan the QR code or open WhatsApp.
- Entry is protected by admin approval.
- People introduce themselves with a short template after joining.
- Sensitive logistics can be handled privately by trusted organizers.

The older pledge form, Firebase storage, email confirmation, rate limiting, and Turnstile flow remain in the codebase as infrastructure, but the visible homepage currently hides the form and prioritizes WhatsApp coordination.

## Success Criteria

The site is successful when it can help answer:

- Are people joining coordination channels?
- Are route, timing, and principles clear on mobile?
- Are supporters sharing the campaign and protest pulse?
- Can journalists and allies understand the scale and continuity of the protest?
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
