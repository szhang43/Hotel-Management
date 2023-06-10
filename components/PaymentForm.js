import React, { useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { bookRoomDB } from '@/firebase/firebaseUtils';
import { useRouter } from 'next/router';
import styles from '@/styles/checkout.module.css';
import { getAuth } from "firebase/auth";

export default function Form(props) {
    const [email, setEmail] = useState('');
    const [locAmount, setLocAmount] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    // console.log(props.userData);
    // console.log(props.resData);

    //Get the Firebase authentication and current user
    const auth = getAuth(); 
    const user = auth.currentUser; 

    //Define layout optionjs for the payment element 
    const options = {
        layout: {
          type: 'accordion',
          defaultCollapsed: false,
          radios: true,
          spacedAccordionItems: false
        }
    };

    //Update the local amount state when the price prop changes
    useEffect(() => {
        setLocAmount(props.price);

        if (!stripe) {
            return;
        }

        //Grab the client secret from url params
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        if (!clientSecret) {
            return;
        }
        //Retrieve payment intent from the stripe api using the client's secret
        stripe.retrievePaymentIntent(clientSecret).then(({ props }) => {
            switch (props.status) {
                case 'succeeded':
                    setMessage('Payment succeeded!');
                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });
    }, [stripe, props.price]);

    //Handle the form submission and confirm the payment with Stripe 
    // const handleAmount = async (val) => {
    //     setLocAmount(val);
    //     fetch('api/stripe_intent', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             amount: props.price * 100,
    //             payment_intent_id: props.paymentIntent,
    //         }),
    //     });
    // };

    //Handle form submission and confirm the payment with stripe
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            console.log('not loaded');
            // Stripe.js has not yet loaded.
            return;
        }
    
        setIsLoading(true);
        
        //Confirm payment and send billing details
        const { error } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
                receipt_email: email,
                payment_method_data: {
                    billing_details: {
                        "name": `${user.displayName}`,
                    },
                },
            },
        });
    
        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message);
            } else {
                setMessage('An unexpected error occurred.');
            }
            setIsLoading(false);
        } else {
            // Payment succeeded
            bookRoomDB(props.userData, props.resData)
                .then(() => {
                    router.push("/ResSuccess");
                })
                .catch((error) => {
                    setMessage('An error occurred while booking the room.');
                    setIsLoading(false);
                });
        }
    };
    
    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit} className="m-auto">
                <div className={styles.cartTotal}>
                    Cart Total:
                    <input
                        id="amount"
                        type="text"
                        value={locAmount}
                        className="block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm h-16"
                        disabled
                        // onChange={(e) => handleAmount(e.target.value)}
                    />
                </div>
                <div className={styles.mail}>
                    Email address:
                    <input
                        className="block
                        w-full
                        rounded-md
                        border-gray-300
                        shadow-sm h-16"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                    />
                </div>
                <PaymentElement id="payment-element" options = {options} />
                <button
                    className={styles.payButton}
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isLoading ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            'Pay now'
                        )}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
}