'use client';
import { Button } from '@components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel';
import { useIntersection } from '@root/context/TargetRefContext';
import { MealFeature } from '@types';
import Image from 'next/image';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export function MealFeaturesCarousel({
  weeklyMeals,
  setSelectedMeal,
  setIsModalOpen
}: {
  weeklyMeals: Array<MealFeature>;
  setSelectedMeal: (meal: MealFeature) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  const intersection = useIntersection();
  const setIsIntersecting = intersection?.setIsIntersecting;

  const { ref } = useInView({
    triggerOnce: false, // Keep triggering as long as it intersects
    onChange: (inView) => setIsIntersecting && setIsIntersecting(inView),
    rootMargin: `0px 0px -100% 0px`
  });

  return (
    <>
      <section className="relative target-element" ref={ref}>
        <Carousel className="w-full">
          <CarouselContent>
            {weeklyMeals.map((meal, index: number) => (
              <CarouselItem key={index}>
                <div className="relative lg:h-[600px] w-full overflow-hidden">
                  <Image
                    width={1700}
                    height={600}
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
    </>
  );
}
