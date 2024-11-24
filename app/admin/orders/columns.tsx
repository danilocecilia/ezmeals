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
      className="text-xs font-bold text-black hover:text-primary"
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
    accessorKey: 'orderId',
    header: ({ column }) => handleSorting(column, 'Order ID')
  },
  {
    accessorKey: 'customerName',
    header: ({ column }) => handleSorting(column, 'Customer')
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => handleSorting(column, 'Date'),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => handleSorting(column, 'Quantity')
  },
  {
    accessorKey: 'total',
    header: ({ column }) => handleSorting(column, 'Amount'),
    cell: ({ row }) => (
      <span className="font-semibold text-[14px]">${row.original.total}</span>
    )
  }
];
