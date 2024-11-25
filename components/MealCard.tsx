import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { Meal } from '@types';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface MealCardProps {
  meal: Meal & { maxQuantity: number };
  onCardClick: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onCardClick }) => {
  return (
    <Card className="max-w-[250px] lg:max-w-[350px]">
      <CardContent
        className="relative flex aspect-square md:items-center p-2 md:p-6 cursor-pointer"
        onClick={onCardClick}
      >
        <div className="relative overflow-hidden rounded-md">
          {meal?.maxQuantity === 0 && (
            <Image
              src={'/images/out_of_stock.png'}
              alt="Image"
              width={350}
              height={350}
              priority={true}
              className="absolute opacity-60 bottom-12"
            ></Image>
          )}
          <Image
            src={meal.image[0].url}
            alt={meal.name}
            width={500}
            height={500}
            priority={true}
            className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle
          className="h-14 cursor-pointer hover:text-primary"
          onClick={onCardClick}
        >
          {meal.name}
        </CardTitle>
        <Separator />
        <CardDescription className="min-h-16">
          {meal.description.substring(0, 100)}...
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-xl text-[#5e5e5e]">
            <span className="text-sm relative top-[-5.75px] text-[#5e5e5e]">
              $
            </span>
            {meal.price}
          </p>
        </div>
        <Button
          className={cn(
            'cursor-pointer',
            meal?.maxQuantity === 0 &&
              'cursor-not-allowed bg-gray-300 hover:bg-gray-200'
          )}
          type="button"
          title="Add to Shopping Cart"
          onClick={onCardClick}
        >
          <Plus size={24} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
