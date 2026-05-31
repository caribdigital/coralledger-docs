// mobile-01: Mobile — Responsive Interface on Phone and Tablet
//
// Target docs page: docs/getting-started/mobile.mdx
// CDN target: cdn.coralledger.com/demos/mobile-01.mp4
// Scope: drive the dashboard at a mobile viewport (iPhone 12 Pro size) to demonstrate
// the responsive layout. Different aspect ratio from the standard 1280x720 — viewers
// can clearly tell this is mobile.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'mobile-01',
  title: 'Mobile — Responsive Interface on Phone and Tablet',
  viewport: { width: 390, height: 844 },

  async record({ page, log }) {
    log('Authenticating as BusinessOwner with mobile viewport.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/client',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Tapping the hamburger / menu button if present.');
    const menuBtn = page.locator('button[aria-label*="menu" i], button[class*="menu" i], .mud-appbar button').first();
    if (await menuBtn.count() > 0) {
      await menuBtn.hover();
      await wait(1200);
      await menuBtn.click({ force: true });
      await wait(2000);

      // Close it again to keep the demo clean.
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

    log('Navigating to /transactions at mobile width to show table responsiveness.');
    await page.goto('https://stg-comply.coralledger.com/transactions', {
      waitUntil: 'networkidle',
    });
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
