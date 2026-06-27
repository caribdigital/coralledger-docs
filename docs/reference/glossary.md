---
sidebar_position: 3
title: Glossary
description: VAT and compliance terminology
---

# Glossary

Common terms used in Bahamas VAT compliance.

## A

### Audit Trail
A chronological record of all changes made to transactions, categories, and VAT returns in CoralLedger Comply. The trail is kept in two complementary surfaces: the per-business log (`/reports/audit`) and the cross-tenant viewer (`/ops/audit`, PlatformAdmin only). See [Audit Trail](/docs/audit/).

### Attestation Lifecycle (§32 admin)
The persistent record that a BICA-licensed practitioner has accepted the §32 attestation body text for a specific client. Has its own state machine (Active → Superseded / VoidedByAssignmentChange) and is distinct from the per-return Signatory Capacity Declaration captured at filing time. Required for §3 restricted-segment clients. See [§32 Attestation Overview](/docs/attestation/).

### Awaiting Lodgement
The displayed label for the `AwaitingDirConfirmation` state — the return's artefacts (PDF / XML / Excel / Form 301) are generated and you now record the DIR lodgement externally. See the [VAT Returns lifecycle](/docs/vat-returns/).

## B

### Bad Debt Relief
A provision (VAT Act s. 53(3)) allowing businesses to claim back VAT on supplies they have written off as bad debts in their accounts. CoralLedger Comply surfaces long-outstanding debts (more than 12 months) as candidates to review and write off.

### Breadbasket Items
Essential food items eligible for the reduced 5% VAT rate when sold by licensed food stores.

## C

### Construction VAT
The reverse charge mechanism for construction services exceeding $1 million. Part of the 2025 VAT reforms.

### Comptroller
The Comptroller of the Department of Inland Revenue, responsible for VAT administration in The Bahamas.

### Compliance Score
A grade (A+ to F) indicating your VAT compliance health based on categorization accuracy, filing timeliness, documentation, and anomaly resolution.

## D

### DIR
Department of Inland Revenue - the government agency responsible for tax collection including VAT.

### DIR Acknowledgement
The user-captured record in Comply that confirms a return has been lodged with the DIR. Recorded in the Record DIR Acknowledgement dialog with date, method (DIR Online Portal / Walked into DIR Office / Authorised Agent / Other), optional reference number, and an acknowledgement checkbox. See [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement).

## E

### Exempt Supply
Goods or services that are outside the VAT system. No VAT is charged and no input VAT can be recovered.

## F

### Filing Wizard
The 5-step in-app flow that finalises a VAT return — Transaction Review → VAT Validation → Document Generation → **Approval** (§61 acknowledgement + signatory capture) → Submission. See [Filing Wizard](/docs/vat-returns/filing-wizard).

### Food Store License
A licensed food store qualification for VAT purposes.

