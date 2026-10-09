---
path: /admin-responsibilities
title: Admin Responsibilities
description: What it means to run an Aloha Social server — ethical duties, legal obligations, and practical guidance for administrators.
---

# Admin Responsibilities

Running an Aloha Social server means more than installing an app. You are operating a piece of the open social web — a server that connects people across the fediverse, stores their conversations, and shapes their online experience. This page outlines what that responsibility entails.

---

## 1. You Are a Host, Not a Landlord

Your server is **your users' home** on the fediverse. Treat it that way.

- **No ads, no tracking, no profiling** — not even for "analytics"
- **No selling data** — ever, in any form
- **No algorithmic manipulation** of what people see
- **Users own their posts** — they can export, move, or delete them anytime

If you would not want it done to your own conversations, do not do it to theirs.

---

## 2. Moderation Is Not Optional

A server without moderation is not a community — it is a liability.

### Minimum viable moderation
- **Clear, published rules** before anyone signs up
- **A way to report** posts and accounts (built into the app)
- **Timely response** — hours, not days or weeks
- **Transparent actions** — every warn/silence/suspend is logged with the moderator's name

### The five actions, in order
1. **Warn** — tell them there's a problem
2. **Mark sensitive** — future posts hidden behind a click
3. **Silence** — posts leave public timelines, followers still see them
4. **Take down** — delete one post everywhere it reached
5. **Suspend** — delete everything, sever follows, block future posts

**Document every action.** Aloha Social's audit log records it automatically — do not disable it.

---

## 3. Federation Comes With Duties

Your server talks to thousands of others. That makes you part of a shared infrastructure.

### What you must do
- **Keep software updated** — security patches within days, not months
- **Monitor delivery health** — the admin dashboard shows federation lag and failures
- **Respect blocks** — if another server blocks you, your posts stop arriving there
- **Forward reports** — reports about remote accounts go to their server, without exposing the reporter

### What you must not do
- **Harvest remote content** for training, advertising, or analytics
- **Rewrite or strip** ActivityPub signatures
- **Run a "scraper" instance** that only consumes without contributing

---

## 4. Privacy Is a Default, Not a Feature

Aloha Social strips metadata from photos, encrypts keys at rest, and sends nothing to third parties. Your job is to not break that.

- **No third-party services** — no Google Fonts, no CDN for avatars, no external analytics
- **No logging of content** — access logs yes, post contents no
- **Backups are your responsibility** — encrypted, access-controlled, tested
- **Legal requests** — have a process, require a warrant, notify the user if legally permitted

---

## 5. Registration: Open, Approved, or Invited?

Choose deliberately.

| Mode | Best for | Responsibility |
|------|----------|----------------|
| **Open** | Public communities | High spam/moderation load; need automated defenses |
| **Approval** | Organisations, clubs | Manual review of every signup |
| **Invitation** | Teams, private groups | You control who gets in |

**Social-only accounts** let people join for the social network only — no files, chat, or calendar access. Use them for public communities.

---

## 6. Legal & Compliance

You are the **data controller** for your server's data.

### At minimum
- **Privacy policy** published and linked from signup
- **Terms of service** that users accept on registration
- **Abuse contact** (`abuse@your.domain`) that reaches a human
- **GDPR/DSGVO readiness** — export, delete, portability work out of the box

### Recommended
- **Jurisdiction disclosure** — where is the server physically?
- **Data processing agreement** if you process for others
- **Incident response plan** — what happens if you're breached?

---

## 7. Sustainability

A server that disappears breaks trust across the fediverse.

- **Plan for continuity** — document admin access, share credentials securely
- **Budget for hosting** — don't run on a personal credit card
- **Announce changes** — migrations, shutdowns, policy updates with 30+ days notice
- **Successor plan** — who takes over if you can't?

---

## 8. The Ethical Baseline

If you do nothing else, do these:

1. **Publish your rules** before the first signup
2. **Respond to reports** within 24 hours
3. **Update weekly** — security patches are not optional
4. **Backup daily** — test restores quarterly
5. **No surprises** — no secret logging, no hidden tracking, no data sales

---

## Quick Reference: Admin Checklist

| Daily | Weekly | Monthly | Quarterly |
|-------|--------|---------|-----------|
| Check moderation queue | Apply security updates | Review federation health | Test backup restore |
| Scan abuse@ email | Review new signups | Audit admin actions | Review policies |
| Monitor disk space | Check error logs | Verify SSL certs | Update disaster plan |

---

## Further Reading

- [Installation guide](/install) — getting to a federating server
- [Administration guide](/docs/admin) — moderation, config, scale
- [Configuration reference](/docs/configuration) — every setting explained
- [How Aloha protects you](/protect) — the user-facing safety features
- [Privacy at a glance](/privacy) — what is stored, what leaves, what is stripped