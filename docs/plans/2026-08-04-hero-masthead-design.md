# Hero Campaign Masthead Design

## Goal

Add `Flamingo Revolution Diaspora` as the dominant visual identity over the homepage hero photograph in both language versions.

## Design

- Place the masthead above the existing eyebrow, slogan, and schedule so it does not compete with route information.
- Render `FLAMINGO REVOLUTION` in large white uppercase type.
- Render `DIASPORA` directly below in campaign red, followed by a short red rule.
- Keep the treatment unframed so the photograph remains the hero background.
- Use explicit desktop, tablet, and mobile font sizes instead of viewport-scaled text.
- Allow the lead line to wrap naturally on narrow phones without overlapping the schedule or calls to action.

## Implementation

- Store the two masthead parts in the bilingual hero content model, using the same English wording for both locales.
- Add one masthead block to `components/home-page.tsx`.
- Shift the existing desktop hero grid down by one row.
- Add responsive styles in `app/globals.css`.

## Verification

- Run TypeScript validation and a production build.
- Inspect desktop and mobile screenshots for clipping, overlap, contrast, and first-viewport balance.
- Confirm `/` and `/en` display identical masthead wording.
