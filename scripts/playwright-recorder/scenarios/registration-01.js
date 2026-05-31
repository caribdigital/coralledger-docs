// registration-01: Account Registration — Sign-Up Form
//
// Target docs page: docs/getting-started/create-account.mdx
// CDN target: cdn.coralledger.com/demos/registration-01.mp4
// Scope: navigate to the public sign-up form, hover the fields, scroll. NEVER fills or
// submits — staging dataset must not gain a "Robbie tested the docs recorder" account.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'registration-01',
  title: 'Account Registration — Sign-Up Form',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Navigating to the public sign-up form (no auth).');
    await page.goto('https://stg-comply.coralledger.com/Identity/Account/Register', {
      waitUntil: 'networkidle',
    });
    await wait(3000);

    log('Hovering each sign-up field in turn.');
    for (const labelPattern of [/email/i, /^password/i, /confirm.*password/i, /terms/i]) {
      const field = page.getByLabel(labelPattern).first();
      if (await field.count() > 0) {
        await field.scrollIntoViewIfNeeded();
        await field.hover();
        await wait(1300);
      }
    }

    log('Scrolling through the rest of the form (Turnstile / consent / submit area).');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 12;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 280));
      }
    });
    await wait(1500);

    log('Returning to top — never clicks Register, never submits anything.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);
    log('Recording complete.');
  },
};
