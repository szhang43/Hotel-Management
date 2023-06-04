import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import styles from '@/styles/Login.module.css';


function ForgotPasswordForm() {
  const [registerEmail, setRegisterEmail] = useState("");

  async function forgotPass() {
    try {
      await sendPasswordResetEmail(auth, registerEmail);
      alert("Check your email to reset the password");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={styles.formContainer}>
      <img
        src="/img/Ducks.png"
        alt="Login Image"
        className={styles.loginImage}
      />
      <h3>Forgot Password</h3>
      <input
        placeholder="Email"
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <button className={styles.button} onClick={forgotPass}>Reset Password</button>
    </div>
  );
}

export default ForgotPasswordForm;
