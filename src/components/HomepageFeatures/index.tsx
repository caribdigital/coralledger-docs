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
        and 2025 reforms. Handles standard (10%), reduced (5%), zero-rated, and
        exempt supplies.
      </>
    ),
  },
  {
    title: 'Smart Categorization',
    icon: '🤖',
    description: (
      <>
        AI-powered transaction categorization learns from your business patterns.
        Automatically assigns VAT rates based on descriptions, vendors, and
        industry rules.
      </>
    ),
  },
  {
    title: 'One-Click Returns',
    icon: '📋',
    description: (
      <>
        Generate VAT returns ready for submission to the Comptroller. Automatic
        calculations, validation checks, and PDF export for your records.
      </>
    ),
  },
  {
    title: 'Compliance Scoring',
    icon: '✅',
    description: (
      <>
        Real-time compliance score from A+ to F. Track your VAT compliance health
        with anomaly detection and actionable improvement suggestions.
      </>
    ),
  },
  {
    title: 'Multi-Client Support',
    icon: '🏢',
    description: (
      <>
        Perfect for accounting firms and bookkeepers. Manage multiple client
        businesses from a single dashboard with the Firm Portal.
      </>
    ),
  },
  {
    title: 'Point POS Integration',
    icon: '🔗',
    description: (
      <>
        Seamless sync with CoralLedger Point POS. Automatic transaction import,
        real-time updates, and daily reconciliation.
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
