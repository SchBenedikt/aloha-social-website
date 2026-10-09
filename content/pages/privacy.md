---
path: /privacy
title: Privacy at a Glance
description: What Aloha Social stores, what leaves your server, what is stripped from photos — and the two settings that change it.
---

# Privacy at a Glance

**No ads. No tracking. No profiling.** Your data stays on your server.

---

## The Short Version

| What | Stored on your server | Leaves your server? |
|------|----------------------|---------------------|
| Your posts & media | Yes | Only to servers of people who follow you |
| Your profile & avatar | Yes | Publicly visible |
| Who you follow | Yes | Public (like all federated services) |
| Your private notes | Yes | **Never** |
| Your filters, mutes, blocks | Yes | **Never** |
| Account encryption keys | Yes (encrypted) | **Never** |
| "For You" feed interests | Yes | **Never** |

---

## What Leaves & Why

**Federation is the point** — your posts travel to the servers of people who follow you, just like email. That's the whole idea.

- **Public posts** → delivered to followers' servers, readable by anyone
- **Followers-only** → delivered only to your followers
- **Direct messages** → delivered only to recipients
- **Nothing to third parties** — no Google, no Meta, no analytics, no ad networks

Your server signs every delivery. Remote servers get the same post your followers get — not a profile of you.

---

## What Gets Stripped Before Anything Sends

- **Photos lose metadata** — EXIF, GPS location, camera info removed *before* storing (quality preserved, no re-encoding)
- **No map lookups** — places are named by people, not geolocation services
- **No Giphy/Tenor** — 881 animated emoji served from your own server
- **HTML sanitized** — remote content cleaned server-side and in browser

---

## Two Settings Worth Knowing

### 1. Who May Reach You
**Settings → Notifications** — Five choices, each: *Allow* or *Hold for review*:
- People you don't follow
- People who don't follow you  
- Accounts under 30 days old
- Private mentions you didn't ask for
- Accounts your server has limited

**Held = silent.** No bell, no push, no email. Messages wait in Activities until you choose to look.

### 2. AI Content
**Settings** — One switch hides every post that declares itself AI-generated.

---

## What's Hidden by Default

- **Counts** — Likes, boosts, followers hidden unless you turn them on
- **Your stats** — Visible only to you
- **Team post authors** — Individual author shown to team/moderators only
- **Reports** — Forwarded to remote servers without exposing who reported

---

## You Can Leave Anytime

- **Full export** — All posts, photos, videos in standard format
- **Account move** — Tells followers where you went, works both ways
- **Import from elsewhere** — Mastodon, Pixelfed, GoToSocial, Instagram

---

## For Server Operators

You decide:
- **Registration** — open, approval, invitation, or social-only accounts
- **Retention** — how long data stays
- **Domain blocks** — also cleans up what blocked servers already sent

See [Admin Responsibilities](/admin-responsibilities) and [Administration Guide](/docs/admin).

---

## Questions?

This is the summary. The detail is in:
- [User Guide](/docs/user) — your settings, filters, account
- [How Aloha Protects You](/protect) — safety features
- [Admin Responsibilities](/admin-responsibilities) — ethical duties

Every claim above can be verified in the [source code](https://github.com/AlohaSocial/social).