// performance-01: Performance — Fast Load Times and Responsive UI
//
// Target docs page: docs/getting-started/performance.mdx
// CDN target: cdn.coralledger.com/demos/performance-01.mp4

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'performance-01',
  title: 'Performance — Fast Load Times and Responsive UI',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne — warmup.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/client',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Starting at /client with warm session.');
    await page.goto(`${BASE}/client`, { waitUntil: 'networkidle' });
    await wait(1800);

    const tour = [
      { path: '/transactions', label: 'Transactions list' },
      { path: '/vatreturns', label: 'VAT Returns list' },
      { path: '/reports', label: 'Reports landing' },
      { path: '/compliance/intelligence', label: 'Compliance Intelligence' },
      { path: '/client', label: 'Back to client dashboard' },
    ];

    for (const step of tour) {
      log(`→ ${step.path} (${step.label}).`);
      await page.goto(`${BASE}${step.path}`, { waitUntil: 'networkidle' });
      await wait(1800);
    }

    log('Recording complete.');
  },
};
