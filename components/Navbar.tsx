'use client';

import { Icons } from '@components/icons';
import Checkout from '@components/ui/checkout';
import { useCurrentSession } from '@hooks/useCurrentSession';
import { cn } from '@lib/utils';
import { Menu, Package2, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const DynamicHeaderAuth = dynamic(() => import('./HeaderAuth'), {
  ssr: false
});

const Navbar = () => {
  const pathname = usePathname();
  const { session, status } = useCurrentSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-[white] border-b-[1px]">
      <nav
        className={cn(
          'container mx-auto hidden h-16 flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full justify-between',
          { 'max-w-[1152px]': pathname === '/checkout' }
        )}
      >
        {pathname === '/checkout' && (
          <div className="flex gap-8 items-center">
            <Link
              href="/"
              className="hidden md:flex items-center gap-4 text-lg font-semibold md:text-base"
            >
              <ArrowLeft />
              <span className="hidden text-sm font-bold lg:inline-block">
                Back to store
              </span>
            </Link>
          </div>
        )}
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="hidden md:flex items-center gap-4 text-lg font-semibold md:text-base"
          >
            <Icons.logo className="h-[60px] w-[60px]" />
            <span className="hidden text-2xl font-bold lg:inline-block">
              EZMeal
            </span>
          </Link>
        </div>
        <div className="flex gap-8">
          {pathname !== '/checkout' && (
            <>
              <DynamicHeaderAuth session={session} status={status} />

              <span className="self-center">
                <Checkout />
              </span>
            </>
          )}
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="/admin/meals"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Meals
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
