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
import Image from 'next/image';

const MealCard = ({ meal }) => {
  return (
    <Card className="max-w-[300px]">
      <CardHeader>
        <CardTitle>Feijoada</CardTitle>
        <Separator />
        <CardDescription>
          Brazilian black bean stew with pork, sausage, and spices. Served with
          rice, greens, and orange slices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md">
          <Image
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2FEjEgUSOL8SjxJXdJKO18ma7oGnheb4AsuEkNjCiUOcv9QyTY&w=640&q=75"
            alt="Image"
            layout="intrinsic"
            width={500} // Required, but sets the aspect ratio
            height={500} // Will adjust automatically based on width
            className={cn(
              'h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
            )}
          ></Image>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <p className="text-2xl">$21.95</p>
          <p className="text-xs">only 3 left</p>
        </div>
        <Button
        // onClick={() => ()}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealCard;
