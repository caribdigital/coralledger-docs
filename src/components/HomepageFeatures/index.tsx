import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built for The Bahamas',
    icon: '🇧🇸',
    description: (
      <>
        Designed specifically for VAT compliance under The Bahamas VAT Act 2014
        and 2025 reforms. Supports standard (10%), reduced (5%), zero-rated, and
        exempt supplies with dedicated compliance dashboards.
      </>
    ),
  },
  {
    title: 'AI Intelligence',
    icon: '🤖',
    description: (
      <>
        AI-powered Intelligence Dashboard with compliance grading, penalty risk
        assessment, vendor analysis, and data quality scoring. Smart transaction
        categorization learns from your patterns.
      </>
    ),
  },
  {
    title: 'Validated Returns',
    icon: '📋',
    description: (
      <>
        Generate VAT returns with 10-point pre-flight validation. Preview totals,
        catch errors before filing, and export in PDF, CSV, or XML formats for
        electronic submission.
      </>
    ),
  },
  {
    title: 'Compliance Scoring',
    icon: '✅',
    description: (
      <>
        Real-time compliance score from A+ to F based on data quality, timeliness,
        accuracy, and completeness. Anomaly detection alerts you to potential issues.
      </>
    ),
  },
  {
    title: 'Firm Portal',
    icon: '🏢',
    description: (
      <>
        Perfect for accounting firms. Batch filing for multiple clients, firm-wide
        analytics, staff productivity tracking, and centralized deadline management.
      </>
    ),
  },
  {
    title: 'Point POS Integration',
    icon: '🔗',
    description: (
      <>
        Real-time sync with CoralLedger Point POS. Store-level controls, automatic
        retry on failures, sync health monitoring, and daily reconciliation reports.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Why CoralLedger Comply?
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
