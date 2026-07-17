---
sidebar_position: 4
title: Second-Pass Audit Memo (DS-012)
description: Signed second-pass regulatory audit memo for the remaining documentation categories
---

# Second-Pass Audit Memo (DS-012)

## Scope

This memo records the DS-012 second-pass regulatory-content audit across the previously unaudited public documentation sections. The pass checked each section against:

- REQ-MSG-001 banned-vocabulary restrictions and later Iron Dome extensions
- Four-category VAT framing (Standard, Reduced, Zero-Rated, Exempt)
- Statutory citation hygiene using the canonical citation style
- The internal CLR memo §3 vs. [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32 distinction

### Sections audited in this pass

1. Getting Started
2. Transactions
3. Compliance
4. Reports
5. Security
6. Data Operations
7. Audit Trail
8. Billing & Licensing
9. Integrations
10. Settings
11. Reference
12. By Statute

Excluded from this pass: VAT Returns, Section 32 Attestation, and Firm Portal (covered under separate Phase 1 / Phase 2 trackers).

## Findings Summary

| Section | Result | Notes |
| --- | --- | --- |
| Getting Started | Clean | No DS-012 drift identified in the public onboarding and dashboard guidance. |
| Transactions | Clean | §32 tax-point guidance stays distinct from the attestation pathway and preserves four-category VAT framing. |
| Compliance | Clean | Four-category VAT framing remains explicit; no three-rate or Exempt-collapsed-into-Zero-Rated language found. |
| Reports | Clean | No regulatory-content drift identified. |
| Security | Clean | No DS-012 regulatory-content drift identified. |
| Data Operations | Clean | Record-retention and legal-hold guidance remains aligned with the existing statutory canon. |
| Audit Trail | Clean | Audit-event documentation remains distinct from filing and attestation rules. |
| Billing & Licensing | Clean | No regulatory-content drift identified. |
| Integrations | Clean | No DS-012 regulatory-content drift identified. |
| Settings | Clean | No regulatory-content drift identified. |
| Reference | Clean after memo refresh | Updated stale memo language so the reference set matches the current audit record and amended-chain canon. |
| By Statute | Clean after citation-hygiene fixes | Replaced shorthand statutory-basis lines and removed stale pending-validation placeholders so the statute pages now use canonical section-specific citations. |

## Changes Applied During This Pass

- Updated the By Statute axis to use canonical statutory-basis citations instead of shorthand `VAT Act §...` labels.
- Replaced stale pending-validation placeholders on the tax-invoice, audit-powers, and refunds pages with section-specific statutory references.
- Refreshed this memo so it records the actual DS-012 scope rather than the earlier placeholder category list.

## Verification

Signed audit memo confirming second-pass coverage of all 12 DS-012 sections:

- **Cass** — Documentation audit lead
- **Julian** — Documentation audit reviewer

**Signed on:** 2026-06-01 (UTC)


---

## Addendum — 2026-07-17 second-pass (DS-012 execution)

The DS-012 "second-pass audit" this memo scoped was executed on 2026-07-17 as a full
code-verification sweep (docs revision `revise/accuracy-2026-07`). The "Clean" verdicts above
did not fully hold: material drift was found and corrected in `compliance/index.md` (banned
vocabulary), `compliance/compliance-score.mdx` (scoring factors/weights, missing B+ grade,
missing Not Yet Assessed state), `compliance/intelligence-dashboard.md` (nonexistent C+ grade,
internal endpoints framed as a customer API), `reports/scheduled-reports.md` (fabricated report
types, delivery methods, and limits), the settings cluster (session management, quiet hours,
login history, secondary email), `transactions/import-csv.mdx` (pre-redesign import flow),
`billing/licensing.md` (tier names, on-premise claim), `getting-started/self-filing.md`
(fabricated settings path), and `firm-portal/user-management.md` (endpoint path). Findings that
require regulatory reads (statute pinpoints outside the PRIMARY canon) were routed to Cass and
Julian rather than edited. This memo remains the historical 2026-06-01 record.