In current Bahamas food-safety law, food-business registration and oversight sit with the Bahamas Agricultural Health and Food Safety Authority (BAHFSA), not the Ministry of Health.
See [Bahamas Agricultural Health and Food Safety Authority Act, 2016](http://laws.bahamas.gov.bs/cms/images/LEGISLATION/PRINCIPAL/2016/2016-0004/2016-0004.pdf), s. 4; [Food Safety and Quality Act, 2016](https://laws.bahamas.gov.bs/cms/images/LEGISLATION/PRINCIPAL/2016/2016-0005/2016-0005_1.pdf), ss. 25-27.

## I

### Input VAT
VAT paid by a business on purchases that can be claimed as a credit against output VAT.

### Immutable Audit Ledger
The append-only audit trail surface backed by `IImmutableAuditLedgerService`. Every regulatorily significant event in Comply (filing initiation, lodgement, attestation lifecycle, etc.) writes to this ledger. See [Audit Trail](/docs/audit/).

### Invoice
A document recording a taxable supply, which must include specific information for VAT purposes.

## L

### Lodged
The displayed label for the `Lodged` state — DIR Acknowledgement has been captured and `RETURN_LODGED_WITH_DIR` written to the audit ledger. For payable returns the next state is `Lodged & Paid` after payment is recorded; for credit/zero returns the state advances automatically. See the [VAT Returns lifecycle](/docs/vat-returns/) and [Record DIR Acknowledgement](/docs/vat-returns/record-dir-acknowledgement).

### Lodged & Paid
The terminal state for a payable return — cumulative payments equal or exceed the Net VAT due. Credit/zero returns reach this state automatically immediately after `Lodged` per the VR-STATE-001 invariant.

## O

### Output VAT
VAT collected by a business on sales that must be remitted to the Comptroller.

## P

### Pending Re-attestation
A KPI surfaced on the Firm Portal landing that counts clients whose `(client, practitioner)` pair has no `Active` §32 attestation, or whose existing attestation's body-text version hash has drifted. Clicking the KPI navigates to the filtered client grid for triage. See [Firm Portal](/docs/firm-portal/).

### Practitioner of Record
The BICA-licensed practitioner holding an `Active` §32 attestation for a client business. Determined by a correlated EXISTS check across `ClientAssignment` (active workload) AND `Attestation` (active regulatory authority) — both gates must pass. See [§32 Attestation Overview](/docs/attestation/) and [Practitioner Revocation Gate](/docs/attestation/practitioner-revocation).

## R

### Refund Eligibility
Businesses where 50% or more of supplies are zero-rated may be eligible for VAT refunds. CoralLedger Comply monitors this threshold.

### Registrant
A business registered for VAT with the Department of Inland Revenue.

### Restricted Segment (§3)
A client classification (per Julian's CLR memorandum §3) requiring an active §32 attestation before returns can be lodged — typically construction with retention, retainer-billed services, SaaS subscription, real-estate developers. §3 here refers to the internal CLR memo section, **not** §3 of the VAT Act. See [§32 Attestation Overview](/docs/attestation/).

## S

### Signatory Capacity Declaration
The per-return capture inside the Filing Wizard's Approval step where the user records who is signing this specific return and in what capacity (`RegisteredTaxpayer`, `BicaLicensedPractitioner`, `AuthorisedEmployee`, `AuthorisedAgent`). Distinct from the persistent §32 Attestation Lifecycle. See [Filing Wizard — Step 4 Approval](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture).



### Standard Rate
The default VAT rate of 10% applied to most taxable supplies in The Bahamas.

## T

### Tax Invoice
A formal invoice that includes all VAT-required information: seller details, buyer details, TIN, VAT number, itemized amounts, VAT calculations, and total.

### TIN
Tax Identification Number - a unique number assigned to businesses by the Comptroller.

### Taxable Supply
A supply of goods or services that is subject to VAT (at 10%, 5%, or 0%).

## V

### VAT
Value Added Tax - a consumption tax on the supply of goods and services.

### VAT Number
A registration number assigned to VAT-registered businesses.

### VAT Period
The time period covered by a VAT return (monthly or quarterly).

### VAT Return
A periodic report submitted to the DIR summarizing taxable supplies and VAT collected/paid.

## V

### VR-STATE-001
The regulatory invariant (Julian-approved 2026-05-25) that every VAT return — including credit and zero-balance returns — must transition through the `Lodged` state before reaching `Lodged & Paid`. The `Lodged` event always produces a clean `RETURN_LODGED_WITH_DIR` audit row before any auto-advance to `Lodged & Paid` runs.

## W

### WORM
Write Once Read Many — a data storage compliance standard ensuring records cannot be modified or deleted after creation. CoralLedger Comply's `ImmutableAuditEntry` table is treated as append-only by the application layer; database-level WORM enforcement depends on operator configuration. See [Audit Trail](/docs/audit/).

## Z

### Zero-Rated Supply
A taxable supply where VAT is charged at 0%, but input VAT can still be recovered.

## Next Steps

- [View VAT rates](/docs/reference/vat-rates)
- [Understand categorization](/docs/transactions/categorization)
- [Audit trail](/docs/audit)
- [Security features](/docs/security)
