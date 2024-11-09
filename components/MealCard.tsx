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
import { useCart } from '@root/context/CartContext';
import { Meal } from '@types';
import { addItemToCart } from '@utils/cartUtils';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface MealCardProps {
  meal: Meal;
  onCardClick: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onCardClick }) => {
  const cart = useCart();

  const handleAddToCart = () => {
    addItemToCart(cart.dispatch, meal);
    onCardClick();
  };

  return (
    <Card className="max-w-[350px] pt-6">
      <CardContent className="pb-0 cursor-pointer" onClick={onCardClick}>
        <div className="overflow-hidden rounded-md">
          <Image
            src={meal.image[0].url}
            alt={meal.name}
            layout="intrinsic"
            width={500}
            height={500}
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
        <CardDescription>
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
          className="cursor-pointer"
          type="button"
          title="Add to Shopping Cart"
          onClick={handleAddToCart}
        >
          <Plus size={24} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
