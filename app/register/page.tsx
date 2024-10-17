import { auth } from '@root/auth';
import { redirect } from 'next/navigation';
import React from 'react';

import RegisterForm from './Form';

const page = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <section className="container mx-auto flex items-center justify-center py-12">
      <div className="w-[500px]">
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
