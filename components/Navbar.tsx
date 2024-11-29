'use client';

import Checkout from '@components/ui/checkout';
import { Separator } from '@components/ui/separator';
import { useIsMobile } from '@hooks/use-mobile';
import { useCurrentSession } from '@hooks/useCurrentSession';
import { cn } from '@lib/utils';
import { useIntersection } from '@root/context/TargetRefContext';
import { ArrowLeft, Menu, ReceiptTextIcon, LogOut } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import { signout } from '@/actions';

const DynamicHeaderAuth = dynamic(() => import('./HeaderAuth'), { ssr: false });

const Navbar = () => {
  const intersection = useIntersection();
  const isIntersecting = intersection ? intersection.isIntersecting : false;
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { session, status } = useCurrentSession();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSignout = async () => {
    await signout();
    setIsSheetOpen(false);
    router.push('/');
  };

  const navigateTo = (path: string) => {
    setIsSheetOpen(false);
    router.push(path);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-50 border-b-[1px] backdrop-blur-md navbar',
          { 'text-white': isIntersecting, 'text-black': !isIntersecting }
        )}
      >
        <nav
          className={cn(
            'container mx-auto hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full justify-between',
            { 'max-w-[1152px]': pathname === '/checkout' }
          )}
        >
          {pathname === '/checkout' && (
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-4 text-lg font-semibold md:text-base"
              >
                <ArrowLeft />
                <span className="text-sm font-bold lg:inline-block">
                  Back to store
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-8">
            <Link href="/" className="hidden md:flex items-center gap-4">
              <Image
                src="/logo_nav.png"
                width={50}
                height={50}
                alt="Eazy Meal Logo"
                className="object-cover"
              />
              <span className="sr-only">EazyMeal Corp</span>
              <span className="hidden text-2xl font-semibold lg:inline-block">
                EZMeal
              </span>
            </Link>
          </div>
          <div className="flex gap-8">
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
          </div>
        </nav>

        {/* Mobile Sheet Navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <div className="flex items-center justify-between">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {isMobile && pathname !== '/checkout' && (
              <div className="flex items-center gap-8 px-8">
                <Link href="/" className="flex gap-2 text-lg md:text-base">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-semibold lg:inline-block">
                    Back to Store
                  </span>
                </Link>
              </div>
            )}
          </div>

          <SheetContent side="left" className="bg-[#f3f4f6]">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/logo_nav.png"
                  width={50}
                  height={50}
                  alt="Eazy Meal Logo"
                  className="object-cover"
                />
                <span className="sr-only">EazyMeal Corp</span>
                <span className="text-2xl font-semibold lg:inline-block">
                  EZMeal
                </span>
              </Link>
              <Separator />
              {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => navigateTo('/profile')}
                    className="flex items-center gap-4"
                  >
                    <Button variant="ghost" className="h-10 w-10 rounded-full">
                      <span>{session?.user?.name?.[0]}</span>
                    </Button>
                    <div className="flex flex-col justify-evenly text-xs">
                      <span>{session?.user?.name}</span>
                      <span className="text-violet-700">Edit Profile</span>
                    </div>
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => navigateTo('/orders')}
                    className="flex items-center gap-2 py-4 hover:text-foreground"
                  >
                    <ReceiptTextIcon /> Orders
                  </Link>
                  <Button
                    aria-label="Logout"
                    onClick={handleSignout}
                    variant="ghost"
                    className="flex items-center gap-2 text-md hover:text-foreground"
                  >
                    <LogOut /> Logout
                  </Button>
                </>
              ) : (
                <div className="mt-10 flex flex-col gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigateTo('/login')}
                  >
                    Sign in
                  </Button>
                  <Button onClick={() => navigateTo('/register')}>
                    Sign up
                  </Button>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};

export default Navbar;
