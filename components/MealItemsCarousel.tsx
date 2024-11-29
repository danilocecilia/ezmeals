'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel';
import { Separator } from '@components/ui/separator';
import { Meal } from '@types';
import * as React from 'react';

import MealCard from './MealCard';

interface MealItemsCarouselProps {
  weeklyMeals: Meal[];
  openModal: (meal: Meal) => void;
  title: string;
}

const MealItemsCarousel: React.FC<MealItemsCarouselProps> = ({
  weeklyMeals,
  openModal,
  title
}) => (
  <div className="flex flex-col justify-center p-0 md:p-10 my-10">
    <h1 className="flex justify-start md:justify-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
      {title}
    </h1>
    <Separator className="md:w-[280px] my-4 md:self-center" />
    <div className="mt-4 justify-start lg:justify-center">
      <Carousel>
        <CarouselContent className="mt-4 container">
          {weeklyMeals.map((meal, index: number) => (
            <CarouselItem
              key={index}
              className="flex-none"
              onClick={() => openModal(meal)}
            >
              <MealCard
                key={meal._id}
                // @ts-expect-error - Required for page to render
                meal={meal}
                onCardClick={() => openModal(meal)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 lg:left-6 -top-4 hover:bg-violet-200 hover:font-bold" />
        <CarouselNext className="-top-4 left-10 lg:left-16 hover:bg-violet-200 hover:font-bold" />
      </Carousel>
    </div>
  </div>
);

export default MealItemsCarousel;
