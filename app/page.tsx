'use client';

import { CarouselMeal } from '@components/carousel';
import MealCard from '@root/components/MealCard';
// import { Button } from '@components/ui/button';
// import { auth } from '@root/auth';
import useGetWeeklyMealPlanner from '@root/hooks/use-get-weekly-meal-planner';
// import { GraduationCap } from 'lucide-react';
// import Link from 'next/link';

export const Home = () => {
  const { weeklyMealPlanner, isLoading, isError } = useGetWeeklyMealPlanner();

  // const session = await auth();
  // console.log(session);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <main className="container mx-auto">
      <CarouselMeal weeklyMeals={weeklyMealPlanner} />

      <div className="grid grid-cols-4 justify-center">
        {weeklyMealPlanner?.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </main>
  );
};

export default Home;
