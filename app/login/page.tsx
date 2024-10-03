import { auth } from '@root/auth';
import { redirect } from 'next/navigation';
import React from 'react';

import LoginForm from './Form';

const page = async () => {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <section className="container flex items-center justify-center py-5">
      <div>
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
