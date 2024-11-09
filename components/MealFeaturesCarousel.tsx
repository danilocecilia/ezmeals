'use client';
import { Card, CardContent } from '@components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel';
import { Separator } from '@components/ui/separator';
import { Meal } from '@types';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import * as React from 'react';

export function MealFeaturesCarousel({
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
      <Separator className="w-[280px] my-4 self-center" />
      <Carousel
        className="max-w-[900px] flex justify-center m-auto my-8"
        // plugins={[
        //   Autoplay({
        //     delay: 6000
        //   })
        // ]}
      >
        <CarouselContent>
          {weeklyMeals.map((meal, index: number) => (
            <CarouselItem
              key={index}
              className="flex-[0_0_80%] md:flex-[0_0_40%]"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMeal(meal);
              }}
            >
              <div className="p-1">
                <Card>
                  <CardContent className="relative flex aspect-square items-center justify-center p-6 cursor-pointer text-center">
                    <div className="absolute flex justify-center items-center w-full h-[67px] max-w-[86%] mt-[26px] bg-[white] top-3 opacity-85 text-md md:text-xl font-bold px-2">
                      <h2>{meal.name}</h2>
                    </div>
                    <Image
                      src={weeklyMeals[index].image[0].url}
                      alt="Image"
                      layout="intrinsic"
                      width={500}
                      height={500}
                      className="rounded-md"
                    ></Image>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-violet-200 hover:font-bold" />
        <CarouselNext className=" hover:bg-violet-200 hover:font-bold" />
      </Carousel>
    </div>
  );
}
