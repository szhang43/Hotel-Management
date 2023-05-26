import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";

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
    <div>
      <h3>Forgot Password</h3>
      <input
        placeholder="Email"
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <button onClick={forgotPass}>Reset Password</button>
    </div>
  );
}

export default ForgotPasswordForm;
