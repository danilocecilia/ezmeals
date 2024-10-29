import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { ChevronsUpDown } from 'lucide-react';
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
  DropdownMenuGroup,
  DropdownMenuShortcut
} from './ui/dropdown-menu';
import { SidebarMenuButton } from './ui/sidebar';

const HeaderAuth: React.FC = ({ session, status }) => {
  console.log('entrou!!');
  return (
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial"></form>
      {status !== 'unauthenticated' && session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || '/avatars/01.png'}
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
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton></SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button asChild>
            <Link href={`/login`}>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href={`/register`}>Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderAuth;
