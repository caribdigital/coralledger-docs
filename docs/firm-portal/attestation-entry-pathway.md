---
sidebar_position: 6
title: Section 32 Attestation Entry Pathway
description: The firm-side three-stage pathway that produces an Active §32 attestation for a restricted-segment client
---

# Section 32 Attestation Entry Pathway

For clients in a §3 restricted segment (per Julian's CLR memorandum §3 — construction with retention, retainer-billed services, SaaS subscription, real-estate developers, and similar regulated categories), CoralLedger Comply requires an `Active` §32 attestation before a return can be lodged. This page describes the **firm-side pathway** that creates that attestation.

The pathway runs **once per `(client, BICA-licensed practitioner)` pair**. Once an attestation is `Active`, subsequent returns for that client reuse it — see [Section 32 Attestation Overview](/docs/attestation/) for the full lifecycle reference.

:::info This is the only Razor path that creates an attestation
The Regulatory Acknowledgement modal at the end of this pathway is the only user-facing surface in Comply that writes the `ATTESTATION_CREATED` audit event. Other lifecycle events (`ATTESTATION_SUPERSEDED`, `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE`) reach the audit ledger today only via API-side flows or implicitly via this pathway.
:::

## Where this pathway lives

| Stage | Route | Surface |
|---|---|---|
| 1 — Carve-out qualification | `/firm/clients/{ClientId}/attest` | Carve-Out Qualifying Screen |
| 2 — Modal capture | `/clients/{id}?beginAttestation=true` | Regulatory Acknowledgement Modal (hosted by Client Details) |
| 3 — Persisted | _(server-side)_ | `AttestationService.CreateAttestationAsync` writes the row + the audit event |

You enter the pathway from the Firm Portal landing's `Pending Re-attestations` KPI card (which filters the client grid to the affected clients) or from a client's row action when their attestation is missing or stale.

## Stage 1 — Carve-out Qualifying Screen

The qualifying screen asks two questions to determine whether the client falls into a **hard-refusal carve-out** before the practitioner invests time in the modal.

If the practitioner's answers indicate a carve-out scenario:

- The screen presents a **Record Deferral & Return to Client** action.
- Clicking it persists a `CarveOut` evaluation against the client.
- The carve-out blocks attestation creation for this client. No `ATTESTATION_*` event fires.
- The practitioner returns to the client's dashboard without attesting.

If the answers indicate a clear assessment:

- The screen presents a **Proceed to Attestation** action.
- Clicking it navigates to `/clients/{id}?beginAttestation=true`, which auto-opens the Regulatory Acknowledgement modal on the Client Details page.

The two-question shape and the carve-out scenarios themselves are tracked separately in the canonical §32 SPEC. The qualifying screen is the gate that enforces the SPEC's hard-refusal rule.

## Stage 2 — Regulatory Acknowledgement Modal

The modal is hosted by the Client Details page (`ClientDetails.razor` auto-opens it when the `?beginAttestation=true` query parameter is present). It is the actual capture surface for the §32 attestation.

The modal exposes four actions:

| Action | What it does | Audit event |
|---|---|---|
| **Verify BICA** | Calls the BICA registry verification (or the documented manual-fallback path) to confirm the practitioner's BICA licence | BICA-side event (not part of the §32 lifecycle) |
| **Submit / Sign Attestation** | Calls `AttestationService.CreateAttestationAsync` to persist the attestation row and write the lifecycle audit event | **`ATTESTATION_CREATED`** (+ implicit `ATTESTATION_SUPERSEDED` if a prior `Active` row existed for the same `(BusinessId, PractitionerUserId)`) |
| **Cancel / Close** | Closes the modal without creating the attestation; records the cancellation for audit hygiene | `ATTESTATION_MODAL_CANCELLED` |
| **Notify me when ready** (unauthored-variant path) | Closes the modal with a deferred-completion intent | `ATTESTATION_MODAL_CANCELLED` |

`ATTESTATION_MODAL_CANCELLED` is a hygiene event — it captures user intent ("I started attestation but did not complete it"), not a lifecycle transition. The next attempt at attestation runs fresh.

## Stage 3 — What gets persisted

When the practitioner clicks **Submit**, `AttestationService.CreateAttestationAsync` runs inside a single retry-safe transaction:

1. If a prior `Active` attestation exists for the same `(BusinessId, PractitionerUserId)`, it is moved to `Superseded` status with `SupersededAt` set + the new attestation id linked.
2. The new attestation row is persisted with `AttestationStatus = Active`, the captured variant body text (verbatim), and a `TextVersionHash` computed from `BodyId|Version|BodyText`.
3. BICA-licence metadata is captured (number, verification status, verified-at timestamp, practitioner name).
4. The `ATTESTATION_CREATED` audit-ledger entry is written best-effort post-commit (per the project's "DB row is persisted; ledger entry missed" pattern documented for the audit ledger).

The practitioner is returned to the Client Details page. The Pending Re-attestations count on the Firm Portal landing drops by one for this client.

## What this pathway does NOT do

The pathway covers attestation creation for the current `(client, practitioner)` pair. It does **not** cover:

- **Explicit supersession** via `AttestationService.SupersedeAsync` — that method exists in the service layer but has no Blazor UI caller today. Supersession reaches the audit ledger only implicitly, via Create-superseding-a-prior-Active.
- **Explicit voiding** via `AttestationService.VoidAsync` (single-attestation) — also no UI caller; reached only via the batch path below.
- **Batch voiding on reassignment** via `WorkloadDistributionService.ReassignClientAsync` → `AttestationService.VoidAttestationsAsync` — invoked **today** only by the `AccountingFirmController` API endpoint, not by any Blazor UI. The Clients grid row action "Reassign practitioner" is a coming-soon UI stub.

So if you are reading audit-trail entries that include `ATTESTATION_SUPERSEDED` or `ATTESTATION_VOIDED_BY_ASSIGNMENT_CHANGE` events, those entries were produced either implicitly by a re-attestation through this pathway or by an API-driven reassignment, not by a button on a Comply page that an end user clicked.

## Read-side state discovery is separate

The `ATTESTATION_RE_ATTEST_REQUIRED` event also exists in the audit ledger. It is **not** written by this pathway — it is written by the read-side check (`AttestationService.IsReAttestationRequiredAsync`) when the page-load lookup detects either:

- No `Active` attestation for the `(client, practitioner)` pair
- An `Active` attestation whose `TextVersionHash` no longer matches the current canonical body text

The check fires from the Client Details page load and from the Firm Portal landing's Pending Re-attestations count. Treat it as **state-discovery**, not state-transition.

## When this pathway is required

The pathway runs when:

- The client is in a §3 restricted segment (per Julian's CLR memorandum §3); AND
- There is no `Active` attestation for the current practitioner against that client; OR
- The existing `Active` attestation's body text has drifted (re-attestation required).

For clients not in a restricted segment, only the **per-return Signatory Capacity Declaration** at filing time is required — captured in the [Filing Wizard](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture), not here. See [Section 32 Attestation Overview](/docs/attestation/) for the distinction between the two artefacts.

## Next steps

- [Section 32 Attestation Overview](/docs/attestation/) — the lifecycle reference (states, integration points, when each artefact applies)
- [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation) — runtime enforcement when the attestation gate fires on transaction posting
- [Filing Wizard](/docs/vat-returns/filing-wizard) — the per-return Signatory Capacity Declaration that runs on every return
- [Firm Portal](/docs/firm-portal/) — the Pending Re-attestations KPI card that surfaces clients needing this pathway
