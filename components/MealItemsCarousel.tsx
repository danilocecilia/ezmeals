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
  <div className="flex flex-col justify-center p-10">
    <h1 className="flex justify-center text-4xl font-bold">{title}</h1>
    <Separator className="w-[280px] my-4 self-center" />

    <Carousel>
      <CarouselContent>
        {weeklyMeals.map((meal, index: number) => (
          <CarouselItem
            key={index}
            className="flex-none"
            onClick={() => openModal(meal)}
          >
            <div className="grid grid-flow-col auto-cols-max mt-4">
              <MealCard
                key={meal._id}
                meal={meal}
                onCardClick={() => openModal(meal)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-6 -top-4 hover:bg-violet-200 hover:font-bold" />
      <CarouselNext className="-top-4 left-16 hover:bg-violet-200 hover:font-bold" />
    </Carousel>
  </div>
);

export default MealItemsCarousel;
