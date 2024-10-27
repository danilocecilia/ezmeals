import type { Session } from '@auth/core/types';
import Navbar from '@components/Navbar';
import SessionWrapper from '@components/SessionWrapper';
import { cn } from '@lib/utils';
import { auth } from '@root/auth';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Toaster } from 'sonner';

import './globals.css';

const poppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700']
});

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = (await auth()) as ExtendedSessionType | null;
  const session = await auth();

  return (
    <SessionWrapper session={session}>
      <html lang="en" className={`${poppinsFont.variable} font-sans`}>
        <body
          className={cn(
            'min-h-screen bg-background font-poppins antialiased',
            poppinsFont.variable
          )}
        >
          <div className="mx-auto relative flex min-h-screen flex-col">
            <Navbar />
            {/* {session?.user?.privilege !== 'admin' && <Navbar />} */}
            {/* <main className="container mx-auto flex-1">
              
              {session?.user?.privilege === 'admin' ?
                children}
            
            
            </main> */}
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
