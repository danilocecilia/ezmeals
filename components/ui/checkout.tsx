'use client';

import { DrawerMealCheckout } from '@components/DrawerMealCheckout';
import { useCart } from '@root/context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

const Checkout = () => {
  const { state } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [focus, setFocus] = useState(false);

  React.useEffect(() => {
    if (state.items.length > 0) {
      setFocus(true);
      const timer = setTimeout(() => setFocus(false), 2000); // Remove focus after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [state.items]);

  const handleCheckout = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <DrawerMealCheckout
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <div className="h-full w-full center">
        <div className="relative z-0 ">
          <motion.button
            onClick={() => handleCheckout()} // Add onClick handler
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            className="h-12 px-10 overflow-hidden z-10 flex items-center gap-2 rounded-xl"
          >
            <span className="relative flex w-10 h-10 hover:bg-violet-100 justify-center items-center rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {state.items.length > 0 && (
                <motion.span
                  animate={{
                    y: focus ? 0 : '100%',
                    opacity: focus ? 1 : 0
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  className="text-md h-5 w-5 rounded-full bg-primary text-primary-foreground -top-1 -right-1.5 absolute"
                >
                  {state.totalItemsQuantity > 9
                    ? '9+'
                    : state.totalItemsQuantity}
                </motion.span>
              )}
            </span>
            <span className="text-md font-semibold">Cart</span>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
