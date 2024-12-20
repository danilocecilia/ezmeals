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
import LoadingComponent from '@root/components/loading';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { columns } from './columns';

interface SelectedMeal {
  mealId: string;
  mealName: string;
  quantity: number;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
}

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState({});
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  console.log('🚀 ~ DataTable ~ selectedMeals:', selectedMeals);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listMealPlanner = async () => {
      setLoading(true);
      const response = await fetch('/api/admin/listPlanner');
      const data = await response.json();
      console.log('🚀 ~ listMealPlanner ~ data:', data);
      setSelectedMeals(data);
      setLoading(false);
    };
    listMealPlanner();
  }, []);

  const handleDelete = async (rowsToDelete: string[]) => {
    try {
      const response = await fetch('/api/admin/deleteMealPlanner', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: rowsToDelete })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Error deleting items:', error);
      toast.error('Failed to delete items');
    }
  };

  const table = useReactTable({
    data: selectedMeals,
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
      removeSelectedRows: async (selectedRows: number[]) => {
        const rowsToDelete = selectedRows.map(
          (index) => selectedMeals[index].mealId
        );
        await handleDelete(rowsToDelete);

        const filteredRows = selectedMeals
          .filter((_, index) => !selectedRows.includes(index))
          .map((row) => row as unknown as SelectedMeal);

        setSelectedMeals(filteredRows);
      }
    }
  });

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Table className="bg-white max-w-[900px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4 max-w-[900px]">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <FooterCell table={table} />
          </div>
        </>
      )}
    </>
  );
}

// @ts-expect-error table prop is not typed
export const FooterCell = ({ table }) => {
  if (table.length === 0) return null;

  const meta = table?.options?.meta;
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    meta.removeSelectedRows(
      // @ts-expect-error: table prop is not typed
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="footer-buttons">
      {selectedRows.length > 0 ? (
        <Button onClick={removeRows}>Remove Selected Row</Button>
      ) : null}
    </div>
  );
};
