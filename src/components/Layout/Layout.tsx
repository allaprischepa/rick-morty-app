import styles from './Layout.module.scss';

function Layout({ children }) {
  return <div id={styles['root']}>{children}</div>;
}

export default Layout;
