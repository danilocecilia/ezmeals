import LoadingComponent from '@root/components/loading';
import { MealFeaturesCarousel } from '@root/components/MealFeaturesCarousel';
import { useCart } from '@root/context/CartContext';
import { useModal } from '@root/context/ModalContext';
import useGetWeeklyMealPlanner from '@root/hooks/useGetWeeklyMealPlanner';
import { clearCart } from '@root/utils/cartUtils';
import React from 'react';

import MealItemsCarousel from './MealItemsCarousel';

const CardCarousel: React.FC = () => {
  const { dispatch } = useCart();

  const { weeklyMealPlanner, isLoading, isError } = useGetWeeklyMealPlanner();
  const { openModal } = useModal();

  React.useEffect(() => {
    if (Array.isArray(weeklyMealPlanner) && weeklyMealPlanner.length === 0) {
      clearCart(dispatch);
    }
  }, [weeklyMealPlanner, dispatch]);

  if (isLoading)
    return <LoadingComponent className="flex justify-center py-28" />;
  if (isError) return <div>Error loading meals</div>;

  const mainMeals = Array.isArray(weeklyMealPlanner)
    ? weeklyMealPlanner.filter(
        (meal: { side?: boolean; category?: string }) =>
          !meal?.side && meal?.category !== 'dessert'
      )
    : [];

  const sideMeals = Array.isArray(weeklyMealPlanner)
    ? weeklyMealPlanner.filter((meal: { side?: boolean }) => meal?.side)
    : [];

  const dessertMeals = Array.isArray(weeklyMealPlanner)
    ? weeklyMealPlanner.filter(
        (meal: { category?: string }) => meal?.category === 'dessert'
      )
    : [];

  const handleNoWeeklyMeals = () => {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-lg">No meals available for this week.</p>
      </div>
    );
  };

  return (
    <>
      {Array.isArray(weeklyMealPlanner) && weeklyMealPlanner.length === 0 ? (
        handleNoWeeklyMeals()
      ) : (
        <>
          {Array.isArray(mainMeals) && (
            <MealFeaturesCarousel
              setSelectedMeal={openModal}
              setIsModalOpen={() => {}}
              weeklyMeals={mainMeals}
            />
          )}

          {Array.isArray(mainMeals) && (
            <MealItemsCarousel
              openModal={openModal}
              title="Weekly Special Meals"
              weeklyMeals={mainMeals}
            />
          )}

          {Array.isArray(sideMeals) && (
            <MealItemsCarousel
              openModal={openModal}
              title="Side Meals"
              weeklyMeals={sideMeals}
            />
          )}

          {Array.isArray(dessertMeals) && (
            <MealItemsCarousel
              openModal={openModal}
              title="Desserts"
              weeklyMeals={dessertMeals}
            />
          )}
        </>
      )}
    </>
  );
};

export default CardCarousel;
