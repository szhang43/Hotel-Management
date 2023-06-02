import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
<<<<<<< HEAD
import CheckoutForm from "@/components/PaymentForm";
=======
import styles from '@/styles/checkout.module.css';
>>>>>>> 4fe1e0a4425c0619844196cb2c4491d55a1690ca

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log("Stripe Public Key:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState('');
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads using our local API
    fetch('api/stripe_intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 30000,
        payment_intent_id: '',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret), setPaymentIntent(data.id);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
    labels: 'floating',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
<<<<<<< HEAD
      <Head>
        <title>Stripe Elements</title>
      </Head>
      <h1 className="text-2xl bold mb-4 mt-4 text-center">
        Accept payments with credit card
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm paymentIntent={paymentIntent} />
        </Elements>
      )}
=======
        <div className={styles.checkoutback}>
            <Elements stripe={stripePromise}>
            <PaymentForm />
            </Elements>
        </div>
>>>>>>> 4fe1e0a4425c0619844196cb2c4491d55a1690ca
    </div>
  );
}