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

  var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
  
  const [user, setUser] = useState("");
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    
    else if (!emailPattern.test(registerEmail)) {
      alert("Please enter a valid email address");
      return false;
    }
    else if (!phoneNumberPattern.test(registerPhoneNumber)) {
      alert("Please enter a valid phone number in the format XXX-XXX-XXXX");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };


    async function register() {
        try {
          if (!isFormValid()) {
            return;
          }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            const user = userCredential.user;
            const fullName = `${registerFirstName} ${registerLastName}`;
            await updateProfile(user, {
                displayName: fullName,
            })
            
            // await updatePhoneNumber(user, {
              //   phoneNumber: registerPhoneNumber,
              // });
              
              // format user data and send to database
              const userData = {
                custFirstName: registerFirstName,
                custLastName: registerLastName,
                email: registerEmail,
                phoneNum: registerPhoneNumber,
                uid: user.uid
              }
              await writeUserDB(userData);
              clearForm();
              router.push("/");

        } catch(error) {
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
        onChange={(event) => setFirstName(event.target.value)}
      />

      <input
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)}
      />

      <input
        placeholder="000-000-0000"
        onChange={(event) => setPhoneNumber(event.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(event) => setRegisterEmail(event.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setRegisterPassword(event.target.value)}
      />

      <button className={styles.button} onClick={register}>Create Account</button>
    </div>
  );
}

export default RegisterForm;
