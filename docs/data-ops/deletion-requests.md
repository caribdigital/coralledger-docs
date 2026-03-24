---
sidebar_position: 2
title: Deletion Requests
description: User-initiated deletion requests and operator approval workflow in CoralLedger Comply
---

# Deletion Requests

CoralLedger Comply supports a structured, auditable workflow for permanent data deletion. Users can request deletion of their data, and operators control whether that request is approved, rejected, or executed.

## Accessing Deletion Requests

Navigate to **Admin > Data Operations > Deletion Requests**. This feature requires Operator access.

## How the Workflow Works

```
User submits request → Operator reviews → Approved / Rejected
                                               ↓ (Approved)
                                        30-day DPA grace period
                                               ↓
                                     Operator executes with
                                     typed confirmation
                                               ↓
                                       Data permanently deleted
```

### 1. User Submits a Request

Any authenticated user can submit a deletion request from **Account Settings > Privacy > Request Data Deletion**:

1. Select the scope of data to delete
2. Provide a reason for the request
3. Confirm submission

A pending request is created and the user is notified by email.

### 2. Operator Reviews the Request

Operators see all pending requests in the **Deletion Requests** queue, including:

- **Requestor** — Name and email of the user
- **Submitted** — Date and time of submission
- **Scope** — What data the request covers
- **Reason** — Reason provided by the user
- **Status** — Current status of the request

### 3. Approval or Rejection

#### Approving a Request

1. Open the request
2. Click **Approve**
3. Add an optional operator note
4. Confirm the approval

The request status changes to **Approved** and the 30-day DPA grace period begins. The user is notified.

#### Rejecting a Request

1. Open the request
2. Click **Reject**
3. Enter a rejection reason (required — this is communicated to the user)
4. Confirm the rejection

The request status changes to **Rejected**. No data is deleted.

## Approved Status Lifecycle

Once a request is approved, it enters the grace period phase:

| Status | Meaning |
|--------|---------|
| **Pending** | Awaiting operator review |
| **Approved** | Approved; grace period is running |
| **Grace Period Expired** | 30-day window has passed; ready for execution |
| **Executed** | Data has been permanently deleted |
| **Rejected** | Request was denied by an operator |

:::info DPA Grace Period
The 30-day grace period is required under the Data Protection Act (DPA). During this window, the user can contact support to withdraw their request. Execution is blocked until the grace period expires.
:::

## Executing a Deletion

After the 30-day grace period expires, an operator can execute the deletion:

1. Open the approved request
2. Click **Execute Deletion**
3. A confirmation dialog appears explaining what will be permanently deleted
4. Type **DELETE** (in capitals) in the confirmation box to confirm
5. Click **Confirm Execution**

:::danger Irreversible Action
Data deletion is permanent and cannot be undone. All associated records, attachments, and audit references are destroyed. Ensure you have exported any data required for legal or compliance purposes before executing.
:::

The request status changes to **Executed** and a final audit entry is created.

## Request History

All deletion requests — regardless of outcome — are retained in the request history table. You can filter by:

- **Status** — Pending, Approved, Rejected, Executed
- **Date range** — Submission date
- **Requestor** — Search by name or email

## Audit Trail

Every action in the deletion request workflow is recorded in the [Audit Trail](/docs/audit), including:

- Request submission (with requestor IP)
- Operator approval or rejection (with note)
- Execution (with typed confirmation reference)

## Next Steps

- [Legal holds](/docs/data-ops/legal-holds)
- [Retention monitoring](/docs/data-ops/retention-monitoring)
- [Business data export](/docs/data-ops/data-export)
- [Audit trail](/docs/audit)
