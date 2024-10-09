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
  const data = await getData();

  return <OrdersPage data={data?.orders} />;
}
