import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { getAuth } from 'firebase/auth';
import { bookRoomDB } from '@/firebase/firebaseUtils';
import { useRouter } from 'next/router';

//TODO: move this to a css file
// This is the card input styling
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      // iconColor: "#878787",
      color: "#636263",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#d1cdd1" }
    },
    invalid: {
      iconColor: "#fc141c",
      color: "#fc141c"
    }
  }
}

function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();
  const { dateIn, dateOut, roomSize } = router.query;
  const [displayRoomSize, setDisplayRoomSize] = useState(roomSize);

  

  useEffect(() => {
    if (roomSize === "large") {
      setDisplayRoomSize("Luxury");
    } else if (roomSize === "small") {
      setDisplayRoomSize("The Cozy");
    } else if (roomSize === "medium") {
      setDisplayRoomSize("Room Deluxe")
    }
  }, [roomSize]);

  
  const bookRoom = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const nameArr = user.displayName.split(" ");

      const userData = {
        fName: nameArr[0],
        lName: nameArr[1],
        uid: user.uid,
      }
      const resData = {
        dateIn: dateIn,
        dateOut: dateOut,
        roomSize: roomSize,
      }
      bookRoomDB(userData, resData)
        .then(() => {
          router.push("/ResSuccess");
        })
    } else {
      alert("Reservation was not successful");
    }
  }



  async function handleSubmit(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: 1000, // Amount to charge by, needs to be changed to room price
            id
          })
        });

        const data = await response.json();

        if (data.success) {
          setSuccess(true);
        }
      } catch (error) {
        alert("Error: " + error);
        console.log("Error:", error);
      }
    } else {
      alert("Error: " + error);
      console.log(error.message);
    }
  }

  return (
    <div>
      {!success ?
        <form onSubmit={handleSubmit}>
          <p>Reservation Information</p>
          <p>Your selected dates:</p>
          <p>{dateIn} - {dateOut}</p>
          <p>Chosen Room: {displayRoomSize}</p>
          <p>Number of Adults</p>
          <input placeholder="Adult" />
          <p>Number of Children (age below 18)</p>
          <input placeholder="Children" />
          <p>Credit Card Information</p>
          <p>First Name</p>
          <input placeholder="First Name" />
          <p>Last Name</p>
          <input placeholder="Last Name" />
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
              {/* <CardElement/> */}
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
        :
        //After payment success
        <div>
        <h2>Payment Successful</h2>
        <p>Please Confirm your Reservation Booking</p>
        <button onClick={bookRoom}>Confirm</button>
      </div>
      }
    </div>
  )
}

export default PaymentForm;