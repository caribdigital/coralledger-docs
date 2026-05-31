// compliance-01: Compliance — Score Overview and Grading
//
// Target docs page: docs/compliance/compliance-score.mdx
// CDN target: cdn.coralledger.com/demos/compliance-01.mp4

import { authenticateViaTestAuth } from '../lib/auth.js';

const BASE = 'https://stg-comply.coralledger.com';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  id: 'compliance-01',
  title: 'Compliance — Score Overview and Grading',
  viewport: { width: 1280, height: 720 },

  async warmup({ page, log }) {
    log('Authenticating as etienne (BusinessOwner) — warmup, no recording yet.');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/client',
    });
    await page.waitForLoadState('networkidle');
    await wait(2500);
  },

  async record({ page, log }) {
    log('Navigating to /client with warm session.');
    await page.goto(`${BASE}/client`, { waitUntil: 'networkidle' });
    await wait(2000);

    log('Highlighting the Compliance Weather card.');
    const complianceCard = page.locator('.compliance-weather').first();
    if (await complianceCard.count() > 0) {
      await complianceCard.scrollIntoViewIfNeeded();
      await complianceCard.hover();
      await wait(2500);
    } else {
      log('WARNING: .compliance-weather not found.');
    }

    log('Navigating to the Compliance Intelligence detail page.');
    await page.goto(`${BASE}/compliance/intelligence`, { waitUntil: 'networkidle' });
    await wait(2500);

    log('Scrolling through the compliance detail sections.');
    await page.evaluate(async () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const steps = 20;
      for (let i = 0; i < steps; i++) {
        window.scrollBy({ top: totalScroll / steps, behavior: 'smooth' });
        await new Promise((r) => setTimeout(r, 250));
      }
    });
    await wait(1500);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1200);
    log('Recording complete.');
  },
};
