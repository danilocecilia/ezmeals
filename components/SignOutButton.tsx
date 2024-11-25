'use client';
import { LogOut } from 'lucide-react';
import React from 'react';

import { DropdownMenuItem } from './ui/dropdown-menu';

import { signout } from '@/actions';

const SignOutButton = () => {
  return (
    <DropdownMenuItem
      onClick={() => signout()}
      className="gap-2 cursor-pointer"
    >
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
};

export default SignOutButton;
