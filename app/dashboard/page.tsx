import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

// import OrdersPage from '../orders/page';

// import { DataTableDemo } from './Dashboard';
// import DashboardForm from './Form';

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  // const user = session?.user;

  return (
    <main className="max-w-7xl mx-auto my-12 space-y-5 container">
      <h1 className="text-2xl font-semibold"></h1>
      {/* <OrdersPage /> */}
      {/* <DataTableDemo /> */}
      {/* <DashboardForm email={session?.user?.email as string} /> */}
    </main>
  );
};

export default page;
