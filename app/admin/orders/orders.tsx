'use client';
import { DatePickerWithRange } from '@root/components/DateRangePicker';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { DataTable } from '../../utils/DataTable';

import { Orders, columns } from './columns';

type DateRange = { from: Date | undefined; to?: Date | undefined };

const OrdersPage = ({ data }: { data: Orders[] }) => {
  const router = useRouter();
  console.log('🚀 ~ OrdersPage ~ data:', data);
  const [ordersData, setOrdersData] = useState<Orders[]>(data);
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });

  useEffect(() => {
    if (!date?.from && !date?.to) {
      setOrdersData(data);
    } else {
      const filteredData = data.filter((order) => {
        return (
          date?.from &&
          date?.to &&
          order.createdAt >= format(date.from, 'dd/MM/yyyy') &&
          order.createdAt <= format(date.to, 'dd/MM/yyyy')
        );
      });

      setOrdersData(filteredData);
    }
  }, [date, data]);

  const handleOrderDetailsClick = (order) => {
    // Navigate to the order details page
    router.push(`/admin/orders/${order.orderId}`);
  };

  return (
    <div className="w-full container hidden h-full flex-1 flex-col space-y-6 p-8 md:flex ">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-[28px] font-bold tracking-tight">
            Orders History
          </h2>
        </div>
      </div>
      <div>
        <div>Filter:</div>
        <DatePickerWithRange setDate={setDate} date={date} />
      </div>
      <DataTable
        onClick={handleOrderDetailsClick}
        columns={columns}
        data={ordersData}
      />
    </div>
  );
};

export default OrdersPage;
