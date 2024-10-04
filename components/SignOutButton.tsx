'use client';
import React from 'react';

import { DropdownMenuShortcut } from './ui/dropdown-menu';
import { DropdownMenuItem } from './ui/dropdown-menu';

import { signout } from '@/actions';

const SignOutButton = () => {
  return (
    <DropdownMenuItem onClick={() => signout()}>
      Logout
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

export default SignOutButton;
