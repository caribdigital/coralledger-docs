---
sidebar_position: 2
title: Two-Factor Authentication
description: Set up and manage 2FA for your CoralLedger Comply account
---

# Two-Factor Authentication (2FA)

Two-factor authentication adds an extra layer of security by requiring a verification code from your phone in addition to your password.

## Why 2FA is Required

CoralLedger Comply handles sensitive financial data including VAT returns, transaction records, and business information. 2FA is mandatory for all users to protect this data.

### 2FA for the Ops Portal (PlatformAdmin)

The Ops Portal is the platform-administration interface used by **PlatformAdmin** operators. Because PlatformAdmins have platform-wide privileges — including the ability to manage all businesses and trigger emergency controls — 2FA is an **enforced prerequisite** for every Ops Portal session.

Access is controlled by the `RequirePlatformAdmin` policy, which validates both the `PlatformAdmin` role **and** a completed 2FA challenge before granting entry. A PlatformAdmin who has not completed 2FA for their current session will be redirected to the 2FA prompt even if their role is correctly assigned.

:::warning
PlatformAdmin accounts without 2FA configured cannot access the Ops Portal. If you need to set up or reset 2FA for a PlatformAdmin account, contact your security team or raise a request through your organisation's IT helpdesk.
:::

## Setting Up 2FA

### First-Time Setup

When you first log in, you'll be prompted to set up 2FA:

1. Download an authenticator app on your phone
2. Scan the QR code displayed on screen
3. Enter the 6-digit verification code from your app
4. Save your backup codes in a secure location

### Supported Authenticator Apps

- **Google Authenticator** (Android / iOS)
- **Microsoft Authenticator** (Android / iOS)
- **Authy** (Android / iOS / Desktop)
- **1Password** (Android / iOS / Desktop)

Any TOTP-compatible authenticator app will work.

## Logging In with 2FA

1. Enter your email and password as usual
2. When prompted, open your authenticator app
3. Enter the current 6-digit code
4. Click **Verify**

:::tip
Codes refresh every 30 seconds. If your code is about to expire, wait for the next one.
:::

## Backup Codes

During 2FA setup, you receive a set of one-time backup codes. These are for emergency access if you lose your phone.

**Important:**
- Each backup code can only be used once
- Store them securely (password manager, printed copy in a safe)
- If you run out of backup codes, contact support

## Managing 2FA

### Resetting 2FA
If you need to switch authenticator apps:
1. Go to **Settings > Account**
2. Find the **Security** section
3. Follow the prompts to reset and reconfigure 2FA

### Lost Access
If you've lost both your phone and backup codes:
1. Contact support@coralledger.com
2. You'll need to verify your identity
3. An administrator can reset your 2FA

## Next Steps

- [Review login history](/docs/settings/account)
- [Manage security settings](/docs/security)
