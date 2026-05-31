// compliance-02: Compliance — Improving Your Score
//
// Target docs page: docs/compliance/compliance-score.mdx
// CDN target: cdn.coralledger.com/demos/compliance-02.mp4

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'compliance-02',
  title: 'Compliance — Improving Your Score',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne (BusinessOwner) — warmup, no recording yet.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/compliance/intelligence',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /compliance/intelligence with warm session.');
    await page.goto(`${BASE}/compliance/intelligence`, { waitUntil: 'networkidle' });
    await wait(2000);

    log('Slow scroll through the page to surface recommendations.');
    await page.evaluate(async () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 24;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: totalScroll / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 350));
      }
    });
    await wait(2000);

    log('Highlighting the score-improvement section if present.');
    const recommendations = page.locator('[data-testid*="recommend"], .compliance-recommendation, [class*="recommendation"]').first();
    if (await recommendations.count() > 0) {
      await recommendations.scrollIntoViewIfNeeded();
      await recommendations.hover();
      await wait(2500);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1200);
    log('Recording complete.');
  },
};
