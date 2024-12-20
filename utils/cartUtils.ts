import { CartAction, CartItemWith_Id } from '@types';

type Meal = {
  _id: string;
  name: string;
  price: number;
  maxQuantity: number;
  image: { url: string }[];
  plannerId: string;
};

export const addItemToCart = (
  dispatch: React.Dispatch<CartAction>,
  meal: Meal
) => {
  dispatch({
    type: 'ADD_ITEM',
    item: {
      id: meal._id,
      name: meal.name,
      price: meal.price,
      quantity: 1,
      image: meal.image[0]?.url,
      maxQuantity: meal.maxQuantity,
      plannerId: meal.plannerId
    }
  });
};

export const updateItemQuantity = (
  dispatch: React.Dispatch<CartAction>,
  itemId: string,
  quantity: number
) => {
  dispatch({
    type: 'UPDATE_ITEM_QUANTITY',
    itemId,
    quantity
  });
};

export const clearCart = (dispatch: React.Dispatch<CartAction>) => {
  dispatch({ type: 'CLEAR_CART' });
};

export const handlePaymentFailure = (
  dispatch: React.Dispatch<CartAction>,
  updatedInventory: CartItemWith_Id[]
) => {
  const inventoryMap = updatedInventory.reduce(
    (acc: { [key: string]: number }, item) => {
      acc[item._id] = item.quantity;
      return acc;
    },
    {}
  );

  dispatch({
    type: 'UPDATE_CART_AFTER_PAYMENT_FAILURE',
    updatedInventory: inventoryMap
  });
};
