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
import Autoplay from 'embla-carousel-autoplay';
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
                <Card>
                  <CardContent className="relative flex aspect-square items-center justify-center p-2 md:p-6 cursor-pointer text-center">
                    <div className="absolute flex justify-center items-center w-full h-[67px] max-w-[86%] mt-[26px] bg-[white] top-3 opacity-85 md:text-sm lg:text-lg font-bold px-2">
                      <h2>{meal.name}</h2>
                    </div>
                    {meal?.maxQuantity === 0 && (
                      <Image
                        src={'/images/out_of_stock.png'}
                        alt="Image"
                        width={150}
                        height={150}
                        priority={true}
                        className="absolute opacity-60 bottom-12"
                      ></Image>
                    )}
                    <Image
                      src={weeklyMeals[index].image[0].url}
                      alt="Image"
                      width={500}
                      height={500}
                      priority={true}
                      className="rounded-md w-60 h-60 md:w-[400px] md:h-[400px] object-cover"
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
