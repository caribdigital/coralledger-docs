// transactions-01: Transactions — Quick Entry and Advanced Mode
//
// Target docs page: docs/transactions/manual-entry.mdx
// CDN target: cdn.coralledger.com/demos/transactions-01.mp4
// Scope: drive the canonical manual-entry form at /vat/entry (the destination the
// "+ Add" toolbar button on /transactions links to). Hover fields, scroll through
// advanced sections, NEVER submit.

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'transactions-01',
  title: 'Transactions — Quick Entry and Advanced Mode',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne — warmup at /vat/entry.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/vat/entry',
    });
    await page.waitForLoadState('networkidle');
    await wait(3000);
  },

  async record({ page, log }) {
    log('Navigating to /vat/entry with warm session.');
    await page.goto(`${BASE}/vat/entry`, { waitUntil: 'networkidle' });
    await wait(3500);

    log('Hovering each entry field in turn (no typing).');
    for (const labelPattern of [/date|tax.*point/i, /^description|reference/i, /amount|gross|net/i, /vat.*(rate|category)/i, /supplier|vendor|customer/i, /category|classification/i]) {
      const field = page.getByLabel(labelPattern).first();
      if (await field.count() > 0) {
        await field.scrollIntoViewIfNeeded();
        await field.hover();
        await wait(1800);
      }
    }

    log('Scrolling slowly through the form to reveal advanced sections.');
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 18;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: total / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 380));
      }
    });
    await wait(2500);

    log('Returning to top — final dwell on the entry form.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(2500);
    log('Recording complete — form was never submitted.');
  },
};
