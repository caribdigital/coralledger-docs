---
sidebar_position: 2
title: Two-Factor Authentication
description: Set up and manage 2FA for your CoralLedger Comply account — recommended for all users, enforced for PlatformAdmin
---

# Two-Factor Authentication (2FA)

Two-factor authentication adds an extra layer of security to your account by requiring a verification code from your phone in addition to your password.

## When 2FA is required vs recommended

Comply applies 2FA differently depending on role:

| User type | 2FA status |
|---|---|
| **PlatformAdmin** (Ops Portal access) | **Enforced** — every session must complete the 2FA challenge or it is rejected with `403 Forbidden` |
| **Admin / Administrator** | **Recommended** — a dismissable banner is shown on the dashboard prompting setup; access is not blocked |
| **All other users** (Owner, Accountant, individual business users) | **Recommended** — no banner is shown, but the option is always available in account settings |

The strong recommendation is that every user enables 2FA — Comply stores and processes sensitive financial data including VAT returns, transaction records, and business information. But day-to-day app access is not gated on a 2FA challenge for ordinary users today.

### 2FA for the Ops Portal (PlatformAdmin)

The Ops Portal is the platform-administration interface used by **PlatformAdmin** operators. Because PlatformAdmins have platform-wide privileges — including the ability to manage all businesses and trigger emergency controls — 2FA is an **enforced prerequisite** for every Ops Portal session.

Access is controlled by the `RequirePlatformAdmin` policy, which validates both the `PlatformAdmin` role **and** a completed 2FA challenge before granting entry. If either check fails — including when a PlatformAdmin has not completed 2FA for their current session — the request is rejected with `403 Forbidden`.

:::warning
PlatformAdmin accounts without 2FA configured cannot access the Ops Portal. If you need to set up or reset 2FA for a PlatformAdmin account, contact your security team or raise a request through your organisation's IT helpdesk.
:::

## Setting Up 2FA

### How to enable

Navigate to `/Account/TwoFactorSetup` (or open your profile menu and choose **Two-Factor Authentication**). The setup page walks you through:

1. Download an authenticator app on your phone — see Supported Authenticator Apps below.
2. Scan the QR code shown on screen with the app, or enter the manual secret key if you cannot scan.
3. Enter the 6-digit verification code that the authenticator app generates to confirm pairing.
4. Save your backup codes (see Backup Codes below) in a secure location before continuing.

After setup, the next time you log in you will be asked for a 6-digit code in addition to your password.

### Supported Authenticator Apps

Comply supports **TOTP** (Time-based One-Time Passwords) only. Any TOTP-compatible authenticator app works. Apps Comply explicitly tests against:

- **Google Authenticator** (Android / iOS)
- **Microsoft Authenticator** (Android / iOS)
- **Authy** (Android / iOS / Desktop)
- **1Password** (Android / iOS / Desktop)

SMS-based or hardware-token 2FA is not supported.

## Logging In with 2FA

If you have 2FA enabled:

1. Enter your email and password as usual
2. When prompted, open your authenticator app
3. Enter the current 6-digit code
4. Click **Verify**

:::tip
Codes refresh every 30 seconds. If your code is about to expire, wait for the next one.
:::

## Backup Codes

During 2FA setup, Comply generates **10 single-use backup codes** in the format `XXXX-XXXX`. These are for emergency access if you lose your phone.

**Important:**

- Each backup code can only be used once
- Store them securely (password manager, printed copy in a safe)
- The setup page offers a one-click download of the codes as a text file — save it somewhere you can find later
- If you run out of backup codes, you can regenerate a fresh set from the 2FA settings (this invalidates the prior set)
- If you lose access to all backup codes AND your authenticator, contact support

## Managing 2FA

### Resetting 2FA

To switch authenticator apps (e.g. moving from Google Authenticator to 1Password):

1. Go to **Account Settings** → **Two-Factor Authentication**
2. Choose **Reset 2FA**
3. Re-enter your password to confirm
4. Step through the setup flow again with the new authenticator

### Disabling 2FA

You can disable 2FA from the same settings panel. Doing so requires re-entering your password. The backup codes are invalidated when you disable.

### Lost Access

If you've lost both your phone and your backup codes:

1. Contact hello@digitalcarib.com
2. You'll need to verify your identity through an out-of-band channel
3. An administrator can reset your 2FA

## Next Steps

- [Account settings](/docs/settings/account) — manage your profile, password, and 2FA configuration
- [Security overview](/docs/security/) — broader security posture (IP blocking, fraud alerts, role-based access)
