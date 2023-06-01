import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
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
          alert("Payment Successful");
          console.log("Payment Successful");
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
          <h2>You just booked a room!</h2>
        </div>
      }
    </div>
  )
}

export default PaymentForm;
