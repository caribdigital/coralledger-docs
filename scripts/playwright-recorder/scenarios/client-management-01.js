// client-management-01: Firm Portal — Multi-Client Dashboard
//
// Target docs page: docs/firm-portal/index.mdx
// CDN target: cdn.coralledger.com/demos/client-management-01.mp4

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'client-management-01',
  title: 'Firm Portal — Multi-Client Dashboard',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as Firm Owner — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'ksaconsultantsltd@gmail.com',
      redirectTo: '/firm/clients',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /firm/clients with warm session.');
    await page.goto(`${BASE}/firm/clients`, { waitUntil: 'networkidle' });
    await wait(2500);

    log('Scrolling through the client roster.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 14;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 300));
      }
    });
    await wait(1500);

    const search = page.getByPlaceholder(/search/i).first();
    if (await search.count() > 0) {
      await search.scrollIntoViewIfNeeded();
      await search.hover();
      await wait(1500);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1200);
    log('Recording complete.');
  },
};
