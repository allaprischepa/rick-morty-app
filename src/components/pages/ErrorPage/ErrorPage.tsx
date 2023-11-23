import styles from '../../../styles/modules/ErrorPage.module.scss';
import { useRouter } from 'next/router';

function ErrorPage() {
  const router = useRouter();

  return (
    <div className={styles.error_page}>
      <div className={styles.error_message}>
        <div>Sorry... The error occurred.</div>
        <div>Please, try to reload page</div>
      </div>
      <button className={styles.reload_button} onClick={router.reload}>
        Reload page
      </button>
    </div>
  );
}

export default ErrorPage;
