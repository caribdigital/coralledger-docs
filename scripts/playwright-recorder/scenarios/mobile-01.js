// mobile-01: Mobile — Responsive Interface on Phone and Tablet
//
// Target docs page: docs/getting-started/mobile.mdx
// CDN target: cdn.coralledger.com/demos/mobile-01.mp4

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'mobile-01',
  title: 'Mobile — Responsive Interface on Phone and Tablet',
  viewport: { width: 390, height: 844 },

  async warmup({ page, log }) {
    log('Authenticating as etienne at mobile viewport — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/client',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /client (mobile viewport) with warm session.');
    await page.goto(`${BASE}/client`, { waitUntil: 'networkidle' });
    await wait(2500);

    log('Tapping the hamburger menu if present.');
    const menuBtn = page.locator('button[aria-label*="menu" i], button[class*="menu" i], .mud-appbar button').first();
    if (await menuBtn.count() > 0) {
      await menuBtn.hover();
      await wait(1000);
      await menuBtn.click({ force: true });
      await wait(2000);
      await menuBtn.click({ force: true });
      await wait(1200);
    }

    log('Scrolling the dashboard at mobile width.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 16;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 280));
      }
    });
    await wait(1500);

    log('Navigating to /transactions at mobile width.');
    await page.goto(`${BASE}/transactions`, { waitUntil: 'networkidle' });
    await wait(2500);

    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 12;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 280));
      }
    });
    await wait(1500);

    log('Recording complete.');
  },
};
