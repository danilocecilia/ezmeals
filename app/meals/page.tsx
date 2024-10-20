import { auth } from '@root/auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react';

import AllMeals from './(all)/allMeals';

// import { Meal, DataTableDemo } from './(all)';

// async function getData(): Promise<Meal[]> {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/admin/listMeal`,
//     {
//       cache: 'no-cache'
//     }
//   );

//   const data = await response.json();
//   revalidateTag('updateMeal');
//   return data;
// }

const MealsPage: React.FC = async () => {
  const session = await auth();
  // const { meals } = await getData();

  if (!session) {
    redirect('/login');
  }

  // revalidatePath('/meals/[id]', 'page');
  return (
    <div className="px-4">
      <AllMeals />
    </div>
  );
};

export default MealsPage;
