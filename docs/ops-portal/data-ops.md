---
sidebar_position: 7
title: Data Operations
description: Deletion requests, legal holds, and retention monitoring in the CoralLedger Comply Ops Portal
---

# Data Operations

The Data Operations section (`/ops/data`) provides platform administrators with tools to manage tenant data lifecycle: processing deletion requests under data-protection law, placing and managing legal holds, and monitoring data retention compliance.

## Overview

Data Operations covers three main areas:

| Area | Purpose |
|------|---------|
| **Deletion Requests** | Review and approve/reject user and tenant deletion requests |
| **Legal Holds** | Place, renew, and release legal holds that pause deletion |
| **Retention Monitor** | View retention schedules and data volumes per tenant |

## Deletion Requests

### What Triggers a Deletion Request?

Deletion requests are created in three ways:

1. **User self-service** — A user requests deletion of their own account via Account Settings
2. **Tenant closure** — A business owner requests full tenant deletion
3. **Platform admin** — A platform admin initiates deletion from the [Tenant Management](/docs/ops-portal/tenants) or [User Administration](/docs/ops-portal/users) sections

### The 30-Day DPA Grace Period

When a deletion request is raised, the following sequence begins:

1. **Day 0** — Request created; record is soft-deleted and inaccessible to the tenant
2. **Days 1–30** — Grace period: data is preserved and can be restored if the request is cancelled
3. **Day 30** — Hard-delete job runs; personal data is permanently erased and replaced with anonymised placeholders
4. **After Day 30** — Audit entries referencing the deleted record retain anonymised identifiers to preserve chain integrity

If a legal hold is active at Day 30, the hard-delete job is blocked until the hold is released.

### Deletion Request List

Navigate to `/ops/data` and select the **Deletion Requests** tab. The list shows all pending and recently processed requests:

| Column | Description |
|--------|-------------|
| **Subject** | User email or tenant name |
| **Type** | User deletion or Tenant deletion |
| **Requested By** | Who raised the request |
| **Request Date** | When the request was created |
| **Grace Period Expires** | Date of the 30-day deadline |
| **Status** | Pending / Approved / Cancelled / Completed |
| **Legal Hold** | Whether a legal hold is blocking deletion |

### Approving a Deletion Request

Requests raised by users or tenant owners require explicit approval by a platform admin before the 30-day clock starts (for admin-initiated requests, the clock starts immediately):

1. Click the request row
2. Review the subject details and the legal basis
3. Click **Approve**
4. Enter a note (optional)

A `PLATFORM_OPS_DELETION_APPROVED` audit event is created.

### Cancelling a Deletion Request

A deletion request can be cancelled at any point during the grace period:

1. Click the request row
2. Click **Cancel Request**
3. Enter the reason for cancellation

The record is restored to active status. A `PLATFORM_OPS_DELETION_CANCELLED` audit event is created.

:::info Expiring Soon
Requests with fewer than 48 hours remaining in their grace period appear in the [Dashboard](/docs/ops-portal/dashboard) Attention Required feed.
:::

## Legal Holds

A legal hold prevents the hard-delete job from permanently erasing a record. Use legal holds when data may be required for litigation, regulatory investigation, or tax audit.

### Placing a Legal Hold

1. Go to the **Legal Holds** tab or open a deletion request
2. Click **Place Legal Hold**
3. Enter:
   - **Hold Reason** — Legal basis or case reference
   - **Expiry Date** — Mandatory; the date after which the hold must be reviewed
   - **Authorising Contact** — Name and email of the legal counsel or officer authorising the hold
4. Click **Confirm**

A `PLATFORM_OPS_LEGAL_HOLD_SET` audit event is created.

### Renewing a Legal Hold

Holds must be renewed before their expiry date. Expired holds appear in the [Dashboard](/docs/ops-portal/dashboard) Attention Required feed.

1. Click the hold row
2. Click **Renew Hold**
3. Update the expiry date and add a renewal note
4. Click **Confirm**

### Releasing a Legal Hold

1. Click the hold row
2. Click **Release Hold**
3. Enter the reason for release
4. Click **Confirm**

Releasing a hold allows the deletion process to resume. If the 30-day grace period has already passed, the hard-delete job will run at the next scheduled interval. A `PLATFORM_OPS_LEGAL_HOLD_RELEASED` audit event is created.

## Retention Monitor

The Retention Monitor tab shows data retention schedules and storage volumes across all tenants.

### Retention Schedule Summary

| Retention Rule | Duration | Trigger |
|---------------|----------|---------|
| **Active tenant data** | Indefinite | While tenant is active |
| **Closed tenant data** | 7 years | From closure date (VAT Act Section 50) |
| **Soft-deleted user data** | 30 days | From deletion request approval |
| **Audit entries** | 7 years | From entry creation date |
| **Export files** | 30 days | From export generation date |

### Per-Tenant Retention View

Select a tenant from the dropdown to see:

- Total data volume (transactions, audit entries, documents)
- Earliest retention expiry date
- Any active legal holds
- Upcoming scheduled deletions

## Next Steps

- [Ops Portal Overview](/docs/ops-portal)
- [Tenant Management — initiate deletion](/docs/ops-portal/tenants)
- [User Administration — soft-delete a user](/docs/ops-portal/users)
- [Audit Log Viewer](/docs/ops-portal/audit)
