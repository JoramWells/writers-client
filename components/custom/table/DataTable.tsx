'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { BookOpen } from 'lucide-react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableSearchInput from './TableSearchInput';

export interface DataTableInputProps<TData, TValue>{
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  filter?: React.ReactNode
  total?:number
  isSearch?: boolean
  search?:string,
  setSearch?: React.Dispatch<React.SetStateAction<string>>
}

export function DataTable<TData, TValue>({
  columns, data,
  filter,
  total,
  isSearch = false,
  search,
  setSearch,

}:DataTableInputProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    pageCount: total && Math.ceil(total / 10),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const pathname = usePathname();
  const router = useRouter();
  const [pageNo, setPageNo] = React.useState(0);

  const pageParams = useSearchParams();
  const page = pageParams.get('page');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (setSearch) {
      setSearch(value);
    }
    // debounceSearch && debounceSearch(value)
  };

  const updateQueryParams = React.useCallback(
    (newStep: number) => {
      const newPageParams = new URLSearchParams(pageParams);
      newPageParams.set('page', newStep as unknown as string);
      router.replace(`${pathname}?${newPageParams.toString()}`);
    },
    [pathname, router, pageParams],
  );
  React.useEffect(() => {
    const { pageIndex } = table.getState().pagination;
    if (page === null) {
      updateQueryParams(1);
    }
    setPageNo(pageIndex + 1);
    table.setPageIndex(Number(page) - 1);
  }, [page, table, updateQueryParams]);

  return (
    <>
      {isSearch && (
      <TableSearchInput
        columns={columns}
        data={data}
        handleSearch={handleSearch}
        setSearch={setSearch}
        table={table}
        filter={filter}
        search={search}
      />
      )}
      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-zinc-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-[12px]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
                        cell.getContext(),
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
      </div>
      <div className="flex items-center justify-between space-x-2 p-2 border-t">
        <div
          className="flex flex-row items-center text-slate-500
          gap-x-2
          "
        >
          <BookOpen size={14} />
          <p className="text-[12px]">
            Page
            {' '}
            {table.getState().pagination.pageIndex + 1}
            {' '}
            of
            {' '}
            {table.getPageCount()}
          </p>
        </div>
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              updateQueryParams(pageNo - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              updateQueryParams(pageNo + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
