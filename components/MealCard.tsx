'use client';

import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { useCart } from '@root/context/cart-context';
import { Meal } from '@types';
import Image from 'next/image';
import React from 'react';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const cart = useCart();

  return (
    <Card className="max-w-[350px] pt-6">
      <CardContent className="pb-0 cursor-pointer">
        <div className="overflow-hidden rounded-md">
          <Image
            src={meal.image[0].url}
            alt="Image"
            layout="intrinsic"
            width={500}
            height={500}
            className={cn(
              'h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
            )}
          ></Image>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="h-14 cursor-pointer hover:text-primary">
          {meal.name}
        </CardTitle>
        <Separator />
        <CardDescription>
          {meal.description.substring(0, 100)}...
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <div>
          <p className="text-2xl">
            <span className="text-sm relative top-[-5.75px]">$</span>
            {meal.price}
          </p>
          <p className="text-xs">only 3 left</p>
        </div>
        <Button
          className="cursor-pointer"
          type="button"
          onClick={() => {
            cart.dispatch({
              type: 'ADD_ITEM',
              item: {
                id: meal._id,
                name: meal.name,
                price: meal.price,
                quantity: 1
              }
            });
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
