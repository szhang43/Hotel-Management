import {useEffect, useState} from "react"; 
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/initFirebase"; 
import Reservation from "@/components/ReservationFetch";

function UserProfile(){
    const [user, setUser] = useState("");

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <div className = "userProfile">
            {user ? (
                <div>
                    <h3>Welcome, {user.displayName}!</h3>
                    <h4>Profile</h4>
                    <p>First Name: {user.displayName.split(" ")[0]}</p>
                    <p>Last Name: {user.displayName.split(" ")[1]}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>

                    <h4>Reservations</h4>
                    <Reservation/>
                    <button onClick={(event) => signOut(auth)}>Sign out</button>
                </div>
                
            ) : (
                <p>Please login or create an account</p>
            )}
            <Link href="/">Back</Link>
        </div>
   
    );
}

export default UserProfile;
