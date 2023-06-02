import React from 'react';
import PaymentForm from '@/components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NCB1gBpM6MJONClTyDMegyFpqJW5NIYsU3RrPZ5ZZKvqoIjTvZfkrNqd0q7OtyfeN8pxikyUQQDQBWuC340ZO9h00zI9pVlcf');

function CheckoutPage() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default CheckoutPage;
