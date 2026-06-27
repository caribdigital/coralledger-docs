import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface DemoVideoProps {
  // Absolute URL, or a path relative to the configured CDN base
  // (e.g. "demos/foo.mp4"). Relative paths resolve against customFields.cdnUrl,
  // which is environment-aware (stg vs prod buckets) in docusaurus.config.ts.
  src: string;
  title?: string;
  poster?: string;
}

export default function DemoVideo({src, title, poster}: DemoVideoProps): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const cdnUrl = (siteConfig.customFields?.cdnUrl as string | undefined) ?? '';
  const resolve = (s: string) =>
    /^https?:\/\//.test(s) ? s : `${cdnUrl}/${s.replace(/^\//, '')}`;

  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.video}
        controls
        preload="none"
        poster={poster ? resolve(poster) : undefined}
        aria-label={title ?? 'Demo video'}
      >
        <source src={resolve(src)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
