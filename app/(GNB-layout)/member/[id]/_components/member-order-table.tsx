"use client";

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
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import { DeliveryStatus, OrderItem } from "@/app/api/dto/order";
import { useGetMemberOrderList } from "@/hooks/order/use-get-member-order-list";
import { commaWithUnit } from "@/util/price";
import { useState } from "react";
import StatusChip from "@/app/_components/chip/status-chip";
import { DELIVERY_STATUS_LABEL, ORDER_STATUS_LABEL } from "@/constants/order";
import TooltipRow from "@/app/_components/table/tooltip-row";
import Link from "next/link";
import { ORDER_PRODUCT_DETAIL_PAGE } from "@/constants/path";

interface MemberOrderTableProps {
  memberId: string;
}

const MemberOrderTable = ({ memberId }: MemberOrderTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // 주문 목록 조회
  const { data, isLoading } = useGetMemberOrderList(memberId, {
    page: currentPage,
    limit: 10,
  });

  const columnHelper = createColumnHelper<OrderItem>();
  const columns = [
    columnHelper.accessor("orderDate", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "주문일",
      maxSize: 120,
    }),
    columnHelper.accessor("orderNumber", {
      cell: (data) => {
        const orderId = data.row.original.id;
        const nextPage = ORDER_PRODUCT_DETAIL_PAGE.replace("[id]", orderId);
        return (
          <Link className="text-blue-700 underline" href={nextPage}>
            <TooltipRow text={data.getValue()} />
          </Link>
        );
      },
      header: "주문 ID",
      minSize: 160,
    }),
    columnHelper.accessor("itemTitle", {
      cell: (data) => data.getValue(),
      header: "상품명",
      minSize: 200,
    }),
    columnHelper.accessor("itemCount", {
      cell: (data) => commaWithUnit(data.getValue(), "개"),
      header: "수량",
      maxSize: 80,
    }),
    columnHelper.accessor("finalPaymentAmount", {
      cell: (data) => commaWithUnit(data.getValue(), "원"),
      header: "결제금액",
      maxSize: 120,
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        const status = ORDER_STATUS_LABEL[data.getValue()];
        return status;
      },
      header: "상태",
      maxSize: 100,
    }),
    columnHelper.accessor("deliveryStatus", {
      cell: (data) => {
        const status = DELIVERY_STATUS_LABEL[data.getValue()];
        let color: "green" | "blue" | "red" = "blue";
        if (status === DeliveryStatus.DELIVERED) {
          color = "green";
        } else if (status === DeliveryStatus.CANCELED) {
          color = "red";
        }

        return <StatusChip status={status} color={color} />;
      },
      header: "배송상태",
      maxSize: 110,
    }),
  ];

  const table = useReactTable({
    data: data?.items || [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableColumnResizing: false,
    columnResizeMode: "onChange",
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

  if (isLoading) {
    return <div className="flex justify-center py-8">로딩 중...</div>;
  }

  const currentDataLength = data?.items?.length || 0;
  const totalDataLength = data?.meta?.totalItems || 0;
  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={currentDataLength}
        totalDataLen={totalDataLength}
      />

      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead
                    className={headerIndex === 0 ? "border-x" : "border-r"}
                    key={header.id + headerIndex}
                    style={{ width: `${header.getSize()}px` }}
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
                    size="md"
                    className={`${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <NoDataCell colSpan={columns.length} text="주문 내역이 없습니다" />
          )}
        </TableBody>
      </Table>

      {currentDataLength > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MemberOrderTable;
