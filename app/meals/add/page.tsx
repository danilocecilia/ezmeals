import CustomForm from '@root/app/meals/add/Form';
import { auth } from '@root/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const MealsPage: React.FC = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4">
      <CustomForm />
    </div>
  );
};

export default MealsPage;
