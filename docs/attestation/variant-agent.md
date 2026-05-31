---
sidebar_position: 4
title: Authorized Agent Variant
description: Section 32 attestation for authorized agents filing on behalf of a VAT registrant
---

# Authorized Agent Variant

The Authorized Agent Variant applies when a third party — such as an accountant, law firm, or business representative — files a VAT return on behalf of the registered person under a formal agency arrangement. This variant corresponds to the `SignatoryCapacity.AuthorisedAgent` enum value in the platform.

## Who Uses This Variant

This variant is presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) determines that the filer's signatory capacity is **`AuthorisedAgent`** — acting on behalf of the registered person, rather than the registrant themselves.

An authorized agent is any individual or firm that:

- Holds a current, valid agent authorization from the registrant
- Has been granted **Accountant** or **Owner** role access to the business in CoralLedger Comply
- Is not a BICA-registered professional operating under the [Professional Accountant Variant](/docs/attestation/variant-professional) (those use `SignatoryCapacity.BicaLicensedPractitioner`)

## Agent Authorization Requirement

Before the Authorized Agent Variant can be used, the agent relationship must be established in CoralLedger Comply:

1. The business owner logs in and navigates to **Settings > User Management**
2. The agent's user account is invited and assigned the **Accountant** role
3. The agent accepts the invitation and completes their profile

If the agent has not been formally added to the business, they cannot select this variant — the Qualifying Screen will block progression and prompt the owner to set up the agent relationship first.

## Declaration Text

When this variant is active, the following declaration is presented:

> *I declare that I am an authorized agent of the registered person named in this return, that I have been duly authorized to prepare and file this VAT return on their behalf, and that the information provided is, to the best of my knowledge and belief, true, correct, and complete. I understand that as agent I share responsibility for the accuracy of this return and that submitting a false or misleading return is an offence under the [Value Added Tax Act, 2014 (as amended)](https://laws.bahamas.gov.bs/), including penalty exposure under s. 61 for both me and the registered person named in this return.*

The agent must confirm this declaration by:

1. Reviewing the return summary
2. Entering their **agent reference number** (if applicable under the agency agreement)
3. Checking the **I confirm the above declaration** checkbox
4. Entering their current account password
5. Clicking **Submit Return**

## Agent Reference Number

The agent reference number field is optional unless the business has a formal agency arrangement on file with the Comptroller of Revenue that requires a reference number. If a reference number has been configured for the business, the field is mandatory.

| Field | Required? |
|-------|-----------|
| Agent reference number | Mandatory if configured; otherwise optional |
| Declaration checkbox | Always mandatory |
| Password confirmation | Always mandatory |

## Validation Checks

| Check | Condition |
|-------|-----------|
| **Agent role** | The logged-in user holds the Accountant or Owner role for this business |
| **Return completeness** | All mandatory return fields are populated |
| **Period lock** | The tax period is open and not previously submitted |
| **Session validity** | The attestation session has not expired |
| **Password match** | The entered password matches the agent's credentials |

## After Submission

Once the Authorized Agent Declaration is accepted:

- The return status changes from **Draft** to **Submitted**
- The attestation record identifies the filer as **Agent** and includes the agent's user ID
- A submission receipt is sent to both the agent's and the business owner's registered email addresses
- The event is written to the [Attestation Audit Trail](/docs/attestation/audit-trail)

## Next Steps

- [Session Affirmation](/docs/attestation/session-affirmation)
- [Handover](/docs/attestation/handover)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
