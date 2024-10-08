import { ColumnDef } from '@tanstack/react-table';
// import { format } from 'date-fns';

// const formatDate = (date: Date) => format(date, 'MM/dd/yyyy');

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

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: 'userId',
    header: 'User ID'
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name'
  },
  {
    accessorKey: 'deliveryAddress',
    header: 'Delivery Address'
  },
  {
    accessorKey: 'deliveryMethod',
    header: 'Delivery Method'
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
    // cell: ({ value }) => formatDate(new Date(value))
  },
  {
    accessorKey: 'orderId',
    header: 'Order ID'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'total',
    header: 'Total'
  }
];
