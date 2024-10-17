import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

import { Orders } from './Columns';
import OrdersPage from './Orders';

async function getData(): Promise<Orders[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/getAll`
  );

  const data = await response.json();
  return data;
}

export default async function page() {
  const session = await auth();
  const { orders } = await getData();

  if (!session) {
    redirect('/login');
  }

  return <OrdersPage data={orders} />;
}
