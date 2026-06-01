---
sidebar_position: 11
title: Attestation Audit Trail
description: Immutable audit logging for Section 32 attestation events in CoralLedger Comply
---

# Attestation Audit Trail

Every event in the Section 32 Attestation Pathway is recorded in an immutable, hash-chain verified audit log. This log provides a complete, tamper-proof record of who attested each VAT return, under which variant, and when — supporting regulatory compliance, internal governance, and any subsequent audit or dispute process.

## Why the Attestation Audit Trail Exists

Under [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32, a VAT return must be accompanied by a signed declaration. The attestation audit trail documents that this requirement was met for every submitted return, preserving:

- **Identity** — Exactly who completed the attestation and their role at the time
- **Method** — Which variant was used (Standard, Agent, Professional, Digital, or Carve-Out)
- **Integrity** — That the session was valid, not shared, and completed without interruption anomalies
- **Timing** — Precise UTC timestamps for every stage of the pathway
- **Professional credentials** — BICA membership number and verification result, where applicable

## Events Recorded

The attestation audit trail captures events at each stage of the pathway. The current build emits the six lifecycle events listed under **Currently emitted** below; the events under **Planned** are reserved for upcoming features (Handover, Session Affirmation, Carve-Out routing, Digital Filing) — they will start emitting as those features ship. Integrators consuming the audit feed should ignore unknown event types gracefully.

### Currently emitted

| Event | Description |
|-------|-------------|
| `ATTESTATION_CREATED` | A new attestation record was created for a return |
| `ATTESTATION_SUPERSEDED` | A prior attestation was superseded by a later one on the same return (re-attest cycle) |
| `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE` | The active client assignment was changed, invalidating the prior attestation authority |
| `ATTESTATION_RE_ATTEST_REQUIRED` | A return change after attestation requires re-attestation before submission |
| `ATTESTATION_MODAL_CANCELLED` | The filer cancelled the attestation confirmation modal before submitting |
| `BICA_VERIFICATION_ATTEMPTED` | A BICA licence verification was attempted. Description names the client business and embeds the resolved state (`Verified` / `NotFound` / `Expired` / `Unreachable` / `Stale`). See [BICA Verification](/docs/attestation/bica-verification) for the canonical Description lines. |

### Planned (not yet emitted)

| Event | Status / target feature |
|-------|-------------------------|
| `ATT_SESSION_STARTED` / `ATT_QUALIFIER_COMPLETED` | Planned with [Qualifying Screen](/docs/attestation/qualifying-screen) instrumentation |
| `ATT_SESSION_AFFIRMED` / `ATT_SESSION_AFFIRMATION_FAILED` | Planned with [Session Affirmation](/docs/attestation/session-affirmation) live capture |
| `ATT_HANDOVER_INITIATED` / `_ACCEPTED` / `_RECALLED` / `_EXPIRED` | Planned with [Handover](/docs/attestation/handover) feature |
| `ATT_CARVEOUT_APPLIED` | Planned with [Carve-Outs](/docs/attestation/carve-outs) routing instrumentation |
| `ATT_DECLARATION_PRESENTED` / `_CONFIRMED` | Planned alongside session-affirmed/declaration UI capture |
| `ATT_SESSION_ABANDONED` / `_EXPIRED` / `_INVALIDATED` | Planned with full session-lifecycle instrumentation |

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
- **7-year retention** — All attestation records are retained for a minimum of 7 years, in compliance with [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 50

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
