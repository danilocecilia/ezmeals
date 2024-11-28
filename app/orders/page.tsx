import Orders from '@components/Orders';
import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

const OrdersPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex justify-center p-10">
      <Orders userId={session.user.id} />
    </div>
  );
};

export default OrdersPage;
