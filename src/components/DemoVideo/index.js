import styles from './styles.module.css';
export default function DemoVideo({ src, title }) {
    return (<div className={styles.videoContainer}>
      <video className={styles.video} controls preload="none" aria-label={title ?? 'Demo video'}>
        <source src={src} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>);
}
