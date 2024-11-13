import { auth } from '@root/auth';
import { redirect } from 'next/navigation';
import React from 'react';

import LoginForm from './Form';

const page = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <section className="container mx-auto flex items-center justify-center py-5">
      <div>
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
