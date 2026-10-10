---
path: /directory
title: Aloha Directory
description: Discover servers, find people, and get started with curated starter packs — all from aloha.social.
---

# Aloha Directory

The Aloha Directory at **aloha.social** is a new service that solves the three biggest gaps in getting started with Aloha Social:

1. **Where do I sign up?** — A hand-picked list of servers offering free accounts right now
2. **How do I find people?** — Curated search providers that replace hard-coded third-party sources
3. **What do I follow first?** — Community-proposed starter packs, reviewed for consent

---

## The problem: onboarding without a server

The fediverse asks newcomers to choose a server before they've seen anything. Mastodon has joinmastodon.org. Bluesky has one default host. Aloha had neither — until now.

**Three gaps stopped native apps from helping:**
1. Public APIs said registration was closed (even when it wasn't)
2. No registration API — only a web form
3. Nothing told apps which servers had room

---

## The solution: three signed lists

The Aloha Directory publishes three static, signed JSON lists that apps and servers download:

| List | What it does | Updated |
|------|--------------|---------|
| **Servers** | ~10–50 hand-picked servers with capacity, moderation policy, languages, terms | Every 15 min |
| **Search providers** | Curated Aloha servers offering account, hashtag, full-text, and trend search | Every 15 min |
| **Starter packs** | Curated packs of accounts to follow, proposed by the community | Daily |

Every list is **signed with Ed25519** — clients verify the signature, not the transport. A CDN, mirror, or proxy can carry the lists without being able to change them. The directory is **never in the hot path**: signup, login, search, and follows go straight from app to server or server to server. If aloha.social is offline, apps and servers keep working from their last signed copy (valid for 30 days).

---

## How it works for you

### In the mobile/desktop app (coming soon)

1. **Welcome** — Tap "Create account" or "I already have an account"
2. **About you (optional)** — Language and interests, stays on your device
3. **Suggested server** — The app picks a featured server with open capacity in your language
4. **Live check** — App confirms the server still has room
5. **Rules & terms** — Read and accept before continuing
6. **Account details** — Username, email, password, display name
7. **Confirm** — Email verification or approval wait
8. **Log in** — OAuth, seamless (no re-entering password)
9. **Follow** — See starter packs matching your language and interests
10. **Home** — Your timeline is already populated

The app **chooses the server on your device** — no data about you is sent anywhere. It filters for featured servers with open signup in your language, scores by region and capacity, and picks randomly among the top five so users spread across servers naturally.

### In the web app (today)

- Browse servers at **[/servers](/servers)** or **[/servers/list](/servers/list)**
- Search for people from your account — your server queries curated providers
- Discover starter packs on the Discover page

---

## Server operators: how to get listed

1. Enable "Advertise on aloha.social" in the admin settings
2. Your server proves domain control automatically
3. Fill in the profile: terms, privacy policy, rules, languages, jurisdiction, operator info, moderation details, account offer, search offer
4. Two curators review — automatic checks first (HTTPS, nodeinfo, terms URLs, abuse contact, version), then human review (operator legitimacy, moderation quality, legal compliance, test signup, diversity)
5. If approved: **Listed** — visible in apps, heartbeat monitored hourly
6. **Featured** servers (90 days listed, 98% heartbeat uptime, low approval backlog) can be the default suggestion

Servers send hourly heartbeats with capacity, usage, search features, and health. Zero capacity or failed checks hide you from signup automatically. Curators can pause or delist with public reasons.

---

## Search providers: curated, not hard-coded

Today Aloha searches hard-coded third-party servers (mastodon.social, pixelfed.social, etc.) that never agreed to serve Aloha traffic. The Directory replaces them with **curated Aloha servers** that opt in.

**What a provider offers:**
- Account search (handle, display name, bio, avatar, follower count)
- Hashtag search (tags with 7-day use counts)
- Post search (public posts from opted-in authors)
- Trends (trending tags and links)

**Privacy first:**
- Queries go from *your server* to the provider — the provider never sees your handle, IP, or token
- Requests are signed with your server's directory key
- Providers keep query logs ≤7 days, only for abuse prevention
- Only opted-in content is indexed (`discoverable: true` for accounts, `indexable: true` for posts)

---

## Starter packs: community-proposed, consent-verified

Anyone with an Aloha account can propose a pack. Curators review each proposal, and **every account in it is asked for consent** before publication.

**Consent is opt-in:**
1. Account must be discoverable
2. Account receives a notification (in-app for Aloha, DM from `@directory@aloha.social` for others)
3. Account accepts within 14 days (or has standing "allow me in curated packs" preference)

Accounts that don't answer are left out. Anyone can leave any pack at any time — the next list build drops them within 24 hours.

Packs appear in:
- First-run screen during onboarding
- Discover page on every Aloha server
- Native apps before account creation

---

## Governance & transparency

- **Phase 1:** The project operates aloha.social, holds signing keys, names curators
- **Phase 2:** Handover to a community foundation (charter, funding, own curators)
- Apps trust the **root key**, not the organization — no code changes needed
- **Transparency:** public page with every listed server, state, review dates; quarterly transparency report; signed lists and history on GitHub

---

## For administrators

Your server can:
- **Opt in** to the server list (one switch in admin settings)
- **Become a search provider** (declare capabilities in profile)
- **Use curated search providers** instead of hard-coded defaults (`directory_aloha_list = on` by default)
- **Show curated starter packs** (`starter_packs_curated = on` by default)
- **Override everything** — local settings always win

---

## Learn more

- [Find a server](/servers) — Browse current public listings
- [Get started](/get-started) — Your first account and post
- [How Aloha Social works](/activitypub/native) — The hosting model
- [Administration overview](/admins) — Running a server