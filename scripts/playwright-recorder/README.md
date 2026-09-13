# Playwright video recorder

Captures demo videos of authenticated CoralLedger Comply workflows on the staging environment, for use on the documentation site.

Pairs with `scripts/convert-marketing-videos.sh` for `.webm` → `.mp4` conversion.

## Prerequisites

- Node 18+
- Playwright Chromium browser installed (one-time)
- `STAGING_TEST_AUTH_SECRET` env var set to the staging TestAuth bypass secret. The app setting is `TestAuth__StagingSecret` (bound as `TestAuth:StagingSecret`); use the same value as the Comply Reef smoke suite. Never print or commit this value.

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

Upload the produced `.mp4` files to the DigitalOcean Spaces bucket represented by `CDN_URL` in `docusaurus.config.ts`:

- staging: `https://coralledger-cdn-stg-nyc3.nyc3.cdn.digitaloceanspaces.com/demos/`
- production: `https://coralledger-cdn-nyc3.nyc3.cdn.digitaloceanspaces.com/demos/`

The docs site resolves relative `DemoVideo` paths against this environment-specific base URL. Do not use the unprovisioned `cdn.coralledger.com` placeholder.

## Scenarios

| id | Target docs page | CDN file |
|---|---|---|
| `compliance-01` | `docs/compliance/compliance-score.mdx` | `compliance-01.mp4` |
| `exports-01` | `docs/reports/index.mdx` | `exports-01.mp4` |

More scenarios will be added as the proof-of-concept work expands.

## Authentication

The recorder authenticates against staging using the **TestAuth bypass** — the same path the Reef smoke suite uses (see `tests/CoralComply.E2E.Tests/Smoke/SmokeTestBase.cs:240-303` in the Comply repo). The bypass attaches the `X-TestAuth-Secret` header to requests matching `**/api/test-auth/**`; once authenticated, the standard auth cookies carry the session.

Default test user: `reef.firm.owner@coralledger.test` — the fixture firm owner defined by `SmokeTestConfig.FirmOwnerEmail`, with Owner/Owner access to the synthetic `Reef Fixture Firm Ltd` business. Override with `SMOKE_FIRM_OWNER_EMAIL` only when a separately approved fixture is required. Never use a real customer account.

## Adding a new scenario

1. Create `scenarios/<id>.js`. The module must `export default` an object with `id`, `title`, optional `viewport`, and an `async record({ page, log })` function.
2. Use `authenticateViaTestAuth(page, ...)` from `lib/auth.js` to log in.
3. Drive the workflow with Playwright. The `BrowserContext` is configured to record video for the entire run.
4. Run with `node run.js <id>` to test.
5. Convert and upload as above.

Recording produces `recordings/<id>.webm`. The `recordings/` directory is gitignored — never commit the produced binaries; they live on the CDN.
