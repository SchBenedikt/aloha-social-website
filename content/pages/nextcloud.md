---
path: /nextcloud
title: Why it runs on Nextcloud
description: Why a social network that lives inside the workspace your organisation already runs beats another service to sign up for.
---

# Why it runs on Nextcloud

Aloha Social is a **Nextcloud app** — not a separate service. That changes everything.

---

## One account, already yours

Your Nextcloud account **is** your Aloha Social account.

- **No new signup** — open the app from your app menu, you're in
- **No new password** — your existing login (including SSO and 2FA) works
- **Your profile** — display name, avatar come from Nextcloud automatically
- **Groups = teams** — your Nextcloud groups become team accounts and lists

### For people without a Nextcloud account
Admins can enable **social-only accounts** — people sign up for Aloha Social only, with **no access** to files, chat, calendar, or anything else. Signup can be open, approval-required, or invite-only.

---

## Your data stays where your data already is

Posts live next to your files, calendar, and chat — on **your infrastructure**, in **your database**, backed up by **your rules**.

- **No third parties** — no map service, no GIF service, no analytics, no ad server
- **Photos stripped** — EXIF, GPS, camera data removed before storing (no re-encoding, quality preserved)
- **Keys encrypted** — account keys encrypted with your instance secret; a database dump alone can't impersonate anyone
- **Your rules** — backups, retention, logging, access control follow what you already have

---

## Part of your workspace, not next to it

| In Nextcloud | What Aloha Social does |
|---|---|
| **Files** | Pick photos/videos and post — no re-upload. Replies appear in file comments. |
| **Talk, Text, Deck** | Links to posts unfurl automatically. |
| **Unified search** | Posts appear alongside files and notes. |
| **Notifications** | Uses the Nextcloud bell and mail digest you already have. |
| **Translation** | Uses your organisation's translation provider (labelled as machine). |
| **Audit log** | Moderation actions logged beside every other admin action. |
| **Groups** | A group posts as one account; group membership controls who can post; the group becomes a read list automatically. |

---

## Made for teams & organisations

- **Team accounts** — a Nextcloud group posts as one identity; who wrote what stays internal (team + moderators only)
- **Social-only accounts** — public, members, customers get Aloha Social only, nothing else
- **Serious moderation** — silence, suspend, take down; all in audit log; review queue for spam & first posts; domain blocks clean up retroactively; delivery dashboard
- **Built to scale** — 400,000 posts, home timeline loads in 50 ms; parallel delivery workers; per-account video quotas

---

## Still a real fediverse server

Being inside Nextcloud doesn't make it a walled garden:

- **One account reaches everywhere** — Mastodon, Bluesky, Pixelfed, PeerTube, GoToSocial, Akkoma — follow, reply, quote, boost both ways
- **Bluesky native** — every account is also a Bluesky account (`you.your.cloud`), no bridge, no app password
- **Portable** — import from Mastodon, GoToSocial, Pixelfed, Instagram; export full archive; move account both ways
- **Works today** — web app, native apps for iPhone, Android, Windows, macOS, Linux

---

## Running it

**Requirements:** Nextcloud 34–36, PHP 8.3–8.5. Install from the App Store or build from source. AGPL-3.0 licensed, developed in the open.

- **You run it** → [Installation guide](/install)
- **You use it** → [Get started](/get-started)
- **You want details** → [Admin guide](/docs/admin) • [Architecture](/docs/architecture)