// exports-01: Reports — Export Formats and Download Options
//
// Target docs page: docs/reports/index.mdx
// CDN target: cdn.coralledger.com/demos/exports-01.mp4
// Scope: focus on the Cash Flow Report surface (which has Export CSV button + real data
// for ksaconsultantsltd's tagged client context). Avoids the /reports landing for
// firm-side users where the page is sparse.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'exports-01',
  title: 'Reports — Export Formats and Download Options',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating (default firm user with client context) — warmup.');
    await authenticateViaTestAuth(page, { redirectTo: '/reports/cashflow' });
    await page.waitForLoadState('networkidle');
    await wait(3000);
  },

  async record({ page, log }) {
    log('Navigating directly to /reports/cashflow with warm session.');
    await page.goto(`${BASE}/reports/cashflow`, { waitUntil: 'networkidle' });
    await wait(3500);

    log('Hovering the Export CSV button (top-right primary action).');
    const exportButton = page.getByRole('button', { name: /export.*csv/i }).first();
    if (await exportButton.count() > 0) {
      await exportButton.scrollIntoViewIfNeeded();
      await exportButton.hover();
      await wait(3000);
    }

    log('Slow scroll through the cash flow timeline + obligations + monthly summary.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 20;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 400));
      }
    });
    await wait(3000);

    log('Returning to top — Export CSV remains in frame on the closing dwell.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(4000);
    log('Recording complete.');
  },
};
