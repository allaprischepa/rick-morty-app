import styles from './Logo.module.scss';
import logo from '../../../public/images/rick-and-morty-logo-250x76.png';
import Image from 'next/image';

function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src={logo}
        alt="Rick and Morty Logo"
        width={250}
        height={75}
        priority
      />
    </div>
  );
}

export default Logo;
