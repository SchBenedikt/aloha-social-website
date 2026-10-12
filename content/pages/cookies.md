---
path: /cookies
title: Cookie Policy
description: Exactly what aloha.social stores in your browser (spoiler: one theme preference), which categories are switched off entirely, and how to withdraw at any time.
---

# Cookie Policy

**This website sets no cookies.** There is no consent banner on aloha.social because there is nothing to consent to. This page is the full accounting of what is — and is not — stored on your device, and how to remove it.

*Effective 12 October 2026.*

---

## What is stored on your device

| Category | Technology | What it does | Consent |
|---|---|---|---|
| **Strictly necessary** | `localStorage`, key `theme` | Remembers whether you chose light or dark mode. Stays on your device, is never sent anywhere. | Exempt (Art. 5 (3) ePrivacy Directive — storage of information is strictly necessary for a service explicitly requested by the user) |
| **Preferences** | — | Nothing beyond the theme. | — |
| **Statistics / analytics** | — | No analytics of any kind — no counts, no heatmaps, no A/B tests. | — |
| **Advertising** | — | No ads, no advertising cookies, no cross-site identifiers. | — |
| **Third parties** | — | No social embeds, no video embeds, no external fonts or content delivery networks. Everything is served from this domain. | — |

A check of the [source code](https://github.com/AlohaSocial/website) is the proof: there is no cookie library, no analytics script and no tracking pixel in the repository.

---

## Why there is no consent banner

Under Art. 5 (3) of the ePrivacy Directive, storing or reading information on a user's device requires consent **unless** the storage is strictly necessary for a service the user explicitly requested. The theme preference qualifies: it exists only because you clicked the toggle, and it does nothing else.

A consent banner for a single theme flag would create a UI that processes more data (your consent choice) than the thing it is meant to protect. The honest version is this page: here is everything, here is how to remove it.

---

## How to withdraw

Withdrawal for strictly necessary storage means removing it — you can do that at any time, in one of three ways:

1. **In the browser's site settings:** open the padlock icon next to the address bar → "Site settings" → clear data / cookies for `aloha.social`. Your theme resets to the default.
2. **In the developer console:**

   ```js
   localStorage.removeItem("theme");
   ```

   then reload the page.
3. **Everything at once:** clear the browser's history for `aloha.social` — cookies, local storage and cache are removed together.

There is no account, no server-side record and no cookie identifier, so removing it is complete: nothing remains on our side, because nothing about you was ever stored on our side.

---

## Cookies on other Aloha Social servers

This page describes **aloha.social** only. Servers running the Aloha Social software are operated by their operators and may make their own choices; the project's software ships no tracking or advertising code. When you use such a server, its operator's privacy policy and rules apply — see the [server directory](/servers).

The project website's own data handling is described in the [privacy policy](/privacy); your rights under the GDPR are collected on the [GDPR page](/gdpr).

---

## Changes

If this site ever adds a technology that requires consent, this page will list it **before** it ships, and a consent mechanism with a withdrawal path will be added. The effective date above changes with every update.
