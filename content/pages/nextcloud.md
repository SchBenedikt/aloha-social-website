---
path: /nextcloud
title: Built into your workspace
description: How Aloha Social uses your existing workspace for accounts, files, notifications and administration.
---

# Built into your workspace

Aloha Social is an **app inside your workspace** — using its accounts and services rather than requiring a separate social server to operate.

---

## One account, already yours

Your Nextcloud account **is** your Aloha Social account.

- **No new signup** — open the app from your app menu, you're in
- **No new password** — your existing login (including SSO and 2FA) works
- **Your profile** — display name, avatar come from Aloha automatically
- **Groups = teams** — your Aloha groups become team accounts and lists

### For people without a Nextcloud account
Admins can enable **social-only accounts** — people sign up for Aloha Social only, with **no access** to files, chat, calendar, or anything else. Signup can be open, approval-required, or invite-only.

---

## Your data stays where your data already is

Posts live next to your files, calendar, and chat — on **your infrastructure**, in **your database**, backed up by **your rules**.

- **No advertising or third-party tracking code in the app** — no map or GIF service is needed; optional integrations such as Bluesky use their configured remote services
- **Photos stripped** — EXIF, GPS, camera data removed before storing (no re-encoding, quality preserved)
- **Keys encrypted** — account keys encrypted with your instance secret; a database dump alone can't impersonate anyone
- **Your rules** — backups, retention, logging, access control follow what you already have

---

## Part of your workspace, not next to it

| In the workspace | What Aloha Social does |
|---|---|
| **Files** | Pick photos/videos and post — no re-upload. Replies appear in file comments. |
| **Talk, Text, Deck** | Links to posts unfurl automatically. |
| **Unified search** | Posts appear alongside files and notes. |
| **Notifications** | Uses the in-app bell and mail digest you already have. |
| **Translation** | Uses your organisation's translation provider (labelled as machine). |
| **Audit log** | Moderation actions logged beside every other admin action. |
| **Groups** | A group posts as one account; group membership controls who can post; the group becomes a read list automatically. |

---

## Made for teams & organisations

- **Team accounts** — an Aloha group posts as one identity; who wrote what stays internal (team + moderators only)
- **Social-only accounts** — public, members, customers get Aloha Social only, nothing else
- **Serious moderation** — silence, suspend, take down; all in audit log; review queue for spam & first posts; domain blocks clean up retroactively; delivery dashboard
- **Performance is measured** — nightly synthetic benchmarks cover 100,000-post datasets on MySQL and PostgreSQL; results include test conditions and are not production latency guarantees

---

## Still a real fediverse server

Being inside Aloha doesn't make it a walled garden:

- **One ActivityPub identity reaches the Fediverse** — exchange supported activity with Mastodon, Pixelfed, PeerTube, GoToSocial, Akkoma and other compatible servers; exact behavior depends on each peer
- **Optional native AT Protocol hosting** — an administrator can enable Bluesky-compatible identities and services alongside ActivityPub; it requires public endpoints and external PLC, relay and AppView services
- **Portable** — import supported follows and posts, export an archive and move accounts where both servers support migration; imported posts are copies
- **Works everywhere** — the web app in any browser, plus the native apps for Android and every Apple platform

---

## Running it

**Requirements:** Aloha 34–36, PHP 8.3–8.5. Install from the App Store or build from source. AGPL-3.0 licensed, developed in the open.

- **You run it** → [Installation guide](/install)
- **You use it** → [Get started](/get-started)
- **You want details** → [Admin guide](/docs/admin) • [Architecture](https://github.com/AlohaSocial/social/blob/master/docs/Architecture.md)
