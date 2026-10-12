---
path: /gdpr
title: GDPR / DSGVO compliance
description: The GDPR rights, legal bases and controller duties in one place — how this project's website and software handle personal data under Regulation (EU) 2016/679.
---

# GDPR / DSGVO compliance

The General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR" in English, "DSGVO" in German) governs how personal data may be processed in the EU. This page collects where the obligations fall: what **this website** does, what **the software** does, and what **you** have to do when you operate a server.

For the concrete data processed on this website, read the [privacy policy](/privacy).

---

## Who is accountable for what

| You visit aloha.social | You run your own server | You use someone else's server |
|---|---|---|
| The project is the controller; processing is minimal and described in the [privacy policy](/privacy). | **You are the controller.** The project ships the software; it never sees your data. | That server's operator is the controller; their terms and rules apply. |
| Ask via the [imprint](/imprint). | Fulfil duties with the [admin guide](/docs/admin) and [admin responsibilities](/admin-responsibilities). | Ask them directly — see [find a server](/servers). |

---

## Legal bases (Art. 6 GDPR)

The software needs a legal basis for each processing operation. The common cases:

| Processing | Legal basis | Where it happens |
|---|---|---|
| Storing and delivering posts | Art. 6 (1) (a) — consent of the person who posts, or Art. 6 (1) (f) for public content | Your server |
| Delivering posts to other servers in the network | Art. 6 (1) (f) — the server federation works only if content it accepts is delivered; every post you make is addressed to the world | Your server → other servers |
| Login and account security | Art. 6 (1) (b) — performance of a contract with the account holder | Your server |
| Logs, backups, abuse prevention | Art. 6 (1) (c) / (f) — legal obligation and legitimate interest in a secure service | Your server, its hosting |
| Notifications you switched on | Art. 6 (1) (a) / (b) — depending on the type of notification | Your server |
| Moderation and appeals | Art. 6 (1) (c) / (f) — where the law or legitimate interests require action against abuse | Your server, audit log |
| This website's server logs | Art. 6 (1) (f) — operating a secure website | [Website hosting](/imprint) |

**Special categories (Art. 9)** are not processed by design: do not post health, biometric or similar data about other people.

---

## Your rights in practice (Arts. 15–22)

The controller of the server holding your data must answer these requests. With Aloha Social they are supported by the product itself:

| Right | Article | How it is served |
|---|---|---|
| Access | Art. 15 | Export your data — the full export from the settings |
| Rectification | Art. 16 | Edit your profile and posts yourself |
| Erasure | Art. 17 | Account deletion that also federates deletion where technically possible |
| Restriction | Art. 18 | Suspended accounts are frozen rather than processed |
| Portability | Art. 20 | Export in machine-readable form; move to another server |
| Objection | Art. 21 | For legitimate-interest processing such as federation |
| Withdraw consent | Art. 7 (3) | Revoke notifications and similar at any time |
| Complaint | Art. 77 | To your supervisory authority — no need to ask the controller first |

Requests about **this website** go through the contact channels in the [imprint](/imprint).

---

## Privacy by design (Art. 25)

The software implements data minimisation instead of relying on policy promises:

- **No tracking.** No analytics, no advertising, no third-party services anywhere in the stack.
- **Metadata stripped.** Uploads lose EXIF, GPS and camera data before they are stored; visible timestamps are rounded and photo maps are opt-in.
- **Minimal accounts.** No phone number, no address book upload, birthday or gender fields.
- **Encryption at rest.** Private/public account keys are encrypted with the instance secret; delivery tokens are stored hashed.
- **Hidden engagement.** Like and boost counts are hidden by default.
- **Records of processing.** Moderator actions are written to the audit log, supporting the Art. 30 record.

The security reference: [architecture document](https://github.com/AlohaSocial/social/blob/master/docs/Architecture.md#security). The product summary: [How Aloha protects you](/protect).

---

## Data Processing Agreement (Art. 28)

The project **does not process personal data on behalf of your deployment** — you install the software and run it on your infrastructure. There is no processor relationship between the project and you, so no DPA with the project is needed for the software itself.

Processing by third parties on your side (hosting, mail delivery, push notifications) is your affair: each of those is a processor or a separate controller and needs its own contract or legal basis. Check the [admin guide](/docs/admin) for which services the standard configuration contacts.

---

## Data Protection Officer (Art. 37)

No Data Protection Officer is appointed for this project website; enquiries go through the [imprint](/imprint). Whether *your* deployment needs one is your assessment — it depends on scale and the kind of processing you do. Appointing one is optional once the conditions in Art. 37 are met.

---

## International transfers (Chapter V)

- **This website:** processing happens with the hosting provider described in the [imprint](/imprint); transfers outside the EU/EEA rely on the safeguards of Chapter V.
- **Your server:** federation is international by nature — posts you publish are delivered to servers in other countries, each of which is an independent controller. The legal basis for delivery is your decision to publish publicly (Art. 6 (1) (a) / (f)); the receiving server becomes responsible for its own copy.

---

## Retention

- **This website:** server logs as configured by the host, normally one to seven days ([privacy policy](/privacy)).
- **Your server:** keep only what you need. The [audit log](/docs/admin) and backup windows are configurable; anything else is your retention schedule to write down in your Art. 30 record.

---

## Supervisory authority and contact

- **This website:** complaint right under Art. 77 with the authority responsible for the operator named in the [imprint](/imprint) — for an operator in Aachen, the [LDI Nordrhein-Westfalen](https://www.ldi.nrw.de/).
- **Your server:** the authority of the Member State where your main establishment is — in Germany, that is the state authority where you are based.

---

## Official sources

- [Full text of Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [EDPB guidelines and documents](https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en)

*This page explains the regulation and the software's support for it. It is not legal advice for your specific deployment.*
