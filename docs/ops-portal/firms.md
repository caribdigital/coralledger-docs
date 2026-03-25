---
sidebar_position: 5
title: Firm Management
description: Accounting firm oversight, invitations, and client transfers in the CoralLedger Comply Ops Portal
---

# Firm Management

The Firm Management section (`/ops/firms`) gives platform administrators oversight of all accounting firms registered on the platform. Admins can view firm details, send invitations on behalf of a firm, and transfer clients between firms.

## Firm List

Navigate to `/ops/firms` to see the full list of accounting firms.

### Columns

| Column | Description |
|--------|-------------|
| **Firm Name** | Registered firm name |
| **Owner** | Primary owner email |
| **Plan** | Firm subscription tier |
| **Clients** | Number of attached client tenants |
| **Staff** | Number of firm staff users |
| **Status** | Active / Deactivated |
| **Last Activity** | Timestamp of the last recorded event |

### Filtering and Search

- **Search** — Filter by firm name or owner email
- **Plan** — Filter by subscription tier (Founding Member, Accounting Firm, Enterprise)
- **Status** — All / Active / Deactivated

## Firm Detail Page

Click any firm row to open the Firm Detail page (`/ops/firms/{id}`).

### Overview Tab

- **Firm profile** — Name, registration date, and contact details
- **Subscription** — Current plan, client count vs. plan limit, next billing date
- **Staff members** — List of all staff with their roles and last login
- **Pending invitations** — Outgoing client invitations that have not yet been accepted

### Clients Tab

Lists all client tenants currently managed by this firm. Each row links to the full [Tenant Detail](/docs/ops-portal/tenants) page. Admins can transfer individual clients from this tab.

### Audit Tab

A filtered view of the audit log showing all `PLATFORM_OPS_*` events that reference this firm or any of its clients.

## Sending an Invitation on Behalf of a Firm

Platform admins can send a client invitation as if it originated from the firm. This is useful when a firm encounters a technical issue sending their own invitations.

1. Open the Firm Detail page
2. Go to the **Overview** tab and find the **Pending Invitations** panel
3. Click **Send Invitation on Behalf**
4. Enter the client's business name and contact email
5. Select the access level (Full Access / View Only)
6. Click **Send**

The invitation email is sent from the firm's display name. A `PLATFORM_OPS_INVITATION_SENT_ON_BEHALF` audit event records that the action was performed by a platform admin, not the firm staff.

## Transferring a Client Between Firms

If a business changes accounting firms, a platform admin can transfer the client relationship:

1. Open the Firm Detail page of the **current** firm
2. Go to the **Clients** tab
3. Click **Transfer** on the relevant client row
4. Search for and select the **receiving firm**
5. Review the transfer summary:
   - Client tenant name
   - Source firm
   - Destination firm
   - Any open work items (batch filings, pending returns)
6. Click **Confirm Transfer**

Both firms receive an email notification. The client's data is not moved — only the firm-to-client relationship is updated. A `PLATFORM_OPS_CLIENT_TRANSFERRED` audit event is created.

:::info Open Work Items
If the client has open batch filings or pending returns, the transfer dialog will warn you. It is recommended to complete or cancel those items before transferring.
:::

## Deactivating a Firm

Deactivating a firm suspends all firm staff logins and prevents new client invitations while preserving client data.

1. Open the Firm Detail page
2. Click **⋮ Actions > Deactivate Firm**
3. Enter a reason
4. Click **Confirm Deactivation**

The firm's clients are **not** deactivated — they remain accessible to their own business users. Only the firm's staff lose access. A `PLATFORM_OPS_FIRM_DEACTIVATED` audit event is created.

## Next Steps

- [Tenant Management](/docs/ops-portal/tenants)
- [User Administration](/docs/ops-portal/users)
- [Audit Log Viewer](/docs/ops-portal/audit)
