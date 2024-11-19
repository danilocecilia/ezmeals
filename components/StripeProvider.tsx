'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default function StripeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/api/stripe/payment-intent', { method: 'POST' });
      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
    };

    fetchClientSecret();
  }, []);

  if (!clientSecret) return <div>Loading payment information...</div>;

  const options = { clientSecret };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
