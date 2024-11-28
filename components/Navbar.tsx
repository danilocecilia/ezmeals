'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import Checkout from '@components/ui/checkout';
import { Separator } from '@components/ui/separator';
import { useIsMobile } from '@hooks/use-mobile';
import { useCurrentSession } from '@hooks/useCurrentSession';
import { cn } from '@lib/utils';
import { Menu, ReceiptTextIcon, ArrowLeft, LogOut } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import { signout } from '@/actions';

const DynamicHeaderAuth = dynamic(() => import('./HeaderAuth'), {
  ssr: false
});

const Navbar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { session, status } = useCurrentSession();
  console.log('🚀 ~ Navbar ~ session:', session);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleSignout = async () => {
    await signout();
    setIsSheetOpen(false);
    router.push('/');
  };

  const handleSignIn = () => {
    setIsSheetOpen(false);
    router.push('/login');
  };

  const handleSignUp = () => {
    setIsSheetOpen(false);
    router.push('/register');
  };

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
              className="flex items-center gap-4 text-lg font-semibold md:text-base"
            >
              <ArrowLeft />
              <span className="text-sm font-bold lg:inline-block">
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
            <Image
              src="/logo_nav.png"
              width={50}
              height={50}
              alt="Eazy Meal Logo"
              style={{ objectFit: 'cover', maxWidth: 'unset' }}
            />
            <span className="sr-only">EazyMeal corp</span>
            <span className="hidden text-2xl font-semibold lg:inline-block">
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
      <Sheet
        open={isSheetOpen}
        onOpenChange={() => setIsSheetOpen((prev) => !prev)}
      >
        <div className="flex justify-between items-center">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          {isMobile && (
            <div
              className={cn('flex gap-8 items-center px-8', {
                hidden: pathname !== '/checkout'
              })}
            >
              <Link href="/" className="flex gap-2 text-lg md:text-base">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-semibold lg:inline-block">
                  Back to Store
                </span>
              </Link>
            </div>
          )}

          <div
            className={cn('flex gap-8 md:hidden', {
              hidden: pathname === '/checkout'
            })}
          >
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
            <Link
              href="/"
              className="flex items-center gap-4 text-lg font-semibold md:text-base"
            >
              <Image
                src="/logo_nav.png"
                width={50}
                height={50}
                alt="Eazy Meal Logo"
                style={{ objectFit: 'cover', maxWidth: 'unset' }}
              />
              <span className="sr-only">EazyMeal corp</span>
              <span className="text-2xl font-semibold lg:inline-block">
                EZMeal
              </span>
            </Link>
            <Separator />
            {session ? (
              <>
                <Link href="#" className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image || './avatar.jpg'}
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

                <Link
                  href="/orders"
                  onClick={() => setIsSheetOpen(false)}
                  className="flex gap-2 items-center py-4 hover:text-foreground"
                >
                  <ReceiptTextIcon /> Orders
                </Link>
                <Button
                  aria-label="Logout"
                  onClick={handleSignout}
                  variant="ghost"
                  className="flex gap-2 justify-start px-0 items-center py-0 hover:text-foreground text-md"
                >
                  <LogOut /> Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-4 mt-10">
                <Button variant="outline" onClick={handleSignIn}>
                  Sign in
                </Button>
                <Button onClick={handleSignUp}>Sign up</Button>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
