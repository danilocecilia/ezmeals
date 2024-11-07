import { CarouselMeal } from '@components/carousel';
import { useModal } from '@root/context/ModalContext';
import useGetWeeklyMealPlanner from '@root/hooks/useGetWeeklyMealPlanner';
import React from 'react';

import MealItemsCarousel from './MealItemsCarousel';

const CardCarousel: React.FC = () => {
  const { weeklyMealPlanner, isLoading, isError } = useGetWeeklyMealPlanner();

  const { openModal } = useModal();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading meals</div>;

  return (
    <>
      {weeklyMealPlanner && (
        <CarouselMeal
          setSelectedMeal={openModal}
          setIsModalOpen={() => {}}
          weeklyMeals={weeklyMealPlanner}
        />
      )}

      {weeklyMealPlanner && (
        <MealItemsCarousel
          openModal={openModal}
          weeklyMeals={weeklyMealPlanner}
        />
      )}
    </>
  );
};

export default CardCarousel;
