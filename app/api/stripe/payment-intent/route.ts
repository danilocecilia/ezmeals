import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000, // $20.00
      currency: 'cad',
      automatic_payment_methods: { enabled: true }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
