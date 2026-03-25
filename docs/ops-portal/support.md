---
sidebar_position: 8
title: Support Operations
description: Impersonation, password management, and announcements in the CoralLedger Comply Ops Portal
---

# Support Operations

The Support Operations section (`/ops/support`) provides platform administrators with tools for resolving user issues: impersonating a user's session for direct troubleshooting, managing passwords when standard reset flows are unavailable, and broadcasting platform-wide announcements.

:::warning Elevated Privilege — Handle with Care
All actions in Support Operations carry elevated risk. Every impersonation session, password change, and announcement is recorded in the immutable `PLATFORM_OPS_*` audit log. Misuse of these capabilities may violate user privacy and data-protection law.
:::

## Impersonation

### What Is Impersonation?

Impersonation allows a platform admin to start an authenticated session as a specific user, seeing exactly what that user would see. It is intended exclusively for diagnosing user-reported issues that cannot be reproduced with test accounts.

### Impersonation Rules

- Impersonation is **never silent** — the user's audit log always records when an admin has impersonated their account
- The impersonating admin sees a persistent orange **"Impersonation Active"** banner throughout the session
- Impersonation sessions cannot be used to change the target user's password, payment method, or security settings
- Sessions automatically expire after **30 minutes** of inactivity

### Starting an Impersonation Session

1. Navigate to **Support Operations > Impersonation**
2. Search for the target user by email or name
3. Confirm the business tenant context (users may belong to multiple tenants)
4. Click **Start Impersonation**
5. Review and accept the impersonation consent notice
6. Click **Confirm**

A `PLATFORM_OPS_IMPERSONATION_STARTED` audit event is created immediately, recording:
- Platform admin identity
- Target user identity
- Target tenant
- Session start time
- Reason entered by the admin

### During an Impersonation Session

- A persistent orange banner shows: **"Impersonation Active — You are acting as [user@email.com]"**
- All actions taken during the session are attributed to the **target user** in the standard audit log, with an additional `PLATFORM_OPS_*` entry noting the admin actor
- The **Return to Admin** button in the banner ends the session immediately

### Ending an Impersonation Session

Click **Return to Admin** in the orange banner, or the session will end automatically after 30 minutes of inactivity.

A `PLATFORM_OPS_IMPERSONATION_ENDED` audit event is created with the session duration.

## Password Management

### When to Use This Feature

Use the password management tools only when a user cannot complete the standard self-service password reset (for example, they have lost access to their registered email address). In most cases, direct the user to the standard **Forgot Password** flow first.

### Generating a Temporary Password

1. Navigate to **Support Operations > Password Management**
2. Search for the target user
3. Click **Generate Temporary Password**
4. Enter the reason for the manual override
5. Click **Generate**

A one-time temporary password is displayed **once** — copy it immediately and transmit it to the user via a secure channel (not email). The user will be forced to change this password on their next login.

A `PLATFORM_OPS_TEMP_PASSWORD_GENERATED` audit event is created immediately when the password is generated.

### Admin-Triggered Password Reset Email

For users who have access to their email but need a fresh reset link:

1. Navigate to **Support Operations > Password Management**
2. Search for the target user
3. Click **Send Reset Email**

A standard password-reset email is sent. A `PLATFORM_OPS_PASSWORD_RESET_TRIGGERED` audit event is created. This is identical to the reset available in [User Administration](/docs/ops-portal/users).

## Announcements

Platform administrators can broadcast messages to all users or to a targeted subset of tenants and users.

### Creating an Announcement

1. Navigate to **Support Operations > Announcements**
2. Click **New Announcement**
3. Fill in the announcement form:

| Field | Description |
|-------|-------------|
| **Title** | Short summary displayed in the banner or notification |
| **Body** | Full announcement text (Markdown supported) |
| **Audience** | All Users / Specific Tenants / Specific Plans |
| **Display Style** | Info / Warning / Critical |
| **Start Date** | When the announcement becomes visible |
| **End Date** | When the announcement is automatically hidden |
| **Dismissible** | Whether users can dismiss the banner |

4. Click **Preview** to review how the announcement will appear
5. Click **Publish**

A `PLATFORM_OPS_ANNOUNCEMENT_PUBLISHED` audit event is created.

### Managing Announcements

The Announcements list shows all active, scheduled, and past announcements. Admins can:

- **Edit** — Update text or dates for a scheduled or active announcement
- **Unpublish** — Immediately hide an active announcement
- **Duplicate** — Use an existing announcement as a template

### Announcement Display Styles

| Style | Use Case | Appearance |
|-------|----------|-----------|
| **Info** | General platform news, feature releases | Blue banner |
| **Warning** | Scheduled maintenance, service degradation | Yellow banner |
| **Critical** | Outages, security notices | Red banner |

## Next Steps

- [User Administration — lock/unlock accounts](/docs/ops-portal/users)
- [Audit Log Viewer — review support actions](/docs/ops-portal/audit)
- [Ops Portal Overview](/docs/ops-portal)
