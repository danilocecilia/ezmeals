'use client';

import { Icons } from '@components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import Checkout from '@components/ui/checkout';
import { useCurrentSession } from '@hooks/useCurrentSession';
import { cn } from '@lib/utils';
import { Menu, ReceiptTextIcon, ArrowLeft, LogOut } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import { signout } from '@/actions';

const DynamicHeaderAuth = dynamic(() => import('./HeaderAuth'), {
  ssr: false
});

const Navbar = () => {
  const pathname = usePathname();
  const { session, status } = useCurrentSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f3f4f6] border-b-[1px]">
      <nav
        className={cn(
          'container mx-auto hidden h-16 flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full justify-between ',
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
            <Icons.logo />
            <span className="hidden text-2xl font-bold lg:inline-block">
              EZMeal
            </span>
          </Link>
        </div>
        <div className="flex gap-8">
          <>
            {!pathname.includes('admin') && (
              <>
                {
                  // @ts-expect-error - Required for page to render
                  <DynamicHeaderAuth session={session} status={status} />
                }
                <span className="self-center">
                  <Checkout />
                </span>
              </>
            )}
          </>
        </div>
      </nav>
      <Sheet>
        <div className="flex justify-between items-center">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <div className="flex gap-8">
            {!pathname.includes('admin') && (
              <div>
                <span className="self-center">
                  <Checkout />
                </span>
              </div>
            )}
          </div>
        </div>
        <SheetContent side="left" className="bg-[#f3f4f6]">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-4">
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || './avatar.png'}
                    alt={`${session?.user?.name}`}
                  />
                  <AvatarFallback className="rounded-lg">{`${session?.user?.name?.substring(0, 1)}`}</AvatarFallback>
                </Avatar>
              </Button>
              <span className="sr-only">Acme Inc</span>
              <div className="flex h-[40px] flex-col text-xs justify-evenly">
                <div>{session?.user?.name}</div>
                <div className="text-violet-700">Edit Profile</div>
              </div>
            </Link>
            <Link href="#" className="flex gap-2 py-4 hover:text-foreground">
              <ReceiptTextIcon /> Orders
            </Link>

            <Link
              href="#"
              onClick={() => signout()}
              className="flex gap-2 py-0 hover:text-foreground"
            >
              <LogOut /> Logout
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
