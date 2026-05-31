// share-links-01: Shared Reports — Creating and Managing Secure Share Links
//
// Target docs page: docs/reports/shared-reports.mdx
// CDN target: cdn.coralledger.com/demos/share-links-01.mp4
// NOTE: /reports/shared/{ShareToken} is the public recipient view (requires a token).
// Drive from /reports/cashflow which has a Share affordance.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'share-links-01',
  title: 'Shared Reports — Creating and Managing Secure Share Links',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/reports/cashflow',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /reports/cashflow with warm session.');
    await page.goto(`${BASE}/reports/cashflow`, { waitUntil: 'networkidle' });
    await wait(2500);

    log('Scrolling through the report.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 12;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 300));
      }
    });
    await wait(1500);

    const shareBtn = page.getByRole('button', { name: /share/i }).first();
    if (await shareBtn.count() > 0) {
      await shareBtn.scrollIntoViewIfNeeded();
      await shareBtn.hover();
      await wait(1800);
      await shareBtn.click({ force: true });
      await wait(2500);

      const cancelBtn = page.getByRole('button', { name: /cancel|close|discard/i }).first();
      if (await cancelBtn.count() > 0) {
        await cancelBtn.click({ force: true });
      } else {
        await page.keyboard.press('Escape');
      }
      await wait(1200);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1200);
    log('Recording complete.');
  },
};
