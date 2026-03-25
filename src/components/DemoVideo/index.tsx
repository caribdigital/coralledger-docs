import type {ReactNode} from 'react';
import styles from './styles.module.css';

interface DemoVideoProps {
  src: string;
  title?: string;
}

export default function DemoVideo({src, title}: DemoVideoProps): ReactNode {
  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.video}
        controls
        preload="none"
        aria-label={title ?? 'Demo video'}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
