import Link from 'next/link';
import styles from '../styles/NavBar.module.css';
import { auth } from '@/firebase/initFirebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect, useState} from "react"; 



const NavBar = () => {

  const [user, setUser] = useState("");

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

  return (
    <nav className={styles.navBar}>
      <div className={styles.logoContainer}>
        <Link href="/">
            <img src="/img/Duck.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">About Us</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin">Admin</Link>
        </li>
        <li className={styles.navItem}>
        {user && user.email ? (
          <Link href = "/userProfile">{user.displayName}</Link>
        ) : (
          <Link href = "/login">Login/Sign Up</Link>)}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
