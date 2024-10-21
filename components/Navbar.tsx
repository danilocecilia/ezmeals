'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu';
import { useCurrentSession } from '@hooks/useCurrentSession';
import { Menu, Package2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const DynamicHeaderAuth = dynamic(() => import('./HeaderAuth'), {
  ssr: false
});

const Navbar = () => {
  const { session, status } = useCurrentSession();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link
        href="/"
        className="hidden flex md:flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image
          src="/logo_nav.png"
          width={50}
          height={50}
          alt="Picture of the author"
          style={{ objectFit: 'cover', maxWidth: '100%' }}
        />
        {/* <Package2 className="h-6 w-6" /> */}
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/orders"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Orders
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>Meals</DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link
              href="/meals/add"
              className="transition-colors hover:text-foreground"
            >
              <DropdownMenuItem>Add Meal</DropdownMenuItem>
            </Link>
            <Link
              href="/meals"
              className="transition-colors hover:text-foreground"
            >
              <DropdownMenuItem>List All</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href="/schedule"
          className="text-muted-foreground transition-colors hover:text-foreground min-w-max"
        >
          Meal Planner
        </Link>
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
              href="/meals"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Meals
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DynamicHeaderAuth session={session} status={status} />
    </header>
  );
};

export default Navbar;
