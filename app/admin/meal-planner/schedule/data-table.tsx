'use client';

import { Button } from '@components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table';
import { useState } from 'react';

interface SelectedMeal {
  value: string;
  label: string;
  quantity: number;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedMeals: (selectedMeals: SelectedMeal[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedMeals
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      removeSelectedRows: (selectedRows: number[]) => {
        const filteredRows = data
          .filter((_, index) => !selectedRows.includes(index))
          .map((row) => row as unknown as SelectedMeal);

        setSelectedMeals(filteredRows);
      }
    }
  });

  return (
    <div>
      <Table className="bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <FooterCell table={table} />
      </div>
    </div>
  );
}

export const FooterCell = ({ table }) => {
  if (table.length === 0) return null;

  const meta = table?.options?.meta;
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="footer-buttons">
      {selectedRows.length > 0 ? (
        <Button onClick={() => removeRows()}>Remove Selected Row</Button>
      ) : null}
    </div>
  );
};
