import { CartAction } from '@types';
import { Meal } from '@types';

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
      image: meal.image[0]?.url
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
