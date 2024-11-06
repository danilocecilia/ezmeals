'use client';
import {
  saveToSessionStorage,
  loadFromSessionStorage
} from '@root/utils/sessionStorage';
import { CartItem } from '@types';
import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect
} from 'react';

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.quantity;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.item.quantity
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    }

    case 'REMOVE_ITEM': {
      const itemIndex = state.items.findIndex((item) => item.id === action.id);
      const itemToRemove = state.items[itemIndex];
      const updatedAmount = state.totalAmount - itemToRemove.price;
      let updatedCartItems;

      if (itemToRemove.quantity === 1) {
        updatedCartItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...itemToRemove,
          quantity: itemToRemove.quantity - 1
        };
        updatedCartItems = [...state.items];
        updatedCartItems[itemIndex] = updatedItem;
      }

      return {
        items: updatedCartItems,
        totalAmount: updatedAmount
      };
    }

    case 'CLEAR_CART':
      return initialCartState;

    default:
      return state;
  }
};

const initialCartState: CartState = {
  items: [],
  totalAmount: 0
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialCartState,
  dispatch: () => undefined
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
    const storedCart: CartItem[] =
      (loadFromSessionStorage('cart') as CartItem[]) || [];

    return storedCart
      ? {
          items: storedCart,
          totalAmount: storedCart.reduce(
            (acc, item: CartItem) => acc + item.price * item.quantity,
            0
          )
        }
      : initialCartState;
  });

  // Save cart items to session storage whenever they change
  useEffect(() => {
    saveToSessionStorage('cart', state.items);
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
