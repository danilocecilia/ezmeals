import {
  saveToSessionStorage,
  loadFromSessionStorage
} from '@root/utils/sessionStorage';
import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR_CART' };

const initialCartState: CartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      // eslint-disable-next-line no-case-declarations
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.quantity;
      // eslint-disable-next-line no-case-declarations
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      // eslint-disable-next-line no-case-declarations
      const existingCartItem = state.items[existingCartItemIndex];
      // eslint-disable-next-line no-case-declarations
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

    case 'REMOVE_ITEM':
      // eslint-disable-next-line no-case-declarations
      const itemIndex = state.items.findIndex((item) => item.id === action.id);
      // eslint-disable-next-line no-case-declarations
      const itemToRemove = state.items[itemIndex];
      // eslint-disable-next-line no-case-declarations
      const updatedAmount = state.totalAmount - itemToRemove.price;
      // eslint-disable-next-line no-case-declarations
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

    case 'CLEAR_CART':
      return initialCartState;

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialCartState,
  dispatch: () => undefined
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from session storage on initial render
  useEffect(() => {
    const storedCart = loadFromSessionStorage('cart');
    if (storedCart && Array.isArray(storedCart))
      setCart(storedCart as CartItem[]);
  }, []);

  // Save cart to session storage whenever it changes
  useEffect(() => {
    saveToSessionStorage('cart', cart);
  }, [cart]);

  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
