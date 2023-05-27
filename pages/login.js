import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import Link from "next/link";
import RegisterForm from "@/components/Register";
import LoginForm from "@/components/Login";
import ForgotPasswordForm from "@/components/ForgotPass";

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
      <RegisterForm />

      <LoginForm />

      <ForgotPasswordForm />

      <div>
        <h3>User Logged in: </h3>
        {user ? user.email : "Not logged In"}
        <button onClick={logout}>Sign Out</button>
      </div>

    </div>
  );
}

export default Login;
