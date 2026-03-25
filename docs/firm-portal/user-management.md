---
sidebar_position: 4
title: User Management
description: Manage team members and permissions in CoralLedger Comply
---

# User Management

Manage your team members, control access permissions, and invite new users to your CoralLedger Comply account.

## Accessing User Management

Navigate to **Settings > User Management** or **Settings > Users**. This feature requires 2FA to be enabled.

## Dashboard Overview

Summary cards display:
- **Total Users** — Active users on your account
- **Owners** — Users with full access
- **Accountants** — Users with data management access
- **Pending Invites** — Outstanding invitations

## Permission Levels

| Level | Description | Access |
|-------|-------------|--------|
| **Owner** | Full access to all features | Everything including user management and settings |
| **Accountant** | Manages data and reports | Transactions, returns, reports, compliance |
| **User** | View-only access | Read-only access to data and reports |

### Granular Permissions

Beyond the base permission level, you can configure granular access per user across:
- **Transactions** — Create, edit, delete, import
- **Reports** — View, export, share
- **Compliance** — View scores, manage alerts
- **Settings** — Business settings, preferences
- **User Management** — Add/remove users
- **Security** — View audit logs, security settings

## Client Invitation Lifecycle

When a firm invites a client business to CoralLedger Comply, the invitation passes through several states. Understanding each stage helps you manage outstanding invitations and troubleshoot delivery issues.

:::note
Client invitations (covered in this section) are distinct from team member invitations. Use **Invite Client** to bring a client business under your firm's management; use **Invite User** to add a colleague to your own account — see [Inviting a Team Member](#inviting-a-team-member) below.
:::

### 1 — Send

1. Click **Invite Client**
2. Enter the client's email address
3. Click **Send Invitation**

CoralLedger generates a unique, time-limited token and sends it to the provided email address. The token is valid for **7 days** from the time of sending. The pending invitations table is updated immediately.

### 2 — Resend (token refresh)

If the original invitation has not been accepted, you can resend it:

1. Locate the invitation in the pending invitations table
2. Click **Resend**

Resending **rotates the token** and resets the 7-day expiry window. The previous token is invalidated instantly — any link the client may have saved will no longer work. Use this option when the client reports not receiving the original email or when the original token has expired.

### 3 — Revoke

To cancel an outstanding invitation before the client accepts it:

1. Locate the invitation in the pending invitations table
2. Click **Revoke**

A revoked invitation is marked as consumed and cannot be used to accept entry. No business is linked to your firm as a result of the revocation.

:::warning
Revoking an invitation is irreversible. If you need to invite the same client again, send a new invitation.
:::

### 4 — Accept

When the client clicks the invitation link:

1. The system validates the token to confirm it is genuine and within the 7-day window
2. If valid, the client's business is linked to your firm
3. The invitation is marked accepted

Once accepted, the client business appears in your **Clients** dashboard and can be managed through the Firm Portal.

### 5 — Expire

Tokens that have not been accepted or revoked within 7 days are automatically rejected when the client attempts to use the link. The invitation remains visible in the pending invitations table as **Expired**. You can send a fresh invitation from the actions menu.

### Invitation Status Reference

| Status | Description |
|--------|-------------|
| **Pending** | Sent, awaiting client action; token valid |
| **Expired** | 7-day window elapsed; token rejected |
| **Revoked** | Cancelled by firm; token invalidated |
| **Accepted** | Client linked; invitation closed |

### Pending Invitations Table

The pending invitations table shows:
- Email address
- Invitation code (copy to clipboard)
- Assigned role
- Created date
- Expiration countdown
- Actions: Copy code, Resend, Revoke

## Inviting a Team Member

1. Click **Invite User**
2. Enter the user's email address
3. Select a permission level
4. Click **Send Invitation**

The user receives an invitation code. Invitations expire after a set period (shown in the pending invitations table).

### Invitation Management

The pending invitations table shows:
- Email address
- Invitation code (copy to clipboard)
- Assigned role
- Created date
- Expiration countdown
- Actions: Copy code, Delete

## Editing User Permissions

1. Find the user in the current users table
2. Click **Edit**
3. Adjust the permission level
4. Toggle granular permissions as needed
5. Save changes

## Removing a User

1. Find the user in the current users table
2. Click **Delete**
3. Confirm the removal

:::warning
Removing a user revokes their access immediately. Their past actions remain in the audit trail.
:::

## Ops Portal Integration

Platform operators can send, resend, and revoke client invitations on behalf of any firm from the Ops Portal. Every operator action creates a dedicated audit entry:

| Action | Audit Entry |
|--------|-------------|
| Send invitation | `PLATFORM_OPS_INVITE_SEND` |
| Resend invitation (token refresh) | `PLATFORM_OPS_INVITE_RESEND` |
| Revoke invitation | `PLATFORM_OPS_INVITE_REVOKE` |

These audit entries are visible in the platform-level audit log and in the affected firm's audit trail. Operator-initiated invitation actions follow the same lifecycle rules (7-day token, token rotation on resend, irreversible revocation) as firm-initiated actions.

## Next Steps

- [Firm portal overview](/docs/firm-portal)
- [Security settings](/docs/security)
- [Account settings](/docs/settings/account)
