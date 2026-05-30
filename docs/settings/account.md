---
sidebar_position: 2
title: Account Settings
description: Manage your profile, password, two-factor authentication, and notification preferences
---

# Account Settings

Manage your personal account settings, security options, and preferences. Account-level settings are distinct from **business settings** (the per-business configuration on Settings > Business); this page covers what's tied to your individual user account.

## Profile information

Update your basic profile from the Profile Settings page:

- **Full Name** — your display name (combination of First Name + Last Name as captured at registration)
- **Email Address** — the verified email used to sign in
- **Phone Number** — for account recovery (optional)
- **Profile Picture** — optional; surfaces in the top navigation, team-member lists, and activity logs

Changes to your name and profile picture are visible immediately to anyone who shares a business with you.

## Change your password

The Change Password page lives at `/account/change-password` (or `/change-password`).

1. Enter your **current password**
2. Enter and confirm your **new password**
3. Click **Update Password**

**Password requirements** (same policy as registration):

- **Minimum 15 characters**
- At least one **uppercase** letter
- At least one **lowercase** letter
- At least one **number**
- At least one **special character**

If your administrator has flagged your account for required password rotation, the Change Password page surfaces a warning alert prompting you to update before continuing.

## Two-Factor Authentication

CoralLedger Comply supports TOTP-based 2FA via standard authenticator apps. Setup, recovery, and the backup-code spec are documented separately at [Two-Factor Authentication](/docs/security/two-factor-auth) — that page covers when 2FA is enforced (PlatformAdmin only), when it's recommended (everyone else), and how to set it up.

## Notification preferences

Configure how and when CoralLedger Comply contacts you. The Notification Preferences page lets you toggle:

- **Email notifications** for filing deadline reminders, compliance score changes, anomaly detection alerts, weekly summaries, and security alerts
- **In-app notifications** — toast messages that appear when you are actively using Comply

You access the preferences from your account menu. Quiet hours, per-category fine-grained controls, and channel preferences depend on Comply's notification infrastructure — see the in-app Notification Preferences page for the current options.

## What is NOT on this page

Worth knowing what's out of scope here so you set the right expectations:

- **Active session management** (viewing logged-in devices, revoking sessions) is **not** currently a self-service surface in Comply. If you suspect your account is signed in somewhere you don't recognise, change your password — that invalidates all existing sessions — and contact support if the concern persists.
- **Detailed login history** (timestamps, IPs, device fingerprints) is captured in the audit ledger but is not surfaced as a user-facing log on this page. Contact support if you need a copy of your login history for a specific period.
- **Quiet hours** for notifications are not configurable on a per-user basis today. Notifications are sent according to the underlying event triggers; out-of-hours suppression is not yet available.

## Privacy and data handling

CoralLedger Comply handles personal data in line with the Bahamian Data Protection (Privacy of Personal Information) Act 2003. The Privacy contact for data-subject-rights requests is `privacy@digitalcarib.com` — also the address surfaced in the footer on every page.

## Account deactivation and deletion

### Deactivate account

A temporarily deactivated account preserves your data and lets you reactivate later. Active subscriptions continue to bill if applicable. Contact support to deactivate.

### Delete account

Permanent account deletion removes your personal profile data. **Business data is retained for 7 years** per the [Value Added Tax Act, 2014, s. 50](https://laws.bahamas.gov.bs/) — regulatory record-keeping obligations apply even after a user deletes their account. The retained data is no longer associated with your personal identity but remains in the audit ledger.

Contact support to initiate account deletion.

:::warning Data retention is a regulatory obligation
Even after personal-account deletion, transaction data your business produced is retained for **7 years** under the VAT Act. This is not configurable — the retention period is set by statute.
:::

## Next steps

- [Two-Factor Authentication](/docs/security/two-factor-auth) — set up or manage 2FA
- [Configure business settings](/docs/settings/) — per-business configuration distinct from this page
- [Security overview](/docs/security/) — broader security posture
