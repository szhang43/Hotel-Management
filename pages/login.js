import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import Link from "next/link";
import RegisterForm from "@/components/Register";
import LoginForm from "@/components/Login";
import ForgotPasswordForm from "@/components/ForgotPass";
import styles from '@/styles/Login.module.css';


function Login() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  async function logout() {
    await signOut(auth);
  }

  return (
    <div className="login">
      <div className="container">
        <RegisterForm />

        <LoginForm />

        <ForgotPasswordForm />
      </div>

    </div>
  );
}

export default Login;
