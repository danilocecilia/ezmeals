'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@components/ui/dialog';
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';

interface CheckoutFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: string;
}

const CheckoutForm = ({
  isOpen,
  onClose,
  totalAmount
}: CheckoutFormModalProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  React.useEffect(() => {
    fetch('/api/stripe/payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: totalAmount })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${totalAmount}`
      }
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] sm:h-auto">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 space-y-4"
        >
          <h1 className="text-xl text-center font-bold mb-4">{`Place your Order`}</h1>
          <h3 className="text-center">Total: ${totalAmount}</h3>
          {clientSecret && <PaymentElement />}
          {errorMessage && <div>{errorMessage}</div>}
          <Button
            type="submit"
            className="w-full py-2"
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : `Pay ${totalAmount}`}
          </Button>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
