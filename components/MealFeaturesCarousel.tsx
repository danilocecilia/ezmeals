'use client';
import { Button } from '@components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel';
import { MealFeature } from '@types';
import Image from 'next/image';
import * as React from 'react';

export function MealFeaturesCarousel({
  weeklyMeals,
  setSelectedMeal,
  setIsModalOpen
}: {
  weeklyMeals: Array<MealFeature>;
  setSelectedMeal: (meal: MealFeature) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <section className="relative mt-[49px] md:mt-16">
      <Carousel className="w-full">
        <CarouselContent>
          {weeklyMeals.map((meal, index: number) => (
            <CarouselItem key={index}>
              <div className="relative h-screen-minus-49 lg:h-[600px] w-full overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src={weeklyMeals[index].image[0].url}
                  alt={weeklyMeals[index].image[0].name}
                  className="h-full w-full object-cover mask-gradient"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="text-4xl font-bold mb-4">
                    {weeklyMeals[index].name}
                  </h2>
                  <p className="hidden md:blocktext-lg mb-6">
                    {weeklyMeals[index].description}
                  </p>
                  <Button
                    size="lg"
                    variant="default"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedMeal(meal);
                    }}
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white" />
        <CarouselNext className="right-4 bg-white" />
      </Carousel>
    </section>
  );
}
