// registration-01: Account Registration — Sign-Up Form
//
// Target docs page: docs/getting-started/create-account.mdx
// CDN target: cdn.coralledger.com/demos/registration-01.mp4
// Scope: hover fields on the public sign-up form. NEVER fills or submits.
//
// No warmup — public route, no auth required. The recording starts on a fresh context
// with the cookieConsent cookie pre-injected so the bottom banner doesn't show.

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'registration-01',
  title: 'Account Registration — Sign-Up Form',
  viewport: { width: 1280, height: 720 },

  // No warmup — registration page is public, no session needed.

  async record({ page, log }) {
    // Canonical sign-up route is /Account/Register (NOT /Identity/Account/Register).
    // Use `domcontentloaded` instead of `networkidle` — the Turnstile widget keeps the
    // network in a not-idle state indefinitely, so `networkidle` times out.
    log('Navigating to the public sign-up form.');
    await page.goto(`${BASE}/Account/Register`, { waitUntil: 'domcontentloaded' });
    await wait(4000);

    log('Hovering each sign-up field in turn.');
    for (const labelPattern of [/email/i, /^password/i, /confirm.*password/i, /first.*name/i, /last.*name/i, /terms/i]) {
      const field = page.getByLabel(labelPattern).first();
      if (await field.count() > 0) {
        await field.scrollIntoViewIfNeeded();
        await field.hover();
        await wait(1800);
      }
    }

    log('Scrolling slowly through the rest of the form.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 16;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 420));
      }
    });
    await wait(2500);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(3000);
    log('Recording complete — never clicked Register.');
  },
};
