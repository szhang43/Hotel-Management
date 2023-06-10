import Stripe from 'stripe';

//Create a new stripe instance using the test secret key from env file
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST, {
  apiVersion: '2020-08-27',
});

//Define async function to handle requests
const handler = async (req, res) => {
  const { amount, payment_intent_id } = req.body;
  if (payment_intent_id) {
    try {
      // If a payment_intent_id is passed, retrieve the paymentIntent
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );
      // If a paymentIntent is retrieved update its amount
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount: amount,
          }
        );
        res.status(200).json(updated_intent); //Return the updated payment intent object
        return;
      }
    } catch (e) {
      //Catch any error and return a status 500
      if (e.code !== 'resource_missing') {
        // if the error is resouce missing, then the payment intent was not found, 
        // it will create a ew payment intent 
        const errorMessage =
          e instanceof Error ? e.message : 'Internal server error';
        res.status(500).json({ statusCode: 500, message: errorMessage });
        return;
      }
    }
  }
  try {
    // Create PaymentIntent, contains amount to bill and other parameter info 
    const params = {
      amount: amount,
      currency: 'USD',
      description: 'DucksNest',
      automatic_payment_methods: {
        enabled: true,
      },
    };
    const payment_intent = await stripe.paymentIntents.create(params);
    //Return the new payment_intent object
    res.status(200).json(payment_intent);
  } catch (err) {
    // catch any errors related to creating the new payment intenet 
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};
export default handler;