import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

// import DashboardForm from './Form';
import { DataTableDemo } from './Dashboard';

const page = async () => {
  const session = await auth();
  console.log('🚀 ~ page ~ session:', session);

  if (!session) {
    redirect('/login');
  }

  const user = session?.user;

  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5 container">
      <h1 className="text-2xl font-semibold">Orders History</h1>
      <DataTableDemo />
      {/* <DashboardForm email={session?.user?.email as string} /> */}
    </main>
  );
};

export default page;
