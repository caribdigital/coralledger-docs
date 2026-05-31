---
sidebar_position: 3
title: Standard Declaration Variant
description: Standard Section 32 attestation for business owners and directors filing their own VAT returns
---

# Standard Declaration Variant

The Standard Declaration Variant applies when the registered business owner or director completes the attestation personally, using an in-session electronic confirmation. This is the most common attestation pathway for self-filing businesses, and corresponds to the `SignatoryCapacity.RegisteredTaxpayer` enum value in the platform.

## Who Uses This Variant

This variant is presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) determines that:

- The filer's signatory capacity is **`RegisteredTaxpayer`** (the registered business owner or director attesting personally)
- The chosen signature method is **electronic confirmation in this session**

## Declaration Text

When this variant is active, the following declaration is presented before final submission:

> *I, the undersigned, being the registered person or an officer of the registered person named in this return, hereby declare that the information provided in this VAT return and all accompanying schedules is, to the best of my knowledge and belief, true, correct, and complete. I understand that submitting a false or misleading return is an offence under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/), and may result in penalties, interest, and prosecution under s. 61 for both me and the named registered person.*

The filer must confirm this declaration by:

1. Reviewing the return summary displayed alongside the declaration text
2. Checking the **I confirm the above declaration** checkbox
3. Entering their current account password as an additional identity confirmation
4. Clicking **Submit Return**

:::info Why a Password Is Required
The password re-entry step is a standard security measure. It ensures that the person completing the attestation is the authenticated session holder — not an unattended browser session. This is consistent with the electronic signature expectation under [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32.
:::

## Validation Checks

Before the declaration is accepted, CoralLedger Comply performs the following checks:

| Check | Condition |
|-------|-----------|
| **Return completeness** | All mandatory fields in the return are populated |
| **Period lock** | The tax period has not been closed or previously submitted |
| **User role** | The logged-in user holds the Owner or Accountant role |
| **Session validity** | The attestation session has not expired (30-minute window) |
| **Password match** | The entered password matches the user's current credentials |

If any check fails, the declaration cannot be submitted and an error message explains the specific issue.

## After Submission

Once the Standard Declaration is accepted:

- The return status changes from **Draft** to **Submitted**
- A submission receipt is generated and available under **VAT Returns > History**
- The attestation event is written to the [Attestation Audit Trail](/docs/attestation/audit-trail)
- A confirmation email is sent to the email address on file for the business

## Session Timeout

The attestation session remains active for **30 minutes** after the [Session Affirmation](/docs/attestation/session-affirmation) step is completed. If the submission is not completed within this window, the session expires and you must re-affirm before proceeding.

## Next Steps

- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
