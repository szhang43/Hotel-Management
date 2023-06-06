import Link from 'next/link';
import styles from '../styles/NavBar.module.css';
import { auth } from '@/firebase/initFirebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect, useState} from "react"; 
import { getAllAdminDB } from '@/firebase/firebaseUtils';



const NavBar = () => {

    const [user, setUser] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            getAllAdminDB()
            .then((data) => {
                if(currentUser){
                    if(data.includes(currentUser.uid)){
                        setIsAdmin(true)
                    }
                }
            })
        });

    }, []);

    return (
        <nav className={styles.navBar}>
            <div className={styles.logoContainer}>
                <Link href="/">
                        <img src="/img/Ducks.png" alt="Logo" className={styles.logo} />
                </Link>
            </div>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/">Home</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/about">About Us</Link>
                </li>
                
                {isAdmin ? (
                    <li className={styles.navItem}>
                        <Link href="/admin">Admin</Link>
                    </li>
                ) : (
                    ""
                )}

                <li className={styles.navItem}>
                {user && user.email ? (

                    <Link href = "/userProfile">
                            <img
                                className={`${styles.user} ${styles.loggedInUser}`}
                                src="/img/user.png"
                                alt={user.displayName}
                            />
                    </Link>
                    // <Link href = "/userProfile">
                    //    {user.displayName.split(" ")[0][0]}
                    //    {user.displayName.split(" ")[1][0]}
                    // </Link>
                ) : (
                    <Link href = "/login">Login/Sign Up</Link>)}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
