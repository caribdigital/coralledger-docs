---
sidebar_position: 2
title: Statutory Citation Style
description: Canonical citation pattern for versioned statutory references in CoralLedger docs
---

# Statutory Citation Style

All statutory references in this documentation should follow this canonical format:

`[Statute Name, Year (as amended by Amendment Name, Year)](OfficialLink), s. SectionNumber`

Example:
`[Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32`

## Required Elements

1. **Statute name** (full official name)
2. **Version/amendment information** (original year and amendment context)
3. **Hyperlink** to an official source for the statute text (default to the statute page; use section-deep links only if an official source provides stable section anchors)
4. **Section/subsection reference** in `s. N`, `s. N(1)`, or `s. N(1)(a)` format

## Canonical Examples

- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 26
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 44
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 50
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 61
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 47(1)(a)
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32(2)
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32(3)
- [Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 61(c)

## Subsection and Paragraph Rules

- Keep the same `s.` prefix, then append subsection/paragraph markers immediately after the section number: `s. 47(1)(a)`.
- Do not add spaces inside subsection markers (`s. 32 (2)` is incorrect).
- Use the exact nested level required by the source text (for example `s. 32(2)` vs `s. 32(3)`).

## Amendment Chain Rules

- Omit the amendment chain when citing a section that has not been amended since the original Act: `[Value Added Tax Act, 2014](https://laws.bahamas.gov.bs/), s. 26`.
- Use the **2021 chain** when citing a provision whose substance was changed by the VAT (Amendment) (No. 2) Act, 2021 (e.g., provisions updated as part of the rate reduction to 10% or the redefined international-service definitions). Verified under JR-008.
- Use the **2025 chain** when citing provisions introduced or updated by the VAT (Amendment) (No. 2) Act, 2025 (for example, the licensed food-store reduced-rate provision under JR-007).
- If more than one amending Act is material to the cited provision, list each in chronological order using `and`.

### Sections verified as unamended since 2014 (JR-008)

The following sections were confirmed as unamended since the original Value Added Tax Act, 2014, and must **not** carry any amendment-chain qualifier:

| Section | Topic |
|---------|-------|
| s. 26 | Record keeping obligations |
| s. 41(3) | Record-keeping requirements and good-faith reliance |
| s. 44 | Partial exemption and input-tax apportionment |
| s. 50 | Retention period (seven years) |
| s. 60 | Late-payment interest rate |
| s. 61 | Penalties |

Canonical amendment-chain examples:

- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2021)](https://laws.bahamas.gov.bs/), s. 32
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) (No. 2) Act, 2025)](https://laws.bahamas.gov.bs/), s. 12A
- [Value Added Tax Act, 2014 (as amended by the VAT (Amendment) Act, 2018 and the VAT (Amendment) (No. 2) Act, 2025)](https://laws.bahamas.gov.bs/), s. 12A

## Notes

- Do not cite only "VAT Act Section X" without version and amendment context.
- Prefer official government legal repositories for hyperlinks.
- Default to linking the Act page (`https://laws.bahamas.gov.bs/`) instead of deep section links unless link stability is explicitly verified.

### Deep-Link Stability (Current Default)

| URL pattern | Stability status | Citation guidance |
| --- | --- | --- |
| `https://laws.bahamas.gov.bs/` (Act page/search landing) | Stable for current documentation usage | Preferred default |
| Deep section links (for example section-specific path, query, or fragment URLs) | Not yet confirmed as consistently stable over time | Do not use in canonical citations until stability is verified |
