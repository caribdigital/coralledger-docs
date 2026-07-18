---
sidebar_position: 5
title: Bad Debt Relief
description: Claim VAT relief on supplies you have written off as bad debts
---

# Bad Debt Relief

import DemoVideo from '@site/src/components/DemoVideo';

<DemoVideo src="demos/07-bad-debt.mp4" poster="demos/07-bad-debt-poster.jpg" title="Bad debt relief dashboard" />

Bad Debt Relief allows VAT-registered businesses to reclaim VAT already paid to the government on supplies that have been **written off as bad debts**. CoralLedger Comply surfaces long-outstanding debts for your review and guides you through writing them off and claiming the relief.

:::info Legal Basis
Bad Debt Relief is governed by [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 53 (post-supply adjustment due to bad debt). Under **s. 53(3)** the relief arises on the **date the bad debt is written off in the registrant's accounts** — there is **no 12-month threshold** in s. 53. The 12-month age that Comply uses to *surface* candidate debts is a convenience prompt, not the statutory trigger.
:::

## What Qualifies as a "Bad Debt"

Relief becomes available when a debt is **written off in your accounts** (s. 53(3)), provided:

| Condition | Detail |
|-----------|--------|
| **Written off** | The debt has been formally written off in your accounting records — this is the event that makes relief available under s. 53(3) |
| **VAT already remitted** | Output VAT on the original supply was declared and paid to the Comptroller |
| **Collection efforts** | Reasonable steps were taken to recover the debt (documented attempts required) |
| **No consideration received** | No full or partial payment has been received against the invoice |

:::note The 12-month age is a prompt, not the trigger
Comply surfaces debts that are more than 12 months outstanding as **candidates** to consider writing off, shown as a **"Review From"** date. Reaching 12 months does not by itself make a debt eligible — relief becomes available when you write the debt off in your accounts.
:::

:::warning Partial Payments
If a partial payment has been received, only the VAT attributable to the **unpaid portion** is eligible for relief.
:::

## Bad Debt Tracking Workflow

CoralLedger Comply monitors outstanding invoices and advances them through the following stages:

### Stage 1: Overdue Monitoring
- Unpaid invoices appear in the **Accounts Receivable** ageing report
- The system records the original invoice date, due date, and VAT amount
- No action is required at this stage

### Stage 2: Surfaced for Review ("Review From")
- CoralLedger surfaces invoices that have been outstanding for more than 12 months as **candidates** to consider writing off, shown with a **"Review From"** date
- An **alert** appears on the Compliance dashboard recommending you review and document collection efforts
- This is a prompt to review — it does **not** by itself make the debt eligible for relief

### Stage 3: Review and Write Off
1. Navigate to **Compliance > Bad Debt**
2. The dashboard lists surfaced candidate debts. Each entry shows:
   - Original invoice number and date
   - Customer/debtor name
   - Invoice value (gross and net)
   - Original VAT amount
   - Relief amount available on write-off
3. Confirm collection efforts are documented for each debt
4. Click **Mark as Written Off** to formally write off the debt in CoralLedger — this is the event that makes the relief available under s. 53(3)

### Stage 4: Include in VAT Return
Once debts are written off, the relief amount is queued for inclusion in your next VAT return. See [VAT Return Impact](#vat-return-impact) below.

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
| **Candidate Debts Summary** | All surfaced candidate debts (more than 12 months outstanding), grouped by period |
| **Written-Off Debts** | Confirmed write-offs with relief amounts claimed |
| **Claim History** | Period-by-period history of all relief amounts included in returns |
| **Outstanding Monitoring** | Debts currently being tracked |

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

CoralLedger links the original transaction and return period to each claim, making this evidence readily exportable.

## Step-by-Step Claim Guide

1. Go to **Compliance > Bad Debt**
2. Review the **Candidate Debts** tab — debts surfaced for review (more than 12 months outstanding) appear here
3. For each debt, confirm:
   - Collection efforts are documented
   - The debt is being written off in your books
4. Select the debt(s) to claim and click **Write Off & Claim Relief**
5. The system calculates the relief amount and schedules it for your next return
6. When you generate your next VAT return, the relief amount is placed into **Line 16**
7. Review the figure in the [Return Preview](/docs/vat-returns/return-preview) before submitting
8. After filing, the claim appears in the **Claim History** report with the return reference

## Frequently Asked Questions

**Can I claim Bad Debt Relief on a debt that was later paid?**
No. If a debtor subsequently pays after you have claimed relief, you must repay the VAT to the Comptroller by including the amount as output VAT in the return for the period in which payment was received. CoralLedger alerts you if a written-off debt receives a payment.

**What if the debt is partially paid?**
Relief is available only on the **unpaid portion**. Write off the outstanding balance in your accounts and the relief is calculated on the VAT attributable to that unpaid amount.

**Is there a time limit for making a claim?**
Claims should be made as soon as the debt qualifies. There is no indefinite carry-forward — consult your tax advisor for the applicable limitation period under Bahamas VAT law.

**How do I record collection efforts?**
Attach documentation in the **Notes & Attachments** section of the transaction or use the debt record in the Bad Debt dashboard. Acceptable evidence includes demand letters, email correspondence, and evidence of legal proceedings.

## By Statute References

- [Bad Debt Relief](/docs/statutes/bad-debt-relief)

## Next Steps

- [View your VAT return impact](/docs/vat-returns/generate-return)
- [Understand Input Tax Apportionment](/docs/compliance/vat-2025-reforms)
- [Check your compliance score](/docs/compliance/compliance-score)
- [Explore the 2025 VAT reforms](/docs/compliance/vat-2025-reforms)
