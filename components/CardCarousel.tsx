import { CarouselMeal } from '@components/carousel';
import MealCard from '@root/components/MealCard';
import { useModal } from '@root/context/ModalContext';
import useGetWeeklyMealPlanner from '@root/hooks/useGetWeeklyMealPlanner';
import React from 'react';

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {weeklyMealPlanner?.map((meal) => (
          <MealCard
            key={meal._id}
            meal={meal}
            onCardClick={() => openModal(meal)}
          />
        ))}
      </div>
    </>
  );
};

export default CardCarousel;
