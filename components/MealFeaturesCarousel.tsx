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
    <div className="flex flex-col justify-center pt-10 md:p-10">
      <h1 className="flex md:justify-center text-2xl md:text-4xl font-bold">
        Weekly Meal
      </h1>
      <Separator className="md:w-[280px] my-4 self-center" />
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
              className="flex-[0_0_70%] md:flex-[0_0_40%]"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMeal(meal);
              }}
            >
              <div className="p-1">
                <Card className="bg-violet-50">
                  <CardContent className="relative flex aspect-square items-center justify-center p-2 md:p-6 cursor-pointer text-center z-1">
                    <figure className="text-center relative">
                      {meal?.maxQuantity === 0 && (
                        <Image
                          src={'/images/out_of_stock.png'}
                          alt="Out of Stock"
                          width={150}
                          height={150}
                          priority={true}
                          className="absolute w-20 h-20 opacity-50 bottom-2 left-2 z-20"
                        />
                      )}
                      <Image
                        src={weeklyMeals[index].image[0].url}
                        alt="Meal Image"
                        width={500}
                        height={500}
                        priority={true}
                        className="rounded-md w-60 h-60 md:w-[400px] md:h-[400px] object-cover mask-gradient"
                      />
                      <figcaption className="absolute flex justify-center items-center top-3 left-0 right-0 h-[67px] md:text-sm lg:text-lg text-center text-white bg-black bg-opacity-50 py-2">
                        {meal.name}
                      </figcaption>
                    </figure>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-violet-200 hover:font-bold w-10 h-10 hidden lg:inline-flex" />
        <CarouselNext className=" hover:bg-violet-200 hover:font-bold w-10 h-10 hidden lg:inline-flex" />
      </Carousel>
    </div>
  );
}
