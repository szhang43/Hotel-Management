/*
Filename: Login.js
Description: 
This file allows users to login and have the user state set to the
current logged in user. 
*/
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from "@/firebase/initFirebase";
import styles from '@/styles/Login.module.css';

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState(""); // set and store user email
  const [loginPassword, setLoginPassword] = useState(""); // set and store user password
  const router = useRouter(); // router functiont o re route pages
  
  async function login() { // firebase auth login functions 
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      router.push("/"); // sign in and re-route to home page 
    } catch (error) {
      alert(error.message); // if login is not successfull, then it will show alert 
    }
  }

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.formContainer}>
      <img
        src="/img/Ducks.png"
        alt="Login Image"
        className={styles.loginImage}
      />
        <h3 className={styles.loginTitle}>Login</h3>
        <p className={styles.description}>
        Welcome back! <hr></hr>
        Enjoy personalized experiences,
         manage your bookings, and more. Login to your account now!</p>
        <input
          placeholder="Email"
          onChange={(event) => setLoginEmail(event.target.value)} // set and store login email enetered
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setLoginPassword(event.target.value)} // set and store login pass enetered
        />
        <button className={styles.button} onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;