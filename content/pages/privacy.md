---
path: /privacy
title: Privacy in Aloha Social
description: What Aloha Social collects, where it is stored, what leaves your server, and the switches that change that.
---

# Privacy in Aloha Social

Aloha Social has no advertising and no tracking, and nothing about your reading is measured on anybody's behalf. This page is the full account: what is stored, where it is stored, what leaves the server, and which settings change the answers.

Your server's operator is the data controller. Where Aloha Social runs on your organisation's Aloha, that is your organisation — not the Aloha Social project, and not a company behind it.

## What is stored, and where

Everything below sits in your Aloha's database and storage, on infrastructure your organisation runs and backs up.

| Data | Where it lives | Leaves the server |
|---|---|---|
| Your posts, replies and media | Aloha database and data directory | Yes — to the servers of people who follow you, as ActivityPub |
| Your profile, avatar and banner | Aloha database | Yes — served to anyone who asks, publicly |
| Who you follow, who follows you | Aloha database | Yes — the follower list is public, as on every federated service |
| Private notes you write about accounts | Aloha database | Never |
| Your For You interests | Aloha database | Never |
| Private statistics and read counts | Aloha database | Never |
| Account keys | Aloha database, encrypted with the instance secret | Never |
| Filters, mutes, blocks, notification policy | Aloha database | Never |

## What leaves the server, and why

Federation is the point of the product, so posts do travel. They travel the same way they do on Mastodon:

- **A public post** is delivered to the servers of your followers, and is readable by anyone who asks your server for it.
- **A followers-only post** is delivered only to followers, and requires a signed fetch to read.
- **A direct post** is delivered only to the people it is addressed to.
- **Nothing is sent to a third party.** There is no map service, no GIF service, no analytics endpoint and no ad server. Link previews are fetched by your server and are not federated.

Delivery is signed with your server's keys and rate-limited. What a remote server receives is the same object your own followers receive — not a profile of you.

## What is stripped before anything is sent

- **Photos lose their hidden data.** Exif, XMP, IPTC and the GPS coordinates a phone quietly attaches are removed before a photo is stored or sent. The image is not re-encoded, so it keeps its quality and its colour profile.
- **HTML is sanitised on both ends.** Remote HTML is stripped server-side before it reaches a timeline, and again in the browser before it is rendered.
- **The 881 built-in animated emoji** are served from your own server. Nothing is loaded from Giphy or Tenor.
- **Places on posts are named by people**, not looked up in a geolocation service. Nothing is ever sent to a map provider to work a location out.

## Your For You feed stays yours

The optional For You feed learns only from what you may already read: a signal names a post by id and nothing else, and the hashtags behind it are read through the same visibility, block and mute filters the timelines use. No raw signal is kept, nothing is federated, and every route involved is your own.

The interests it produces are shown back to you as a word cloud you can drag, pin, remove and add to — and to nobody else. An administrator can switch the feed off, or make it opt-in for the whole server.

## What is hidden by default

- **Counts.** Likes, boosts and follower counts are not shown unless you turn them on.
- **Read counts.** Your statistics are visible to you and to nobody else.
- **Who wrote a team post.** For a team account, the individual author is recorded for the team and for moderators, and shown to nobody else.
- **Reports.** A report about somebody on another server is forwarded without exposing who reported them.

## Two switches worth knowing about

**Who may reach you** (Settings → Notifications). Five questions, each answered *Allow* or *Hold for review*: people you do not follow, people who do not follow you, accounts under 30 days old, private mentions you did not ask for, and accounts this server has limited. A held notification is stored but never rings — no bell, no push, no mail. Held people can still write to you; their posts wait in Activities until you look.

**AI content** (Settings). One switch hides every post that says it was made with AI.

## Leaving

You are not locked in:

- A full export contains every post, picture and video, in Mastodon's archive layout.
- An account move is supported in both directions, and tells the people who follow you where you went.
- Past posts can be imported from Mastodon, GoToSocial, Pixelfed and Instagram's own export — imported posts do not flood anybody's timeline.

## For administrators

Two things an operator decides that change this page for everybody on the server:

- **Registration** can be open, approval-based or invitation-only, and social-only accounts can be created for people who must get no access to files, chat or anything else.
- **Retention, domain blocks and review queues** are operator settings. Domain blocks also clean up what a blocked server already sent.

The [administration guide](/docs/admin) covers each of these, and the [security section of the architecture document](/docs/architecture-security) records exactly what is enforced in code.

## Questions

This page summarises the product. The detail lives in the documentation — the [user guide](/docs/user), the [notification policy](/docs/notify-why), and the [architecture document](/docs/architecture). Every one of those pages links back to its source in the repository, where the claims can be checked against the code.
