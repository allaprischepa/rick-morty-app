import styles from '../src/styles/modules/ErrorPage.module.scss';
import ErrorPage from '../src/components/pages/ErrorPage/ErrorPage';
import Link from 'next/link';

const HTTP_STATUS_NOT_FOUND = 404;

function Error({ statusCode }) {
  const notFound = (): JSX.Element => {
    return (
      <div className={styles.error_page}>
        <div className={styles.error_message}>
          <div>Sorry... The page is not found.</div>
          <div>Please, go to Home page.</div>
        </div>
        <Link className={`${styles.button} ${styles.home_link}`} href="/">
          Go Home
        </Link>
      </div>
    );
  };

  return statusCode === HTTP_STATUS_NOT_FOUND ? notFound() : <ErrorPage />;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? err.statusCode
    : HTTP_STATUS_NOT_FOUND;
  return { statusCode };
};

export default Error;
