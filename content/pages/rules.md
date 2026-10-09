---
path: /rules
title: Rules for using Aloha Social
description: What is expected of people here, what is not tolerated, and how moderation works on a server running the app.
---

# Rules for using Aloha Social

Aloha Social runs on many servers, and each server sets its own rules for the people it hosts. This page is the baseline: what the app assumes, what it is built to prevent, and what you can expect from the people who run your server.

Your server's own rules take precedence. Before you post somewhere new, read the rules that server publishes — the [find a server](/servers) page links to them.

## The baseline

**Be a person, not a campaign.** Spam, coordinated inauthentic behaviour and undisclosed automation are the fastest way to lose an account. The server holds a first post for review where registration is open, and holds posts that look like link or mention floods.

**Do not harass people.** Targeted abuse, dogpiling, unwanted sexual attention and publishing private information are reportable everywhere in the fediverse. Blocks, mutes and filters exist so people can protect themselves first and report second.

**Do not post illegal content.** Content that is illegal where the server operates is removed, and the server's operator may be obliged to act on it.

**Respect the audience people chose.** A followers-only or direct post is addressed to a particular audience. Screenshotting it into public is a betrayal of that choice, even where the software cannot prevent it.

**Label what needs labelling.** Use content warnings for spoilers and difficult material, alt text for pictures, and the AI label when a post says it was made with AI. The composer asks; the answer is never blocked, but the nudge is deliberate.

**Nothing here is anonymous.** Your posts carry your handle and your server. Reports about accounts on other servers are forwarded without exposing who reported them, but the server operator can see what is posted from their server.

## What the software does about it

The app is built so that the rules above are cheap to enforce:

- **Warnings, sensitive marking, silencing, take-downs and suspensions** — five actions in order of weight, each recorded against the moderator who took it, four of them reversible.
- **A review queue** for a first post and for posts that trip the spam rules. A direct message is never held.
- **Domain blocks** that also clean up what a blocked server already sent.
- **Reports** arrive from two directions — a local person reporting through a client, and a peer server reporting on behalf of one of its own users — and land in the same queue for the administrators and the delegated group.
- **Everything lands in Nextcloud's audit log** where the audit app is enabled, next to every other administrative action.

See [How Aloha Social protects you](/protect) for the full list, and the [moderating chapter](/docs/admin-moderating) for the exact behaviour.

## What you can do for yourself

- **Filtered words** fold or hide matching posts in every timeline, and can expire on their own.
- **Who may reach you** holds messages from strangers, new accounts and unsolicited private mentions in a review queue instead of ringing the bell.
- **Mute a conversation** without leaving it; **hide a whole server** without asking an administrator.
- **Block** severs a relationship in both directions and hides somebody everywhere, and they are never told.
- **Report** a post or an account. Reports about remote accounts are relayed without exposing you.

## Reporting

The report button on a post or a profile sends it to the moderators of your server. Say what the problem is; a sentence is enough. Where the account belongs to another server, your server forwards the report and keeps your identity off it.

Moderators cannot act on what they cannot see — if a post breaks the rules of *their* server but not yours, the useful report goes to them. The [find a server](/servers) pages link to each server's own rules and contact.

## For people running a server

Registration can be open, approval-based or invitation-only. Social-only accounts exist so that members of the public can sign up for Aloha Social alone, with no access to files, chat or anything else. Spam rules and first-post review are per-server switches, and the moderation settings are in the administration page.

The [administration guide](/docs/admin) covers all of it, and [the installation guide](/install) covers getting a server to the point where these rules matter.

## Changing these rules

This page describes the baseline the software is built around. Your server's operator may publish stricter rules and does not need permission to do so. If you run a server, publish your rules where people can find them before they sign up — the [find a server](/servers) listing gives you a place for them.
