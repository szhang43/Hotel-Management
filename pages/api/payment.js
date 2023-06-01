import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_SECRET_TEST);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, id } = req.body;

    try {
      const payment = await stripeInstance.paymentIntents.create({
        amount,
        currency: 'USD',
        description: "Duck's Nest Reservation",
        payment_method: id,
        confirm: true
      });

      console.log('Payment', payment);

      res.status(200).json({
        message: 'Payment successful',
        success: true
      });
    } catch (error) {
      console.log('Error', error);

      res.status(500).json({
        message: 'Payment failed',
        success: false
      });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
