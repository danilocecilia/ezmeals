'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@components/ui/dialog';
import { useCart } from '@root/context/CartContext';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { clearCart } from '@utils/cartUtils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const { dispatch } = useCart();
  const rounter = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements, // Automatically grabs clientSecret and PaymentElement
        confirmParams: {
          return_url: window.location.origin + '/payment-success' // Optional: redirect on success
        },
        redirect: 'if_required' // Prevent full-page redirect
      });

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent?.status === 'succeeded') {
        clearCart(dispatch);
        setIsPaymentSuccessful(true);
      } else {
        setMessage('Payment processing. Please wait.');
      }
    } catch (err) {
      setMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!stripe || !elements) {
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

  const SuccessPayment = () => {
    return (
      <div className="max-w-md mx-auto p-4 space-y-8 justify-items-center">
        <Image
          src="/images/success.png"
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <h1 className="text-2xl text-center font-bold mb-4">
          Payment Successful
        </h1>
        <div className="text-center space-y-10">
          <p>Thank you for your purchase!</p>
          <Button onClick={() => rounter.push('/')} className="w-full py-2">
            Return to Home
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => !isPaymentSuccessful && onClose()}
    >
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-[700px] sm:h-auto"
      >
        {!isPaymentSuccessful && (
          <DialogClose className="flex w-10 h-10 justify-center items-center" />
        )}
        {isPaymentSuccessful ? (
          <SuccessPayment />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 space-y-4"
          >
            <h1 className="text-xl text-center font-bold mb-4">{`Place your Order`}</h1>
            <h3 className="text-center">Total: ${totalAmount}</h3>
            <PaymentElement />
            <Button
              type="submit"
              className="w-full py-2"
              disabled={!stripe || isLoading}
            >
              {isLoading ? 'Processing your payment...' : `Pay ${totalAmount}`}
            </Button>

            {message && <p className="mt-4 text-red-500">{message}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
