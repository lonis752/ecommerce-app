import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

// This will get payments related to the Clerk ID stored in customer metadata
export async function GET(req: Request) {
  try {
    const { clerkId } = await req.json(); // Assuming you are sending Clerk ID from the frontend

    // Fetch all customers
    const customers = await stripe.customers.list({
      limit: 100, // Fetching a limited set of customers (adjust this number based on your needs)
    });

    // Filter customers based on Clerk ID metadata
    const customer = customers.data.find(
      (customer) => customer.metadata.clerkId === clerkId
    );

    if (!customer) {
      return new NextResponse(
        JSON.stringify({ error: 'No customer found with this Clerk ID.' }),
        { status: 404 }
      );
    }

    // Get the customer ID
    const customerId = customer.id;

    // Now fetch all payments associated with this customer
    const payments = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 10, // Adjust this based on how many payments you want to show
    });

    return new NextResponse(JSON.stringify({ payments }), { status: 200 });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch payments' }),
      { status: 500 }
    );
  }
}
