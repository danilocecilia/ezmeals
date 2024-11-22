'use client';
import {
  saveToSessionStorage,
  loadFromSessionStorage
} from '@root/utils/sessionStorage';
import { CartAction, CartItem, CartState } from '@types';
import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect
} from 'react';

const recalculateTotals = (items: CartItem[]) => {
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItemsQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return {
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    totalItemsQuantity
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload; // Initialize state with loaded cart
    case 'ADD_ITEM': {
      const existingCartItemIndex = state.items.findIndex(
        (item: CartItem) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + action.item.quantity;
        if (newQuantity > action.item.maxQuantity) {
          // If the new quantity exceeds maxQuantity, set it to maxQuantity
          const updatedItem = {
            ...existingCartItem,
            quantity: action.item.maxQuantity
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const updatedItem = {
            ...existingCartItem,
            quantity: newQuantity
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
      } else {
        if (action.item.quantity > action.item.maxQuantity) {
          // If the initial quantity exceeds maxQuantity, set it to maxQuantity
          action.item.quantity = action.item.maxQuantity;
        }
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        ...recalculateTotals(updatedItems)
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
        totalAmount: parseFloat(updatedAmount.toFixed(2)),
        totalItemsQuantity: state.totalItemsQuantity - 1
      };
    }

    case 'UPDATE_ITEM_QUANTITY': {
      if (action.quantity === -1) {
        const updatedItems = state.items.filter(
          (item) => item.id !== action.itemId
        );

        return {
          items: updatedItems,
          ...recalculateTotals(updatedItems)
        };
      }

      const updatedItems = state.items.map((item) => {
        if (item.id === action.itemId) {
          const newQuantity =
            action.quantity > item.maxQuantity
              ? item.maxQuantity
              : action.quantity;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      return {
        items: updatedItems,
        ...recalculateTotals(updatedItems)
      };
    }

    case 'UPDATE_CART_AFTER_PAYMENT_FAILURE': {
      const updatedItems = state.items
        .map((item) => {
          const availableQuantity = action.updatedInventory[item.plannerId];
          if (availableQuantity !== undefined && availableQuantity <= 0) {
            // Remove items that are no longer available
            return null;
          }

          // Update item quantities based on available inventory
          const updatedItem: CartItem = {
            ...item,
            quantity:
              availableQuantity !== undefined
                ? Math.min(item.quantity, availableQuantity)
                : item.quantity,
            maxQuantity: availableQuantity ?? item.quantity
          };
          return updatedItem;
        })
        .filter((item): item is CartItem => item !== null); // Filter out null values

      return {
        ...state,
        items: updatedItems,
        ...recalculateTotals(updatedItems)
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
  totalAmount: 0,
  totalItemsQuantity: 0
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialCartState,
  dispatch: () => null
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    // Set mounted flag to true after the component mounts on the client
    setIsMounted(true);

    // Only load from session storage on client mount
    const storedCart = (loadFromSessionStorage('cart') as CartItem[]) || [];

    if (storedCart.length > 0) {
      dispatch({
        type: 'LOAD_CART',
        payload: {
          items: storedCart,
          totalAmount: storedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          totalItemsQuantity: storedCart.reduce(
            (acc, item) => acc + item.quantity,
            0
          )
        }
      });
    }
  }, []);

  // Save to session storage when items change, but only on client
  useEffect(() => {
    if (isMounted) {
      saveToSessionStorage('cart', state.items);
    }
  }, [state.items, isMounted]);

  if (!isMounted) {
    // Return null on server render, only load after mounting on client
    return null;
  }

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
