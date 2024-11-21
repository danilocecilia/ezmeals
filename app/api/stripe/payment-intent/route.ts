import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
  try {
    const { totalAmount } = await request.json();
    const numericAmount = parseFloat(totalAmount);

    if (isNaN(numericAmount)) {
      return NextResponse.json(
        { error: 'Invalid amount format.' },
        { status: 400 }
      );
    }

    if (!totalAmount) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (numericAmount < 0.5) {
      // Minimum for USD
      return NextResponse.json(
        { error: 'Amount must be at least $0.50.' },
        { status: 400 }
      );
    }
    // Convert to cents
    const amountInCents = Math.round(numericAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
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
