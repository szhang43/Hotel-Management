import {useEffect, useState} from "react"; 
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/initFirebase"; 
import Reservation from "@/components/ReservationFetch";
import styles from '@/styles/profile.module.css';

function UserProfile(){
    const [user, setUser] = useState("");

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <div className = {styles.userProfile}>
            {user ? (
                <div>
                    <h3>Welcome, {user.displayName}!</h3>
                    <h4>Profile</h4>
                    <span>First Name: {user.displayName.split(" ")[0]}</span>
                    <span>Last Name: {user.displayName.split(" ")[1]}</span>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>

                    <h4>Reservations</h4>
                    <Reservation/>
                    <button className={styles.signout} onClick={(event) => signOut(auth)}>Sign out</button>
                </div>
                
            ) : (
                <p>Please <Link href="login"> Login </Link> 
                or <Link href="login"> create </Link>  an account</p>
            )}
            <Link href="/">Back</Link>
        </div>
   
    );
}

export default UserProfile;
