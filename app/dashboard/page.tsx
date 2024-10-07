import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

import DashboardForm from './Form';

const page = async () => {
  const session = await auth();
  console.log('🚀 ~ page ~ session:', session);

  if (!session) {
    redirect('/login');
  }

  const user = session?.user;

  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5 container">
      <h1 className="text-2xl font-semibold">
        Welcome back, {user?.name || user?.email}
      </h1>
      <DashboardForm email={session?.user?.email as string} />
    </main>
  );
};

export default page;
