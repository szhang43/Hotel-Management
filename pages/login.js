import React from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth"; 
import {auth} from "../firebase/initFirebase";


function App(){
    const [registerEmail, setRegisterEmail] = useState(""); 
    const [registerPassword, setRegisterPassword] = useState("");

    
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState("");

    async function register(){
        try{
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword); // generate a new user & login
            console.log(user);
        }
        catch(error){
            alert(error.message);
        }
    };

    async function login(){

    };

    async function logout(){

    };

    return(
        <div className = "login">
            <div> 
                <h3>Register User</h3>
                <input placeholder="First Name"/>
                <input placeholder="Last Name"/>
                <input placeholder="Phone Number"/>
                <input placeholder="Email" onChange = {(event) => {
                    setRegisterEmail(event.target.value);
                }} />
                <input placeholder="Password" onChange = {(event) => {
                    setRegisterPassword(event.target.value)
                }}/>

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

                <button>Login</button>
            </div>
        </div>
    )
}