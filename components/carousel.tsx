'use client';
import { Card, CardContent } from '@components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel';
import { Meal } from '@types';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import * as React from 'react';

export function CarouselMeal({
  weeklyMeals,
  setSelectedMeal,
  setIsModalOpen
}: {
  weeklyMeals: Array<Meal>;
  setSelectedMeal: (meal: Meal) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-col justify-center p-10">
      <h1 className="flex justify-center text-4xl font-bold">Weekly Meal</h1>
      <Carousel
        className="max-w-[900px] flex justify-center m-auto"
        plugins={[
          Autoplay({
            delay: 6000
          })
        ]}
      >
        <CarouselContent>
          {weeklyMeals.map((meal, index: number) => (
            <CarouselItem
              key={index}
              style={{ flex: '0 0 70%' }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMeal(meal);
              }}
            >
              <div className="p-6">
                <Card>
                  <CardContent className="relative flex aspect-square items-center justify-center p-6 cursor-pointer">
                    <div className="absolute flex justify-center items-center w-full h-[67px] mt-[26px] bg-[white] top-6 opacity-85 text-xl font-bold">
                      <h2>{meal.name}</h2>
                    </div>
                    <Image
                      src={weeklyMeals[index].image[0].url}
                      alt="Image"
                      layout="intrinsic"
                      width={500}
                      height={500}
                    ></Image>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
