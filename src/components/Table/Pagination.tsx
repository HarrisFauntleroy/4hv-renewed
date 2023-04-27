import { type InputDataTypes } from '../Table';
import { Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import { Table as TableType } from '@tanstack/react-table';

interface PaginationProps<TData extends InputDataTypes> {
  table: TableType<TData>;
  id: string;
}

export function Pagination<TData extends InputDataTypes>({
  table,
  id,
}: PaginationProps<TData>) {
  return (
    <Flex gap={1}>
      <Button
        size="xs"
        className="border rounded p-1"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </Button>
      <Button
        size="xs"
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </Button>
      <Button
        size="xs"
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </Button>
      <Button
        size="xs"
        className="border rounded p-1"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </Button>
      <Flex gap={1}>
        <Flex gap={1}>Page</Flex>
        <Text>
          {`${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}
        </Text>
      </Flex>
      | Go to page:
      <Input
        size="sm"
        type="number"
        defaultValue={table.getState().pagination.pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
        }}
      />
      <Select
        size="sm"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[4, 10, 20, 30, 40, 50].map((pageSize) => (
          <option key={`${id}-pagination-` + pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
