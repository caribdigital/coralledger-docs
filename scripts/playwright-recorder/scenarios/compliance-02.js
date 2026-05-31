// compliance-02: Compliance — Improving Your Score
//
// Target docs page: docs/compliance/compliance-score.mdx
// CDN target: cdn.coralledger.com/demos/compliance-02.mp4
// Scope: read-only navigation of the Compliance Intelligence detail page, focused on the
// recommendations / action-items section that drives score improvement.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'compliance-02',
  title: 'Compliance — Improving Your Score',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating as BusinessOwner.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/compliance/intelligence',
    });

    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Scrolling slowly through the intelligence page to surface recommendations.');
    // Slower step pace than compliance-01 so the viewer can read the action items.
    await page.evaluate(async () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 24;
      const step = totalScroll / steps;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: step, behavior: 'smooth' });
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
    } else {
      log('No recommendations panel matched; continuing.');
    }

    log('Returning to top for a clean closing frame.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);

    log('Recording complete.');
  },
};
