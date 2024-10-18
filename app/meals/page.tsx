import { auth } from '@root/auth';
import { redirect } from 'next/navigation';
import React from 'react';

import { Meal } from './all/Columns';
import { DataTableDemo } from './all/List';

async function getData(): Promise<Meal[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/listMeal`
  );

  const data = await response.json();
  return data;
}

const MealsPage: React.FC = async () => {
  const session = await auth();
  const { meals } = await getData();
  console.log('🚀 ~ constMealsPage:React.FC= ~ meals:', meals);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="px-4">
      <DataTableDemo mealsData={meals} />
    </div>
  );
};

export default MealsPage;
