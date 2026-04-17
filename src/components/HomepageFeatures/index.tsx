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
    title: 'Audit Defense',
    icon: '🛡️',
    description: (
      <>
        Immutable hash-chain verified audit trail with 7-year retention.
        Export a complete audit defense package — transaction log, rate
        classifications, and apportionment workings — in one click.
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
    title: 'Import & Export',
    icon: '📤',
    description: (
      <>
        Import transactions via CSV or Excel from any accounting system with
        intelligent column mapping. Export returns, audit trails, and reports
        in PDF, CSV, XML, or Excel format.
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
