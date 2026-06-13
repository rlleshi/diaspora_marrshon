# Diaspora Zbarkon

Albanian-first pledge app for the peaceful diaspora march for Albania.

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.local.example` to `.env.local` if needed.
3. Put a Firebase service-account JSON outside git and set `GOOGLE_APPLICATION_CREDENTIALS`.
4. Fill `RATE_LIMIT_SALT` and `EMAIL_CONFIRMATION_SECRET` with long random values.
5. Add Cloudflare Turnstile and Resend credentials before public testing.
6. Run `npm run dev`.

In local development, the API skips Turnstile if `TURNSTILE_SECRET_KEY` is empty and logs confirmation links if Resend is not configured. Production requires those credentials.

## Firebase Access Model

Public users never write directly to Firestore. The app writes through server routes using Firebase Admin SDK.

Trusted organizers use Firebase Console through individual Google/Firebase IAM access. Public client SDK access is denied by `firestore.rules`.
