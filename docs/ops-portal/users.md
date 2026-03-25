---
sidebar_position: 4
title: User Administration
description: Platform-wide user search, lock/unlock, password reset, and soft-delete in the CoralLedger Comply Ops Portal
---

# User Administration

The User Administration section (`/ops/users`) provides platform administrators with a platform-wide view of all user accounts across every tenant, along with controls for locking, unlocking, resetting passwords, and removing users.

## User Search

Navigate to `/ops/users` to access the platform-wide user search. The search operates across all tenants simultaneously.

### Search Fields

| Field | Description |
|-------|-------------|
| **Email** | Partial or exact match on the user's email address |
| **Name** | First name, last name, or display name |
| **Tenant** | Filter to a specific business tenant |
| **Role** | Filter by role: Owner, Accountant, User, PlatformAdmin |
| **Status** | All / Active / Locked / Soft-Deleted |
| **2FA Status** | Enrolled / Not Enrolled |

### Results Table

| Column | Description |
|--------|-------------|
| **Name** | Display name and email |
| **Tenant** | Business tenant the user belongs to |
| **Role** | Assigned role within that tenant |
| **Last Login** | UTC timestamp of the most recent successful login |
| **2FA** | Whether 2FA is enrolled |
| **Status** | Active, Locked, or Soft-Deleted |

Click any row to open the User Detail panel.

## User Detail Panel

The User Detail panel opens as a side drawer and shows:

- **Profile** — Name, email, registration date, and last login
- **Tenant memberships** — All tenants this user belongs to, with their role in each
- **Login history** — Last 20 login attempts with IP address, device, and success/failure
- **Active sessions** — Sessions that can be revoked individually
- **Audit history** — Recent `PLATFORM_OPS_*` events related to this user

## Locking and Unlocking Accounts

Locking a user account immediately invalidates all active sessions and prevents new logins across all tenants.

### Lock an Account

1. Open the User Detail panel
2. Click **Lock Account**
3. Enter the reason (required — stored in the audit log)
4. Click **Confirm**

A `PLATFORM_OPS_USER_LOCKED` audit event is created. The user receives an email notification explaining their account has been suspended and how to contact support.

### Unlock an Account

1. Open the User Detail panel for a locked user
2. Click **Unlock Account**
3. Optionally add a note
4. Click **Confirm**

A `PLATFORM_OPS_USER_UNLOCKED` audit event is created. The user can log in again immediately.

:::info Automatic Lock Review
User accounts locked for more than 7 days appear in the [Dashboard](/docs/ops-portal/dashboard) Attention Required feed to prompt review.
:::

## Password Reset

Platform admins can trigger a password-reset email for any user:

1. Open the User Detail panel
2. Click **Send Password Reset**
3. Confirm the action

A secure, one-time reset link is emailed to the user's registered address. The link expires after 24 hours. A `PLATFORM_OPS_PASSWORD_RESET_TRIGGERED` audit event is created.

Alternatively, if the user cannot access their email, an admin can use the [Support Operations](/docs/ops-portal/support) section to generate a temporary password.

## Soft-Deleting a User

Soft-deletion removes the user from all tenant memberships and prevents login while preserving their audit history and attribution data.

1. Open the User Detail panel
2. Click **⋮ Actions > Soft-Delete User**
3. Enter the reason and legal basis
4. Click **Confirm**

A `PLATFORM_OPS_USER_SOFT_DELETED` audit event is created. Soft-deleted users can be restored within the 30-day DPA grace period. After 30 days, the record is anonymized unless a legal hold is in place.

:::warning Data Protection
Soft-deletion does not remove personal data immediately. If a deletion is requested under data-protection law, use the [Data Operations](/docs/ops-portal/data-ops) workflow to ensure the correct 30-day grace period and anonymization steps are followed.
:::

## Next Steps

- [Tenant Management](/docs/ops-portal/tenants)
- [Support Operations — impersonation and password management](/docs/ops-portal/support)
- [Data Operations — deletion requests](/docs/ops-portal/data-ops)
