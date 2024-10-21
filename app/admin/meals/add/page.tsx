import CustomForm from '@root/app/meals/add/form';
import { auth } from '@root/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

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
