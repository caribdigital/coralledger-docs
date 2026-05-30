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

Comply recognises two **base permission levels** on `UserBusinessAccess`:

| Level | What it grants | Notes |
|---|---|---|
| **Owner** | Full access to the business — settings, user management, every feature surface | At least one Owner must exist at all times (see Last-Owner protection below) |
| **Accountant** | Default for non-Owner staff — data management within the business | Access is further refined per-category via the granular permission matrix |

There is no separate "View Only" or "Review Only" permission level. A read-only experience is achieved by granting **Accountant** as the base level and turning off the editing permissions in the granular matrix.

### Granular Permissions

Above the base level, an Owner can configure per-category access for any Accountant. The categories are:

- **Transactions** — Create, edit, delete, import
- **Reports** — View, export, share
- **Compliance** — View scores, manage alerts
- **Settings** — Business settings, preferences
- **User Management** — Add/remove users
- **Security** — View audit logs, security settings

Each category exposes the operations relevant to it. Toggling Transactions → Create off, for example, gives the Accountant read-and-edit access to transactions without the ability to add new ones.

:::warning Last-Owner protection
A business must always have at least one Owner. The user-management surface refuses to demote or remove the **sole** remaining Owner — both actions are blocked with a clear error message. To replace the last Owner, first promote a second user to Owner, then demote the original.
:::

:::info §32 attestation is independent of permission level
Permissions and §32 attestations are **two distinct artefacts**. Changing a user's `PermissionLevel` does **not** create, supersede, or void any `Attestation` row.

- An Accountant can hold an `Active` attestation for a client and continue to sign returns under it until the attestation is voided through a separate flow.
- Revoking a user's Accountant access from a business removes their day-to-day access but does **not** void any attestation they hold on that business. To void the attestation, route through the reassignment flow described below.
- An Owner does not implicitly hold an attestation — Owner status grants full firm-portal access, not regulatory authority.

See [Section 32 Attestation Overview](/docs/attestation/) for the admin attestation lifecycle and the [§32 Attestation Entry Pathway](/docs/firm-portal/attestation-entry-pathway) for the creation flow. The runtime gate that fires when a user no longer holds the regulatory authority is documented at [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation).
:::

## Reassigning a Client Between Practitioners

When a firm needs to transfer a client from one practitioner to another, the **Reassign Client** flow is the canonical path. It performs two coupled actions:

1. The prior practitioner's `ClientAssignment` row is marked `IsActive = false`; a new `ClientAssignment` is created for the new practitioner.
2. Every `Active` `Attestation` for the client business is moved to `VoidedByAssignmentChange` status. An `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE` audit-ledger entry is written for each voided row.

The new practitioner must then run the [§32 Attestation Entry Pathway](/docs/firm-portal/attestation-entry-pathway) before the client can be filed for again.

:::info Today this flow is API-only
The Reassign Client flow is available **today** only through the `/api/v1/accounting-firm/reassign-client` endpoint — the corresponding Clients-grid row action in the Comply UI is a placeholder pending implementation (see [Comply #3125](https://github.com/caribdigital/coralledgercomply/issues/3125) for the Phase 2 UI work). Until the UI ships, firms that need to reassign a client should coordinate with Comply support to invoke the API.
:::

## Client Invitation Lifecycle

When a firm invites a client business to CoralLedger Comply, the invitation passes through several states. Understanding each stage helps you manage outstanding invitations and troubleshoot delivery issues.

:::note
Client invitations (covered in this section) are distinct from team member invitations. Use **Invite Client** to bring a client business under your firm's management; use **Invite User** to add a colleague to your own account — see [Inviting a Team Member](#inviting-a-team-member) below.
:::

### 1 — Send

1. Click **Invite Client**
2. Enter the client's email address
3. Click **Send Invitation**

CoralLedger Comply generates a unique, time-limited token and sends it to the provided email address. The token is valid for **7 days** from the time of sending. The pending invitations table is updated immediately.

### 2 — Resend (token refresh)

If the original invitation has not been accepted, you can resend it:

1. Locate the invitation in the pending invitations table
2. Click **Resend**

Resending **rotates the token** and resets the 7-day expiry window. The previous token is invalidated instantly — any link the client may have saved will no longer work. Use this option when the client reports not receiving the original email or when the original token has expired.

### 3 — Revoke

To cancel an outstanding invitation before the client accepts it:

1. Locate the invitation in the pending invitations table
2. Click **Revoke**

A revoked invitation is marked as consumed and cannot be used to accept the invitation. No business is linked to your firm as a result of the revocation.

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

Tokens that have not been accepted or revoked within 7 days are rejected when the client attempts to use the link. The invitation remains visible in the pending invitations table as **Expired**. You can send a fresh invitation from the actions menu.

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
