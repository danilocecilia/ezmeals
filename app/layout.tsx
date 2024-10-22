import Navbar from '@components/Navbar';
import SessionWrapper from '@components/SessionWrapper';
import { auth } from '@root/auth';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import { Toaster } from 'sonner';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'EZ Meal',
  description: 'EZ Meal is a meal order system'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionWrapper session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="mx-auto relative flex min-h-screen flex-col">
            <Navbar />
            <main className="container mx-auto flex-1">{children}</main>
            <Toaster />
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
