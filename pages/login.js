import {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"; 
import { auth } from '@/firebase/initFirebase'

function Login(){
    const [registerEmail, setRegisterEmail] = useState(""); 
    const [registerPassword, setRegisterPassword] = useState("");

    
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    const [registerFirstName, setFirstName] = useState("");
    const [registerLastName, setLastName] = useState("");

    const [registerPhoneNumber, setPhoneNumber] = useState("");

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
    }, []);

    async function register(){
        try{
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword); // generate a new user & login
            
            const fullName = `${registerFirstName} ${registerLastName}`
            await updateProfile(user, {
                displayName: fullName,
                phoneNumber: registerPhoneNumber,
            });
        }
        catch(error){
            alert(error.message);
        }
    };

    async function login(){
        try{
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
        }
        catch(error){
            alert(error.message);
        }
    };

    async function logout(){
        await signOut(auth);
    };
    
    async function forgotPass() {
        try {
          await sendPasswordResetEmail(auth, registerEmail);
          alert("Check your email to reset password");
        } catch (error) {
          alert(error.message);
        }
      }
      

    return(
        <div className = "login">
            <div> 
                <h3>Register User</h3>
                <input placeholder="FirstName" onChange = {(event) => 
                    setFirstName(event.target.value)}/>

                <input placeholder="LastName" onChange = {(event) => 
                    setLastName(event.target.value)}/>

                <input placeholder="PhoneNumber" onChange = {(event) =>
                    setPhoneNumber(event.target.value)}/>
        
                <input placeholder="Email" onChange={(event) => 
                    setRegisterEmail(event.target.value)}/>

                <input placeholder="Password" onChange={(event) => 
                    setRegisterPassword(event.target.value)}/>

                <button onClick={register}>Create Account</button>
            </div>

            <div>
                <h3>Login</h3>
                <input placeholder="Email" onChange = {(event) => {
                    setLoginEmail(event.target.value)
                }}/>

                <input placeholder="Password" onChange = {(event) => {
                    setLoginPassword(event.target.value)
                }}/>
                <button onClick={login}>Login</button>
            </div>

            <div>
                <h3>Forgot Password</h3> 
                <input placeholder="Email" onChange = {(event) =>{
                    setRegisterEmail(event.target.value)
                }}/>
                <button onClick={forgotPass}>Reset Password</button>
            </div>


            <div>
                <h3>User Logged in: </h3>
                {user ? user.email : "Not logged In"}
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Login