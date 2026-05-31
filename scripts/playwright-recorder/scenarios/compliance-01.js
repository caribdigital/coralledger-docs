// compliance-01: Compliance Score Overview and Grading
//
// Target docs page: docs/compliance/compliance-score.mdx
// CDN target: cdn.coralledger.com/demos/compliance-01.mp4
// Scope: read-only surface; safe to record against the canonical staging tenant.

import { authenticateViaTestAuth } from '../lib/auth.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'compliance-01',
  title: 'Compliance — Score Overview and Grading',
  viewport: { width: 1280, height: 720 },

  async record({ page, log }) {
    log('Authenticating via TestAuth bypass.');
    await authenticateViaTestAuth(page, { redirectTo: '/dashboard' });

    log('Landed on dashboard. Letting the compliance widget render.');
    await page.waitForLoadState('networkidle');
    await wait(2500);

    log('Highlighting the Compliance Weather card on the dashboard.');
    // Compliance Weather is the canonical compliance-score widget on /client.
    // Hover gives the viewer a visual cue.
    const complianceCard = page.locator('[data-testid="compliance-weather"]').first();
    if (await complianceCard.count() > 0) {
      await complianceCard.scrollIntoViewIfNeeded();
      await complianceCard.hover();
      await wait(2000);
    } else {
      log('compliance-weather testid not found, skipping hover.');
    }

    log('Navigating to the full Compliance Score page.');
    // Try the explicit Compliance Score page; fall back to the dashboard alone if not
    // available. The audit found `/compliance` was the canonical compliance surface.
    await page.goto('https://stg-comply.coralledger.com/compliance', {
      waitUntil: 'networkidle',
    });
    await wait(2500);

    log('Scrolling through the compliance detail sections.');
    // Slow scroll so the viewer can read the grade breakdown.
    await page.evaluate(async () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 20;
      const step = totalScroll / steps;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: step, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 250));
      }
    });
    await wait(1500);

    log('Scrolling back to top for a clean closing frame.');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1500);

    log('Recording complete.');
  },
};
