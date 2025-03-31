import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId, email, name } = await req.json();

    console.log('Received data:', { userId, email, name }); // Debugging line

    if (!userId || !email || !name) {
      return new Response(
        JSON.stringify({ error: 'Missing required user data' }),
        { status: 400 }
      );
    }

    // Check if a customer already exists with this email
    const existingCustomers = await stripe.customers.list({ email });
    let customer;

    if (existingCustomers.data.length > 0) {
      // Use the first found customer
      customer = existingCustomers.data[0];

      // Update customer metadata with userId and name
      await stripe.customers.update(customer.id, {
        metadata: { userId },
        name: name || customer.name, // Keep the existing name if not provided
      });

      console.log('Updated existing customer:', customer.id);
    } else {
      // Create a new Stripe customer
      customer = await stripe.customers.create({
        metadata: { userId },
        email,
        name: name || '',
      });

      console.log('Created new customer:', customer.id);
    }

    // Respond with the customer ID
    return new Response(JSON.stringify({ customerId: customer.id }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error handling Stripe customer:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process Stripe customer' }),
      { status: 500 }
    );
  }
}
