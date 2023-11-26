import Head from 'next/head';
import styles from './Layout.module.scss';

function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/rick-morty-icon.png" />
        <title>Rick and Morty Characters</title>
      </Head>
      <div id={styles['root']}>{children}</div>)
    </>
  );
}

export default Layout;
