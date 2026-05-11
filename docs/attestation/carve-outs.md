---
sidebar_position: 10
title: Carve-Outs
description: Filing scenarios exempt from the standard Section 32 Attestation Pathway
---

# Carve-Outs

Certain VAT return types and filing scenarios are exempt from the full Section 32 Attestation Pathway. These are referred to as **carve-outs**. When a carve-out applies, the system uses an abbreviated confirmation process instead of routing the filer through the standard qualifying, variant, and affirmation steps.

:::info Carve-Outs Do Not Mean No Declaration
A carve-out exempts the filer from the full pathway — it does not exempt them from any declaration obligation. All carve-out submissions still include a simplified attestation statement and are recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail).
:::

## Qualifying for a Carve-Out

During the [Qualifying Screen](/docs/attestation/qualifying-screen), Question 3 asks whether any carve-out scenario applies. If the filer answers **Yes**, they are directed to confirm which specific carve-out applies before proceeding.

A carve-out may also be applied automatically by CoralLedger Comply based on system-detected conditions (for example, a nil return generated when no transactions exist for the period).

## Carve-Out Scenarios

### 1. Nil Returns

A **nil return** is a return filed for a period in which the business had no taxable supplies and no creditable acquisitions. Nil returns require a declaration but do not require the full qualifying and variant selection steps.

**Abbreviated declaration:**
> *I confirm that the registered person had no taxable supplies and no creditable acquisitions during the period stated in this return, and that this nil return is accurate to the best of my knowledge.*

**Eligibility conditions:**
- The return shows zero output VAT and zero input VAT
- No transactions are attached to the period
- The system has confirmed the period is complete (no pending or draft transactions)

---

### 2. Amended Returns (Within Correction Window)

An **amended return** corrects a previously submitted return. When the amendment is filed within the Comptroller-approved correction window (typically **30 days** from original submission), the abbreviated process applies.

**Abbreviated declaration:**
> *I confirm that this amended return correctly supersedes the original return for the stated period and that all changes are accurate to the best of my knowledge.*

**Eligibility conditions:**
- The original return has been submitted and accepted
- The amendment is filed within 30 days of the original submission date
- The amendment changes only the fields permitted under the correction window rules

:::warning Amendments Outside the Correction Window
Amendments filed after the 30-day correction window require the full attestation pathway and may require a separate notification to the Comptroller. Contact your tax advisor if you need to amend a return outside this window.
:::

---

### 3. Comptroller-Approved Filing Arrangements

Businesses that operate under a formal filing arrangement approved by the Comptroller of Revenue may have a modified attestation requirement specified in their arrangement. When such an arrangement is on file in CoralLedger Comply, the system applies the arrangement's conditions automatically.

**Eligibility conditions:**
- The business has an active, approved filing arrangement reference number recorded in **Settings > Business Profile**
- The return falls within the scope of the arrangement
- The arrangement has not expired

Approved arrangement details are validated against the system record at the start of every attestation session.

---

### 4. PlatformAdmin-Submitted Test Returns

Returns submitted through the Platform Operations Portal for testing purposes in a sandbox or staging environment are exempt from the standard attestation pathway. These returns are flagged as **TEST** and are never transmitted to the Comptroller.

**Eligibility conditions:**
- The submission is made by a PlatformAdmin in the Ops Portal
- The business account is marked as a **Test** or **Sandbox** tenant
- The return is explicitly flagged as a test submission

---

## Carve-Out Confirmation Screen

When a carve-out applies, the filer sees a simplified confirmation screen instead of the standard pathway:

1. The applicable carve-out scenario is displayed with a brief explanation
2. The abbreviated declaration text is shown
3. The filer checks **I confirm this declaration**
4. A password confirmation is required (except for PlatformAdmin test submissions)
5. The filer clicks **Submit Return**

## Carve-Out Audit Record

All carve-out submissions are recorded in the [Attestation Audit Trail](/docs/attestation/audit-trail) with:

| Field | Contents |
|-------|----------|
| **Carve-Out Type** | Nil / Amendment / Approved Arrangement / Test |
| **Auto-Detected** | Whether the carve-out was detected automatically or selected by the filer |
| **Arrangement Reference** | Arrangement number, if applicable |
| **Declarant** | User ID and name of the confirming party |
| **Timestamp** | UTC timestamp of the carve-out confirmation |

## Next Steps

- [Qualifying Screen](/docs/attestation/qualifying-screen)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
