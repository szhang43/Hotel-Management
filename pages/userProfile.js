import {useEffect, useState} from "react"; 
import { getAuth, onAuthStateChanged, signOut, updateCurrentUser } from "firebase/auth";
import { auth } from "@/firebase/initFirebase"; 

function userProfile(){
    const [user, setUser] = useState("");

    useEffect(() =>{
        onAuthStateChanged(auth, (updateCurrentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <div className = "userProfile">
            {user ? (
                <div>
                    <h3>Welcome, {user.displayName}!</h3>
                    <p>Email: {user.email}</p>
                    <button onClick={(event) => signOut(auth)}>Sign out</button>
                </div>
                
            ) : (
                <p>Please login or create an account</p>
            )}
        </div>
    );
}

export default userProfile;