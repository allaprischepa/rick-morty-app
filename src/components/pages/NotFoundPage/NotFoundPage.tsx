import Link from 'next/link';
import styles from '../../../styles/modules/ErrorPage.module.scss';

function NotFoundPage() {
  return (
    <div className={styles.error_page}>
      <div className={styles.error_message}>
        <div>Sorry... The page is not found.</div>
        <div>Please, go to Home page.</div>
      </div>
      <Link className={`${styles.button} ${styles.home_link}`} href="/page/1">
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
