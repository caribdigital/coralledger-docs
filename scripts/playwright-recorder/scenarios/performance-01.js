// performance-01: Performance — Fast Load Times and Responsive UI
//
// Target docs page: docs/getting-started/performance.mdx
// CDN target: cdn.coralledger.com/demos/performance-01.mp4
// Scope: a brisk navigation tour across major routes — dashboard → transactions →
// vatreturns → reports → compliance — to convey responsive snappiness. Each page is
// loaded with `networkidle` so any latency is genuine.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'performance-01',
  title: 'Performance — Fast Load Times and Responsive UI',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as BusinessOwner.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/client',
    });

    await page.waitForLoadState('networkidle');
    await wait(2500);

    const tour = [
      { path: '/transactions', label: 'Transactions list' },
      { path: '/vatreturns', label: 'VAT Returns list' },
      { path: '/reports', label: 'Reports landing' },
      { path: '/compliance/intelligence', label: 'Compliance Intelligence' },
      { path: '/client', label: 'Back to client dashboard' },
    ];

    for (const step of tour) {
      log(`Navigating to ${step.path} — ${step.label}.`);
      await page.goto(`https://stg-comply.coralledger.com${step.path}`, {
        waitUntil: 'networkidle',
      });
      await wait(1800);
    }

    log('Recording complete.');
  },
};
