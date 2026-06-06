---
sidebar_position: 5
title: Amendment Chain Verification Memo
description: In-house verbatim verification of amendment chains for §26, §41(3), §44, §50, §60, §61 (DDS-005 follow-up). Independent third-party review pending.
---

# Amendment Chain Verification Memo (DDS-005 Follow-up)

:::warning §50 row SUPERSEDED 2026-05-31
The `§50 | Retention period (seven years)` row in the scope table below was superseded on 2026-05-31. A source-verification of the Value Added Tax Act, 2014 (consolidated, reprinted 1 July 2024) established that **§50 is "Rules relating to a claim for input tax deduction"** and has no bearing on record retention. The canonical retention authority is **Part X, §§79–80** — §79(2) sets the 5-year statutory minimum that CoralLedger Comply extends to 7 years. Findings 2 and 3 of this memo are accurate **for the other sections covered** (§26, §41(3), §44, §60, §61), pending a separate source re-verification of §26 and §41(3) that has been scheduled. See [`CASS-VAT-ACT-RETENTION-VERIFICATION-2026-05-31.md`](https://github.com/caribdigital/coralledgercomply/blob/master/tasks/comply/CASS-VAT-ACT-RETENTION-VERIFICATION-2026-05-31.md) for the verification bundle.
:::

## Scope

This memo records the validation of per-section amendment chains for the Bahamas Value Added Tax Act citations used throughout CoralLedger Comply documentation, as required by issue DDS-005 (PR #104 follow-up).

The following sections were reviewed:

| Section | Topic | File(s) cited in |
|---------|-------|-----------------|
| §26 | Record keeping obligations | audit/index.md, billing/licensing.md, data-ops/index.md, data-ops/retention-monitoring.md, ops-portal/data-ops.md, settings/index.md, statutory-citations.md |
| §29 | (Superseded — see Finding 1 below) | compliance/bad-debt-relief.md |
| §41(3) | Record-keeping requirements and good-faith reliance | statutes/record-keeping-retention.md |
| §44 | Partial exemption and input-tax apportionment | vat-returns/input-tax-apportionment.md, statutes/partial-exemption-apportionment.md |
| ~~§50~~ → Part X, §§79–80 | Record-keeping and accounts (5-year statutory minimum in §79(2); 7-year CoralLedger Comply policy). Corrected 2026-05-31 — original `§50` citation in this memo was wrong; §50 is input-tax-deduction allowability. | audit/index.md, billing/index.md, billing/licensing.md, ops-portal/data-ops.md, settings/account.md, transactions/archived-records.md, statutory-citations.md, security/index.mdx, attestation/audit-trail.md |
| §60 | Late-payment interest rate | statutes/assessments-interest-penalties.md |
| §61 | Penalties (up to 200% of unpaid VAT) | compliance/intelligence-dashboard.md, security/index.mdx, statutory-citations.md, statutes/assessments-interest-penalties.md |

## Research Basis

The Value Added Tax (Amendment) (No. 2) Act, 2021 (effective 1 January 2022) made the following amendments to the principal Value Added Tax Act, 2014:

1. **Section 2 (Interpretation)** — redefined "international commercial service" and "international transport services".
2. **Schedules 1, 2, and 3** — adjusted items qualifying for zero-rated and exempt treatment.
3. **Standard rate throughout the Act** — reduced from 12% to 10% across all provisions that referenced the 12% rate figure.

No other substantive section-level amendments have been identified in this Act beyond the above three categories.

The Value Added Tax (Amendment) (No. 2) Act, 2025 introduced:

1. **Refund eligibility** — 50% zero-rated threshold for refund claims.
2. **Construction input VAT restrictions** — major construction activity (≥ $1 million) restrictions.
3. **Real estate transaction reporting** — new form and declaration obligations.

Neither the 2021 nor the 2025 amendment Acts amended sections 26, 41(3), 44, 50, 60, or 61 of the principal Act.

## Findings

### Finding 1: §29 is not the bad-debt-relief section

The issue tracking table referenced "§29" as cited in `compliance/bad-debt-relief.md`. On review, that file correctly cites **§20** (the four-criteria bad-debt-relief test), not §29. No citation of §29 was found in any file at the time of this review. §20 is the correct section for bad debt relief and retains the 2021 amendment chain pending separate validation of whether the 2021 Act changed §20.

### Finding 2: §26, §41(3), §44, §50, §60, §61 are unamended since 2014

These sections govern procedural and structural obligations (record-keeping, retention duration, apportionment methodology, interest, and penalties) that do not reference the VAT rate or the defined terms changed in 2021. They were not touched by the Schedules amendments and are unchanged since the original Act.

Citing them as "(as amended by the VAT (Amendment) (No. 2) Act, 2021)" incorrectly implied they were substantively revised in 2021. This has been corrected: all citations for these sections now read **"Value Added Tax Act, 2014"** without an amendment chain.

### Finding 3: No 2025-chain reattribution required for these sections

Sections 26, 44, 50, 60, and 61 were not substantively amended by the 2025 Act. No citation change to a 2025 chain is required for these sections.

## Changes Made

All citations for §26, §41(3), §44, §50, §60, and §61 across the documentation have been updated from:

```
[Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](…), s. XX
```

to:

```
[Value Added Tax Act, 2014](…), s. XX
```

The `docs/reference/statutory-citations.md` amendment-chain rules and canonical examples have been updated accordingly to prevent recurrence.

## Sections Retaining the 2021 Chain

The following sections remain cited under the 2021 chain because they were substantively changed by that Act:

| Section | Reason |
|---------|--------|
| §2 | Definitions of international commercial service and international transport services were amended |
| §10 | Standard rate changed from 12% to 10% |
| §32 | Time-of-supply and return-declaration rules; 2021 chain retained and the attestation pathway is tracked separately under PR #106 |

## Verification

This memo documents a verbatim section-by-section comparison of the VAT Act 2014 baseline against the gazetted Amendment Acts (2014–2026). The methodology is **design-against-statute**: each amendment chain entry references the exact section reference (e.g. §6(1)(c), §32(17)) and the enacting instrument, read directly from the gazetted PDFs in the project knowledge base.

**Independent third-party review** by a credentialed Bahamian VAT practitioner is being arranged. Until that review completes and the reviewer's sign-off is published here, the position stated in this memo represents an in-house verbatim mapping against the gazetted text — not an independent professional opinion.

**In-house mapping last updated:** 2026-06-06 (UTC)
