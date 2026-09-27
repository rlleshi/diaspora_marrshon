# Flamingo Bot Integration

## Decision

Embed the independently deployed `flamingo-bot` web component on every public
page. Keep its UI and API owned by the bot repository; this site only supplies
the host, language, and a small set of visual tokens.

## Integration

- Load `/widget/flamingo-chat.js` from the bot service on production pages.
- Send chat requests and load avatar media from that same service.
- In local development, relay only the widget bundle, known media assets, and
  `POST /v1/chat` through a same-origin route. The relay is unavailable in
  production and does not forward user cookies or arbitrary paths.
- Set the document language from the `/en` route prefix before creating the
  widget. Its suggested questions use `<html lang>`.
- Keep the widget's built-in disclosure and accessibility behavior intact.

## Verification

Check Albanian and English routes, widget script/media/chat responses, mobile
placement, keyboard operation, typecheck, and production build. The bot service
must allow `https://diaspora-zbarkon.com` and
`https://www.diaspora-zbarkon.com` in `FLAMINGO_ALLOWED_ORIGINS`.
