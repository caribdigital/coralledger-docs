// TestAuth bypass helper.
//
// Mirrors the C# SmokeTestBase.AuthenticateViaTestAuthAsync pattern at
// tests/CoralComply.E2E.Tests/Smoke/SmokeTestBase.cs:240-303 (CoralComply repo).
//
// The bypass works like this:
//   1. We register a request-route handler on `**/api/test-auth/**` that injects the
//      X-TestAuth-Secret header into every request matching that pattern.
//   2. We navigate to `<baseUrl>/api/test-auth/login?email=<email>&redirectTo=<path>`.
//      The TestAuthController on the target environment validates the header against the
//      configured TestAuth:StagingSecret, then issues the standard auth cookies and
//      redirects to `redirectTo`.
//   3. We tear the route handler down once authenticated — the cookies travel via the
//      normal cookie jar from this point on, so we never need to send the secret again.
//
// Required env var: STAGING_TEST_AUTH_SECRET.
// Default user:     ksaconsultantsltd@gmail.com (Accounting Firm Owner with full perms).
//
// Reference: tests/CoralComply.E2E.Tests/Smoke/SmokeTestBase.cs lines 240-303 in caribdigital/coralledgercomply

/**
 * @param {import('playwright').Page} page
 * @param {object} [opts]
 * @param {string} [opts.baseUrl] - Defaults to https://stg-comply.coralledger.com.
 * @param {string} [opts.email]   - Defaults to ksaconsultantsltd@gmail.com.
 * @param {string} [opts.redirectTo] - Defaults to /dashboard.
 */
export async function authenticateViaTestAuth(page, opts = {}) {
  const baseUrl = opts.baseUrl ?? process.env.SMOKE_BASE_URL ?? 'https://stg-comply.coralledger.com';
  const email = opts.email ?? 'ksaconsultantsltd@gmail.com';
  const redirectTo = opts.redirectTo ?? '/dashboard';

  const secret = process.env.STAGING_TEST_AUTH_SECRET;
  if (!secret) {
    throw new Error(
      'STAGING_TEST_AUTH_SECRET is not set. Set it in your shell before running the recorder.'
    );
  }

  const routePattern = '**/api/test-auth/**';

  // Attach the secret only to TestAuth routes — scope keeps the secret out of any
  // other request that happens to share the navigation.
  await page.route(routePattern, async (route) => {
    const headers = { ...route.request().headers(), 'x-testauth-secret': secret };
    await route.continue({ headers });
  });

  try {
    const loginUrl =
      `${baseUrl}/api/test-auth/login` +
      `?email=${encodeURIComponent(email)}` +
      `&redirectTo=${encodeURIComponent(redirectTo)}`;

    const response = await page.goto(loginUrl, { waitUntil: 'networkidle' });
    if (!response || response.status() >= 400) {
      throw new Error(
        `TestAuth login failed: HTTP ${response ? response.status() : 'no response'}. ` +
          `Check STAGING_TEST_AUTH_SECRET + TestAuth:StagingSecret on the target env.`
      );
    }
  } finally {
    await page.unroute(routePattern);
  }
}
