import LoadingComponent from '@root/components/loading';
import { MealFeaturesCarousel } from '@root/components/MealFeaturesCarousel';
import { useModal } from '@root/context/ModalContext';
import useGetWeeklyMealPlanner from '@root/hooks/useGetWeeklyMealPlanner';
import React from 'react';

import MealItemsCarousel from './MealItemsCarousel';

const CardCarousel: React.FC = () => {
  const { weeklyMealPlanner, isLoading, isError } = useGetWeeklyMealPlanner();
  console.log('🚀 ~ weeklyMealPlanner:', weeklyMealPlanner);

  const { openModal } = useModal();

  if (isLoading)
    return <LoadingComponent className="flex justify-center py-28" />;
  if (isError) return <div>Error loading meals</div>;

  const mainMeals = Array.isArray(weeklyMealPlanner)
    ? weeklyMealPlanner.filter(
        (meal) => !meal.side && meal.category !== 'dessert'
      )
    : [];

  const sideMeals = Array.isArray(weeklyMealPlanner)
    ? weeklyMealPlanner.filter((meal) => meal.side)
    : [];

  const dessertMeals = Array.isArray(weeklyMealPlanner)
    ? weeklyMealPlanner.filter((meal) => meal.category === 'dessert')
    : [];

  return (
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
          title="Main Meals"
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
  );
};

export default CardCarousel;
