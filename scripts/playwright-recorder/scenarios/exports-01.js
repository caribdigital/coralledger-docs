// exports-01: Reports — Export Formats and Download Options
//
// Target docs page: docs/reports/index.mdx
// CDN target: cdn.coralledger.com/demos/exports-01.mp4

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'exports-01',
  title: 'Reports — Export Formats and Download Options',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating — warmup, no recording yet.');
    await authenticateViaTestAuth(page, { redirectTo: '/reports' });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /reports with warm session.');
    await page.goto(`${BASE}/reports`, { waitUntil: 'networkidle' });
    await wait(2000);

    log('Scrolling through the Reports landing.');
    await page.evaluate(async () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 16;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: totalScroll / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 250));
      }
    });
    await wait(1500);

    log('Navigating to Cash Flow Report for the Export CSV demo.');
    await page.goto(`${BASE}/reports/cashflow`, { waitUntil: 'networkidle' });
    await wait(2500);

    const exportButton = page.getByRole('button', { name: /export.*csv/i }).first();
    if (await exportButton.count() > 0) {
      await exportButton.scrollIntoViewIfNeeded();
      await exportButton.hover();
      await wait(2000);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1200);
    log('Recording complete.');
  },
};
