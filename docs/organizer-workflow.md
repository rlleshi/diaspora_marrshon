# Organizer Workflow

## Firebase Access

Trusted organizers should use individual Google accounts with MFA. Grant access through Firebase/Google IAM only to people who need pledge review or exports.

Do not share service-account JSON files between organizers. Service-account keys are for the server runtime and local development only.

## Review

Use the `pledges` collection, or the development collection configured in `.env.local`, to review participants.

Recommended filters:

- `emailStatus == confirmed`
- `reviewStatus == unreviewed`
- `joiningPoint`
- `routeChoice`
- `country`
- `city`
- `wantsVolunteerFollowup`

Set `reviewStatus` to `reviewed`, `rejected`, or `withdrawn` only after a trusted organizer has checked the pledge.

## Coordinator Handoff

Export only fields needed for the coordinator's role:

- First name
- Email
- Country
- City
- Joining point
- Participation type
- Volunteer interest, if relevant
- WhatsApp number only when `wantsWhatsAppFollowup` is true

Do not send raw collection exports to broad groups. Keep city, route, and role lists separate.

Private group links should be sent only after email confirmation and organizer review.

## Data Handling

Participant lists are not public content. Delete or archive data when it is no longer needed for the campaign.
