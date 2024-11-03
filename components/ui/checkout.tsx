'use client';

import { useCart } from '@root/context/cart-context';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

const Checkout = () => {
  const { state } = useCart();

  React.useEffect(() => {
    if (state.items.length > 0) {
      setFocus(true);
      const timer = setTimeout(() => setFocus(false), 2000); // Remove focus after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [state.items]);

  const getTotalQuantity = () => {
    return state.items.reduce((acc, item) => acc + item.quantity, 0);
  };

  const [focus, setFocus] = useState(false);
  return (
    <div className="h-full w-full center">
      <div className="relative z-0 ">
        <motion.button
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
          className="h-12 px-10 overflow-hidden z-10 flex items-center gap-2 rounded-xl"
        >
          <span className="relative">
            <ShoppingCart className="h-5 w-5 ml-2" />
            <motion.span
              animate={{
                y: focus ? 0 : '100%',
                opacity: focus ? 1 : 0
              }}
              transition={{
                duration: 0.2
              }}
              className="text-xs h-4 w-4 rounded-full bg-primary text-primary-foreground -top-1.5 -right-1.5 absolute"
            >
              {state.items.length > 0 ? getTotalQuantity() : ''}
            </motion.span>
          </span>
          <span className="text-md font-semibold">Cart</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Checkout;
