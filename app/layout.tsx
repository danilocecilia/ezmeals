import Navbar from '@components/Navbar';
import SessionWrapper from '@components/SessionWrapper';
import { cn } from '@lib/utils';
import { auth } from '@root/auth';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Session } from 'next-auth';
import React from 'react';
import { Toaster } from 'sonner';

import './globals.css';

const poppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700']
});

interface ExtendedSessionType extends Session {
  user: ExtendedUserType;
}

interface ExtendedUserType {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  address?: string;
  city?: string;
  phone?: string;
  postal_code?: string;
  province?: string;
  privilege: 'admin' | 'user';
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as ExtendedSessionType | null;

  return (
    <SessionWrapper session={session}>
      <html lang="en" className={`${poppinsFont.variable} font-sans`}>
        <body
          className={cn(
            'min-h-screen bg-background font-poppins antialiased',
            poppinsFont.variable
          )}
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            {children}
            <Toaster />
          </div>

          {/* <div className="mx-auto relative flex min-h-screen flex-col"> */}
          {/* {session?.user?.privilege !== 'admin' && <Navbar />} */}
        </body>
      </html>
    </SessionWrapper>
  );
}
