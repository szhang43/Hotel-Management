import React from "react"
import Stripe from "stripe"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51NCB1gBpM6MJONClTyDMegyFpqJW5NIYsU3RrPZ5ZZKvqoIjTvZfkrNqd0q7OtyfeN8pxikyUQQDQBWuC340ZO9h00zI9pVlcf"
const stripeTestPromise = loadStripe(PUBLIC_KEY);
function StripeContainer(){
    return(
        <div>
            <Elements stripe={stripeTestPromise}>
                <PaymentForm/>
            </Elements>
        </div>
    )
}

export default StripeContainer