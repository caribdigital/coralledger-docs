---
sidebar_position: 5
title: Bad Debt Relief
description: Claim VAT relief on invoices that remain unpaid for 12 months or more
---

# Bad Debt Relief

Bad Debt Relief allows VAT-registered businesses to reclaim VAT already paid to the government on invoices that remain unpaid for **12 months or more**. CoralLedger Comply tracks eligible debts automatically and guides you through the claim process.

:::info Legal Basis
Bad Debt Relief is governed by the **VAT Act (The Bahamas)**, which permits a registered person to make a deduction in a subsequent VAT return once a debt meets the statutory criteria.
:::

## What Qualifies as a "Bad Debt"

A debt qualifies for relief when **all** of the following conditions are met:

| Condition | Detail |
|-----------|--------|
| **Age** | The debt is at least 12 months overdue from the original invoice due date |
| **VAT already remitted** | Output VAT on the original supply was declared and paid to the Comptroller |
| **Collection efforts** | Reasonable steps were taken to recover the debt (documented attempts required) |
| **Written off** | The debt has been formally written off in your accounting records |
| **No consideration received** | No full or partial payment has been received against the invoice |

:::warning Partial Payments
If a partial payment has been received, only the VAT attributable to the **unpaid portion** is eligible for relief.
:::

## 12-Month Tracking Workflow

CoralLedger Comply automatically monitors outstanding invoices and advances them through the following stages:

### Stage 1: Overdue Monitoring (0–11 months)
- Unpaid invoices appear in the **Accounts Receivable** ageing report
- The system records the original invoice date, due date, and VAT amount
- No action is required at this stage

### Stage 2: Approaching Eligibility (Month 10–11)
- CoralLedger flags invoices that will reach the 12-month threshold within 60 days
- An **alert** appears on the Compliance dashboard recommending you review and document collection efforts
- Ensure collection attempts are recorded before the debt becomes eligible

### Stage 3: Eligible for Relief (Month 12+)
1. Navigate to **Compliance > Bad Debt**
2. The dashboard lists all debts that have met the 12-month threshold
3. Each entry shows:
   - Original invoice number and date
   - Customer/debtor name
   - Invoice value (gross and net)
   - Original VAT amount
   - Relief amount available
4. Review and confirm each eligible debt
5. Click **Mark as Written Off** to formally write off the debt in CoralLedger

### Stage 4: Include in VAT Return
Once debts are written off, the relief amount is automatically included in your next VAT return. See [VAT Return Impact](#vat-return-impact) below.

## VAT Return Impact

Bad Debt Relief reduces your net VAT payable by decreasing the **Output VAT** you owe for the period in which the debt is written off.

### DIR Form Line Items

| Line | Description | Effect |
|------|-------------|--------|
| **L16** | Bad Debt Relief — Output VAT adjustment | Negative adjustment reducing output tax |
| **L21** | Net VAT (Output minus Input minus adjustments) | Reduced by the relief amount |

The relief appears as a **credit adjustment** on your return. If Output VAT minus Input VAT minus Bad Debt Relief results in a negative figure, the excess may carry forward or be refunded subject to the [50% zero-rated refund eligibility rule](/docs/compliance/vat-2025-reforms#refund-eligibility-50-rule).

### Worked Example

| Item | Amount |
|------|--------|
| Output VAT for period | $5,000 |
| Input VAT for period | $3,000 |
| Bad Debt Relief (L16) | −$800 |
| **Net VAT Payable** | **$1,200** |

## Relationship to Input Tax Apportionment

Where a business makes both taxable and exempt supplies, input tax must be **apportioned** between them. Bad Debt Relief operates on the **output tax** side of the return and is not subject to the same apportionment rules.

However, you should be aware of the following interactions:

- If the original supply giving rise to the bad debt was **zero-rated or exempt**, there was no output VAT to remit, and therefore no relief is available
- If the original supply was **partially exempt**, only the VAT fraction attributable to taxable supplies is eligible
- Relief claimed does not affect your **Input Tax Apportionment ratio** for the current period

## Reporting and Audit Trail

CoralLedger Comply maintains a complete audit trail for every bad debt claim:

### Bad Debt Relief Report

Navigate to **Compliance > Bad Debt > Reports** to access:

| Report | Contents |
|--------|----------|
| **Eligible Debts Summary** | All debts meeting the 12-month threshold, grouped by period |
| **Written-Off Debts** | Confirmed write-offs with relief amounts claimed |
| **Claim History** | Period-by-period history of all relief amounts included in returns |
| **Outstanding Monitoring** | Debts currently being tracked (0–11 months) |

### What Is Recorded per Claim

Each bad debt claim records:
- Original invoice number, date, and due date
- Debtor name and VAT registration number (if applicable)
- Gross amount, VAT amount, and relief amount claimed
- Date the debt was written off in CoralLedger
- The VAT return period in which relief was included
- User who performed the write-off (immutable audit log)

### Supporting Documentation Required

The Comptroller may request supporting evidence during an audit. Retain:
- Original invoice copy
- Evidence of VAT remittance (filed return showing the original output tax)
- Correspondence or records evidencing collection efforts
- Internal write-off authorisation or accounting journal entry

CoralLedger automatically links the original transaction and return period to each claim, making this evidence readily exportable.

## Step-by-Step Claim Guide

1. Go to **Compliance > Bad Debt**
2. Review the **Eligible Debts** tab — only debts ≥ 12 months overdue appear here
3. For each debt, confirm:
   - Collection efforts are documented
   - The debt has been written off in your books
4. Select the debt(s) to claim and click **Write Off & Claim Relief**
5. The system calculates the relief amount and schedules it for your next return
6. When you generate your next VAT return, the relief amount populates **Line 16** automatically
7. Review the figure in the [Return Preview](/docs/vat-returns/return-preview) before submitting
8. After filing, the claim appears in the **Claim History** report with the return reference

## Frequently Asked Questions

**Can I claim Bad Debt Relief on a debt that was later paid?**
No. If a debtor subsequently pays after you have claimed relief, you must repay the VAT to the Comptroller by including the amount as output VAT in the return for the period in which payment was received. CoralLedger alerts you if a written-off debt receives a payment.

**What if the debt is partially paid before 12 months?**
You cannot claim relief until the full 12-month period has elapsed from the original due date. However, when the 12-month threshold is reached, you may claim relief on the outstanding balance only.

**Is there a time limit for making a claim?**
Claims should be made as soon as the debt qualifies. There is no indefinite carry-forward — consult your tax advisor for the applicable limitation period under the VAT Act.

**How do I record collection efforts?**
Attach documentation in the **Notes & Attachments** section of the transaction or use the debt record in the Bad Debt dashboard. Acceptable evidence includes demand letters, email correspondence, and evidence of legal proceedings.

## Next Steps

- [View your VAT return impact](/docs/vat-returns/generate-return)
- [Understand Input Tax Apportionment](/docs/compliance/vat-2025-reforms)
- [Check your compliance score](/docs/compliance/compliance-score)
- [Explore the 2025 VAT reforms](/docs/compliance/vat-2025-reforms)
