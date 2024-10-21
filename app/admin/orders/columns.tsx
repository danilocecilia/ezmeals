'use client';
import { Button } from '@components/ui/button';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type Orders = {
  userId: string;
  quantity: number;
  total: number;
  deliveryAddress: string;
  deliveryMethod: string;
  createdAt: Date;
  orderId: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
};

const handleSorting = (
  column: HeaderContext<Orders, unknown>['column'],
  content: string
) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {content}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: 'userId',
    header: ({ column }) => handleSorting(column, 'User ID')
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => handleSorting(column, 'Customer Name')
  },
  {
    accessorKey: 'deliveryAddress',
    header: ({ column }) => handleSorting(column, 'Delivery Address')
  },
  {
    accessorKey: 'deliveryMethod',
    header: ({ column }) => handleSorting(column, 'Delivery Method')
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => handleSorting(column, 'Created At')
  },
  {
    accessorKey: 'orderId',
    header: ({ column }) => handleSorting(column, 'Order ID')
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => handleSorting(column, 'Quantity')
  },
  {
    accessorKey: 'total',
    header: ({ column }) => handleSorting(column, 'Total')
  }
];
