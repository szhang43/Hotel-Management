/*
Filename: Register.js
Description: 
The `RegisterForm` component provides a registration form for users to create an account.
It includes input fields for first name, last name, phone number, email, and password.
Users can enter their information and click the "Create Account" button to register.
Upon successful registration, the user's information is stored in the database.
*/

import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile, updatePhoneNumber, onAuthStateChanged} from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import { writeUserDB } from "@/firebase/firebaseUtils";
import { useRouter } from 'next/router';
import styles from '@/styles/Login.module.css';


function RegisterForm() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setFirstName] = useState("");
  const [registerLastName, setLastName] = useState("");
  const [registerPhoneNumber, setPhoneNumber] = useState("");
  
  const router = useRouter();

  //regex to verify if email and phone number is on the right format 
  var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
  
  const [user, setUser] = useState("");
  
  // set user to logged in user after registering 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  //checks if the form is valid, making sure all fields are not empty 
  const isFormValid = () => {
    if (
      registerEmail.trim() === "" ||
      registerPassword.trim() === "" ||
      registerFirstName.trim() === "" ||
      registerLastName.trim() === "" ||
      registerPhoneNumber.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return false;
    }
    // checks if email field is invalid
    else if (!emailPattern.test(registerEmail)) {
      alert("Please enter a valid email address");
      return false;
    }
    //checks if phone number field is invalid
    else if (!phoneNumberPattern.test(registerPhoneNumber)) {
      alert("Please enter a valid phone number in the format XXX-XXX-XXXX");
      return false;
    }

    return true;
  };

  //clear form, set to "" after form is submitted
  const clearForm = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

    // functions to register user 
    async function register() {
        try {
          if (!isFormValid()) { // checks if form is invalid
            return;
          }
            //storing user credentials 
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            ); 
            const user = userCredential.user;
            const fullName = `${registerFirstName} ${registerLastName}`;
            //update profile of user with name 
            await updateProfile(user, {
                displayName: fullName,
            })

              // format user data and send to database
              const userData = {
                custFirstName: registerFirstName,
                custLastName: registerLastName,
                email: registerEmail,
                phoneNum: registerPhoneNumber,
                uid: user.uid
              }
              await writeUserDB(userData); // send user data to db
              clearForm();
              router.push("/"); // redirect to home page 

        } catch(error) { // catch for errors
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
        <h3 className={styles.loginTitle}>Join the Nest</h3>
      <p className={styles.description}>
      Unlock exclusive benefits and seamless booking with our hotel website. Sign up now!
      </p>
      <input
        placeholder="First Name"
        onChange={(event) => setFirstName(event.target.value)} // set and store first name
      />

      <input
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)} // set and store last name
      />

      <input
        placeholder="000-000-0000"
        onChange={(event) => setPhoneNumber(event.target.value)} // set phone number
      />

      <input
        placeholder="Email"
        onChange={(event) => setRegisterEmail(event.target.value)} //set and store email
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setRegisterPassword(event.target.value)} // set and store password
      />
      
      <button className={styles.button} onClick={register}>Create Account</button> 
    </div>
  );
}

export default RegisterForm;
