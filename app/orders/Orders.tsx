'use client';

import { DatePickerWithRange } from '@root/components/DateRangePicker';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

import { DataTable } from '../utils/DataTable';

import { Orders, columns } from './Columns';

type DateRange = { from: Date | undefined; to?: Date | undefined };

const OrdersPage = ({ data }: { data: Orders[] }) => {
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
      console.log('filteredData', filteredData);
      setOrdersData(filteredData);
    }
  }, [date, data]);

  return (
    <div className="flex flex-col space-y-4 container mx-auto py-10">
      <div className="self-end">
        <div>Filter:</div>
        <DatePickerWithRange setDate={setDate} date={date} />
      </div>
      <DataTable columns={columns} data={ordersData} />
    </div>
  );
};

export default OrdersPage;
