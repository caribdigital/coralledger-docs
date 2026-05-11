---
sidebar_position: 5
title: Professional Accountant Variant
description: Section 32 attestation for BICA-registered accountants preparing VAT returns
---

# Professional Accountant Variant

The Professional Accountant Variant applies when a **BICA-registered accountant** prepares and files a VAT return on behalf of a client. This variant includes an additional verification step — [BICA Verification](/docs/attestation/bica-verification) — to confirm that the accountant's professional registration is current at the time of filing.

## Who Uses This Variant

This variant is presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) identifies the filer as a **BICA-registered accountant**. It is distinct from the [Authorized Agent Variant](/docs/attestation/variant-agent) because it carries an enhanced duty of care under BICA's professional standards and includes additional accountability requirements.

BICA stands for the **Bahamas Institute of Chartered Accountants**. Members are bound by BICA's Code of Professional Conduct, which includes obligations around accuracy, integrity, and due diligence in tax return preparation.

## BICA Verification Requirement

Before the professional declaration is presented, the system runs an automated [BICA Verification](/docs/attestation/bica-verification) check against the accountant's membership number. The accountant must:

1. Enter their **BICA membership number** when prompted
2. Wait for verification — the check typically completes in under five seconds
3. Proceed if verification passes; resolve any issues if it fails

See [BICA Verification](/docs/attestation/bica-verification) for full details on how verification works and how to resolve failures.

## Declaration Text

Once BICA Verification passes, the following declaration is presented:

> *I declare that I am a member in good standing of the Bahamas Institute of Chartered Accountants (BICA Membership No: [XXXX]), that I have prepared this VAT return in my professional capacity on behalf of the registered person named herein, and that the information provided is, to the best of my professional knowledge and belief, true, correct, and complete. I acknowledge my professional obligations under BICA's Code of Professional Conduct and understand that submitting a false or misleading return is an offence under the VAT Act (The Bahamas).*

The accountant must confirm this declaration by:

1. Reviewing the return summary displayed alongside the declaration
2. Confirming the pre-populated BICA membership number is correct
3. Checking the **I confirm the above declaration** checkbox
4. Entering their current account password
5. Clicking **Submit Return**

## Validation Checks

| Check | Condition |
|-------|-----------|
| **BICA membership** | Membership number passes the BICA Verification check |
| **User role** | The logged-in user holds Accountant or Owner role for this business |
| **Return completeness** | All mandatory return fields are populated |
| **Period lock** | The tax period is open and not previously submitted |
| **Session validity** | The attestation session has not expired |
| **Password match** | The entered password matches the accountant's credentials |

## After Submission

Once the Professional Accountant Declaration is accepted:

- The return status changes from **Draft** to **Submitted**
- The attestation record identifies the filer as **Professional** and includes the verified BICA membership number
- A submission receipt is sent to the accountant and the business owner
- The BICA membership number and verification result are written to the [Attestation Audit Trail](/docs/attestation/audit-trail)

## Responsibility and Liability

The Professional Accountant Variant carries an explicit professional liability acknowledgment. By using this variant, the accountant confirms that:

- They have exercised reasonable professional care in preparing the return
- They have reviewed the underlying transactions and supporting records
- They are not aware of any material misstatement or omission

This does not transfer legal liability from the registrant to the accountant — under Section 32, the registrant remains ultimately responsible — but it does establish the accountant's professional accountability under BICA standards.

## Next Steps

- [BICA Verification](/docs/attestation/bica-verification)
- [Session Affirmation](/docs/attestation/session-affirmation)
- [Attestation Audit Trail](/docs/attestation/audit-trail)
- [Submit your VAT return](/docs/vat-returns/submit-return)
