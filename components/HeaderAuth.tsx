import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { BadgeCheck, LockKeyholeIcon, Package2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import SignOutButton from './SignOutButton';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from './ui/dropdown-menu';

// @ts-expect-error - Required for page to render
const HeaderAuth: React.FC = ({ session, status }) => {
  return (
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial"></form>
      {status !== 'unauthenticated' && session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || './avatar.png'}
                  alt={`${session?.user?.name}`}
                />
                <AvatarFallback className="rounded-lg">{`${session?.user?.name?.substring(0, 1)}`}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <BadgeCheck />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/orders">
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <Package2 />
                  Recent Orders
                </DropdownMenuItem>
              </Link>
              {session.user?.role === 'admin' && (
                <Link href="/admin">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <LockKeyholeIcon />
                    Admin Panel
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button variant="outline" asChild>
            <Link href={`/login`}>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href={`/register`}>Sign up</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderAuth;
