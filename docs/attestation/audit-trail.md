---
sidebar_position: 11
title: Attestation Audit Trail
description: Immutable audit logging for Section 32 attestation events in CoralLedger Comply
---

# Attestation Audit Trail

Every event in the Section 32 Attestation Pathway is recorded in an immutable, hash-chain verified audit log. This log provides a complete, tamper-proof record of who attested each VAT return, under which variant, and when — supporting regulatory compliance, internal governance, and any subsequent audit or dispute process.

## Why the Attestation Audit Trail Exists

Under Section 32 of the Bahamas VAT Act, a VAT return must be accompanied by a signed declaration. The attestation audit trail documents that this requirement was met for every submitted return, preserving:

- **Identity** — Exactly who completed the attestation and their role at the time
- **Method** — Which variant was used (Standard, Agent, Professional, Digital, or Carve-Out)
- **Integrity** — That the session was valid, not shared, and completed without interruption anomalies
- **Timing** — Precise UTC timestamps for every stage of the pathway
- **Professional credentials** — BICA membership number and verification result, where applicable

## Events Recorded

The attestation audit trail captures events at each stage of the pathway:

| Event | Description |
|-------|-------------|
| `ATT_SESSION_STARTED` | A new attestation session was initiated for a return |
| `ATT_QUALIFIER_COMPLETED` | The Qualifying Screen was answered; variant and session ID recorded |
| `ATT_BICA_VERIFIED` | BICA membership check completed (result: Verified / Not Verified / Fallback) |
| `ATT_BICA_FALLBACK` | Manual BICA fallback document uploaded |
| `ATT_SESSION_AFFIRMED` | Session Affirmation was completed successfully |
| `ATT_SESSION_AFFIRMATION_FAILED` | Session Affirmation attempt failed (includes attempt count) |
| `ATT_HANDOVER_INITIATED` | A Handover was initiated; sender, recipient, and reason recorded |
| `ATT_HANDOVER_ACCEPTED` | The Handover recipient completed Session Affirmation |
| `ATT_HANDOVER_RECALLED` | A pending Handover was recalled by the sender |
| `ATT_HANDOVER_EXPIRED` | A Handover link expired before the recipient acted |
| `ATT_CARVEOUT_APPLIED` | A carve-out scenario was identified and the abbreviated pathway was used |
| `ATT_DECLARATION_PRESENTED` | The final declaration text was shown to the filer |
| `ATT_DECLARATION_CONFIRMED` | The filer confirmed the declaration and submitted the return |
| `ATT_SESSION_ABANDONED` | The attestation session was abandoned before completion |
| `ATT_SESSION_EXPIRED` | The 30-minute submission window elapsed before the return was submitted |
| `ATT_SESSION_INVALIDATED` | The session was invalidated due to repeated affirmation failures |

## Audit Entry Fields

Each attestation audit entry includes the following fields:

| Field | Contents |
|-------|----------|
| **Event Type** | One of the event codes listed above |
| **Attestation Session ID** | Unique identifier for the current attestation session |
| **Return ID** | The VAT return to which this attestation belongs |
| **Tax Period** | Period covered by the return (e.g., Q1 2026) |
| **Variant** | Standard / Agent / Professional / Digital / Carve-Out |
| **User ID** | Platform user ID of the logged-in party |
| **User Name** | Display name of the logged-in party |
| **User Role** | Role held at the time (Owner, Accountant, PlatformAdmin) |
| **IP Address** | Source IP address of the session |
| **Timestamp (UTC)** | Exact UTC date and time of the event |
| **BICA Membership No.** | Where applicable; blank for non-professional variants |
| **Certificate Serial** | Digital certificate serial number; Digital variant only |
| **Hash** | Cryptographic link to the previous entry in the chain |
| **Severity** | Normal, Warning, or Critical |

## Accessing Attestation Audit Records

### From the VAT Return

1. Navigate to **VAT Returns > History**
2. Open the relevant submitted return
3. Click the **Attestation** tab
4. The full audit trail for that return's attestation session is displayed

### From the Audit Trail Module

1. Navigate to **Reports > Audit Logs**
2. Filter by **Event Category: Attestation** or search for a specific return or session ID
3. Apply date, variant, or user filters as needed
4. Export to CSV or JSON using the **Export** button

### Via the Cross-Tenant Audit Viewer (PlatformAdmin)

Platform administrators can search attestation events across all businesses using the [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer). Filter by event type prefix `ATT_` to scope results to attestation events only.

## Retention and Immutability

Attestation audit records are subject to the same immutability and retention rules as all other audit data in CoralLedger Comply:

- **WORM compliance** — Records cannot be modified or deleted after creation
- **Hash-chain verification** — Each record is cryptographically linked to the previous entry; any tampering breaks the chain
- **7-year retention** — All attestation records are retained for a minimum of 7 years, in compliance with VAT Act Section 50

## Exporting Attestation Records

Attestation records can be exported in CSV or JSON format for:

- DIR audit requests
- Internal compliance reviews
- Professional indemnity documentation
- Dispute resolution

Export up to **10,000 rows** per request from the Cross-Tenant Audit Viewer, or the full return-specific record from the VAT Return Attestation tab (no row limit).

## Next Steps

- [Attestation Overview](/docs/attestation)
- [Audit Trail Overview](/docs/audit)
- [Cross-Tenant Audit Viewer](/docs/audit/cross-tenant-audit-viewer)
- [Submit your VAT return](/docs/vat-returns/submit-return)
