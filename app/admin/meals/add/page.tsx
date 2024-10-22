import { auth } from '@root/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

import CustomForm from './form';

const MealsPage: React.FC = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  revalidatePath('/meals', 'page');
  return (
    <div className="container mx-auto px-4">
      <CustomForm />
    </div>
  );
};

export default MealsPage;
