---
path: /privacy
title: Privacy Policy
description: What this website logs, what it never collects, how long anything is kept, and the rights you have under the GDPR — plus what changes when you run the software yourself.
---

# Privacy Policy

**No ads. No analytics. No profiling.** This page is the full policy for aloha.social: what is processed, on what legal basis, for how long, and how to reach us. The app's data handling is described in [How Aloha protects you](/protect).

*Effective 12 October 2026.*

---

## Who is responsible

The **controller** for this website is the operator named in the [imprint](/imprint) — the Aloha Social project, acting on behalf of the community.

- **Contact:** through the project's public issue tracker at [github.com/AlohaSocial/website/issues](https://github.com/AlohaSocial/website/issues), or the contact details published in the [imprint](/imprint).
- **Scope:** this policy covers **aloha.social**, the project's own website. It does not cover servers that run the Aloha Social software — on those, the operator of that server is the controller, and this site is not involved.

---

## What this website processes

aloha.social is a **statically generated website**. There are no accounts, no forms, no comment fields and no databases of visitors.

| What | Examples | Why | Legal basis |
|---|---|---|---|
| Server logs | IP address, time, requested URL, referrer, user agent | Delivering the page, preventing abuse, fixing errors | Art. 6 (1) (f) GDPR — legitimate interest in a working, secure website |
| Your theme choice | `theme` in your browser's local storage (`light` or `dark`) | Remembering your display preference | Art. 6 (1) (a) in conjunction with Art. 25 (2) GDPR — storage of information on your device is limited to what is strictly necessary, so no consent is required |
| Nothing else | — | — | — |

**What is never collected:** no analytics, no advertising identifiers, no profiling, no fingerprints, no social media embeds, no third-party fonts, no external content delivery networks. Fonts and images are served from this domain; every claim on this site is verifiable in the [source code](https://github.com/AlohaSocial/website).

---

## Cookies and local storage

This website sets **no cookies**. The single item stored on your device is the theme preference in local storage, which is technically necessary and not a cookie. The full breakdown, including how to delete it, is on the [cookie policy](/cookies) page.

---

## How long data is kept

- **Server logs** are kept only as long as the hosting configuration requires — normally between one and seven days, and deleted automatically thereafter.
- **The theme preference** stays in your browser until you clear site data for this domain; it is never transmitted anywhere.

---

## Who receives data

- **The hosting provider** processes the server logs on our behalf as a processor under Art. 28 GDPR, solely to operate the site.
- **No other recipients.** No advertising networks, no analytics providers, no social networks, no trackers.
- **Transfers outside the EU/EEA:** where the site is hosted outside the EU/EEA, transfers rely on the safeguards of Chapter V GDPR (adequacy decision or standard contractual clauses). No personal data from this website is knowingly transferred for analytics or advertising purposes.

---

## Your rights

You have the following rights against the controller, free of charge:

| Right | Article | What it means |
|---|---|---|
| Access | Art. 15 | A copy of the data processed about you |
| Rectification | Art. 16 | Correction of wrong data |
| Erasure | Art. 17 | Deletion, where no legal retention applies |
| Restriction | Art. 18 | Processing limited while a dispute is resolved |
| Portability | Art. 20 | Data you provided, in a machine-readable format |
| Objection | Art. 21 | Objection to processing based on legitimate interests |
| Withdraw consent | Art. 7 (3) | Withdraw a consent at any time, with effect for the future |
| Complaint | Art. 77 | Appeal to a supervisory authority |

Because this website processes so little, most of these requests concern your browser rather than our records: clearing site data for aloha.social removes everything stored for it.

**Automated decision-making and profiling:** none. Nothing on this website evaluates you, scores you or decides anything about you.

**Supervisory authority:** you may complain to the authority responsible for the controller named in the [imprint](/imprint). For an operator in Aachen that is the [Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen](https://www.ldi.nrw.de/).

---

## If you run Aloha Social yourself

On a server running Aloha Social, **you are the controller** and this website has no access to that data at all. The software is built so that your deployment can meet the same requirements:

- **Data minimisation by design** — the app includes no advertising or third-party analytics code; federation and configured integrations send protocol data to remote services. Photos lose their EXIF, GPS and camera metadata before they are stored.
- **Security** — account keys are encrypted at rest with the instance secret, delivery is signed, tokens are stored hashed (see the [architecture document](https://github.com/AlohaSocial/social/blob/master/docs/Architecture.md#security)).
- **Erasure and portability** — full export, account moves, deletion that federates.
- **Records of moderation** — every moderator action is written to the audit log.

The operational duties are described in [Admin responsibilities](/admin-responsibilities), the settings in the [administration guide](/docs/admin), and the overview of how the software protects people in [How Aloha protects you](/protect). The [GDPR page](/gdpr) collects the legal bases and rights in one place.

---

## Updates

This policy is updated when the website or the law changes. The current version is always this page; the effective date is at the top. Material changes are announced in the project's channels.

Every claim above can be checked against the [source code](https://github.com/AlohaSocial/website) — there is no hidden tracking to find.
