---
sidebar_position: 4
title: Batch Filing
description: File VAT returns for multiple clients in a single workflow — the four-step wizard, the all-or-nothing readiness gate, and the regulatorily significant differences from single-client filing
---

# Batch Filing

Batch Filing lets a firm process VAT returns for many clients in a single coordinated workflow. It is intended for the natural end-of-period flow where dozens of returns share a deadline and per-client validation would be repetitive.

Before you read the workflow, two regulatory framings matter:

:::warning Batch filing does not capture per-client §61 acknowledgement or per-client signatory capacity
The [single-client Filing Wizard](/docs/vat-returns/filing-wizard) captures a §61 penalty acknowledgement and a signatory capacity declaration per return. The batch flow uses a **single batch-wide consent checkbox** and does not capture either per-client. For clients in a §3 restricted segment, route them through the single-client Filing Wizard instead so the per-return Signatory Capacity Declaration runs.
:::

:::warning Batch filing does not verify §32 attestation status today
The current `BatchFilingValidationService` runs the 10-point pre-flight check per client but does **not** read attestation state. A restricted-segment client with no `Active` §32 attestation can pass the batch readiness gate. Until the §32 check is integrated into batch validation (tracked in a Comply repo follow-up), file restricted-segment clients individually through the [Filing Wizard](/docs/vat-returns/filing-wizard) so the attestation prefill gate runs.
:::

These framings reflect what the app does today, not what it ought to do. Both warnings will retire when the corresponding Comply implementation work lands.

## When to use Batch Filing

- Many clients share a quarterly or monthly deadline and are all ready (no blocking validation errors).
- The clients are **not** in §3 restricted segments — i.e. they don't require an active §32 attestation.
- The clients have been recently validated and you expect the batch to pass cleanly.

For high-stakes returns (restricted-segment, large net VAT exposure, recent compliance issues) prefer the single-client Filing Wizard so the per-return §61 / signatory capture and attestation gates run.

## Accessing Batch Filing

Navigate to **Firm Portal → Batch VAT Filing** (the quick action on the landing page) or directly to `/firm/batch-filing`.

## The four-step wizard

| Step | Internal id | What you do |
|---|---|---|
| **1 — Select Clients** | _selection_ | Pick the clients to include from the eligible-clients grid |
| **2 — Preview** | FIRM-007 | Review the per-client readiness summary — totals, status, blocking errors / warnings |
| **3 — Confirm** | FIRM-008 | Tick the batch-wide consent checkbox and submit |
| **4 — Report** | FIRM-009 | Read the per-client outcome report; download or retry failures |

### Step 1 — Select Clients

The eligible-clients grid lists clients with returns visible for the current period. Use the filter controls (filing period, status, staff assignment, compliance score) to narrow the list. Tick the clients you want in the batch.

The grid surfaces each client's current readiness inline so you can spot problems before progressing.

### Step 2 — Preview

For each selected client, Comply runs the same 10-point pre-flight validation that the single-client Filing Wizard runs. Each client gets a **readiness level**:

| ReadinessLevel | Meaning |
|---|---|
| **Ready** | All 10 validations pass; the client can be filed in this batch |
| **Warning** | Validations passed with warnings (e.g. a near-deadline filing); you can choose to proceed |
| **NotReady** | One or more blocking validations failed; the client cannot be included until resolved |
| **AlreadyFiled** | A return for this client / period combination has already reached `Lodged` — no action needed |

You can deselect NotReady or AlreadyFiled clients here.

### Step 3 — Confirm

This step's confirmation checkbox is the **single batch-wide consent**. It is not a per-client §61 acknowledgement and it is not a signatory capacity declaration — both of those artefacts are captured per-return only in the single-client Filing Wizard.

:::warning All-or-nothing refusal
**If any selected client has a blocking validation error at submit time, the entire batch is refused.** Comply does not start the batch and silently skip NotReady clients — it stops with a clear error so you can re-triage. Remove NotReady clients from the selection or resolve their blocking errors before retrying.
:::

### Step 4 — Report

After the batch completes, Comply renders a per-client outcome report:

- **Succeeded** — return was lodged in Comply via the firm's signature; reference numbers (`VAT-YYYYMMDD-XXXXXXXX`) are listed
- **Failed** — return failed to lodge; the per-client error is shown so you can retry individually
- **Skipped** — the client was selected but Comply skipped it (rare; typically a race condition)

You can download the batch report and retry individual failures from this surface.

## What gets persisted

Per-client, the batch flow goes through the same lifecycle as a single-client filing — `Draft → ReadyToFile → FilingInProgress → AwaitingDirConfirmation`. Each client's return moves into `AwaitingDirConfirmation` after batch artifact generation succeeds.

To complete the lifecycle to `Lodged`, you must subsequently capture the DIR Acknowledgement per client through the [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement) flow on each return — **the batch surface does not record DIR lodgement.** The batch reaches the artefacts-ready point only.

This intentional split keeps the lodgement audit entry (`RETURN_LODGED_WITH_DIR`) accurate per client — each lodgement has its own date, method, reference number, and artefact checksums.

## Audit events

The batch services themselves do not write batch-level audit events. The per-client filing operations they invoke write the normal single-client audit set (`FILING_INITIATED`, `FILING_ARTIFACTS_GENERATED`). The Audit Trail for each client reflects exactly what happened, whether it was reached via single-client or batch filing.

## Reporting

The Multi-Client Reports surface (`/firm/reports`) shows batch-filing activity aggregated with single-client filings — there is no separate batch-history surface today. Filter by date range or by client to see what landed in a given window.

## Next steps

- [Filing Wizard](/docs/vat-returns/filing-wizard) — single-client filing where per-client §61 acknowledgement + signatory capture happen
- [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement) — the post-artefacts lodgement capture (per client, not batched)
- [Firm Analytics](/docs/firm-portal/analytics) — cross-client reporting context
- [§32 Attestation Entry Pathway](/docs/firm-portal/attestation-entry-pathway) — for restricted-segment clients that the batch flow does not gate
