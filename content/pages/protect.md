---
path: /protect
title: How Aloha Social protects you
description: The defaults, filters, queues and moderation tools that keep your timeline calm — and the switches that change them.
---

# How Aloha Social protects you

Aloha Social is designed differently. While most social networks optimize for engagement at any cost, Aloha puts your well-being first. Every default is a deliberate choice to reduce stress, addiction, and negative emotions — and to amplify genuine connection.

Research backs this up: a 2023 study in *Computers in Human Behavior* found that hiding like counts significantly reduced social anxiety and improved well-being. A University of Pennsylvania study showed that limiting social media use to 30 minutes daily reduced loneliness and depression. A 2022 *Nature Human Behaviour* study found that batching notifications (instead of instant delivery) reduced stress and improved attention span.

## The defaults that are already on

**No scoreboard.** Like, boost and follower counts are hidden unless you turn them on. The timeline has no engagement-ranked feed — posts arrive newest first, in full.

**Calm notifications.** Every new account starts with the calm policy:

| Who is writing to you | On a new account |
|---|---|
| People you do not follow | Held for review |
| People who do not follow you | Allowed |
| Accounts under 30 days old | Held for review |
| Private mentions you did not ask for | Held for review |
| Accounts this server limited | Held for review |

A held notification is stored and never raised: no bell, no push, no mail, and it does not count towards a digest. The person can still write to you — their message waits in Activities, under a line that says how many people are waiting, until you accept or dismiss it. Accepting puts them on your always-allowed list; nobody is ever told they were held.

**Quiet hours and digests.** Notifications are collected and delivered at the times you choose, so the phone does not light up at three in the morning.

**Photos lose their location.** Exif, XMP, IPTC and GPS data are stripped from every image before it is stored or sent, without re-encoding it.

**No third parties.** No map service, no GIF service, no tracker, no advertising. The 881 built-in emoji are served from your server.

**AI content.** One switch in Settings hides every post that says it was made with AI.

## Filtering, before anything reaches you

**Filtered words** apply to every timeline this app draws. A matching post is folded behind the filter's name or taken out altogether, and a filter can expire on its own. Filters are yours: they are stored on the server, visible to nobody else, and you can have as many as you like with different rules.

**Mute a conversation** from any post in a thread. Notifications for that thread stop entirely — bell, push and mail — and the thread stops appearing in Activities. The posts stay on every timeline, so you can still read what you choose to read. Unmuting restores what arrived meanwhile without ringing for it.

**Hide a whole server.** A per-user domain block takes out everything from one domain, for you, without an administrator being involved.

**Hide somebody's boosts**, or ask to be told when they post — both sit beside the bell on their profile.

**Block and mute.** Blocking severs the relationship in both directions and hides somebody everywhere. Muting hides them from your timelines and optionally your notifications, for an hour, a day, seven days, thirty, or until you lift it — and they are never told.

## Before anybody sees it

Two rules hold a post back on the server side instead of publishing it:

- **First-post review** holds the first post of an account that has published nothing yet. Administrators' own posts are never held. It is off on a server where administrators created the accounts, and on where registration is open.
- **Autospam** holds a post that trips a deliberately short list of rules: more than five links in a short post, or more than five mentions from an account nobody follows and that follows nobody. There is no wordlist and no score — "seven links" is something a moderator can agree or disagree with in a second.

**A direct message is never held.** Holding one would put private correspondence in front of a moderator who was not written to, for a machine's reason.

A held post is stored as the request the client sent, not as a post: it is in no timeline, no profile, no outbox and no search — not even its author's. Their own copy sits in Settings, where they can take it back.

## For moderators

Five actions, in order of weight, all reversible except the last two:

| Action | What it costs |
|---|---|
| **Warn** | Nothing. The account is told there is a problem. |
| **Mark everything sensitive** | Every future post is shown behind a click. |
| **Silence** | The account leaves the public and global timelines. Deliberate followers still see it. |
| **Take down** | One post is deleted, everywhere it reached. |
| **Suspend** | Everything posted here is deleted, follows go both ways, and further sends are refused. |

Every action names the moderator who took it. With Aloha's audit app enabled they land in the audit log beside every other administrative action. The strike history is never rewritten by a lift.

Domain blocks work the same way at the level of a server, and clean up what a blocked server already sent.

The [administration guide](/docs/admin-moderating) documents moderation, and the [safety feature page](/features/safety) shows the controls as a person meets them.

## Under the hood

A page of detail for the technically curious — the [security section of the architecture document](https://github.com/AlohaSocial/social/blob/master/docs/Architecture.md#security) records all of it, with the class and method names:

- every outbound delivery is signed with the sending actor's key, and inbound ones are verified against the request target, host, date and digest, with a replay window
- inbound deliveries are rate-limited twice — once by source address, once by verified origin — and bodies are capped at 1 MiB
- actor private keys are encrypted at rest with the instance secret, so a database dump alone is not enough to impersonate anybody
- client secrets, authorization codes and access tokens are stored hashed
- outbound requests refuse private, loopback and otherwise reserved addresses, and re-check on every redirect
- JSON-LD contexts are served from the copies shipped with the app, never fetched for signature work
- an attachment from another server cannot overwrite a document this server owns

## Where to go next

- [The safety feature page](/features/safety) — the same controls as you meet them in the app
- [Who may reach you](/docs/notify-behaviour) — the notification policy in detail
- [Privacy policy](/privacy) — what is stored, what leaves the server, and why
- [GDPR / DSGVO compliance](/gdpr) — your rights and the software's data minimisation
- [Rules for using Aloha Social](/rules) — what is expected of people here
- [Well-being in Aloha](/wellbeing) — the research and design behind these choices