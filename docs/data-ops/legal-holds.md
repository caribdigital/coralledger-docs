---
sidebar_position: 3
title: Legal Holds
description: Place and release legal holds on files and records in CoralLedger Comply
---

# Legal Holds

A legal hold prevents specific files or records from being modified or deleted. Use legal holds during litigation, regulatory investigations, or any situation where data integrity must be guaranteed beyond the normal retention schedule.

## Accessing Legal Holds

Navigate to **Admin > Data Operations > Legal Holds**. This feature requires Operator access.

## Types of Legal Holds

CoralLedger Comply supports two levels of hold:

| Hold Type | Applies To | Effect |
|-----------|-----------|--------|
| **File-Level Hold** | Uploaded files and attachments | Prevents deletion or replacement of the specific file |
| **Tombstone Record Hold** | Soft-deleted (tombstoned) records | Prevents permanent removal of tombstoned records; the record remains restorable |

## Placing a Legal Hold

### On a File

1. Locate the file in the relevant transaction, return, or document list
2. Click the **⋮** (more options) menu next to the file
3. Select **Place Legal Hold**
4. Enter the reason for the hold (required — e.g., *"Active litigation — Case #2025-0412"*)
5. Optionally enter an expected release date for reference
6. Click **Confirm**

The file is immediately protected. A lock icon is displayed wherever the file appears.

### On a Tombstone Record

1. Navigate to **Admin > Data Operations > Legal Holds > Tombstone Records**
2. Search for the record by ID, type, or date
3. Select the record and click **Place Hold**
4. Enter the reason and optional release date
5. Click **Confirm**

## Releasing a Legal Hold

When the legal matter is resolved, the hold must be explicitly released by an operator:

1. Navigate to **Admin > Data Operations > Legal Holds**
2. Find the active hold in the **Active Holds** table
3. Click **Release Hold**
4. Enter the reason for releasing the hold (required)
5. Click **Confirm Release**

:::warning
Releasing a hold allows the file or record to be subject to normal deletion and retention rules again. Ensure the legal or regulatory matter is fully resolved before releasing.
:::

## Hold Status

| Status | Description |
|--------|-------------|
| **Active** | Hold is in effect; the record or file is protected |
| **Released** | Hold has been lifted; normal rules apply |
| **Expired** | Expected release date has passed (hold remains active until manually released) |

:::info
An **Expired** status is informational only — the hold is still enforced. You must manually release it.
:::

## Active Holds Table

The active holds dashboard displays all current holds with:

- **Hold ID** — Unique identifier for the hold
- **Type** — File or Tombstone Record
- **Subject** — File name or record identifier
- **Placed By** — Operator who placed the hold
- **Placed On** — Date and time the hold was created
- **Reason** — Reason provided when placing the hold
- **Expected Release** — Optional target date
- **Status** — Active, Released, or Expired

## Audit Trail

Every hold placement and release is recorded in the [Audit Trail](/docs/audit), including:

- The operator who placed or released the hold
- The reason provided
- The exact timestamp
- The affected file or record identifier

This creates a complete evidentiary chain suitable for legal proceedings.

## Best Practices

1. **Always provide a specific reason** — Reference case numbers, investigation IDs, or regulatory notices
2. **Set an expected release date** — Helps operators track ongoing obligations
3. **Review active holds regularly** — Confirm holds are still required; release promptly when resolved
4. **Coordinate with legal counsel** — Ensure hold scope matches the legal requirements
5. **Never rely on holds as a substitute for backup** — Legal holds prevent deletion, not data loss from other causes

## Next Steps

- [Deletion requests](/docs/data-ops/deletion-requests)
- [Retention monitoring](/docs/data-ops/retention-monitoring)
- [Business data export](/docs/data-ops/data-export)
- [Audit trail](/docs/audit)
