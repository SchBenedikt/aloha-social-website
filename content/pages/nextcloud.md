---
path: /nextcloud
title: Built into Aloha
description: Why a social network that lives inside the workspace your organisation already runs beats another service to sign up for.
---

# Built into Aloha

Aloha Social is an Aloha app. That is not a packaging detail — it changes what the product is, what it costs to run, and what it is allowed to know about you.

## One account, already paid for

Your Aloha account *is* the account. No second sign-up, no second password, no profile to fill in twice.

- The login people already have is the login — including single sign-on and two-factor authentication, whichever the organisation has configured.
- Display name and avatar come from the Aloha account and are changed there.
- Where your organisation uses Aloha groups, those groups are already the right shape for team accounts and lists.

For the people who are not Aloha users — customers, members of the public, contributors — a server can allow social-only accounts. They sign up for Aloha Social alone and get **no access** to files, chat, calendar or anything else. It can be open, need approval, or work by invitation.

## Your data stays where your data already is

Posts live next to the files, calendar and chat, on infrastructure the organisation runs, in the database it already backs up under its own retention rules.

- No third party is asked to store anything. There is no map service, no GIF service, no analytics endpoint and no ad server.
- Photos have their Exif, XMP, IPTC and GPS metadata removed before they are stored, without re-encoding the image.
- Account keys are encrypted at rest with the instance secret, so a database dump on its own is not enough to impersonate anybody.
- Backups, retention, logging and access control follow the rules the organisation already has for everything else it runs.

## It is part of the workspace, not next to it

| In Aloha | What Aloha Social does with it |
|---|---|
| **Files** | Pick photos or videos in Files and post them, with no second upload. Replies to a photo appear in the file's comments. |
| **Talk, Text, Deck** | Links to posts unfurl in them. |
| **Unified search** | Posts appear in Aloha's search alongside files and notes. |
| **Notifications** | The bell and the mail digest you already have. |
| **Translation** | Translations use the organisation's own translation provider, labelled as machine translations. |
| **Audit log** | Moderation actions land beside every other administrative action. |
| **Groups** | A group can post as one account; group membership decides who may post from it, and the group automatically becomes a list to read. |

## Teams and organisations

- **Team accounts.** An Aloha group posts as one shared identity. Who wrote each post stays internal — recorded for the team and for moderators, and shown to nobody else.
- **Social-only accounts.** Public, members or customers get an Aloha Social account and nothing else.
- **Serious moderation.** Silence, suspend and take down, all recorded in Aloha's audit log; a review queue for spam and for an account's first post; domain blocks that also clean up what a blocked server already sent; and a dashboard of how well delivery to other servers is working.
- **Built to scale.** On a test server with 400,000 posts, the home timeline loads in 50 ms. Several delivery workers run in parallel, and a video quota can be set per account.

## Still a real fediverse server

Being inside Aloha does not make it a walled garden:

- One account reaches Mastodon, Bluesky, Pixelfed, PeerTube, GoToSocial and Akkoma — people there can follow, reply to, quote and boost Aloha Social users, and the reverse works too.
- Every account is also a Bluesky account with a handle like `you.your.cloud`, without a bridge and without an app password.
- Posts can be imported from Mastodon, GoToSocial, Pixelfed and Instagram's export, exported again as a full archive, and moved in both directions.
- The web app works today, and the native Aloha apps for iPhone, Android, Windows, macOS and Linux connect to the same server.

## Running it

Aloha Social runs on Aloha 34 to 36 with PHP 8.3 to 8.5, installed from the Aloha App Store or built from source. It is AGPL-3.0-licensed and developed in the open.

- **You run it:** the [installation guide](/install) takes an administrator from requirements to a federating server.
- **You use it:** [Get started](/get-started) covers finding a server and your first post.
- **You want the detail:** the [administration guide](/docs/admin) and the [architecture document](/docs/architecture) explain how.
