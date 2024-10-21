'use client';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu';
import { ColumnDef, HeaderContext } from '@tanstack/react-table';
import { ArrowUpDown, Ellipsis } from 'lucide-react';
import Link from 'next/link';

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

const sanitizePortionSize = (portionSize: string) => {
  switch (portionSize) {
    case 'S':
      return 'Small (300g)';
    case 'M':
      return 'Medium (500g)';
    case 'L':
      return 'Large (800g)';
  }
};

export const columns: ColumnDef<Meal>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => handleSorting(column, 'Name')
  },
  {
    accessorKey: 'category',
    header: ({ column }) => handleSorting(column, 'Category')
  },
  {
    accessorKey: 'price',
    header: ({ column }) => handleSorting(column, 'Price')
  },
  {
    accessorKey: 'portionSize',
    header: ({ column }) => handleSorting(column, 'Portion Size'),
    accessorFn: (row) => sanitizePortionSize(row.portionSize)
  },
  {
    accessorKey: 'preparationTime',
    header: ({ column }) => handleSorting(column, 'Preparation Time')
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => handleSorting(column, 'Created At')
  },
  {
    accessorKey: 'allergens',
    header: ({ column }) => handleSorting(column, 'Allergens')
  },
  {
    accessorKey: 'notes',
    header: ({ column }) => handleSorting(column, 'Notes')
  },
  {
    accessorKey: 'description',
    header: ({ column }) => handleSorting(column, 'Description')
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const meal = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/meals/${meal._id}`} className="block">
              <DropdownMenuItem>Update Meal</DropdownMenuItem>
            </Link>

            <DropdownMenuItem>Disable Meal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
