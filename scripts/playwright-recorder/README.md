# Playwright video recorder

Captures demo videos of authenticated CoralLedger Comply workflows on the staging environment, for use on the documentation site.

Pairs with `scripts/convert-marketing-videos.sh` for `.webm` → `.mp4` conversion.

## Prerequisites

- Node 18+
- Playwright Chromium browser installed (one-time)
- `STAGING_TEST_AUTH_SECRET` env var set to the staging TestAuth bypass secret. Same value used by the Comply Reef smoke suite — see `tests/CoralComply.E2E.Tests/Smoke/SmokeTestConfig.cs` in the Comply repo.

## Install

```bash
cd scripts/playwright-recorder
npm install
npm run install:browsers
```

## Run a single scenario

```bash
export STAGING_TEST_AUTH_SECRET=<the staging secret>
node run.js compliance-01
```

This writes `recordings/compliance-01.webm`.

## Run all scenarios

```bash
export STAGING_TEST_AUTH_SECRET=<the staging secret>
node run.js --all
```

## Convert WebM → MP4

```bash
cd ../..   # back to docs repo root
./scripts/convert-marketing-videos.sh scripts/playwright-recorder/recordings dist/videos
```

## Upload to CDN

Once the `cdn.coralledger.com` host is provisioned (Azure Blob + Front Door), upload the produced `.mp4` files to `https://cdn.coralledger.com/demos/`. The `DemoVideo` component on the docs site (`src/components/DemoVideo/`) already targets that path.

## Scenarios

| id | Target docs page | CDN file |
|---|---|---|
| `compliance-01` | `docs/compliance/compliance-score.mdx` | `compliance-01.mp4` |
| `exports-01` | `docs/reports/index.mdx` | `exports-01.mp4` |

More scenarios will be added as the proof-of-concept work expands.

## Authentication

The recorder authenticates against staging using the **TestAuth bypass** — the same path the Reef smoke suite uses (see `tests/CoralComply.E2E.Tests/Smoke/SmokeTestBase.cs:240-303` in the Comply repo). The bypass attaches the `X-TestAuth-Secret` header to requests matching `**/api/test-auth/**`; once authenticated, the standard auth cookies carry the session.

Default test user: `ksaconsultantsltd@gmail.com` — the Accounting Firm Owner with full Owner permissions on the staging dataset.

## Adding a new scenario

1. Create `scenarios/<id>.js`. The module must `export default` an object with `id`, `title`, optional `viewport`, and an `async record({ page, log })` function.
2. Use `authenticateViaTestAuth(page, ...)` from `lib/auth.js` to log in.
3. Drive the workflow with Playwright. The `BrowserContext` is configured to record video for the entire run.
4. Run with `node run.js <id>` to test.
5. Convert and upload as above.

Recording produces `recordings/<id>.webm`. The `recordings/` directory is gitignored — never commit the produced binaries; they live on the CDN.
