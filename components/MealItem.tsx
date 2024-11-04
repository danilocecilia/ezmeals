'use client';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { useCart } from '@root/context/cart-context';
import { Meal } from '@types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

interface MealItemProps {
  meal: Meal;
}

const MealItem: React.FC<MealItemProps> = () => {
  const cart = useCart();
  const { meal } = useParams();
  console.log('🚀 ~ meal:', meal);
  return (
    <div
      className="grid grid-cols-[auto,1fr] justify-center items-start gap-10 p-20"
      key={meal[0]}
    >
      <div className="flex justify-center">
        <Image
          alt="Feijoada"
          src={
            'http://localhost:3000/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2FEjEgUSOL8Sjx3k46J5LOstHeXpiP4YTCDGRVKbjluMdmxNv3&w=640&q=75'
          }
          // alt={meal.name}
          width={500}
          height={500}
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Feijoada</h1>
        <Separator className="max-w-[500px]" />
        <p>
          Brazilian feijoada plate, served on a rustic wooden table. The dish
          features rich, dark beans stewed with pork and sausage, surrounded by
          sides of golden farofa (toasted cassava flour), fluffy white rice,
          fresh orange slices, and collard greens. The meal is presented in a
          way that captures warmth and hospitality, with a natural lighting
          effect, ideal for a website home page carousel. Make the colors bold,
          with clear detail on the textures of each element.{' '}
        </p>
        <p className="text-2xl">
          Price: &nbsp;
          <span className="text-sm relative top-[-5.75px]">$</span>
          20
          {/* {meal.price} */}
        </p>
        <p>Category: Main Course</p>
        <p>Spicy: No</p>
        <p>Vegetarian: No</p>
        <p>Gluten Free: No</p>

        <Button
          className="cursor-pointer"
          type="button"
          title="Add to Shopping Cart"
          onClick={() => {
            // cart.dispatch({
            //   type: 'ADD_ITEM',
            //   item: {
            //     id: '1', //meal._id,
            //     name: 'name', //meal.name,
            //     price: 0, //meal.price,
            //     quantity: 1
            //   }
            // });
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MealItem;
