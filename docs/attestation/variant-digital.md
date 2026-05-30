---
sidebar_position: 6
title: Digital Filing Variant
description: Planned future §32 attestation variant for filings signed with a qualified electronic signature — not yet in implementation scope
---

# Digital Filing Variant

:::warning Not yet scoped for implementation
The Digital Filing Variant is **planned but not yet scoped** for the §32 attestation admin lifecycle. The current `AttestationVariant` catalog contains seven codes — `A`, `B`, `C`, `AB`, `AC`, `BC`, `ABC` — covering the General Compliance, Return Preparation, and Advisory Services practice-area combinations. **There is no `D` code or "Digital" admin variant in the catalog today**, and no qualified-electronic-signature attestation body has been authored or ratified. The settings path `Settings > Account > Digital Signing` referenced below has not been built. This page is preserved as a forward-looking integrator-planning reference; the implementation date will be announced separately when the work is scoped.
:::

:::info Do not confuse this with the `AuthorisedEmployee` Signatory Capacity
The per-return [Signatory Capacity Declaration](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture) at filing time **does** accept `AuthorisedEmployee` as a live capacity value today. That is a different artefact — see [Section 32 Attestation Overview](/docs/attestation/) for the distinction between the firm-admin attestation lifecycle (which this page is part of) and the per-return Signatory Capacity Declaration (which is not). Selecting `AuthorisedEmployee` in the Approve Filing dialog is fully supported today and does **not** depend on the Digital Filing Variant described on this page.
:::

The Digital Filing Variant, as originally specified, would apply when the filer signs the VAT return using a **qualified electronic signature** backed by a recognised digital certificate. This variant would meet heightened signature requirements available to businesses that have provisioned a digital signing credential in CoralLedger Comply.

## Intended scope (forward-looking only)

Once scoped and implemented, this variant would be presented when the [Qualifying Screen](/docs/attestation/qualifying-screen) determined that the filer is the business owner or director and has chosen the qualified electronic signature method. It may also be used by authorised agents who hold a valid digital certificate.

A qualified electronic signature in this context would mean a signature produced using:

- An X.509 digital certificate issued by a recognised Certificate Authority (CA).
- A cryptographic private key held exclusively by the signing party.
- A signature algorithm supported by CoralLedger Comply (RSA-2048 or higher, ECDSA P-256 or higher).

## Intended setup flow (forward-looking only)

Before using this variant, a digital signing credential would need to be registered in CoralLedger Comply:

1. Navigate to **Settings > Account > Digital Signing** *(not yet built)*.
2. Click **Register Certificate** *(not yet built)*.
3. Upload your X.509 certificate (PEM or DER format).
4. CoralLedger Comply validates the certificate chain and expiry date.
5. Click **Confirm** — the certificate is linked to your account.

## Intended signing flow (forward-looking only)

When this variant is active:

1. CoralLedger Comply generates a **return digest** — a SHA-256 hash of the return data package.
2. The return digest is displayed for review.
3. You sign the digest using your private key:
   - **Browser-based signing** — using the CoralLedger signing extension or a PKCS#11-compatible device (hardware token or smartcard).
   - **File-based signing** — download the digest, sign it offline with your certificate toolchain, and upload the signature file.
4. CoralLedger Comply verifies the signature against the registered certificate.
5. If verification passes, the declaration confirmation screen is shown.

## Intended declaration text (forward-looking only)

After signature verification, the following declaration would be presented:

> *I declare that I have applied my qualified electronic signature to this VAT return, that I am the registered person or an authorised representative of the registered person named herein, and that the information provided in this return is, to the best of my knowledge and belief, true, correct, and complete. I understand that submitting a false or misleading return is an offence under the [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32.*

The filer would confirm by checking **I confirm the above declaration** and clicking **Submit Return**. A password re-entry would not be required for this variant because the cryptographic signature would serve as the identity confirmation.

## Until launch — what to use today

Until the Digital Filing Variant is scoped and implemented in the firm-admin attestation lifecycle, use the [Standard](/docs/attestation/variant-standard), [Agent](/docs/attestation/variant-agent), or [Professional](/docs/attestation/variant-professional) variants for capturing §32 attestations in the persistent admin lifecycle. At per-return filing time, the [Signatory Capacity Declaration](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture) is captured today via the Filing Wizard and supports all four `SignatoryCapacity` values — including `AuthorisedEmployee` — independently of this admin-side variant.

## Next steps

- [Section 32 Attestation Overview](/docs/attestation/) — the two distinct §32 artefacts explained
- [Filing Wizard — Step 4 Approval](/docs/vat-returns/filing-wizard#step-4-approval-signatory-capture) — the per-return Signatory Capacity Declaration that is live today
- [Standard Variant](/docs/attestation/variant-standard), [Agent Variant](/docs/attestation/variant-agent), [Professional Variant](/docs/attestation/variant-professional) — the three live attestation pathway variants
