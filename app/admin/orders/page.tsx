import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

import { Orders } from './columns';
import OrdersPage from './orders';

async function getData(): Promise<Orders[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/getAll`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data: Orders[] = await response.json();
  // @ts-expect-error - data is an object with orders key
  return data?.orders;
}

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const orders = await getData();

  return <OrdersPage data={orders} />;
}
