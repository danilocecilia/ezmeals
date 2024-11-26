'use client';

import { Button } from '@components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@components/ui/dialog';
import { useCart } from '@root/context/CartContext';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { clearCart, handlePaymentFailure } from '@utils/cartUtils';
import {
  checkAvailability,
  reserveItems,
  rollbackReservation
} from '@utils/inventoryUtils';
import Image from 'next/image';
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
  const { state, dispatch } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const saveOrder = async (paymentIntentId: string): Promise<void> => {
    try {
      const response = await fetch('/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentIntentId,
          totalAmount,
          items: state.items // Send cart items to save in the order
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save order. Please try again.');
      }

      const data = await response.json();
      console.log('Order saved successfully:', data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to save the order. Please contact support.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      return;
    }

    setIsLoading(true);

    try {
      // Check availability before proceeding
      const availabilityResponse = await checkAvailability(state.items);
      if (!availabilityResponse.success) {
        if (availabilityResponse.updatedInventory) {
          handlePaymentFailure(dispatch, availabilityResponse.updatedInventory);
        }
        setMessage(
          'Some items are no longer available. They were removed from your cart. Please review your cart.'
        );
        return;
      }

      // Reserve items
      const reservationSuccess = await reserveItems(state.items);
      if (!reservationSuccess) {
        setMessage('Failed to reserve items. Please try again.');
        return;
      }

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success'
        },
        redirect: 'if_required'
      });

      //THIS IS FOR TESTING PURPOSES
      //@ts-expect-error - This is a mock paymentIntent object
      // const { error, paymentIntent } = await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       error: false,
      //       paymentIntent: {
      //         id: 'pi_123456789',
      //         status: 'succeeded'
      //       }
      //     });
      //   }, 1000);
      // });

      if (error) {
        setMessage(`Payment failed, please try again.`);
        await rollbackReservation(state.items); // Rollback reservation if payment fails
      } else if (paymentIntent?.status === 'succeeded') {
        await saveOrder(paymentIntent.id);
        clearCart(dispatch);
        setIsPaymentSuccessful(true);
      } else {
        setMessage('Payment processing. Please wait.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
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
          <Button
            onClick={() => window.location.assign('/')}
            className="w-full py-2"
          >
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
            className="w-full mx-auto p-4 space-y-4"
          >
            <h1 className="text-xl text-center font-bold mb-4">{`Place your Order`}</h1>
            <h3 className="text-center">Total: ${totalAmount}</h3>
            <PaymentElement />
            <Button
              type="submit"
              className="w-full py-2"
              disabled={!stripe || isLoading || !state.items.length}
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
