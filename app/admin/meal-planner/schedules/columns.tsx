'use client';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// import Link from 'next/link';

interface SelectedMeal {
  value: string;
  label: string;
  quantity: number;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
}

const handleSorting = (
  column: HeaderContext<SelectedMeal, unknown>['column'],
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
export const columns: ColumnDef<SelectedMeal>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    )
  },

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
    header: () => <div className="text-center">Delivery Date</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string>()}</div>
    )
  }
];
