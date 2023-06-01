import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { Card } from "@mui/material";

//TODO: move this to a css file
// This is the card input styling
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			// iconColor: "#878787",
			color: "#636263" ,
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

function PaymentForm(){
    const [success, setSuccess] = useState(false);
    const stripe= useStripe();
    const elements = useElements(); 

    async function handleSubmit(e){
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card", 
            card: elements.getElement(CardElement)
        });
    

        if(!error){
            try{
                const {id} =paymentMethod;
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 1000, 
                    id 
                });
                if(response.data.success){
                    alert("Payment Successfull"); 
                    console.log("Payment Successful"); 
                    setSuccess(true);
                }
            }
            catch(error){
                alert("Error: ", error);
                console.log("Error");
            }
        }
        else{
            alert("Error: ", error);
            console.log(error.messaage);
        }
}

    return(
        <div>
            {!success ? 
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                        {/* <CardElement/> */}
                    </div>
                </fieldset>
                <button>Pay</button>
            </form>
            :
            //After payment success
            <div>
                <h2>You just brought booked a room!</h2>
            </div>
            }
        </div>
    )

}

export default PaymentForm