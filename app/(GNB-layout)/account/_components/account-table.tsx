import * as React from "react";
import {
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { handleMaskName } from "@/util/string";
import Link from "next/link";
import { ADMIN_ACCOUNT_PAGE } from "@/constants/path";
import formattedDate from "@/util/date";
import { AdminAccount } from "@/app/api/dto/account";
import { AdminRole } from "@/app/api/dto/auth";
import Pagination from "@/app/_components/pagination";

interface AccountTableProps {
  data: AdminAccount[];
  totalDataLength: number; // 총 데이터 수
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  pageSize?: number; // 페이지당 아이템 수
}

export function AccountTable({
  data,
  totalDataLength,
  currentPage,
  setCurrentPage,
  totalPages,
  pageSize = 10, // 기본값 10
}: AccountTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<AdminAccount>();
  const columns = [
    columnHelper.display({
      header: "No.",
      cell: (data) => {
        // 현재 페이지와 페이지 크기를 고려한 순번 계산
        return (
          totalDataLength - ((currentPage - 1) * pageSize + data.row.index)
        );
      },
      maxSize: 20,
    }),
    columnHelper.accessor("name", {
      cell: (data) => data.getValue(),
      header: "이름",
    }),
    columnHelper.accessor("loginId", {
      cell: (data) => handleMaskName(data.getValue()),
      header: "아이디",
    }),
    columnHelper.accessor("role", {
      cell: (data) => {
        const roleText =
          data.getValue() === AdminRole.ADMIN ? "일반 관리자" : "마스터 관리자";
        return roleText;
      },
      header: "관리자 권한",
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "등록일",
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={data.length}
        totalDataLen={totalDataLength}
      />
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead
                    className={headerIndex === 0 ? "border-x" : "border-r"}
                    key={header.id + headerIndex}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id + rowIndex}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    size="sm"
                    className={`cursor-pointer ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    <Link
                      className={`relative flex size-full w-full items-center justify-center`}
                      href={`${ADMIN_ACCOUNT_PAGE}/${row.original.id}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-[200px] text-subtitle-1"
                size="lg"
                colSpan={columns.length}
              >
                데이터가 존재하지 않습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
