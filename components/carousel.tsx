'use client';
import { Card, CardContent } from '@components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import * as React from 'react';

export function CarouselDemo({ weeklyMeals }) {
  // const mealImages = weeklyMealPlanner?.map((meal) => meal.image[0].url);
  // console.log('🚀 ~ CarouselDemo ~ mealImages:', mealImages);

  // console.log('🚀 ~ CarouselDemo ~ isError:', isError);
  // console.log('🚀 ~ CarouselDemo ~ isLoading:', isLoading);
  // console.log('🚀 ~ CarouselDemo ~ weeklyMealPlanner:', weeklyMealPlanner);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center p-10">
      <h1 className="flex justify-center text-4xl font-bold">
        Weekly Meal Menu
      </h1>
      <Carousel
        className="max-w-[900px] flex justify-center m-auto"
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}
      >
        <CarouselContent>
          {weeklyMeals.map((meal, index: string) => (
            <CarouselItem key={index} style={{ flex: '0 0 70%' }}>
              <div className="p-6">
                <Card>
                  <CardContent className="relative flex aspect-square items-center justify-center p-6">
                    <div className="absolute flex justify-center items-center w-full h-[67px] mt-[26px] bg-[white] top-6 opacity-85 text-xl font-bold">
                      <h2>{meal.name}</h2>
                    </div>
                    <Image
                      src={weeklyMeals[index].image[0].url}
                      alt="Image"
                      layout="intrinsic"
                      width={500} // Required, but sets the aspect ratio
                      height={500} // Will adjust automatically based on width
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
