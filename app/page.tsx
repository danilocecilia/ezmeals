import { CarouselDemo } from '@components/carousel';
import MealCard from '@components/meal-card';
import { Button } from '@components/ui/button';
import { auth } from '@root/auth';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <main className="container mx-auto">
      <div className="">
        {/* <h1 className="text-8xl">Eazy Meal</h1> */}
        {/* <img src="/logo.jpg" alt="food" /> */}
      </div>
      {/* <div> */}
      <CarouselDemo />

      <div className="flex justify-center space-x-8">
        <MealCard />
        <MealCard />
        <MealCard />
        <MealCard />
      </div>
      {/* </div> */}
      {/* <aside className="space-y-2">
        <span className="block text-4xl font-bold bg-gradient-to-r from-foreground/80 via-foreground/70 to-foreground/90 text-transparent bg-clip-text">
          Welcome to this{' '}
          <span className="bg-gradient-to-r from-sky-400 to-violet-500 text-transparent bg-clip-text">
            NextAuth V5
          </span>
        </span>
        <span className="block text-5xl font-bold bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground text-transparent bg-clip-text">
          starter template
        </span>
      </aside>
      <Button asChild>
        <Link
          className="flex items-center gap-1"
          target="_blank"
          href={`https://www.youtube.com/@webdevjan`}
        >
          <GraduationCap />
          Learn more about this project
        </Link>
      </Button> */}
    </main>
  );
};

export default Home;
