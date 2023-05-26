import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";

function RegisterForm() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setFirstName] = useState("");
  const [registerLastName, setLastName] = useState("");
  const [registerPhoneNumber, setPhoneNumber] = useState("");

  async function register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;
      const fullName = `${registerFirstName} ${registerLastName}`;
      await updateProfile(user, {
        displayName: fullName,
        phoneNumber: registerPhoneNumber,
      });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h3>Register User</h3>
      <input
        placeholder="First Name"
        onChange={(event) => setFirstName(event.target.value)}
      />

      <input
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)}
      />

      <input
        placeholder="Phone Number"
        onChange={(event) => setPhoneNumber(event.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(event) => setRegisterEmail(event.target.value)}
      />

      <input
        placeholder="Password"
        onChange={(event) => setRegisterPassword(event.target.value)}
      />

      <button onClick={register}>Create Account</button>
    </div>
  );
}

export default RegisterForm;
