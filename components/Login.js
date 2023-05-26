import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h3>Login</h3>
      <input
        placeholder="Email"
        onChange={(event) => setLoginEmail(event.target.value)}
      />

      <input
        placeholder="Password"
        onChange={(event) => setLoginPassword(event.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default LoginForm;
