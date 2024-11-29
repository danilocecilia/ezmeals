import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Meal } from '@types';
import Image from 'next/image';
import React from 'react';

interface MealCardProps {
  meal: Meal & { maxQuantity: number };
  onCardClick: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onCardClick }) => {
  return (
    <Card key={meal.name}>
      <div className="relative overflow-hidden rounded-t-lg">
        {meal?.maxQuantity === 0 && (
          <Image
            src={'/images/out_of_stock.png'}
            alt="Image"
            width={300}
            height={300}
            priority={true}
            className="absolute w-40 h-40 opacity-50 top-0 left-20 z-20"
          ></Image>
        )}
        <Image
          src={meal.image[0].url}
          alt={meal.name}
          width={500}
          height={500}
          priority={true}
          className="h-48 w-full object-cover transition-all hover:scale-105 aspect-[3/4] mask-gradient"
        />
      </div>
      <CardHeader>
        <div className="flex items-center h-12 justify-between w-64">
          <CardTitle className="text-md">{meal.name}</CardTitle>
          <span className="font-bold text-primary">${meal.price}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground"></span>
            </div>
          </div>
          <Button
            size="sm"
            className={cn(
              'cursor-pointer',
              meal?.maxQuantity === 0 &&
                'cursor-not-allowed bg-gray-300 hover:bg-gray-200'
            )}
            type="button"
            title="Add to Shopping Cart"
            onClick={onCardClick}
          >
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
