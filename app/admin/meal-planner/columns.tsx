'use client';
import { Button } from '@components/ui/button';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ArrowUpDown, Ellipsis } from 'lucide-react';
// import Link from 'next/link';

export type Meal = {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: Array<{ path: string; preview: string }>;
  price: number;
  portionSize: string;
  preparationTime: string;
  notes: string;
  allergens: Array<{ value: string; label: string }>;
  createdAt: string;
};

const handleSorting = (
  column: HeaderContext<Meal, unknown>['column'],
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
export const columns: ColumnDef<Meal>[] = [
  {
    accessorKey: 'dateFrom',
    header: ({ column }) => (
      <div className="text-center">{handleSorting(column, 'Date From')}</div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    )
  },
  {
    accessorKey: 'dateTo',
    header: ({ column }) => (
      <div className="text-center">{handleSorting(column, 'Date To')}</div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    )
  },
  {
    accessorKey: 'label',
    header: ({ column }) => (
      <div className="text-center ">{handleSorting(column, 'Meal')}</div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center whitespace-nowrap overflow-hidden text-ellipsis">
        {getValue<string>()}
      </div>
    )
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <div className="text-center">{handleSorting(column, 'Quantity')}</div>
    ),
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<number>()}</div>
    )
  },
  {
    accessorKey: 'deliveryDate',
    header: () => <div className="text-center w-[100px]">Delivery Date</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    )
  }
];