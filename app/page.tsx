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
      <div className="">
        {/* <h1 className="text-8xl">Eazy Meal</h1> */}
        {/* <img src="/logo.jpg" alt="food" /> */}
      </div>
      {/* <div> */}
      <CarouselDemo weeklyMeals={weeklyMealPlanner} />

      <div className="grid grid-cols-4 justify-center">
        {weeklyMealPlanner?.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </div>
      {/* </div> */}
      {/* <aside className="space-y-2">
        <span className="block text-4xl font-bold bg-gradient-to-r from-foreground/80 via-foreground/70 to-foreground/90 text-transparent bg-clip-text">
          Welcome to this{' '}
          <span className="bg-gradient-to-r from-sky-400 to-violet-500 text-transparent bg-clip-text">
            NextAuth V5
          </span>
        </span>
        <span className="block text-5xl font-bold bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground text-transparent bg-clip-text">
          starter template
        </span>
      </aside>
      <Button asChild>
        <Link
          className="flex items-center gap-1"
          target="_blank"
          href={`https://www.youtube.com/@webdevjan`}
        >
          <GraduationCap />
          Learn more about this project
        </Link>
      </Button> */}
    </main>
  );
};

export default Home;
