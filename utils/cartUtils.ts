import { CartAction } from '@root/context/CartContext';
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
