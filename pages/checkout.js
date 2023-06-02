import React from 'react';
import PaymentForm from '@/components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from '@/styles/checkout.module.css';

const stripePromise = loadStripe('pk_test_51NCB1gBpM6MJONClTyDMegyFpqJW5NIYsU3RrPZ5ZZKvqoIjTvZfkrNqd0q7OtyfeN8pxikyUQQDQBWuC340ZO9h00zI9pVlcf');

function CheckoutPage() {
  return (
    <div>
        <div className={styles.checkoutback}>
            <Elements stripe={stripePromise}>
            <PaymentForm />
            </Elements>
        </div>
    </div>
  );
}

export default CheckoutPage;
