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

    log('Dwelling on the KPI strip at the top.');
    // The page has Total Clients / Active / VAT Registered / Added This Month KPI cards.
    // Use a stable text-based locator targeting one of them, hover for emphasis, dwell.
    const kpiHeadline = page.getByText(/total clients/i).first();
    if (await kpiHeadline.count() > 0) {
      await kpiHeadline.scrollIntoViewIfNeeded().catch(() => {});
      await kpiHeadline.hover().catch(() => {});
      await wait(2500);
    } else {
      await wait(2500);
    }

    log('Scrolling slowly through the client roster.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 18;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 380));
      }
    });
    await wait(2000);

    log('Hovering the search/filter control.');
    const search = page.getByPlaceholder(/search/i).first();
    if (await search.count() > 0) {
      await search.scrollIntoViewIfNeeded();
      await search.hover();
      await wait(2500);
    }

    log('Returning to top.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(2500);
    log('Recording complete.');
  },
};
