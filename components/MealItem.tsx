'use client';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { useCart } from '@root/context/CartContext';
import { addItemToCart } from '@utils/cartUtils';
import Image from 'next/image';
import React from 'react';

export type Meal = {
  _id: string;
  name: string;
  price: number;
  image: { url: string }[];
  description?: string;
  category?: string;
  maxQuantity: number;
};
interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const cart = useCart();

  return (
    <div
      className="grid grid-cols-[auto,1fr] justify-center items-start gap-10 p-5"
      key={meal?._id}
    >
      <div className="flex justify-center overflow-hidden rounded-md max-h-[492px] max-w-[492px]">
        <Image
          src={meal?.image[0]?.url || '/placeholder-image.jpg'}
          alt={meal?.name || 'Meal image'}
          width={492}
          height={492}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-110 aspect-[3/4]'
          )}
        />
      </div>
      <div className="flex flex-col h-full space-y-4">
        <h1 className="text-4xl font-semibold">{meal?.name}</h1>
        <Separator className="max-w-[500px]" />
        <p className="max-w-[700px]">{meal?.description}</p>
        <p className="text-xl font-semibold text-[#5e5e5e]">
          Price: &nbsp;
          <span className="text-sm relative top-[-5.75px]">$</span>
          {meal?.price}
        </p>
        <p>Category: {meal?.category}</p>
        <div className="flex h-full w-full items-end">
          <Button
            className="cursor-pointer mt-5 w-full"
            type="button"
            title="Add to Shopping Cart"
            onClick={() => meal && addItemToCart(cart.dispatch, meal)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
