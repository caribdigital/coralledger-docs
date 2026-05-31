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
    // etienne.mckenzie@example.com is the canonical staging BusinessOwner (single-tenant)
    // — they land directly on /client with a business context, where ComplianceWeather renders.
    // ksaconsultantsltd@gmail.com is a firm owner with no default client and would hit
    // "No business selected" on /client.
    log('Authenticating via TestAuth bypass as etienne.mckenzie@example.com (BusinessOwner).');
    await authenticateViaTestAuth(page, {
      email: 'etienne.mckenzie@example.com',
      redirectTo: '/client',
    });

    log('Landed on /client. Letting the dashboard render.');
    await page.waitForLoadState('networkidle');
    await wait(3000);

    log('Highlighting the Compliance Weather card.');
    // ComplianceWeather component renders with class `compliance-weather`; no data-testid yet
    // (tracked separately in Comply). CSS class selector is the stable surface.
    const complianceCard = page.locator('.compliance-weather').first();
    if (await complianceCard.count() > 0) {
      await complianceCard.scrollIntoViewIfNeeded();
      await complianceCard.hover();
      await wait(2500);
    } else {
      log('WARNING: .compliance-weather not found — user may have no business context.');
    }

    log('Navigating to the full Compliance Intelligence page.');
    // ClientDashboard's ComplianceWeather "View Details" action navigates here for
    // non-getting-started users; this is the canonical compliance detail surface.
    await page.goto('https://stg-comply.coralledger.com/compliance/intelligence', {
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
