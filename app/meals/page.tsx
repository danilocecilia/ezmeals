import { auth } from '@root/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Suspense } from 'react';

import AllMealsTable from './(all)/allMealsTable';

const MealsPage: React.FC = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="px-4">
      <Suspense fallback={<p>Loading...</p>}>
        <AllMealsTable />
      </Suspense>
    </div>
  );
};

export default MealsPage;
