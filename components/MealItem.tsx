'use client';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { cn } from '@lib/utils';
import { useCart } from '@root/context/CartContext';
import { Meal } from '@types';
import { addItemToCart } from '@utils/cartUtils';
import useGetMealById from 'hooks/useGetMealById';
import Image from 'next/image';
import React from 'react';

import LoadingComponent from './loading';

interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const cart = useCart();
  const { data, isLoading, error } = useGetMealById(meal?._id);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <LoadingComponent className="justify-center" />;
  }

  return (
    <div
      className="grid grid-cols-[auto,1fr] justify-center items-start gap-10 p-5"
      key={data?._id}
    >
      <div className="flex justify-center overflow-hidden rounded-md max-h-[492px] max-w-[492px]">
        <Image
          src={data?.image[0]?.url || '/placeholder-image.jpg'}
          alt={data?.name || 'Meal image'}
          width={492}
          height={492}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-110 aspect-[3/4]'
          )}
        />
      </div>
      <div className="flex flex-col h-full space-y-4">
        <h1 className="text-4xl font-semibold">{data?.name}</h1>
        <Separator className="max-w-[500px]" />
        <p className="max-w-[700px]">{data?.description}</p>
        <p className="text-xl font-semibold text-[#5e5e5e]">
          Price: &nbsp;
          <span className="text-sm relative top-[-5.75px]">$</span>
          {data?.price}
        </p>
        <p>Category: {data?.category}</p>
        <div className="flex h-full w-full items-end">
          <Button
            className="cursor-pointer mt-5 w-full"
            type="button"
            title="Add to Shopping Cart"
            onClick={() => data && addItemToCart(cart.dispatch, data)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
