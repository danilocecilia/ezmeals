'use client';

import { CarouselDemo } from '@components/carousel';
import MealItem from '@components/meal-item';
import { Button } from '@components/ui/button';
// import { auth } from '@root/auth';
import useGetWeeklyMealPlanner from '@root/hooks/use-get-weekly-meal-planner';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const Home = () => {
  const { weeklyMealPlanner, isLoading, isError } = useGetWeeklyMealPlanner();

  // const session = await auth();
  // console.log(session);

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="container mx-auto">
      <CarouselDemo weeklyMeals={weeklyMealPlanner} />

      <div className="grid grid-cols-4 justify-center">
        {weeklyMealPlanner?.map((meal) => (
          <MealItem key={meal._id} meal={meal} />
        ))}
      </div>
    </main>
  );
};

export default Home;
