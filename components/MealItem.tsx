'use client';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { useCart } from '@root/context/CartContext';
// import { useModal } from '@root/context/ModalContext';
import { addItemToCart } from '@utils/cartUtils';
import Image from 'next/image';
import React from 'react';

import { DrawerMealCheckout } from './DrawerMealCheckout';

export interface Meal {
  _id: string;
  name: string;
  price: number;
  image: { url: string }[];
  description?: string;
  category?: string;
  maxQuantity?: number;
}

export interface MealWithPlanner extends Meal {
  plannerId: string;
}

interface MealItemProps {
  meal: MealWithPlanner;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const cart = useCart();
  // const { closeModal } = useModal();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleAddToCart = () => {
    if (meal && (meal.maxQuantity ?? 0) > 0) {
      setIsDrawerOpen(true);
      addItemToCart(cart.dispatch, {
        ...meal,
        maxQuantity: meal.maxQuantity ?? 0
      });
    }
  };

  return (
    <div
      className="grid grid-cols-[auto] lg:grid-cols-[auto,1fr] justify-center items-start gap-2 lg:gap-10 p-0 lg:p-5"
      key={meal?._id}
    >
      <div className="relative flex justify-center overflow-hidden rounded-md lg:max-h-[492px] lg:max-w-[492px]">
        {meal?.maxQuantity === 0 && (
          <Image
            src={'/images/out_of_stock.png'}
            alt="Image"
            width={200}
            height={200}
            priority={true}
            className="absolute opacity-60 bottom-6"
          ></Image>
        )}
        <Image
          src={meal?.image[0]?.url || '/placeholder-image.jpg'}
          alt={meal?.name || 'Meal image'}
          width={492}
          height={492}
          className={cn(
            'w-60 h-60 lg:h-auto lg:w-auto object-cover transition-all hover:scale-110 aspect-[3/4]'
          )}
        />
      </div>
      <div className="flex flex-col h-full space-y-4">
        <h1 className="text-xl lg:text-4xl font-semibold">{meal?.name}</h1>
        <Separator className="max-w-[500px]" />
        <p className="text-sm lg:text-md max-w-[700px]">{meal?.description}</p>
        <p className="text-xl font-semibold text-[#5e5e5e]">
          Price: &nbsp;
          <span className="text-sm relative top-[-5.75px]">$</span>
          {meal?.price}
        </p>
        <p>Category: {meal?.category}</p>
        <div className="flex h-full w-full items-end">
          <Button
            className={cn(
              'cursor-pointer mt-0 lg:mt-5 w-full',
              meal?.maxQuantity === 0 &&
                'cursor-not-allowed bg-gray-300 hover:bg-gray-200'
            )}
            type="button"
            title="Add to Shopping Cart"
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      {isDrawerOpen && (
        <DrawerMealCheckout
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default MealItem;
