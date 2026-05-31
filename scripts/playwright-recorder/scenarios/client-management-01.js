// client-management-01: Firm Portal — Multi-Client Dashboard
//
// Target docs page: docs/firm-portal/index.mdx
// CDN target: cdn.coralledger.com/demos/client-management-01.mp4
// Scope: read-only tour of the Firm Portal client roster — shows the multi-client list
// view that's the firm's daily landing surface.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'client-management-01',
  title: 'Firm Portal — Multi-Client Dashboard',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as Firm Owner (ksaconsultantsltd@gmail.com).');
    await authenticateViaTestAuth(page, {
      email: 'ksaconsultantsltd@gmail.com',
      redirectTo: '/firm/clients',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

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

    log('Hovering the search/filter control if available.');
    const search = page.getByPlaceholder(/search/i).first();
    if (await search.count() > 0) {
      await search.scrollIntoViewIfNeeded();
      await search.hover();
      await wait(1800);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);
    log('Recording complete.');
  },
};
