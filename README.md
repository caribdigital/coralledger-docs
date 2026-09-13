# CoralLedger Comply documentation

The public CoralLedger Comply documentation site is a Docusaurus 3 static site. It documents the current product workflows, Bahamian VAT reference material, firm portal, audit and data-operations controls, and the limitations that keep customer copy evidence-based.

The application source of truth is [coralledgercomply](https://github.com/caribdigital/coralledgercomply). Public commercial copy is maintained in [coralledger-marketing](https://github.com/caribdigital/coralledger-marketing); pricing in these docs must remain consistent with that site's pricing contract.

## Internal Ops Portal Documentation

Platform Operations Portal documentation is maintained outside this public repository in the private `caribdigital/coralledger-ops-docs` repository.

## Installation

```bash
npm ci
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

Deployment is normally performed by the repository's hosting workflow. A local build is the required preflight; do not treat a successful deploy command alone as proof that the published site has the expected content.

## Verification checks

Run the focused content gates before opening a documentation change:

```bash
npm run typecheck
npm run check:estate-content
npm run check:bica-honesty
npm run check:vocab
npm run check:brand-logo
npm run build
```

Regulatory wording must use the anchors in `docs/reference/statutory-citations.md` and the product's verified behavior. If a statutory proposition is not verified, describe the product behavior neutrally and link the open decision or source request rather than filling the gap with a plausible number or filing claim.

## Keeping documentation synchronized

When Comply changes a customer-facing workflow, update the matching page in the same release window. In particular, check the VAT return preparation and finalisation flow, the Section 56 / 56A refund surfaces, compliance-score domains, attestation authority gates, audit-retention language, and any renamed navigation labels. Search the application and marketing repositories for the old phrase before publishing a replacement.

The current pricing contract is per active VAT registration (one nine-digit TIN): B$199/month standard, B$59/month for the first 25 activated taxpayers while active, B$19/month for a deregistered read-only taxpayer from the next billing month, and up to B$20/month paired-referral credit for five pairs, never below B$59/month. The public pricing page is authoritative if the contract changes.

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Algolia DocSearch

Set these environment variables in your deploy environment to enable documentation search:

- `ALGOLIA_APP_ID`
- `ALGOLIA_API_KEY` (search-only key)
- `ALGOLIA_INDEX_NAME`

When configured, Docusaurus shows the DocSearch modal from the navbar and supports keyboard shortcuts like `Cmd+K` / `Ctrl+K`, with relevance-ranked results from your Algolia index.

To keep results fresh, configure your Algolia crawler to reindex on each deploy (for example, by connecting your hosting provider deploy webhook to Algolia crawl triggers).

## Last-Updated Timestamps

`showLastUpdateTime: true` is enabled on the docs preset. Docusaurus reads each file's most recent git commit timestamp at build time and renders it as "Last updated on …" at the bottom of every doc page.

**Vercel deploy note:** the default Vercel shallow clone (`--depth=1`) silently breaks `git log`-based timestamps — every page renders the current build date. To fix:

- In the Vercel project settings → **Git** → set **Clone Depth** to **Unlimited** (or 0), OR
- Add `git fetch --unshallow || true` as the first line of the Vercel Install Command.

Without this, the "Last updated" stamp will show every page as updated on every deploy.
