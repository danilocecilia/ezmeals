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
import { UserNav } from './user-nav';

const DynamicHeaderAuth = dynamic(() => import('./HeaderAuth'), {
  ssr: false
});

const Navbar = () => {
  const { session, status } = useCurrentSession();

  return (
    <header className="sticky top-0 flex h-26 items-center gap-6 px-4 md:px-6 border-b">
      <nav className="container mx-auto hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full justify-between">
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="hidden flex md:flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image
              src="/logo.jpg"
              width={60}
              height={60}
              alt="Eazy Meal Logo"
              style={{ objectFit: 'cover', maxWidth: 'unset', zIndex: -1 }}
            />
          </Link>
        </div>
        <div>
          <DynamicHeaderAuth session={session} status={status} />
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
