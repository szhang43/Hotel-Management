/* 
Filename: login.js
Description:  
This file contains the react components for the Login Page.
It renders the login form as well as the registration form and
the forgot password form. Based on user actions the different forms
are toggled.
*/
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import RegisterForm from "@/components/Register";
import LoginForm from "@/components/Login";
import ForgotPasswordForm from "@/components/ForgotPass";
import styles from "@/styles/Login.module.css";



function Login() {
  const [user, setUser] = useState({});
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  async function logout() {
    await signOut(auth);
  }

  return (
    <div className={styles.login}>
      <div className="container">
        {!showRegisterForm && !showForgotPasswordForm && !user && <LoginForm />}

        {(!showRegisterForm || showForgotPasswordForm) && (
          <div className={styles.formToggle}>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => {
                  setShowForgotPasswordForm(!showForgotPasswordForm);
                  setShowRegisterForm(false);
                }}
              >
                {showForgotPasswordForm ? "Back to Login" : "Forgot Password?"}
              </button>
            </div>
            {showForgotPasswordForm && <ForgotPasswordForm />}
          </div>
        )}

        {!showForgotPasswordForm && (
          <div className={styles.formToggle}>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => {
                  setShowRegisterForm(!showRegisterForm);
                  setShowForgotPasswordForm(false);
                }}
              >
                {showRegisterForm ? "Back to Login" : "Don't have an account? Sign up"}
              </button>
            </div>
            {showRegisterForm && <RegisterForm />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
