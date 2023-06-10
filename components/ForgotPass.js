import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import styles from '@/styles/Login.module.css';


function ForgotPasswordForm() { // allow user to reset their pass word
  const [registerEmail, setRegisterEmail] = useState("");

  async function forgotPass() {
    try {
      await sendPasswordResetEmail(auth, registerEmail); // user fire auth's forgot pass function
      alert("Check your email to reset the password");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={styles.formContainer}>
      <img
        src="/img/lock.png"
        alt="Login Image"
        className={styles.lockImage}
      />
        <h3 className={styles.loginTitle}>Forgot Password</h3>
      <p className={styles.description}>
        Enter your email and we&apos;ll send you a link to get back into your account.
      </p>
      <input
        placeholder="Email"
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <button className={styles.button} onClick={forgotPass}>Reset Password</button>
    </div>
  );
}

export default ForgotPasswordForm;
