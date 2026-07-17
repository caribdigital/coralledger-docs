---
sidebar_position: 10
title: Practitioner Revocation Gate
description: What happens — and what to do — when an active attestation or client assignment is revoked while a return is being worked on
---

# Practitioner Revocation Gate

CoralLedger Comply enforces a runtime gate on transaction entry: if the user currently working on a client's transactions is **no longer the active practitioner of record** for that client, Comply blocks new posts and presents the user with a clear next-step instruction. The gate is referred to internally as **S3-005**.

This page explains what triggers the gate, what the affected user sees, and how to restore normal operation.

## When the gate fires

The gate fires on the VAT Entry page (and downstream postings) when the §32 attestation-scope check fails for the current user against the current client business. Concretely, both of the following must be true for the gate to *not* fire:

1. The current user has an **active [Client Assignment](/docs/firm-portal/user-management)** for the client business — i.e. they are the designated workload owner for that client.
2. The current user has an **active [§32 Attestation](/docs/attestation/)** — `AttestationStatus = Active` — for that same client business.

If either condition is false, Comply considers the user out of scope and the gate fires. The two conditions are evaluated as a single correlated existence query for performance reasons — see [Section 32 Attestation Pathway](/docs/attestation/) for the design rationale.

## What the user sees

The blocked-poster alert renders at the top of the VAT Entry page with the test-stable identifier `voh-blocked-poster-alert`. The exact wording is similar to:

> **You are no longer the active practitioner of record for this client.**
>
> Posting is blocked. Please contact the firm administrator to confirm reassignment, or the successor practitioner to complete re-attestation.

Entry fields are visually inert. Comply will not silently accept and persist a posting attempt — the gate is fail-closed.

## The two distinct triggers

| Trigger | What happened | Audit-trail signal |
|---|---|---|
| **Client assignment ended** | A firm administrator reassigned this client to a different practitioner, or the assignment was deactivated entirely. The user retains their attestation (e.g. it is still `Active` against other clients) but lost workload ownership of *this* client. | A `CLIENT_ASSIGNMENT_REVOKED` or `CLIENT_ASSIGNMENT_TRANSFERRED` audit-ledger entry in the client's audit trail. |
| **Attestation no longer Active** | The user's `Attestation` row for this client has transitioned to `Superseded` (replaced by a newer attestation) or `VoidedByAssignmentChange` (the assignment change auto-voided the prior attestation). | An `ATTESTATION_SUPERSEDED` or `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE` audit-ledger entry. |

Both triggers result in the same end-user behaviour (the gate fires), but the recovery path is different.

## How to restore posting

### If the assignment ended

The successor practitioner — the user the firm administrator reassigned the client to — needs to log in and complete their own attestation for this client. Once their attestation is recorded as `Active`, they (not you) can resume posting.

If the reassignment was a mistake, the firm administrator needs to restore the original assignment via the [Firm Portal → User Management](/docs/firm-portal/user-management) surface. After restoration the original user can resume posting without re-attesting — the original attestation remains `Active`.

### If the attestation was voided or superseded

This is a deliberate state change in the attestation lifecycle, usually because:

- The firm administrator initiated a reassignment that auto-voided your attestation (`VoidedByAssignmentChange`).
- A newer attestation was created and `Superseded` your prior record (e.g. body-text drift detection triggered a re-attestation requirement).

The successor practitioner — whoever was given the new active attestation — should complete posting for this client. If you are still the practitioner of record but your attestation drifted, return to the [§32 Attestation Pathway](/docs/attestation/) and re-attest against the current body text.

## Why this gate exists

The gate is the runtime enforcement of the rule that an active client assignment alone is **not** sufficient evidence of attestation authority — that conflation is a regulated scope-creep bug class. Comply requires both an active workload assignment *and* an active §32 attestation before it allows transaction posting to that client's books. The distinction matters because:

- Workload assignment is firm-internal administration — who handles what.
- §32 attestation is a regulatory declaration with BICA-license backing — who is *authorised* to speak for the registrant.

Letting workload ownership alone unlock posting would mean a firm staff member could post transactions on a client's behalf without a current attestation, which is regulatorily unsupported.

## What this gate does NOT block

The gate is specifically a **posting** gate — it prevents new transaction entry. It does **not**:

- Hide existing transactions or historical returns from view.
- Block read-only navigation around the client's data.
- Affect transactions that were posted while the user was still in scope — those are durable and remain visible in audit.

If your read-access is also blocked, that is a separate role-level access control issue and not the S3-005 gate — contact the firm administrator.

## Related events

The blocked-poster gate sits alongside three related attestation lifecycle events that may surface in the audit trail or modal:

- `ATTESTATION_CREATED` — a new active attestation was recorded for a user/client pair.
- `ATTESTATION_RE_ATTEST_REQUIRED` — the stored attestation body text has drifted from the current canonical text; the user is asked to re-attest before continuing.
- `ATTESTATION_MODAL_CANCELLED` — the user dismissed a re-attestation prompt without completing it. The gate will fire on next posting attempt.

These are documented for completeness; they do not fire the S3-005 alert directly but feed into the conditions that do.

## Next steps

- [§32 Attestation Pathway](/docs/attestation/) — the overall attestation regime
- [BICA Licence Declaration](/docs/attestation/bica-licence-declaration) — how the practitioner's licence is recorded at attestation creation
- [Firm Portal — User Management](/docs/firm-portal/user-management) — where client assignments are managed
- [Audit Trail](/docs/audit/) — where every attestation lifecycle event surfaces
