import styles from './Loader.module.scss';

export const TEST_ID = 'loading';

function Loader() {
  return <div className={styles.loading} data-testid={TEST_ID}></div>;
}

export default Loader;
