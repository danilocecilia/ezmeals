'use client';

import LoadingComponent from '@root/components/loading';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default function StripeProvider({
  children,
  amount
}: {
  children: React.ReactNode;
  amount: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ totalAmount: amount })
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('Failed to create clientSecret:', data);
        }
      } catch (error) {
        console.error('Error fetching clientSecret:', error);
      }
    };

    fetchClientSecret();
  }, [amount]);

  if (!clientSecret) return <LoadingComponent className="justify-center" />;

  const options = { clientSecret };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
