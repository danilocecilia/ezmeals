import { Orders, columns } from './Columns';
import { DataTable } from './DataTable';

async function getData(): Promise<Orders[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/getAll`
  );
  console.log('response:', response);
  const data = await response.json();
  return data;
}

export default async function OrdersPage() {
  const data = await getData();
  console.log('🚀 ~ OrdersPage ~ data:', data.orders);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data?.orders} />
    </div>
  );
}
