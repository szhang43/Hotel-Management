import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logoContainer}>
        <img src="/img/TempLogo.png" alt="Logo" className={styles.logo} />
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About Us</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/reservation">Reservation</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
