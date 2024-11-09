export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItemsQuantity: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'UPDATE_ITEM_QUANTITY'; itemId: string; quantity: number }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR_CART' };
