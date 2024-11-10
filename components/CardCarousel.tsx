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

  return (
    <>
      {Array.isArray(weeklyMealPlanner) && (
        <MealFeaturesCarousel
          setSelectedMeal={openModal}
          setIsModalOpen={() => {}}
          weeklyMeals={weeklyMealPlanner}
        />
      )}

      {Array.isArray(weeklyMealPlanner) && (
        <MealItemsCarousel
          openModal={openModal}
          weeklyMeals={weeklyMealPlanner}
        />
      )}
    </>
  );
};

export default CardCarousel;
